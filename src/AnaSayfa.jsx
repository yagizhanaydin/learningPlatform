import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlBasket } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

function AnaSayfa() {
  const [aramaTerimi, setAramaTerimi] = useState('');
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);
  const [sepet, setSepet] = useState([]);
  const [siralamaDizisi, setSiralamaDizisi] = useState('none'); 

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
//sepetteki ürünleri kaydetme
  useEffect(() => {
    const saklananSepet = JSON.parse(localStorage.getItem("cart")) || [];
    setSepet(saklananSepet);
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
//sepete yönlendirme
  const sepeteGit = () => {
    navigate("/sepet");
  };

  // Sepete ekler
  const sepeteEkle = (urun) => {
    const mevcutSepet = JSON.parse(localStorage.getItem("cart")) || [];
    const guncellenmisSepet = [...mevcutSepet, urun];

    localStorage.setItem("cart", JSON.stringify(guncellenmisSepet));
    setSepet(guncellenmisSepet); // Sepet durumunu güncelle
  };

  return (
    <>
      {yukleniyor && <p>Yükleniyor...</p>}
      {hata && <p>{hata}</p>}
      
      <div>
        <input
          type="text"
          placeholder="Sana Uygun Dersi Ara"
          value={aramaTerimi}
          onChange={aramaYap}
        />

        <select onChange={siralamaDegistir} value={siralamaDizisi}>
          <option value="none">Sıralama Seç</option>
          <option value="lowToHigh">Ucuzdan Pahalıya</option>
          <option value="highToLow">Pahalıdan Ucuza</option>
        </select>
      </div>

      <div>
        {filtrelenmisUrunler.length > 0 ? (
          filtrelenmisUrunler.map(urun => (
            <div key={urun.id}>
              <h3>{urun.title}</h3>
              <p>{urun.description}</p>
              <p><strong>Fiyat:</strong> {Math.round(urun.price)}₺</p>
              <p><strong>Meslek:</strong> {urun.profession}</p>
              <p><strong>Konum:</strong> {urun.location}</p>
              <p><strong>Ders:</strong> {urun.lesson}</p>
              {urun.video_url && (
    <video width="320" height="240" controls>
      <source src={urun.video_url} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>
  )}
              <button onClick={() => sepeteEkle(urun)}>
                Sepete Ekle
              </button>
            </div>
          ))
        ) : (
          <p>Aradığınız ders bulunamadı.</p>
        )}
      </div>

      {/* Sepete gitme butonu */}
      <div>
        {sepet.length > 0 && (
          <div>
            <SlBasket onClick={sepeteGit} title='Sepet' size={30} />
            <span>{sepet.length}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default AnaSayfa;
