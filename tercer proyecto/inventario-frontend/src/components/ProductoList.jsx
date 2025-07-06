import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";

export default function ProductoList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos().then(data => setProductos(data));
  }, []);

  return (
    <div>
      <h2>📦 Lista de Productos</h2>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {p.nombre} - {p.cantidad} unidades - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
