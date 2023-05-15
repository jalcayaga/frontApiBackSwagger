import { Router } from "express";

import { authenticateJWT } from "../config/auth.js"

// Importar Multer y definir la instancia de upload
import { storage } from "../utils/multer.js";
import multer from "multer";

// Importa los controladores de productos
import {
  getAllProducts,
  createProduct,
  getProduct,
  getProductByUser,
  deleteProduct,
  updateProduct,
  getImageByIdProduct,
  getUsersProductCount,
} from "../controllers/product.controller.js";
// Importa los controladores de tareas
import {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";
// Importa los controladores de usuarios
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = Router();
const upload = multer({ storage });

// Rutas para productos
/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Obtiene la lista de productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/products", getAllProducts);

router.get("/products/:id", authenticateJWT, getProduct);

router.get("/products/user/:userId", authenticateJWT, getProductByUser);

router.post("/products", authenticateJWT, upload.single("image"), createProduct);

router.delete("/products/:id", authenticateJWT, deleteProduct);

router.put("/products/:id", authenticateJWT, updateProduct);

router.get("/upload/:id", getImageByIdProduct);

// Ruta para obtener la consulta GROUP BY
router.get("/products/groupby/:id", authenticateJWT, getUsersProductCount);


//rutas para tasks
router.get("/tasks", authenticateJWT, getAllTasks);

router.get("/tasks/:id", authenticateJWT, getTask);

router.post("/tasks", authenticateJWT, createTask);

router.delete("/tasks/:id", authenticateJWT, deleteTask);

router.put("/tasks/:id", authenticateJWT, updateTask);

// manejo de usuarios
router.get("/users", authenticateJWT, getAllUsers);

router.get("/users/:id", authenticateJWT, getUser);

router.post("/users", createUser);

router.delete("/users/:id",  authenticateJWT, deleteUser);

router.put("/users/:id", authenticateJWT, updateUser);

router.post("/auth", loginUser);

export default router;
