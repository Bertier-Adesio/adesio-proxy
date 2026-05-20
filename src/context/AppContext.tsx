import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

export interface ActivityLog {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  source: string;
}

interface AppContextType {
  catalog: CatalogItem[];
  settings: AppSettings;
  activityLogs: ActivityLog[];
  addCatalogItems: (items: Partial<CatalogItem>[]) => void;
  updateCatalogItem: (id: string | number, updates: Partial<CatalogItem>) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

const defaultCatalog: CatalogItem[] = [
  { id: 1, mpn: 'CRCW040210K0FKED', desc: 'Vishay Resistor SMD 10K Ohm 1% 1/16W 0402', package: '0402', rohs: true, lifecycle: 'Active', stock: 45000, leadTime: 12, moq: 10000, price: 0.002 },
  { id: 2, mpn: 'C0603C104K5RACTU', desc: 'KEMET Capacitor Ceramic 0.1uF 50V X7R 0603', package: '0603', rohs: true, lifecycle: 'Active', stock: 120000, leadTime: 8, moq: 4000, price: 0.005 },
  { id: 3, mpn: 'STM32F103C8T6', desc: 'STMicro MCU 32-bit ARM Cortex-M3 64KB Flash', package: 'LQFP-48', rohs: true, lifecycle: 'Active', stock: 450, leadTime: 24, moq: 1, price: 2.45 },
  { id: 4, mpn: 'LM317T', desc: 'TI Linear Voltage Regulator 1.2V to 37V', package: 'TO-220', rohs: true, lifecycle: 'NRND', stock: 0, leadTime: 52, moq: 100, price: 0.45 },
  { id: 5, mpn: 'RC0402FR-071KL', desc: 'Yageo Resistor SMD 1K Ohm 1% 1/16W 0402', package: '0402', rohs: true, lifecycle: 'Active', stock: 850000, leadTime: 4, moq: 10000, price: 0.001 },
  { id: 6, mpn: 'GRM188R71H104KA93D', desc: 'Murata Cap Ceramic 0.1uF 50V X7R 0603', package: '0603', rohs: true, lifecycle: 'Active', stock: 25000, leadTime: 14, moq: 4000, price: 0.004 },
  { id: 7, mpn: 'ATMEGA328P-PU', desc: 'Microchip 8-bit AVR MCU 32KB Flash', package: 'DIP-28', rohs: true, lifecycle: 'Active', stock: 1200, leadTime: 18, moq: 1, price: 1.85 },
  { id: 8, mpn: 'NE555P', desc: 'TI Precision Timer', package: 'DIP-8', rohs: true, lifecycle: 'Active', stock: 5400, leadTime: 8, moq: 10, price: 0.15 },
  { id: 9, mpn: 'BS170', desc: 'ON Semi N-Channel MOSFET 60V 500mA', package: 'TO-92', rohs: true, lifecycle: 'Active', stock: 8900, leadTime: 12, moq: 100, price: 0.12 },
  { id: 10, mpn: '1N4148', desc: 'Vishay Small Signal Fast Switching Diode', package: 'DO-35', rohs: true, lifecycle: 'Active', stock: 150000, leadTime: 2, moq: 1000, price: 0.02 },
  { id: 11, mpn: 'ESP32-WROOM-32D', desc: 'Espressif Wi-Fi + BT Module', package: 'SMD-38', rohs: true, lifecycle: 'Active', stock: 320, leadTime: 16, moq: 100, price: 3.10 },
  { id: 12, mpn: 'SN74HC595N', desc: 'TI 8-Bit Shift Register with 3-State Output Registers', package: 'DIP-16', rohs: true, lifecycle: 'Active', stock: 2100, leadTime: 20, moq: 50, price: 0.28 },
  { id: 13, mpn: 'LM358P', desc: 'TI Dual Operational Amplifier', package: 'DIP-8', rohs: true, lifecycle: 'Active', stock: 4500, leadTime: 10, moq: 100, price: 0.18 },
  { id: 14, mpn: 'PC817', desc: 'Sharp Optocoupler 1-CH Transistor Output', package: 'DIP-4', rohs: true, lifecycle: 'Active', stock: 12500, leadTime: 6, moq: 1000, price: 0.08 },
  { id: 15, mpn: 'IRFZ44N', desc: 'Infineon N-Channel HEXFET Power MOSFET 55V 49A', package: 'TO-220AB', rohs: false, lifecycle: 'Obsolete', stock: 0, leadTime: 0, moq: 0, price: 0.65 },
  { id: 16, mpn: 'BSS138', desc: 'ON Semi N-Channel Logic Level Enhancement Mode FET', package: 'SOT-23', rohs: true, lifecycle: 'Active', stock: 34000, leadTime: 12, moq: 3000, price: 0.06 },
  { id: 17, mpn: 'TL431ACLP', desc: 'TI Adjustable Precision Shunt Regulator', package: 'TO-92', rohs: true, lifecycle: 'Active', stock: 8800, leadTime: 14, moq: 100, price: 0.11 },
  { id: 18, mpn: 'MCP3008-I/P', desc: 'Microchip 8-Channel 10-Bit ADC with SPI Interface', package: 'DIP-16', rohs: true, lifecycle: 'Active', stock: 150, leadTime: 26, moq: 1, price: 2.15 },
  { id: 19, mpn: 'L7805CV', desc: 'STMicro Positive Voltage Regulator 5V 1.5A', package: 'TO-220', rohs: true, lifecycle: 'Active', stock: 6700, leadTime: 10, moq: 50, price: 0.32 },
  { id: 20, mpn: '2N2222A', desc: 'Central Semi NPN General Purpose Amplifier', package: 'TO-18', rohs: true, lifecycle: 'NRND', stock: 400, leadTime: 30, moq: 100, price: 0.22 },
  { id: 21, mpn: 'INA219AIDR', desc: 'TI Zero-Drift, Bidirectional Current/Power Monitor', package: 'SOIC-8', rohs: true, lifecycle: 'Active', stock: 890, leadTime: 16, moq: 100, price: 1.45 },
  { id: 22, mpn: 'SI2302CDS-T1-GE3', desc: 'Vishay N-Channel 20-V (D-S) MOSFET', package: 'SOT-23', rohs: true, lifecycle: 'Active', stock: 12000, leadTime: 8, moq: 3000, price: 0.09 }
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

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: 1, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), message: 'Global Master Database synced 452 records', type: 'success', source: 'Alibaba APAC' },
    { id: 2, timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(), message: 'Missing MVP Fields detected in Ingestion Batch #89', type: 'warning', source: 'Adesio Assist' },
    { id: 3, timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), message: 'Octopart API pulled 15,200 pricing updates', type: 'info', source: 'GCP Syndication' },
    { id: 4, timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), message: 'WeChat user authenticated via Mini-Program', type: 'info', source: 'WeChat IAM' },
  ]);

  useEffect(() => {
    localStorage.setItem('adesio_catalog', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('adesio_settings', JSON.stringify(settings));
  }, [settings]);

  const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    setActivityLogs(prev => [
      { ...log, id: Date.now(), timestamp: new Date().toISOString() },
      ...prev
    ].slice(0, 50)); // keep last 50
  };

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
    <AppContext.Provider value={{ catalog, settings, activityLogs, addCatalogItems, updateCatalogItem, updateSettings, addActivityLog }}>
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
