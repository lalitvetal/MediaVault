import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMedia } from '../REDUX/features/searchSlice'

/**
 * useInfiniteScroll
 * Attaches an IntersectionObserver to a sentinel <div>.
 * When the sentinel enters the viewport, the next page is fetched.
 */
const useInfiniteScroll = () => {
  const dispatch = useDispatch()
  const sentinelRef = useRef(null)

  const { query, activeTab, page, hasMore, loading, loadingMore } =
    useSelector((state) => state.search)

  const loadMore = useCallback(() => {
    if (!query || !hasMore || loading || loadingMore) return
    dispatch(fetchMedia({ query, activeTab, page: page + 1 }))
  }, [query, activeTab, page, hasMore, loading, loadingMore, dispatch])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: '300px' }  // start loading 300px before hitting the bottom
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  return { sentinelRef, loadingMore, hasMore }
}

export default useInfiniteScroll
