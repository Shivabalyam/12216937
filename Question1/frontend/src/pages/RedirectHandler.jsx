import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { log } from '../logger/logMiddleware';

const RedirectHandler = () => {
  const { shortCode } = useParams();

  useEffect(() => {
    const redirectToLongUrl = async () => {
      try {
        const res = await fetch(`http://localhost:5000/${shortCode}`);
        const data = await res.json();
        if (data.originalUrl) {
          log('Redirecting to', data.originalUrl);
          window.location.href = data.originalUrl;
        } else {
          log('Invalid or expired link', data);
          alert("This link is expired or doesn't exist.");
        }
      } catch (err) {
        log('Redirect error', err.message);
        alert("Error occurred during redirection.");
      }
    };
    redirectToLongUrl();
  }, [shortCode]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;