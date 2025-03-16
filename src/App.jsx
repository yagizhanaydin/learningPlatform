import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './student/Login';
import AnaSayfa from './AnaSayfa';
import Studentregister from './Studentregister';
import TeacherPanel from './teacher/TeacherPanel';
import Chat from './proporties/Chat';
import CheckoutForm from './proporties/CheckoutForm'; 
import Help from './Help';
import StudentPanel from './student/StudentPanel'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/register" element={<Studentregister />} />
        <Route path="/teacherpanel" element={<TeacherPanel />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/payment" element={<CheckoutForm />} /> 
      <Route path="/help" element={<Help/>}/>
      <Route path="/studentpanel" element={<StudentPanel/>}/>
      </Routes>
    </Router>
  );
}

export default App;
