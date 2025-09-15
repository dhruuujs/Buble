import socketServer from '../services/socketService.js'

const setupSocketIO = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('send_message', async (msg) => {
        console.log(msg)
        try{
            //const savedMessage = await socketService.saveMessage(msg);
        }catch(err){

        }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });



};

export default setupSocketIO;