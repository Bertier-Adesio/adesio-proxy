import { useState, useEffect } from 'react';
import { 
  Upload, LayoutDashboard, Database, Wand2, Settings, BarChart, MessageCircle,
  Search, Bell, Box, ArrowRight, Activity, Cloud, Globe, FileText
} from 'lucide-react';
import IngestionEngine from './components/IngestionEngine';
import CatalogManager from './components/CatalogManager';
import LiveSyncSettings from './components/LiveSyncSettings';
import AdesioAssist from './components/AdesioAssist';
import WeChatIntegration from './components/WeChatIntegration';
import TelemetryBilling from './components/TelemetryBilling';
import InteractiveMap from './components/InteractiveMap';
import { useAppContext } from './context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import ProductDocumentation from './components/ProductDocumentation';
import './index.css';

const MODULES = [
  { id: 'dashboard', label: 'Syndication Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'ingestion', label: 'AI Ingestion Engine', icon: <Upload size={20} /> },
  { id: 'catalog', label: 'Catalog Manager', icon: <Database size={20} /> },
  { id: 'assist', label: 'Adesio Assist', icon: <Wand2 size={20} /> },
  { id: 'integrations', label: 'LiveSync Settings', icon: <Settings size={20} /> },
  { id: 'telemetry', label: 'Telemetry & Billing', icon: <BarChart size={20} /> },
  { id: 'wechat', label: 'WeChat Integration', icon: <MessageCircle size={20} /> },
  { id: 'map', label: 'Global Network Map', icon: <Globe size={20} /> },
];

function DashboardView() {
  const { catalog, settings, activityLogs } = useAppContext();
  const missingCount = catalog.filter(c => !c.desc || !c.package || !c.mpn).length;

  const chartData = [
    { name: 'Mon', apiCalls: 12000, ingestions: 400 },
    { name: 'Tue', apiCalls: 19000, ingestions: 300 },
    { name: 'Wed', apiCalls: 15000, ingestions: 800 },
    { name: 'Thu', apiCalls: 22000, ingestions: 1200 },
    { name: 'Fri', apiCalls: 28000, ingestions: 900 },
    { name: 'Sat', apiCalls: 14000, ingestions: 200 },
    { name: 'Sun', apiCalls: 18000, ingestions: 500 },
  ];

  return (
    <div className="dashboard-grid">
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} whileHover={{ scale: 1.02 }}
      >
        <div className="card-header">
          <Box className="card-icon" size={24} />
          <h3 className="card-title">Network Status</h3>
        </div>
        <div className="card-body">
          <p>Your components are syndicated across global distributors.</p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Octopart API</span>
              {settings.octopartEnabled ? <span className="badge badge-green">Unlocked</span> : <span className="badge badge-red">Locked</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SiliconExpert</span>
              <span className="badge badge-yellow">Pending Update</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>DigiKey EDI</span>
              {settings.digikeyEnabled ? <span className="badge badge-green">Unlocked</span> : <span className="badge badge-red">Locked</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Avnet API</span>
              {settings.avnetEnabled ? <span className="badge badge-green">Unlocked</span> : <span className="badge badge-red">Locked</span>}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} whileHover={{ scale: 1.02 }}
      >
        <div className="card-header">
          <Activity className="card-icon" size={24} />
          <h3 className="card-title">Data Health</h3>
        </div>
        <div className="card-body">
          <p>AI ingestion metrics for the current billing cycle.</p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-primary)' }}>
              <span>Total MPNs Managed</span>
              <strong className="text-3xl font-bold font-mono text-white tracking-tight">{catalog.length.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-primary)' }}>
              <span>Missing MVP Fields</span>
              <strong className="text-3xl font-bold font-mono text-white tracking-tight">{missingCount}</strong>
            </div>
            <button style={{ marginTop: '12px', padding: '10px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Wand2 size={16} /> Enrich with Adesio Assist
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }} whileHover={{ scale: 1.02 }}
      >
        <div className="card-header">
          <Cloud className="card-icon" size={24} />
          <h3 className="card-title">Multi-Cloud Sync</h3>
        </div>
        <div className="card-body">
          <p>Real-time sync status between Alibaba Cloud and GCP.</p>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Alibaba (APAC)</div>
              <div style={{ marginTop: '4px', color: '#10b981', fontWeight: 'bold' }}>Active</div>
            </div>
            <ArrowRight size={20} color="var(--text-secondary)" />
            <div style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>GCP (Global)</div>
              <div style={{ marginTop: '4px', color: '#10b981', fontWeight: 'bold' }}>Active</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RECHARTS AREA CHART */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
        style={{ gridColumn: '1 / -1' }}
      >
        <div className="card-header">
          <BarChart className="card-icon" size={24} />
          <h3 className="card-title">Global API Request Volume</h3>
        </div>
        <div className="card-body" style={{ height: '300px', marginTop: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-cpi)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-cpi)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorIngest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-partcheck)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-partcheck)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <RechartsTooltip 
                contentStyle={{ background: 'var(--panel-bg)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="apiCalls" stroke="var(--color-cpi)" fillOpacity={1} fill="url(#colorApi)" />
              <Area type="monotone" dataKey="ingestions" stroke="var(--color-partcheck)" fillOpacity={1} fill="url(#colorIngest)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ACTIVITY FEED */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        style={{ gridColumn: '1 / -1' }}
      >
        <div className="card-header">
          <Activity className="card-icon" size={24} />
          <h3 className="card-title">Real-Time Syndication Log</h3>
        </div>
        <div className="card-body" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence>
              {activityLogs.map((log) => (
                <motion.div 
                  key={log.id} 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                >
                  <div style={{ padding: '6px', borderRadius: '50%', background: log.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : log.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: log.type === 'error' ? '#ef4444' : log.type === 'warning' ? '#f59e0b' : '#10b981' }}>
                    <Activity size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{log.message}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{log.source}</span>
                      <span>•</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      <button 
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('navigate', { detail: 'catalog' }));
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}
                      >
                        View Catalog
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

function DefaultView({ title }: { title: string }) {
  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--text-secondary)'
    }}>
      <Wand2 size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
      <h2>{title} Module</h2>
      <p style={{ marginTop: '8px' }}>This module is currently under construction.</p>
    </div>
  );
}

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showDocModal, setShowDocModal] = useState(false);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) setActiveModule(customEvent.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const activeTitle = MODULES.find(m => m.id === activeModule)?.label || 'Dashboard';

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Box className="logo-icon" size={28} />
          <span className="logo-text">Adesio Sync</span>
        </div>
        
        <div className="sidebar-nav">
          {MODULES.map((module) => (
            <div 
              key={module.id}
              className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => setActiveModule(module.id)}
            >
              {module.icon}
              <span>{module.label}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span>v2.0 Multi-Cloud Build</span>
          <button 
            onClick={() => setShowDocModal(true)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--accent-primary)', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
          >
            <FileText size={14} /> Product Documentation
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-title">{activeTitle}</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)' }}>
              <Search size={20} style={{ cursor: 'pointer' }} />
              <Bell size={20} style={{ cursor: 'pointer' }} />
            </div>
            
            <div className="user-profile">
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--text-primary)' }}>Supplier Admin</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Alibaba Front-Office</div>
              </div>
              <div className="avatar">A</div>
            </div>
          </div>
        </header>

        <div className="page-content">
          {activeModule === 'dashboard' ? <DashboardView /> 
           : activeModule === 'ingestion' ? <IngestionEngine /> 
           : activeModule === 'catalog' ? <CatalogManager />
           : activeModule === 'assist' ? <AdesioAssist />
           : activeModule === 'integrations' ? <LiveSyncSettings />
           : activeModule === 'wechat' ? <WeChatIntegration />
           : activeModule === 'telemetry' ? <TelemetryBilling />
           : activeModule === 'map' ? <InteractiveMap />
           : <DefaultView title={activeTitle} />}
        </div>
      </main>

      <ProductDocumentation isOpen={showDocModal} onClose={() => setShowDocModal(false)} />
    </div>
  );
}