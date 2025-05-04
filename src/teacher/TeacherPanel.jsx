import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoLogOutOutline, IoChatboxEllipsesOutline, IoTrashOutline, IoHome } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useFormik } from 'formik';
import { newilan, newvideo } from '../schemas/TeacherPanelFormDatayup';
import styles from '../assets/TeacherPanel.module.css';
import { BsCameraVideo } from "react-icons/bs";

function TeacherPanel() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [video_file, setVideoFile] = useState(null);
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kullanıcının ilanlarını çek
  useEffect(() => {
    fetchAdverts();
  }, []);

  const fetchAdverts = () => {
    axios.get('/api/advertsbyid', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setAdverts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("İlanlar alınırken hata oluştu:", error);
        setLoading(false);
      });
  };

  // İlan silme fonksiyonu
  const handleDeleteAdvert = async (advertId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/adverts/${advertId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Advert deleted successfully!");
      fetchAdverts(); // Listeyi güncelle
    } catch (error) {
      console.error("Error deleting advert:", error.response?.data || error.message);
      alert("Error while deleting advert.");
    }
  };

  // Video dosyasını ekleme formu
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
        const token = localStorage.getItem("token");
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

        alert("Advert added successfully!");
        resetForm();
        setVideoFile(null);
        fetchAdverts(); // Yeni ilan eklendikten sonra listeyi güncelle
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        alert("Error while adding a advert.");
      }
    },
  });

  const handleVideoChange = (event) => {
    const file = event.currentTarget.files[0];
    setVideoFile(file);
    secondformik.setFieldValue("video_file", file);
  };

  const teachertokendelete = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    navigate("/login");
  };
  const goHome = () => {
    navigate("/");
  };

  const chatgo = () => {
    navigate("/chat");
  };

  return (

    <div className={styles.container}>
      <IoLogOutOutline onClick={teachertokendelete} className={styles.logoutIcon} />
      <IoChatboxEllipsesOutline onClick={chatgo} className={styles.chatIcon} />
      <IoHome onClick={goHome}>HOME</IoHome>

      <div className={styles.advertsContainer}>
        <h2>My Adverts</h2>
        {loading ? (
          <p>Loading adverts...</p>
        ) : adverts.length === 0 ? (
          <p>You don't have any adverts yet.</p>
        ) : (
          <div className={styles.advertsGrid}>
            {adverts.map((advert) => (
              <div key={advert.id} className={styles.advertCard}>
                <div className={styles.advertHeader}>
                  <h3>{advert.title}</h3>
                  <button
                    onClick={() => handleDeleteAdvert(advert.id)}
                    className={styles.deleteButton}
                    title="Delete advert"
                  >
                    <IoTrashOutline />
                  </button>
                </div>
                <p>{advert.description}</p>
                <div className={styles.advertDetails}>
                  <span>Price: ${advert.price}</span>
                  <span>Profession: {advert.profession}</span>
                  <span>Location: {advert.location}</span>
                  <span>Lesson: {advert.lesson}</span>
                </div>
                {advert.video_file && (
                  <div className={styles.videoIndicator}>
                    <BsCameraVideo /> Video included
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className={styles.formTitle} onClick={() => setShowVideoForm(!showVideoForm)}>
          Add new Advert <MdFormatListBulletedAdd className={styles.toggleIcon} />
        </h3>

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