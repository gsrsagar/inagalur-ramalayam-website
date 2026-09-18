import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAudio } from '../context/AudioContext'
import { motion, AnimatePresence } from 'framer-motion'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, lang, setLang } = useLanguage()
  const { playing, togglePlay } = useAudio()
  const location = useLocation()

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/history', label: t('nav_history') },
    { to: '/about', label: t('nav_about') },
    { to: '/founder', label: t('nav_founder') },
    { to: '/services', label: t('nav_services') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu upon navigation
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <img src="/assets/temple_brand_logo.png" alt="Temple Logo" className="brand-symbol" />
          <div className="brand-text">
            <span className="brand-title">{t('brand_title')}</span>
            <span className="brand-subtitle">{t('brand_subtitle')}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons Group */}
        <div className="nav-actions">
          
          {/* Sacred Chant Audio Button */}
          <button
            type="button"
            onClick={togglePlay}
            className={`nav-chant-btn ${playing ? 'playing' : ''}`}
            title={playing ? 'Stop / Pause Sacred Chant (Sri Rama Jaya Rama Jaya Jaya Rama)' : 'Play Sacred Chant (Sri Rama Jaya Rama Jaya Jaya Rama)'}
            aria-label={playing ? 'Stop Sacred Chant' : 'Play Sacred Chant'}
          >
            <span className="nav-chant-om">🕉️</span>
            <span className="nav-chant-icon">{playing ? '⏸' : '▶'}</span>
            <span className="nav-chant-text">{t('nav_chant_btn') || 'Sri Raama Jaya Raama Jaya Jaya Raam'}</span>
            {playing && (
              <span className="nav-chant-bars">
                <span className="chant-bar bar-1"></span>
                <span className="chant-bar bar-2"></span>
                <span className="chant-bar bar-3"></span>
              </span>
            )}
          </button>

          {/* Language Selector */}
          <div className="lang-selector">
            {languages.map((l) => (
              <button
                key={l.code}
                className={`lang-btn${lang === l.code ? ' active' : ''}`}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Donate Online CTA */}
          <button 
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-donate-modal'))}
            className="btn-primary nav-donate-btn"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            <span>❤️</span>
            <span>{t('btn_donate')}</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(13, 17, 23, 0.98)',
              borderBottom: '1px solid var(--border-gold)',
              backdropFilter: 'blur(24px)',
              overflow: 'hidden',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 15px 30px rgba(0,0,0,0.7)'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      color: location.pathname === link.to ? 'var(--primary-gold)' : 'var(--text-light)',
                      fontWeight: location.pathname === link.to ? 700 : 500,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: location.pathname === link.to ? 'rgba(212, 175, 55, 0.12)' : 'transparent'
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
