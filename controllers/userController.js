import { response, request } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generarJWT from "../helpers/generarJWT.js";

export const createUser = async (req = request, res = response) => {
  const { name, tel, email, password, admin } = req.body;

  try {
    const existeUsuario = await User.findOne({ email });

    if (existeUsuario) {
      return res.status(401).json({
        ok: false,
        msg: `El usuario ya se encuentra registrado`,
      });
    }

    const usuario = new User({ name, tel, email, password });

    usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    if (admin != null) usuario.admin = admin;

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: "Usuario Registrado Correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no registrado",
      });
    }

    if (!bcrypt.compareSync(password, usuario.password)) {
      return res.status(400).json({
        ok: false,
        msg: "Password Incorrecto",
      });
    }

    res.status(200).json({ ok: true, usuario, token: generarJWT(usuario._id) });
  } catch (error) {
    console.log(error);
  }
};

export const getConnection = async (req = request, res = response) => {
  const { _id: uid, name, admin } = req.user;
  res.status(200).json({ uid, name, admin });
};
