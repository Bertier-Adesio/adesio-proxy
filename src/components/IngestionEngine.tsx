import React, { useState } from 'react';
import { UploadCloud, FileType, CheckCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export default function IngestionEngine() {
  const [step, setStep] = useState<'upload' | 'mapping' | 'success'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const { addCatalogItems } = useAppContext();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setTimeout(() => setStep('mapping'), 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Ingestion Engine</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Frictionless entry point for messy catalog data</p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step === 'upload' ? 'var(--accent-primary)' : 'rgba(59, 130, 246, 0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
          <div style={{ width: '40px', height: '2px', background: 'var(--border-color)' }}></div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step === 'mapping' ? 'var(--accent-primary)' : 'rgba(59, 130, 246, 0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
          <div style={{ width: '40px', height: '2px', background: 'var(--border-color)' }}></div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step === 'success' ? 'var(--accent-primary)' : 'rgba(59, 130, 246, 0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
        </div>
      </div>

      {/* UPLOAD STEP */}
      {step === 'upload' && (
        <motion.div 
          className="card"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            padding: '60px 20px', borderStyle: 'dashed', borderWidth: '2px', 
            borderColor: isDragging ? 'var(--accent-primary)' : 'var(--border-color)',
            backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'var(--panel-bg)',
            transition: 'all 0.3s ease'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <UploadCloud size={40} color="var(--accent-primary)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Drag & Drop ERP Export</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center' }}>
            Upload raw .csv, .tsv, .xlsx, or .xml files without modifying the template.<br/>
            Our LLM will automatically parse and map your headers.
          </p>
          <button 
            onClick={() => setStep('mapping')}
            style={{ 
              padding: '12px 24px', background: 'var(--accent-primary)', color: 'white', 
              border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
            <FileType size={18} /> Browse Files
          </button>
        </motion.div>
      )}

      {/* MAPPING STEP */}
      {step === 'mapping' && (
        <motion.div 
          className="card" style={{ padding: '0', overflow: 'hidden' }}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        >
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={24} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>AI Auto-Mapping Review</h3>
            </div>
            <span className="badge badge-yellow">3 Needs Review</span>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>YOUR COLUMN</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>AI SUGGESTION</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>SAMPLE DATA</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>PartNumber_Internal</td>
                <td style={{ padding: '16px 24px' }}><div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>static.MPN</div></td>
                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>"CRCW040210K0FKED"</td>
                <td style={{ padding: '16px 24px' }}><CheckCircle size={20} color="#10b981" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>Qty_Avail</td>
                <td style={{ padding: '16px 24px' }}><div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>dynamic.stock_quantity</div></td>
                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>"45000"</td>
                <td style={{ padding: '16px 24px' }}><CheckCircle size={20} color="#10b981" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(245, 158, 11, 0.05)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>Features_JSON</td>
                <td style={{ padding: '16px 24px' }}><div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Raw Attribute Parsing</div></td>
                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>"{{'Resistance': '10k', 'Tolerance': '1%'}}"</td>
                <td style={{ padding: '16px 24px' }}><button style={{ background: 'transparent', border: '1px solid #f59e0b', color: '#f59e0b', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Review Split</button></td>
              </tr>
              <tr>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>Manufacturer</td>
                <td style={{ padding: '16px 24px' }}><div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px dashed #ef4444', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Missing MVP Field</div></td>
                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>--</td>
                <td style={{ padding: '16px 24px' }}><AlertCircle size={20} color="#ef4444" /></td>
              </tr>
            </tbody>
          </table>
          <div style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={() => {
                setStep('success');
                addCatalogItems([{ mpn: 'AUTO-INGEST-01', desc: 'Mock Ingested Part from ERP', package: '1206', rohs: true, stock: 1500, leadTime: 2, moq: 500, price: 0.12 }]);
              }}
              style={{ 
                padding: '12px 24px', background: 'var(--accent-primary)', color: 'white', 
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
              Confirm & Ingest <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* SUCCESS STEP */}
      {step === 'success' && (
        <motion.div 
          className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <CheckCircle size={40} color="#10b981" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Ingestion Complete</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px' }}>
            1 part successfully processed, mapped, and synced to the Global Master Database. Check the Dashboard metrics.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={() => setStep('upload')}
              style={{ 
                padding: '12px 24px', background: 'transparent', color: 'var(--text-primary)', 
                border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
              }}>
              Upload Another
            </button>
            <button 
              style={{ 
                padding: '12px 24px', background: 'var(--accent-primary)', color: 'white', 
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
              }}>
              View in Catalog Manager
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
