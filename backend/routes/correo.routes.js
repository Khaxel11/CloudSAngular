const express = requiere('express');
const app = express();

let envio = requiere('src/app/correo.controller');

app.post('/envio', envio.envioCorreo);

module.exports = app;