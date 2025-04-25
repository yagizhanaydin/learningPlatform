import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlBasket } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import styles from './AnaSayfa.module.css';

function AnaSayfa() {
  const [aramaTerimi, setAramaTerimi] = useState('');
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);
  const [sepet, setSepet] = useState([]);
  const [siralamaDizisi, setSiralamaDizisi] = useState('none');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/adverts')
      .then(response => {
        setUrunler(response.data);
        setYukleniyor(false);
      })
      .catch(error => {
        setHata('Ürünler alınırken bir hata oluştu.');
        setYukleniyor(false);
      });
  }, []);

  useEffect(() => {
    const saklananSepet = JSON.parse(localStorage.getItem("cart")) || [];
    setSepet(saklananSepet);

    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const aramaYap = (e) => {
    setAramaTerimi(e.target.value);
  };

  const siralamaDegistir = (e) => {
    setSiralamaDizisi(e.target.value);
  };

  const urunleriSirala = (urunler) => {
    return [...urunler].sort((a, b) => {
      if (siralamaDizisi === 'lowToHigh') return a.price - b.price;
      if (siralamaDizisi === 'highToLow') return b.price - a.price;
      return 0;
    });
  };

  const filtrelenmisUrunler = urunleriSirala(
    urunler.filter(urun =>
      urun.title.toLowerCase().includes(aramaTerimi.toLowerCase())
    )
  );

  const sepeteGit = () => {
    navigate("/sepet");
  };

  const sepeteEkle = (urun) => {
    const mevcutSepet = JSON.parse(localStorage.getItem("cart")) || [];
    const guncellenmisSepet = [...mevcutSepet, urun];

    localStorage.setItem("cart", JSON.stringify(guncellenmisSepet));
    setSepet(guncellenmisSepet);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarLogo} onClick={() => navigate("/")}>
          Tutor Finder
        </div>
        <div className={styles.navbarLinks}>
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/hakkimizda")}>About Us!</span>
          <span onClick={() => navigate("/iletisim")}>Contact Us!</span>

          {!isLoggedIn && (
            <>
              <span onClick={() => navigate("/login")}>Login</span>
              <span onClick={() => navigate("/register")}>Register</span>
            </>
          )}
          {isLoggedIn && role === 'Teacher' && (
            <span onClick={() => navigate("/teacherpanel")}>Teacher Panel</span>
          )}
        </div>
        {isLoggedIn && (
          <div className={styles.navbarSepet} onClick={sepeteGit}>
            <SlBasket title='Cart' size={20} />
            {sepet.length > 0 && (
              <span className={styles.sepetSayisi}>{sepet.length}</span>
            )}
          </div>
        )}
      </nav>

      {yukleniyor && <p className={styles.yukleniyor}>Loading...</p>}
      {hata && <p className={styles.hata}>{hata}</p>}

      <div className={styles.aramaVeSiralama}>
        <input
          type="text"
          placeholder="Find Tutors"
          value={aramaTerimi}
          onChange={aramaYap}
          className={styles.aramaInput}
        />

        <select onChange={siralamaDegistir} value={siralamaDizisi} className={styles.siralamaSelect}>
          <option value="none">Filter</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className={styles.urunlerGrid}>
        {filtrelenmisUrunler.length > 0 ? (
          filtrelenmisUrunler.map(urun => (
            <div key={urun.id} className={styles.urunKarti}>
              <h3>{urun.title}</h3>
              <p>{urun.description}</p>
              <p><strong>Price:</strong> {Math.round(urun.price)}₺</p>
              <p><strong>Profession:</strong> {urun.profession}</p>
              <p><strong>Location:</strong> {urun.location}</p>
              <p><strong>Lesson:</strong> {urun.lesson}</p>
              {urun.video_url && (
                <video controls className={styles.urunVideo}>
                  <source src={urun.video_url} type="video/mp4" />
                  Your browser doesn't support this video.
                </video>
              )}
              <button onClick={() => sepeteEkle(urun)} className={styles.sepeteEkleButon}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className={styles.urunBulunamadi}>We couldn't find anything.</p>
        )}
      </div>
    </div>
  );
}

export default AnaSayfa;
