import { createSlice } from '@reduxjs/toolkit'

// ── localStorage persistence helpers ────────────────────────────────────────
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem('mediavault_collection')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveToStorage = (items) => {
  try {
    localStorage.setItem('mediavault_collection', JSON.stringify(items))
  } catch { /* silent */ }
}

// ── Slice ────────────────────────────────────────────────────────────────────
const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    items: loadFromStorage(), // hydrate from localStorage on startup
  },
  reducers: {
    addToCollection(state, action) {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        saveToStorage(state.items)
      }
    },
    removeFromCollection(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveToStorage(state.items)
    },
  },
})

export const { addToCollection, removeFromCollection } = collectionSlice.actions
export default collectionSlice.reducer
