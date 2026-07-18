import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Use product.imageUrl since it's the actual property returned by the API
  const imageUrl = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop';
  
  // Format price nicely
  const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);

  return (
    <Link to={`/product/${product.id}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-1 font-medium tracking-wide uppercase">{product.category?.name || 'Produk'}</p>
        <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <div className="mt-auto">
          <p className="font-extrabold text-blue-700 text-lg md:text-xl">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;