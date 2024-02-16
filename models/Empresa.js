import { Schema, model } from "mongoose";

const empresaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Empresa = model("Empresa", empresaSchema);
export default Empresa;
