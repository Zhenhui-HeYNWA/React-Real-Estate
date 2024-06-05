import express from 'express';
import cors from 'cors';
import postRouter from './routes/post.route.js';
import authRouter from './routes/auth.route.js';
import testRouter from './routes/test.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
const app = express();

//middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
//create a api endpoint

app.use('/api/users', userRouter);

app.use('/api/posts', postRouter);

app.use('/api/auth', authRouter);

app.use('/api/test', testRouter);

app.listen(8800, () => {
  console.log('Server is running');
});
