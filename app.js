const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
require('dotenv/config')
const app = express()

app.use(bodyParser())

const authRouter = require('./routes/auth')

app.use('/', authRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`)
})