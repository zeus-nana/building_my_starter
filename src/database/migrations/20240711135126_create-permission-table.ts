import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */

import { onUpdateTrigger } from '../../../knexfile';

exports.up = async function (knex: Knex) {
  await knex.schema.createTable('permissions', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('description');
    table.integer('created_by').references('id').inTable('users').notNullable();
    table.integer('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });
  return knex.raw(onUpdateTrigger('permissions'));
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('permissions');
};
