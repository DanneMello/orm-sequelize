const database = require('../models/index.js');
const Sequelize = require('sequelize');
const { where } = require('sequelize');
const Op = Sequelize.Op;

class TurmaController {

    /**
     * Lista todos os registros 
     * Caso for informado data_inicial, 
     * data_final ou ambos; aplica o filtro.
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarTurmas(req, res) {
        const { data_inicial, data_final } = req.query;

        const search = {};

        // Se existir parâmtro de data abre um objeto no atributo data_inicio
        data_inicial || data_final ? search.data_inicio = {} : null;

        // Se data inicial, busca registros com data_inicio a partir da data informada
        data_inicial ? search.data_inicio[Op.gte] = data_inicial : null;

        // Se data_final, busca registros com data_inicio até a data informada
        data_final ? search.data_inicio[Op.lte] = data_final : null;

        try {
            const turmas = await database.Turmas.findAll({ where: search });

            return res.status(200).json(turmas ? {
                total: turmas.length,
                turmas: turmas
            } : `Nenhuma turma foi encontrada`);

        } catch (error) {
            return res.status(500).json({ message: `Erro ao tentar listar os registros - ${error.message}` });
        }
    }

    /**
     * Lista um determinado registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarTurmasPorId(req, res) {
        const { id } = req.params;
        try {
            const turma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(turma || "Nenhum registro encontrado");
        } catch (error) {
            return res.status(500).json({ message: `Erro ao tentar listar o registro - ${error.message}` });
        }
    }

    /**
     * Cria um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async criarTurma(req, res) {
        const novaTurma = req.body;
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma);
            return res.status(200).json(novaTurmaCriada || "Ops! Algo inesperado aconteceu. Registro não foi criado");
        } catch (error) {
            return res.status(500).json({ message: `Erro ao tentar criar o registro - ${error.message}` });
        }
    }

    /**
     * Atualiza um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async atualizarTurma(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Turmas.update(novasInfos, { where: { id: Number(id) } });
            const turmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(turmaAtualizada || "Ops! Algo inesperado aconteceu. Nivel não atualizado");
        } catch (error) {
            return res.status(500).json({ message: `Erro ao tentar atualizar o registro - ${error.message}` });
        }
    }

    /**
     * Deleta um registro
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async deletarTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ mensagem: `Registro de id: ${id} foi deletado` });
        } catch (error) {
            return res.status(500).json({ message: `Erro ao tentar apagar o registro - ${error.message}` });
        }
    }

    /**
     * Restaura uma turma
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async restaurarTurma(req, res) {
        const { id } = req.params;

        try {
            await database.Turmas.restore({
                where: {
                id: Number(id)
                }
            });

            const turmaRestaurada = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            });

            return res.status(201).json(turmaRestaurada ? {
                message: `Turma restaurada`,
                turma: turmaRestaurada
            } : `Nenhum registro encontrado`);
        } catch (error) {
            return res.status(500).send(`Erro ao tentar recuperar o registro = ${error.message}`);
        }
    }
}

// Exporta o modelo atual para ser utilizado no restante do código
module.exports = TurmaController;