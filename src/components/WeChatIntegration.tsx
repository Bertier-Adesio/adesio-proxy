import { useState } from 'react';
import { MessageCircle, Shield, Lock, CheckCircle, Fingerprint, Briefcase } from 'lucide-react';

export default function WeChatIntegration() {
  const [authStep, setAuthStep] = useState<'unauthenticated' | 'personal_verified' | 'wecom_bound'>('unauthenticated');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>WeChat Ecosystem Integration (APAC)</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Dual-Account IAM and H5 Portal compliance for the Chinese market.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* LEFT COLUMN: ARCHITECTURE/INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0) 100%)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '8px' }}>
                <Shield size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Data Localization (PIPL)</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Because this operates on a Domestic Alibaba Cloud (Aliyun) account, native WeChat SSO and WeChat Pay are fully supported. Raw data and WeChat identifiers are cached securely in TableStore to satisfy domestic PIPL compliance before non-PII catalog data is synced to GCP.
            </p>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>Dual-Account IAM Flow</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', gap: '16px', opacity: authStep !== 'unauthenticated' ? 0.6 : 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--panel-bg)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                  <div style={{ width: '2px', height: '100%', background: 'var(--border-color)', marginTop: '8px' }}></div>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Personal WeChat (Identity)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Users utilize personal WeChat for rapid SSO and biometric identity verification (OAuth).</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', opacity: authStep === 'wecom_bound' ? 0.6 : 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: authStep === 'personal_verified' ? 'rgba(16, 185, 129, 0.1)' : 'var(--panel-bg)', border: authStep === 'personal_verified' ? '2px solid #10b981' : '2px solid var(--border-color)', color: authStep === 'personal_verified' ? '#10b981' : 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', transition: 'all 0.3s' }}>2</div>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>WeCom Workspace Bind</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Bind professional WeCom account. Business catalog updates and API notifications are strictly routed here, segregating PII.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE MOBILE MOCKUP */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ 
            width: '320px', height: '600px', background: '#000', borderRadius: '40px', 
            border: '8px solid #2e3342', padding: '12px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            {/* Mobile screen background */}
            <div style={{ width: '100%', height: '100%', background: '#f5f5f5', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
              
              {/* Fake Mobile Header */}
              <div style={{ background: '#ededed', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>WeChat</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#333' }}></div>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#333' }}></div>
                </div>
              </div>

              {/* H5 App Content */}
              <div style={{ flex: 1, background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px 20px', background: '#f8f9fa', borderBottom: '1px solid #eaeaea', textAlign: 'center' }}>
                  <MessageCircle size={48} color="#07c160" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Adesio Supplier Portal</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>Mini Program Authorization</p>
                </div>

                <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  
                  {authStep === 'unauthenticated' && (
                    <div style={{ textAlign: 'center' }}>
                      <Fingerprint size={56} color="#07c160" style={{ margin: '0 auto 24px auto', opacity: 0.8 }} />
                      <h4 style={{ color: '#333', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Verify Personal Identity</h4>
                      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '32px' }}>To access the APAC network, you must verify your identity via WeChat SSO.</p>
                      <button 
                        onClick={() => setAuthStep('personal_verified')}
                        style={{ width: '100%', padding: '14px', background: '#07c160', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                      >
                        <MessageCircle size={18} /> Authenticate with WeChat
                      </button>
                    </div>
                  )}

                  {authStep === 'personal_verified' && (
                    <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
                      <CheckCircle size={56} color="#07c160" style={{ margin: '0 auto 24px auto' }} />
                      <h4 style={{ color: '#333', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Identity Verified</h4>
                      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '32px' }}>For enterprise security, bind your professional WeCom account to proceed to the Dashboard.</p>
                      
                      <div style={{ background: '#f8f9fa', border: '1px solid #eaeaea', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                           <Briefcase size={20} color="#333" />
                           <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>Adesio Electronics Ltd.</span>
                         </div>
                         <div style={{ fontSize: '0.8rem', color: '#666', borderTop: '1px solid #eaeaea', paddingTop: '12px' }}>
                           Notifications & API Alerts will route exclusively to this workspace.
                         </div>
                      </div>

                      <button 
                        onClick={() => setAuthStep('wecom_bound')}
                        style={{ width: '100%', padding: '14px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                      >
                        Bind WeCom Workspace
                      </button>
                    </div>
                  )}

                  {authStep === 'wecom_bound' && (
                    <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <Lock size={48} color="#07c160" style={{ margin: '0 auto 16px auto' }} />
                      <h4 style={{ color: '#333', fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Access Granted</h4>
                      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px' }}>Secure session established. Data localization rules applied.</p>
                      <button 
                        onClick={() => setAuthStep('unauthenticated')}
                        style={{ padding: '10px 24px', background: 'transparent', color: '#07c160', border: '1px solid #07c160', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Enter Mobile Dashboard
                      </button>
                    </div>
                  )}
                  <style dangerouslySetInnerHTML={{__html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
