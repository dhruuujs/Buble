import socketServer from '../services/socketService.js'

const setupSocketIO = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
       socket.emit('welcome_message', 'Welcome! You are now connected.');
        try{
            //const savedMessage = await socketService.saveMessage(msg);
        }catch(err){
          throw err;
        }

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

};

export default setupSocketIO;