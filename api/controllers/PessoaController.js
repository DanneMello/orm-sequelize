const database = require('../models/index.js');

class PessoaController {

    /**
     * Retorna todas as pessoas
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarPessoas(req, res) {
        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).json(`Erro ao tentar buscar as pessoas - ${error.message}`);
        }
    }
}

// Exporta o modelo atual para ser utilizado no restante do código
module.exports = PessoaController;