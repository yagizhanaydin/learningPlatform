import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoLogOutOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useFormik } from 'formik';
import { newilan, newvideo } from '../schemas/TeacherPanelFormDatayup';
import styles from '../assets/TeacherPanel.module.css';
import { BsCameraVideo } from "react-icons/bs";

function TeacherPanel() {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [video_file, setVideoFile] = useState(null);


  const secondformik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      profession: "",
      location: "",
      lesson: "",
    },
    validationSchema: newvideo,
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("jwt_token");

        
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("profession", values.profession);
        formData.append("lesson", values.lesson);
        formData.append("location", values.location);

        if (video_file) {
          formData.append("video_file", video_file);
        }

     

        const response = await axios.post("http://localhost:8000/api/adverts", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Success:", response.data);
        alert("Advert added successfully!");

        resetForm();
        setVideoFile(null);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        alert("Error while adding a advert.");
      }
    },
  });

  // Video dosyası seçildiğinde çalışacak fonksiyon
  const handleVideoChange = (event) => {
    const file = event.currentTarget.files[0];
    setVideoFile(file);
    secondformik.setFieldValue("video_file", file);
  };
/*
  // Öğretmen bilgilerini çekme
  const teacherdataget = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeacherData(response.data);
    } catch (error) {
      console.error("Veri alma hatası: ", error);
    }
  };

  useEffect(() => {
    teacherdataget();
  }, []);
*/
  // Çıkış yapma fonksiyonu
  const teachertokendelete = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Chat sayfasına yönlendirme
  const chatgo = () => {
    navigate("/chat");
  };

  // İlanları çekme fonksiyonu
  const teacherilangetir = async () => {
    try {
      const token = localStorage.getItem("token");
      const ilangetirme = await axios.get("/api/adverts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(ilangetirme.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    teacherilangetir();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Teacher Panel</h1>
      <h2 className={styles.teacherstyle}>Teacher Information</h2>
      <div className={styles.teacherInfo}>
        {teacherData ? (
          <ul>
            <li><strong>Name:</strong> {teacherData.name}</li>
            <li><strong>E-mail:</strong> {teacherData.email}</li>
            <li><strong>Profession:</strong> {teacherData.branch}</li>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <IoLogOutOutline onClick={teachertokendelete} className={styles.logoutIcon} />
      <IoChatboxEllipsesOutline onClick={chatgo} className={styles.chatIcon} />

      <div>
        <h3 className={styles.formTitle} onClick={() => setShowForm(!showForm)}>
          Add new Advert <MdFormatListBulletedAdd className={styles.toggleIcon} />
        </h3>
        {showForm && (
          <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title && (
              <div>{formik.errors.title}</div>
            )}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description && (
              <div>{formik.errors.description}</div>
            )}
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price && (
              <div>{formik.errors.price}</div>
            )}
            <input
              type="text"
              name="profession"
              placeholder="Profession"
              value={formik.values.profession}
              onChange={formik.handleChange}
            />
            {formik.touched.profession && formik.errors.profession && (
              <div>{formik.errors.profession}</div>
            )}
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
            />
            {formik.touched.location && formik.errors.location && (
              <div>{formik.errors.location}</div>
            )}
            <input
              type="text"
              name="lesson"
              placeholder="Lesson"
              value={formik.values.lesson}
              onChange={formik.handleChange}
            />
            {formik.touched.lesson && formik.errors.lesson && (
              <div>{formik.errors.lesson}</div>
            )}
            <button type="submit">İlanı Kaydet</button>
          </form>
        )}

        <BsCameraVideo
          onClick={() => setShowVideoForm(!showVideoForm)}
          className={styles.videoIcon}
        />

        {showVideoForm && (
          <form onSubmit={secondformik.handleSubmit} className={styles.formContainer}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={secondformik.values.title}
              onChange={secondformik.handleChange}
            />
            {secondformik.touched.title && secondformik.errors.title && (
              <div>{secondformik.errors.title}</div>
            )}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={secondformik.values.description}
              onChange={secondformik.handleChange}
            />
            {secondformik.touched.description && secondformik.errors.description && (
              <div>{secondformik.errors.description}</div>
            )}
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={secondformik.values.price}
              onChange={secondformik.handleChange}
            />
            {secondformik.touched.price && secondformik.errors.price && (
              <div>{secondformik.errors.price}</div>
            )}
            <input
              type="text"
              name="profession"
              placeholder="Profession"
              value={secondformik.values.profession}
              onChange={secondformik.handleChange}
            />
            {secondformik.touched.profession && secondformik.errors.profession && (
              <div>{secondformik.errors.profession}</div>
            )}
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={secondformik.values.location}
              onChange={secondformik.handleChange}
            />
            {secondformik.touched.location && secondformik.errors.location && (
              <div>{secondformik.errors.location}</div>
            )}
            <input
              type="text"
              name="lesson"
              placeholder="Lesson"
              value={secondformik.values.lesson}
              onChange={secondformik.handleChange}
            />
            {secondformik.touched.lesson && secondformik.errors.lesson && (
              <div>{secondformik.errors.lesson}</div>
            )}
            <input
              type="file"
              name="video_file"
              accept="video/*"
              onChange={handleVideoChange}
            />
            {secondformik.errors.video_file && <div>{secondformik.errors.video_file}</div>}
            <button type="submit">Add Advert</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default TeacherPanel;