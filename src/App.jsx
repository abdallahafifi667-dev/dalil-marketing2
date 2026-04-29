import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Crafts from './pages/Crafts';
import Craftsmen from './pages/Craftsmen';
import Chat from './pages/Chat';
import Account from './pages/Account';
import CraftsmanProfile from './pages/CraftsmanProfile';
import CreateRequest from './pages/CreateRequest';
import OrderDetails from './pages/OrderDetails';
import Payment from './pages/Payment';
import ChatDetail from './pages/ChatDetail';
import SettingsPage from './pages/SettingsPage';
import Notifications from './pages/Notifications';
import CraftsmanDashboard from './pages/CraftsmanDashboard';

// Components
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <Splash />;

  const hideNavPaths = ['/chat/', '/craftsman/', '/login', '/register'];
  const hideHeaderPaths = ['/chat/', '/craftsman/'];
  const shouldHideNav = location.pathname.startsWith('/chat/') || 
                         location.pathname.startsWith('/craftsman/') || 
                         ['/login', '/register'].includes(location.pathname);
                         
  const shouldHideHeader = location.pathname.startsWith('/chat/') || 
                            location.pathname.startsWith('/craftsman/');

  return (
    <div className="app-frame">
      {isAuthenticated && !shouldHideHeader && <Header />}

      <div className={`scroll-content ${location.pathname.includes('/chat/') ? 'overflow-hidden' : ''}`}>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* Role-based Home Routing */}
              <Route path="/" element={
                localStorage.getItem('userRole') === 'craftsman' 
                ? <CraftsmanDashboard /> 
                : <Home />
              } />
              
              <Route path="/crafts" element={<Crafts />} />
              <Route path="/craftsmen" element={<Craftsmen />} />
              <Route path="/request/new" element={<CreateRequest />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:id" element={<ChatDetail />} />
              <Route path="/craftsman/:id" element={<CraftsmanProfile />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings/:id" element={<SettingsPage />} />
              <Route path="/craftsman/dashboard" element={<CraftsmanDashboard />} />
              <Route path="/account" element={<Account onLogout={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
                setIsAuthenticated(false);
              }} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>

      {isAuthenticated && !shouldHideNav && <BottomNav />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
