import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCollection, removeFromCollection } from '../REDUX/features/collectionSlice'

/* ── SVG Icons ──────────────────────────────────────────────── */
const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const SpinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ animation: 'spin 0.7s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)
const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

/* ── Component ──────────────────────────────────────────────── */
const ResultCard = ({ item, showRemove = false }) => {
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.collection.items)
  const isSaved = savedItems.some((s) => s.id === item.id)

  const [dlState, setDlState] = useState('idle')  // 'idle' | 'loading' | 'done'
  const [hovered, setHovered] = useState(false)    // for video hover-play

  /* ── Save / Remove ─────────────────────────── */
  const toggleSave = (e) => {
    e.stopPropagation()
    isSaved || showRemove
      ? dispatch(removeFromCollection(item.id))
      : dispatch(addToCollection(item))
  }

  /* ── Open original page ─────────────────────── */
  const handleOpen = (e) => {
    e.stopPropagation()
    if (item.url) window.open(item.url, '_blank')
  }

  /* ── Blob download (real file save) ────────────────────────── */
  const handleDownload = async (e) => {
    e.stopPropagation()
    if (dlState === 'loading') return
    setDlState('loading')
    try {
      const response = await fetch(item.src)
      if (!response.ok) throw new Error('Fetch failed')

      const contentType = (response.headers.get('content-type') || '').split(';')[0].trim()
      const MIME_TO_EXT = {
        'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png',
        'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif',
        'video/mp4': 'mp4', 'video/webm': 'webm', 'video/quicktime': 'mov',
      }
      const FALLBACK = { photo: 'jpg', video: 'mp4', gif: 'gif' }
      const ext = MIME_TO_EXT[contentType] ?? FALLBACK[item.type] ?? 'jpg'
      const blob = await response.blob()
      const typedBlob = new Blob([blob], { type: contentType || blob.type })
      const safeName = (item.title || 'mediavault')
        .replace(/[^a-z0-9\s]/gi, '').trim().replace(/\s+/g, '-').toLowerCase().slice(0, 60)

      const objectUrl = URL.createObjectURL(typedBlob)
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = `${safeName}.${ext}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(objectUrl)

      setDlState('done')
      setTimeout(() => setDlState('idle'), 2500)
    } catch {
      window.open(item.src, '_blank')
      setDlState('idle')
    }
  }

  /* ── Media render helper ────────────────────── */
  const renderMedia = () => {
    const imgStyle = { width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }
    const gifStyle = { width: '100%', height: '200px', objectFit: 'cover', display: 'block' }

    if (item.type === 'photo') {
      return (
        // ✅ Use thumbnail (small ~400px) for display — HUGE performance gain
        <img
          src={item.thumbnail}
          alt={item.title}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
      )
    }

    if (item.type === 'video') {
      // Show poster image by default, play video only on hover
      return hovered ? (
        <video
          src={item.src}
          autoPlay loop muted playsInline
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
      )
    }

    if (item.type === 'gif') {
      // Show small thumbnail when idle, full GIF on hover
      return (
        <img
          src={hovered ? item.src : item.thumbnail}
          alt={item.title}
          style={gifStyle}
          loading="lazy"
        />
      )
    }
  }

  return (
    <div
      className="media-card fade-up"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Type badge ── */}
      <span className={`card-badge ${item.type}`}>{item.type}</span>

      {/* ── Media ── */}
      {renderMedia()}

      {/* ── Hover overlay ── */}
      <div className="card-overlay" />

      {/* ── Actions (shown on hover) ── */}
      <div className="card-actions">
        <div style={{ flex: 1, marginRight: '8px', overflow: 'hidden' }}>
          {item.title && (
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.title}
            </p>
          )}
          {item.author && (
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
              {item.author}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          <button className={`icon-btn ${isSaved || showRemove ? 'saved' : ''}`} onClick={toggleSave} title={isSaved ? 'Remove' : 'Save'}>
            <HeartIcon filled={isSaved || showRemove} />
          </button>
          <button
            className="icon-btn"
            onClick={handleDownload}
            title={dlState === 'done' ? 'Downloaded!' : 'Download'}
            style={dlState === 'done' ? { borderColor: '#4ade80' } : {}}
          >
            {dlState === 'loading' && <SpinIcon />}
            {dlState === 'done' && <CheckIcon />}
            {dlState === 'idle' && <DownloadIcon />}
          </button>
          {item.url && (
            <button className="icon-btn" onClick={handleOpen} title="Open original">
              <ExternalIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultCard