'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'sale' | 'adjustment' | 'restock';
  quantity: number;
  previousStock: number;
  newStock: number;
  date: string;
  notes?: string;
  userId?: string;
  userName?: string;
}

interface InventoryContextType {
  movements: StockMovement[];
  isLoaded: boolean;
  addMovement: (movement: Omit<StockMovement, 'id' | 'date'>) => void;
  getMovementsByProduct: (productId: string) => StockMovement[];
  getRecentMovements: (limit?: number) => StockMovement[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_inventory_movements';

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setMovements(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse inventory movements:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movements));
    }
  }, [movements, isLoaded]);

  const addMovement = (movementData: Omit<StockMovement, 'id' | 'date'>) => {
    const newMovement: StockMovement = {
      ...movementData,
      id: `movement_${Date.now()}`,
      date: new Date().toISOString(),
    };
    setMovements(prev => [newMovement, ...prev]);
  };

  const getMovementsByProduct = (productId: string) => {
    return movements.filter(m => m.productId === productId);
  };

  const getRecentMovements = (limit: number = 50) => {
    return movements.slice(0, limit);
  };

  return (
    <InventoryContext.Provider value={{ movements, isLoaded, addMovement, getMovementsByProduct, getRecentMovements }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
}
