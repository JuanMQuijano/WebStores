import User from "../models/User.js";
import Jwt from "jsonwebtoken";

export const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = Jwt.verify(token, process.env.JWT_SECRET);

    //Leer el usuario correspodiente al uid
    const usuario = await User.findById(uid);

    //Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en BD",
      });
    }

    //Verificar si el uid tiene estado true
    // if (!usuario.estado) {
    //   return res.status(401).json({
    //     msg: "Token no válido - estado:false",
    //   });
    // }

    req.user = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};
