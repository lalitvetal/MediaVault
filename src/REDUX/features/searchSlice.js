import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhotos, fetchVideos, fetchGif } from '../../api/mediaApi'

const PER_PAGE = 20

// ── Async Thunk (supports pagination) ───────────────────────────────────────
export const fetchMedia = createAsyncThunk(
  'search/fetchMedia',
  async ({ query, activeTab, page = 1 }, { rejectWithValue }) => {
    try {
      let items = []
      let hasMore = false

      if (activeTab === 'photos') {
        const res = await fetchPhotos(query, page)
        items = res.results.map((item) => ({
          id: item.id,
          type: 'photo',
          title: item.alt_description || 'Beautiful Photo',
          thumbnail: item.urls.small,       // ~400px — fast loading
          src: item.urls.full,         // only for download
          url: item.links.html,
          author: item.user.name,
          authorUrl: item.user.links.html,
        }))
        hasMore = page < res.total_pages

      } else if (activeTab === 'videos') {
        const res = await fetchVideos(query, page)
        items = res.videos.map((item) => ({
          id: String(item.id),
          type: 'video',
          title: item.user?.name || 'Pexels Video',
          thumbnail: item.image,             // poster image
          src: item.video_files?.[0]?.link || '',
          url: item.url,
          author: item.user?.name || '',
          authorUrl: item.user?.url || '',
        }))
        hasMore = items.length === PER_PAGE

      } else if (activeTab === 'gif') {
        const res = await fetchGif(query, page)
        items = res.data.map((item) => ({
          id: item.id,
          type: 'gif',
          title: item.title || 'Animated GIF',
          thumbnail: item.images.fixed_height_small.url,  // small preview
          src: item.images.original.url,             // full gif
          url: item.url,
          author: item.username || 'GIPHY',
          authorUrl: '',
        }))
        hasMore = items.length === PER_PAGE
      }

      return { items, hasMore, page }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch. Check your API keys.')
    }
  }
)

// ── Slice ────────────────────────────────────────────────────────────────────
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    activeTab: 'photos',
    results: [],
    loading: false,   // initial page load
    loadingMore: false,   // subsequent pages
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
      state.page = 1
      state.hasMore = true
      state.error = null
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload
      state.results = []
      state.error = null
      state.page = 1
      state.hasMore = true
    },
    clearResults(state) {
      state.results = []
      state.error = null
      state.query = ''
      state.page = 1
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Pending ──────────────────────────────
      .addCase(fetchMedia.pending, (state, action) => {
        const isFirstPage = (action.meta.arg.page ?? 1) === 1
        if (isFirstPage) {
          state.loading = true
          state.results = []
        } else {
          state.loadingMore = true
        }
        state.error = null
      })
      // ── Fulfilled ────────────────────────────
      .addCase(fetchMedia.fulfilled, (state, action) => {
        const { items, hasMore, page } = action.payload
        state.loading = false
        state.loadingMore = false
        state.hasMore = hasMore
        state.page = page

        if (page === 1) {
          state.results = items
        } else {
          // Append — avoid duplicates by id
          const existingIds = new Set(state.results.map((r) => r.id))
          const fresh = items.filter((item) => !existingIds.has(item.id))
          state.results = [...state.results, ...fresh]
        }
      })
      // ── Rejected ─────────────────────────────
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false
        state.loadingMore = false
        state.error = action.payload
      })
  },
})

export const { setQuery, setActiveTab, clearResults } = searchSlice.actions
export default searchSlice.reducer