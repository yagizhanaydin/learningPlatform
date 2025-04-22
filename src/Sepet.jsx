import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css'

function Sepet() {
  const navigate = useNavigate();
  const [urunler, setUrunler] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saklananUrunler = JSON.parse(localStorage.getItem("cart")) || [];
    setUrunler(saklananUrunler);
    setIsLoading(false);
  }, []);

  const handleRemoveFromCart = (id) => {
    const guncellenmisUrunler = urunler.filter(urun => urun.id !== id);
    setUrunler(guncellenmisUrunler);
    localStorage.setItem("cart", JSON.stringify(guncellenmisUrunler));
  };

  const paypalegit = () => {
    if (urunler.length > 0) {
      navigate("/payment");
    }
  };

  const calculateTotal = () => {
    return urunler.reduce((total, urun) => total + Number(urun.price), 0).toFixed(2);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="sepet-container">
      <div className="sepet-header">
        <button onClick={goBack} className="back-button">
          ← Back
        </button>
        <h2>🛒 Shopping Cart</h2>
      </div>

      {urunler.length > 0 ? (
        <div className="sepet-content">
          <div className="urun-listesi">
            <div className="urun-header">
              <div className="urun-baslik">Product</div>
              <div className="urun-fiyat">Price</div>
              <div className="urun-aksiyon">Action</div>
            </div>

            {urunler.map(urun => (
              <div key={urun.id} className="urun-item">
                <div className="urun-bilgisi">
                  <div className="urun-resim">
                    {urun.image && (
                      <img src={urun.image} alt={urun.title} />
                    )}
                  </div>
                  <div className="urun-detay">
                    <h3>{urun.title}</h3>
                    <p>{urun.description}</p>
                  </div>
                </div>
                <div className="urun-fiyat">{Number(urun.price).toFixed(2)}₺</div>
                <div className="urun-aksiyon">
                  <button
                    onClick={() => handleRemoveFromCart(urun.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sepet-ozet">
            <h3>Order Summary</h3>
            <div className="ozet-detay">
              <div className="ozet-satir">
                <span>Subtotal</span>
                <span>{calculateTotal()}₺</span>
              </div>
              <div className="ozet-satir">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="ozet-satir toplam">
                <span>Total</span>
                <span>{calculateTotal()}₺</span>
              </div>
            </div>
            <button
              onClick={paypalegit}
              className="checkout-button"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={goBack}
            className="continue-button"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Sepet;
