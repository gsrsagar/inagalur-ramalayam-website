import { useState, useEffect, useRef, useCallback } from 'react'
import { useLightbox } from './Lightbox'

const defaultItems = [
  { id: 'm-emblem', type: 'photo', title: 'Sri Seetha Rama Swamy Devasthanam Inagalur - Divine Emblem', desc: 'Sacred Temple Emblem with Kalasham, Sri Rama, Sita, Lakshmana, Hanuman and Deepam', url: '/assets/temple_logo_emblem.jpg' },
  { id: 'm-deity-1', type: 'photo', title: 'Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy', desc: 'Main Sanctum Sacred Celestial Alankaram', url: '/assets/ramalayam_deity_1.jpg' },
  { id: 'm-deity-4', type: 'photo', title: 'Lord Sri Ramachandra Swamy Moolavirat Darshan', desc: 'Divine Close-up Sanctum Darshanam', url: '/assets/ramalayam_deity_4.jpg' },
  { id: 'm-deity-2', type: 'photo', title: 'Sanctum Sanctorum Complete Deeparadhana', desc: 'Sacred Moolavirat with Holy Deepams', url: '/assets/ramalayam_deity_2.jpg' },
  { id: 'm-deity-3', type: 'photo', title: 'Grand Floral Toranam & Festival Alankaram', desc: 'Celestial Flower Decoration', url: '/assets/ramalayam_deity_3.jpg' },
  { id: 'm-swami', type: 'photo', title: 'Founder Sri Subbaraamappa Gaaru (Gurudevulu)', desc: '30+ Years of Anna Daana & Devotional Tapas', url: '/assets/swami_portrait.jpg' },
  { id: 'rec1', type: 'photo', title: 'Temple Grand Re-construction & Puna Prathistha 1', desc: 'Ancient Granite Architecture & Consecration', url: '/assets/temple_reconstruction1.jpeg' },
  { id: 'rec2', type: 'photo', title: 'Temple Grand Re-construction & Puna Prathistha 2', desc: 'Sanctum Elevation & Traditional Craftsmanship', url: '/assets/temple_reconstruction2.jpeg' },
  { id: 'm6', type: 'video', title: 'Sacred Ramayana Book (Audio & Chants)', desc: 'Sachitra Bommalla Raamaa Naama Ramayanam', url: 'https://www.youtube.com/watch?v=wVGH-9Znwq4&list=PL4-zN5NLKyzwvbvtFOQYp7UjC62whcu', thumb: '/assets/book_ramayanam.png' },
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
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0a0e14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
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
