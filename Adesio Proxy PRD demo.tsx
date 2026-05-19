import React, { useState } from 'react';
import { 
  Upload, LayoutDashboard, Database, Wand2, Settings, BarChart, MessageCircle, 
  Cloud, CloudRain, Shield, Cpu, Network, Server, FileJson, Search, Share2 
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
      title: 'Inter-Cloud Bridge',
      desc: 'Secure VPN / Interconnect automatically syncing anonymized component data from APAC to the Global GCP Master without leaking PII.',
      icon: <Network size={32} className="text-gray-500" />
    }
  }
};

function ActivityIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-slate-800">
      
      {/* HEADER & TABS */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex flex-col sm:flex-row justify-between items-center z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Adesio Proxy <span className="text-indigo-600 font-medium">Interactive Map</span></h1>
          <p className="text-sm text-slate-500">Supplier App PRD Architecture Visualization</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => {setActiveTab('modules'); setSelectedItem(null);}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'modules' ? 'bg-white shadow text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Application Modules
          </button>
          <button 
            onClick={() => {setActiveTab('architecture'); setSelectedItem(null);}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'architecture' ? 'bg-white shadow text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Multi-Cloud Architecture
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        
        {/* INTERACTIVE MAP AREA */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {activeTab === 'modules' ? (
            <ModulesMap onSelect={handleSelect} selectedId={selectedItem?.id} />
          ) : (
            <ArchitectureMap onSelect={handleSelect} selectedId={selectedItem?.id} />
          )}
        </div>

        {/* DETAILS SIDEBAR */}
        <div className={`w-full lg:w-96 bg-white border-l border-gray-200 shadow-xl overflow-y-auto transition-transform duration-300 ${selectedItem ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:hidden'}`}>
          {selectedItem ? (
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${selectedItem.color || 'bg-slate-100 text-slate-700'}`}>
                  {selectedItem.icon || <FileJson size={24} />}
                </div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">{selectedItem.title || selectedItem.name}</h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 pb-6 border-b border-slate-100">
                {selectedItem.description || selectedItem.desc}
              </p>
              
              {selectedItem.details && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Features / Specifications</h3>
                  <ul className="space-y-3">
                    {selectedItem.details.map((detail, idx) => {
                      const split = detail.split(':');
                      return (
                        <li key={idx} className="text-sm text-slate-700 flex items-start bg-slate-50 p-3 rounded-md border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 mr-2 flex-shrink-0"></span>
                          <span>
                            {split.length > 1 ? (
                              <><span className="font-semibold text-slate-900">{split[0]}:</span>{split.slice(1).join(':')}</>
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
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Search size={48} className="mb-4 text-slate-200" />
              <p>Select a node on the map to view detailed specifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MODULES VIEW COMPONENT ---
function ModulesMap({ onSelect, selectedId }) {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-800">Supplier User Journey</h2>
        <p className="text-slate-500 mt-2">From raw data ingestion to global syndication</p>
      </div>
      
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-100 transform -translate-x-1/2 hidden md:block z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {projectData.modules.map((mod, index) => (
            <div 
              key={mod.id} 
              onClick={() => onSelect(mod)}
              className={`
                cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 bg-white
                ${index % 2 === 0 ? 'md:col-start-1 md:mr-8' : 'md:col-start-2 md:ml-8 mt-8 md:mt-16'}
                ${selectedId === mod.id ? 'border-indigo-500 shadow-lg scale-105 ring-4 ring-indigo-50' : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl border ${mod.color}`}>
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg">{mod.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{mod.description}</p>
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
function ArchitectureMap({ onSelect, selectedId }) {
  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Multi-Cloud Geographic Architecture</h2>
        <p className="text-slate-500 mt-2">Alibaba Cloud (APAC Front-Office) synced with Google Cloud (Global Back-Office)</p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6">
        
        {/* ALIBABA CLOUD */}
        <div className={`flex-1 rounded-2xl border-2 p-6 ${projectData.architecture.alibaba.color}`}>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-orange-200">
            <Cloud className="text-orange-500" size={32} />
            <div>
              <h3 className="text-xl font-bold text-orange-900">{projectData.architecture.alibaba.title}</h3>
              <p className="text-sm text-orange-700">{projectData.architecture.alibaba.subtitle}</p>
            </div>
          </div>
          <div className="space-y-4">
            {projectData.architecture.alibaba.nodes.map(node => (
              <ArchitectureNode 
                key={node.id} 
                node={node} 
                isSelected={selectedId === node.id}
                onSelect={onSelect}
                colorClass="bg-white border-orange-200 text-orange-800 hover:border-orange-400 hover:shadow-orange-100"
                selectedClass="border-orange-500 ring-4 ring-orange-100 shadow-md scale-[1.02]"
              />
            ))}
          </div>
        </div>

        {/* BRIDGE */}
        <div className="flex lg:flex-col items-center justify-center py-8 lg:py-0 lg:px-4">
          <div 
            onClick={() => onSelect(projectData.architecture.bridge)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed bg-slate-50 cursor-pointer transition-all
              ${selectedId === projectData.architecture.bridge.id ? 'border-slate-500 shadow-md bg-slate-100' : 'border-slate-300 hover:border-slate-400'}
            `}
          >
            <div className="hidden lg:block w-1 h-12 bg-slate-300 mb-2"></div>
            <div className="block lg:hidden h-1 w-12 bg-slate-300 mr-2"></div>
            {projectData.architecture.bridge.icon}
            <span className="font-bold text-slate-600 mt-2 text-center text-sm">{projectData.architecture.bridge.title}</span>
            <div className="block lg:hidden h-1 w-12 bg-slate-300 ml-2"></div>
            <div className="hidden lg:block w-1 h-12 bg-slate-300 mt-2"></div>
          </div>
        </div>

        {/* GOOGLE CLOUD */}
        <div className={`flex-1 rounded-2xl border-2 p-6 ${projectData.architecture.gcp.color}`}>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-blue-200">
            <Server className="text-blue-500" size={32} />
            <div>
              <h3 className="text-xl font-bold text-blue-900">{projectData.architecture.gcp.title}</h3>
              <p className="text-sm text-blue-700">{projectData.architecture.gcp.subtitle}</p>
            </div>
          </div>
          <div className="space-y-4">
            {projectData.architecture.gcp.nodes.map(node => (
              <ArchitectureNode 
                key={node.id} 
                node={node} 
                isSelected={selectedId === node.id}
                onSelect={onSelect}
                colorClass="bg-white border-blue-200 text-blue-800 hover:border-blue-400 hover:shadow-blue-100"
                selectedClass="border-blue-500 ring-4 ring-blue-100 shadow-md scale-[1.02]"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function ArchitectureNode({ node, isSelected, onSelect, colorClass, selectedClass }) {
  return (
    <div 
      onClick={() => onSelect(node)}
      className={`
        p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center space-x-4
        ${isSelected ? selectedClass : colorClass}
      `}
    >
      <div className="p-2 bg-slate-50 rounded-md shadow-sm border border-slate-100 flex-shrink-0">
        {node.icon}
      </div>
      <div>
        <h4 className="font-bold text-sm">{node.name}</h4>
        <p className="text-xs mt-1 opacity-80 line-clamp-2">{node.desc}</p>
      </div>
    </div>
  );
}