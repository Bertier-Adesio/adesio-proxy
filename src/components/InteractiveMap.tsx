import { useState } from 'react';
import { 
  Upload, LayoutDashboard, Database, Wand2, Settings, BarChart, MessageCircle, 
  Cloud, Shield, Cpu, Network, Server, FileJson, Search, Share2, X
} from 'lucide-react';

// --- DATA MODEL ---
const projectData = {
  modules: [
    {
      id: 'm1',
      title: '1. AI Ingestion Engine',
      icon: <Upload size={24} />,
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      description: 'The frictionless entry point where manufacturers upload their messy data.',
      details: [
        'Drag & Drop Interface: Upload .csv, .tsv, .xlsx, or .xml directly from ERP.',
        'AI Auto-Mapping Interface: LLM analyzes headers/rows and proposes mappings.',
        'Raw Attributes Parsing: Extracts key-value specs from messy stringified JSON columns.',
        'Data Validation: Checks for MVP fields (Manufacturer, MPN, Description).'
      ]
    },
    {
      id: 'm2',
      title: '2. Syndication Dashboard',
      icon: <LayoutDashboard size={24} />,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-300',
      description: 'Gamified homepage visualizing global reach and driving upsells.',
      details: [
        'Network Status Grid: Octopart, SiliconExpert, Avnet, DigiKey, Arrow, MCP.',
        'Status Indicators: Green (Unlocked), Yellow (Pending), Grey/Padlock (Locked).',
        'Actionable Prompts: Click locked partners to reveal missing data (e.g., RoHS for SE).'
      ]
    },
    {
      id: 'm3',
      title: '3. Catalog Manager',
      icon: <Database size={24} />,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      description: 'Central PIM interface dividing static and dynamic data.',
      details: [
        'Static Data View: MPNs, Descriptions, Packaging, RoHS, Datasheet URLs.',
        'Dynamic Data View (LiveSync): Real-time commerce data (Stock, Lead Time, MOQ, Price).',
        'Bulk Editing: Filter and bulk-apply changes rapidly.'
      ]
    },
    {
      id: 'm4',
      title: '4. Adesio Assist (AI)',
      icon: <Wand2 size={24} />,
      color: 'bg-purple-100 text-purple-700 border-purple-300',
      description: 'Premium AI tool to enrich missing catalog data.',
      details: [
        'PDF Datasheet Upload: Drop batch PDFs for parts missing data.',
        'AI Extraction Workflow: LLM reads PDFs, extracts specs (Temp, RoHS, Pin Count), and proposes updates.'
      ]
    },
    {
      id: 'm5',
      title: '5. Integrations & LiveSync',
      icon: <Settings size={24} />,
      color: 'bg-orange-100 text-orange-700 border-orange-300',
      description: 'IT portal for configuring automated outbound updates.',
      details: [
        'Connector Toggles: Enable/disable outbound API feeds.',
        'Automated Nightly Fetch: Configure secure FTP/URL for daily ERP drops.',
        'API Key Generation: Real-time inventory webhooks for enterprise users.'
      ]
    },
    {
      id: 'm6',
      title: '6. Telemetry & Billing',
      icon: <BarChart size={24} />,
      color: 'bg-teal-100 text-teal-700 border-teal-300',
      description: 'Proving ROI and managing usage-based SaaS subscriptions.',
      details: [
        'Dashboard: Sync counts, MCP AI queries, Octopart searches.',
        'Intent Data: Top searched MPNs and geographic heatmaps.',
        'Billing: Base Tier + Connectors + API Volume.',
        'Localized Payments: WeChat Pay routed through Domestic Alibaba Cloud.'
      ]
    },
    {
      id: 'm7',
      title: '7. WeChat Integration',
      icon: <MessageCircle size={24} />,
      color: 'bg-green-100 text-green-700 border-green-300',
      description: 'Frictionless access and compliance for the Chinese market.',
      details: [
        'Mini Program & H5 Portal: Full app access within WeChat.',
        'Dual-Account IAM: Personal WeChat for SSO, WeCom for business activity segregation.',
        'Prerequisites: Domestic Aliyun Account, Chinese business license, local KYC.'
      ]
    }
  ],
  architecture: {
    alibaba: {
      title: 'APAC Front-Office (Alibaba Cloud)',
      subtitle: 'Low Latency & PIPL Compliance',
      color: 'bg-orange-50 border-orange-200',
      nodes: [
        { id: 'a1', name: 'Frontend Hosting', desc: 'Alibaba OSS + CDN for lightning-fast H5/React access in mainland China & Taiwan.', icon: <LayoutDashboard size={20}/> },
        { id: 'a2', name: 'WeChat IAM & API Gateway', desc: 'Native Tencent integrations (WeChat SSO & WeChat Pay) via Domestic Aliyun account.', icon: <Shield size={20}/> },
        { id: 'a3', name: 'Local API & Ingestion', desc: 'Function Compute (Serverless) handling real-time webhooks and local ERP CSV uploads.', icon: <Upload size={20}/> },
        { id: 'a4', name: 'Data Localization Cache', desc: 'TableStore/PolarDB temporarily caches raw data to satisfy local PIPL data compliance.', icon: <Database size={20}/> },
        { id: 'a5', name: 'Monitoring (ARMS)', desc: 'Alibaba ARMS SDK deployed for WeChat Mini-Program telemetry.', icon: <ActivityIcon size={20}/> }
      ]
    },
    gcp: {
      title: 'Global Back-Office (Google Cloud)',
      subtitle: 'AI Brain & Global Syndication',
      color: 'bg-blue-50 border-blue-200',
      nodes: [
        { id: 'g1', name: 'Vertex AI Processing Engine', desc: 'Gemini models process complex schema mapping and extract parameters from datasheets.', icon: <Cpu size={20}/> },
        { id: 'g2', name: 'Global Master Database', desc: 'Firestore (NoSQL catalog data) and Cloud SQL (Global billing/analytics).', icon: <Database size={20}/> },
        { id: 'g3', name: 'Syndication Connectors', desc: 'Cloud Run microservices pushing REST/EDI to Octopart, DigiKey, Avnet, SE.', icon: <Share2 size={20}/> },
        { id: 'g4', name: 'Adesio MCP Server', desc: 'Cloud Run hosted endpoint allowing AI engineering assistants to query component availability.', icon: <Search size={20}/> }
      ]
    },
    bridge: {
      id: 'bridge',
      title: 'Inter-Cloud Bridge',
      desc: 'Secure VPN / Interconnect automatically syncing anonymized component data from APAC to the Global GCP Master without leaking PII.',
      icon: <Network size={32} className="text-gray-500" />
    }
  }
};

function ActivityIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}

export default function InteractiveMap({ compact = false }: { compact?: boolean }) {
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleSelect = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col font-sans rounded-xl overflow-hidden" style={{ color: 'var(--text-primary)', height: '100%', minHeight: 0 }}>
      
      <header className="border-b flex flex-col sm:flex-row justify-between items-center z-10 flex-shrink-0"
        style={{
          borderColor: 'var(--border-color)',
          background: 'var(--panel-bg)',
          padding: compact ? '12px 20px' : '16px 24px'
        }}
      >
        {!compact && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Adesio Sync <span style={{ color: 'var(--accent-primary)' }} className="font-medium">Interactive Map</span></h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Supplier App PRD Architecture Visualization</p>
          </div>
        )}
        {compact && (
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Supplier App PRD Architecture Visualization</p>
          </div>
        )}
        <div className="flex space-x-2 mt-4 sm:mt-0 p-1 rounded-lg border" style={{ background: 'rgba(0,0,0,0.2)', borderColor: 'var(--border-color)' }}>
          <button 
            onClick={() => {setActiveTab('modules'); setSelectedItem(null);}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'modules' ? 'shadow' : 'hover:opacity-80'}`}
            style={{ background: activeTab === 'modules' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'modules' ? 'white' : 'var(--text-secondary)' }}
          >
            Application Modules
          </button>
          <button 
            onClick={() => {setActiveTab('architecture'); setSelectedItem(null);}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'architecture' ? 'shadow' : 'hover:opacity-80'}`}
            style={{ background: activeTab === 'architecture' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'architecture' ? 'white' : 'var(--text-secondary)' }}
          >
            Multi-Cloud Architecture
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row" style={{ minHeight: 0 }}>
        
        {/* INTERACTIVE MAP AREA */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'modules' ? (
            <ModulesMap onSelect={handleSelect} selectedId={selectedItem?.id} isSidebarOpen={selectedItem !== null} />
          ) : (
            <ArchitectureMap onSelect={handleSelect} selectedId={selectedItem?.id} isSidebarOpen={selectedItem !== null} />
          )}
        </div>

        {/* DETAILS SIDEBAR */}
        <div className={`w-full lg:w-80 border-l overflow-y-auto transition-transform duration-300 ${selectedItem ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:hidden'}`} style={{ background: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
          {selectedItem ? (
            <div className="p-6 relative">
              <button 
                onClick={() => setSelectedItem(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
                className="hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <div className="flex items-center space-x-3 mb-4 pr-6">
                <div className={`p-3 rounded-lg ${selectedItem.color || ''}`} style={{ background: 'rgba(255,255,255,0.05)' }}>
                  {selectedItem.icon || <FileJson size={24} />}
                </div>
                <h2 className="text-xl font-bold leading-tight">{selectedItem.title || selectedItem.name}</h2>
              </div>
              <p className="text-sm leading-relaxed mb-6 pb-6 border-b" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
                {selectedItem.description || selectedItem.desc}
              </p>
              
              {selectedItem.details && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>Key Features / Specifications</h3>
                  <ul className="space-y-3">
                    {selectedItem.details.map((detail: any, idx: number) => {
                      const split = detail.split(':');
                      return (
                        <li key={idx} className="text-sm flex items-start p-3 rounded-md border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border-color)' }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ background: 'var(--accent-primary)' }}></span>
                          <span>
                            {split.length > 1 ? (
                              <><span className="font-semibold">{split[0]}:</span>{split.slice(1).join(':')}</>
                            ) : detail}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
              <Search size={48} className="mb-4 opacity-50" />
              <p>Select a node on the map to view detailed specifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MODULES VIEW COMPONENT ---
function ModulesMap({ onSelect, selectedId, isSidebarOpen }: { onSelect: any, selectedId: any, isSidebarOpen: boolean }) {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Supplier User Journey</h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>From raw data ingestion to global syndication</p>
      </div>
      
      <div className="relative">
        {/* Connecting Line */}
        {!isSidebarOpen && (
          <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 hidden md:block z-0" style={{ background: 'var(--border-color)' }}></div>
        )}
        
        <div className={`grid grid-cols-1 ${isSidebarOpen ? '' : 'md:grid-cols-2'} gap-6 relative z-10`}>
          {projectData.modules.map((mod, index) => (
            <div 
              key={mod.id} 
              onClick={() => onSelect(mod)}
              className={`
                cursor-pointer p-6 rounded-xl border-2 transition-all duration-200
                ${isSidebarOpen 
                  ? '' 
                  : (index % 2 === 0 ? 'md:col-start-1 md:mr-4' : 'md:col-start-2 md:ml-4 mt-4 md:mt-12')
                }
              `}
              style={{ 
                background: 'var(--panel-bg)', 
                borderColor: selectedId === mod.id ? 'var(--accent-primary)' : 'var(--border-color)',
                transform: selectedId === mod.id ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl border ${mod.color}`} style={{ background: 'rgba(255,255,255,0.05)' }}>
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{mod.title}</h3>
                  <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{mod.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ARCHITECTURE VIEW COMPONENT ---
function ArchitectureMap({ onSelect, selectedId, isSidebarOpen }: { onSelect: any, selectedId: any, isSidebarOpen: boolean }) {
  return (
    <div className="max-w-5xl mx-auto py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Multi-Cloud Geographic Architecture</h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Alibaba Cloud (APAC Front-Office) synced with Google Cloud (Global Back-Office)</p>
      </div>

      <div className={`flex flex-col ${isSidebarOpen ? '' : 'lg:flex-row'} items-stretch justify-center gap-6`}>
        
        {/* ALIBABA CLOUD */}
        <div className="flex-1 rounded-2xl border-2 p-6" style={{ background: 'rgba(0, 194, 168, 0.05)', borderColor: 'rgba(0, 194, 168, 0.2)' }}>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(0, 194, 168, 0.2)' }}>
            <Cloud size={32} style={{ color: 'var(--color-partcheck)' }} />
            <div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--color-partcheck)' }}>{projectData.architecture.alibaba.title}</h3>
              <p className="text-sm opacity-80" style={{ color: 'var(--color-partcheck)' }}>{projectData.architecture.alibaba.subtitle}</p>
            </div>
          </div>
          <div className="space-y-4">
            {projectData.architecture.alibaba.nodes.map(node => (
              <ArchitectureNode 
                key={node.id} 
                node={node} 
                isSelected={selectedId === node.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>

        {/* BRIDGE */}
        <div className={`flex ${isSidebarOpen ? 'flex-col lg:px-4 py-4' : 'lg:flex-col py-8 lg:py-0 lg:px-4'} items-center justify-center`}>
          <div 
            onClick={() => onSelect(projectData.architecture.bridge)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all
            `}
            style={{
              background: 'var(--panel-bg)',
              borderColor: selectedId === projectData.architecture.bridge.id ? 'var(--color-ssm)' : 'var(--border-color)'
            }}
          >
            <div className={`${isSidebarOpen ? 'block' : 'hidden lg:block'} w-1 h-12 mb-2`} style={{ background: 'var(--border-color)' }}></div>
            <div className={`${isSidebarOpen ? 'hidden' : 'block lg:hidden'} h-1 w-12 mr-2`} style={{ background: 'var(--border-color)' }}></div>
            <Network size={32} style={{ color: 'var(--color-ssm)' }} />
            <span className="font-bold mt-2 text-center text-sm" style={{ color: 'var(--color-ssm)' }}>{projectData.architecture.bridge.title}</span>
            <div className={`${isSidebarOpen ? 'hidden' : 'block lg:hidden'} h-1 w-12 ml-2`} style={{ background: 'var(--border-color)' }}></div>
            <div className={`${isSidebarOpen ? 'block' : 'hidden lg:block'} w-1 h-12 mt-2`} style={{ background: 'var(--border-color)' }}></div>
          </div>
        </div>

        {/* GOOGLE CLOUD */}
        <div className="flex-1 rounded-2xl border-2 p-6" style={{ background: 'rgba(108, 92, 231, 0.05)', borderColor: 'rgba(108, 92, 231, 0.2)' }}>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(108, 92, 231, 0.2)' }}>
            <Server size={32} style={{ color: 'var(--color-cpi)' }} />
            <div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--color-cpi)' }}>{projectData.architecture.gcp.title}</h3>
              <p className="text-sm opacity-80" style={{ color: 'var(--color-cpi)' }}>{projectData.architecture.gcp.subtitle}</p>
            </div>
          </div>
          <div className="space-y-4">
            {projectData.architecture.gcp.nodes.map(node => (
              <ArchitectureNode 
                key={node.id} 
                node={node} 
                isSelected={selectedId === node.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function ArchitectureNode({ node, isSelected, onSelect }: { node: any, isSelected: boolean, onSelect: any }) {
  return (
    <div 
      onClick={() => onSelect(node)}
      className={`
        p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center space-x-4
      `}
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      <div className="p-2 rounded-md shadow-sm border flex-shrink-0" style={{ background: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        {node.icon}
      </div>
      <div>
        <h4 className="font-bold text-sm">{node.name}</h4>
        <p className="text-xs mt-1 opacity-80 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{node.desc}</p>
      </div>
    </div>
  );
}
