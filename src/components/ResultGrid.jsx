import { useSelector } from 'react-redux'
import useMediaSearch from '../hooks/useMediaSearch'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import ResultCard from './ResultCard'
import SkeletonCard from './SkeletonCard'

const SKELETON_COUNT = 12

/* ── Error state ── */
const ErrorState = ({ message }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '80px 20px', textAlign: 'center' }}>
    <span style={{ fontSize: '48px' }}>⚠️</span>
    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Something went wrong</h2>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '340px' }}>{message}</p>
  </div>
)

/* ── No results state ── */
const EmptyState = ({ query }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '80px 20px', textAlign: 'center' }}>
    <span style={{ fontSize: '48px' }}>🔍</span>
    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>No results for "{query}"</h2>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Try a different keyword or switch tabs</p>
  </div>
)

/* ── Load-more spinner ── */
const LoadMoreSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '32px', gap: '12px', alignItems: 'center' }}>
    <div className="spinner" style={{ width: '28px', height: '28px', borderWidth: '2px' }} />
    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading more…</span>
  </div>
)

/* ── End of results ── */
const EndMessage = () => (
  <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '13px' }}>
    ✦ You've reached the end
  </div>
)

/* ── Main Grid ── */
const ResultGrid = () => {
  // Trigger initial fetch when query / tab changes
  useMediaSearch()

  // Infinite scroll — attach sentinel ref
  const { sentinelRef, loadingMore, hasMore } = useInfiniteScroll()

  const { results, loading, error, query } = useSelector((state) => state.search)

  /* ── Loading (first page) ── */
  if (loading) {
    return (
      <div className="masonry-grid" style={{ padding: '0 28px 40px' }}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    )
  }

  if (error) return <ErrorState message={error} />
  if (query && results.length === 0) return <EmptyState query={query} />
  if (results.length === 0) return null

  return (
    <>
      {/* ── Results masonry ── */}
      <div className="masonry-grid" style={{ padding: '0 28px' }}>
        {results.map((item) => (
          <div key={item.id} className="masonry-item">
            <ResultCard item={item} />
          </div>
        ))}
      </div>

      {/* ── Sentinel div observed by IntersectionObserver ── */}
      <div ref={sentinelRef} style={{ height: '1px', margin: '0 0 8px' }} />

      {/* ── Feedback below the grid ── */}
      {loadingMore && <LoadMoreSpinner />}
      {!loadingMore && !hasMore && results.length > 0 && <EndMessage />}
    </>
  )
}

export default ResultGrid