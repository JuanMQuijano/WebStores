import { request, response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Product } from "../models/Product.js";
import { subirArchivo } from "../helpers/subirArchivo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, description, price, categoria } = req.body;
  let arrNombres = [];

  try {
    const product = await Product.findById(id);

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.categoria = categoria || product.categoria;

    if (req.files != null) {
      if (req.files.img && Object.keys(req.files).length > 0) {
        arrNombres = await subirArchivo(req.files);
        product.img = arrNombres || product.img;
      }
    }

    await product.save();

    res
      .status(201)
      .json({ ok: true, msg: "Producto Actualizado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};