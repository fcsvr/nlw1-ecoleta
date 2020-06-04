import Knex from 'knex';

//realizar alterações que precisamos no BD
export async function up(knex : Knex){
    // criar a tabela
    return knex.schema.createTable('items', table=> {
        table.increments('id').primary(),
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

//rollback
export async function down(knex : Knex){
    //VOLTAR ATRAS
    return knex.schema.dropTable('items');
}

