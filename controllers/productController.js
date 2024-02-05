import path from "path";
import { request, response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../models/Product.js";
import { subirArchivo } from "../helpers/subirArchivo.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addProduct = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
    return res.status(400).json({ msg: "No hay Imagen que subir" });
  }

  const { name, description, price, categoria } = req.body;
  const { _id: user } = req.user;

  try {
    let arrNombres = await subirArchivo(req.files);

    const data = {
      name,
      description,
      price,
      img: arrNombres,
      user,
      categoria,
    };

    const product = new Product(data);
    product.url = uuidv4();

    await product.save();

    res.status(201).json({ ok: true, msg: "Producto Agregado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req = request, res = response) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const producto = await Product.findById(id);
    await producto.deleteOne();

    return res.status(200).json({
      ok: true,
      msg: "Producto Eliminado",
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerImagenProducto = async (req, res = response) => {
  const { id } = req.params;

  try {
    res.sendFile(path.resolve(__dirname + `/../uploads/${id}`));
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

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

export const getProductByName = async (req = request, res = response) => {
  const { nameParams } = req.params;

  try {
    const productos = await Product.find({
      name: { $regex: new RegExp(nameParams, "i") },
    });

    res.status(200).json(productos);
  } catch (error) {}
};
