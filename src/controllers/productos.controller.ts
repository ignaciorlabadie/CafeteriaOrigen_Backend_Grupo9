import type { Request, Response } from "express";
import type { Producto } from "../models/producto.js";
import { ProductoService } from "../services/producto.service.js";

const service = new ProductoService();

function serializar(producto: Producto) {
  return {
    id: producto.id,
    nombre: producto.nombre,
    precioBase: producto.precioBase,
    precio: producto.calcularPrecio(),
  };
}

export function listarProductos(_req: Request, res: Response): void {
  res.json(service.listar().map(serializar));
}
