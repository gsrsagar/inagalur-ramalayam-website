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

  const upiQrUrl = (!settings.qrCodeUrl || settings.qrCodeUrl.includes('temple_pan_card') || settings.qrCodeUrl.includes('1785085869181_QR'))
    ? '/assets/temple_upi_qr.png'
    : settings.qrCodeUrl

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        
        {/* Column 1: Identity & Socials */}
        <div className="footer-col">
          <h3 className="footer-title">
            Sree Sitha Raama Swamy Devasthaanam
          </h3>
          <p className="footer-text">
            {t('footer_text')}
          </p>
          
          {/* Social Handles */}
          <div className="footer-socials">
            {(settings.youtube || 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg') && (
              <motion.a 
                href={settings.youtube || 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg'} 
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
        <div className="footer-col">
          <h4 className="footer-heading">
            Quick Links
          </h4>
          <ul className="footer-links">
            <li><a href="/">{t('nav_home')}</a></li>
            <li><a href="/history">{t('nav_history')}</a></li>
            <li><a href="/founder">{t('nav_founder')}</a></li>
            <li><a href="/services">{t('nav_services')}</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Map */}
        <div className="footer-col">
          <h4 className="footer-heading">
            {t('footer_contact_heading')}
          </h4>
          <p className="footer-text" style={{ margin: '0 0 8px 0' }}>
            📍 Devasthaanam Road, Inagaluru,<br />
            Kadiri Mandal, Sri Sathya Sai District,<br />
            Andhra Pradesh, India.
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.82rem', margin: '0 0 4px 0' }}>
            📞 {settings.phone}
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.82rem', margin: '0 0 12px 0' }}>
            ✉️ {settings.email}
          </p>

          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.123456789!2d81.123456!3d16.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDU5JzE1LjYiTiA4McKwMDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1"
              loading="lazy" title="Temple Location"
            />
          </div>
        </div>

        {/* Column 4: UPI Scan Panel */}
        <div className="footer-col">
          <h4 className="footer-heading">
            UPI Quickscan
          </h4>
          <p className="footer-text" style={{ fontSize: '0.75rem' }}>
            Scan to donate directly to Anna Daana Seva
          </p>
          
          <div className="footer-qr-card">
            <img 
              src={upiQrUrl} 
              alt="UPI Donation QR" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
        </div>

      </div>

      {/* Footer Bottom Rights */}
      <div className="footer-bottom">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} Sree Sitha Raama Swamy Devasthaanam. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', opacity: 0.85, margin: 0 }}>
            Website created and designed by <span style={{ color: 'var(--primary-gold)', fontWeight: 500 }}>Nuligommu VaraPradeep</span>
          </p>
        </div>
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
