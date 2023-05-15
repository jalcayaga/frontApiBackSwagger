import sequelize from "../db/sequelize.js";
import { Op } from "sequelize";

import path from "path";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import Product from "../models/product.model.js"; // Importa el modelo de product
import User from "../models/user.model.js"; // Importa el modelo de usuario

// Crear un producto
export const createProduct = async (req, res) => {
  const { usuario_id, nombre, descripcion, precio } = req.body;
  const image = req.file;

  if (!image) {
    res.status(400).send("No se proporcionó una image");
    return;
  }

  // Guarda solo el nombre del archivo en lugar de la ruta completa del servidor
  const imagePath = path.join("uploads", image.filename);

  try {
    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      image: imagePath,
      usuario_id,
    });
    res
      .status(201)
      .json({ message: "Producto creado con éxito", product: newProduct });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).send("Error al crear producto");
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener todos los productos del backend" });
  }
};

// Obtener un producto por ID
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// Borrar un producto
// export const getProductByUser = async (req, res) => {
//   const { userId } = req.params;

//   if (!userId) {
//     return res.status(400).send('El parámetro usuarioId es necesario');
//   }

//   try {
//     const numUsuarioId = parseInt(userId);
//     const products = await Product.findAll({ where: { usuarioId: numUsuarioId } });

//     if (products && products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).send('No se encontraron productos para el usuario');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener los productos" });
//   }
// };

// Controlador para eliminar un producto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (product) {
      await product.destroy();
      res.status(200).json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (product) {
      product.nombre = nombre;
      product.descripcion = descripcion;
      product.precio = precio;
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Obtener productos por usuarios
export const getProductByUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send("El parámetro usuarioId es necesario");
  }

  try {
    const numUsuarioId = parseInt(userId);

    const products = await sequelize.query(
      `SELECT products.*
      FROM products
      INNER JOIN "Users" ON products.usuario_id = "Users".id
      WHERE "Users".id = ${numUsuarioId}
      ORDER BY products.id ASC`
    );

    if (products && products[0].length > 0) {
      // Agrega el prefijo de la URL a la propiedad image
      const productsWithImageUrls = products[0].map((product) => {
        return {
          ...product,
          image: `http://localhost:5000/api/v1/upload/${product.id}`,
        };
      });
      res.status(200).json(productsWithImageUrls);
    } else {
      res.status(404).send("No se encontraron productos para el usuario");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al obtener los productos",
        error: error.message,
      });
  }
};

// Obtener imagenes
export const getImageByIdProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("El parámetro id es necesario");
  }

  try {
    const productId = parseInt(id);
    const product = await Product.findByPk(productId);

    if (product && product.image) {
      const imagePath = path.join(
        __dirname,
        "..",
        "public/uploads",
        path.basename(product.image)
      );
      res.sendFile(imagePath);
    } else {
      res.status(404).send("Imagen no encontrada");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener la imagen", error: error.message });
  }
};

// Contar la cantidad de productos que un usuario específico tiene en la tabla products
export const getUsersProductCount = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sequelize.query(
      `
    WITH months AS (
      SELECT to_char(date_trunc('month', now()) + (interval '1 month' * generate_series(-11, 0)), 'YYYY-MM') AS month
    )
    SELECT months.month, COUNT(products.id) AS product_count
    FROM months
    LEFT JOIN products ON to_char(products.created_at, 'YYYY-MM') = months.month
    WHERE (products.usuario_id = :userId OR products.usuario_id IS NULL)
      AND products.created_at >= date_trunc('year', now())
    GROUP BY months.month
    ORDER BY months.month ASC;
    
    `,
      {
        replacements: { userId: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(result);
  } catch (error) {
    console.error("Error al realizar la consulta GROUP BY:", error);
    res
      .status(500)
      .send(`Error al realizar la consulta GROUP BY: ${error.message}`);
  }
};
