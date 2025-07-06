import { useEffect, useState } from "react";
import { guardarProducto, editarProducto } from "../services/ProductoService";

export default function ProductoForm({ productoEditar, onFinalizado }) {
  const [producto, setProducto] = useState({
    nombre: "",
    cantidad: "",
    precio: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (productoEditar) {
      setProducto(productoEditar);
    } else {
      setProducto({ nombre: "", cantidad: "", precio: "" });
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validar = () => {
    if (producto.nombre.trim() === "") return "El nombre no puede estar vacío";
    if (Number(producto.cantidad) <= 0) return "Cantidad inválida";
    if (Number(producto.precio) <= 0) return "Precio inválido";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mensajeError = validar();
    if (mensajeError) return setError(mensajeError);

    if (productoEditar) {
      await editarProducto(producto.id, producto);
    } else {
      await guardarProducto(producto);
    }

    setProducto({ nombre: "", cantidad: "", precio: "" });
    setError("");
    onFinalizado();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{productoEditar ? "✏️ Editar" : "🆕 Agregar"} Producto</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre}
        onChange={handleChange}
      />
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={producto.cantidad}
        onChange={handleChange}
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
      />

      <button type="submit">{productoEditar ? "Guardar cambios" : "Agregar"}</button>
    </form>
  );
}
