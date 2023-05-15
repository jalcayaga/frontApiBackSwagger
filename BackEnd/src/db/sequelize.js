import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config.js";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "postgres",
  }
);

export default sequelize;
