import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sepet() {
  const navigate = useNavigate();
  const [urunler, setUrunler] = useState([]);

  // localStorage'dan ürünleri çekme
  useEffect(() => {
    const saklananUrunler = JSON.parse(localStorage.getItem("cart")) || [];
    setUrunler(saklananUrunler);
  }, []);

  // Sepetten ürün silme
  const handleRemoveFromCart = (id) => {
    const guncellenmisUrunler = urunler.filter(urun => urun.id !== id);
    setUrunler(guncellenmisUrunler);
    localStorage.setItem("cart", JSON.stringify(guncellenmisUrunler));
  };

  // Paypal ödeme sayfasına yönlendirme
  const paypalegit = () => {
    if (urunler.length > 0) {
      navigate("/payment");
    }
  };

  return (
    <>
      <h2>Sepetiniz</h2>
      {urunler.length > 0 ? (
        <>
          {urunler.map(urun => (
            <div key={urun.id}>
              <h3>{urun.title}</h3>
              <p>{urun.description}</p>
              <p><strong>Fiyat:</strong> {urun.price.toFixed(2)}₺</p>
              <button onClick={() => handleRemoveFromCart(urun.id)}>Sepetten Çıkar</button>
            </div>
          ))}
          <button type="button" onClick={paypalegit}>Ödemeye Git</button>
        </>
      ) : (
        <p>Sepetiniz boş.</p>
      )}
    </>
  );
}

export default Sepet;
