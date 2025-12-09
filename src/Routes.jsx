import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Auth from './pages/Auth'

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Auth /> : <Navigate to="/" />} />

        {/* Protected routes */}
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/register" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/register" />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to={user ? "/" : "/register"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes