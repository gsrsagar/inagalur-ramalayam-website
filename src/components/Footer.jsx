import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        <div>
          <h3>Sree Sitha Raama Swamy Devasthaanam</h3>
          <p>{t('footer_text')}</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', lineHeight: 2 }}>
            <li><a href="/">{t('nav_home')}</a></li>
            <li><a href="/history">{t('nav_history')}</a></li>
            <li><a href="/founder">{t('nav_founder')}</a></li>
            <li><a href="/services">{t('nav_services')}</a></li>
          </ul>
        </div>

        <div>
          <h4>{t('footer_contact_heading')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('contact_details_html') }} />
          <div className="footer-map" style={{ marginTop: '1rem' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.123456789!2d81.123456!3d16.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDU5JzE1LjYiTiA4McKwMDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="180"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen loading="lazy" title="Temple Location"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexDirection: 'column' }}>
        <p>&copy; {new Date().getFullYear()} Sree Sitha Raama Swamy Devasthaanam. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
