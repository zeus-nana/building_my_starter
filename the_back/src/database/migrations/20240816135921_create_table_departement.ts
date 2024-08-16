// create_table_departement
import type { Knex } from "knex";
import { onUpdateTrigger } from '../../../knexfile';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("departement", (table) => {
    table.increments("id").primary();
    table.string("departement").notNullable();
    table.string("description").nullable();
    table.boolean("active").defaultTo(true);
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
  return knex.raw(onUpdateTrigger('departement'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("departement");
}