import { useState, useEffect, useRef, useCallback } from 'react'
import { useLightbox } from './Lightbox'

const defaultItems = [
  { id: 'm1', type: 'photo', title: 'Sanctum Sree Sitha Raama Swamy', desc: 'Main Sanctum Divine Altar & Deities', url: '/assets/temple_hero_deity.png', fit: 'contain' },
  { id: 'm2', type: 'photo', title: 'New Temple Inner Sanctum & Altar', desc: 'Decorated Dhwajasthambham & Sanctum Sanctorum', url: '/assets/temple_inner_sanctum_pillar.jpg', fit: 'contain' },
  { id: 'm3', type: 'photo', title: 'Original Ancient Temple & Sacred Tree', desc: 'Centuries-old Heritage Temple Structure', url: '/assets/temple_old_heritage.jpg', fit: 'contain' },
  { id: 'm4', type: 'photo', title: 'Historical Temple Entrance & Mandapam', desc: 'Original Stone Threshold and Heritage Entrance', url: '/assets/temple_old_entrance.jpg', fit: 'contain' },
  { id: 'm5', type: 'photo', title: 'Founder Sri Subbaraamappa Gaaru', desc: '30 Years of Anna Daana Service & Spiritual Legacy', url: '/assets/founder_portrait.png', fit: 'contain', position: 'center top' },
  { id: 'm6', type: 'photo', title: 'Sacred Ramayana Book', desc: 'Sachitra Bommalla Raamaa Naama Ramayanam', url: '/assets/book_ramayanam.jpg', fit: 'contain' },
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
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0a0e14' }}>
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${item.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(24px) brightness(0.35)',
                      transform: 'scale(1.1)',
                      zIndex: 0
                    }} 
                  />
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    loading="lazy" 
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      objectFit: item.fit || 'contain',
                      objectPosition: item.position || 'center',
                    }}
                  />
                </div>
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
