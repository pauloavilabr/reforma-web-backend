exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('idProduct').primary()
        table.string('productName').notNull()
        table.string('productDescription').notNull()
        table.decimal('price').notNull()
        table.string('image').notNull()
        table.boolean('activated').notNull()
        table.timestamp('createdAt').notNull()
        table.integer('idUserSeller').references('idUser').inTable('users').notNull()        
        table.integer('idCategorie').references('idCategorie').inTable('categories').notNull()
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
