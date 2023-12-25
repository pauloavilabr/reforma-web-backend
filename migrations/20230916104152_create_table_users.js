
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('idUser').primary()
        table.string('name').notNull()
        table.string('lastName').notNull()
        table.string('cpf').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('situation').notNull().defaultTo(true)
        table.timestamp('createdAt').notNull()  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
