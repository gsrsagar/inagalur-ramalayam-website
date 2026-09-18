import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import AnimatedSection from '../components/AnimatedSection'
import Slideshow from '../components/Slideshow'
import { useLightbox } from '../components/Lightbox'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/)
  return m && m[2].length === 11 ? m[2] : null
}

export default function FloatingGallery() {
  const { t } = useLanguage()
  const { open } = useLightbox()
  const { user } = useAuth()
  const { gallery, addItem, updateItem, deleteItem, uploadImage } = useData()

  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    type: 'photo',
    category: 'sanctum',
    title: '',
    desc: '',
    url: '',
    thumb: '',
  })

  const fileInputRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const categories = [
    { id: 'all', label: 'All Expressions (అన్నీ)' },
    { id: 'sanctum', label: 'Sanctum & Deities (గర్భగుడి)' },
    { id: 'heritage', label: 'Reconstruction & Heritage (పునర్నిర్మాణం)' },
    { id: 'service', label: 'Anna Daana Service (అన్నదానం)' },
    { id: 'literature', label: 'Sacred Literature (గ్రంథములు)' },
  ]

  const filteredItems = (gallery || []).filter(item => {
    if (activeCategory === 'all') return true
    return item.category === activeCategory
  })

  const handleOpenAddModal = () => {
    setEditingItem(null)
    setFormData({
      type: 'photo',
      category: activeCategory === 'all' ? 'sanctum' : activeCategory,
      title: '',
      desc: '',
      url: '',
      thumb: '',
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item, e) => {
    if (e) e.stopPropagation()
    setEditingItem(item)
    setFormData({
      type: item.type || 'photo',
      category: item.category || 'sanctum',
      title: item.title || '',
      desc: item.desc || '',
      url: item.url || '',
      thumb: item.thumb || '',
    })
    setIsModalOpen(true)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, 'gallery')
      setFormData(prev => ({
        ...prev,
        url: url,
        thumb: prev.type === 'video' ? url : prev.thumb
      }))
      showToast('Photo uploaded successfully!')
    } catch (err) {
      showToast('Upload failed. Please check file size or enter a direct image URL.')
    } finally {
      setUploading(false)
    }
  }

  const handleSaveMedia = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.url.trim()) {
      alert('Please provide a Title and Media URL or Upload an image.')
      return
    }

    try {
      if (editingItem) {
        await updateItem('gallery', editingItem.id, formData)
        showToast('Media details updated successfully!')
      } else {
        await addItem('gallery', formData)
        showToast('New Photo/Video added to gallery!')
      }
      setIsModalOpen(false)
      setEditingItem(null)
    } catch (err) {
      showToast('Error saving media item.')
    }
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return
    try {
      await deleteItem('gallery', itemToDelete.id)
      showToast('Media item deleted successfully!')
      setItemToDelete(null)
    } catch (err) {
      showToast('Failed to delete media item.')
    }
  }

  return (
    <section id="floating-media-section" className="section" style={{ position: 'relative', zIndex: 1, minHeight: '85vh', paddingBottom: '5rem' }}>
      <AnimatedSection className="section-container">
        
        {/* Header Title and Actions */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="section-subtitle">{t('floating_subtitle') || 'Divine Expressions'}</p>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            {t('floating_title') || 'Temple Media & Photo Gallery'}
          </h1>
          <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto 1.5rem' }}>
            {t('floating_desc') || 'Explore sacred photos and devotional videos of Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy Temple, Inagalore.'}
          </p>

          {/* Action buttons bar - Only visible to authenticated Admin */}
          {user && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <motion.button
                type="button"
                onClick={handleOpenAddModal}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  padding: '0.75rem 1.6rem',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
                  borderRadius: '50px'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>➕</span>
                <span>Admin: Add Photo / Video (మీడియా జోడించండి)</span>
              </motion.button>
            </div>
          )}
        </div>

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
              onClick={() => setViewMode('grid')}
              className={`toggle-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              🧱 Grid Gallery
            </button>
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`toggle-view-btn ${viewMode === 'slider' ? 'active' : ''}`}
            >
              🎭 Cinematic Slider
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                background: 'var(--glass-bg)',
                borderRadius: '16px',
                border: '1px dashed var(--glass-border)'
              }}
            >
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🖼️</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>No media found in this category</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No media items currently listed in this category.</p>
              {user && (
                <button type="button" onClick={handleOpenAddModal} className="btn-primary">
                  ➕ Add Media Now
                </button>
              )}
            </motion.div>
          ) : viewMode === 'slider' ? (
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
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.75rem'
              }}
            >
              {filteredItems.map(item => {
                const isVideo = item.type === 'video'
                const ytId = isVideo ? getYouTubeId(item.url) : null
                const displayImg = isVideo
                  ? (item.thumb || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '/assets/book_ramayanam.png'))
                  : item.url

                return (
                  <motion.div
                    key={item.id || item._id}
                    className="crud-grid-card"
                    whileHover={{ y: -6 }}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: 'var(--card-bg, rgba(20, 24, 33, 0.7))',
                      border: '1px solid var(--glass-border)',
                      position: 'relative'
                    }}
                    onClick={() => open(item)}
                  >
                    {/* Image / Video Thumbnail */}
                    <div className="crud-card-img-wrapper" style={{ height: '220px', background: '#090d13', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={displayImg}
                        alt={item.title}
                        className="crud-card-img"
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: item.gridFit || 'cover',
                          objectPosition: item.gridPosition || 'center',
                          transition: 'transform 0.4s ease'
                        }}
                      />
                      <div className="crud-card-badge" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                        {isVideo ? '🎥 Video' : '🖼️ Photo'}
                      </div>

                      {/* Top Right Quick Action Buttons - Only for Admin */}
                      {user && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            display: 'flex',
                            gap: '6px',
                            zIndex: 5
                          }}
                          onClick={e => e.stopPropagation()}
                        >
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleOpenEditModal(item, e)}
                            title="Edit Media"
                            style={{
                              background: 'rgba(26, 32, 44, 0.85)',
                              border: '1px solid rgba(212, 175, 55, 0.6)',
                              color: 'var(--primary-gold)',
                              borderRadius: '8px',
                              padding: '6px 9px',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              backdropFilter: 'blur(8px)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            ✏️
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setItemToDelete(item)
                            }}
                            title="Delete Media"
                            style={{
                              background: 'rgba(239, 68, 68, 0.85)',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              color: '#fff',
                              borderRadius: '8px',
                              padding: '6px 9px',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              backdropFilter: 'blur(8px)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            🗑️
                          </motion.button>
                        </div>
                      )}

                      {isVideo && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(0,0,0,0.35)',
                          pointerEvents: 'none'
                        }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(212, 175, 55, 0.9)',
                            color: '#111',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            paddingLeft: '3px'
                          }}>
                            ▶
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="crud-card-content" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4 className="crud-card-title" style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--primary-gold)' }}>
                        {item.title}
                      </h4>
                      <p className="crud-card-desc" style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--text-light)', flexGrow: 1 }}>
                        {item.desc || 'Devotional expression of Sri Seetha Ramachandra Swamy.'}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '0.6rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                          📂 {item.category || 'sanctum'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)', fontWeight: 600 }}>
                          Click to View ↗
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal: Add or Edit Media */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: 'rgba(5, 8, 15, 0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: 'var(--dark-navy, #0f172a)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '20px',
                  width: '100%',
                  maxWidth: '560px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '2rem',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--primary-gold)', fontSize: '1.4rem' }}>
                    {editingItem ? '✏️ Edit Media' : '➕ Add Photo / Video'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '1.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveMedia} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Media Type Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Media Type
                    </label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, type: 'photo' }))}
                        className={`filter-pill ${formData.type === 'photo' ? 'active' : ''}`}
                        style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
                      >
                        🖼️ Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, type: 'video' }))}
                        className={`filter-pill ${formData.type === 'video' ? 'active' : ''}`}
                        style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
                      >
                        🎥 Video
                      </button>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Category
                    </label>
                    <select
                      className="form-input"
                      value={formData.category}
                      onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)' }}
                    >
                      <option value="sanctum">Sanctum & Deities (గర్భగుడి)</option>
                      <option value="heritage">Reconstruction & Heritage (పునర్నిర్మాణం)</option>
                      <option value="service">Anna Daana Service (అన్నదానం)</option>
                      <option value="literature">Sacred Literature (గ్రంథములు)</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Title / Caption *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanctum Re-construction & Archana"
                      className="form-input"
                      value={formData.title}
                      onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                    />
                  </div>

                  {/* Photo Upload & URL options */}
                  {formData.type === 'photo' ? (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Upload Photo or Enter Photo URL *
                      </label>
                      
                      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleFileUpload}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="btn-secondary"
                          style={{ flex: 1, padding: '10px', fontSize: '0.85rem', justifyContent: 'center' }}
                        >
                          {uploading ? '⏳ Compressing & Uploading...' : '📁 Choose Image File'}
                        </button>
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Or paste image URL (e.g. /assets/... or https://...)"
                        className="form-input"
                        value={formData.url}
                        onChange={e => setFormData(p => ({ ...p, url: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                      />

                      {formData.url && (
                        <div style={{ marginTop: '0.75rem', height: '120px', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                          <img src={formData.url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Video URL (YouTube or MP4) *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        className="form-input"
                        value={formData.url}
                        onChange={e => setFormData(p => ({ ...p, url: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', marginBottom: '0.75rem' }}
                      />

                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Video Thumbnail Image URL (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Optional custom thumbnail URL"
                        className="form-input"
                        value={formData.thumb}
                        onChange={e => setFormData(p => ({ ...p, thumb: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add devotional notes, history or context..."
                      className="form-input"
                      value={formData.desc}
                      onChange={e => setFormData(p => ({ ...p, desc: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', resize: 'vertical' }}
                    />
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
                    >
                      {editingItem ? '💾 Update Media' : '➕ Add to Gallery'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {itemToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: 'rgba(5, 8, 15, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
              onClick={() => setItemToDelete(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: 'var(--dark-navy, #0f172a)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  borderRadius: '16px',
                  width: '100%',
                  maxWidth: '420px',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🗑️</div>
                <h3 style={{ color: '#ef4444', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>Delete Media Item?</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Are you sure you want to delete &quot;<strong>{itemToDelete.title}</strong>&quot;? This action cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(null)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    className="btn-primary"
                    style={{ flex: 1, padding: '10px', justifyContent: 'center', background: '#dc2626', borderColor: '#ef4444' }}
                  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 100000,
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                border: '1px solid var(--border-gold)',
                color: 'var(--primary-gold)',
                padding: '12px 24px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>✨</span>
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </AnimatedSection>
    </section>
  )
}
