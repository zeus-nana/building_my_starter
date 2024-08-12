import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */

import { onUpdateTrigger } from '../../../knexfile';

exports.up = async function (knex: Knex) {
  await knex.schema.createTable('users_permissions', function (table) {
    table.integer('user_id').unsigned().notNullable();
    table.integer('permission_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table
      .foreign('permission_id')
      .references('permissions.id')
      .onDelete('CASCADE');
    table.primary(['user_id', 'permission_id']);
    table.boolean('active').defaultTo(true);
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
  return knex.raw(onUpdateTrigger('users_permissions'));
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('users_permissions');
};
