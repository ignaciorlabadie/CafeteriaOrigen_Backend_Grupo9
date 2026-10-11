import type { Producto } from "../models/producto.js";
import { ProductoRepository } from "../repositories/producto.repository.js";

export class ProductoService {
  constructor(private readonly repository: ProductoRepository = new ProductoRepository()) {}

  listar(): Producto[] {
    return this.repository.getAll();
  }

  obtenerPorId(id: number): Producto | undefined {
    return this.repository.getById(id);
  }
}
