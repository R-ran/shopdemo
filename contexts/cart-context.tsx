'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  selectedStyle?: string;
  selectedLength?: string;
  selectedBuyMoreSaveMore?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedPackage?: string;
  [key: string]: any; // 允许其他自定义属性
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getTotalSavings: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 从 localStorage 加载购物车
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // 保存购物车到 localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    setItems((prevItems) => {
      // 生成唯一 ID（基于产品ID和所有选择的属性）
      const itemKey = `${item.productId}-${item.selectedStyle || ''}-${item.selectedLength || ''}-${item.selectedBuyMoreSaveMore || ''}-${item.selectedColor || ''}-${item.selectedSize || ''}-${item.selectedPackage || ''}`;
      
      // 检查是否已存在相同的商品（相同的产品和相同的选择）
      const existingItem = prevItems.find(
        (existing) => {
          const existingKey = `${existing.productId}-${existing.selectedStyle || ''}-${existing.selectedLength || ''}-${existing.selectedBuyMoreSaveMore || ''}-${existing.selectedColor || ''}-${existing.selectedSize || ''}-${existing.selectedPackage || ''}`;
          return existingKey === itemKey;
        }
      );

      if (existingItem) {
        // 如果存在，增加数量
        return prevItems.map((existing) =>
          existing.id === existingItem.id
            ? { ...existing, quantity: existing.quantity + item.quantity }
            : existing
        );
      } else {
        // 如果不存在，添加新商品
        const newItem: CartItem = {
          ...item,
          id: `${itemKey}-${Date.now()}`,
        };
        return [...prevItems, newItem];
      }
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalSavings = useCallback(() => {
    return items.reduce((total, item) => {
      if (item.comparePrice && item.comparePrice > item.price) {
        return total + (item.comparePrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        getTotalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

