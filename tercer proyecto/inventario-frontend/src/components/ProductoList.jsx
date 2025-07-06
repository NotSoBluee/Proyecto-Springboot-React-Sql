import { useEffect, useState } from "react";
import {
  obtenerProductos,
  eliminarProducto
} from "../services/ProductoService";
import ProductoForm from "./ProductoForm";

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que querés eliminar este producto?")) {
      await eliminarProducto(id);
      cargarProductos();
    }
  };

  return (
    <div>
      <ProductoForm
        productoEditar={productoEditar}
        onFinalizado={() => {
          setProductoEditar(null);
          cargarProductos();
        }}
      />

      <h2>📦 Lista de Productos</h2>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - {p.cantidad} unidades - ${p.precio}
            <button onClick={() => setProductoEditar(p)}>✏️</button>
            <button onClick={() => handleEliminar(p.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
