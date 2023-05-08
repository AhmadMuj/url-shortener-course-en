import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.text("password").notNullable();
      table.timestamps(true, true);
    })
    .createTable("urls", (table) => {
      table
        .string("id")
        .defaultTo(knex.raw("substring(md5(random()::text) from 0 for 7)"))
        .primary();
      table.text("url").notNullable();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamps(true, true);
    })
    .createTable("visits", (table) => {
      table.increments("id").primary();
      table
        .string("url_id")
        .references("id")
        .inTable("urls")
        .onDelete("CASCADE")
        .notNullable();
      table.string("ip").notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("visits").dropTable("urls").dropTable("users");
}
