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
        const { id } = req.params;

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
        const { id } = req.params;
        const novasInfo = req.body;

        try {
            await database.Pessoas.update(novasInfo, { where: { id: Number(id) } });

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
        const { id } = req.params;

        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } });
            return res.status(201).json({ message: `Registro deletado com sucesso!` });
        } catch (error) {
            return res.status(500).send(`Erro ao tentar deletar o registro = ${error.message}`);
        }
    }

    /**
     * Restaura um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async restaurarPessoa(req, res) {
        const { id } = req.params;

        try {
            await database.Pessoas.restore({
                where: {
                    id: Number(id) 
                } 
            });

            const pessoaRestaurada = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            });

            return res.status(201).json(pessoaRestaurada ? {
                message: `Registro restaurado`,
                pessoa: pessoaRestaurada
            } : `Nenhum registro encontrado`);
        } catch (error) {
            return res.status(500).send(`Erro ao tentar recuperar o registro = ${error.message}`);
        }
    }

    /**
     * Busca uma mátricula
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async obterMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;

        try {
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });

            return res.status(200).json(matricula || "Nenhuma mátricula encontrada.");
        } catch (error) {
            return res.status(500).send(`Erro ao tentar encontrar o registro = ${error.message}`);
        }
    }

    /**
     * Realiza uma mátricula
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async matricular(req, res) {
        const { estudanteId } = req.params;
        const matricula = { ...req.body, estudante_id: Number(estudanteId) };

        try {
            const novaMatricula = await database.Matriculas.create(matricula);
            return res.status(200).json(novaMatricula || "Ops! Algo deu errado.");
        } catch (error) {
            return res.status(500).send(`Erro ao tentar criar a mátricula = ${error.message}`);
        }
    }

    /**
     * Atualiza uma mátricula
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const dadosReq = req.body;

        try {
            await database.Matriculas.update(dadosReq, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });

            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            });

            return res.status(201).json(matriculaAtualizada || "Nenhuma pessoa foi atualizada");
        } catch (error) {
            return res.status(500).send(`Erro ao tentar atualizar o registro = ${error.message}`);
        }
    }

    /**
     * Deleta uma mátricula
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async deletarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;

        try {
            await database.Matriculas.destroy({ 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } 
            });

            return res.status(201).json({ message: `Registro deletado com sucesso!` });
        } catch (error) {
            return res.status(500).send(`Erro ao tentar deletar o registro = ${error.message}`);
        }
    }

    /**
     * Restaura uma mátricula
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async restaurarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.restore({
                where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
                }
            });

            const matriculaRestaurada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            });

            return res.status(201).json(matriculaRestaurada ? {
                message: `Matrícula  restaurada`,
                matricula: matriculaRestaurada
            } : `Nenhum registro encontrado`);

        } catch (error) {
            return res.status(500).send(`Erro ao tentar recuperar o registro = ${error.message}`);
        }
    }
}

// Exporta o modelo atual para ser utilizado no restante do código
module.exports = PessoaController;