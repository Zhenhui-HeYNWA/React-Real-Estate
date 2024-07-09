import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: 'http://localhost:5173',
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
    console.log(`User added: ${userId}, socketId: ${socketId}`);
    io.emit('updateUserStatus', onlineUser); // 广播用户状态更新
  } else {
    console.log(`User already exists: ${userId}`);
  }
  console.log('Current online users:', onlineUser);
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
  console.log(`User removed, socketId: ${socketId}`);
  io.emit('updateUserStatus', onlineUser); // 广播用户状态更新
  console.log('Current online users:', onlineUser);
};

const getUser = (userId) => {
  const user = onlineUser.find((user) => user.userId === userId);
  console.log(
    `Getting user: ${userId}, found: ${user ? user.socketId : 'not found'}`
  );
  return user;
};

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('newUser', (userId) => {
    addUser(userId, socket.id);
  });

  socket.on('sendMessage', ({ receiverId, data }) => {
    console.log(`Sending message to receiverId: ${receiverId}`);
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit('getMessage', data);
    } else {
      console.log(`Receiver not found: ${receiverId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);
  });
});

io.listen(4000, () => {
  console.log('Server listening on port 4000');
});
