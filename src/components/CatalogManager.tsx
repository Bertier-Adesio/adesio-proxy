import React, { useState } from 'react';
import { Search, Filter, Edit2, Zap, Save, Download, MoreHorizontal } from 'lucide-react';

const STATIC_DATA = [
  { id: 1, mpn: 'CRCW040210K0FKED', desc: 'Resistor SMD 10K Ohm 1% 1/16W 0402', package: '0402', rohs: true, lifecycle: 'Active' },
  { id: 2, mpn: 'C0603C104K5RACTU', desc: 'Capacitor Ceramic 0.1uF 50V X7R 0603', package: '0603', rohs: true, lifecycle: 'Active' },
  { id: 3, mpn: 'STM32F103C8T6', desc: 'MCU 32-bit ARM Cortex-M3 64KB Flash', package: 'LQFP-48', rohs: true, lifecycle: 'Active' },
  { id: 4, mpn: 'LM317T', desc: 'Linear Voltage Regulator 1.2V to 37V', package: 'TO-220', rohs: true, lifecycle: 'NRND' },
];

const DYNAMIC_DATA = [
  { id: 1, mpn: 'CRCW040210K0FKED', stock: 45000, leadTime: 12, moq: 10000, price: 0.002 },
  { id: 2, mpn: 'C0603C104K5RACTU', stock: 120000, leadTime: 8, moq: 4000, price: 0.005 },
  { id: 3, mpn: 'STM32F103C8T6', stock: 450, leadTime: 24, moq: 1, price: 2.45 },
  { id: 4, mpn: 'LM317T', stock: 0, leadTime: 52, moq: 100, price: 0.45 },
];

export default function CatalogManager() {
  const [view, setView] = useState<'static' | 'dynamic'>('dynamic');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Catalog Manager</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Manage your product information and real-time commerce data.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '8px 16px', background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Export
          </button>
          <button style={{ padding: '8px 16px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} /> Bulk Edit
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px' }}>
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px' }}>
          <button 
            onClick={() => setView('static')}
            style={{ padding: '8px 24px', background: view === 'static' ? 'var(--panel-bg)' : 'transparent', color: view === 'static' ? 'var(--text-primary)' : 'var(--text-secondary)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }}
          >
            Static Data
          </button>
          <button 
            onClick={() => setView('dynamic')}
            style={{ padding: '8px 24px', background: view === 'dynamic' ? 'var(--panel-bg)' : 'transparent', color: view === 'dynamic' ? 'var(--accent-primary)' : 'var(--text-secondary)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Zap size={14} /> LiveSync (Dynamic)
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input 
              type="text" 
              placeholder="Search MPN..." 
              style={{ padding: '8px 12px 8px 36px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <button style={{ padding: '8px 12px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}>
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="card" style={{ padding: '0', flex: 1, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ position: 'sticky', top: 0, background: 'var(--panel-bg)', zIndex: 10 }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>MPN</th>
              
              {view === 'static' ? (
                <>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>DESCRIPTION</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>PACKAGE</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>ROHS</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>LIFECYCLE</th>
                </>
              ) : (
                <>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>AVAILABLE STOCK</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>LEAD TIME (WEEKS)</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>MOQ</th>
                  <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>PRICE (USD)</th>
                </>
              )}
              
              <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {(view === 'static' ? STATIC_DATA : DYNAMIC_DATA).map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="table-row-hover">
                <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.mpn}</td>
                
                {view === 'static' ? (
                  <>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{(row as any).desc}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{(row as any).package}</td>
                    <td style={{ padding: '16px' }}>
                      {(row as any).rohs ? <span className="badge badge-green">Compliant</span> : <span className="badge badge-red">Non-Compliant</span>}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {(row as any).lifecycle === 'Active' ? <span className="badge badge-green">Active</span> : <span className="badge badge-yellow">{(row as any).lifecycle}</span>}
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', color: (row as any).stock > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                        {(row as any).stock.toLocaleString()}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                        {(row as any).leadTime}
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{(row as any).moq.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>${(row as any).price.toFixed(4)}</td>
                  </>
                )}
                
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
                    {view === 'dynamic' ? <Save size={18} color="var(--accent-primary)" /> : <Edit2 size={18} />}
                  </button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', marginLeft: '8px' }}>
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {view === 'dynamic' && (
          <div style={{ padding: '12px 16px', background: 'rgba(59, 130, 246, 0.05)', color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <Zap size={14} /> LiveSync enabled. Edits to this grid are pushed instantly via your active connectors.
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
      `}} />
    </div>
  );
}
