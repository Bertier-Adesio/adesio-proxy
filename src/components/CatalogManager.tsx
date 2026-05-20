import { useState } from 'react';
import { Search, Filter, Edit2, Zap, Save, Download, MoreHorizontal, X, ExternalLink, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, CatalogItem } from '../context/AppContext';

export default function CatalogManager() {
  const [view, setView] = useState<'static' | 'dynamic'>('dynamic');
  const { catalog, updateCatalogItem, isLoadingCatalog } = useAppContext();
  
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editValues, setEditValues] = useState<Partial<CatalogItem>>({});
  const [selectedRow, setSelectedRow] = useState<CatalogItem | null>(null);

  const handleEdit = (row: CatalogItem) => {
    setEditingId(row.id);
    setEditValues(row);
  };

  const handleSave = () => {
    if (editingId !== null) {
      updateCatalogItem(editingId, editValues);
      setEditingId(null);
    }
  };

  const inputStyle = { padding: '4px 8px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', width: '100%', minWidth: '60px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', position: 'relative', overflow: 'hidden' }}>
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
      <motion.div 
        className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px' }}
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
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
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        className="card" style={{ padding: '0', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        {isLoadingCatalog ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-secondary)' }}>
            <Loader2 className="animate-spin mb-4" size={32} style={{ color: 'var(--accent-primary)' }} />
            <p className="font-semibold">Simulating database fetch...</p>
            <p className="text-xs opacity-60 mt-1">Fetching records from Master Catalog</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'rgba(20, 22, 30, 0.95)', backdropFilter: 'blur(12px)', zIndex: 10 }}>
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
            {catalog.map((row) => {
              const isEditing = editingId === row.id;
              return (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: isEditing ? 'default' : 'pointer' }} className="table-row-hover" onClick={() => !isEditing && setSelectedRow(row)}>
                <td style={{ padding: '16px', color: 'var(--text-primary)' }} className="font-mono text-[0.95rem] font-semibold tracking-tight">{row.mpn}</td>
                
                {view === 'static' ? (
                  <>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {isEditing ? <input value={editValues.desc || ''} onChange={e => setEditValues({...editValues, desc: e.target.value})} style={inputStyle} /> : row.desc}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                      {isEditing ? <input value={editValues.package || ''} onChange={e => setEditValues({...editValues, package: e.target.value})} style={inputStyle} /> : row.package}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {isEditing ? <input type="checkbox" checked={editValues.rohs || false} onChange={e => setEditValues({...editValues, rohs: e.target.checked})} /> : (row.rohs ? <span className="badge badge-green">Compliant</span> : <span className="badge badge-red">Non-Compliant</span>)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {isEditing ? <select value={editValues.lifecycle || 'Active'} onChange={e => setEditValues({...editValues, lifecycle: e.target.value})} style={inputStyle}><option>Active</option><option>NRND</option><option>Obsolete</option></select> : (row.lifecycle === 'Active' ? <span className="badge badge-green">Active</span> : <span className="badge badge-yellow">{row.lifecycle}</span>)}
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '16px' }}>
                      {isEditing ? <input type="number" value={editValues.stock || 0} onChange={e => setEditValues({...editValues, stock: parseInt(e.target.value) || 0})} style={inputStyle} /> : (
                        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', color: row.stock > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                          {row.stock.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {isEditing ? <input type="number" value={editValues.leadTime || 0} onChange={e => setEditValues({...editValues, leadTime: parseInt(e.target.value) || 0})} style={inputStyle} /> : (
                        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                          {row.leadTime}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                      {isEditing ? <input type="number" value={editValues.moq || 0} onChange={e => setEditValues({...editValues, moq: parseInt(e.target.value) || 0})} style={inputStyle} /> : row.moq.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {isEditing ? <input type="number" step="0.001" value={editValues.price || 0} onChange={e => setEditValues({...editValues, price: parseFloat(e.target.value) || 0})} style={inputStyle} /> : `$${row.price.toFixed(4)}`}
                    </td>
                  </>
                )}
                
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  {isEditing ? (
                    <button onClick={handleSave} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
                      <Save size={18} color="var(--accent-primary)" />
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(row)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
                      <Edit2 size={18} />
                    </button>
                  )}
                  <button onClick={(e) => e.stopPropagation()} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', marginLeft: '8px' }}>
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        )}
        {view === 'dynamic' && (
          <div style={{ padding: '12px 16px', background: 'rgba(59, 130, 246, 0.05)', color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <Zap size={14} /> LiveSync enabled. Edits to this grid are pushed instantly via your active connectors.
          </div>
        )}
      </motion.div>
      
      {/* QUICK VIEW SLIDE-OUT */}
      <AnimatePresence>
        {selectedRow && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '400px', background: 'var(--panel-bg)', borderLeft: '1px solid var(--border-color)', zIndex: 50, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{selectedRow.mpn}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{selectedRow.desc}</p>
              </div>
              <button onClick={() => setSelectedRow(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div className="card" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>Inventory Overview</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Stock</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: selectedRow.stock > 0 ? '#10b981' : '#ef4444' }}>{selectedRow.stock.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lead Time</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{selectedRow.leadTime} weeks</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MOQ</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{selectedRow.moq.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lifecycle</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: selectedRow.lifecycle === 'Active' ? '#10b981' : '#f59e0b' }}>{selectedRow.lifecycle}</div>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>Resources</h4>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(108, 92, 231, 0.1)', color: 'var(--color-cpi)', padding: '10px 16px', borderRadius: '6px', border: '1px solid rgba(108, 92, 231, 0.2)', width: '100%', cursor: 'pointer' }}>
                <FileText size={16} /> View Datasheet (PDF)
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--border-color)', width: '100%', cursor: 'pointer', marginTop: '8px' }}>
                <ExternalLink size={16} /> Octopart Listing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
      `}} />
    </div>
  );
}
