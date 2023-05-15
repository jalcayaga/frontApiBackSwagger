
// render pagina principal
export const renderIndexPage = (req, res) => {
  res.render("index");
};

// render pagina servicios
export const renderServicios = (req, res) => {
  res.render("servicios");
};

// render pagina planes
export const renderPlanes = (req, res) => {
  res.render("planes");
};

// render pagina login
export const renderLogin = (req, res) => {
  res.render("login");
};

// render pagina principal
export const renderDashboard = (req, res) => {
  const usuarioId = req.cookies.userId;
  const userName = req.cookies.userName;

  console.log("Cookies: ", req.cookies);
  console.log("Nombre del usuario: ", userName);

  res.render('dashboard', { usuario: { id: usuarioId, nombre: userName } });
}

// render pagina ventas
export const renderVentas = (req, res) => {
  const usuarioId = req.cookies.userId;
  const userName = req.cookies.userName;
  res.render('ventas', { usuario: { id: usuarioId, nombre: userName } });
};

// render pagina clientes
export const renderClientes = (req, res) => {
  const usuarioId = req.cookies.userId;
  const userName = req.cookies.userName;
  res.render('clientes', { usuario: { id: usuarioId, nombre: userName } });
};

// render pagina informes
export const renderInformes = (req, res) => {
  const usuarioId = req.cookies.userId;
  const userName = req.cookies.userName;
  res.render('informes', { usuario: { id: usuarioId, nombre: userName } });
};

// render pagina ayuda
export const renderAyuda = (req, res) => {
  const usuarioId = req.cookies.userId;
  const userName = req.cookies.userName;
  res.render('ayuda', { usuario: { id: usuarioId, nombre: userName } });
};
