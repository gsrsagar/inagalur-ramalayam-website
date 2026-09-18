import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'

export default function ScrollingTicker() {
  const { t } = useLanguage()
  const [isPaused, setIsPaused] = useState(false)

  const label = t('home_scrolling_ticker_label') || '🕉️ Announcements'
  const text = t('home_scrolling_ticker_text') || '🕉️ Welcome to Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy Temple, Inagalore • Daily Darshan Timings: Morning 6:00 AM - 12:30 PM & Evening 5:30 PM - 8:30 PM • Temple Reconstruction Project is in active progress • Devotees are cordially invited to participate in Daily Nitya Pooja and Annadaanam Seva • Sri Rama Jaya Rama Jaya Jaya Rama 🕉️'

  return (
    <div 
      className="scrolling-ticker-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="scrolling-ticker-badge">
        <span className="ticker-live-dot" />
        <span className="ticker-badge-text">{label}</span>
      </div>

      <div className="scrolling-ticker-viewport">
        <div className={`scrolling-ticker-track ${isPaused ? 'paused' : ''}`}>
          <span className="scrolling-ticker-item">{text}</span>
          <span className="scrolling-ticker-item">{text}</span>
          <span className="scrolling-ticker-item">{text}</span>
        </div>
      </div>

      <button
        type="button"
        className="scrolling-ticker-pause-toggle"
        onClick={() => setIsPaused(!isPaused)}
        title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
        aria-label={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
    </div>
  )
}
