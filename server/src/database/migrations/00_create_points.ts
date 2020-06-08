import Knex from 'knex';

//realizar alterações que precisamos no BD
export async function up(knex : Knex){
    // criar a tabela
    return knex.schema.createTable('points', table=> {
        table.increments('id').primary(),
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

//rollback
export async function down(knex : Knex){
    //VOLTAR ATRAS
    return knex.schema.dropTable('points');
}

