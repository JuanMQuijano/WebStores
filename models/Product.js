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
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
    },
    stock_min: {
      type: String
    },
    stock: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El id del usuario es requerido"],
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "Empresa",
      default: null,
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
