import { request, response } from "express";
import { Compra } from "../models/Compra.js";
import { updateProductShop } from "./productController.js";

export const addCompra = async (req = request, res = response) => {
  const { customer, products } = req.body;

  try {
    const compra = new Compra({ customer, products });

    await compra.save();

    res.status(200).json({ ok: true, msg: "Compra realizada" });
  } catch (error) {
    console.log(error);
  }
};

export const getCompras = async (req = request, res = response) => {
  try {
    const data = await Compra.find()
      .populate("customer", "name tel")
      .populate("products", "name price");

    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const completarCompra = async (req = request, res = response) => {
  const { id } = req.params;

  const { products } = req.body

  try {
    const compra = await Compra.findById(id);
    compra.status = true;

    for (let i = 0; i < products.length; i++) {
      await updateProductShop(products[i])
    }

    await compra.save();

    res.status(200).json({ ok: true, msg: "Compra Completada" });
  } catch (error) {
    console.log(error);
  }
};
