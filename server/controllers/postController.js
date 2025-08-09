import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const posts = await Post.find({ createdBy: userId }).sort({ createdAt: -1 });
  res.json(posts);
};

export const createPost = async (req, res) => {
  const userId = req.user?.id;
  const { title, content } = req.body;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const post = new Post({ title, content: content || '', createdBy: userId });
  await post.save();
  res.status(201).json(post);
};
