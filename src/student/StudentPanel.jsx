import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdDateRange } from "react-icons/md";

function StudentPanel() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);

  const getStudentData = async () => {
    try {
      const response = await axios.get('/studentdata'); 
      setStudentData(response.data); // Gelen veriyi state'e kaydet
    } catch (error) {
      console.error('Öğrenci verileri alınırken hata oluştu:', error);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const goToDataPanel = () => {
    navigate("/Lessondate");
  };

  return (
    <div>
      <h1>Student Panel</h1>
      
    
      {studentData ? (
        <div>
          <p><strong>Ad:</strong> {studentData.name}</p>
          <p><strong>Soyad:</strong> {studentData.surname}</p>
          <p><strong>Şube:</strong> {studentData}</p>
        </div>
      ) : (
        <p>Veriler yükleniyor...</p>
      )}

  
      <MdDateRange title='Randevuya git' onClick={goToDataPanel}  />
    </div>
  );
}

export default StudentPanel;
