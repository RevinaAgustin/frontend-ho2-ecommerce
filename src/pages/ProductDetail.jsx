import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const ProductDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10">Loading detail...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl" />
      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-2xl text-blue-600 font-semibold my-2">Rp {product.price}</p>
      <p className="text-gray-700 mt-4">{product.description}</p>
    </div>
  );
};

export default ProductDetail;