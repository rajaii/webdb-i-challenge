const express = require('express');
const db = require('./data/dbConfig.js');
const accountsRouter = require('./accounts/accountsRouter.js');
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter)


server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my DB 1 HW!</h1>')
})


module.exports = server;