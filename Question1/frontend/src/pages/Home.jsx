import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { log } from '../logger/logMiddleware';

const Home = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', customCode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', customCode: '' }]);
    }
  };

  const handleSubmit = async () => {
    const validUrls = urls.filter(u => u.longUrl.trim() !== '');
    for (const data of validUrls) {
      try {
        const res = await fetch('http://localhost:5000/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            originalUrl: data.longUrl,
            validity: parseInt(data.validity) || 30,
            customCode: data.customCode
          })
        });
        const result = await res.json();
        log('URL Shortened', result);
        setResults(r => [...r, result]);
      } catch (err) {
        log('Error shortening URL', err.message);
      }
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Shorten up to 5 URLs</Typography>
      {urls.map((url, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Long URL"
              fullWidth
              required
              value={url.longUrl}
              onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Validity (mins)"
              type="number"
              fullWidth
              value={url.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Custom Code"
              fullWidth
              value={url.customCode}
              onChange={(e) => handleChange(i, 'customCode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addUrlField} disabled={urls.length >= 5}>Add More</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten</Button>

      <Typography variant="h6" sx={{ mt: 4 }}>Results</Typography>
      {results.map((res, idx) => (
        <Card key={idx} sx={{ my: 2 }}>
          <CardContent>
            <Typography><strong>Original:</strong> {res.originalUrl}</Typography>
            <Typography><strong>Short URL:</strong> <a href={`http://localhost:3000/${res.shortCode}`} target="_blank" rel="noreferrer">http://localhost:3000/{res.shortCode}</a></Typography>
            <Typography><strong>Expires At:</strong> {new Date(res.expiry).toLocaleString()}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Home;