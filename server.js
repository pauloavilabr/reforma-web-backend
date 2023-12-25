require('dotenv').config()
const xss = require('xss-clean')
const helmet = require('helmet')
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')


app.db = db
app.use(xss())
app.use(helmet())

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


module.exports = app;