exports.up = function(knex) {
    return knex.schema.createTable('order', table => {
        table.increments('idOrder').primary()
        table.timestamp('createdAt').notNull()   
        table.integer('idBag').references('idBag').inTable('bag').notNull()
 
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('order')
};
