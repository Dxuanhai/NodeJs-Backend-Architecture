"use strict";
const ProductController = require("../../controllers/product.controller");
const express = require("express");
const router = express.Router();
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticate } = require("../../auth/authUtils");
// Sign Up

router.use(authenticate);
router.post("", asyncHandler(ProductController.createProduct));

// QUERY

router.get("/drafts/all", asyncHandler(ProductController.getAllDrafsForShop));

module.exports = router;
