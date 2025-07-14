import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const App = () => {
  const location = useLocation();
  const isRedirectPage = /^\/[a-zA-Z0-9]{4,20}$/.test(location.pathname); // Matches /abc123 etc.

  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      {!isRedirectPage && (
        <Typography variant="h4" gutterBottom>
          🔗 URL Shortener
        </Typography>
      )}
      <AppRoutes />
    </Container>
  );
};

export default App;
