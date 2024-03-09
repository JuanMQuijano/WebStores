import { Schema, model } from "mongoose";

const cotizacionSchema = Schema({
  name: {
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
  weigth: {
    type: String,
    trim: true
  },
  from: {
    type: String,
    trim: true
  }, to: {
    type: String,
    trim: true
  }, price: {
    type: String,
    trim: true
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
