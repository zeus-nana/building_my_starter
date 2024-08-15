import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.string('login').notNullable().unique();
    table.string('localisation').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.dropColumn('login');
    table.dropColumn('localisation');
  });
}
