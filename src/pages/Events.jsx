import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

export default function Events() {
  const { events, addItem, updateItem, deleteItem, uploadImage } = useData()
  const { user } = useAuth()
  const { t } = useLanguage()

  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: 'Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy Temple, Inagalore',
    description: '',
    image: '',
    category: 'Festivals',
    status: 'Upcoming'
  })

  const fileInputRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const filters = [
    { id: 'all', label: 'All Events (అన్ని కార్యక్రమాలు)' },
    { id: 'Festivals', label: 'Festivals & Kalyanam (ఉత్సవాలు)' },
    { id: 'Consecration', label: 'Reconstruction & Pujas (పునర్నిర్మాణ పూజలు)' },
    { id: 'Nithya Seva', label: 'Weekly & Nithya Kainkaryams (నిత్య సేవలు)' },
  ]

  const filteredEvents = (events || []).filter(e => {
    if (activeFilter === 'all') return true
    return e.category === activeFilter
  })

  const handleOpenAddModal = () => {
    setEditingEvent(null)
    setFormData({
      title: '',
      date: '',
      time: '09:00 AM - 01:00 PM',
      location: 'Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy Temple, Inagalore',
      description: '',
      image: '/assets/temple_hero_deity.png',
      category: activeFilter === 'all' ? 'Festivals' : activeFilter,
      status: 'Upcoming'
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (event, e) => {
    if (e) e.stopPropagation()
    setEditingEvent(event)
    setFormData({
      title: event.title || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      description: event.description || '',
      image: event.image || '',
      category: event.category || 'Festivals',
      status: event.status || 'Upcoming'
    })
    setIsModalOpen(true)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, 'events')
      setFormData(prev => ({ ...prev, image: url }))
      showToast('Event image uploaded successfully!')
    } catch (err) {
      showToast('Image upload failed. Please use image under 800KB or enter image URL.')
    } finally {
      setUploading(false)
    }
  }

  const handleSaveEvent = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please provide an Event Title.')
      return
    }

    try {
      if (editingEvent) {
        await updateItem('events', editingEvent.id || editingEvent._id, formData)
        showToast('Event updated successfully!')
      } else {
        await addItem('events', formData)
        showToast('New event scheduled and published!')
      }
      setIsModalOpen(false)
      setEditingEvent(null)
    } catch (err) {
      showToast('Error saving event.')
    }
  }

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return
    try {
      await deleteItem('events', eventToDelete.id || eventToDelete._id)
      showToast('Event deleted successfully!')
      setEventToDelete(null)
    } catch (err) {
      showToast('Failed to delete event.')
    }
  }

  return (
    <section className="section" style={{ position: 'relative', zIndex: 1, minHeight: '85vh', paddingBottom: '5rem' }}>
      <AnimatedSection className="section-container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="section-subtitle">{t('eventsSubtitle') || 'Divine Auspicious Occasions'}</p>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            {t('eventsTitle') || 'Temple Events & Celebrations (ఆలయ కార్యక్రమాలు)'}
          </h1>
          <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto 1.5rem' }}>
            Participate in the auspicious celestial celebrations, weekly abhishekam rituals, Sri Rama Navami kalyanam, and special homams at Inagalore Ramalayam.
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
                <span>Admin: Add New Event (కార్యక్రమం జోడించండి)</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '0.6rem'
        }}>
          {filters.map(filter => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          {filteredEvents.length === 0 ? (
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
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🎉</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>No events found</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No events recorded under this category.</p>
              {user && (
                <button type="button" onClick={handleOpenAddModal} className="btn-primary">
                  ➕ Schedule an Event
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="events-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem'
              }}
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id || event._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'var(--card-bg, rgba(20, 24, 33, 0.7))',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  {/* Event Image Banner */}
                  <div style={{ height: '220px', position: 'relative', overflow: 'hidden', background: '#0a0e17' }}>
                    <img
                      src={event.image || '/assets/temple_hero_deity.png'}
                      alt={event.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* Category badge */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--primary-gold)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '50px',
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      ✨ {event.category || 'Festivals'}
                    </div>

                    {/* Quick Edit and Delete buttons on card - Only for Admin */}
                    {user && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        display: 'flex',
                        gap: '6px',
                        zIndex: 10
                      }}>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleOpenEditModal(event, e)}
                          title="Edit Event"
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
                            setEventToDelete(event)
                          }}
                          title="Delete Event"
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
                  </div>

                  {/* Event Details Content */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    
                    {/* Date and Time Bar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: 'var(--primary-gold)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '0.6rem'
                    }}>
                      <span>📅 {event.date || 'Auspicious Occasion'}</span>
                      {event.time && <span>• ⏰ {event.time}</span>}
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      marginBottom: '0.6rem',
                      fontFamily: 'var(--font-serif)',
                      color: '#fff',
                      lineHeight: 1.3
                    }}>
                      {event.title}
                    </h3>

                    {event.location && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        marginBottom: '0.8rem'
                      }}>
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    )}

                    <p style={{
                      color: 'var(--text-light)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flexGrow: 1
                    }}>
                      {event.description}
                    </p>

                    <div style={{
                      marginTop: 'auto',
                      borderTop: '1px solid var(--glass-border)',
                      paddingTop: '0.75rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '3px 10px',
                        borderRadius: '50px',
                        background: 'rgba(74, 222, 128, 0.1)',
                        color: '#4ade80',
                        fontWeight: 600,
                        border: '1px solid rgba(74, 222, 128, 0.3)'
                      }}>
                        {event.status || 'Active Event'}
                      </span>

                      <button
                        type="button"
                        onClick={() => window.dispatchEvent(new Event('open-donate-modal'))}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-gold)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        Sponsor / Donate ↗
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add / Edit Event Modal */}
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
                  maxWidth: '580px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '2rem',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--primary-gold)', fontSize: '1.4rem' }}>
                    {editingEvent ? '✏️ Edit Temple Event' : '➕ Add New Temple Event'}
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

                <form onSubmit={handleSaveEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  
                  {/* Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Event Title (కార్యక్రమ నామం) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sri Rama Navami Grand Kalyana Mahotsavam"
                      className="form-input"
                      value={formData.title}
                      onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                    />
                  </div>

                  {/* Date and Time Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Date (తేదీ) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. April 2025 or 15-04-2025"
                        className="form-input"
                        value={formData.date}
                        onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Timings (సమయం)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 09:00 AM - 01:00 PM"
                        className="form-input"
                        value={formData.time}
                        onChange={e => setFormData(p => ({ ...p, time: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>
                  </div>

                  {/* Category and Status Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                        <option value="Festivals">Festivals & Kalyanam</option>
                        <option value="Consecration">Reconstruction & Homam</option>
                        <option value="Nithya Seva">Weekly & Nithya Seva</option>
                        <option value="Pooja">Special Deepotsavam</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Status
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Upcoming / Annual Festival"
                        className="form-input"
                        value={formData.status}
                        onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Location / Venue
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sri Rama Temple Courtyard, Inagalore"
                      className="form-input"
                      value={formData.location}
                      onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                    />
                  </div>

                  {/* Image Upload / URL */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Event Image (ఫోటో)
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
                        {uploading ? '⏳ Uploading...' : '📁 Choose Image File'}
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Or enter image URL (e.g. /assets/temple_hero_deity.png)"
                      className="form-input"
                      value={formData.image}
                      onChange={e => setFormData(p => ({ ...p, image: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px' }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Event Description & Schedule (వివరణ)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Detailed schedule of pooja, abhishekam, prasadam distribution..."
                      className="form-input"
                      value={formData.description}
                      onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
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
                      {editingEvent ? '💾 Update Event' : '➕ Publish Event'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {eventToDelete && (
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
              onClick={() => setEventToDelete(null)}
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
                <h3 style={{ color: '#ef4444', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>Delete Temple Event?</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Are you sure you want to delete &quot;<strong>{eventToDelete.title}</strong>&quot;?
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setEventToDelete(null)}
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
