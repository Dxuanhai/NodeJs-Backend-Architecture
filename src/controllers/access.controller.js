"use strict";
const AccessService = require("../services/access.service");
const { CREATED, SuccessResponse } = require("../core/success.response");
class AccessController {
  handlerRefreshToken = async (req, res, next) => {
    new CREATED({
      message: "get Token Succes !",
      metadata: await AccessService.handlerRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registed OK !",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "logged out",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };
}

module.exports = new AccessController();
