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

export interface TelemetryData {
  metrics: {
    userActivity: number;
    userActivityGrowth: number;
    apiSyncs: number;
    apiSyncsGrowth: number;
  };
  geography: {
    na: number;
    emea: number;
    apac: number;
  };
  usageData: Array<{ name: string; partnerApi: number; userEvents: number }>;
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
  isLoadingCatalog: boolean;
  telemetry: TelemetryData | null;
  isLoadingTelemetry: boolean;
}

import mockCatalogData from '../data/mockCatalog.json';
import mockTelemetryData from '../data/mockTelemetry.json';

const defaultSettings: AppSettings = {
  octopartEnabled: true,
  avnetEnabled: false,
  digikeyEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(true);

  // Simulate network fetch of dense catalog
  useEffect(() => {
    const loadCatalog = async () => {
      const saved = localStorage.getItem('adesio_catalog');
      if (saved) {
        setCatalog(JSON.parse(saved));
        setIsLoadingCatalog(false);
      } else {
        // Simulate network latency for realism
        setTimeout(() => {
          setCatalog(mockCatalogData as CatalogItem[]);
          setIsLoadingCatalog(false);
        }, 1500);
      }
    };
    loadCatalog();
  }, []);

  // Simulate network fetch of telemetry
  useEffect(() => {
    setTimeout(() => {
      setTelemetry(mockTelemetryData as TelemetryData);
      setIsLoadingTelemetry(false);
    }, 1800);
  }, []);

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
    <AppContext.Provider value={{ catalog, settings, activityLogs, addCatalogItems, updateCatalogItem, updateSettings, addActivityLog, isLoadingCatalog, telemetry, isLoadingTelemetry }}>
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
