import bcrypt from "bcrypt";
import User from "../models/User.js";
import generarJWT from "../helpers/generarJWT.js";

function userDecorator() {
  return {
    async createUser(name, tel, email, password, admin, empresa) {
      const existeUsuario = await User.findOne({ email });

      if (existeUsuario) {
        throw new Error("Ya existe un usuario con este correo electrónico.");
      }

      const usuario = new User({ name, tel, email, password, admin, empresa });

      usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      await usuario.save();
    },

    async login(email, password) {
      const usuario = await User.findOne({ email });

      if (!usuario) {
        throw new Error("Usuario no registrado");
      }

      if (!bcrypt.compareSync(password, usuario.password)) {
        throw new Error("Password Incorrecto");
      }

      return { usuario, token: generarJWT(usuario._id) };
    },
  };
}

export default userDecorator;
