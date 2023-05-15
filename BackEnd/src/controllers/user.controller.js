import User from "../models/user.model.js"; // Importa el modelo de usuario

import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwtUtils.js";

// Obtener un usuario
export const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error al obtener el usuario: ${err.message}`);
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      order: [
        ['id', 'ASC'] // Ordenar por 'id' en orden ascendente (ASC)
      ]
    });
    res.json({ usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener usuarios");
  }
};

// Crear un usuario
export const createUser = async (req, res) => {
  const { nombre, apellido, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ error: "Las contraseñas no coinciden" });
    return;
  }

  // Hashea la contraseña antes de guardarla en la base de datos
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear el usuario");
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, apellido, email, password, confirmPassword } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Las contraseñas no coinciden" });
      return;
    }

    // Hashea la contraseña antes de guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await user.update({
      nombre,
      apellido,
      email,
      password: hashedPassword,
    });

    res.json({ updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error al actualizar el usuario: ${err.message}`);
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar el usuario");
  }
};

// Validar el inicio de sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario por correo electrónico en la base de datos
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Email or password incorrect" });
    }

    // Comprueba si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email or password incorrect" });
    }

    // Genera el token JWT y lo incluye en la respuesta
    const token = generateToken({ userId: user.id, email: user.email });

    // Incluye el nombre del usuario en la respuesta
    console.log("userId:", user.id, "userName:", user.nombre);
    return res
      .status(200)
      .json({ token, userId: user.id, userName: user.nombre });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while logging in");
  }
};
