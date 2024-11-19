import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <App /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
      <Index />
  </React.StrictMode>
);