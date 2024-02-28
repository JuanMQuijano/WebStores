import Router from "express";
import { completarCotizacion, createCotizacion, getCotizaciones } from "../controllers/cotizacionController.js";

export const router = Router();

router.post("/", createCotizacion);
router.get("/", getCotizaciones);
router.put("/:id", completarCotizacion);
