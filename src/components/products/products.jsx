import React, { useEffect, useState, useRef } from "react";
import { axiosInstance, END_POINTS } from "../../services/api";
import { useLocation } from "react-router-dom";
import ProductCard from "../productCard/productCard";
import ProductCardLoader from "../productCard/productCardLoader";
import { useAlert } from "../../contexts/AlertContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { showAlert } = useAlert();
  const showAlertRef = useRef(showAlert);

  useEffect(() => {
    showAlertRef.current = showAlert;
  }, [showAlert]);

  useEffect(() => {
    setIsLoading(true);
    let hasError = false;

    const fetchProducts = async () => {
      try {
        const category = location.state ? location.state.category : null;
        const response = await axiosInstance.get(END_POINTS.GET_PRODUCTS, {
          params: { category },
        });
        if (response.data.productsList.length === 0)
          throw new Error("No products found");
        setProducts(response.data.productsList);
      } catch (error) {
        hasError = true;
        showAlertRef.current(error.message, "error");
      } finally {
        if (!hasError) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
  }, [location.state]);

  return (
    <div className="w-full flex justify-center items-start bg-pink-50 min-h-screen">
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center justify-items-center">
        {isLoading ? (
          <>
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
          </>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
