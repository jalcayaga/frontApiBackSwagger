import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import express from "express";
const __dirname = path.resolve();


// Configuración de Multer
export const storage = multer.diskStorage({
  destination: path.join(__dirname, "src/public/uploads"),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${uuidv4()}${extension}`;
    cb(null, filename);
  }
});


export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000 // Tamaño máximo del archivo en bytes (en este caso, 1MB)
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('El archivo debe ser una imagen válida.'));
    }
    cb(null, true);
  }
});

export default upload;
