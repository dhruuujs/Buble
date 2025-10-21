import http from 'http';
import app from '../backend/app.js';
import {Server} from 'socket.io';
import setupSocketIO from '../backend/socket/index.js'

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server,{cors:{
    origin:'*',
    method:['GET','POST']}});

    setupSocketIO(io);
server.listen(5000,()=>console.log(`Server Banana running on port: ${PORT}`));