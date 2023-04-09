require('dotenv').config()
const express = require('express')
const router = require('./server')
const mongoose = require('mongoose')
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongoose 

.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.wrbdjxu.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.use('/', router);
    app.listen(3001)
    console.log('Conectou ao banco de dados!')
})
.catch((err) => console.log(err))

