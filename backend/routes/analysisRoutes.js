/**
 * Analysis routes - tech pack analysis (Python parser + legacy)
 */
import express from 'express';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import upload from '../controllers/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.post('/analyse-techpack', upload.single('techpack'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Processing file:', req.file.path);
    console.log('Processing file with Python Parser:', req.file.path);

    const backendDir = path.join(__dirname, '..');
    const scriptPath = path.join(backendDir, 'advanced_parser.py');
    const pythonProcess = spawn('python', [scriptPath, req.file.path], {
      cwd: path.join(backendDir, '..'),
    });

    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorString += data.toString();
      console.error('Python Log:', data);
    });

    pythonProcess.on('close', (code) => {
      console.log('Python process exited with code', code);

      if (code !== 0) {
        console.error('Python script failed:', errorString);
        return res.status(500).json({ error: 'Parser failed', details: errorString });
      }

      try {
        const jsonStart = dataString.indexOf('{');
        const jsonEnd = dataString.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          const jsonStr = dataString.substring(jsonStart, jsonEnd + 1);
          const parsed = JSON.parse(jsonStr);
          console.log('BACKEND SENDING:', JSON.stringify(parsed, null, 2));
          res.json(parsed);
        } else {
          throw new Error('No JSON found in output');
        }
      } catch (e) {
        console.error('Failed to parse Python JSON output:', e);
        console.error('Raw Output:', dataString);
        console.error('Error String:', errorString);
        res.status(500).json({ error: 'Invalid JSON from parser', raw: dataString });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Techpack analysis failed' });
  }
});

export default router;
