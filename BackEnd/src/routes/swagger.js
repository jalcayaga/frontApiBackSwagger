import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { appConfig } from "../config/config.js";

const PORT = appConfig.PORT

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SubRed API",
      version: "1.0.0",
      description: "Documentación de mi API con Swagger",
    },
  },
  apis: ["src/routes/router.index.js", "src/models/product.model.js"],
};

// Docs en JSON format
const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const swaggerDocs = (app, PORT) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
};

console.log(`📗 Version 1 Documentacion disponible en http://localhost:${PORT}/api/v1/docs`)

