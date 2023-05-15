export default {
  apps: [
    {
      name: "My-FronEnd-dev",
      script: "./src/index.js", // Asegúrate de especificar la ruta correcta a tu archivo de entrada
      instances: 1, // Ejecuta una sola instancia en modo desarrollo
      exec_mode: "fork", // Utiliza el modo "fork" en lugar de "cluster" para el entorno de desarrollo
      watch: true, // Reinicia automáticamente la aplicación cuando se detecten cambios en el código fuente
      ignore_watch: ["node_modules", "logs"], // Carpetas que se deben ignorar para reinicio automático
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};

// npm install pm2 -g
// pm2 start ecosystem.config.js
// Puedes usar los mismos comandos básicos de PM2 para administrar y monitorear tus aplicaciones en modo desarrollo:
// pm2 list: Muestra una lista de aplicaciones gestionadas por PM2.
// pm2 stop mi-backend-dev: Detiene la aplicación llamada "mi-backend-dev".
// pm2 restart mi-backend-dev: Reinicia la aplicación llamada "mi-backend-dev".
// pm2 delete mi-backend-dev: Elimina la aplicación llamada "mi-backend-dev" de la lista de aplicaciones gestionadas por PM2.
// pm2 monit: Muestra un panel de monitoreo en tiempo real de tus aplicaciones.

// export default {
//   apps: [
//     {
//       name: "mi-backend-dev",
//       script: "./src/index.js", 
//     },
//   ],
// };
//   Sin embargo, PM2 no es compatible de forma nativa con la sintaxis import/export de ES6 en archivos de configuración. Para utilizar la sintaxis ES6 en tu archivo de configuración, puedes utilizar esm como un intermediario. Primero, instala esm como una dependencia de tu proyecto:

// npm install esm
// Luego, ejecuta tu aplicación con PM2 utilizando la opción -r esm para requerir el módulo esm antes de iniciar la aplicación:

// pm2 start -r esm ecosystem.config.js
// Esto te permitirá utilizar la sintaxis ES6 en tu archivo ecosystem.config.js. Sin embargo, ten en cuenta que esto añade una dependencia adicional a tu proyecto y puede no ser tan fácil de mantener como la solución module.exports. Si prefieres no utilizar esm, puedes seguir utilizando module.exports.
