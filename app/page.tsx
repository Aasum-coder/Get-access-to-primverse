'use client'

import { useState } from 'react'

const TABS = ['Metrics', 'My profile', 'Leads', 'IB Resources', 'Beta Test'] as const
type Tab = (typeof TABS)[number]

/* ---------- sample data (replace with Supabase fetch) ---------- */
const sampleLeads = [
  { id: 1, name: 'John Doe', email: 'john@example.com', uid: 'PU-10234', status: 'Approved', date: '2026-03-10' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', uid: 'PU-10421', status: 'Pending', date: '2026-03-12' },
  { id: 3, name: 'Ali Hassan', email: 'ali@example.com', uid: 'PU-10587', status: 'Approved', date: '2026-03-14' },
]

/* ================================================================
   SYSTM8 — IB Dashboard
   ================================================================ */
export default function SYSTM8Page() {
  const [activeTab, setActiveTab] = useState<Tab>('Metrics')

  return (
    <div style={{ minHeight: '100vh', background: '#0A0806' }}>
      {/* ---- Header ---- */}
      <header style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        background: 'rgba(17,16,9,0.95)',
        backdropFilter: 'blur(12px)',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "'Cormorant Garamond', serif",
          background: 'linear-gradient(105deg, #7A5C1E 0%, #C9A84C 18%, #F5DFA0 32%, #E8C97E 42%, #C9A84C 52%, #8B6B28 62%, #F0D080 72%, #C9A84C 82%, #7A5C1E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          SYSTM8
        </h1>
      </header>

      {/* ---- Tab bar (scrollable on mobile) ---- */}
      <nav style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        background: 'rgba(17,16,9,0.8)',
        overflowX: 'auto',
        scrollbarWidth: 'none',          /* Firefox */
        msOverflowStyle: 'none',         /* IE/Edge */
      }}
        className="hide-scrollbar"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 'none',
              padding: '12px 18px',
              fontSize: 13,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? '#C9A84C' : '#9A8E6E',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #C9A84C' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* ---- Scrollbar-hide style ---- */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* ---- Tab content ---- */}
      <main style={{ padding: '24px 20px', maxWidth: 800, margin: '0 auto' }}>
        {activeTab === 'Metrics' && <MetricsTab />}
        {activeTab === 'My profile' && <ProfileTab />}
        {activeTab === 'Leads' && <LeadsTab />}
        {activeTab === 'IB Resources' && <ResourcesTab />}
        {activeTab === 'Beta Test' && <BetaTestTab />}
      </main>
    </div>
  )
}

/* ================================================================
   Tab: Metrics
   ================================================================ */
function MetricsTab() {
  const stats = [
    { label: 'Total Leads', value: '47' },
    { label: 'Approved', value: '32' },
    { label: 'Pending', value: '15' },
    { label: 'Commission', value: '$1,240' },
  ]
  return (
    <div>
      <h2 style={sectionTitle}>Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {stats.map((s) => (
          <div key={s.label} style={card}>
            <div style={{ fontSize: 11, color: '#9A8E6E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</div>
            <div style={{
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "'Cormorant Garamond', serif",
              background: 'linear-gradient(105deg, #C9A84C, #F5DFA0, #C9A84C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================================================================
   Tab: My profile
   ================================================================ */
function ProfileTab() {
  return (
    <div>
      <h2 style={sectionTitle}>My IB Profile</h2>
      <div style={card}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            ['Name', 'Richard Aasum'],
            ['Email', 'richard@1move.no'],
            ['IB Code', 'IB-1MOVE-001'],
            ['Broker', 'PuPrime'],
            ['Status', 'Active'],
          ].map(([label, value]) => (
            <div key={label}>
              <div style={{ fontSize: 11, color: '#9A8E6E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 15, color: '#F0E8D0' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   Tab: Leads  (form removed — table only)
   ================================================================ */
function LeadsTab() {
  return (
    <div>
      <h2 style={sectionTitle}>Your Leads</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Name', 'Email', 'UID', 'Status', 'Date'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  fontSize: 11,
                  color: '#9A8E6E',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid rgba(201,168,76,0.15)',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleLeads.map((lead) => (
              <tr key={lead.id}>
                <td style={cell}>{lead.name}</td>
                <td style={cell}>{lead.email}</td>
                <td style={cell}>{lead.uid}</td>
                <td style={cell}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    background: lead.status === 'Approved' ? 'rgba(76,175,80,0.15)' : 'rgba(201,168,76,0.15)',
                    color: lead.status === 'Approved' ? '#4CAF50' : '#C9A84C',
                  }}>{lead.status}</span>
                </td>
                <td style={cell}>{lead.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ================================================================
   Tab: IB Resources
   ================================================================ */
function ResourcesTab() {
  const resources = [
    { title: 'IB Presentation Deck', desc: 'Canva deck for pitching PrimeVerse' },
    { title: 'Commission Structure', desc: 'Detailed breakdown of IB commissions' },
    { title: 'Brand Assets', desc: 'Logos, banners and marketing materials' },
    { title: 'Onboarding Guide', desc: 'Step-by-step guide for new IBs' },
  ]
  return (
    <div>
      <h2 style={sectionTitle}>IB Resources</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {resources.map((r) => (
          <div key={r.title} style={{ ...card, cursor: 'pointer' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F0E8D0', marginBottom: 4 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: '#9A8E6E' }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================================================================
   Tab: Beta Test
   ================================================================ */
function BetaTestTab() {
  return (
    <div>
      <h2 style={sectionTitle}>Beta Test</h2>
      <div style={card}>
        <p style={{ fontSize: 14, color: '#9A8E6E', lineHeight: 1.6, margin: 0 }}>
          New features are being tested here. Stay tuned for upcoming tools and updates to the SYSTM8 platform.
        </p>
      </div>
    </div>
  )
}

/* ---------- shared styles ---------- */
const sectionTitle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  fontFamily: "'Cormorant Garamond', serif",
  color: '#F0E8D0',
  marginTop: 0,
  marginBottom: 16,
}

const card: React.CSSProperties = {
  background: 'rgba(17,16,9,0.7)',
  border: '1px solid rgba(201,168,76,0.12)',
  borderRadius: 10,
  padding: '18px 16px',
}

const cell: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid rgba(201,168,76,0.08)',
  color: '#F0E8D0',
  whiteSpace: 'nowrap',
}
