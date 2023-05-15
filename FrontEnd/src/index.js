import express from "express";
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import cors from "cors";

import routes from "./routes/routes.index.js";
import { appConfig } from "./config/config.js";

import path from "path";
import {fileURLToPath} from "url";

// Middleware para procesar el body de las solicitudes
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Settings
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json())

// global variables
app.use((req, res, next) => {
  console.log(appConfig.APPID)
  app.locals.APPID = appConfig.APPID;
  next();
});

// Routes
app.use(routes);

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).render("404");

  return res.json({
    message: err.message,
  });
});

// Manejador de puertos
app.listen(appConfig.PORT, () => {
  console.log(`Server is running on port ${appConfig.PORT}.`);
});

export default app;
