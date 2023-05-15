import jwt from "jsonwebtoken";
import { secret } from "../config/config.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('Token not found in cookies');
    // Redirige al usuario a la página de inicio de sesión si no hay token
    return res.redirect('/login');
  }

  console.log('Token from cookie:', token);

  try {
    const decoded = jwt.verify(token, secret.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    // Redirige al usuario a la página de inicio de sesión si el token ha expirado o es inválido
    res.redirect('/login');
  }
};
