import { Schema, model } from "mongoose";

const usuarioSchema = Schema(
  {
    //Dentro del Schema como un objeto, definimos el nombre y tipo de dato que tendrá el Schema
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tel: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "Empresa",
      default: null,
    },
  },
  //Definimos los timestamps, para agregar las columnas de cuando fue creado y cuando fue actualizado
  {
    timestamps: true,
  }
);

usuarioSchema.methods.toJSON = function () {
  const { __v, _id, password, createdAt, updatedAt, ...rest } = this.toObject();
  rest.uid = _id;
  return rest;
};

//Definimos el modelo, recibe el nombre del modelo y el Schema
const User = model("User", usuarioSchema);

export default User;
