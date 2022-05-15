// const database = require('../models/index.js');
// const Sequelize = require('sequelize');

const {PessoasServices} = require('../services/index.js');
const pessoasServices = new PessoasServices();

class PessoaController {

    /**
     * Retorna todas as pessoas
     * 
     * @param {Response} res 
     * @returns 
     */
    static async listarTodasPessoas(_, res) {
        try {
            const pessoas = await pessoasServices.listarTodos();

            return res.status(200).json(pessoas ? {
                total: pessoas.length,
                pessoas: pessoas
            } : `Nenhum registro encontrado`);
        } catch (error) {
            return res.status(500).json(`Erro ao tentar buscar as pessoas - ${error.message}`);
        }
    }

    /**
     * Retorna todas as pessoas ativas
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async listarPessoasAtivas(_, res) {
        try {
            const pessoas = await pessoasServices.listarRegistrosAtivos();

            return res.status(200).json(pessoas ? {
                total: pessoas.length,
                pessoas: pessoas
            } : `Nenhum registro encontrado`);
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
        try {
            const pessoa = await pessoasServices.listar(req.params.id);
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
        const dados = req.body;

        try {
            await pessoasServices.atualizar(dados, Number(id));
            const pessoaAtualizada = await pessoasServices.listar(id);
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

            // Verifica se existe alguém com o id informado
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            });

            if (!pessoa) {
                return res.status(404).json({ message: `Nenhum registro encontrado com o id informado` });
            }

            // Faz a exclusão
            await database.Pessoas.destroy({ where: { id: Number(id) } });
            
            return res.status(200).json({ 
                message: `${pessoa.nome} foi deletado com sucesso!`,
            });

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
     * Lista todas as mátriculas
     * 
     * @param {Response} res 
     * @returns 
     */
    static async listarMatriculas(_, res) {
        try {
            const matriculas = await pessoasServices.listarMatriculas();
            return res.status(200).json(matriculas ? {
                matriculas: matriculas
            } : `Nenhum registro encontrado`);
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

    /**
     * Obtém as mátriculas de um estudante
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async obterMatriculasPorEstudante(req, res) {
        const { estudanteId } = req.params;

        try {
            const pessoa = await database.Pessoas.scope('todos').findOne({
                where: {
                    id: Number(estudanteId)
                }
            });

            const matriculas = await pessoa.getAulasMatriculadas();

            return res.status(200).json(matriculas ? {
                totalMatriculas: matriculas.length,
                matriculas: matriculas
            } : `Nenhum registro encontrado`);
            
        } catch (error) {
            return res.status(500).send(`Erro ao tentar recuperar as mátriculas - ${error.message}`);
        }
    }

    /**
     * Busca as mátriculas por turma também informa
     * o total de mátriculas exitentes
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async obterMatriculaPorTurma(req, res) {
        const { turmaId } = req.params;

        try {
            const totalMatriculas = await database.Matriculas.findAndCountAll(
                {
                    where: {
                        turma_id: Number(turmaId),
                        status: 'confirmado'
                    },
                    limit: 5,
                    order: [[
                        'estudante_id', 'DESC'
                    ]]
                }
            );

            return res.status(200).json(totalMatriculas ? {
                totalMatriculas: totalMatriculas
            } : `Nenhum registro encontrado`);
        } catch (error) {
            return res.status(500).send(`Erro ao tentar encontrar o registro = ${error.message}`);
        }
    }

    /**
     * Retorna as turmas que excederam sua capacidade
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async retornarTurmasLotadas(_, res) {
        
        const limitePorTurma = 5;

        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${limitePorTurma}`)
            });

            return res.status(200).json(turmasLotadas ? {
                turmasLotadas: turmasLotadas.count
            } : `Nenhum registro encontrado`);
        } catch (error) {
            return res.status(500).send(`Erro ao tentar encontrar o registro = ${error.message}`);
        }
    }

    /**
     * Cancela um estudante e suas mátriculas 
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async cancelarEstudante(req, res) {
        const { estudanteId } = req.params;

        try {
            const pessoa = await pessoasServices.listar(estudanteId);

            // Verifica se existe alguém com o id informado
            if (!pessoa) {
                return res.status(404).json({ message: `Nenhum registro encontrado com o id informado` });
            }
            
            // Cancela a pessoa
            await pessoasServices.cancelarPessoa(Number(estudanteId));

            return res.status(200).json({message: `Mátriculas do estudante ${pessoa.nome} foi cancelada com sucesso!`});
        } catch (error) {
            return res.status(500).send(`Erro ao tentar encontrar o registro = ${error.message}`);
        }
    }

    /**
     * Ativa um estudante e suas mátriculas.
     * Caso vier id da turma, realiza a mátricula apenas nela.
     * Se não mandar id da turma, reativa todas as mátriculas
     * 
     * @param Request req 
     * @param Response res 
     * @returns 
     */
    static async ativarMatriculasPorEstudante(req, res) {
        const { estudanteId, turmaId } = req.params;

        try {
            // Busca a pessoa 
            const pessoa = await database.Pessoas.scope('todos').findOne({
                where: {
                    id: Number(estudanteId)
                }
            });

            // Verifica se existe alguém com o id informado
            if (!pessoa) {
                return res.status(404).json({ message: `Nenhum registro encontrado com o id informado` });
            }

            // Verifica se o status está inativo
            if (!pessoa.ativo) {
                return res.status(401).json({ message: `Impossível reativar as matrículas de ${pessoa.nome}, esta pessoa encontra-se inativa no momento` });
            }

            if (turmaId) {

                // Busca a matricula 
                const matricula = await database.Matriculas.findOne({
                    where: {
                        estudante_id: Number(estudanteId),
                        turma_id: Number(turmaId)
                    }
                });

                // Verifica se existe alguém com o id informado
                if (!matricula) {
                    return res.status(404).json({ message: `Nenhuma matrícula encontrada` });
                }

                // Reativa a mátricula
                await database.Matriculas.update(
                    {
                        status: 'reativado'
                    },
                    {
                        where: {
                            estudante_id: Number(estudanteId),
                            turma_id: Number(turmaId)
                        }
                    }
                );
            } else {
                // Cancela a mátricula
                await database.Matriculas.update(
                    {
                        status: 'reativado'
                    },
                    {
                        where: {
                            estudante_id: Number(estudanteId)
                        }
                    }
                );
            }

            return res.status(200).json({message: `Mátriculas do estudante ${pessoa.nome} foi reativada com sucesso!`});
        } catch (error) {

            return res.status(500).send(`Erro ao tentar encontrar o registro = ${error.message}`);
        }
    }
}

// Exporta o modelo atual para ser utilizado no restante do código
module.exports = PessoaController;