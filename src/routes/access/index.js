"use strict";
const accessController = require("../../controllers/access.controller");
const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../auth/checkAuth");

router.post("/shop/sign-up", asyncHandler(accessController.signUp));

module.exports = router;
