import express from 'express';
import { getPosts, createPost } from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPosts);
router.post('/', protect, createPost);

export default router;
