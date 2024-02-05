import jwt from "jsonwebtoken";

const generarJWT = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generarJWT;
