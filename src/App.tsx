import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './components/LandingPage';
import Register from './components/Auth/Register';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import InteractiveMap from './components/InteractiveMap';
import BranchMap from './components/BranchMap';

function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [currentView, setCurrentView] = React.useState<'landing' | 'register' | 'signin'>('landing');

  const handleStartNow = () => {
    setCurrentView('register');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleSwitchToSignIn = () => {
    setCurrentView('signin');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute 
              user={user} 
              loading={loading}
              fallback={
                <>
                  {currentView === 'landing' && (
                    <LandingPage onStartNow={handleStartNow} />
                  )}
                  {currentView === 'register' && (
                    <Register
                      onRegister={signUp}
                      onBackToLanding={handleBackToLanding}
                      onSwitchToSignIn={handleSwitchToSignIn}
                      loading={loading}
                    />
                  )}
                  {currentView === 'signin' && (
                    <SignIn
                      onSignIn={signIn}
                      onBackToLanding={handleBackToLanding}
                      onSwitchToRegister={handleSwitchToRegister}
                      loading={loading}
                    />
                  )}
                </>
              }
            >
              <Dashboard user={user!} onSignOut={signOut} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/interactive-map" 
          element={
            <ProtectedRoute user={user} loading={loading} fallback={<></>}>
              <InteractiveMap />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/branch-map" 
          element={
            <ProtectedRoute user={user} loading={loading} fallback={<></>}>
              <BranchMap />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
