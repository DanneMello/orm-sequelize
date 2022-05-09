const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

const router = Router();

router
    .get('/niveis', NivelController.listarNiveis)
    .get('/niveis/:id', NivelController.listarNiveisPorId)
    .post('/niveis', NivelController.criarNivel)
    .put('/niveis/:id', NivelController.atualizarNivel)
    .delete('/niveis/:id', NivelController.apagarNivel)

module.exports = router;