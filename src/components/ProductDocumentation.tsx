import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ShieldAlert, Users, Wand2, TrendingUp, X, ChevronRight,
  LayoutDashboard, Upload, Database, Settings, BarChart, MessageCircle, Globe, CheckCircle, ArrowRight
} from 'lucide-react';

interface ProductDocumentationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DocContent {
  overview: { title: string; intro: string; keyProps: string[] };
  challenge: { title: string; paragraphs: string[] };
  audience: { title: string; paragraphs: string[] };
  playbook: { title: string; intro?: string; steps: { num: string; title: string; desc: string }[] };
  benefits: { title: string; intro?: string; items: { title: string; desc: string }[] };
  modules: { title: string; list: { title: string; desc: string }[] };
  settings: { title: string; list: { title: string; desc: string }[] };
}

// Fallback hardcoded documentation to ensure app resilience
const FALLBACK_DOC: DocContent = {
  overview: {
    title: 'Adesio Sync: Product Data at Scale',
    intro: 'Adesio Sync acts as an intelligent middleware layer—a single source of truth—that leverages AI to effortlessly ingest messy legacy data, enrich it via automated datasheet parsing, and seamlessly syndicate it to all major global electronics ecosystem partners simultaneously.\n\nAdditionally, the platform includes an interactive Global Network Map visualization of the manufacturer\'s data flowing out into the ecosystem. It visually demonstrates the architecture—showing raw ingestion on one side, AI processing in the middle, and multi-channel syndication (APIs, EDI, WeChat) on the outbound side.',
    keyProps: [
      'Standardize parametric specifications: Unifies mismatched component specs into clean API schemas.',
      'Reduce supplier friction: Minimizes operational overhead when distributing catalogs globally.',
      'Automate datasheet parsing: Leverages AI models to extract parameters directly from legacy PDFs.'
    ]
  },
  challenge: {
    title: '🚨 The Challenge: Data Fragmentation',
    paragraphs: [
      'The electronics and hardware supply chain suffers from extreme data fragmentation. Component manufacturers possess the raw data (specifications, lifecycle status, pricing, inventory), but distributing this data to a myriad of distributors, search engines, and data partners (like Octopart, SiliconExpert, Avnet, DigiKey) is a manual, error-prone, and chaotic process.',
      'Legacy ERP systems output messy .csv, .tsv, or antiquated EDI/XML formats that lack modern parametric standardization, causing friction at every step of the syndication process. Adesio Sync exists to bridge this gap.'
    ]
  },
  audience: {
    title: '🎯 Who Is It For?',
    paragraphs: [
      'Adesio Sync is built for Electronic Component Manufacturers—specifically Supplier Admins, Data Managers, and Catalog Operations Teams.',
      'These are the organizations that actually produce the hardware components and need a unified way to push their catalog updates out to the global market without manually managing dozens of separate partner portals and API schemas.'
    ]
  },
  playbook: {
    title: '⚙️ How It Works: The Manufacturer\'s Playbook',
    intro: 'Manufacturers use Adesio Sync as the central nervous system for their product catalog:',
    steps: [
      { num: '1', title: 'Ingest Legacy Data', desc: 'Upload messy exports directly from legacy ERPs (or connect via API).' },
      { num: '2', title: 'Automated AI Mapping', desc: 'The platform automatically maps raw, inconsistent columns to standardized industry schemas, validating constraints instantly.' },
      { num: '3', title: 'AI Enrichment (Adesio Assist)', desc: 'For parts missing data, users upload (or link to) PDF datasheets. The AI automatically parses tables and text to extract missing parametric specs (Operating Temp, Package Type, RoHS compliance, etc.).' },
      { num: '4', title: 'Global Syndication', desc: 'With a single click, syndicate clean, enriched catalogs to all selected distribution partners via LiveSync APIs.' },
      { num: '5', title: 'Monitor & Track', desc: 'Use the Telemetry dashboard to monitor how often components are being searched and queried globally, billing usage through automated event tracking.' }
    ]
  },
  benefits: {
    title: '🤝 The Multiplier Effect: Benefits for Data Partners',
    intro: 'While the manufacturers are the primary users, downstream data partners (Octopart, SiliconExpert, Avnet, etc.) experience significant ecosystem benefits:',
    items: [
      { title: 'Clean, Standardized Data', desc: 'Partners no longer have to build custom ingestion pipelines for every manufacturer\'s bespoke, broken CSV. They receive guaranteed, perfectly validated JSON payloads matching their exact requirements.' },
      { title: 'Real-Time Accuracy', desc: 'Because Adesio Sync uses LiveSync APIs, partners gain real-time visibility into stock, pricing, and lifecycle changes, eliminating delayed weekly FTP exports.' },
      { title: 'Richer Catalogs', desc: 'With Adesio Assist extracting deep parametric specs from datasheets, partners can provide their end-users with significantly richer search and filtering experiences.' }
    ]
  },
  modules: {
    title: '🧩 Detailed Platform Modules and Features',
    list: [
      { title: '1. Syndication Dashboard', desc: 'A high-level command center showing overall catalog health, API synchronization status, and recent activity feeds. It monitors the completeness of the Master Catalog of Parts (MCP) and alerts operators to synchronization warnings.' },
      { title: '2. AI Ingestion Engine', desc: 'The gateway for legacy data ingestion. It ingests flat files (CSV, TSV, XML) and runs them through the AI Standards Inspector to cross-reference schema rules against each partner\'s requirements. It dynamically auto-maps headers, extracts parametric details from unstructured text, and flags critical validation violations with one-click "AI Smart Resolutions."' },
      { title: '3. Adesio Assist (AI Enrichment)', desc: 'An advanced extraction pipeline that flags parts with missing parametric specifications. Operators can trigger a bulk ingestion run that retrieves datasheet documents, processes them using high-fidelity OCR models, and utilizes LLMs to extract precise technical parameters (e.g., Operating Temperature, Voltage, Package Type) directly into the Master Catalog of Parts.' },
      { title: '4. Catalog Manager', desc: 'The central database view (Master Catalog of Parts). It offers a high-density, Bloomberg-style datagrid for managing thousands of SKUs. Users can filter by lifecycle, stock, or missing data, and make inline edits to ensure data integrity before syndication.' },
      { title: '5. LiveSync Settings', desc: 'The routing matrix for outbound data. Users configure their live API endpoints, legacy SFTP connections, and webhook payloads for their downstream partners. It ensures that when a price changes in Adesio, it is instantly reflected on Octopart or DigiKey.' },
      { title: '6. Telemetry & Billing', desc: 'A dual-sided observability suite. It tracks back-office operations using telemetry hooks (uploads, manual overrides) and monitors external developer API traffic. It visualizes global search demand hotspots and calculates precise monthly usage-based billing.' }
    ]
  },
  settings: {
    title: '⚙️ Platform Settings',
    list: [
      { title: '1. WeChat Integration (Omnichannel)', desc: 'A dedicated module built for the APAC market. It provides secure Identity & Access Management (IAM) and an interactive simulator to preview component catalog rendering in real-time inside WeChat Mini-Programs for localized buyers.' }
    ]
  }
};

export default function ProductDocumentation({ isOpen, onClose }: ProductDocumentationProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'audience' | 'playbook' | 'benefits' | 'modules' | 'settings'>('overview');
  const [doc, setDoc] = useState<DocContent>(FALLBACK_DOC);

  useEffect(() => {
    if (!isOpen) return;

    fetch('/adesio_proxy_description.md')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load markdown asset');
        return res.text();
      })
      .then((text) => {
        // Clean carriage returns
        const cleanText = text.replace(/\r\n/g, '\n');
        
        // Split by major ## headers
        const sections = cleanText.split(/\n##\s+/);
        
        const newDoc: Partial<DocContent> = {};

        // Helper to check for existing emojis/symbols and avoid duplicates
        const ensureEmoji = (title: string, emoji: string) => {
          const trimmed = title.trim();
          if (/^[\p{Emoji}\p{Symbol}]/u.test(trimmed)) {
            return trimmed;
          }
          return emoji + ' ' + trimmed;
        };

        // Parse 0: Overview Header & Value Props
        if (sections[0]) {
          const overviewSec = sections[0];
          // Title
          const titleMatch = overviewSec.match(/#\s+(.*)/);
          const title = titleMatch ? titleMatch[1].trim() : FALLBACK_DOC.overview.title;
          
          // Remove title line, separators, and lists
          let intro = overviewSec.replace(/#\s+.*/, '').replace(/---/g, '').trim();
          
          // Extract bullet points
          const keyProps: string[] = [];
          const lines = intro.split('\n');
          const remainingLines: string[] = [];
          
          lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
              keyProps.push(trimmed.substring(1).replace(/\*\*/g, '').trim());
            } else if (trimmed.length > 0) {
              remainingLines.push(trimmed);
            }
          });

          newDoc.overview = {
            title,
            intro: remainingLines.join('\n').trim(),
            keyProps: keyProps.length > 0 ? keyProps : FALLBACK_DOC.overview.keyProps
          };
        }

        // Loop sections to match headers
        sections.slice(1).forEach((sec) => {
          const lines = sec.split('\n');
          const rawTitle = lines[0].trim();
          const body = lines.slice(1).join('\n').replace(/---/g, '').trim();

          if (rawTitle.includes('Challenge')) {
            const paragraphs = body.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
            newDoc.challenge = { title: ensureEmoji(rawTitle, '🚨'), paragraphs };
          } 
          else if (rawTitle.includes('Who')) {
            const paragraphs = body.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
            newDoc.audience = { title: ensureEmoji(rawTitle, '🎯'), paragraphs };
          } 
          else if (rawTitle.includes('How')) {
            const firstStepIndex = body.search(/^\d+\./m);
            let intro = '';
            let listPart = body;
            if (firstStepIndex !== -1) {
              intro = body.substring(0, firstStepIndex).trim();
              listPart = body.substring(firstStepIndex);
            }

            const steps: { num: string; title: string; desc: string }[] = [];
            const stepLines = listPart.split('\n').map(l => l.trim()).filter(l => /^\d+\./.test(l));
            
            stepLines.forEach(line => {
              const match = line.match(/^(\d+)\.\s+\*\*(.*?)\*\*:\s*(.*)/);
              if (match) {
                steps.push({ num: match[1], title: match[2].trim(), desc: match[3].trim() });
              } else {
                steps.push({ num: String(steps.length + 1), title: 'Step', desc: line });
              }
            });

            newDoc.playbook = { 
              title: ensureEmoji(rawTitle, '⚙️'),
              intro: intro || undefined,
              steps: steps.length > 0 ? steps : FALLBACK_DOC.playbook.steps 
            };
          } 
          else if (rawTitle.includes('Multiplier') || rawTitle.includes('Benefits')) {
            const firstBulletIndex = body.search(/^[-*]\s+/m);
            let intro = '';
            let listPart = body;
            if (firstBulletIndex !== -1) {
              intro = body.substring(0, firstBulletIndex).trim();
              listPart = body.substring(firstBulletIndex);
            }

            const items: { title: string; desc: string }[] = [];
            const itemLines = listPart.split('\n').map(l => l.trim()).filter(l => l.startsWith('-') || l.startsWith('*'));
            
            itemLines.forEach(line => {
              const match = line.match(/^[-*]\s+\*\*(.*?)\*\*:\s*(.*)/);
              if (match) {
                items.push({ title: match[1].trim(), desc: match[2].trim() });
              }
            });

            newDoc.benefits = { 
              title: ensureEmoji(rawTitle, '🤝'),
              intro: intro || undefined,
              items: items.length > 0 ? items : FALLBACK_DOC.benefits.items 
            };
          } 
          else if (rawTitle.includes('Functions') || rawTitle.includes('Modules')) {
            const list: { title: string; desc: string }[] = [];
            // Split by ### headers
            const modulesRaw = body.split(/\n?###\s+/);
            modulesRaw.forEach(mRaw => {
              const mLines = mRaw.split('\n');
              const mTitle = mLines[0].trim();
              const mDesc = mLines.slice(1).join('\n').trim();
              if (mTitle.length > 0) {
                list.push({ title: mTitle, desc: mDesc });
              }
            });

            newDoc.modules = { 
              title: ensureEmoji(rawTitle, '🧩'), 
              list: list.length > 0 ? list : FALLBACK_DOC.modules.list 
            };
          }
          else if (rawTitle.includes('Settings')) {
            const list: { title: string; desc: string }[] = [];
            // Split by ### headers
            const settingsRaw = body.split(/\n?###\s+/);
            settingsRaw.forEach(sRaw => {
              const sLines = sRaw.split('\n');
              const sTitle = sLines[0].trim();
              const sDesc = sLines.slice(1).join('\n').trim();
              if (sTitle.length > 0) {
                list.push({ title: sTitle, desc: sDesc });
              }
            });

            newDoc.settings = { 
              title: ensureEmoji(rawTitle, '⚙️'), 
              list: list.length > 0 ? list : FALLBACK_DOC.settings.list 
            };
          }
        });

        // Set state securely
        setDoc({
          overview: newDoc.overview || FALLBACK_DOC.overview,
          challenge: newDoc.challenge || FALLBACK_DOC.challenge,
          audience: newDoc.audience || FALLBACK_DOC.audience,
          playbook: newDoc.playbook || FALLBACK_DOC.playbook,
          benefits: newDoc.benefits || FALLBACK_DOC.benefits,
          modules: newDoc.modules || FALLBACK_DOC.modules,
          settings: newDoc.settings || FALLBACK_DOC.settings
        });
      })
      .catch((err) => {
        console.warn('Documentation fetch failed, using localized copy: ', err);
        setDoc(FALLBACK_DOC);
      });
  }, [isOpen]);

  const tabs = [
    { id: 'overview', label: 'Hub Overview', icon: <FileText size={16} /> },
    { id: 'challenge', label: 'The Challenge', icon: <ShieldAlert size={16} /> },
    { id: 'audience', label: 'Who is it for?', icon: <Users size={16} /> },
    { id: 'playbook', label: 'How It Works', icon: <Wand2 size={16} /> },
    { id: 'benefits', label: 'Ecosystem Benefits', icon: <TrendingUp size={16} /> },
    { id: 'modules', label: 'Platform Modules', icon: <LayoutDashboard size={16} /> },
    { id: 'settings', label: 'Platform Settings', icon: <Settings size={16} /> },
  ] as const;

  // Helper to map dynamic module titles to correct Lucide icons
  const getModuleIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('dashboard')) return { icon: <LayoutDashboard size={20} color="var(--accent-primary)" />, color: 'var(--accent-primary)' };
    if (lower.includes('ingestion')) return { icon: <Upload size={20} color="#3b82f6" />, color: '#3b82f6' };
    if (lower.includes('assist') || lower.includes('enrichment')) return { icon: <Wand2 size={20} color="#a855f7" />, color: '#a855f7' };
    if (lower.includes('catalog') || lower.includes('manager')) return { icon: <Database size={20} color="#10b981" />, color: '#10b981' };
    if (lower.includes('sync') || lower.includes('setting') || lower.includes('integration')) {
      if (lower.includes('wechat')) return { icon: <MessageCircle size={20} color="#22c55e" />, color: '#22c55e' };
      return { icon: <Settings size={20} color="#f59e0b" />, color: '#f59e0b' };
    }
    if (lower.includes('telemetry') || lower.includes('billing') || lower.includes('analytics')) return { icon: <BarChart size={20} color="#ec4899" />, color: '#ec4899' };
    if (lower.includes('map') || lower.includes('network') || lower.includes('global')) return { icon: <Globe size={20} color="#06b6d4" />, color: '#06b6d4' };
    return { icon: <FileText size={20} color="#94a3b8" />, color: '#94a3b8' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 5, 8, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          {/* Backdrop Closer */}
          <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1100px',
              height: '80vh',
              maxHeight: '900px',
              background: 'rgba(16, 16, 24, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 10000
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 32px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(20, 20, 30, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
                    Adesio Sync
                  </h1>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                    Product Architecture & Platform Documentation
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body (Sidebar + Content) */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Sidebar */}
              <div style={{
                width: '240px',
                borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(12, 12, 18, 0.4)',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                overflowY: 'auto'
              }}>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)' : 'transparent',
                        borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                        color: isActive ? 'white' : 'var(--text-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 500,
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                        {tab.icon}
                      </span>
                      <span style={{ flex: 1 }}>{tab.label}</span>
                      <ChevronRight size={14} style={{ opacity: isActive ? 0.7 : 0, transition: 'all 0.2s' }} />
                    </button>
                  );
                })}
              </div>

              {/* Content Panel */}
              <div className="custom-scrollbar" style={{
                flex: 1,
                padding: '32px 40px',
                overflowY: 'auto',
                background: 'rgba(10, 10, 15, 0.2)'
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    {/* HUB OVERVIEW */}
                    {activeTab === 'overview' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <span style={{
                            padding: '4px 10px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: '20px',
                            color: 'var(--accent-primary)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}>
                            Architecture Overview
                          </span>
                          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                            {doc.overview.title}
                          </h2>
                          <div style={{ width: '40px', height: '3px', background: 'var(--accent-primary)', borderRadius: '2px' }} />
                        </div>
                        
                        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 400 }}>
                          {doc.overview.intro}
                        </p>

                        <div style={{ 
                          marginTop: '16px',
                          padding: '20px',
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.04) 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px'
                        }}>
                          <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px 0' }}>
                            <CheckCircle size={16} color="var(--accent-primary)" /> Key Value Propositions
                          </h4>
                          <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {doc.overview.keyProps.map((prop, idx) => (
                              <li key={idx}>{prop}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* THE CHALLENGE */}
                    {activeTab === 'challenge' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <span style={{
                            padding: '4px 10px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '20px',
                            color: '#ef4444',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}>
                            Problem Statement
                          </span>
                          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                            {doc.challenge.title}
                          </h2>
                          <div style={{ width: '40px', height: '3px', background: '#ef4444', borderRadius: '2px' }} />
                        </div>

                        {doc.challenge.paragraphs.map((p, idx) => (
                          <p 
                            key={idx} 
                            style={{ 
                              color: idx === 1 ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)', 
                              lineHeight: 1.6, 
                              fontSize: '0.95rem',
                              padding: idx === 1 ? '16px 20px' : '0',
                              background: idx === 1 ? 'rgba(239, 68, 68, 0.05)' : 'none',
                              borderLeft: idx === 1 ? '4px solid #ef4444' : 'none',
                              borderRadius: idx === 1 ? '0 8px 8px 0' : 'none'
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* TARGET AUDIENCE */}
                    {activeTab === 'audience' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <span style={{
                            padding: '4px 10px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '20px',
                            color: '#10b981',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}>
                            Target Persona
                          </span>
                          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                            {doc.audience.title}
                          </h2>
                          <div style={{ width: '40px', height: '3px', background: '#10b981', borderRadius: '2px' }} />
                        </div>

                        {doc.audience.paragraphs.map((p, idx) => (
                          <p key={idx} style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                            {p}
                          </p>
                        ))}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '12px' }}>
                          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                            <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Users size={16} color="#10b981" /> Manufacturers
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                              Organizations that produce raw hardware and need a unified way to distribute dynamic updates.
                            </p>
                          </div>
                          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                            <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Settings size={16} color="#10b981" /> Operations Teams
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                              Data managers who want to avoid manual portal inputs, spreadsheet copying, and schema mismatches.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PLAYBOOK / HOW IT WORKS */}
                    {activeTab === 'playbook' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <span style={{
                            padding: '4px 10px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            borderRadius: '20px',
                            color: '#a855f7',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}>
                            Workflow
                          </span>
                          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                            {doc.playbook.title}
                          </h2>
                          <div style={{ width: '40px', height: '3px', background: '#a855f7', borderRadius: '2px' }} />
                        </div>

                        {doc.playbook.intro && (
                          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
                            {doc.playbook.intro}
                          </p>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
                          {doc.playbook.steps.map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: '#a855f7',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                flexShrink: 0
                              }}>
                                {step.num}
                              </div>
                              <div>
                                <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 600 }}>{step.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ECOSYSTEM BENEFITS */}
                    {activeTab === 'benefits' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <span style={{
                            padding: '4px 10px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            borderRadius: '20px',
                            color: '#f59e0b',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}>
                            Network Multiplier
                          </span>
                          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                            {doc.benefits.title}
                          </h2>
                          <div style={{ width: '40px', height: '3px', background: '#f59e0b', borderRadius: '2px' }} />
                        </div>

                        {doc.benefits.intro ? (
                          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
                            {doc.benefits.intro}
                          </p>
                        ) : (
                          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                            Downstream distribution &amp; specifications partners (Octopart, SiliconExpert, Avnet, DigiKey) receive immense benefits from manufacturer-side standardization:
                          </p>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                          {doc.benefits.items.map((item, idx) => (
                            <div key={idx} style={{
                              padding: '16px 20px',
                              background: 'rgba(255, 255, 255, 0.01)',
                              border: '1px solid rgba(255, 255, 255, 0.04)',
                              borderRadius: '8px'
                            }}>
                              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ArrowRight size={14} color="#f59e0b" /> {item.title}
                              </h4>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PLATFORM MODULES */}
                    {activeTab === 'modules' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <span style={{
                            padding: '4px 10px',
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.2)',
                            borderRadius: '20px',
                            color: '#06b6d4',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}>
                            Platform Architecture
                          </span>
                          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                            {doc.modules.title}
                          </h2>
                          <div style={{ width: '40px', height: '3px', background: '#06b6d4', borderRadius: '2px' }} />
                        </div>

                        <div className="custom-scrollbar" style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(1, 1fr)',
                          gap: '16px',
                          maxHeight: '400px',
                          overflowY: 'auto',
                          paddingRight: '8px',
                          marginTop: '8px'
                        }}>
                          {doc.modules.list.map((mod, idx) => {
                            const iconConfig = getModuleIcon(mod.title);
                            return (
                              <div 
                                key={idx}
                                style={{
                                  padding: '18px',
                                  background: 'rgba(255, 255, 255, 0.02)',
                                  border: '1px solid rgba(255, 255, 255, 0.05)',
                                  borderRadius: '10px',
                                  display: 'flex',
                                  gap: '16px',
                                  alignItems: 'flex-start',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                }}
                              >
                                <div style={{
                                  padding: '10px',
                                  borderRadius: '8px',
                                  background: 'rgba(255, 255, 255, 0.03)',
                                  border: '1px solid rgba(255, 255, 255, 0.05)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  {iconConfig.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <h4 style={{ color: 'white', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{mod.title}</h4>
                                    <span style={{
                                      fontSize: '0.7rem',
                                      padding: '2px 8px',
                                      borderRadius: '12px',
                                      background: 'rgba(16, 185, 129, 0.1)',
                                      color: '#10b981',
                                      fontWeight: 600,
                                      border: '1px solid rgba(16, 185, 129, 0.2)'
                                    }}>
                                      Active
                                    </span>
                                  </div>
                                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                    {mod.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* PLATFORM SETTINGS */}
                    {activeTab === 'settings' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <span style={{
                            padding: '4px 10px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            borderRadius: '20px',
                            color: '#a855f7',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}>
                            Platform Settings
                          </span>
                          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginTop: '12px', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                            {doc.settings.title}
                          </h2>
                          <div style={{ width: '40px', height: '3px', background: '#a855f7', borderRadius: '2px' }} />
                        </div>

                        <div className="custom-scrollbar" style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(1, 1fr)',
                          gap: '16px',
                          maxHeight: '400px',
                          overflowY: 'auto',
                          paddingRight: '8px',
                          marginTop: '8px'
                        }}>
                          {doc.settings.list.map((mod, idx) => {
                            const iconConfig = getModuleIcon(mod.title);
                            return (
                              <div 
                                key={idx}
                                style={{
                                  padding: '18px',
                                  background: 'rgba(255, 255, 255, 0.02)',
                                  border: '1px solid rgba(255, 255, 255, 0.05)',
                                  borderRadius: '10px',
                                  display: 'flex',
                                  gap: '16px',
                                  alignItems: 'flex-start',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                }}
                              >
                                <div style={{
                                  padding: '10px',
                                  borderRadius: '8px',
                                  background: 'rgba(255, 255, 255, 0.03)',
                                  border: '1px solid rgba(255, 255, 255, 0.05)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  {iconConfig.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <h4 style={{ color: 'white', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{mod.title}</h4>
                                    <span style={{
                                      fontSize: '0.7rem',
                                      padding: '2px 8px',
                                      borderRadius: '12px',
                                      background: 'rgba(16, 185, 129, 0.1)',
                                      color: '#10b981',
                                      fontWeight: 600,
                                      border: '1px solid rgba(16, 185, 129, 0.2)'
                                    }}>
                                      Active
                                    </span>
                                  </div>
                                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                    {mod.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(20, 20, 30, 0.4)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              <span>Adesio Sync Enterprise Edition © 2026</span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>Standardized Schemas</span>
                <span>•</span>
                <span>Powered by Adesio MCP</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
