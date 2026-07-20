import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="p-10 text-center text-gray-500">Produk tidak ditemukan.</div>;

  const imageUrl = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop';
  const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8 font-medium">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          {product.category?.name && (
            <>
              <span className="text-gray-500">{product.category.name}</span>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-800 line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Container */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Image Section */}
            <div className="md:w-1/2 bg-gray-50/50 p-10 lg:p-14 flex items-center justify-center relative">
              <img src={imageUrl} alt={product.name} className="w-full max-w-md h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500 rounded-xl" />
              {product.discountPercentage > 0 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {product.discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Detail Section */}
            <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
              {product.brand?.name && (
                <span className="text-orange-500 font-bold tracking-wider uppercase text-xs mb-2">
                  {product.brand.name}
                </span>
              )}
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 leading-tight mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center bg-orange-50 px-2.5 py-1 rounded-md">
                  <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span className="text-sm font-bold text-gray-700">{product.rating || '4.5'}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">Terjual 100+</span>
              </div>

              <div className="mb-8">
                <p className="text-4xl font-black text-orange-600 tracking-tight">{formattedPrice}</p>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-gray-400 line-through mt-1">
                    Rp {new Intl.NumberFormat('id-ID').format(Math.round(product.price / (1 - product.discountPercentage/100)))}
                  </p>
                )}
              </div>

              <div className="border-t border-b border-gray-100 py-8 mb-8">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-8">
                <div>
                  <span className="block text-gray-400 mb-1">Kondisi</span>
                  <span className="font-semibold text-gray-800">{product.condition || 'Baru'}</span>
                </div>
                <div>
                  <span className="block text-gray-400 mb-1">Stok Tersedia</span>
                  <span className="font-semibold text-gray-800">{product.stock || 0}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 flex gap-4">
                <button className="flex-1 group relative overflow-hidden bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-orange-500/30 hover:shadow-lg hover:-translate-y-0.5">
                  <span className="relative z-10">Beli Langsung</span>
                  <span className="absolute left-0 top-full w-full h-full bg-orange-600 rounded-[50%] transition-all duration-500 ease-out group-hover:top-0 group-hover:rounded-none z-0"></span>
                </button>
                <button className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:border-orange-500 hover:text-orange-500 transition-all duration-300 shadow-sm hover:bg-orange-50/50">
                  + Keranjang
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;