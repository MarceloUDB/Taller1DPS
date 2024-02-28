"use client";
import React, { useState } from 'react';
import peliculas from './peliculas.json';
import styles from './page.module.css';

function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (pelicula) => {
    const existe = carrito.find((item) => item.nombre === pelicula.nombre);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.nombre === pelicula.nombre ? { ...existe, cantidad: existe.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...pelicula, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  const cambiarCantidad = (nombre, cantidad) => {
    setCarrito(
      carrito.map((item) =>
        item.nombre === nombre ? { ...item, cantidad: Number(cantidad) } : item
      )
    );
  };

  const total = carrito.reduce((acc, curr) => acc + curr.cantidad * curr.precio, 0);

  return (
    <div className={styles.appContainer}>
      <h2 className={styles.header}>Lista de Compra de Películas</h2>
      <select className={styles.movieSelector} onChange={(e) => agregarAlCarrito(JSON.parse(e.target.value))}>
        <option value="">Seleccione una película</option>
        {peliculas.map((pelicula, index) => (
          <option key={index} value={JSON.stringify(pelicula)}>
            {pelicula.nombre}
          </option>
        ))}
      </select>
      <ul className={styles.movieList}>
        {carrito.map((item, index) => (
          <li key={index} className={styles.movieItem}>
            {item.nombre} - ${item.precio} x 
            <input
              type="number"
              className={styles.quantityInput}
              value={item.cantidad}
              onChange={(e) => cambiarCantidad(item.nombre, e.target.value)}
              min="1"
            /> = ${item.cantidad * item.precio}
            <button className={styles.removeButton} onClick={() => eliminarDelCarrito(item.nombre)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3 className={styles.totalCost}>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default App;
