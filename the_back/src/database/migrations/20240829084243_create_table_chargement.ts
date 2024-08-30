import type { Knex } from 'knex';
import { onUpdateTrigger } from '../../../knexfile';

export async function up(knex: Knex): Promise<void> {
  // Création de la table 'chargement'
  await knex.schema.createTable('chargement', (table) => {
    table.increments('id').primary();
    table.string('etat', 255).notNullable();
    table.string('type', 255).notNullable();
    table.integer('nombre_succes').notNullable().defaultTo(0);
    table.integer('nombre_echec').notNullable().defaultTo(0);
    table
      .integer('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  return knex.raw(onUpdateTrigger('chargement'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('chargement');
}
