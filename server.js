const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./routers/userRouter.js');
const authRouter = require('./routers/authRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;