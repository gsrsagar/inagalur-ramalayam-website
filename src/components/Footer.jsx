import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { settings } = useContent()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        background: 'var(--medium-slate)',
        borderTop: '1px solid var(--glass-border)',
        padding: '60px 20px 30px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="footer-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr 1.2fr 1fr',
        gap: '40px'
      }}>
        
        {/* Column 1: Identity & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--primary-gold)', margin: 0 }}>
            Sree Sitha Raama Swamy Devasthaanam
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.6', margin: 0 }}>
            {t('footer_text')}
          </p>
          
          {/* Social Handles */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
            {settings.youtube && (
              <motion.a 
                href={settings.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: 'rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 0, 0, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4444', textDecoration: 'none' 
                }}
                title="Watch Divine Youtube Channel"
              >
                ▶
              </motion.a>
            )}
            {settings.instagram && (
              <motion.a 
                href={settings.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: 'rgba(225, 48, 108, 0.1)', border: '1px solid rgba(225, 48, 108, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e1306c', textDecoration: 'none' 
                }}
                title="Follow Instagram Feed"
              >
                📸
              </motion.a>
            )}
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary-gold)', marginBottom: '1.25rem' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', lineHeight: 2.2, padding: 0, margin: 0 }}>
            <li><a href="/" style={{ fontSize: '0.85rem' }}>{t('nav_home')}</a></li>
            <li><a href="/history" style={{ fontSize: '0.85rem' }}>{t('nav_history')}</a></li>
            <li><a href="/founder" style={{ fontSize: '0.85rem' }}>{t('nav_founder')}</a></li>
            <li><a href="/services" style={{ fontSize: '0.85rem' }}>{t('nav_services')}</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Map */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary-gold)', marginBottom: '1.25rem' }}>
            {t('footer_contact_heading')}
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.6', margin: '0 0 10px 0' }}>
            📍 Devasthaanam Road, Inagaluru,<br />
            Kadiri Mandal, Sri Sathya Sai District,<br />
            Andhra Pradesh, India.
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.82rem', margin: '0 0 5px 0' }}>
            📞 {settings.phone}
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.82rem', margin: '0 0 15px 0' }}>
            ✉️ {settings.email}
          </p>

          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.123456789!2d81.123456!3d16.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDU5JzE1LjYiTiA4McKwMDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="110"
              style={{ border: 0, borderRadius: 8, opacity: 0.8 }}
              allowFullScreen loading="lazy" title="Temple Location"
            />
          </div>
        </div>

        {/* Column 4: UPI Scan Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary-gold)', marginBottom: '0.5rem', margin: 0 }}>
            UPI Quickscan
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
            Scan to donate directly to Anna Daana Seva
          </p>
          
          <div style={{ 
            width: '120px', 
            height: '120px', 
            border: '2px solid var(--border-gold)', 
            borderRadius: '12px', 
            background: 'white', 
            padding: '6px',
            boxShadow: '0 0 15px var(--shadow-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img 
              src={settings.qrCodeUrl || '/assets/qr_code_placeholder.png'} 
              alt="UPI Donation QR" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
        </div>

      </div>

      {/* Footer Bottom Rights */}
      <div className="footer-bottom" style={{ 
        maxWidth: '1200px', 
        margin: '40px auto 0', 
        paddingTop: '20px', 
        borderTop: '1px solid var(--glass-border)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: '1rem', 
        flexWrap: 'wrap'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} Sree Sitha Raama Swamy Devasthaanam. All rights reserved.
        </p>
        <div>
          {user ? (
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '6px 16px', fontSize: '0.75rem' }}
              onClick={() => navigate('/admin')}
            >
              Admin Panel
            </button>
          ) : (
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '4px 12px', fontSize: '0.7rem', cursor: 'pointer' }}
              onClick={() => setShowLogin(true)}
            >
              Admin Login
            </button>
          )}
        </div>
      </div>

      {showLogin && (
        <AdminLoginPopup onClose={() => setShowLogin(false)} navigate={navigate} />
      )}
    </motion.footer>
  )
}

function AdminLoginPopup({ onClose, navigate }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      onClose()
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="modal-window"
        onClick={e => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '400px', width: '90%' }}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px' }}
        >
          ✕
        </button>
        <h2 className="modal-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{error}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
