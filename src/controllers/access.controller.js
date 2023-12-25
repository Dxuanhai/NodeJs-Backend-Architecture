"use strict";
const accessService = require("../services/access.service");
const { CREATED, OK, SuccessResponse } = require("../core/success.response");
class accessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registed OK !",
      metadata: await accessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await accessService.login(req.body),
    }).send(res);
  };
  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "logged out",
      metadata: await accessService.logout(req.keyStore),
    }).send(res);
  };
}

module.exports = new accessController();
