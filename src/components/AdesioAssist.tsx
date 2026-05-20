import { useState, useEffect } from 'react';
import { FileText, Link as LinkIcon, CheckCircle, Wand2, ArrowRight, AlertCircle, Clock, Database } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function AdesioAssist() {
  const [step, setStep] = useState<'queue' | 'processing' | 'review'>('queue');
  const { updateCatalogItem } = useAppContext();
  
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [isLargeBatch, setIsLargeBatch] = useState(false);
  const [eta, setEta] = useState('');

  const autoDetectedUrls = [
    { id: 3, mpn: 'STM32F103C8T6', url: 'https://st.com/resource/en/datasheet/stm32f103c8.pdf', status: 'pending' },
    { id: 1, mpn: 'CRCW040210K0FKED', url: 'https://vishay.com/docs/20035/dcrcw.pdf', status: 'pending' },
    { id: 15, mpn: 'IRFZ44N', url: 'https://infineon.com/dgdl/irfz44n.pdf', status: 'pending' }
  ];

  const handleStartExtraction = (largeBatch = false) => {
    setIsLargeBatch(largeBatch);
    setStep('processing');
    setProgress(0);
    setCurrentStage('Initializing AI Vision models...');
    setEta(largeBatch ? 'Calculating...' : 'ETA: < 10s');
  };

  useEffect(() => {
    if (step === 'processing') {
      const timers: NodeJS.Timeout[] = [];
      
      if (isLargeBatch) {
        timers.push(setTimeout(() => { setProgress(2); setCurrentStage('Parsing CSV and validating 1,452 URLs...'); setEta('ETA: 14m 30s'); }, 800));
        timers.push(setTimeout(() => { setProgress(8); setCurrentStage('Vectorizing batch 1/50 (Documents 1-30)...'); setEta('ETA: 13m 45s'); }, 2500));
        timers.push(setTimeout(() => { setProgress(15); setCurrentStage('Extracting tables and layout data (Batch 1/50)...'); setEta('ETA: 12m 10s'); }, 4000));
        timers.push(setTimeout(() => { setProgress(18); setCurrentStage('Running LLM parametric extraction (Batch 1/50)...'); setEta('ETA: 11m 55s'); }, 5500));
        // Fast forward for demo purposes
        timers.push(setTimeout(() => { setProgress(90); setCurrentStage('Cross-referencing 1,452 parts with Master Catalog...'); setEta('ETA: 10s'); }, 7000));
        timers.push(setTimeout(() => { setProgress(100); setCurrentStage('Extraction Complete.'); setEta('ETA: 0s'); }, 8500));
        timers.push(setTimeout(() => { setStep('review'); }, 9500));
      } else {
        timers.push(setTimeout(() => { setProgress(15); setCurrentStage('Fetching 3 datasheet URLs...'); }, 800));
        timers.push(setTimeout(() => { setProgress(45); setCurrentStage('Running OCR & Layout Analysis...'); }, 2000));
        timers.push(setTimeout(() => { setProgress(70); setCurrentStage('Extracting parametric specs via LLM...'); }, 3500));
        timers.push(setTimeout(() => { setProgress(90); setCurrentStage('Cross-referencing with Master Catalog...'); }, 5000));
        timers.push(setTimeout(() => { setProgress(100); setCurrentStage('Extraction Complete.'); }, 6000));
        timers.push(setTimeout(() => { setStep('review'); }, 6500));
      }
      
      return () => timers.forEach(clearTimeout);
    }
  }, [step, isLargeBatch]);

  const handleApproveAll = () => {
    updateCatalogItem(3, { package: 'LQFP-48' });
    updateCatalogItem(1, { rohs: true, package: '0402' });
    setStep('queue');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Adesio Assist (AI Enrichment)</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Automatically extract technical parameters from PDF datasheets to enrich your Master Catalog.</p>
        </div>
      </div>

      {step === 'queue' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Database size={24} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Extraction Queue</h3>
            </div>
            <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>
              3 URLs Auto-Detected
            </span>
          </div>

          <div style={{ padding: '24px', flex: 1 }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              The Ingestion Engine has identified the following components missing critical parametric data, but containing valid datasheet URLs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {autoDetectedUrls.map((item) => (
                <div key={item.mpn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--panel-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <FileText size={20} color="var(--text-secondary)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.mpn}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <LinkIcon size={12} /> {item.url}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <Clock size={16} /> Pending
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Manual Override (Bulk Upload)</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" placeholder="Paste a datasheet URL here..." style={{ flex: 1, padding: '10px 16px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }} />
                  <button 
                    onClick={() => handleStartExtraction(true)}
                    style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} /> Upload Large CSV
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                <button 
                  onClick={() => handleStartExtraction(false)}
                  style={{ 
                    padding: '12px 32px', background: 'var(--accent-primary)', color: 'white', 
                    border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', height: '42px'
                  }}>
                  <Wand2 size={18} /> Start AI Extraction
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {step === 'processing' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '4px solid transparent', borderTopColor: 'var(--accent-primary)', borderRightColor: 'var(--accent-primary)' }}
            />
            <Wand2 size={40} color="var(--accent-primary)" />
          </div>
          
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>
            {isLargeBatch ? 'Bulk AI Enrichment in Progress' : 'AI Enrichment in Progress'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem' }}>{currentStage}</p>

          <div style={{ width: '100%', maxWidth: '500px', display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--accent-primary)' }}>{progress}%</span>
            <span style={{ color: 'var(--text-secondary)' }}>{eta}</span>
          </div>
          <div style={{ width: '100%', maxWidth: '500px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'var(--accent-primary)' }}
            />
          </div>
          
          {isLargeBatch && (
            <button 
              onClick={() => setStep('queue')}
              style={{ marginTop: '32px', padding: '10px 20px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer' }}>
              Run in Background
            </button>
          )}
        </motion.div>
      )}

      {step === 'review' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <CheckCircle size={32} color="#10b981" />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#10b981' }}>Extraction Complete</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {isLargeBatch 
                    ? 'Successfully extracted parametric data for 1,440 components. 12 components failed.'
                    : 'Successfully extracted parametric data for 2 components. 1 component failed.'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleApproveAll}
              style={{ 
                padding: '12px 24px', background: '#10b981', color: 'white', 
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
              Approve & Update Catalog <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            
            {/* SUCCESS ITEM 1 */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>STM32F103C8T6</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <LinkIcon size={12} /> st.com/resource/en/datasheet/stm32f103c8.pdf
                  </div>
                </div>
                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>Success</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--panel-bg)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Operating Temp</span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>-40°C to 85°C</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--panel-bg)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Package</span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>LQFP-48</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--panel-bg)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Core</span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>ARM Cortex-M3</span>
                </div>
              </div>
            </div>

            {/* SUCCESS ITEM 2 */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>CRCW040210K0FKED</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <LinkIcon size={12} /> vishay.com/docs/20035/dcrcw.pdf
                  </div>
                </div>
                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>Success</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--panel-bg)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tolerance</span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>±1%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--panel-bg)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Power Rating</span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>1/16W</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--panel-bg)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>RoHS Status</span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>Compliant</span>
                </div>
              </div>
            </div>

            {/* ERROR ITEM */}
            <div className="card" style={{ padding: '24px', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>IRFZ44N</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'line-through' }}>
                    <LinkIcon size={12} /> infineon.com/dgdl/irfz44n.pdf
                  </div>
                </div>
                <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>Failed</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#ef4444', marginBottom: '4px' }}>Error 404: Document Not Found</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    The target URL returned a 404 status code. The manufacturer may have moved or removed the datasheet. Please provide an updated URL.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}
