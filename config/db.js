const configKnex = require('../knexfile.js')

const knex = require('knex')(configKnex)

module.exports = knex
