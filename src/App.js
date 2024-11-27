// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import AdminPage from './pages/AdminPage';
import ResourcePage from './pages/ResourcePage';
import LogoutPage from './pages/LogOut';
import ThemeProvider from './ThemeProvider';
import { authenticateUser } from './services/userService';
import { users as dummyUsers } from './services/dummyData';
import UserRequestsPage from './pages/UserRequestsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(dummyUsers); // State for managing users
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    // Update direction based on language
    if (i18n.language === 'fa') {
      setDirection('rtl');
      document.body.dir = 'rtl';
    } else {
      setDirection('ltr');
      document.body.dir = 'ltr';
    }
  }, [i18n.language]);

  const handleLogin = (email, password) => {
    try {
      console.log("Attempting login with:", { email, password });
      const user = authenticateUser(email, password);
      setCurrentUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider direction={direction}>
      <Router>
        <Navigation isLoggedIn={isLoggedIn} currentUser={currentUser} />
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/resources" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate to="/resources" /> : <SignUpPage />
            }
          />
          <Route
            path="/admin"
            element={
              isLoggedIn && currentUser?.role === 'admin' ? (
                <AdminPage users={users} setUsers={setUsers} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
<Route
  path="/resources"
  element={
    isLoggedIn ? (
      <ResourcePage
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        users={users}
        setUsers={setUsers}
      />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
          <Route path="/logout" element={<LogoutPage onLogout={handleLogout} />} />
          <Route path="/my-requests" element={ isLoggedIn ? ( <UserRequestsPage currentUser={currentUser} /> ) : (<Navigate to="/login" />
    )
  }
/>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
