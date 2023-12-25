"use strict";
const accessController = require("../../controllers/access.controller");
const express = require("express");
const router = express.Router();
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticate } = require("../../auth/authUtils");

// Sign Up
router.post("/shop/sign-up", asyncHandler(accessController.signUp));
router.post("/shop/login", asyncHandler(accessController.login));

// authentication

router.use(authenticate);
router.post("/shop/logout", asyncHandler(accessController.logout));

module.exports = router;
