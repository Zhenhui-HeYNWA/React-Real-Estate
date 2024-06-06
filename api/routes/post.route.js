import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/post.controller.js';

const router = express.Router();

//get all posts
router.get('/', getPosts);
//get single
router.get('/:id', getPost);
//add a post(middleware)
router.post('/', verifyToken, addPost);
//edit a post(middleware)
router.put('/:id', verifyToken, updatePost);
//delete post(middleware)
router.delete('/:id', verifyToken, deletePost);

export default router;
