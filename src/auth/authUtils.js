const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const { AuthFaiIureError, NotFoundError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZAION: "authorization",
};
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

const authenticate = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFaiIureError("Invalid Request");

  const keyStore = await findByUserId(userId);

  if (!keyStore) throw new NotFoundError("Not Found");

  const accessToken = req.headers[HEADER.AUTHORIZAION];
  if (!accessToken) throw new AuthFaiIureError("Invalid Request");

  try {
    const decode = await JWT.verify(accessToken, keyStore.publicKey);
    console.log("🚀  / authenticate  / decode:", decode);
    if (decode.userId !== userId) throw new AuthFaiIureError("Invalid userId");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});
module.exports = {
  createTokenPair,
  authenticate,
};
