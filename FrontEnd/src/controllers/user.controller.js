

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const usuarioId = req.cookies.userId;
    const userName = req.cookies.userName;
    const token = req.cookies.token;
    const response = await fetch("http://localhost:5000/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status !== 200) {
      const error = await response.json();
      console.error("Error al obtener usuarios:", error);
      res.status(500).send("Error al obtener usuarios");
    } else {
      const data = await response.json();
      const users = data.usuarios;
      console.log("Usuarios obtenidos:", users);
      res.render("users", { users, usuario: { id: usuarioId, nombre: userName } });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener usuarios");
  }
};
// Crear un usuario
export const createUser = async (req, res) => {
  const { nombre, apellido, email, password, confirmPassword } = req.body;
  
  try {
    const response = await fetch("http://localhost:5000/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        password,
        confirmPassword,
      }),
    });

    if (response.status !== 201) {
      const error = await response.json();
      console.error("Error al crear usuario:", error);
    } else {
      const newUser = await response.json();
      console.log("Usuario creado:", newUser);
      res.redirect("/users");
    }
  } catch (err) {
    console.error("Error al realizar la solicitud:", err);
  }
};
// Actualizar un usuario
export const userUpdate = async (req, res) => {
  const { id, nombre, apellido, email, password, confirmPassword } = req.body;
  const token = req.cookies.token;
  try {
    const response = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, apellido, email, password, confirmPassword }),
    });

    if (response.status !== 200) {
      const error = await response.json();
      console.error("Error al actualizar el usuario:", error);
      res.status(500).send(`Error al actualizar el usuario: ${error.message}`);
    } else {
      console.log("Usuario actualizado");
      res.redirect("/users");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error al actualizar el usuario: ${err.message}`);
  }
};
// Eliminar un usuario
export const userDelete = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;
  try {
    const response = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status !== 200) {
      const error = await response.json();
      console.error("Error al eliminar el usuario:", error);
      res.status(500).send("Error al eliminar el usuario");
    } else {
      console.log("Usuario eliminado");
      res.redirect("/users");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar el usuario");
  }
};
// Validar el inicio de sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await fetch("http://localhost:5000/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      const error = await response.json();
      console.error("Error al iniciar sesión:", error);
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const { token, userId, userName } = await response.json(); // Asegúrate de que el servidor devuelva el nombre del usuario en la respuesta
      console.log("Inicio de sesión exitoso");

      // Establece una cookie para el token, una para el ID del usuario y otra para el nombre del usuario
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.cookie("userId", userId, { httpOnly: true, secure: true });
      res.cookie("userName", userName, { httpOnly: true, secure: true }); // Almacena el nombre del usuario en una cookie
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error("Error al realizar la solicitud:", err);
    res.status(500).send("Error al iniciar sesión");
  }
};
// Validar el logout de sesión
export const logoutUser = (req, res) => {
  console.log("logout user");
  // Cuando el usuario cierra sesión
  res.clearCookie("token");
  res.redirect("/");
};