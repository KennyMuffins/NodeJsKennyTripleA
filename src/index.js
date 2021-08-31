let express = require('express')
let app = express()
let bracketsRoute = require('./routes/brackets')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)

    next()
})

app.use(bracketsRoute)
app.use(express.static('public'))

//Handler for Error 404 - Resource not found
app.use((req, res, next) => {
    res.status(404).send('Invalid Request')
})

//Handler for Error 500
app.use((err, req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))