// api/server.js
import express from 'express';
import cors from 'cors';
import postRouter from './routes/post.route.js';
import authRouter from './routes/auth.route.js';
import testRouter from './routes/test.route.js';
import userRouter from './routes/user.route.js';
import chatRouter from './routes/chat.route.js';
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const allowedOrigins = [process.env.CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// API endpoints
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

// Deployment
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '../client/build'))); // 修改路径

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, '../client/build', 'index.html')); // 修改路径
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running successfully');
  });
}

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
