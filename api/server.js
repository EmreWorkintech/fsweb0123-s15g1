const express = require('express');
const server = express();
const orderRouter = require('./orders/orders_router');
const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const session = require('express-session');
const Store = require('connect-session-knex')(session);

server.use(express.json());
server.use(session({
    name: 'titan',
    secret: 'buraya secret girilecek',
    cookie: {
        maxAge: 1000*60*60,  //ms cinsinden geçerlilik süresi = 1 saat
        secure: false, //https only
        httpOnly: false  //js'den cookie erişimini yasakla, sadece http'ye izin var
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({
        knex: require('../data/db-config'),
        tablename: 'sessions',
        sidfieldname:'sid',
        createtable: true,
        clearInterval: 1000*60*60
    })
}))

server.use('/api/order', orderRouter);
server.use('/api/user', userRouter);
server.use('/api/auth', authRouter);

server.use((err,req,res,next)=> {
    res.status(err.status || 500)
        .json({message: err.message || 'server error!..'})
})
module.exports = server;