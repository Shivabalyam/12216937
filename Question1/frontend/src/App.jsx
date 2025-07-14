
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const App = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        🔗 URL Shortener
      </Typography>
      <AppRoutes />
    </Container>
  );
};

export default App;