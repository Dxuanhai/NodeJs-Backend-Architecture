"use strict";
const mongoose = require("mongoose");
const connectString = `mongodb://localhost:27017/shopDev`;
const { countConnect } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb ") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("connected Database | ", countConnect());
      })
      .catch((err) => console.error);
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
