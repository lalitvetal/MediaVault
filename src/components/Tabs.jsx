import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../REDUX/features/searchSlice'

const TABS = [
  { key: 'photos', label: 'Photos', icon: '📷' },
  { key: 'videos', label: 'Videos', icon: '🎬' },
  { key: 'gif', label: 'GIFs', icon: '✨' },
]

const Tabs = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {TABS.map(({ key, label, icon }) => (
        <button
          key={key}
          className={`tab-btn ${activeTab === key ? 'active' : ''}`}
          onClick={() => dispatch(setActiveTab(key))}
        >
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}

export default Tabs