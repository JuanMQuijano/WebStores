import { Router } from "express";
import {
  addCategoria,
  deleteCategoria,
  getCategorias,
  updateCategoria,
} from "../controllers/categoriaController.js";
import { validarJWT } from "../helpers/validarJWT.js";

export const router = Router();

router.get("/", getCategorias);
router.post("/", [validarJWT, addCategoria]);
router.put("/:id", [validarJWT, updateCategoria]);
router.delete("/:id", [validarJWT, deleteCategoria]);
