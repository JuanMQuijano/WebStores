import { Schema, model } from "mongoose";

const categoriaSchema = Schema(
  {
    //Dentro del Schema como un objeto, definimos el nombre y tipo de dato que tendrá el Schema
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categoriaSchema.methods.toJSON = function () {
  const { __v, _id, createdAt, updatedAt, ...rest } = this.toObject();
  rest.uid = _id;
  return rest;
};

const Categoria = model("Categoria", categoriaSchema);
export default Categoria;
