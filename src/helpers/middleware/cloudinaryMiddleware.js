const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY_CLOUD,
    api_secret:process.env.API_SECRET_CLOUD,
})

const uploadCloudinary = (req, res, next) => {
    const pathFile = req.file.path
    const uniqueName = new Date().toISOString()

    cloudinary.uploader.upload(
        pathFile, {

    resource_type: 'raw',
    public_id: `market-place/${uniqueName}`,
    tags: `market-place`,
        },
    (err,Image) => {
        if(err) return res.status(500).send(err)
        console.log('file uploader to cloudinary');

        fs.unlinkSync(pathFile)
        req.Image = Image
        next()
        }
    )
}
// const uploadCloudinaryProduct = (req, res, next) => {
//     const pathFile = req.file.path
//     const uniqueName = new Date().toISOString()

//     cloudinary.uploader.upload(
//         pathFile, {

//     resource_type: 'raw',
//     public_id: `market-place/product/${uniqueName}`,
//     tags: `market-place`,
//         },
//     (err,Image) => {
//         if(err) return res.status(500).send(err)
//         console.log('file uploader to cloudinary');

//         fs.unlinkSync(pathFile)
//         req.Image = Image
//         next()
//         }
//     )
// }
// const uploadCloudinaryProfile = (req, res, next) => {
//     const pathFile = req.file.path
//     const uniqueName = new Date().toISOString()

//     cloudinary.uploader.upload(
//         pathFile, {

//     resource_type: 'raw',
//     public_id: `market-place/profile/${uniqueName}`,
//     tags: `market-place`,
//         },
//     (err,Image) => {
//         if(err) return res.status(500).send(err)
//         console.log('file uploader to cloudinary');

//         fs.unlinkSync(pathFile)
//         req.Image = Image
//         next()
//         }
//     )
// }

module.exports = uploadCloudinary;
// {uploadCloudinaryMarket, uploadCloudinaryProduct, uploadCloudinaryProfile}