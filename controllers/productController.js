import { request, response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Product } from "../models/Product.js";
import { subirArchivo } from "../helpers/subirArchivo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, description, price, categoria, stock_min, stock } = req.body;
  let arrNombres = [];

  try {
    const product = await Product.findById(id);

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.categoria = categoria || product.categoria;
    product.stock_min = stock_min || product.stock_min;
    product.stock = stock || product.stock;

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

export const updateProductShop = async (producto) => {
  const { uid, cantidad } = producto;

  try {

    const product = await Product.findById(uid);

    product.stock = new String(parseInt(product.stock) - parseInt(cantidad));

    await product.save();
  } catch (error) {
    console.log(error);

  }
};