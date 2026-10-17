import express from "express";
import productosRouter from "./routes/productos.js";
import pedidosRouter from "./routes/pedidos.js";
import reportesRouter from "./routes/reportes.js";

const app = express();

app.use(express.json());
app.use("/productos", productosRouter);
app.use("/pedidos", pedidosRouter);
app.use("/reportes", reportesRouter);

export default app;
