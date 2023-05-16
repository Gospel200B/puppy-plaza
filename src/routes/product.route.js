const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  productCount,
  products,
} = require("../controllers/product.controller");

router.route("/").post(createProduct);
router.route("/:id").get(getProduct);
router.route("/").get(getProductList);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);
router.route("/get/count").get(productCount);
router.route("/get/featured").get(products)

module.exports = router;
