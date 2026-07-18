import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageUrl = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop';
  const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full cursor-pointer border border-transparent hover:border-gray-100 relative">
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discountPercentage > 0 && (
            <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-500 hover:text-red-500 hover:bg-gray-50 transition-colors" title="Wishlist" onClick={(e) => e.preventDefault()}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-500 hover:text-orange-500 hover:bg-gray-50 transition-colors" title="Quick View" onClick={(e) => e.preventDefault()}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-[11px] text-gray-400 mb-2 font-medium uppercase tracking-wider">{product.category?.name || 'Produk'}</p>
        <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-snug mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">{product.name}</h3>
        
        {/* Dummy Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-orange-400 text-xs tracking-widest">
            ★★★★★
          </div>
          <span className="text-[10px] text-gray-400 ml-1">(45)</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <p className="font-black text-orange-600 text-base sm:text-lg truncate" title={formattedPrice}>{formattedPrice}</p>
          </div>
          <button className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-colors" title="Add to Cart" onClick={(e) => e.preventDefault()}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;