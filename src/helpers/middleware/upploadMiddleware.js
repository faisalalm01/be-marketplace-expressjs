const multer = require ('multer')
const path = require ('path')

const storage = multer.diskStorage({
    destination: (req,file,callback) =>{
        callback(null, './public/image')
    },
    filename:(req,file,callback)=>{
        const nameFormat = `${Date.now()}-${file.originalname}${path.extname(
            file.originalname
        )}`
        callback(null, nameFormat)
    }
})

const upload = multer ({
    storage: storage,
    limits: 2 * 1000 * 1000,
})

const uploadFileProduct = (req,res,next) => {
    const uploadImage = upload.single('image')
    uploadImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                msg: 'Error Multer',
                status: 500,
                err,
            })
        }else{
            next()
        }
            
    })
}
const uploadFileMarket = (req,res,next) => {
    const uploadImage = upload.single('logo')
    uploadImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                msg: 'Error Multer',
                status: 500,
                err,
            })
        }else{
            next()
        }     
    })
}
const uploadFileProfile = (req,res,next) => {
    const uploadImage = upload.single('profile')
    uploadImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                msg: 'Error Multer',
                status: 500,
                err,
            })
        }else{
            next()
        }
            
    })
}
module.exports = {uploadFileProduct, uploadFileMarket, uploadFileProfile}