// Pre-defined heights avoid Math.random() causing layout shifts on re-render
const HEIGHTS = [210, 260, 190, 280, 230, 250, 200, 270, 215, 245, 195, 265]

const SkeletonCard = ({ index = 0 }) => {
  const height = HEIGHTS[index % HEIGHTS.length]

  return (
    <div className="masonry-item">
      <div
        className="shimmer"
        style={{ width: '100%', height: `${height}px`, borderRadius: '16px' }}
      />
    </div>
  )
}

export default SkeletonCard
