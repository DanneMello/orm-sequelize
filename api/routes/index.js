const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoutes.js');
const niveis = require('./niveisRoutes.js');
const turmas = require('./turmasRoutes.js');

module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas,
        niveis,
        turmas
    );

    app.get("/", (req, res) => {
        res.status(200).send("Curso de ORM com Sequelize.");
    })
}