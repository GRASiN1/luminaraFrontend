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
import { useUser } from "./UserContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const showAlertRef = useRef(showAlert);
  const { isUserLoaded } = useUser();

  useEffect(() => {
    showAlertRef.current = showAlert;
  }, [showAlert]);

  const fetchAndSetProducts = useCallback(async (category = null) => {
    setIsLoading(true);
    let hasErrors = false;
    try {
      const { data } = await axiosInstance.get(END_POINTS.GET_PRODUCTS, {
        params: { category },
      });
      if (data.productsList.length === 0) throw new Error("No products found");
      setProducts(data.productsList);
    } catch (error) {
      hasErrors = true;
      showAlertRef.current(error.message, "error");
    } finally {
      if (!hasErrors) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Ensure 'products' array is initialized in localStorage
    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify([]));
    }
    // Fetch products only after user is loaded
    if (isUserLoaded) {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        fetchAndSetProducts();
      }
    }
  }, [isUserLoaded, fetchAndSetProducts]);

  useEffect(() => {
    // Update localStorage whenever products are fetched or updated
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
