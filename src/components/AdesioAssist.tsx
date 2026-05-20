import React, { useState } from 'react';
import { FileText, UploadCloud, Cpu, CheckCircle, XCircle, Wand2, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AdesioAssist() {
  const [step, setStep] = useState<'upload' | 'processing' | 'review'>('upload');
  const { updateCatalogItem } = useAppContext();
  
  const handleSimulateUpload = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('review');
    }, 1500);
  };

  const handleApproveAll = () => {
    // 3 is STM32F103C8T6, 1 is CRCW040210K0FKED (based on defaultCatalog IDs)
    updateCatalogItem(3, { package: 'LQFP-48-ENRICHED' });
    updateCatalogItem(1, { rohs: true, desc: 'Resistor SMD 10K Ohm 1% 1/16W 0402 [AI ENRICHED]' });
    setStep('upload');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Adesio Assist (AI Enrichment)</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Automatically extract technical parameters from PDF datasheets.</p>
        </div>
      </div>

      {step === 'upload' && (
        <div 
          className="card"
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            padding: '80px 20px', borderStyle: 'dashed', borderWidth: '2px', 
            borderColor: 'var(--border-color)', transition: 'all 0.3s ease'
          }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(167, 139, 250, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <FileText size={40} color="#a78bfa" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Upload PDF Datasheets</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center', maxWidth: '500px' }}>
            Drop a batch of PDF datasheets for parts missing data. The Adesio AI will read the documents, extract missing parameters (Operating Temp, Package, RoHS, Pin Count), and propose updates.
          </p>
          <button 
            onClick={handleSimulateUpload}
            style={{ 
              padding: '12px 24px', background: '#8b5cf6', color: 'white', 
              border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
            <UploadCloud size={18} /> Select PDFs (Simulate)
          </button>
        </div>
      )}

      {step === 'processing' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', padding: '80px 20px' }}>
           <Wand2 size={48} color="#8b5cf6" style={{ marginBottom: '20px', animation: 'pulse 1.5s infinite' }} />
           <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Analyzing Datasheets...</h3>
           <p style={{ color: 'var(--text-secondary)' }}>Gemini models are extracting specs via Vertex AI.</p>
           <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulse {
              0% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.1); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}} />
        </div>
      )}

      {step === 'review' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(139, 92, 246, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Cpu size={24} color="#8b5cf6" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Extracted Data Review</h3>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>3 parts analyzed</span>
            </div>
            
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Item 1 */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <h4 style={{ fontWeight: 600 }}>STM32F103C8T6 <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '8px' }}>Source: stm32f103.pdf (Page 4)</span></h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><CheckCircle size={16} /> Approve</button>
                    <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><XCircle size={16} /> Reject</button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.9rem' }}>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Operating Temp</span> <span style={{ color: '#10b981', fontWeight: 500 }}>-40°C to 85°C</span></div>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Package</span> <span style={{ color: '#10b981', fontWeight: 500 }}>LQFP-48-ENRICHED</span></div>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Pin Count</span> <span style={{ color: '#10b981', fontWeight: 500 }}>48</span></div>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <h4 style={{ fontWeight: 600 }}>CRCW040210K0FKED <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '8px' }}>Source: crcw_thick_film.pdf (Page 2)</span></h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><CheckCircle size={16} /> Approve</button>
                    <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><XCircle size={16} /> Reject</button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.9rem' }}>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Tolerance</span> <span style={{ color: '#10b981', fontWeight: 500 }}>±1%</span></div>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Power Rating</span> <span style={{ color: '#10b981', fontWeight: 500 }}>0.063W (1/16W)</span></div>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>RoHS Status</span> <span style={{ color: '#10b981', fontWeight: 500 }}>Compliant</span></div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleApproveAll}
                style={{ 
                  padding: '10px 20px', background: '#8b5cf6', color: 'white', 
                  border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                Approve All & Update Catalog <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
