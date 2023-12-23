"use strict";

//count connect
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDNS = 5000;

const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`countConnections: ${numConnections}`);
};

//check overload

const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * 5;
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnections > maxConnections) {
      console.log(`Connection overloaded`);
    }
  }, _SECONDNS);
};

module.exports = {
  countConnect,
  checkOverload,
};
