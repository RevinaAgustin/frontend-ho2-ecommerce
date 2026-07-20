import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PaintReveal from '../components/PaintReveal';

import baseImg from '../assets/Base.png';
import revealImg from '../assets/Reveal.png';

const brushTexture = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9J2cnPjxzdG9wIG9mZnNldD0nMCUnIHN0b3AtY29sb3I9J3doaXRlJyBzdG9wLW9wYWNpdHk9JzEnLz48c3RvcCBvZmZzZXQ9JzEwMCUnIHN0b3AtY29sb3I9J3doaXRlJyBzdG9wLW9wYWNpdHk9JzAnLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc1MCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==";




const TypewriterText = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return (
        <>
            {displayedText}
            <span className="inline-block w-1 h-[0.8em] bg-orange-500 ml-1 animate-pulse align-baseline rounded-full"></span>
        </>
    );
};

const Home = ({ search, setSearch }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [timeLeft, setTimeLeft] = useState(2 * 3600 + 15 * 60 + 30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
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
            <div className="relative w-full bg-[#F9FAFB] overflow-hidden">
                <div className="container mx-auto px-6 py-10 md:py-16 lg:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="flex-1 flex flex-col items-start justify-center max-w-2xl relative z-10">
                        <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight drop-shadow-sm whitespace-pre-line">
                            {/* Invisible placeholder to reserve exact height */}
                            <span className="invisible opacity-0 pointer-events-none">{"Belanja Semua Kebutuhanmu\nDalam Satu Tempat."}</span>
                            
                            {/* Absolute typing text */}
                            <span className="absolute top-0 left-0 w-full h-full">
                                <TypewriterText text={"Belanja Semua Kebutuhanmu\nDalam Satu Tempat."} speed={50} />
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 font-medium mb-10 whitespace-pre-line leading-relaxed">
                            Dari skincare, gadget, snack, hingga perlengkapan rumah.<br />Semua ada di All Some Mart.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => document.getElementById('shop-by-category')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center justify-center cursor-pointer">
                                {/* Left Arrow Circle */}
                                <div className="flex items-center justify-center overflow-hidden bg-orange-500 text-white rounded-full transition-all duration-500 ease-out w-12 h-12 mr-3 opacity-100 scale-100 group-hover:w-0 group-hover:mr-0 group-hover:scale-50 group-hover:opacity-0 origin-center shrink-0 shadow-md">
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7m0 0H8m9 0v9" />
                                    </svg>
                                </div>

                                {/* Center Text Pill */}
                                <div className="flex items-center justify-center bg-orange-500 text-white font-bold px-8 h-12 rounded-full shadow-md transition-all duration-500 ease-out group-hover:-rotate-[6deg] group-hover:scale-105 origin-center">
                                    Mulai Belanja
                                </div>

                                {/* Right Arrow Circle */}
                                <div className="flex items-center justify-center overflow-hidden bg-orange-500 text-white rounded-full transition-all duration-500 ease-out w-0 h-12 ml-0 opacity-0 scale-50 group-hover:w-12 group-hover:ml-3 group-hover:scale-100 group-hover:opacity-100 origin-center shrink-0 shadow-md">
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7m0 0H8m9 0v9" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 relative w-full flex justify-center md:justify-end items-center min-h-[460px]">
                        <div className="w-full max-w-[560px] h-[460px] relative z-10">
                            <PaintReveal 
                                baseImage={baseImg} 
                                revealImage={revealImg} 
                                brushTexture={brushTexture}
                                brushSize={180}
                                borderRadius={24} 
                            />
                            
                            {/* Hover CTA */}
                            <div className="absolute -bottom-4 -right-2 md:-right-6 text-orange-500 font-bold flex items-center gap-2 pointer-events-none z-20 drop-shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                                Click n hover!
                            </div>
                        </div>
                        
                        {/* Decorative background blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-400 rounded-full blur-[80px] opacity-20 -z-10 pointer-events-none"></div>
                    </div>
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
                                return <ProductCard key={item.id} product={{ ...item, discountPercentage: fakeDiscount }} />
                            })}
                        </div>
                    </div>
                )}

                <div id="shop-by-category" className="mb-10 scroll-mt-24">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-gray-900">Shop by Category</h2>
                        <p className="text-gray-500 mt-1">Temukan produk berdasarkan kategori favoritmu.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`group relative overflow-hidden px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border ${
                                selectedCategory === 'All' 
                                ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-500 hover:text-orange-500'
                            }`}
                        >
                            <span className="relative z-10">Semua Produk</span>
                            {selectedCategory !== 'All' && (
                                <span className="absolute left-0 top-full w-full h-full bg-orange-50 rounded-[50%] transition-all duration-500 ease-out group-hover:top-0 group-hover:rounded-none z-0"></span>
                            )}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`group relative overflow-hidden px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border ${
                                    selectedCategory === cat.name 
                                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-500 hover:text-orange-500'
                                }`}
                            >
                                <span className="relative z-10">{cat.name}</span>
                                {selectedCategory !== cat.name && (
                                    <span className="absolute left-0 top-full w-full h-full bg-orange-50 rounded-[50%] transition-all duration-500 ease-out group-hover:top-0 group-hover:rounded-none z-0"></span>
                                )}
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