const database = require('../models/index.js');

class NivelController {

    /**
     * Lista todos os registros
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll();
            return res.status(200).json(todosOsNiveis || "Nenhum registro encontrado");
        } catch (error) {
            return res.status(500).json({ message: `Erro ao tentar listar os registros - ${error.message}` });
        }
    }

    /**
     * Lista um registro específico
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarNiveisPorId(req, res) {
        const { id } = req.params;
        try {
            const nivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(nivel || "Nenhum registro encontrado");
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
    static async criarNivel(req, res) {
        const novoNivel = req.body;
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel);
            return res.status(200).json(novoNivelCriado || "Ops! Algo inesperado aconteceu. Registro não foi criado");
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
    static async atualizarNivel(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Niveis.update(novasInfos, { where: { id: Number(id) } });
            const nivelAtualizado = await database.Niveis.findOne({ where: { id: Number(id) } });
            return res.status(200).json(nivelAtualizado || "Ops! Algo inesperado aconteceu. Nivel não atualizado");
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
    static async apagarNivel(req, res) {
        const { id } = req.params;
        try {
            await database.Niveis.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ mensagem: `Registro de id: ${id} foi deletado` });

        } catch (error) {
            return res.status(500).json({ message: `Erro ao tentar apagar o registro - ${error.message}` });
        }
    }
}

// Exporta o modelo atual para ser utilizado no restante do código
module.exports = NivelController;