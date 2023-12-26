"use strict";
const AccessController = require("../../controllers/access.controller");
const express = require("express");
const router = express.Router();
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticate } = require("../../auth/authUtils");

// Sign Up
router.post("/shop/sign-up", asyncHandler(AccessController.signUp));
router.post("/shop/login", asyncHandler(AccessController.login));

// authentication

router.use(authenticate);
router.post("/shop/logout", asyncHandler(AccessController.logout));
router.post(
  "/shop/handlerRefreshToken",
  asyncHandler(AccessController.handlerRefreshToken)
);

module.exports = router;
