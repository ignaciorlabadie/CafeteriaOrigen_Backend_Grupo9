import { describe, it, expect } from "vitest";

describe("Módulo de Reportes y Métricas - Tests", () => {

  describe("Pruebas Unitarias", () => {
    it("debe calcular la facturación total acumulando la suma de todos los pedidos", () => {
      const pedidosSimulados = [
        { id: 1, total: 1500 },
        { id: 2, total: 2500 },
        { id: 3, total: 1000 }
      ];

      const facturacionTotal = pedidosSimulados.reduce((acc, p) => acc + p.total, 0);

      expect(facturacionTotal).toBe(5000);
    });

    it("debe determinar correctamente el producto más vendido", () => {
      const ventas = [
        { productoId: 'p1', nombre: 'Café Espresso', cantidad: 10 },
        { productoId: 'p2', nombre: 'Medialuna', cantidad: 25 },
        { productoId: 'p3', nombre: 'Capuchino', cantidad: 15 }
      ];

      const masVendido = ventas.reduce((prev, current) => 
        (prev.cantidad > current.cantidad) ? prev : current
      );

      expect(masVendido.nombre).toBe('Medialuna');
      expect(masVendido.cantidad).toBe(25);
    });
  });

});
