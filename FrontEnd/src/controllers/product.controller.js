import express from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios"; // Importa axios

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Crear todos productos
export const createProduct = async (req, res) => {
  const usuarioId = req.cookies.userId;
  const token = req.cookies.token;

  const { nombre, descripcion, precio } = req.body;
  const file = req.file; // Aquí se obtiene el archivo

  // Preparar el formulario para enviarlo al backend
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("descripcion", descripcion);
  formData.append("precio", precio);
  formData.append("image", file.buffer, file.originalname);
  formData.append("usuario_id", usuarioId);
  console.log(formData);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/products/",
      formData,
      config
    );

    if (response.status === 201) {
      console.log("Producto creado:", response.data);
      res.redirect("/products"); // Redirige al usuario a la página de productos
    } else {
      console.error("Error al crear producto:", response.data);
      res
        .status(500)
        .json({ message: "Error al crear el producto", error: response.data });
    }
  } catch (err) {
    console.error("Error al realizar la solicitud:", err);
    res
      .status(500)
      .json({ message: "Error al realizar la solicitud", error: err });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const usuarioId = req.cookies.userId;
    const userName = req.cookies.userName;
    const token = req.cookies.token;
    
    const response = await fetch(
      `http://localhost:5000/api/v1/products/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );

    if (response.status !== 200) {
      const error = await response.json();
      console.error("Error al obtener productos:", error);
      res.status(500).send("Error al obtener productos");
    } else {
      const allProducts = await response.json();
      // Convertir usuarioId a número y filtrar productos por usuarioId
      const numUsuarioId = parseInt(usuarioId);
      const products = allProducts.filter(
        (product) => product.usuarioId === numUsuarioId
      );
      console.log("Productos obtenidos:", products);
      res.render("products", {
        products,
        usuario: { id: usuarioId, nombre: userName },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener productos");
  }
};

// Obtener todos los productos del usuario
export const getProductsByUser = async (req, res) => {
  try {
    const usuarioId = req.cookies.userId;
    const userName = req.cookies.userName;
    const token = req.cookies.token;
    console.log(usuarioId, userName);
    const response = await fetch(
      `http://localhost:5000/api/v1/products/user/${usuarioId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    if (response.status === 404) {
      console.log("No se encontraron productos para el usuario");
      res.render("products", {
        productsUser: [],
        usuario: { id: usuarioId, nombre: userName },
      });
    } else if (response.status !== 200) {
      console.error("Error al obtener productos:", responseText);
      res.status(404).send("Error al obtener productos");
    } else {
      const productsUser = JSON.parse(responseText);
      console.log("Productos obtenidos:", productsUser);
      res.render("products", {
        productsUser,
        usuario: { id: usuarioId, nombre: userName },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener productos");
  }
};

// Actualizar un producto:
export const productUpdate = async (req, res) => {
  const { id, nombre, descripcion, precio } = req.body;
  const token = req.cookies.token;

  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, descripcion, precio }),
      }
    );

    if (response.status !== 200) {
      const error = await response.json();
      console.error("Error al actualizar el producto:", error);
      res.status(500).send(`Error al actualizar el producto: ${error.message}`);
    } else {
      console.log("Producto actualizado");
      res.redirect("/products");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error al actualizar el producto: ${err.message}`);
  }
};

// Eliminar un producto:
export const productDelete = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    );

    if (response.status !== 200) {
      const error = await response.json();
      console.error("Error al eliminar el producto:", error);
      res.status(500).send("Error al eliminar el producto");
    } else {
      console.log("Producto eliminado");
      res.redirect("/products");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar el producto");
  }
};

// Obtener stats
export const showProductStats = async (req, res) => {
  const usuarioId = req.cookies.userId;
  const userName = req.cookies.userName;
  const token = req.cookies.token;
  console.log("Cookies: ", req.cookies);

  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/products/groupby/${usuarioId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    const data = await response.json();
    console.log(data);
    res.render("dashboard", {
      data,
      usuario: { id: usuarioId, nombre: userName },
    });
  } catch (err) {
    console.error(
      "Error al obtener la información de los productos por usuario:",
      err
    );
    res
      .status(500)
      .send(
        `Error al obtener la información de los productos por usuario: ${err.message}`
      );
  }
};
