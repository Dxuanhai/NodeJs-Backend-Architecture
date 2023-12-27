"use strict";
const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../core/success.response");
class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "create new product success !",
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllDrafsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list success !",
      metadata: await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
  // QUERY

  //END QUERY
}

module.exports = new ProductController();
