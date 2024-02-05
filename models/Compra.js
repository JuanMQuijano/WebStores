import { Schema, model } from "mongoose";

const compraSchema = Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export const Compra = model("Compra", compraSchema);
