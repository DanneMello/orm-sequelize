const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas', PessoaController.listarPessoas);
router.get('/pessoas/:id', PessoaController.listarPessoaPorId);
router.post('/pessoas', PessoaController.criarPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);
router.get('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.obterMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.matricular);
router.put('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.atualizarMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId/', PessoaController.deletarMatricula);

module.exports = router;