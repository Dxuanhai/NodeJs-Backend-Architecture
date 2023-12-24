"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
  db: { host, name, port },
} = require("../config/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;

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
        console.log("🚀 connectString:", connectString);
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
