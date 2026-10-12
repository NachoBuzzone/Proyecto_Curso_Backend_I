import { app } from './app.js';
import { config } from './config/env.config.js';
import { connectDB } from './config/database.config.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});


app.set('io', io);

const startServer = async () => {
  await connectDB();
  httpServer.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

startServer();
