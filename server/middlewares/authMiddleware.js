import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize user payload: handle tokens with id or _id, or only email
    let normalizedUserId = decoded.id || decoded._id || null;
    if (!normalizedUserId && decoded.email) {
      // As a fallback, resolve user id by email
      const existing = await User.findOne({ email: decoded.email }).select('_id');
      if (existing) normalizedUserId = existing._id.toString();
    }

    if (!normalizedUserId) {
      return res.status(401).json({ error: 'Token payload missing user id' });
    }

    req.user = {
      id: normalizedUserId,
      email: decoded.email,
      role: decoded.role || 'User',
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
};
