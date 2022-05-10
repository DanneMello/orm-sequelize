const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router
    .get('/turmas', TurmaController.listarTurmas)
    .get('/turmas/:id', TurmaController.listarTurmasPorId)
    .post('/turmas', TurmaController.criarTurma)
    .put('/turmas/:id', TurmaController.atualizarTurma)
    .delete('/turmas/:id', TurmaController.deletarTurma)
    .post('/turmas/:id/restaurar', TurmaController.restaurarTurma)

module.exports = router;