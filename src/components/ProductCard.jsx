import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image} className="w-full h-48 object-cover rounded-md" />
      <h3 className="font-bold text-lg mt-2">{product.name}</h3>
      <p className="text-gray-600">Rp {product.price}</p>

      <Link to={`/product/${product.id}`} className="block mt-4 bg-blue-500 text-white text-center py-2 rounded">
        Lihat Detail
      </Link>
    </div>
  );
};