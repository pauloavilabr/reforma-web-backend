
exports.up = function(knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('idCategorie').primary()
        table.string('categorie').notNull()
        table.timestamp('createdAt').notNull()  
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('categories')
};
