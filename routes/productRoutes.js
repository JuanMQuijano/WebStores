import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { validarJWT } from "../helpers/validarJWT.js";
import { updateProduct } from "../controllers/productController.js";
import productDecorator from "../decorators/productDecorator.js";
import { subirArchivo } from "../helpers/subirArchivo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = Router();
const decoratorProduct = productDecorator();

router.post("/add", [validarJWT], async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
    return res.status(400).json({ msg: "No hay Imagen que subir" });
  }

  const { name, description, price, categoria, stock_min, stock } = req.body;
  const { _id: user, empresa } = req.user;

  try {
    let arrNombres = await subirArchivo(req.files);

    const data = {
      name,
      description,
      price,
      img: arrNombres,
      user,
      categoria,
      stock_min,
      stock,
      empresa,
    };

    await decoratorProduct.addProduct(data);

    res.status(201).json({ ok: true, msg: "Producto Agregado Correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:empresa", async (req, res) => {
  try {
    const { empresa } = req.params;
    const productos = await decoratorProduct.getProducts(empresa);

    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", [validarJWT], async (req, res) => {
  const { id } = req.params;

  try {
    await decoratorProduct.deleteProduct(id);

    return res.status(200).json({
      ok: true,
      msg: "Producto Eliminado",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", [validarJWT], async (req, res) => {
  const { id } = req.params;
  try {
    const product = await decoratorProduct.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await decoratorProduct.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

router.get("/image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.sendFile(path.resolve(__dirname + `/../uploads/${id}`));
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:id", [validarJWT, updateProduct]);
router.get("/get/:nameParams", async (req, res) => {
  const { nameParams } = req.params;

  try {
    const productos = await decoratorProduct.getProductByName(nameParams);

    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
  }
});
