import { useState, useEffect, useRef, useCallback } from 'react'
import { useLightbox } from './Lightbox'

const defaultItems = [
  { id: 'm1', type: 'photo', title: 'Sanctum Sree Sitha Raama Swamy', desc: 'Main Sanctum Divine Altar & Deities', url: '/assets/temple_hero_deity.png' },
  { id: 'm2', type: 'video', title: 'Virtual Darshan & Suprabhata Seva', desc: 'Morning Abhishekam & Chanting Video', url: 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg&pp=sAgC', thumb: '/assets/temple_reconstruction.png' },
  { id: 'm3', type: 'photo', title: 'The 2024 Reconstruction Gopuram', desc: 'Granite Architecture & Illuminations', url: '/assets/temple_reconstruction.png' },
  { id: 'm4', type: 'photo', title: 'Founder Sri Subbaraamappa Gaaru', desc: '30 Years of Anna Daana Service', url: '/assets/founder_portrait.png' },
  { id: 'm5', type: 'video', title: 'Anna Daana Satram Prasadam Service', desc: 'Devotees partaking sacred prasadam meals', url: 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg&pp=sAgC', thumb: '/assets/anna_daana.png' },
  { id: 'm6', type: 'photo', title: 'Sacred Ramayana Book', desc: 'Sachitra Bommalla Raamaa Naama Ramayanam', url: '/assets/book_ramayanam.jpg' },
]

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/)
  return m && m[2].length === 11 ? m[2] : null
}

export default function Slideshow({ items: propItems }) {
  const items = propItems || defaultItems
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const { open } = useLightbox()

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % items.length), 5000)
  }, [items.length])

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [startTimer])

  const goTo = (i) => { setCurrent(i); startTimer() }
  const prev = () => goTo((current - 1 + items.length) % items.length)
  const next = () => goTo((current + 1) % items.length)

  if (!items.length) return <div className="slideshow-item"><div style={{ color: 'var(--primary-gold)', padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>No media uploaded yet.</div></div>

  return (
    <div className="slideshow-gallery-container">
      <div className="slideshow-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((item, i) => {
          const isVideo = item.type === 'video'
          const ytId = isVideo ? getYouTubeId(item.url) : null
          return (
            <div key={item.id} className="slideshow-item" onClick={() => open(item)}>
              {isVideo ? (
                ytId ? (
                  <div className="youtube-thumbnail-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img src={item.thumb || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    <div className="video-play-overlay">▶</div>
                  </div>
                ) : (
                  <video src={item.url} muted loop playsInline preload="auto" />
                )
              ) : (
                <img src={item.url} alt={item.title} loading="lazy" />
              )}
              <div className="slideshow-info-overlay">
                <h4>{item.title}</h4>
                <p>{item.desc || ''}</p>
              </div>
            </div>
          )
        })}
      </div>

      <button type="button" className="slideshow-control-btn prev" onClick={prev}>❮</button>
      <button type="button" className="slideshow-control-btn next" onClick={next}>❯</button>

      <div className="slideshow-dots">
        {items.map((_, i) => (
          <span key={i} className={`slideshow-dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  )
}
