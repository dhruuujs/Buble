import http from 'http';
import app from '../backend/app.js';
import {Server} from 'socket.io';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server);


io.on('connection',(socket)=>{
  console.log("A client connected")
})
server.listen(5000,()=>console.log(`Server Banana running on port: ${PORT}`));