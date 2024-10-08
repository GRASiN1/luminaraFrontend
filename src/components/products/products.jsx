import React, { useEffect, useState } from "react";
import { axiosInstance, END_POINTS } from "../../services/api";
import { useLocation } from "react-router-dom";
import ProductCard from "../productCard/productCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const product = {
    _id: "123456789",
    name: "Product 1",
    price: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbVT2tPcL5ZExG777jJ33nZz6CihGc4bwwYw&s",
    category: "Category 1",
    description:
      "Product 1 description is showen here and some part is trimmed",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { category } = location.state;
        if (category) {
          const response = await axiosInstance.get(END_POINTS.GET_PRODUCTS, {
            params: { category },
          });
          setProducts(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [location.state]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-pink-50">
      {error ? (
        error.message
      ) : isLoading ? (
        <p>Loading....</p>
      ) : (
        products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })
      )}
      <ProductCard product={product} />
    </div>
  );
}
