const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas', PessoaController.listarPessoas);
router.get('/pessoas/:id', PessoaController.listarPessoaPorId);
router.post('/pessoas', PessoaController.criarPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);

module.exports = router;