import { useState, useEffect } from 'react';
import { 
  User, Shield, Key, CheckCircle, AlertTriangle, Fingerprint, Lock, 
  MapPin, Mail, Calendar, Server, Award, Check
} from 'lucide-react';
import { motion } from 'framer-motion';

interface UserProfileRolesProps {
  initialTab?: 'profile' | 'rbac' | 'security';
}

export default function UserProfileRoles({ initialTab = 'profile' }: UserProfileRolesProps) {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'rbac' | 'security'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const permissions = [
    { name: 'Master Catalog Ingestion', desc: 'Ability to upload and parse raw CSV/TSV datafeeds', allowed: true },
    { name: 'Enrichment Triggering', desc: 'Ability to invoke Adesio Assist AI datasheet extraction', allowed: true },
    { name: 'Syndication Channel Control', desc: 'Modify LiveSync settings and webhook distribution logs', allowed: true },
    { name: 'Real-time Price Overrides', desc: 'Perform manual Bloomberg-style inline spreadsheet edits', allowed: true },
    { name: 'Billing Plan Administration', desc: 'Change subscription tiers or payment methods', allowed: false },
    { name: 'Audit Log Erasure', desc: 'Delete compliance security trails or event logs', allowed: false }
  ];

  const bestPractices = [
    { title: 'HMAC Webhook Signatures', desc: 'Active verification with secure SHA256 hashes.', status: 'secure', icon: <Key size={18} /> },
    { title: 'WeChat Mini-Program IAM', desc: 'Role limits bound directly to WeChat Work identities.', status: 'secure', icon: <Fingerprint size={18} /> },
    { title: 'GCP/Alibaba Multi-Cloud Sync', desc: 'Active dual-active redundancy with automated failover.', status: 'secure', icon: <Server size={18} /> },
    { title: 'Access Token Rotation', desc: 'API keys expire and rotate automatically every 24 hours.', status: 'warning', icon: <Lock size={18} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* HEADER TITLE */}
      <div>
        <span style={{
          padding: '4px 10px',
          background: 'rgba(108, 92, 231, 0.1)',
          border: '1px solid rgba(108, 92, 231, 0.2)',
          borderRadius: '20px',
          color: 'var(--accent-primary)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Access & Settings
        </span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          User Details & Role Management
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Manage your supplier profile credentials, role-based access permissions, and verify integration security best practices.
        </p>
      </div>

      {/* TABS NAVIGATION */}
      <div style={{
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '2px'
      }}>
        {[
          { id: 'profile', label: 'User Profile', icon: <User size={16} /> },
          { id: 'rbac', label: 'Role-Based Permissions (RBAC)', icon: <Shield size={16} /> },
          { id: 'security', label: 'Security Best Practices', icon: <Lock size={16} /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                background: isActive ? 'rgba(255,255,255,0.02)' : 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANEL */}
      <div style={{ minHeight: '400px' }}>
        {/* Tab 1: Profile Details */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            {/* Left Card - User Badge */}
            <motion.div 
              className="card"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 24px' }}
            >
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-cpi), var(--color-partcheck))',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(108, 92, 231, 0.4)',
                marginBottom: '20px'
              }}>
                A
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', margin: '0 0 6px 0' }}>Supplier Admin</h3>
              <span className="badge badge-cpi" style={{ marginBottom: '24px' }}>Alibaba Front-Office</span>
              
              <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                  <Mail size={16} color="var(--accent-primary)" />
                  <span>admin@alibaba.adesio.com</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                  <MapPin size={16} color="var(--accent-primary)" />
                  <span>APAC (Alibaba Cloud Gateway)</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                  <Calendar size={16} color="var(--accent-primary)" />
                  <span>Joined Oct 2025</span>
                </div>
              </div>
            </motion.div>

            {/* Right Card - Detailed Account Settings */}
            <motion.div 
              className="card"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ padding: '32px' }}
            >
              <h4 style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                Catalog Operator Metadata
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>First Name</label>
                  <input type="text" readOnly value="Supplier" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Last Name</label>
                  <input type="text" readOnly value="Admin" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Assigned API Authority Scope</label>
                  <div style={{ background: 'rgba(108, 92, 231, 0.05)', border: '1px solid rgba(108, 92, 231, 0.15)', borderRadius: '8px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Award size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h5 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 600 }}>Alibaba APAC Supplier Lead</h5>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>
                        Authorized to push catalog synchronization streams directly into global Octopart feed channels, edit local master component parameters, and preview WeChat program simulators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tab 2: Role-Based Permissions (RBAC) */}
        {activeTab === 'rbac' && (
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
              <div>
                <h4 style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>RBAC Authority Checklist</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Verify which parameters and actions are authorized for your role scope.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '6px 12px', borderRadius: '20px', color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
                <CheckCircle size={14} /> Active Security Clearance
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {permissions.map((perm, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    padding: '6px',
                    borderRadius: '50%',
                    background: perm.allowed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: perm.allowed ? '#10b981' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {perm.allowed ? <Check size={14} /> : <AlertTriangle size={14} />}
                  </div>
                  <div>
                    <h5 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {perm.name}
                      <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '10px', background: perm.allowed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: perm.allowed ? '#10b981' : '#ef4444', border: '1px solid transparent' }}>
                        {perm.allowed ? 'Granted' : 'Restricted'}
                      </span>
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Security Best Practices */}
        {activeTab === 'security' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Best Practices Cards */}
            <motion.div 
              className="card"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ padding: '32px' }}
            >
              <h4 style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                Active Security Framework Indicators
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {bestPractices.map((bp, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '16px 20px',
                      background: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{
                        padding: '10px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {bp.icon}
                      </div>
                      <div>
                        <h5 style={{ color: 'white', margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 600 }}>{bp.title}</h5>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>{bp.desc}</p>
                      </div>
                    </div>
                    <span className={`badge ${bp.status === 'secure' ? 'badge-green' : 'badge-yellow'}`}>
                      {bp.status === 'secure' ? 'Fully Compliant' : 'Warning: Action Needed'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Verification Checklist */}
            <motion.div 
              className="card"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} color="var(--accent-primary)" /> Security Enforcement
              </h4>
              
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>WeChat 2FA Verification</span>
                  <button 
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    style={{
                      background: mfaEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      border: mfaEnabled ? '1px solid #10b981' : '1px solid #ef4444',
                      borderRadius: '16px',
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: mfaEnabled ? '#10b981' : '#ef4444',
                      cursor: 'pointer'
                    }}
                  >
                    {mfaEnabled ? 'Active' : 'Disabled'}
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>SSL Transmission Force</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>HTTPS Only</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>IP Whitelist Access</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>Restricted</span>
                </div>
              </div>

              <div style={{ padding: '14px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.75rem', lineHeight: 1.4, color: '#f59e0b' }}>
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Best Practice Audit Note:</strong> Ensure your API LiveSync routes enforce HTTPS certificates. Avoid distributing plain Secret Keys in raw codebases.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
