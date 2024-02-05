import { Router } from "express";
import { validarJWT } from "../helpers/validarJWT.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductByName,
  getProducts,
  obtenerImagenProducto,
  updateProduct,
} from "../controllers/productController.js";

export const router = Router();

router.post("/add", [validarJWT, addProduct]);
router.get("/", getProducts);
router.get("/image/:id", obtenerImagenProducto);
router.get("/:id", [validarJWT, getProduct]);
router.delete("/delete/:id", [validarJWT, deleteProduct]);
router.put("/update/:id", [validarJWT, updateProduct]);
router.get("/get/:nameParams", getProductByName);
