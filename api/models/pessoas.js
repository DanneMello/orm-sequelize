'use strict';
module.exports = (sequelize, DataTypes) => {
    const Pessoas = sequelize.define('Pessoas', {
        nome: {
            type: DataTypes.STRING,
            validate: {
                function (dado) {
                    if ( dado.length < 3) {
                        throw new Error('O nome deve conter mais do que 2 caracteres');
                    } else if (dado.length > 100) {
                        throw new Error('O nome deve conter menos de 5 caracteres')
                    }
                }
            }
        },
        ativo: DataTypes.BOOLEAN,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Favor informar um e-mail válido'
                }
            }
        },
        role: DataTypes.STRING
    }, { 
        paranoid: true,
        defaultScope: {
            where: {
                ativo: true
            }
        },
        scopes: {
            todos: {
                where: {}
            }
        }
    });

    // Relacionamentos entre tabelas
    Pessoas.associate = function (models) {
        Pessoas.hasMany(models.Turmas, {
            foreignKey: 'docente_id'
        });
        Pessoas.hasMany(models.Matriculas, {
            foreignKey: 'estudante_id'
        });
    };
    return Pessoas;
};