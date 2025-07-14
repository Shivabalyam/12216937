import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Stats from '../pages/Stats';
import RedirectHandler from '../pages/RedirectHandler';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/stats" element={<Stats />} />
    <Route path="/:shortCode" element={<RedirectHandler />} />
  </Routes>
);

export default AppRoutes;