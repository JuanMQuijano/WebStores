import { Router } from "express";
import {
  addCompra,
  completarCompra,
  getCompras,
} from "../controllers/compraController.js";
import { validarJWT } from "../helpers/validarJWT.js";

export const router = Router();

router.post("/", addCompra);
router.get("/", getCompras);
router.put("/:id", [validarJWT, completarCompra]);
