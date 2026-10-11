import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("GET /productos", () => {
  it("devuelve 200 y los 20 productos", async () => {
    const res = await request(app).get("/productos");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(20);
  });

  it("cada producto trae id, nombre y precio calculado", async () => {
    const res = await request(app).get("/productos");
    expect(res.body[0]).toMatchObject({
      id: 1,
      nombre: "Expreso Pocillo Brasil",
      precioBase: 2500,
      precio: 5020,
    });
  });
});
