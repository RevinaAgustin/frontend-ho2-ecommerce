import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch products
    axiosInstance.get('/products')
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Gagal memuat data produk');
        setLoading(false);
      });

    // Fetch categories
    axiosInstance.get('/categories')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error('Gagal memuat kategori', err);
      });
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Cari produk..."
        className="border p-2 rounded w-full mb-6"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded ${selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Produk tidak ditemukan.</p>
      )}
    </div>
  );
};

export default Home;