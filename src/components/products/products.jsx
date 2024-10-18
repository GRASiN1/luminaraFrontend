import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance, END_POINTS } from "../../services/api";
import { useLocation } from "react-router-dom";
import ProductCard from "../productCard/productCard";
import ProductCardLoader from "../productCard/productCardLoader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const mockData = [
      {
        _id: 101,
        image: "/images/productImage.webp",
        name: "Lorem ipsum dolor",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, incidunt voluptatibus deserunt ex nisi iusto",
        price: 100,
        category: "Category 1",
        details: {
          Material: "wool",
          Care: "Machine washable",
        },
      },
      {
        _id: 101,
        image: "/images/productImage.webp",
        name: "Lorem ipsum dolor",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, incidunt voluptatibus deserunt ex nisi iusto",
        price: 100,
        category: "Category 1",
        details: {
          Material: "wool",
          Care: "Machine washable",
        },
      },
      {
        _id: 101,
        image: "/images/productImage.webp",
        name: "Lorem ipsum dolor",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, incidunt voluptatibus deserunt ex nisi iusto",
        price: 100,
        category: "Category 1",
        details: {
          Material: "wool",
          Care: "Machine washable",
        },
      },
    ];
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const category = location.state ? location.state.category : null;
        if (category) {
          const response = await axiosInstance.get(END_POINTS.GET_PRODUCTS, {
            params: { category },
          });
          setProducts(response.data);
        } else if (mockData === null) {
          const response = await axiosInstance.get(END_POINTS.GET_PRODUCTS);
          setProducts(response.data);
        } else {
          setProducts(mockData);
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
    <div className="w-full flex justify-center items-start  bg-pink-50">
      <div className="m-5 grid grid-cols-5 gap-4">
        {error ? (
          error.message
        ) : isLoading ? (
          <div className="grid grid-cols-5 gap-4 my-10">
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
          </div>
        ) : (
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        )}
      </div>
    </div>
  );
}
