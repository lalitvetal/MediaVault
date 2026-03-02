import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMedia } from '../REDUX/features/searchSlice'

/**
 * Custom hook — encapsulates all media-search logic.
 * Components just call this hook; no async code inside JSX.
 */
const useMediaSearch = () => {
  const dispatch = useDispatch()
  const { query, activeTab, results, loading, error } = useSelector(
    (state) => state.search
  )

  useEffect(() => {
    if (!query.trim()) return
    dispatch(fetchMedia({ query, activeTab }))
  }, [query, activeTab, dispatch])

  return { query, activeTab, results, loading, error }
}

export default useMediaSearch
