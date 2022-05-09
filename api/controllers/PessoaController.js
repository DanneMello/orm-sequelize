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
            return res.status(200).json(pessoas || "Nenhuma pessoa foi encontrada");
        } catch (error) {
            return res.status(500).json(`Erro ao tentar buscar as pessoas - ${error.message}`);
        }
    }

    /**
     * Retorna um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarPessoaPorId(req, res) {
        const {id} = req.params;
        
        try {
            const pessoa = await database.Pessoas.findOne({ 
                where: { 
                    id: Number(id) 
                }
            });

            return res.status(200).json(pessoa || "Nenhuma pessoa foi encontrada");
        } catch (error) {
            return res.status(500).send(`Erro ao tentar encontrar o registro = ${error.message}`);
        }
    }

    /**
     * Adiciona um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async criarPessoa(req, res) {
        const novaPessoa = req.body;

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);

            return res.status(201).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).send(`Erro ao tentar salvar o registro = ${error.message}`);
        }
    }

    /**
     * Atualiza um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async atualizarPessoa(req, res) {
        const {id} = req.params;
        const novasInfo = req.body;

        try {
            await database.Pessoas.update(novasInfo,  { where: { id: Number(id) }});

            const pessoaAtualizada = await database.Pessoas.findOne({ 
                where: { 
                    id: Number(id) 
                }
            });

            return res.status(201).json(pessoaAtualizada || "Nenhuma pessoa foi atualizada");
        } catch (error) {
            return res.status(500).send(`Erro ao tentar atualizar o registro = ${error.message}`);
        }
    }

    /**
     * Deleta um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async deletarPessoa(req, res) {
        const {id} = req.params;

        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }});
            return res.status(201).json({message: `Registro deletado com sucesso!`});
        } catch (error) {
            return res.status(500).send(`Erro ao tentar deletar o registro = ${error.message}`);
        }
    }

}

// Exporta o modelo atual para ser utilizado no restante do código
module.exports = PessoaController;