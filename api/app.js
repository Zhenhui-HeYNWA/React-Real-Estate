import express from 'express';
import postRouter from './routes/post.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());
//create a api endpoint
app.use('/api/posts', postRouter);

app.use('/api/auth', authRouter);

app.listen(8800, () => {
  console.log('Server is running');
});
