import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { axiosInstance, END_POINTS } from "../services/api";
import { useAlert } from "./AlertContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const showAlertRef = useRef(showAlert);

  useEffect(() => {
    showAlertRef.current = showAlert;
  }, [showAlert]);

  const fetchAndSetProducts = useCallback(async (category = null) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(END_POINTS.GET_PRODUCTS, {
        params: { category },
      });
      if (data.productsList.length === 0) throw new Error("No products found");
      setProducts(data.productsList);
    } catch (error) {
      showAlertRef.current(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchAndSetProducts();
    }
  }, [fetchAndSetProducts]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{ products, fetchAndSetProducts, isLoading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
