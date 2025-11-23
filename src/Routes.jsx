import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        {/* Redirect / to login for now */}
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;