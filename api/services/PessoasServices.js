const Services = require('./Services.js');
const database = require('../models');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    /**
     * Retorna os registros ativos
     * 
     * @param {Query} where 
     * @returns 
     */
    async listarRegistrosAtivos(where = {}) {
        return database[this.model].findAll({ where: { ...where } });
    }

    /**
     * Retorna todo mundo
     * 
     * @param {Query} where 
     * @returns 
     */
    async listarTodos(where = {}) {
        return database[this.model]
        .scope('todos')
        .findAll({ where: { ...where }});
    }

    /**
     * Atualiza um registro na base
     * 
     * @param {json} dados 
     * @param {integer} id 
     */
    async atualizar(dados, id, transacao = {}) {
        return database[this.model]
        .scope('todos')
        .update(
            dados,
            {
                where: {
                    id: id
                }
            },
            transacao
        )
    }

    /**
     * Cancela um estudante e suas mátriculas
     * 
     * @param {integer} estudanteId 
     */
    async cancelarPessoa(estudanteId) {
        return database.sequelize.transaction(async (transacao) => {
            await super.atualizar(
                { 
                    ativo: false 
                }, 
                estudanteId, 
                {
                    transaction: transacao
                }
            );

            await this.matriculas.atualizarVarios(
                {
                    status: 'cancelado'
                },
                {
                    estudante_id: estudanteId
                }, 
                {
                    transaction: transacao
                }
            );
        });
    }

    /**
     * Retorna as mátriculas
     * 
     * @returns 
     */
    async listarMatriculas() {
        return this.matriculas.listar();
    }

}

module.exports = PessoasServices;