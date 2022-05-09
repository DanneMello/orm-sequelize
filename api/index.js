const express = require ('express');
const routes = require('./routes/index.js');

// Instancia do express
const app = express();

// Imports dos métodos de rotas
routes(app);

// Inicia o servidor na porta informada no .ENV ou na 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
});

module.exports = app;