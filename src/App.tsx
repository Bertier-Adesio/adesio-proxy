import React, { useState } from 'react';
import { 
  Upload, LayoutDashboard, Database, Wand2, Settings, BarChart, MessageCircle,
  Search, Bell, User, Box, ArrowRight, Activity, Cloud
} from 'lucide-react';
import IngestionEngine from './components/IngestionEngine';
import CatalogManager from './components/CatalogManager';
import LiveSyncSettings from './components/LiveSyncSettings';
import AdesioAssist from './components/AdesioAssist';
import WeChatIntegration from './components/WeChatIntegration';
import TelemetryBilling from './components/TelemetryBilling';
import './index.css';

const MODULES = [
  { id: 'dashboard', label: 'Syndication Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'ingestion', label: 'AI Ingestion Engine', icon: <Upload size={20} /> },
  { id: 'catalog', label: 'Catalog Manager', icon: <Database size={20} /> },
  { id: 'assist', label: 'Adesio Assist', icon: <Wand2 size={20} /> },
  { id: 'integrations', label: 'LiveSync Settings', icon: <Settings size={20} /> },
  { id: 'telemetry', label: 'Telemetry & Billing', icon: <BarChart size={20} /> },
  { id: 'wechat', label: 'WeChat Integration', icon: <MessageCircle size={20} /> },
];

function DashboardView() {
  return (
    <div className="dashboard-grid">
      <div className="card">
        <div className="card-header">
          <Box className="card-icon" size={24} />
          <h3 className="card-title">Network Status</h3>
        </div>
        <div className="card-body">
          <p>Your components are syndicated across global distributors.</p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Octopart API</span>
              <span className="badge badge-green">Unlocked</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SiliconExpert</span>
              <span className="badge badge-yellow">Pending Update</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>DigiKey EDI</span>
              <span className="badge badge-red">Locked (Missing Data)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <Activity className="card-icon" size={24} />
          <h3 className="card-title">Data Health</h3>
        </div>
        <div className="card-body">
          <p>AI ingestion metrics for the current billing cycle.</p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
              <span>Total MPNs Managed</span>
              <strong>14,230</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
              <span>Missing MVP Fields</span>
              <strong>124</strong>
            </div>
            <button style={{ marginTop: '12px', padding: '10px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Wand2 size={16} /> Enrich with Adesio Assist
            </button>
          </div>
        </div>
      </div>

      <div className="card">
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
      </div>
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

  const activeTitle = MODULES.find(m => m.id === activeModule)?.label || 'Dashboard';

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Box className="logo-icon" size={28} />
          <span className="logo-text">Adesio Proxy</span>
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

        <div className="sidebar-footer">
          v2.0 Multi-Cloud Build
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
           : <DefaultView title={activeTitle} />}
        </div>
      </main>
    </div>
  );
}