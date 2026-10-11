import express from "express";
import productosRouter from "./routes/productos.js";
import pedidosRouter from "./routes/pedidos.js";


const app = express();

app.use(express.json());
app.use("/productos", productosRouter);
app.use("/pedidos", pedidosRouter);

export default app;
