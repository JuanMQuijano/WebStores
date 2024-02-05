import { Router } from "express";
import {
  createUser,
  getConnection,
  login,
} from "../controllers/userController.js";
import { validarJWT } from "../helpers/validarJWT.js";

export const router = Router();

router.post("/", createUser);
router.post("/login", login);
router.get("/auth", [validarJWT, getConnection]);
