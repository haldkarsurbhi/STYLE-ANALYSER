/**
 * RedThread - Tech Pack Routes
 * Handles PDF upload and analysis endpoints
 */
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { extractTextFromPDF, parseTechPack } from '../services/parsers/techpackParser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/analyse', upload.single('techpack'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: "Please provide a PDF file with field name 'techpack'",
      });
    }

    console.log('[UPLOAD] Processing file:', req.file.originalname);
    console.log('[UPLOAD] Saved to:', req.file.path);

    const pdfText = await extractTextFromPDF(req.file.path);

    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(422).json({
        error: 'Empty PDF',
        message: 'Could not extract text from the uploaded PDF',
      });
    }

    console.log('[PARSE] Extracted', pdfText.length, 'characters from PDF');
    const parsedData = parseTechPack(pdfText);
    console.log('[PARSE] Tech pack parsed successfully');

    res.json({
      success: true,
      filename: req.file.originalname,
      parsedAt: new Date().toISOString(),
      data: parsedData,
    });
  } catch (error) {
    console.error('[ERROR] Tech pack analysis failed:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message,
    });
  } finally {
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('[CLEANUP] Failed to delete temp file:', err);
      });
    }
  }
});

router.get('/sections', (req, res) => {
  res.json({
    sections: [
      { id: 'collar', name: 'Collar', description: 'Collar specifications and measurements' },
      { id: 'assembly', name: 'Assembly', description: 'Assembly and construction details' },
      { id: 'sleeve', name: 'Sleeve', description: 'Sleeve specifications' },
      { id: 'front', name: 'Front', description: 'Front panel details' },
      { id: 'back', name: 'Back', description: 'Back panel details' },
      { id: 'pocket', name: 'Pocket', description: 'Pocket specifications' },
    ],
  });
});

export default router;
