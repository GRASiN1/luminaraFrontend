import React from "react";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    setIsLoading(true);
    let hasError = false;
    // eslint-disable-next-line
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
        _id: 102,
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
        _id: 103,
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
      try {
        const category = location.state ? location.state.category : null;
        if (category) {
          const response = await axiosInstance.get(END_POINTS.GET_PRODUCTS, {
            params: { category },
          });
          setProducts(response.data);
        } else {
          const response = await axiosInstance.get(END_POINTS.GET_PRODUCTS);
          setProducts(response.data);
        }
      } catch (error) {
        hasError = true;
        showAlert(error.message, "error");
      } finally {
        if (!hasError) {
          setIsLoading(false);
        }
      }
    };
    fetchProducts();
  }, [location.state]);

  return (
    <div className="w-full flex justify-center items-start bg-pink-50">
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
