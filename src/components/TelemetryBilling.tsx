import { TrendingUp, Activity, CreditCard, Download, MapPin, Database, Zap, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';

export default function TelemetryBilling() {
  const { telemetry, isLoadingTelemetry } = useAppContext();

  if (isLoadingTelemetry || !telemetry) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '400px', color: 'var(--text-secondary)' }}>
        <Loader2 className="animate-spin mb-4" size={32} style={{ color: 'var(--accent-primary)' }} />
        <p className="font-semibold">Simulating telemetry aggregation...</p>
        <p className="text-xs opacity-60 mt-1">Fetching live metrics from PostHog & Google Analytics</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Telemetry & Billing</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Track dual-sided event usage and dynamic billing calculated via PostHog & Google Analytics.</p>
        </div>
        <button style={{ padding: '8px 16px', background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={16} /> Export CSV Invoice
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {/* POSTHOG METRIC */}
        <div className="card" style={{ padding: '24px', borderTop: '4px solid #f54e00' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>Internal User Activity</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Tracked via PostHog Events</p>
            </div>
            <Activity size={24} color="#f54e00" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{telemetry.metrics.userActivity.toLocaleString()}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}><TrendingUp size={14} /> +{telemetry.metrics.userActivityGrowth}% vs last month</span>
            <span>Catalog Edits, File Uploads, UI Searches</span>
          </div>
        </div>

        {/* GOOGLE ANALYTICS METRIC */}
        <div className="card" style={{ padding: '24px', borderTop: '4px solid #fbbc04' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>Partner API Syncs</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Tracked via Google Analytics (Measurement Protocol)</p>
            </div>
            <Database size={24} color="#fbbc04" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{telemetry.metrics.apiSyncs.toLocaleString()}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}><TrendingUp size={14} /> +{telemetry.metrics.apiSyncsGrowth}% vs last month</span>
            <span>Octopart, SiliconExpert, Avnet queries</span>
          </div>
        </div>
      </div>

      {/* USAGE CHART */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} color="var(--accent-primary)" /> Dual-Sided Telemetry Volume (30 Days)
        </h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetry.usageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbc04" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#fbbc04" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f54e00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f54e00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="partnerApi" name="GA: Partner API Calls" stroke="#fbbc04" fillOpacity={1} fill="url(#colorApi)" />
              <Area type="monotone" dataKey="userEvents" name="PostHog: User Events" stroke="#f54e00" fillOpacity={1} fill="url(#colorUser)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* INTENT DATA */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--accent-primary)" /> GA Geographic Intent Data
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Top regions querying your active catalog components via partner APIs.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>North America</span>
                <span style={{ fontWeight: 600 }}>{telemetry.geography.na}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${telemetry.geography.na}%`, height: '100%', background: '#3b82f6' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Europe (EMEA)</span>
                <span style={{ fontWeight: 600 }}>{telemetry.geography.emea}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${telemetry.geography.emea}%`, height: '100%', background: '#8b5cf6' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Asia Pacific (APAC)</span>
                <span style={{ fontWeight: 600 }}>{telemetry.geography.apac}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${telemetry.geography.apac}%`, height: '100%', background: '#10b981' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* BILLING */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--accent-primary)" /> Automated Subscription Billing
          </h3>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Platform Base Tier</span>
              <span style={{ fontWeight: 600 }}>$499.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>PostHog: User Events ({Math.round(telemetry.metrics.userActivity / 1000)}k)</span>
              <span style={{ fontWeight: 600 }}>${(telemetry.metrics.userActivity / 1000).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>GA: Partner API Calls ({Math.round(telemetry.metrics.apiSyncs / 1000)}k)</span>
              <span style={{ fontWeight: 600 }}>${(telemetry.metrics.apiSyncs / 1000).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              <span style={{ fontWeight: 600 }}>Total Estimated Invoice</span>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#10b981' }}>${(499 + telemetry.metrics.userActivity / 1000 + telemetry.metrics.apiSyncs / 1000).toFixed(2)}</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, padding: '10px', background: '#07c160', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
              WeChat Pay (Local)
            </button>
            <button style={{ flex: 1, padding: '10px', background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              Update Credit Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
