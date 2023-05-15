
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';

export function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}
