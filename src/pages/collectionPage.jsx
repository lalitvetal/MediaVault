import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

const EmptyIcon = () => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)

const CollectionPage = () => {
  const items = useSelector((state) => state.collection.items)

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <div style={{ padding: '40px 28px 28px', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: '8px' }}>
              ✦ Your Saved Media
            </p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '900', letterSpacing: '-1px', lineHeight: 1 }}>
              My Collection
            </h1>
            {items.length > 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
                {items.length} item{items.length !== 1 ? 's' : ''} saved
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '80px 20px', textAlign: 'center' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <EmptyIcon />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text)' }}>Nothing saved yet</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '320px', lineHeight: 1.6 }}>
            Browse photos, videos, and GIFs — hit the ❤️ on any card to save it here.
          </p>
          <Link to="/" style={{
            marginTop: '8px', padding: '12px 28px', borderRadius: '12px',
            background: 'var(--gradient)', color: '#fff', textDecoration: 'none',
            fontWeight: '600', fontSize: '14px',
            boxShadow: '0 6px 20px rgba(124,58,237,0.4)',
            transition: 'opacity 0.2s',
          }}>
            Start Discovering →
          </Link>
        </div>
      )}

      {/* Grid */}
      {items.length > 0 && (
        <div className="masonry-grid" style={{ padding: '0 28px 60px', maxWidth: '1440px', margin: '0 auto' }}>
          {items.map((item) => (
            <div key={item.id} className="masonry-item">
              <ResultCard item={item} showRemove={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CollectionPage
