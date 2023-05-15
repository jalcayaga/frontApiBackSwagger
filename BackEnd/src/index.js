import express from "express";
import morgan from "morgan";
import cors from "cors";

// swagger docs
import { swaggerDocs as V1SwaggerDocs } from "./routes/swagger.js"

//soporte para servir archivos estáticos
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/router.index.js";
import { appConfig } from "./config/config.js";

import sequelize from "./db/sequelize.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware para procesar el body de las solicitudes
app.use(express.json());

// Configurar ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, "src/public/uploads")));

app.use(cors());
app.use(morgan("dev"));

//path routes
app.use("/api/v1", routes);

// Manejador de errores para rutas no encontradas
app.use((err, req, res, next) => {
  res.status(404).send("Not Found");

  return res.json({
    message: err.message,
  });
});

// Sincroniza los modelos y arranca el servidor
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    return sequelize.sync();
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
    app.listen(appConfig.PORT, () => {
      console.log("Server is running on port:", appConfig.PORT);
      V1SwaggerDocs(app, appConfig.PORT)
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
