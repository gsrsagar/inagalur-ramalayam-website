import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'

export default function Footer() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { settings } = useContent()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)

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

        {/* Column 2: Contact & Map */}
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

        {/* Column 3: UPI Scan Panel */}
        <div className="footer-col">
          <h4 className="footer-heading">
            UPI Quickscan
          </h4>
          <p className="footer-text" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>
            Scan to donate directly to Anna Daana Seva
          </p>
          
          <motion.div 
            className="footer-qr-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQrModal(true)}
            style={{ cursor: 'pointer', position: 'relative' }}
            title="Click to expand QR Code"
          >
            <img 
              src={upiQrUrl} 
              alt="UPI Donation QR" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
            <div style={{
              position: 'absolute', bottom: '4px', right: '4px',
              background: 'rgba(0,0,0,0.75)', color: 'var(--primary-gold)',
              fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px',
              pointerEvents: 'none', fontWeight: 'bold'
            }}>
              🔍 Expand
            </div>
          </motion.div>
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            style={{
              background: 'none', border: 'none', color: 'var(--primary-gold)',
              fontSize: '0.75rem', cursor: 'pointer', marginTop: '6px',
              textDecoration: 'underline', padding: 0
            }}
          >
            🔍 Tap for Big QR Code
          </button>
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

      {showQrModal && (
        <QrZoomModal qrUrl={upiQrUrl} onClose={() => setShowQrModal(false)} />
      )}
    </motion.footer>
  )
}

function QrZoomModal({ qrUrl, onClose }) {
  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 100000,
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      <motion.div
        className="modal-window"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          padding: '1.25rem 1.25rem 1rem',
          maxWidth: '380px',
          width: '100%',
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          textAlign: 'center',
          position: 'relative',
          background: 'var(--card-bg, #161224)',
          border: '2px solid var(--border-gold)',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(255,215,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: '1px solid var(--border-gold)',
            color: '#fff', fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2
          }}
          title="Close Popup"
        >
          ✕
        </button>

        <h3 className="modal-title" style={{ fontSize: '1.15rem', color: 'var(--primary-gold)', marginBottom: '2px', paddingRight: '24px' }}>
          UPI Donation QR Code
        </h3>
        <p style={{ color: 'var(--text-light)', fontSize: '0.78rem', marginBottom: '12px' }}>
          Sri Seetha Ramachandra Swamy Temple Trust
        </p>

        <div style={{
          background: '#ffffff',
          padding: '10px',
          borderRadius: '14px',
          boxShadow: '0 0 20px rgba(255,215,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto',
          maxWidth: '100%'
        }}>
          <img
            src={qrUrl}
            alt="Expanded UPI QR Code"
            style={{
              width: 'clamp(180px, 48vw, 230px)',
              maxHeight: '38vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: '0 0 12px 0', lineHeight: 1.4 }}>
          Open PhonePe, Google Pay, Paytm or any UPI app to scan and contribute.
        </p>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
          <a
            href={qrUrl}
            download="Temple_UPI_QR.png"
            className="btn-primary"
            style={{ fontSize: '0.8rem', padding: '7px 14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            ⬇️ Download QR
          </a>
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            style={{ fontSize: '0.8rem', padding: '7px 16px', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )

  return createPortal(modalContent, document.body)
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

  const popupContent = (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      <div
        className="modal-window"
        onClick={e => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '400px', width: '90%', position: 'relative' }}
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

  return createPortal(popupContent, document.body)
}
