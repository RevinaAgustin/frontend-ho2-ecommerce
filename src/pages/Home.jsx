import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home = ({ search }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        //fetch products
        axiosInstance.get('/products')
            .then((res) => {
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Gagal memuat data produk');
                setLoading(false);
            });

        //fetch categories
        axiosInstance.get('/categories')
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => {
                console.error('Gagal memuat kategori', err);
            });
    }, []);

    const filteredProducts = products.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes((search || '').toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category?.name === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg">
                <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Selamat Datang di All Some Mart
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl font-light">
                        Belanja Kebutuhanmu dengan Mudah. Temukan berbagai macam produk dengan harga terbaik dan kualitas terjamin.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10">
                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-10 justify-center sm:justify-start">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === 'All' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 -translate-y-0.5' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === cat.name ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 -translate-y-0.5' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
                    {filteredProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-xl text-gray-500 font-medium">Produk tidak ditemukan.</p>
                        <p className="text-gray-400 mt-2">Coba kata kunci lain atau ubah filter kategori.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;