require('dotenv').config()
const xss = require('xss-clean')
const helmet = require('helmet')
const app = require("express")()
const consign = require("consign")
const db = require('./config/db')
const port = process.env.PORT

app.db = db
app.use(xss())
app.use(helmet())

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {

console.log(port)
console.log("Backend Reforma Web")
})