import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/Admin.module.css';


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
        <div className={styles.container}>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={getStudentData}>Öğrencileri Getir</button>
                <button className={styles.button} onClick={getTeacherData}>Öğretmenleri Getir</button>
                <button className={styles.button} onClick={getIlan}>İlanları Getir</button>
                <button className={styles.button} onClick={adminLogout}>Çıkış Yap</button>
                <button className={styles.button} onClick={deleteData}>Verileri Sil</button>
            </div>
    
            {activeTab === "students" && (
                <>
                    <h2 className={styles.title}>Öğrenciler</h2>
                    {studentData.map((student, index) => (
                        <div key={index} className={styles.card}>
                            <p><strong>İsim:</strong> {student.name}</p>
                            <p><strong>Bölüm:</strong> {student.department}</p>
                            <p><strong>Sınıf:</strong> {student.grade}</p>
                            <p><strong>Email:</strong> {student.email}</p>
                        </div>
                    ))}
                </>
            )}
    
            {activeTab === "teachers" && (
                <>
                    <h2 className={styles.title}>Öğretmenler</h2>
                    {teacherData.map((teacher, index) => (
                        <div key={index} className={styles.card}>
                            <p><strong>İsim:</strong> {teacher.name}</p>
                            <p><strong>Uzmanlık:</strong> {teacher.profession}</p>
                            <p><strong>Email:</strong> {teacher.email}</p>
                            <p><strong>Lokasyon:</strong> {teacher.location}</p>
                        </div>
                    ))}
                </>
            )}
    
            {activeTab === "ilan" && (
                <>
                    <h2 className={styles.title}>İlanlar</h2>
                    {ilanData.map((ilan, index) => (
                        <div key={index} className={styles.card}>
                            <p><strong>Fiyat:</strong> {Math.round(ilan.price)}₺</p>
                            <p><strong>Uzmanlık:</strong> {ilan.profession}</p>
                            <p><strong>Lokasyon:</strong> {ilan.location}</p>
                            <p><strong>Ders:</strong> {ilan.lesson}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default Admin;
