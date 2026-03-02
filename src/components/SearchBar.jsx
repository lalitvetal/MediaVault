import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery, clearResults } from '../REDUX/features/searchSlice'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const SearchBar = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    dispatch(setQuery(text.trim()))
    setText('')
  }

  const handleClear = () => {
    setText('')
    dispatch(clearResults())
  }

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: '680px', margin: '0 auto' }}>
      {/* Search icon left */}
      <span style={{
        position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)',
        color: 'var(--text-muted)', pointerEvents: 'none', display: 'flex',
      }}>
        <SearchIcon />
      </span>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="search-input"
        type="text"
        placeholder="Search photos, videos, GIFs…"
        autoComplete="off"
      />

      {/* Clear / Submit */}
      <div style={{
        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        {text && (
          <button type="button" onClick={handleClear} style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
            color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}>
            <ClearIcon />
          </button>
        )}
        <button type="submit" style={{
          padding: '8px 18px', borderRadius: '10px', border: 'none',
          background: 'var(--gradient)', color: '#fff', fontWeight: '600',
          fontSize: '14px', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'opacity 0.2s, transform 0.2s',
          boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
        }}
          onMouseOver={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar