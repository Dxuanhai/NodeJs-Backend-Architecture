"use strict";

const apiKeyModel = require("../models/apiKey.model");
const crypto = require("crypto");
const findById = async (key) => {
  try {
    const newKey = await apiKeyModel.create({
      key: crypto.randomBytes(64).toString("hex"),
      permissions: ["0000"],
    });
    console.log("🚀  / findById  / newKey:", newKey);
    const objKey = await apiKeyModel.findOne({
      key,
      status: true,
    });
    return objKey;
  } catch (error) {
    console.log("🚀  / findById  / error:", error);
    return null;
  }
};

module.exports = { findById };
