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

  // Check if user has JWT credentials stored in cookies, if not, redirect to login
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetch('http://localhost:8000/users/auth', { credentials: 'include', method: 'GET' });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Wait until user authentication check is done
  if (isAuthenticated === null) {
    return <></>;
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