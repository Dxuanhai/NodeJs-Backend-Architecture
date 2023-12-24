"use strict";

const { findById } = require("../services/apiKey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZAION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    console.log("🚀  / apiKey  / keyAnyType:", key);

    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    const objKey = await findById(key);
    console.log("🚀  / apiKey  / objKey:", objKey);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error 2",
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log("🚀  / apiKey  / error:", error);
    res.error;
  }
};
const checkPermission = (permission) => {
  return (req, res, next) => {
    console.log("🚀  / return  / check:", req);

    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "permissions denied",
      });
    }
    console.log("🚀 req.onjectKey.permissions:", req.objKey.permissions);
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "permissions denied 2",
      });
    }
    return next();
  };
  console.log("🚀  / return  / req.objKey:", req.objKey);
  console.log("🚀  / return  / req.objKey:", req.objKey);
  console.log("🚀  / return  / req.objKey:", req.objKey);
  console.log("🚀  / return  / req.objKey:", req.objKey);
  console.log("🚀  / return  / req.objKey:", req.objKey);
};
module.exports = {
  apiKey,
  checkPermission,
};
