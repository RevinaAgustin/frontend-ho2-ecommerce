import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const carouselSlides = [
    {
        id: 1,
        badge: "✨ Fresh Products Everyday",
        title: "Belanja Semua Kebutuhanmu\nDalam Satu Tempat.",
        subtitle: "Dari skincare, gadget, snack, hingga perlengkapan rumah.\nSemua ada di All Some Mart.",
        button: <Link to="/products">"Mulai Belanja"</Link>,
        bg: "bg-gradient-to-r from-orange-600 to-orange-400",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 2,
        badge: "🔥 Super Promo",
        title: "Electronics Week",
        subtitle: "Upgrade gadget impianmu dengan potongan harga spesial hari ini.",
        button: <Link to="/products">Lihat Promo</Link>,
        bg: "bg-gradient-to-r from-gray-900 to-gray-800",
        img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 3,
        badge: "💄 Special Event",
        title: "Beauty Festival",
        subtitle: "Tampil bersinar dengan koleksi skincare dan kosmetik pilihan.",
        button: <Link to="/products">Belanja Sekarang</Link>,
        bg: "bg-gradient-to-r from-rose-500 to-pink-500",
        img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200"
    }
];

const Home = ({ search, setSearch }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState(2 * 3600 + 15 * 60 + 30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        axiosInstance.get('/products')
            .then((res) => {
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Gagal memuat data produk');
                setLoading(false);
            });

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
        <div className="w-full bg-[#F8F9FA]">
            <div className="relative w-full overflow-hidden bg-gray-900 group">
                <div 
                    className="flex transition-transform duration-700 ease-in-out" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {carouselSlides.map((slide) => (
                        <div key={slide.id} className="w-full flex-shrink-0 relative">
                            <div className="absolute inset-0">
                                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                            </div>
                            <div className={`absolute inset-0 ${slide.bg} opacity-90`}></div>
                            
                            <div className="relative z-10 container mx-auto px-6 py-24 md:py-32 flex flex-col items-start justify-center min-h-[400px]">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider mb-4 border border-white/30">
                                    {slide.badge}
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.1] max-w-2xl drop-shadow-sm whitespace-pre-line">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 max-w-xl font-medium mb-8 whitespace-pre-line drop-shadow-sm">
                                    {slide.subtitle}
                                </p>
                                <button className="bg-white text-gray-900 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                                    {slide.button}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {carouselSlides.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                
                {products.length > 0 && !search && selectedCategory === 'All' && (
                    <div className="mb-14">
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
                                    <span className="text-orange-500">🔥</span> Flash Sale
                                </h2>
                                <p className="text-gray-500 mt-1">Berakhir dalam <span className="font-bold text-orange-500">
                                    {String(Math.floor(timeLeft / 3600)).padStart(2, '0')}:
                                    {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0')}:
                                    {String(timeLeft % 60).padStart(2, '0')}
                                </span></p>
                            </div>
                            <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm">Lihat Semua</button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
                            {products.slice(0, 5).map((item, idx) => {
                                // Add fake discounts for the visual effect
                                const fakeDiscount = [20, 50, 15, 30, 40][idx];
                                return <ProductCard key={item.id} product={{...item, discountPercentage: fakeDiscount}} />
                            })}
                        </div>
                    </div>
                )}

                <div className="mb-10">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-gray-900">Shop by Category</h2>
                        <p className="text-gray-500 mt-1">Temukan produk berdasarkan kategori favoritmu.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border ${selectedCategory === 'All' ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-500 hover:text-orange-500'}`}
                        >
                            Semua Produk
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border ${selectedCategory === cat.name ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-500 hover:text-orange-500'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6 mt-12">
                    <h2 className="text-2xl font-black text-gray-900">
                        {search ? `Hasil Pencarian: "${search}"` : selectedCategory !== 'All' ? `Produk ${selectedCategory}` : 'Rekomendasi Untukmu'}
                    </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
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