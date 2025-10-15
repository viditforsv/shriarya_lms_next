"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  courseId: string;
  courseSlug: string;
  title: string;
  price: number;
  thumbnail?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("course-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("course-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // Check if item already exists
      if (prev.some((i) => i.courseId === item.courseId)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (courseId: string) => {
    setItems((prev) => prev.filter((item) => item.courseId !== courseId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (courseId: string) => {
    return items.some((item) => item.courseId === courseId);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

