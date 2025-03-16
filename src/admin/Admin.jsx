import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [teacherData, setTeacherData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [ilanData, setIlanData] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    const navigate = useNavigate();

    //admin kontrolü
/*
    useEffect(() => {
        const adminController = () => {
            const role = localStorage.getItem('role');
            if (role !== "admin") {
                navigate("/login");
            }
        };
        adminController();
    }, [navigate]);
*/

//admim logout işemi
    const adminLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate("/login");
    };


    //studentdata işlemi
    const getStudentData = async () => {
        try {
            const response = await axios.get("/api/student");
            if (Array.isArray(response.data)) {
                setStudentData(response.data);
                setActiveTab("students");
            } else {
                console.log("Öğrenci verisi geçersiz formatta");
            }
        } catch (error) {
            console.log("Öğrenciler getirilirken hata:", error);
        }
    };


    //teacxherdata işemi
    const getTeacherData = async () => {
        try {
            const response = await axios.get("/api/teacher");
            if (Array.isArray(response.data)) {
                setTeacherData(response.data);
                setActiveTab("teachers");
            } else {
                console.log("Öğretmen verisi geçersiz formatta");
            }
        } catch (error) {
            console.log("Öğretmenler getirilirken hata:", error);
        }
    };


    //ilan işlemi
    const getIlan = async () => {
        try {
            const response = await axios.get("/api/ilan");
            if (Array.isArray(response.data)) {
                setIlanData(response.data);
                setActiveTab("ilan");
            } else {
                console.log("İlan verisi geçersiz formatta");
            }
        } catch (error) {
            console.log("İlanlar getirilirken hata:", error);
        }
    };

    //dataları silme işlemi
    const deleteData = async () => {
        try {
            const response = await axios.delete("/api/deletedata");
            if (response.status === 200) {
                setStudentData([]);
                setTeacherData([]);
                setIlanData([]);
                setActiveTab(null);
            } else {
                console.log("Veri silinemedi, API hatası");
            }
        } catch (error) {
            console.log("Veriler silinirken hata:", error);
        }
    };

    return (
        <div>
            <button onClick={getStudentData}>Öğrencileri Getir</button>
            <button onClick={getTeacherData}>Öğretmenleri Getir</button>
            <button onClick={getIlan}>İlanları Getir</button>
            <button onClick={adminLogout}>Çıkış Yap</button>
            <button onClick={deleteData}>Verileri Sil</button>
            
            {activeTab === "students" && (
                <>
                    <h2>Öğrenciler</h2>
                    <ul>
                        {studentData.length > 0 ? (
                            studentData.map((student, index) => (
                                <li key={index}>{JSON.stringify(student)}</li>
                            ))
                        ) : (
                            <p>Öğrenci verisi yok.</p>
                        )}
                    </ul>
                </>
            )}
            
            {activeTab === "teachers" && (
                <>
                    <h2>Öğretmenler</h2>
                    <ul>
                        {teacherData.length > 0 ? (
                            teacherData.map((teacher, index) => (
                                <li key={index}>{JSON.stringify(teacher)}</li>
                            ))
                        ) : (
                            <p>Öğretmen verisi yok.</p>
                        )}
                    </ul>
                </>
            )}
            
            {activeTab === "ilan" && (
                <>
                    <h2>İlanlar</h2>
                    <ul>
                        {ilanData.length > 0 ? (
                            ilanData.map((ilan, index) => (
                                <li key={index}>{JSON.stringify(ilan)}</li>
                            ))
                        ) : (
                            <p>İlan verisi yok.</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Admin;
