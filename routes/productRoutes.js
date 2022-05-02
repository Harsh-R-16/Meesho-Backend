const express = require("express");

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
} = require("../controllers/productController");

const router = express.Router();

router.param("id", (req, res, next, value) => {
  // if params value is not valid then we can send error from here and return
  // no need to go to next middlewares. return res.status(404).json({message:"not valid id!!!"})
  console.log(value);
  next();
});

router.route("/").get(getAllProducts).post(createProduct);
// we can chain middlewares in routes itself like .get(middleware1,middleware2,getAllProducts)

router.route("/top").get(getTopProducts);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
