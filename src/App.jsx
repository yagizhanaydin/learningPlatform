import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './student/Login';
import AnaSayfa from './AnaSayfa';
import Studentregister from './Studentregister';
import TeacherPanel from './teacher/TeacherPanel';
import CheckoutForm from './proporties/CheckoutForm';
import Help from './Help';
import StudentPanel from './student/StudentPanel';
import Admin from './admin/Admin';
import Settings from './student/Settings';
import Sepet from './Sepet';
import CourseLibrary from './student/CourseLibrary';
import Chat from './teacher/Chat';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Rol bilgisini al

    if (token) {
      if (role === 'Student' && window.location.pathname === '/teacherpanel') {
        navigate('/'); // Öğretmen rolü varsa ve /teacherpanel'de ise ana sayfaya yönlendir
      } else if (role === 'student' && window.location.pathname === '/studentpanel') {
        navigate('/'); // Öğrenci rolü varsa ve /studentpanel'de ise ana sayfaya yönlendir
      } else if (role === 'admin' && window.location.pathname === '/adminpanel') {
        navigate('/adminpanel'); // Admin rolü varsa ve /adminpanel'de ise ana sayfaya yönlendir
      } else if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        navigate('/'); // Token varsa login ve register sayfalarına girişi engelle
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AnaSayfa />} />
      <Route path="/register" element={<Studentregister />} />
      <Route path="/teacherpanel" element={<TeacherPanel />} />
      <Route path="/payment" element={<CheckoutForm />} />
      <Route path="/help" element={<Help />} />
      <Route path="/studentpanel" element={<StudentPanel />} />
      <Route path="/adminpanel" element={<Admin />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/sepet" element={<Sepet />} />
      <Route path="/mylessons" element={<CourseLibrary />} />
      <Route path="/chat" element={<Chat />} />

    </Routes>
  );
}

export default App;