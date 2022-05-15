const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

// Rotas para pessoas
router.get('/pessoas/ativas', PessoaController.listarPessoasAtivas);
router.get('/pessoas/todas', PessoaController.listarTodasPessoas);
router.get('/pessoas/:estudanteId/matriculas', PessoaController.obterMatriculasPorEstudante);
router.get('/pessoas/:id', PessoaController.listarPessoaPorId);
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.obterMatriculaPorTurma);
router.get('/pessoas/matricula/lotada', PessoaController.retornarTurmasLotadas);
router.post('/pessoas', PessoaController.criarPessoa);
router.post('/pessoas/:id/restaurar', PessoaController.restaurarPessoa);
router.post('/pessoas/:estudanteId/cancelar', PessoaController.cancelarEstudante);
router.put('/pessoas/:estudanteId/ativar/:turmaId?', PessoaController.ativarMatriculasPorEstudante);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);

// Rotas para matrículas
router.get('/matriculas', PessoaController.listarMatriculas);
router.get('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.obterMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.matricular);
router.put('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.atualizarMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.deletarMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaurar', PessoaController.restaurarMatricula);

module.exports = router;