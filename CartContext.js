import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingCartItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingCartItemIndex].quantity += 1;

        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
