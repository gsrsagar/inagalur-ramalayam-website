import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'
import Slideshow from '../components/Slideshow'
import { useLightbox } from '../components/Lightbox'

const defaultGalleryItems = [
  { id: 'm1', type: 'photo', category: 'sanctum', title: 'Sanctum Sree Sitha Raama Swamy', desc: 'Main Sanctum Divine Altar & Deities', url: '/assets/temple_hero_deity.png' },
  { id: 'm2', type: 'video', category: 'sevas', title: 'Virtual Darshan & Suprabhata Seva', desc: 'Morning Abhishekam & Chanting Video', url: 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg&pp=sAgC', thumb: '/assets/temple_reconstruction.png' },
  { id: 'm3', type: 'photo', category: 'sanctum', title: 'The 2024 Reconstruction Gopuram', desc: 'Granite Architecture & Illuminations', url: '/assets/temple_reconstruction.png' },
  { id: 'm4', type: 'photo', category: 'service', title: 'Founder Sri Subbaraamappa Gaaru', desc: '30 Years of Anna Daana Service', url: '/assets/founder_portrait.png' },
  { id: 'm5', type: 'video', category: 'service', title: 'Anna Daana Satram Prasadam Service', desc: 'Devotees partaking sacred prasadam meals', url: 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg&pp=sAgC', thumb: '/assets/anna_daana.png' },
  { id: 'm6', type: 'photo', category: 'literature', title: 'Sacred Ramayana Book', desc: 'Sachitra Bommalla Raamaa Naama Ramayanam', url: '/assets/book_ramayanam.jpg' },
]

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/)
  return m && m[2].length === 11 ? m[2] : null
}

export default function FloatingGallery() {
  const { t } = useLanguage()
  const { open } = useLightbox()
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('slider')

  const categories = [
    { id: 'all', label: 'All Expressions' },
    { id: 'sanctum', label: 'Sanctum & Deities' },
    { id: 'sevas', label: 'Sevas & Aaradhana' },
    { id: 'service', label: 'Anna Daana Service' },
    { id: 'literature', label: 'Sacred Literature' },
  ]

  const filteredItems = activeCategory === 'all'
    ? defaultGalleryItems
    : defaultGalleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="floating-media-section" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <AnimatedSection className="section-container">
        <p className="section-subtitle" style={{ textAlign: 'center' }}>{t('floating_subtitle')}</p>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>{t('floating_title')}</h2>
        <p className="section-desc" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem' }}>{t('floating_desc')}</p>

        {/* Gallery Control Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem', 
          flexWrap: 'wrap', 
          gap: '1rem',
          borderBottom: '1px solid var(--glass-border)',
          paddingBottom: '1.25rem'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* View Toggle Group */}
          <div className="toggle-btn-group">
            <button 
              type="button" 
              onClick={() => setViewMode('slider')} 
              className={`toggle-view-btn ${viewMode === 'slider' ? 'active' : ''}`}
            >
              🎭 Cinematic Slider
            </button>
            <button 
              type="button" 
              onClick={() => setViewMode('grid')} 
              className={`toggle-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              🧱 Grid View
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'slider' ? (
            <motion.div
              key="slider-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Slideshow items={filteredItems} />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}
            >
              {filteredItems.map(item => {
                const isVideo = item.type === 'video'
                const ytId = isVideo ? getYouTubeId(item.url) : null
                const displayImg = isVideo 
                  ? (item.thumb || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`)
                  : item.url

                return (
                  <motion.div
                    key={item.id}
                    className="crud-grid-card"
                    whileHover={{ y: -6 }}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    onClick={() => open(item)}
                  >
                    <div className="crud-card-img-wrapper" style={{ height: '180px' }}>
                      <img src={displayImg} alt={item.title} className="crud-card-img" />
                      <div className="crud-card-badge">
                        {isVideo ? '🎥 Video' : '🖼️ Photo'}
                      </div>
                    </div>
                    <div className="crud-card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4 className="crud-card-title" style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                      <p className="crud-card-desc" style={{ fontSize: '0.75rem', marginBottom: 0, color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedSection>
    </section>
  )
}
