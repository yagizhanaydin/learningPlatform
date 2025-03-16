import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentPanel() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [datedata, setDatedata] = useState(null);


//studentcontroller

useEffect(() => {
  const studentControl = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role !== 'student') {
      navigate('/login');
    }
  };

  studentControl();
}, [navigate]);

  // Öğrenci verilerini getirme
  const getStudentData = async () => {
    try {
      const response = await axios.get("/studentdata");
      setStudentData(response.data);
    } catch (error) {
      console.error("Öğrenci verileri alınırken hata oluştu:", error);
    }
  };

  // Öğrencinin randevusu olduğu dersleri getirme
  const getLessonDate = async () => {
    try {
      const response = await axios.get("/api/lesson");
      setDatedata(response.data); // Dersleri state'e kaydet
    } catch (error) {
      console.error("Dersler getirilemedi:", error);
    }
  };

  useEffect(() => {
    getStudentData();
    getLessonDate();
  }, []);

  //student çıkış işlemi
const studentcikdisari=()=>{
  localStorage.removeItem('token');
  navigate("/login")
}


  return (
    <div>
      <h1>Student Panel</h1>

      {/* Kullanıcı bilgileri gösterme */}
      {studentData ? (
        <div>
          <p>
            <strong>Ad:</strong> {studentData.name}
          </p>
          <p>
            <strong>Soyad:</strong> {studentData.surname}
          </p>
          <p>
            <strong>Email:</strong> {studentData.email}
          </p>
        </div>
      ) : (
        <p>Veriler yükleniyor...</p>
      )}

      {/* Ders bilgileri gösterme */}
      <h2>Ders Randevuları</h2>
      {datedata ? (
        <ul>
          {datedata.map((lesson, index) => (
            <li key={index}>
              <strong>Ders:</strong> {lesson.name} -{" "}
              <strong>Tarih:</strong> {lesson.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>Ders verileri yükleniyor...</p>
      )}
      <button type="button" onClick={studentcikdisari}>LogOut</button>
    </div>
  );
}

export default StudentPanel;
