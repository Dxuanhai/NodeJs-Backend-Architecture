"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const JWT = require("jsonwebtoken");
const {
  BadRequestError,
  AuthFaiIureError,
  ForbiddenError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const roleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITER: "EDITER",
  ADMIN: "ADMIN",
};
class AccessService {
  static handlerRefreshToken = async ({ user, refreshToken, keyStore }) => {
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeybyId(user.userId);
      throw new ForbiddenError("Something went wrong ! please relogin");
    }
    if (keyStore.refreshToken !== refreshToken)
      throw new AuthFaiIureError("Shop not registered");

    const foundShop = findByEmail({ email: user.email });
    if (!foundShop) throw new AuthFaiIureError("Shop not registered 2");

    const tokens = await createTokenPair(
      { userId: foundShop._id, email: user.email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    await KeyTokenService.updateRefreshToken(
      keyStore._id,
      refreshToken,
      tokens.refreshToken
    );

    return {
      user,
      tokens,
    };
  };

  static logout = async (keyStore) => {
    const delKey = KeyTokenService.removeKeyById(keyStore._id);
    console.log("🚀  / accessService  / logout=  / delKey:", delKey);
    return delKey;
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered");

    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFaiIureError("Authentication failed");

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userld: foundShop._id,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });
    return {
      shop: getInfoData({
        fields: [`_id`, "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean();

    if (holderShop) {
      throw new BadRequestError("Error: Shop already registered");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [roleShop.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      const keyStore = await KeyTokenService.createKeyToken({
        userld: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: "xxxx",
          message: "keyStore error",
        };
      }

      const tokens = await createTokenPair(
        { userld: newShop._id, email },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: [`_id`, "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
    return {
      code: 201,
      metadata: null,
    };
  };
}
module.exports = AccessService;
