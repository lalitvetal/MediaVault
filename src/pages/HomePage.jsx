import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const query = useSelector((state) => state.search.query)

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Hero (shown only before first search) ── */}
      {!query && (
        <div style={{ textAlign: 'center', padding: '80px 28px 48px', animation: 'fadeUp 0.6s ease' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '99px',
            background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent-light)', letterSpacing: '0.5px' }}>
              ✦ Powered by Unsplash · Pexels · GIPHY
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '900',
            lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '20px',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #a78bfa 50%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Discover Stunning<br />Media Instantly
          </h1>

          <p style={{
            fontSize: '18px', color: 'var(--text-secondary)',
            maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7,
          }}>
            Search millions of high-quality photos, videos, and GIFs from the world's best creative platforms.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
            {[['3M+', 'Photos'], ['800K+', 'Videos'], ['500M+', 'GIFs']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{num}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Search section ── */}
      <div style={{ padding: query ? '28px 28px 0' : '0 28px', maxWidth: '1440px', margin: '0 auto' }}>
        <SearchBar />
        <div style={{ marginTop: '20px', marginBottom: '28px' }}>
          <Tabs />
        </div>
      </div>

      {/* ── Results ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <ResultGrid />
      </div>
    </div>
  )
}

export default HomePage
