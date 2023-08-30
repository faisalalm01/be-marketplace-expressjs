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
        try {
            // const { body } = req;
            const { email, password } = req.body;

            const findUser = await user.findOne({
                where: { email: email }
            })
            // cek user, apakah ada pada database
            if (findUser === null) {
                return res.status(401).json({
                    msg: 'login failed', status: 401, error: 'user not found'
                })
                // res.send({
                //     msg: 'Login Error',
                //     status: 404,
                //     error: 'User not found'
                // })
            }
            // cek apakah password sesuai
            const isValidPassword = bcrypt.compareSync(
                password,
                findUser.password
            );
            if (isValidPassword === false) {
                return res.status(403).json({
                    msg: 'login failed',
                    status: 403,
                    error: 'password salah'
                })
            }
            // cek apakah user sudah terverifikasi
            if (!findUser.dataValues.verify) {
                return res.status(401).json({
                    msg: 'Error Login',
                    status: 401,
                    error: 'user not verified'
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
            res.status(200).json({
                msg: "Login Success",
                status: 200,
                data: { ...findUser.dataValues, token }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred' });
        }

    },

    register: async (req, res) => {
        try {
            const id = uuid4();
            const { firstname, lastname, email, password } = req.body;
            // const {body} = req;
            const saltround = 10;
            const username = `${firstname} ${lastname}`

            let findUser = await user.findOne({
                where: {
                    email : email
                }
            })
            const hashpassword = bcrypt.hashSync(password, saltround);
            if (findUser) {
                return res.status(401).json({ msg: 'email sudah terpakai' })
            }

            const verifyToken = crypto.randomBytes(20).toString('hex');
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_CREDENTIAL,
                },
            });
            const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify/${verifyToken}`
            const emailTemplate = await ejs.renderFile(path.join(__dirname, 'template', 'verif_email.ejs'), {
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

            const userCreate = user.create({
                id,
                firstname,
                lastname,
                email,
                password: hashpassword,
                username,
                verifyToken,
            })
            .then((data) => {
                return res.status(200).json({ msg: 'success register akun', status: 200, data })
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Terjadi kesalahan saat verifikasi akun.' });
        }
    },



    verify: async (req, res) => {
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