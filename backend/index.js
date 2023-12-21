import express from 'express';
import dotenv from 'dotenv/config';
import mongoDBConnect from './mongoDB/connection.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';
import messageRoutes from './routes/message.js';
import * as Server from 'socket.io';


const app = express();
const corsConfig = {
  origin: process.env.BASE_URL,
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
mongoose.set('strictQuery', false);
mongoDBConnect();
const server = app.listen(80, () => {
  console.log(`Server Listening at PORT - 80`);
});
const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.BASE_URL,
  },
});

var users = [];
var onlineusers = [];
io.on('connection', (socket) => {
  socket.on('login', function({userId}){
    console.log('a user ' + userId + ' connected');
    // saving userId to object with socket ID
    users[socket.id] = userId;
    if(!onlineusers.includes(userId))
      onlineusers = [...onlineusers, userId]
    io.emit('onlineUser', userId);
    io.emit('onlineusers', onlineusers);
    console.log('onlineusers',onlineusers);
  });
  console.log("users", users);
  console.log('onlineusers',onlineusers);

  socket.on('disconnect', function(){
    console.log('user ' + users[socket.id] + ' disconnected');
    // remove saved socket from users object
    io.emit('offlineUser', users[socket.id]);
    onlineusers = onlineusers.filter((data) => data != users[socket.id])
    console.log('onlineusers',onlineusers);
    io.emit('onlineusers', onlineusers)
    delete users[socket.id];
  });

  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit('connected');
  });
  socket.on('join room', (room) => {
    socket.join(room);
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieve) => {
    var chat = newMessageRecieve.chatId;
    if (!chat.users) console.log('chats.users is not defined');
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieve.sender._id) return;
      socket.in(user._id).emit('message recieved', newMessageRecieve);
    });
  });
});
