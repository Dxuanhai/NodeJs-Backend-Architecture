"use strict";
const ProductController = require("../../controllers/product.controller");
const express = require("express");
const router = express.Router();
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticate } = require("../../auth/authUtils");

router.get(
  "/search/:keySearch",
  asyncHandler(ProductController.getListSearchProducts)
);
router.get("", asyncHandler(ProductController.getAllProducts));
router.get("/:product_id", asyncHandler(ProductController.getProduct));

// authenticate
router.use(authenticate);

// post
router.post("", asyncHandler(ProductController.createProduct));
router.patch("/:productId", asyncHandler(ProductController.updateProduct));
router.post("/publish/:id", asyncHandler(ProductController.publishProduct));
router.post("/unpublish/:id", asyncHandler(ProductController.unPublishProduct));

// QUERY

router.get("/drafts/all", asyncHandler(ProductController.getAllDrafsForShop));
router.get(
  "/published/all",
  asyncHandler(ProductController.getAllPublishForShop)
);

module.exports = router;
