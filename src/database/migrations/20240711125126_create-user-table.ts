import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */

import { onUpdateTrigger } from '../../../knexfile';

exports.up = async function (knex: Knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique().notNullable();
    table.string('phone');
    table
      .enum('department', [
        'finance',
        'project',
        'audit',
        'it_support',
        'admin',
      ])
      .notNullable();
    table.integer('created_by').references('id').inTable('users');
    table.integer('updated_by').references('id').inTable('users');
    table.boolean('active').defaultTo(true);
    table.timestamps(true, true);
  });
  return knex.raw(onUpdateTrigger('users'));
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('users');
};
