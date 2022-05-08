const express = require ('express');
const bodyParser = require('body-parser');

const app = express();

// Converte todos os dados para json
app.use(bodyParser.json());

// Inicia o servidor na porta informada no .ENV ou na 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.status(200)
    .send({message: 'Curso de ORM com Sequelize'});
});


module.exports = app;