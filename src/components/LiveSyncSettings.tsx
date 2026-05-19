import React, { useState } from 'react';
import { Network, Key, Server, ToggleLeft, ToggleRight, CheckCircle, RefreshCw, Copy, ExternalLink, ShieldAlert } from 'lucide-react';

export default function LiveSyncSettings() {
  const [activeTab, setActiveTab] = useState<'connectors' | 'sftp' | 'api'>('connectors');
  const [octopartEnabled, setOctopartEnabled] = useState(true);
  const [avnetEnabled, setAvnetEnabled] = useState(false);
  const [digikeyEnabled, setDigikeyEnabled] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Integrations & LiveSync Settings</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Configure automated outbound feeds and ERP connections.</p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('connectors')}
          style={{ padding: '8px 16px', background: 'transparent', color: activeTab === 'connectors' ? 'var(--accent-primary)' : 'var(--text-secondary)', border: 'none', borderBottom: activeTab === 'connectors' ? '2px solid var(--accent-primary)' : '2px solid transparent', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-13px' }}>
          <Network size={18} /> Outbound Connectors
        </button>
        <button 
          onClick={() => setActiveTab('sftp')}
          style={{ padding: '8px 16px', background: 'transparent', color: activeTab === 'sftp' ? 'var(--accent-primary)' : 'var(--text-secondary)', border: 'none', borderBottom: activeTab === 'sftp' ? '2px solid var(--accent-primary)' : '2px solid transparent', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-13px' }}>
          <Server size={18} /> Inbound Fetch (API / SFTP)
        </button>
        <button 
          onClick={() => setActiveTab('api')}
          style={{ padding: '8px 16px', background: 'transparent', color: activeTab === 'api' ? 'var(--accent-primary)' : 'var(--text-secondary)', border: 'none', borderBottom: activeTab === 'api' ? '2px solid var(--accent-primary)' : '2px solid transparent', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-13px' }}>
          <Key size={18} /> API Webhooks
        </button>
      </div>

      {/* CONNECTORS CONTENT */}
      {activeTab === 'connectors' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Connector Cards */}
          {[
            { name: 'Octopart API', type: 'Aggregator', enabled: octopartEnabled, setter: setOctopartEnabled, status: 'Active (Synced 5m ago)', color: '#10b981' },
            { name: 'DigiKey EDI', type: 'Distributor', enabled: digikeyEnabled, setter: setDigikeyEnabled, status: 'Active (Synced 1h ago)', color: '#10b981' },
            { name: 'Avnet API', type: 'Distributor', enabled: avnetEnabled, setter: setAvnetEnabled, status: 'Disabled', color: 'var(--text-secondary)' },
          ].map((connector, idx) => (
            <div key={idx} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{connector.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{connector.type}</span>
                </div>
                <button 
                  onClick={() => connector.setter(!connector.enabled)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: connector.enabled ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                  {connector.enabled ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>
              <div style={{ flex: 1 }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: connector.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {connector.enabled ? <CheckCircle size={14} /> : <ShieldAlert size={14} />} {connector.status}
                </span>
                {connector.enabled && <a href="#" style={{ color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>Logs <ExternalLink size={12} /></a>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INBOUND FETCH CONTENT */}
      {activeTab === 'sftp' && (
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Automated Inbound Fetch</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Configure Adesio to automatically pull your dynamic data (MPN, Stock, Lead Time, Price) from your REST API or secure FTP drop zone.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="fetchType" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>REST API Endpoint</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="fetchType" style={{ accentColor: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Secure FTP (SFTP)</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Endpoint URL</label>
              <input type="text" defaultValue="https://api.manufacturer.com/v1/inventory" style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Authentication Method</label>
              <select style={{ padding: '10px 12px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}>
                <option>Bearer Token</option>
                <option>Basic Auth</option>
                <option>API Key (Header)</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Auth Token / Key</label>
              <input type="password" defaultValue="************************" style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sync Frequency</label>
              <select style={{ padding: '10px 12px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}>
                <option>Hourly</option>
                <option>Every 6 Hours</option>
                <option>Daily (Midnight UTC)</option>
              </select>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={14} /> Last sync: 2026-05-19 03:00 UTC (Success)
            </span>
            <button style={{ padding: '10px 20px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
              Test Connection & Save
            </button>
          </div>
        </div>
      )}

      {/* API CONTENT */}
      {activeTab === 'api' && (
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Adesio Push API Credentials</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Use these credentials to push real-time inventory updates directly into the Adesio Multi-Cloud infrastructure.</p>
          </div>
          
          <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Production API Key</span>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <RefreshCw size={14} /> Rotate Key
              </button>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="password" 
                readOnly 
                value="ad_prod_9f8a8b7c6d5e4f3g2h1i0j_dummy_key_do_not_use" 
                style={{ flex: 1, padding: '12px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'monospace' }} 
              />
              <button style={{ padding: '0 16px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Copy size={16} /> Copy
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={14} /> Keep this key secret. It provides write access to your global catalog.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
