const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

// Rotas para pessoas
router.get('/pessoas', PessoaController.listarPessoasAtivas);
router.get('/pessoas/todas', PessoaController.listarPessoas);
router.get('/pessoas/:id', PessoaController.listarPessoaPorId);
router.post('/pessoas', PessoaController.criarPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);
router.post('/pessoas/:id/restaurar', PessoaController.restaurarPessoa);

// Rotas para matrículas
router.get('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.obterMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.matricular);
router.put('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.atualizarMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.deletarMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaurar', PessoaController.restaurarMatricula);

module.exports = router;