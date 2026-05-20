import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CatalogItem {
  id: string | number;
  mpn: string;
  desc: string;
  package: string;
  rohs: boolean;
  lifecycle: string;
  stock: number;
  leadTime: number;
  moq: number;
  price: number;
}

export interface AppSettings {
  octopartEnabled: boolean;
  avnetEnabled: boolean;
  digikeyEnabled: boolean;
}

interface AppContextType {
  catalog: CatalogItem[];
  settings: AppSettings;
  addCatalogItems: (items: Partial<CatalogItem>[]) => void;
  updateCatalogItem: (id: string | number, updates: Partial<CatalogItem>) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const defaultCatalog: CatalogItem[] = [
  { id: 1, mpn: 'CRCW040210K0FKED', desc: 'Resistor SMD 10K Ohm 1% 1/16W 0402', package: '0402', rohs: true, lifecycle: 'Active', stock: 45000, leadTime: 12, moq: 10000, price: 0.002 },
  { id: 2, mpn: 'C0603C104K5RACTU', desc: 'Capacitor Ceramic 0.1uF 50V X7R 0603', package: '0603', rohs: true, lifecycle: 'Active', stock: 120000, leadTime: 8, moq: 4000, price: 0.005 },
  { id: 3, mpn: 'STM32F103C8T6', desc: 'MCU 32-bit ARM Cortex-M3 64KB Flash', package: 'LQFP-48', rohs: true, lifecycle: 'Active', stock: 450, leadTime: 24, moq: 1, price: 2.45 },
  { id: 4, mpn: 'LM317T', desc: 'Linear Voltage Regulator 1.2V to 37V', package: 'TO-220', rohs: true, lifecycle: 'NRND', stock: 0, leadTime: 52, moq: 100, price: 0.45 },
];

const defaultSettings: AppSettings = {
  octopartEnabled: true,
  avnetEnabled: false,
  digikeyEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<CatalogItem[]>(() => {
    const saved = localStorage.getItem('adesio_catalog');
    return saved ? JSON.parse(saved) : defaultCatalog;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('adesio_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('adesio_catalog', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('adesio_settings', JSON.stringify(settings));
  }, [settings]);

  const addCatalogItems = (items: Partial<CatalogItem>[]) => {
    const newItems = items.map((item, index) => ({
      id: Date.now() + index,
      mpn: item.mpn || 'UNKNOWN',
      desc: item.desc || '',
      package: item.package || '',
      rohs: item.rohs || false,
      lifecycle: item.lifecycle || 'Active',
      stock: item.stock || 0,
      leadTime: item.leadTime || 0,
      moq: item.moq || 1,
      price: item.price || 0,
      ...item
    })) as CatalogItem[];
    setCatalog((prev) => [...prev, ...newItems]);
  };

  const updateCatalogItem = (id: string | number, updates: Partial<CatalogItem>) => {
    setCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider value={{ catalog, settings, addCatalogItems, updateCatalogItem, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
