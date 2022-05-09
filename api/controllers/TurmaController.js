const database = require('../models/index.js');

class TurmaController {

    /**
     * Lista todos os registros
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll();
            return res.status(200).json(todasAsTurmas || "Nenhuma turma foi encontrada");
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
}

// Exporta o modelo atual para ser utilizado no restante do código
module.exports = TurmaController;