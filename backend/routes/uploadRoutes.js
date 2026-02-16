/**
 * Upload routes - file upload handling
 */
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import upload from '../controllers/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

router.post('/', upload.single('techpack'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    success: true,
    path: req.file.path,
    filename: req.file.originalname,
  });
});

export default router;
