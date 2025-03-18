import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

function StudentPanel() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [datedata, setDatedata] = useState(null);

  // Öğrenci kontrol işlemi (role kontrolü)
  /*
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
  */

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
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getStudentData();
    getLessonDate();
  }, []);

  // Öğrenci çıkış işlemi
  const studentcikdisari = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  // Ayarlar sayfasına gitme
  const settingsgo = () => {
    navigate("/setting");
  };

  return (
    <div>
      <h1>Student Panel</h1>

      {/* Kullanıcı bilgileri gösterme */}
      {studentData ? (
        <div>
          <p>
            <strong>Name:</strong> {studentData.name}
          </p>
          <p>
            <strong>Surname:</strong> {studentData.surname}
          </p>
          <p>
            <strong>Email:</strong> {studentData.email}
          </p>
        </div>
      ) : (
        <p>Loading Data...</p>
      )}

      {/* Ders bilgileri gösterme */}
      <h2>Tutors</h2>
      {datedata && Array.isArray(datedata) ? (
        <ul>
          {datedata.map((lesson, index) => (
            <li key={index}>
              <strong>Lesson:</strong> {lesson.name} -{" "}
              <strong>Date:</strong> {lesson.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading Data...</p>
      )}

      <button type="button" onClick={studentcikdisari}>LogOut</button>
      <CiSettings type="button" onClick={settingsgo} title="settings" />
    </div>
  );
}

export default StudentPanel;
