const { user, Sequelize } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const { v4: uuid4 } = require('uuid');
const ejs = require('ejs');
const path = require('path');

module.exports = {

    login: async (req, res) => {
        const { body } = req;

        let findUser = await user.findOne({
            where: {
                [Op.or]: [
                    { email: body.email },
                    // { username: body.email }
                ]
            }
        })
        // cek user, apakah ada pada database
        if (findUser === null) {
            res.send({
                msg: 'Login Error',
                status: 404,
                error: 'User not found'
            })
        }
        // cek apakah password sesuai
        const isValidPassword = bcrypt.compareSync(
            body.password,
            findUser.dataValues.password
        );
        if (isValidPassword === false) {
            res.send({
                msg: "Login Error",
                status: 403,
                error: "invalid password"
            })
        }
        // cek apakah user sudah terverifikasi
        if (!findUser.dataValues.verify) {
            res.send({
                msg: "Error Login",
                status: 401,
                error: "user not verified"
            })
        }
        const payload = {
            id: findUser.dataValues.id,
            firstname: findUser.dataValues.firstname,
            lastname: findUser.dataValues.lastname,
            email: findUser.dataValues.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400
        })
        delete findUser.dataValues.password;
        res.status(200).send({
            msg: "Login Success",
            status: 200,
            data: { ...findUser.dataValues, token }
        })
    },

    register: async(req, res, next) => {
        // try {
            const id = uuid4();
            // const { firstname, lastname, email} = req.body;
            const {body} = req;
            const saltround = 10;
            // const username = `${firstname} ${lastname}`
            body.password = bcrypt.hashSync(body.password, saltround);
            
            let findUser = await user.findOne({
                where: {
                    [Op.or]: [
                        { email: body.email }
                    ]
                }
            })
            if (findUser) {
                res.send({
                    msg: 'register failed',
                    status: 401,
                    error: 'email sudah terpakai'
                })
            } else {

            const verifyToken = crypto.randomBytes(20).toString('hex');
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_CREDENTIAL,
                },
            });
            const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify/${verifyToken}`
            const emailTemplate = await ejs.renderFile(path.join(__dirname, 'template' , 'verif_email.ejs'), {
                verificationLink,
              });
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Verifikasi Akun',
                html: emailTemplate
                // urlLink: 'http://localhost:${process.env.PORT}/api/auth/verify/${verifyToken}',
                // text: `Klik link berikut untuk verifikasi akun Anda: http://localhost:${process.env.PORT}/api/auth/verify/${verifyToken}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Terjadi kesalahan saat mengirim email:', error);
                } else {
                    console.log('Email verifikasi berhasil dikirim:', info.response);
                }
            });

                // user.create({
                //     id,
                //     firstname,
                //     lastname,
                //     password,
                //     email,
                //     username,
                //     // address,
                //     // nohp,
                //     verifyToken
                // })
                user.create(body)
                    .then((data) => {
                        res.status(200).send({
                            msg: 'register berhasil',
                            status: 200,
                            data
                        })
                    })
                    .catch((error) => {
                        res.status(500).send({
                            msg: 'register gagal',
                            status: 500,
                            error
                        })
                    })
            }
        // } catch (error) {
            console.error('Terjadi kesalahan saat verifikasi akun:', error);
            res.status(502).json({ message: 'Terjadi kesalahan saat verifikasi akun.' });
        // }
    },

    

    verify: async(req, res) => {
        try {
            const token = req.params.token;
        
            // Cari akun berdasarkan token verifikasi
            const findUser = await user.findOne({
              where: {
                verifyToken: token,
              },
            });
        
            if (!findUser) {
              return res.status(404).send({ msg: 'Token verifikasi tidak valid.' });
            }
        
            // Set status isVerified menjadi true dan hapus verifyToken
            findUser.verify = true;
            findUser.verifyToken = null;
            await findUser.save();
        
            res.send({ msg: 'Akun berhasil diverifikasi.' });
          } catch (err) {
            console.error('Terjadi kesalahan saat verifikasi akun:', err);
            res.status(500).send({ message: 'Terjadi kesalahan saat verifikasi akun.' });
          }
    },
    
    
}