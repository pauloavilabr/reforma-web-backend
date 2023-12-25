exports.up = function(knex) {
    return knex.schema.createTable('bag', table => {
        table.increments('idBag').primary()
        table.timestamp('createdAt').notNull()     
        table.integer('idProduct').references('idProduct').inTable('products').notNull()
        table.integer('idUser').references('idUser').inTable('users').notNull()
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('bag')
};
