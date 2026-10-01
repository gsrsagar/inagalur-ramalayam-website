import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/DataContext'
import { getCountryFlag, calculateVisitorStats, formatTimeAgo } from '../utils/visitorTracker'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
}

const SAMPLE_INDIA_CITIES = [
  { city: 'Inagalore / Kadapa', region: 'Andhra Pradesh', ip: '103.112.54.' },
  { city: 'Hyderabad', region: 'Telangana', ip: '49.37.192.' },
  { city: 'Bengaluru', region: 'Karnataka', ip: '106.51.78.' },
  { city: 'Tirupati', region: 'Andhra Pradesh', ip: '157.48.201.' },
  { city: 'Vijayawada', region: 'Andhra Pradesh', ip: '49.207.210.' },
  { city: 'Chennai', region: 'Tamil Nadu', ip: '182.73.190.' },
  { city: 'Mumbai', region: 'Maharashtra', ip: '103.248.92.' },
  { city: 'Anantapur', region: 'Andhra Pradesh', ip: '117.216.14.' },
]

const SAMPLE_GLOBAL_CITIES = [
  { country: 'United States', countryCode: 'US', city: 'Dallas (Irving)', region: 'Texas', ip: '172.56.21.' },
  { country: 'United States', countryCode: 'US', city: 'San Jose (Bay Area)', region: 'California', ip: '108.185.34.' },
  { country: 'United Arab Emirates', countryCode: 'AE', city: 'Dubai (Bur Dubai)', region: 'Dubai', ip: '94.200.45.' },
  { country: 'United Kingdom', countryCode: 'GB', city: 'London (Wembley)', region: 'England', ip: '82.132.221.' },
  { country: 'Singapore', countryCode: 'SG', city: 'Singapore', region: 'Central', ip: '111.65.68.' },
  { country: 'Australia', countryCode: 'AU', city: 'Sydney (Parramatta)', region: 'NSW', ip: '1.144.110.' },
  { country: 'Canada', countryCode: 'CA', city: 'Toronto (Brampton)', region: 'Ontario', ip: '142.112.89.' },
  { country: 'Germany', countryCode: 'DE', city: 'Frankfurt', region: 'Hesse', ip: '91.22.40.' },
]

const SAMPLE_PAGES = [
  { path: '/', title: 'Home Page' },
  { path: '/events', title: 'Events & Sri Rama Navami' },
  { path: '/gallery', title: 'Media & Darshan Gallery' },
  { path: '/services', title: 'Services & Anna Daana' },
  { path: '/history', title: '180 Years Temple History' },
  { path: '/about', title: 'Trust & Section 12A' },
  { path: '/founder', title: 'Founder Sri Subbaraamappa Gaaru' },
  { path: '/activities', title: 'Temple Activities & Pujas' },
]

export default function ViewersTab({ showToast, isMobile }) {
  const { visitors = [], recordVisitorDirectly, clearVisitors, loadAll } = useData()
  
  const [filterType, setFilterType] = useState('all') // 'all', 'india', 'other'
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [timeRange, setTimeRange] = useState('all') // 'all', 'today', '7days'
  const [pageFilter, setPageFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Aggregated Stats
  const stats = useMemo(() => calculateVisitorStats(visitors), [visitors])

  // Filtered List
  const filteredVisitors = useMemo(() => {
    return visitors.filter(item => {
      // 1. Origin Filter
      const isInd = item.isIndia || item.countryCode === 'IN' || (item.country && item.country.toLowerCase() === 'india')
      if (filterType === 'india' && !isInd) return false
      if (filterType === 'other' && isInd) return false

      // 2. Specific Country Pill Filter
      if (selectedCountry && item.country !== selectedCountry) return false

      // 3. Time Range Filter
      const now = Date.now()
      if (timeRange === 'today') {
        const oneDayAgo = now - 24 * 60 * 60 * 1000
        if ((item.timestamp || item.createdAt || 0) < oneDayAgo) return false
      } else if (timeRange === '7days') {
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
        if ((item.timestamp || item.createdAt || 0) < sevenDaysAgo) return false
      }

      // 4. Page Filter
      if (pageFilter !== 'all' && item.page !== pageFilter) return false

      // 5. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchCountry = (item.country || '').toLowerCase().includes(q)
        const matchCity = (item.city || '').toLowerCase().includes(q)
        const matchRegion = (item.region || '').toLowerCase().includes(q)
        const matchIp = (item.ip || '').toLowerCase().includes(q)
        const matchBrowser = (item.browser || '').toLowerCase().includes(q)
        const matchDevice = (item.device || '').toLowerCase().includes(q)
        const matchPage = (item.page || '').toLowerCase().includes(q) || (item.pageTitle || '').toLowerCase().includes(q)
        if (!matchCountry && !matchCity && !matchRegion && !matchIp && !matchBrowser && !matchDevice && !matchPage) {
          return false
        }
      }

      return true
    })
  }, [visitors, filterType, selectedCountry, timeRange, pageFilter, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage) || 1
  const paginatedVisitors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredVisitors.slice(start, start + itemsPerPage)
  }, [filteredVisitors, currentPage])

  // Live Simulation Handlers
  const handleSimulateIndia = () => {
    const randomCity = SAMPLE_INDIA_CITIES[Math.floor(Math.random() * SAMPLE_INDIA_CITIES.length)]
    const randomPage = SAMPLE_PAGES[Math.floor(Math.random() * SAMPLE_PAGES.length)]
    const isMobileDevice = Math.random() > 0.4
    
    recordVisitorDirectly({
      ip: randomCity.ip + Math.floor(Math.random() * 240 + 10),
      country: 'India',
      countryCode: 'IN',
      region: randomCity.region,
      city: randomCity.city,
      isIndia: true,
      page: randomPage.path,
      pageTitle: randomPage.title,
      device: isMobileDevice ? 'Mobile' : 'Desktop',
      os: isMobileDevice ? 'Android 14' : 'Windows 11',
      browser: isMobileDevice ? 'Chrome Mobile' : 'Chrome 129',
      referrer: 'WhatsApp Community Share',
    })
    showToast(`Simulated live visit from ${randomCity.city}, India! 🇮🇳`)
  }

  const handleSimulateGlobal = () => {
    const randomGlobal = SAMPLE_GLOBAL_CITIES[Math.floor(Math.random() * SAMPLE_GLOBAL_CITIES.length)]
    const randomPage = SAMPLE_PAGES[Math.floor(Math.random() * SAMPLE_PAGES.length)]
    const isMobileDevice = Math.random() > 0.5

    recordVisitorDirectly({
      ip: randomGlobal.ip + Math.floor(Math.random() * 240 + 10),
      country: randomGlobal.country,
      countryCode: randomGlobal.countryCode,
      region: randomGlobal.region,
      city: randomGlobal.city,
      isIndia: false,
      page: randomPage.path,
      pageTitle: randomPage.title,
      device: isMobileDevice ? 'Mobile' : 'Desktop',
      os: isMobileDevice ? 'iOS 18' : 'macOS Sequoia',
      browser: isMobileDevice ? 'Safari' : 'Chrome 129',
      referrer: 'Google Search / Global Devotee',
    })
    showToast(`Simulated international visit from ${randomGlobal.city}, ${randomGlobal.country}! 🌍`)
  }

  // Export to CSV
  const handleExportCSV = () => {
    if (visitors.length === 0) {
      showToast('No visitor records to export', 'error')
      return
    }

    const headers = ['ID', 'Country', 'Origin', 'City', 'Region', 'Page', 'Device', 'OS', 'Browser', 'IP', 'Date Time']
    const rows = visitors.map(v => [
      `"${v.id || ''}"`,
      `"${v.country || 'India'}"`,
      v.isIndia || v.countryCode === 'IN' ? '"India (Domestic)"' : '"Other Countries (International)"',
      `"${v.city || ''}"`,
      `"${v.region || ''}"`,
      `"${v.page || '/'}"`,
      `"${v.device || 'Mobile'}"`,
      `"${v.os || ''}"`,
      `"${v.browser || ''}"`,
      `"${v.ip || ''}"`,
      `"${new Date(v.timestamp || v.createdAt || Date.now()).toLocaleString('en-IN')}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `temple_website_viewers_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Exported visitor log CSV successfully! 📥')
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all logged visitor records?')) {
      clearVisitors()
      showToast('Visitor history cleared', 'success')
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Header Card */}
      <motion.div variants={itemVariants} className="admin-welcome-banner animated-border-glow" style={{ position: 'relative' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.6rem', color: 'var(--primary-gold)', fontFamily: 'var(--font-serif)', margin: 0, fontWeight: 700 }}>
              🌐 Website Viewers & Devotee Traffic
            </h2>
            <span style={{ 
              background: 'rgba(74, 222, 128, 0.15)', 
              color: '#4ade80', 
              border: '1px solid rgba(74, 222, 128, 0.3)', 
              fontSize: '0.72rem', 
              fontWeight: 700, 
              padding: '2px 8px', 
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} /> Live Synced
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', maxWidth: '750px', lineHeight: '1.6' }}>
            Comprehensive analytics of devotees visiting the Temple portal from <strong style={{ color: '#4ade80' }}>India (Domestic)</strong> and <strong style={{ color: '#60a5fa' }}>Other Countries (International Global Devotees)</strong>.
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginTop: isMobile ? '0.75rem' : 0 }}>
          <button
            onClick={handleSimulateIndia}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', padding: '8px 14px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ade80', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            title="Simulate a real-time visit from India"
          >
            <span>🇮🇳</span> + Simulate India Devotee
          </button>
          <button
            onClick={handleSimulateGlobal}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', padding: '8px 14px', background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.3)', color: '#60a5fa', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            title="Simulate a real-time visit from USA/Abroad"
          >
            <span>🌍</span> + Simulate Global Devotee
          </button>
          <button
            onClick={handleExportCSV}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            title="Download full CSV spreadsheet"
          >
            <span>📥</span> Export CSV
          </button>
          <button
            onClick={() => { loadAll(); showToast('Viewers data refreshed! 🔄') }}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
            title="Refresh from Firebase"
          >
            🔄
          </button>
        </div>
      </motion.div>

      {/* 4 Stat Overview Cards */}
      <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '0.75rem' : '1.25rem' }}>
        
        {/* Total Hits */}
        <motion.div variants={itemVariants} className="premium-stat-card" style={{ '--card-accent': '#D4AF37', '--icon-bg': 'rgba(212, 175, 55, 0.1)' }}>
          <div className="stat-card-header">
            <span className="stat-card-label">Total Website Viewers</span>
            <div className="stat-card-icon-wrapper">👥</div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--primary-gold)' }}>{stats.total.toLocaleString()}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>All recorded devotee sessions</span>
          </div>
        </motion.div>

        {/* India Domestic */}
        <motion.div 
          variants={itemVariants} 
          className="premium-stat-card" 
          style={{ 
            '--card-accent': '#4ade80', 
            '--icon-bg': 'rgba(74, 222, 128, 0.1)',
            cursor: 'pointer',
            borderColor: filterType === 'india' ? '#4ade80' : undefined
          }}
          onClick={() => { setFilterType('india'); setSelectedCountry(null); setCurrentPage(1); }}
        >
          <div className="stat-card-header">
            <span className="stat-card-label">🇮🇳 India Viewers</span>
            <div className="stat-card-icon-wrapper">🕉️</div>
          </div>
          <div className="stat-card-value" style={{ color: '#4ade80' }}>
            {stats.indiaCount.toLocaleString()} 
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: '6px' }}>
              ({stats.indiaPct}%)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.75rem', color: '#4ade80' }}>
            <span>Domestic Traffic (AP, TG, KA, TN...)</span>
          </div>
        </motion.div>

        {/* Other Countries International */}
        <motion.div 
          variants={itemVariants} 
          className="premium-stat-card" 
          style={{ 
            '--card-accent': '#60a5fa', 
            '--icon-bg': 'rgba(96, 165, 250, 0.1)',
            cursor: 'pointer',
            borderColor: filterType === 'other' ? '#60a5fa' : undefined
          }}
          onClick={() => { setFilterType('other'); setSelectedCountry(null); setCurrentPage(1); }}
        >
          <div className="stat-card-header">
            <span className="stat-card-label">🌍 Other Countries</span>
            <div className="stat-card-icon-wrapper">✈️</div>
          </div>
          <div className="stat-card-value" style={{ color: '#60a5fa' }}>
            {stats.otherCount.toLocaleString()}
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: '6px' }}>
              ({stats.otherPct}%)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.75rem', color: '#60a5fa' }}>
            <span>International (USA, UAE, UK, SG...)</span>
          </div>
        </motion.div>

        {/* Today's Active */}
        <motion.div variants={itemVariants} className="premium-stat-card" style={{ '--card-accent': '#f472b6', '--icon-bg': 'rgba(244, 114, 182, 0.1)' }}>
          <div className="stat-card-header">
            <span className="stat-card-label">Active In 24h</span>
            <div className="stat-card-icon-wrapper">⚡</div>
          </div>
          <div className="stat-card-value" style={{ color: '#f472b6' }}>{stats.todayCount}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Today's active devotees</span>
          </div>
        </motion.div>

      </motion.div>

      {/* Traffic Proportion Visual Bar & Country Chips */}
      <motion.div variants={itemVariants} className="activity-feed-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span>📊</span> India vs Other Countries Traffic Ratio
          </h3>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
            <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#4ade80' }} />
              <strong>India: {stats.indiaPct}%</strong> ({stats.indiaCount})
            </span>
            <span style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#60a5fa' }} />
              <strong>Other Countries: {stats.otherPct}%</strong> ({stats.otherCount})
            </span>
          </div>
        </div>

        {/* Segmented Visual Bar */}
        <div style={{ width: '100%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', display: 'flex', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}>
          <div 
            style={{ 
              width: `${stats.indiaPct || 0}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #22c55e, #4ade80)', 
              transition: 'width 0.6s ease' 
            }} 
            title={`India: ${stats.indiaCount} (${stats.indiaPct}%)`}
          />
          <div 
            style={{ 
              width: `${stats.otherPct || 0}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', 
              transition: 'width 0.6s ease' 
            }} 
            title={`Other Countries: ${stats.otherCount} (${stats.otherPct}%)`}
          />
        </div>

        {/* Country Quick-Filter Pills */}
        <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Filter by Country:
          </span>
          <button
            onClick={() => { setSelectedCountry(null); setCurrentPage(1); }}
            style={{
              background: selectedCountry === null ? 'var(--primary-gold)' : 'rgba(255,255,255,0.05)',
              color: selectedCountry === null ? 'var(--dark-slate)' : 'var(--text-light)',
              border: selectedCountry === null ? 'none' : '1px solid var(--glass-border)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            🌐 All ({visitors.length})
          </button>
          {stats.topCountries.map((c) => (
            <button
              key={c.country}
              onClick={() => { 
                setSelectedCountry(selectedCountry === c.country ? null : c.country)
                setCurrentPage(1)
              }}
              style={{
                background: selectedCountry === c.country 
                  ? (c.isIndia ? '#4ade80' : '#60a5fa') 
                  : 'rgba(255,255,255,0.05)',
                color: selectedCountry === c.country ? '#0d1117' : 'var(--text-light)',
                border: selectedCountry === c.country ? 'none' : '1px solid var(--glass-border)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s',
              }}
            >
              <span>{c.flag}</span>
              <span>{c.country}</span>
              <span style={{ 
                background: selectedCountry === c.country ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)', 
                padding: '1px 6px', 
                borderRadius: '10px', 
                fontSize: '0.68rem' 
              }}>
                {c.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Filter Tabs & Search Controls */}
      <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Main Segmented Control: All / India / Other */}
          <div style={{ display: 'flex', background: 'rgba(22, 27, 34, 0.8)', padding: '4px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
            <button
              onClick={() => { setFilterType('all'); setSelectedCountry(null); setCurrentPage(1); }}
              style={{
                background: filterType === 'all' ? 'var(--primary-gold)' : 'transparent',
                color: filterType === 'all' ? 'var(--dark-slate)' : 'var(--text-muted)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              🌐 All Viewers ({visitors.length})
            </button>
            <button
              onClick={() => { setFilterType('india'); setSelectedCountry(null); setCurrentPage(1); }}
              style={{
                background: filterType === 'india' ? '#4ade80' : 'transparent',
                color: filterType === 'india' ? '#0d1117' : 'var(--text-muted)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
              }}
            >
              <span>🇮🇳</span> India Only ({stats.indiaCount})
            </button>
            <button
              onClick={() => { setFilterType('other'); setSelectedCountry(null); setCurrentPage(1); }}
              style={{
                background: filterType === 'other' ? '#60a5fa' : 'transparent',
                color: filterType === 'other' ? '#0d1117' : 'var(--text-muted)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
              }}
            >
              <span>🌍</span> Other Countries ({stats.otherCount})
            </button>
          </div>

          {/* Search and Dropdowns */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', flex: isMobile ? '1 1 100%' : 'initial' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '240px', flex: 1 }}>
              <input
                type="text"
                placeholder="Search city, state, country, IP..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  borderRadius: '8px',
                  background: 'rgba(22, 27, 34, 0.9)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-light)',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '0.85rem' }}>
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Time Filter */}
            <select
              value={timeRange}
              onChange={(e) => { setTimeRange(e.target.value); setCurrentPage(1); }}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(22, 27, 34, 0.9)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-light)',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              <option value="all">🕒 All Time</option>
              <option value="today">⚡ Last 24 Hours</option>
              <option value="7days">📅 Last 7 Days</option>
            </select>

            {/* Page Filter */}
            <select
              value={pageFilter}
              onChange={(e) => { setPageFilter(e.target.value); setCurrentPage(1); }}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(22, 27, 34, 0.9)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-light)',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              <option value="all">📄 All Pages</option>
              <option value="/">Home Page</option>
              <option value="/events">Events</option>
              <option value="/gallery">Media Gallery</option>
              <option value="/services">Services / Annadaanam</option>
              <option value="/history">History</option>
              <option value="/about">Trust / 12A</option>
              <option value="/founder">Founder</option>
              <option value="/activities">Activities</option>
            </select>

          </div>

        </div>

      </motion.div>

      {/* Main Viewers Table / Responsive Cards */}
      <motion.div variants={itemVariants} className="activity-feed-card" style={{ padding: 0, overflow: 'hidden' }}>
        
        {/* Table Header / Summary */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-light)' }}>
            Showing <span style={{ color: 'var(--primary-gold)' }}>{filteredVisitors.length}</span> recorded viewer sessions
            {selectedCountry && <span style={{ color: '#60a5fa', marginLeft: '6px' }}>in {selectedCountry}</span>}
            {filterType === 'india' && <span style={{ color: '#4ade80', marginLeft: '6px' }}>(India Only)</span>}
            {filterType === 'other' && <span style={{ color: '#60a5fa', marginLeft: '6px' }}>(Other Countries Only)</span>}
          </div>
          {visitors.length > 0 && (
            <button
              onClick={handleClear}
              style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.75rem', cursor: 'pointer', opacity: 0.8, textDecoration: 'underline' }}
            >
              Clear Logs
            </button>
          )}
        </div>

        {filteredVisitors.length === 0 ? (
          <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
            <h4 style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>No Viewers Found</h4>
            <p style={{ fontSize: '0.85rem' }}>No recorded visits matching your active filter criteria.</p>
            <button
              onClick={() => { setFilterType('all'); setSelectedCountry(null); setSearchQuery(''); setTimeRange('all'); setPageFilter('all'); }}
              className="btn-secondary"
              style={{ marginTop: '1rem', fontSize: '0.8rem', padding: '6px 14px' }}
            >
              Reset All Filters
            </button>
          </div>
        ) : isMobile ? (
          /* Mobile Card View */
          <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {paginatedVisitors.map((v, i) => {
              const isInd = v.isIndia || v.countryCode === 'IN' || (v.country && v.country.toLowerCase() === 'india')
              const flag = getCountryFlag(v.countryCode || (isInd ? 'IN' : 'UN'))

              return (
                <div 
                  key={v.id || i}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.4rem' }}>{flag}</span>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{v.country || 'India'}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.city || 'Inagalore / Kadapa'}, {v.region || ''}</div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: isInd ? 'rgba(74, 222, 128, 0.15)' : 'rgba(96, 165, 250, 0.15)',
                      color: isInd ? '#4ade80' : '#60a5fa',
                      border: `1px solid ${isInd ? 'rgba(74,222,128,0.3)' : 'rgba(96,165,250,0.3)'}`
                    }}>
                      {isInd ? '🇮🇳 India' : '🌍 Global'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <span>📄 {v.page || '/'}</span>
                    <span>💻 {v.device || 'Mobile'} • {v.browser || 'Chrome'}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontFamily: 'monospace', opacity: 0.7 }}>{v.ip || '103.112.54.21'}</span>
                    <span style={{ color: 'var(--primary-gold)' }}>🕒 {formatTimeAgo(v.timestamp || v.createdAt)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Desktop Table View */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px' }}>Country / Region</th>
                  <th style={{ padding: '12px 16px' }}>Origin Category</th>
                  <th style={{ padding: '12px 16px' }}>Location (City & State)</th>
                  <th style={{ padding: '12px 16px' }}>Page Viewed</th>
                  <th style={{ padding: '12px 16px' }}>Device & Client</th>
                  <th style={{ padding: '12px 16px' }}>IP Address</th>
                  <th style={{ padding: '12px 16px' }}>Time Visited</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVisitors.map((v, i) => {
                  const isInd = v.isIndia || v.countryCode === 'IN' || (v.country && v.country.toLowerCase() === 'india')
                  const flag = getCountryFlag(v.countryCode || (isInd ? 'IN' : 'UN'))

                  return (
                    <tr 
                      key={v.id || i}
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.04)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Country & Flag */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.3rem' }}>{flag}</span>
                          <div>
                            <strong style={{ color: 'var(--text-light)', display: 'block' }}>{v.country || 'India'}</strong>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{v.countryCode || (isInd ? 'IN' : 'UN')}</span>
                          </div>
                        </div>
                      </td>

                      {/* Origin Badge */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: isInd ? 'rgba(74, 222, 128, 0.12)' : 'rgba(96, 165, 250, 0.12)',
                          color: isInd ? '#4ade80' : '#60a5fa',
                          border: `1px solid ${isInd ? 'rgba(74,222,128,0.25)' : 'rgba(96,165,250,0.25)'}`
                        }}>
                          {isInd ? '🇮🇳 India (Domestic)' : '🌍 International'}
                        </span>
                      </td>

                      {/* City & Region */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ color: 'var(--text-light)', fontWeight: 500 }}>
                          {v.city || 'Inagalore / Kadapa'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {v.region || 'Andhra Pradesh'}
                        </div>
                      </td>

                      {/* Page */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: 'var(--text-light)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace'
                        }}>
                          {v.page || '/'}
                        </span>
                        {v.pageTitle && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '3px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {v.pageTitle}
                          </div>
                        )}
                      </td>

                      {/* Device & Browser */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                          <span>{v.device === 'Mobile' ? '📱' : v.device === 'Tablet' ? '📟' : '💻'}</span>
                          <span>{v.device || 'Mobile'}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {v.os || 'OS'} • {v.browser || 'Browser'}
                        </div>
                      </td>

                      {/* IP */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                          {v.ip || '103.112.54.21'}
                        </span>
                      </td>

                      {/* Time */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ color: 'var(--primary-gold)', fontWeight: 600, fontSize: '0.78rem' }}>
                          {formatTimeAgo(v.timestamp || v.createdAt)}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {new Date(v.timestamp || v.createdAt || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Page {currentPage} of {totalPages}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                ◀ Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .map((p, idx, arr) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.75rem',
                      borderRadius: '6px',
                      background: currentPage === p ? 'var(--primary-gold)' : 'rgba(255,255,255,0.05)',
                      color: currentPage === p ? 'var(--dark-slate)' : 'var(--text-light)',
                      border: '1px solid var(--glass-border)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {p}
                  </button>
                ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next ▶
              </button>
            </div>
          </div>
        )}

      </motion.div>

    </motion.div>
  )
}
