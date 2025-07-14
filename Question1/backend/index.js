
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = {};

// POST /shorten - Shorten a long URL
app.post('/shorten', (req, res) => {
  const { originalUrl, validity = 30, customCode } = req.body;
  if (!originalUrl || typeof originalUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid original URL' });
  }

  let shortCode = customCode || nanoid(6);
  if (!/^[a-zA-Z0-9]{4,20}$/.test(shortCode)) {
    return res.status(400).json({ error: 'Invalid shortcode format' });
  }

  if (db[shortCode]) {
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60 * 1000);

  db[shortCode] = {
    originalUrl,
    created: now.toISOString(),
    expiry: expiry.toISOString(),
    clicks: [],
  };

  res.json({ shortCode, originalUrl, expiry: db[shortCode].expiry });
});

app.get('/:shortCode', (req, res) => {
  const code = req.params.shortCode;
  const entry = db[code];
  if (!entry) return res.status(404).json({ error: 'Not found' });

  const now = new Date();
  if (now > new Date(entry.expiry)) {
    return res.status(410).json({ error: 'Link expired' });
  }

  // Log the click
  entry.clicks.push({
    timestamp: now.toISOString(),
    source: req.headers.referer || 'unknown',
    location: 'India',
  });

  res.json({ originalUrl: entry.originalUrl });
});

app.get('/all', (req, res) => {
  res.json(db);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
