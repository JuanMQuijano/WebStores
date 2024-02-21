import { Router } from "express";
import { validarJWT } from "../helpers/validarJWT.js";
import userDecorator from "../decorators/userDecorator.js";

export const router = Router();

const decoratedUser = userDecorator();

router.post("/", async (req, res) => {
  const { name, tel, email, password, admin, empresa } = req.body;

  try {
    await decoratedUser.createUser(name, tel, email, password, admin, empresa);
    res.status(201).json({
      ok: true,
      msg: "Usuario Registrado Correctamente",
    });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const info = await decoratedUser.login(email, password);

    res
      .status(200)
      .json({ ok: true, usuario: info.usuario, token: info.token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, msg: error.message });
  }
});

router.get("/auth", [validarJWT], async (req = request, res = response) => {
  const { _id: uid, name, admin, empresa } = req.user;
  res.status(200).json({ uid, name, admin, empresa });
});
