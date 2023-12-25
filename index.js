const app = require('./server')
const port = process.env.PORT

app.listen(port, () => {

    console.log(port)
    console.log("Backend Reforma Web")

})