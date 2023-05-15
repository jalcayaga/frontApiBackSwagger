import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

import { isAuthenticated } from "../utils/auth.js";

import {
  renderIndexPage,
  renderServicios,
  renderPlanes,
  renderLogin,
  renderVentas,
  renderClientes,
  renderInformes,
  renderAyuda,
} from "../controllers/index.controller.js";

import {
  getAllUsers,
  createUser,
  userDelete,
  userUpdate,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";

import {
  createProduct,
  productDelete,
  productUpdate,
  getProductsByUser,
  showProductStats,
} from "../controllers/product.controller.js";

const router = express.Router();

// Ruta para mostrar la página principal
router.get("/", renderIndexPage);

/* ---------------------------------- services ---------------------------------- */
// Ruta para mostrar la página contact
router.get("/servicios", renderServicios);

/* ---------------------------------- planes ---------------------------------- */
// Ruta para mostrar la página pricing
router.get("/planes", renderPlanes);

/* ---------------------------------- login ---------------------------------- */
// Ruta para mostrar la página login
router.get("/login", renderLogin);


/* ---------------------------------- dashboard ---------------------------------- */
// Ruta para mostrar dashboard
router.get("/dashboard", isAuthenticated, showProductStats);

/* ---------------------------------- ventas ---------------------------------- */
// Ruta para mostrar la página principal ventas
router.get("/ventas", isAuthenticated, renderVentas);

/* ---------------------------------- Clientes ---------------------------------- */
// Ruta para mostrar la página principal clientes
router.get("/clientes", isAuthenticated, renderClientes);

/* ---------------------------------- Products ---------------------------------- */
// Ruta para mostrar la página products
router.get("/products", isAuthenticated, getProductsByUser);

/* ---------------------------------- Informes ---------------------------------- */
// Ruta para mostrar la página informes
router.get("/informes", isAuthenticated, renderInformes);

/* ---------------------------------- Ayuda ---------------------------------- */
// Ruta para mostrar la página principal ayuda
router.get("/ayuda", isAuthenticated, renderAyuda);

/* ---------------------------------- Users ---------------------------------- */
// Ruta para mostrar la página principal Users
router.get("/users", isAuthenticated, getAllUsers);

/* ---------------------------------- CRUD products ---------------------------------- */
// Ruta para crear productos
router.post("/products", isAuthenticated, upload.single("image"), createProduct);

// Ruta para actualizar un producto
router.post("/products/update/:id", isAuthenticated, productUpdate);

// Ruta para eliminar un producto
router.post("/products/delete/:id", isAuthenticated, productDelete);


/* ---------------------------------- CRUD Users ---------------------------------- */
// Ruta para crear usuario
router.post("/users", createUser);

// Ruta para actualizar un usuario
router.post("/users/update/:id", isAuthenticated, userUpdate);

// Ruta para eliminar un usuario
router.post("/users/delete/:id", isAuthenticated, userDelete);

// Ruta para validar el inicio de sesión
router.post("/login", loginUser);

router.get("/logout", logoutUser);

export default router;
