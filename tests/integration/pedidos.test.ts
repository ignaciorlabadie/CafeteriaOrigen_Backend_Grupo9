import { describe, it, expect } from "vitest";
import { PedidoService } from "../../src/services/pedido.service.js";
import { ProductoRepository } from "../../src/repositories/producto.repository.js";

const service = new PedidoService(new ProductoRepository());

describe("PedidoService", () => {
  it("facturacionTotal suma los totales de todos los pedidos", () => {
    service.crear([{ productoId: 1, cantidad: 2 }]); // 10040
    service.crear([{ productoId: 20, cantidad: 1 }]); // 4200
    expect(service.facturacionTotal()).toBe(14240);
  });

  it("cantidadVendidaPorProducto agrupa por nombre", () => {
    service.crear([{ productoId: 1, cantidad: 3 }]);
    service.crear([{ productoId: 1, cantidad: 2 }, { productoId: 10, cantidad: 4 }]);
    const ventas = service.cantidadVendidaPorProducto();
    expect(ventas["Expreso Pocillo Brasil"]).toBe(5);
    expect(ventas["Filtrado Pocillo Brasil"]).toBe(4);
  });

  it("productoMasVendido es el de mayor cantidad", () => {
    const masVendido = service.productoMasVendido();
    expect(masVendido).toMatchObject({ nombre: "Expreso Pocillo Brasil", cantidad: 5 });
  });
});

describe("POST /pedidos", () => {
  it("devuelve 201 con el pedido y su total calculado", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ items: [{ productoId: 1, cantidad: 2 }, { productoId: 19, cantidad: 1 }] });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ estado: "pendiente", total: 12540 });
  });
}); 

describe("GET /pedidos/:id", () => {
  it("devuelve el pedido creado", async () => {
    const creado = await request(app).post("/pedidos").send({ items: [{ productoId: 10, cantidad: 3 }] });
    const res = await request(app).get(`/pedidos/${creado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(3 * 4040); // 12120
  });

  it("devuelve 404 si no existe", async () => {
    const res = await request(app).get("/pedidos/999");
    expect(res.status).toBe(404);
  });
});
