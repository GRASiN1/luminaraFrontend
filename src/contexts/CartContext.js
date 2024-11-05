import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import { axiosInstance, END_POINTS } from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();

  const updateCartOnServer = useCallback(
    async (cartItems) => {
      if (!user || !user._id) return; // Ensure user is authenticated

      try {
        await axiosInstance.post(END_POINTS.UPDATE_CART, {
          cartOf: user._id,
          cartItems,
        });
      } catch (error) {
        console.error("Failed to update cart on server", error);
      }
    },
    [user]
  );

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else if (user && user.cartItems) {
      setCartItems(user.cartItems);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const debounceUpdate = setTimeout(() => {
      updateCartOnServer(cartItems);
    }, 500); // Debounce for 500ms

    return () => clearTimeout(debounceUpdate);
  }, [cartItems, updateCartOnServer]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      const updatedCartItems = existingItem
        ? prevItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }];

      return updatedCartItems;
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
