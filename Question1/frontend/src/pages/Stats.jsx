import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { log } from '../logger/logMiddleware';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/all');
        const data = await res.json();
        log('Stats Fetched', data);
        setStats(Object.entries(data));
      } catch (err) {
        log('Stats Fetch Error', err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Shortened URL Stats</Typography>
      {stats.map(([code, info], idx) => (
        <Card key={idx} sx={{ my: 2 }}>
          <CardContent>
            <Typography><strong>Short:</strong> http://localhost:3000/{code}</Typography>
            <Typography><strong>Long URL:</strong> {info.originalUrl}</Typography>
            <Typography><strong>Created:</strong> {new Date(info.created).toLocaleString()}</Typography>
            <Typography><strong>Expiry:</strong> {new Date(info.expiry).toLocaleString()}</Typography>
            <Typography><strong>Clicks:</strong> {info.clicks.length}</Typography>
            {info.clicks.map((click, i) => (
              <Typography key={i} sx={{ ml: 2, fontSize: '14px' }}>
                ↳ {click.timestamp} from {click.source} ({click.location})
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Stats;