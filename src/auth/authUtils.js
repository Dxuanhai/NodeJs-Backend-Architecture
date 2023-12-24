const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });
    JWT.verify(accessToken, publicKey, (err, encode) => {
      if (err) console.log("🚀  / JWT.verify  / err:", err);
      else console.log("🚀  / JWT.verify  / encode:", encode);
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("🚀  / createTokenPair  / error:", error);
  }
};
module.exports = {
  createTokenPair,
};
