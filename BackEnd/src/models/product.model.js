import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import User from "./user.model.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

//Esta relación indica que un producto pertenece a un usuario.
Product.belongsTo(User, { foreignKey: "usuario_id" });

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - descripcion
 *         - precio
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del producto
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *         descripcion:
 *           type: string
 *           description: Descripción del producto
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *         image:
 *           type: string
 *           description: URL de la imagen del producto
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario al que pertenece el producto
 */

export default Product;
