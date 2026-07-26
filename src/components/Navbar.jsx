import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { t, lang, setLang } = useLanguage()
  const location = useLocation()

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/gallery', label: t('nav_gallery') },
    { to: '/history', label: t('nav_history') },
    { to: '/founder', label: t('nav_founder') },
    { to: '/services', label: t('nav_services') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          <img src="/assets/temple_brand_logo.png" alt="" className="brand-symbol" />
          <div className="brand-text">
            <span className="brand-title">{t('brand_title')}</span>
            <span className="brand-subtitle">{t('brand_subtitle')}</span>
          </div>
        </Link>

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

        <div className="nav-actions">
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

          <button 
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-donate-modal'))}
            className="btn-primary nav-donate-btn"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            <span>❤️</span>
            <span>{t('btn_donate')}</span>
          </button>
        </div>
      </div>
    </motion.header>
  )
}
