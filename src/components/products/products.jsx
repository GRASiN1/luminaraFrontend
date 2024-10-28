import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../productCard/productCard";
import ProductCardLoader from "../productCard/productCardLoader";
import { useProduct } from "../../contexts/ProductContext";

export default function Products() {
  const { products, fetchAndSetProducts, isLoading } = useProduct();
  const location = useLocation();

  useEffect(() => {
    const category = location.state ? location.state.category : null;
    fetchAndSetProducts(category);
  }, [location.state, fetchAndSetProducts]);

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
