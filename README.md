# orm-sequelize
Projeto que tem por finalidade por em prática as operações no banco com o orm sequelize

DATA_BASE:
create database escola_ingles;

TABLES:
Pessoas:
    npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

Niveis:
    npx sequelize-cli model:create --name Niveis --attributes desc_nivel:string

Turmas:
    npx sequelize-cli model:create --name Turmas --attributes data_inicio:dateonly

Matriculas:
    npx sequelize-cli model:create --name Matriculas --attributes status:string

Rodar as migrations:
    npx sequelize-cli db:migrate

SEEDERS:
Pessoas:
    npx sequelize-cli seed:generate --name demo-pessoa
Niveis:
    npx sequelize-cli seed:generate --name demo-nivel
Turmas:
    npx sequelize-cli seed:generate --name demo-turmas 
Matriculas:
    npx sequelize-cli seed:generate --name demo-matriculas

Rodar as seeders:
    npx sequelize-cli db:seed:all