import Knex from 'knex';

//realizar alterações que precisamos no BD
export async function up(knex : Knex){
    // criar a tabela
    return knex.schema.createTable('point_items', table=> {
        table.increments('id').primary(),
        
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');        
    });
}

//rollback
export async function down(knex : Knex){
    //VOLTAR ATRAS
    return knex.schema.dropTable('point_items');
}

