
exports.up = function(knex) {
    return knex.schema.createTable('address', table => {
        table.increments('idAddress').primary()
        table.string('typeAddress', 21).notNull()
        table.string('street').notNull()
        table.string('number', 50).notNull().unique()
        table.string('compliment')
        table.string('district').notNull()
        table.string('zipCode', 10).notNull()
        table.string('city').notNull()
        table.string('uf', 2).notNull()
        table.string('country').notNull()
        table.integer('idUser').references('idUser').inTable('users').notNull()
        table.timestamp('createdAt').notNull()  
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('address')
};
