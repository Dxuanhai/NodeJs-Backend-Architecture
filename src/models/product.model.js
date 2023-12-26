"use strict";

const { Schema, model, Types } = require("mongoose");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    product_attributes: { type: Schema.Types.Mixed, required: true },
  },
  {
    collation: { locale: "en_US", strength: 1 },
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
  },
  {
    collation: { locale: "en_US", strength: 1 },
    collection: "clothes",
    timestamps: true,
  }
);
const electronicSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
  },
  {
    collation: { locale: "en_US", strength: 1 },
    collection: "electronics",
    timestamps: true,
  }
);

module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  clothing: model("clothings", clothingSchema),
  electronic: model("electronics", electronicSchema),
};
