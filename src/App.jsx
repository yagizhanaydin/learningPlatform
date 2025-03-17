import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './student/Login';
import AnaSayfa from './AnaSayfa';
import Studentregister from './Studentregister';
import TeacherPanel from './teacher/TeacherPanel';
import CheckoutForm from './proporties/CheckoutForm'; 
import Help from './Help';
import StudentPanel from './student/StudentPanel'
import Admin from './admin/Admin';
import Settings from './student/Settings';
import Sepet from './Sepet';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/register" element={<Studentregister />} />
        <Route path="/teacherpanel" element={<TeacherPanel />} />
        <Route path="/payment" element={<CheckoutForm />} /> 
      <Route path="/help" element={<Help/>}/>
      <Route path="/studentpanel" element={<StudentPanel/>}/>
      <Route path="adminpanel" element={<Admin/>}/>
      <Route path="/setting" element={<Settings/>}/>
      <Route path="/sepet" element={<Sepet/>}/>
      </Routes>
    </Router>
  );
}

export default App;
