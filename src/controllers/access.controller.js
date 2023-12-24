"use strict";

const accessService = require("../services/access.service");

class accessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`P] signup: `, req.body);

      return res.status(201).json(await accessService.signUp(req.body));
    } catch (error) {
      console.log("🚀  / accessController  / signUp=  / error:", error);
      next(error);
    }
  };
}

module.exports = new accessController();
