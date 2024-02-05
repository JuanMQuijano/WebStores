import { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    img: {
      type: [String],
    },
    url: {
      type: String,
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoria es requerida"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El id del usuario es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

export const Product = model("Product", productSchema);
