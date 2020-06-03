//export async function up(){}

//export async function down(){}
import Knex from 'knex';

export async function up(knex: Knex){
    //CRIAR TABELA
    return knex.schema.createTable('items', table  => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('titulo').notNullable();
    })


}

export async function down(knex: Knex){
   return knex.schema.dropTable('items');
}