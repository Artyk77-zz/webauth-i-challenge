const express = require('express');

const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const UsersRouter = require('./users/users-router');

const dbConnection = require('./database/db-config.js')
const server = express();

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true
}

const sessionConfig = {
    name: 'cookie',
    secret: process.env.SESSION_SECRET || 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        createtable: true,
        clearInterval: 100 * 60 * 30
    })
}

server.use(express.json());
server.use(cors(corsConfig))
server.use(session(sessionConfig))

server.use('/api/users', UsersRouter);

module.exports = server;