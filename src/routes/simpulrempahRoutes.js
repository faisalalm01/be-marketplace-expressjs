const simpulrempahRoutes = require("express").Router()
const simpulrempahController = require("../controllers/simpulrempahController")
const cloudinaryMiddleware = require("../helpers/middleware/cloudinaryMiddleware")
const upploadMiddleware = require("../helpers/middleware/upploadMiddleware")
const authMiddleware = require("../helpers/middleware/authMiddleware")

simpulrempahRoutes.post(
  "/create",
  upploadMiddleware.uploadFileSimpulRempah,
  cloudinaryMiddleware.uploadCloudinarySimpulRempah,
  authMiddleware.checkLogin,
  simpulrempahController.createSimpulRempah
)
// simpulrempahRoutes.put(
//   "/edit/:id",
//   upploadMiddleware.uploadFileSimpulRempah,
//   cloudinaryMiddleware.uploadCloudinarySimpulRempah,
//   authMiddleware.checkLogin,
//   simpulrempahController.editSimpulRempah
// );
simpulrempahRoutes.get("/list", simpulrempahController.getAllSimpulRempah)
simpulrempahRoutes.get(
  "/detail/:id",
  simpulrempahController.getSimpulRempahById
)
simpulrempahRoutes.delete(
  "/delete/:id",
  simpulrempahController.deleteSimpulRempah
)

module.exports = simpulrempahRoutes
