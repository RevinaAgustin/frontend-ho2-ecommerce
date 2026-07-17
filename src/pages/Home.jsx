import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axiosInstance.get('/products')
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Cari produk..."
        className="border p-2 rounded w-full mb-6"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">Produk tidak ditemukan.</p>
      )}
    </div>
  );
};

export default Home;