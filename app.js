import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import conectarDB from "./config/db.js";
import { router as usersRouter } from "./routes/userRoutes.js";
import { router as productsRouter } from "./routes/productRoutes.js";
import { router as compraRouter } from "./routes/compraRoutes.js";
import { router as categoriaRouter } from "./routes/categoriaRoute.js";
import { router as cotizacionRouter } from "./routes/cotizacionRoute.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = Express();
conectarDB();

app.use(cors());
app.use(Express.json());
app.use(fileUpload());

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/compras", compraRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/cotizacion", cotizacionRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
