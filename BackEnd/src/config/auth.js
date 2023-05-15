import { verifyToken } from './jwtUtils.js';

export function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtén el token de la cabecera 'Authorization'

  if (!token) {
    return res.status(401).send('Token no proporcionado');
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).send('Token inválido');
  }
}
