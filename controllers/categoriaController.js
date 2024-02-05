import { request, response } from "express";
import Categoria from "../models/Categoria.js";

export const getCategorias = async (req = request, res = response) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    console.log(error);
  }
};

export const addCategoria = async (req = request, res = response) => {
  const { name } = req.body;

  try {
    const existeCategoria = await Categoria.findOne({ name });

    if (existeCategoria) {
      res
        .status(200)
        .json({ ok: false, msg: "La categoria ya se encuentra registrada" });
      return;
    }

    const categoria = new Categoria({ name });
    await categoria.save();

    res.status(200).json({ ok: true, msg: "Categoria Agregada Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const { name } = req.body;

  try {
    const categoria = await Categoria.findById(id);

    categoria.name = name || product.name;

    await categoria.save();

    res
      .status(201)
      .json({ ok: true, msg: "Categoria Actualizada Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id);

    await categoria.deleteOne();

    return res.status(200).json({
      ok: true,
      msg: "Categoria Eliminada",
    });
  } catch (error) {
    console.log(error);
  }
};
