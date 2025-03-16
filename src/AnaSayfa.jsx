import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AnaSayfa() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // API URL'sinin doğru olduğundan emin olun
    axios.get('http://localhost:5000/api/products') // doğru URL
      .then(response => {
        console.log("Veriler başarıyla alındı:", response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Hatası:', error);
        setError('Ürünler alınırken bir hata oluştu.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}
      
      <div>
        <input
          type="text"
          placeholder="Sana Uygun Dersi Ara"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>{product.price}₺</span>
            </div>
          ))
        ) : (
          <p>Aradığınız ürün bulunamadı.</p>
        )}
      </div>
    </>
  );
}

export default AnaSayfa;
