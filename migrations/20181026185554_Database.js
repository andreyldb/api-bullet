exports.up = function(knex, Promise) {
  return knex.schema.createTable("bullet", function(table) {
    // chave primária
    table.increments("id");

    // estrutura
    table.string("title", 75).notNullable();
    table.string("description", 200).notNullable();
    table.boolean("done");
    table.date("date").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("bullet");
};
