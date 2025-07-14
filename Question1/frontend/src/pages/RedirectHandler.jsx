import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { log } from '../logger/logMiddleware';

const RedirectHandler = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToLongUrl = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${shortCode}`);
        const data = await response.json();

        if (response.ok && data.originalUrl) {
          log('Redirecting to original URL', {
            shortCode,
            destination: data.originalUrl,
          });

          // Redirect
          window.location.href = data.originalUrl;
        } else {
          log('Link invalid or expired', {
            shortCode,
            error: data.error || 'Unknown error',
          });

          alert("This link is expired or doesn't exist.");
          navigate('/');
        }
      } catch (error) {
        log('Redirect handler error', {
          shortCode,
          error: error.message,
        });

        alert('Error occurred during redirection.');
        navigate('/');
      }
    };

    redirectToLongUrl();
  }, [shortCode, navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
