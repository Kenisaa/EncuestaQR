import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateSurvey from './pages/CreateSurvey';
import SurveyForm from './pages/SurveyForm';
import Results from './pages/Results';
import { useAuth } from './hooks/useAuth';
import './globals.css';

function App() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="w-full">
        <Navbar isLoggedIn={!!user} onLogout={signOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={user ? <CreateSurvey /> : <Navigate to="/login" />}
          />
          <Route path="/survey/:surveyId" element={<SurveyForm />} />
          <Route
            path="/results/:surveyId"
            element={user ? <Results /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
