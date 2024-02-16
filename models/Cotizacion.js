import { Schema, model } from "mongoose";

const cotizacionSchema = Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  tel: {
    type: String,
    required: true,
    trim: true,
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

const Cotizacion = model("Cotizacion", cotizacionSchema);
export default Cotizacion;
