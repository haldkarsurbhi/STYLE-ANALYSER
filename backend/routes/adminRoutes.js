/**
 * Admin routes: upload Excel by dataType, manual entry, solution library.
 * All routes require Bearer token and admin role (users.role = 'admin').
 *
 * Required Supabase tables:
 * - users (id uuid, role text) — role = 'admin' for access
 * - styles_master, defects — from existing schema
 * - complexity_data (style_code, complexity_score, raw_data) — for complexity/criticality upload
 * - solution_library (risk_keyword, solution) — for Edit Solution Library
 */
import express from 'express';
import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../controllers/upload.js';
import { supabase } from '../../db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getAuthUserId(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  try {
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (secret) {
      const jwt = await import('jsonwebtoken');
      const payload = jwt.default.verify(token, secret);
      return payload.sub || payload.user_id || null;
    }
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.sub || payload.user_id || null;
  } catch {
    return null;
  }
}

async function requireAdmin(req, res, next) {
  const userId = await getAuthUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { data: user, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .maybeSingle();
  if (error || !user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  req.adminUserId = userId;
  next();
}

const router = express.Router();

router.use(requireAdmin);

router.get('/me', async (req, res) => {
  try {
    const { data } = await supabase.from('users').select('role, email').eq('id', req.adminUserId).single();
    res.json(data || { role: 'admin' });
  } catch (e) {
    res.json({ role: 'admin' });
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const dataType = (req.body.dataType || '').toLowerCase();
    const allowed = ['master', 'defect', 'criticality', 'complexity'];
    if (!allowed.includes(dataType)) {
      return res.status(400).json({ message: 'Invalid dataType. Use: master, defect, criticality, complexity' });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (dataType === 'master') {
      for (const row of rows) {
        const styleCode = row['style (UQ NO.)'] ?? row['Style (UQ NO.)'] ?? row.style_code ?? row.Style ?? null;
        const buyer = row.buyer ?? row.Buyer ?? null;
        await supabase.from('styles_master').insert({
          style_code: styleCode,
          buyer: buyer,
          raw_data: row,
        });
      }
      return res.json({ message: `Inserted ${rows.length} row(s) into styles_master` });
    }

    if (dataType === 'defect') {
      for (const row of rows) {
        await supabase.from('defects').insert({
          style_id: row.style_id ?? null,
          defect_type: row.defect_type ?? row.defect ?? row.Defect ?? null,
          operation_name: row.operation_name ?? row.operation ?? row.Operation ?? null,
          frequency: row.frequency ?? row.Frequency ?? null,
          severity: row.severity ?? row.Severity ?? null,
        });
      }
      return res.json({ message: `Inserted ${rows.length} row(s) into defects` });
    }

    if (dataType === 'criticality' || dataType === 'complexity') {
      const table = 'complexity_data';
      for (const row of rows) {
        await supabase.from(table).insert({
          style_code: row.style_code ?? row['style (UQ NO.)'] ?? row.Style ?? null,
          complexity_score: row.complexity_score ?? row.score ?? null,
          raw_data: row,
        });
      }
      return res.json({ message: `Inserted ${rows.length} row(s) into ${table}` });
    }

    res.json({ message: 'Upload completed' });
  } catch (err) {
    console.error('[admin upload]', err);
    res.status(500).json({ message: err.message || 'Upload failed' });
  }
});

router.post('/manual-entry', async (req, res) => {
  try {
    const { tableName, data } = req.body;
    if (!tableName || !data || typeof data !== 'object') {
      return res.status(400).json({ message: 'tableName and data required' });
    }
    const allowed = ['styles_master', 'defects', 'complexity_data', 'solution_library'];
    if (!allowed.includes(tableName)) {
      return res.status(400).json({ message: 'Table not allowed for manual entry' });
    }
    const { error } = await supabase.from(tableName).insert(data);
    if (error) throw error;
    res.json({ message: 'Saved successfully' });
  } catch (err) {
    console.error('[admin manual-entry]', err);
    res.status(500).json({ message: err.message || 'Save failed' });
  }
});

router.get('/solution-library', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('solution_library')
      .select('*')
      .order('id', { ascending: false })
      .limit(500);
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('[admin solution-library]', err);
    res.json([]);
  }
});

router.post('/solution-library', async (req, res) => {
  try {
    const { keyword, solution } = req.body;
    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({ message: 'keyword required' });
    }
    const { error } = await supabase
      .from('solution_library')
      .insert({ risk_keyword: keyword.trim(), solution: (solution || '').trim() });
    if (error) throw error;
    res.json({ message: 'Added to solution library' });
  } catch (err) {
    console.error('[admin solution-library POST]', err);
    res.status(500).json({ message: err.message || 'Add failed' });
  }
});

export default router;
