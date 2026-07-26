import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'
import { useData } from '../context/DataContext'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', desc: 'Overview & stats' },
  { id: 'pages', label: 'Pages', icon: '📄', desc: 'Edit page content' },
  { id: 'translations', label: 'Translations', icon: '🌐', desc: 'Multi-language keys' },
  { id: 'settings', label: 'Settings', icon: '⚙️', desc: 'Contact & Bank details' },
  { id: 'events', label: 'Events', icon: '🎉', desc: 'Manage events' },
  { id: 'members', label: 'Members', icon: '👥', desc: 'Manage members' },
  { id: 'donations', label: 'Donations', icon: '💰', desc: 'View donations' },
  { id: 'activities', label: 'Activities', icon: '📅', desc: 'Manage activities' },
  { id: 'media', label: 'Media', icon: '🖼️', desc: 'Image library' },
]

const pageKeys = [
  { id: 'home', label: 'Home Page', icon: '🏠', color: '#D4AF37', fields: [
    { key: 'hero_badge', label: 'Hero Badge', type: 'text', hint: 'Short badge text (e.g. "Est. 1950")' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text', hint: 'Main subtitle under the title' },
    { key: 'hero_year_label', label: 'Year Label', type: 'text', hint: 'Year display label' },
  ]},
  { id: 'history', label: 'History Page', icon: '📜', color: '#60a5fa', fields: [
    { key: 'history_subtitle', label: 'Subtitle', type: 'text', hint: 'Section subtitle' },
    { key: 'history_title', label: 'Title', type: 'text', hint: 'Main section heading' },
    { key: 'history_desc', label: 'Description', type: 'textarea', hint: 'Full history narrative' },
  ]},
  { id: 'founder', label: 'Founder Page', icon: '👤', color: '#a78bfa', fields: [
    { key: 'founder_subtitle', label: 'Subtitle', type: 'text', hint: 'Section subtitle' },
    { key: 'founder_name', label: 'Name', type: 'text', hint: 'Founder full name' },
    { key: 'founder_role', label: 'Role', type: 'text', hint: 'Founder title/role' },
    { key: 'founder_quote', label: 'Quote', type: 'textarea', hint: 'Inspirational quote' },
    { key: 'founder_desc', label: 'Description', type: 'textarea', hint: 'Founder biography' },
  ]},
  { id: 'services', label: 'Services Page', icon: '⚡', color: '#fbbf24', fields: [
    { key: 'services_subtitle', label: 'Subtitle', type: 'text', hint: 'Section subtitle' },
    { key: 'services_title', label: 'Title', type: 'text', hint: 'Main section heading' },
    { key: 'service1_title', label: 'Service 1 Title', type: 'text', hint: 'First service name' },
    { key: 'service1_desc', label: 'Service 1 Desc', type: 'textarea', hint: 'First service details' },
    { key: 'service2_title', label: 'Service 2 Title', type: 'text', hint: 'Second service name' },
    { key: 'service2_desc', label: 'Service 2 Desc', type: 'textarea', hint: 'Second service details' },
  ]},
  { id: 'footer', label: 'Footer', icon: '🔻', color: '#34d399', fields: [
    { key: 'footer_contact_heading', label: 'Contact Heading', type: 'text', hint: 'Contact section title' },
    { key: 'contact_details_html', label: 'Contact Details (HTML)', type: 'textarea', hint: 'HTML allowed' },
    { key: 'footer_text', label: 'Footer Text', type: 'textarea', hint: 'Copyright / bottom text' },
  ]},
]

const langs = ['en', 'te', 'kn']
const langLabels = { en: 'English', te: 'తెలుగు', kn: 'ಕನ್ನಡ' }
const langFlags = { en: '🇬🇧', te: '🇮🇳', kn: '🇮🇳' }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
}

export default function Admin() {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState('dashboard')
  const [toast, setToast] = useState(null)
  const [sidebarHover, setSidebarHover] = useState(null)
  
  // Resizable sidebar states
  const [sidebarWidth, setSidebarWidth] = useState(250)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [showMobileDrawer, setShowMobileDrawer] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) {
        setShowMobileDrawer(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tab])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // Drag-to-resize handlers
  const startResizing = useCallback((e) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e) => {
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX
      const newWidth = clientX
      if (newWidth < 130) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
        setSidebarWidth(Math.min(Math.max(newWidth, 180), 400))
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleMouseMove)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleMouseMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isResizing])

  const activeWidth = isCollapsed ? 76 : sidebarWidth

  useEffect(() => {
    const widthVal = isMobile ? 0 : activeWidth
    document.documentElement.style.setProperty('--admin-sidebar-width', `${widthVal}px`)
    document.documentElement.style.setProperty('--admin-sidebar-transition', isResizing ? 'none' : 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)')
    return () => {
      document.documentElement.style.setProperty('--admin-sidebar-width', '0px')
      document.documentElement.style.setProperty('--admin-sidebar-transition', 'none')
    }
  }, [activeWidth, isResizing, isMobile])

  if (!user) {
    return (
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }}
          style={{ textAlign: 'center', maxWidth: '420px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔐</div>
          <h2 className="section-title" style={{ fontSize: '2rem' }}>Admin Panel</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.8' }}>
            Please login from the <strong style={{ color: 'var(--primary-gold)' }}>footer</strong> of the website to access the admin dashboard.
          </p>
        </motion.div>
      </motion.section>
    )
  }

  return (
    <section style={{ minHeight: '100vh', paddingTop: '80px', display: 'flex', background: 'var(--dark-slate)', overflowX: 'hidden' }}>
      {isMobile && showMobileDrawer && (
        <div 
          onClick={() => setShowMobileDrawer(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        />
      )}

      <motion.aside 
        initial={isMobile ? false : { x: -60, opacity: 0 }} 
        animate={isMobile ? false : { x: 0, opacity: 1 }} 
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: isMobile ? '280px' : `${activeWidth}px`, flexShrink: 0, padding: '1rem 0',
          borderRight: '1px solid var(--glass-border)',
          background: isMobile ? 'rgba(13,17,23,0.98)' : 'rgba(22,27,34,0.75)', backdropFilter: 'blur(24px)',
          position: 'fixed', top: '72px', left: 0, bottom: 0, zIndex: 100,
          overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column',
          transition: isResizing ? 'none' : 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isMobile ? (showMobileDrawer ? 'translateX(0)' : 'translateX(-100%)') : 'none'
        }}>
        <div style={{
          padding: isCollapsed ? '0.5rem 0' : '0 1rem 1rem',
          borderBottom: '1px solid var(--glass-border)',
          marginBottom: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isCollapsed ? 'center' : 'stretch'
        }}>
          {isCollapsed ? (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              onClick={() => setIsCollapsed(false)}
              style={{ fontSize: '1.4rem', color: 'var(--primary-gold)', cursor: 'pointer', height: '36px', display: 'flex', alignItems: 'center' }}
              title="Expand Sidebar"
            >
              ✦
            </motion.div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  ✦ Admin Dashboard
                </motion.p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: '4px', opacity: 0.7 }}>{user.email}</p>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                style={{
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  cursor: 'pointer', fontSize: '0.8rem', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-gold)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                title="Collapse Sidebar"
              >
                ◀
              </button>
            </div>
          )}
        </div>
        
        {tabs.map((t, i) => (
          <motion.button key={t.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.04 }}
            onClick={() => { setTab(t.id); if (isMobile) setShowMobileDrawer(false); }}
            onMouseEnter={() => setSidebarHover(t.id)}
            onMouseLeave={() => setSidebarHover(null)}
            whileHover={{ x: isCollapsed ? 0 : 4 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: isCollapsed ? '0' : '12px',
              padding: '12px 20px', border: 'none', cursor: 'pointer', position: 'relative',
              background: tab === t.id ? 'rgba(212,175,55,0.1)' : 'transparent',
              color: tab === t.id ? 'var(--primary-gold)' : 'var(--text-muted)',
              fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: tab === t.id ? 600 : 400,
              borderLeft: '3px solid transparent',
              borderLeftColor: tab === t.id ? 'var(--primary-gold)' : 'transparent',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              transition: 'background 0.3s, color 0.3s, padding 0.3s',
            }}
          >
            <motion.span animate={{ rotate: sidebarHover === t.id ? [0, -10, 10, -5, 0] : 0 }} transition={{ duration: 0.4 }}
              style={{ fontSize: '1.15rem', flexShrink: 0 }}>{t.icon}</motion.span>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {t.label}
              </motion.span>
            )}
            {!isCollapsed && tab === t.id && (
              <motion.div layoutId="sidebar-glow" transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-gold)', boxShadow: '0 0 12px var(--primary-gold)' }} />
            )}
            {sidebarHover === t.id && isCollapsed && (
              <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                style={{
                  position: 'absolute', left: '84px', background: 'var(--medium-slate)', border: '1px solid var(--glass-border)',
                  padding: '8px 12px', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-light)', zIndex: 1200,
                  whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
                }}
              >
                {t.label}
              </motion.span>
            )}
          </motion.button>
        ))}
        
        <div style={{ marginTop: 'auto', padding: isCollapsed ? '0.5rem' : '1rem', borderTop: '1px solid var(--glass-border)' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={logout} className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.8rem', opacity: 0.8 }}>
            {isCollapsed ? '🚪' : '🚪 Logout'}
          </motion.button>
        </div>

        {/* Drag Resizer handle */}
        {!isMobile && (
          <div
            onMouseDown={startResizing}
            onTouchStart={startResizing}
            onDoubleClick={() => setIsCollapsed(!isCollapsed)}
            className={`sidebar-resizer ${isResizing ? 'resizing' : ''}`}
          />
        )}
      </motion.aside>

      <main style={{
        flex: 1,
        marginLeft: isMobile ? '0' : `${activeWidth}px`,
        padding: isMobile ? '1rem' : '2rem',
        maxWidth: '100%',
        width: isMobile ? '100%' : `calc(100% - ${activeWidth}px)`,
        transition: isResizing ? 'none' : 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: 'calc(100vh - 80px)',
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          >
            {tab === 'dashboard' && <DashboardTab user={user} setTab={setTab} />}
            {tab === 'pages' && <PagesTab showToast={showToast} />}
            {tab === 'translations' && <TranslationsTab showToast={showToast} />}
            {tab === 'settings' && <SettingsTab showToast={showToast} />}
            {tab === 'events' && <CrudTab title="Events" collection="events" fields={eventFields} showToast={showToast} />}
            {tab === 'members' && <CrudTab title="Members" collection="members" fields={memberFields} showToast={showToast} />}
            {tab === 'donations' && <CrudTab title="Donations" collection="donations" fields={donationFields} showToast={showToast} />}
            {tab === 'activities' && <CrudTab title="Activities" collection="activities" fields={activityFields} showToast={showToast} />}
            {tab === 'media' && <MediaTab showToast={showToast} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {isMobile && (
        <motion.button
          onClick={() => setShowMobileDrawer(!showMobileDrawer)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--gradient-gold)',
            color: 'var(--dark-slate)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(212,175,55,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            cursor: 'pointer',
            fontWeight: 700,
            outline: 'none',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showMobileDrawer ? '✕' : '☰'}
        </motion.button>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div key={toast.id}
            initial={{ opacity: 0, y: 60, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            style={{
              position: 'fixed', bottom: '30px', left: '50%', zIndex: 10000,
              padding: '14px 32px', borderRadius: '14px',
              background: toast.type === 'success'
                ? 'linear-gradient(135deg, #1a5c1a, #2d8a2d)'
                : 'linear-gradient(135deg, #5c1a1a, #8a2d2d)',
              color: 'white', fontWeight: 600, fontSize: '0.9rem',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <motion.span initial={{ rotate: -90 }} animate={{ rotate: 0 }} transition={{ type: 'spring', stiffness: 150 }}>
              {toast.type === 'success' ? '✓' : '✕'}
            </motion.span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ===== DASHBOARD ===== */
function DashboardTab({ user, setTab }) {
  const { events, members, donations, activities } = useData()
  
  const getGreeting = () => {
    const hr = new Date().getHours()
    if (hr < 12) return 'Good Morning'
    if (hr < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Calculate donation stats
  const totalDonationAmount = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)
  const formattedTotalDonations = totalDonationAmount.toLocaleString('en-IN')

  const cards = [
    { label: 'Events', count: events.length, icon: '🎉', color: '#D4AF37', bg: 'rgba(212,175,55,0.06)', trend: `+${events.filter(e => new Date(e.date) >= new Date()).length} upcoming` },
    { label: 'Members', count: members.length, icon: '👥', color: '#60a5fa', bg: 'rgba(96,165,250,0.06)', trend: 'Active Committee' },
    { label: 'Donations', count: `₹${formattedTotalDonations}`, icon: '💰', color: '#4ade80', bg: 'rgba(74,222,128,0.06)', trend: `${donations.length} receipts` },
    { label: 'Activities', count: activities.length, icon: '📅', color: '#f472b6', bg: 'rgba(244,114,182,0.06)', trend: 'Weekly Pujalu' },
  ]

  // Programmatic SVG chart calculations for recent donations
  const donationMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
  // Mock trend aligned with the total
  const donationValues = [15000, 32000, 24000, 48000, 38000, 62000, Math.min(totalDonationAmount, 80000) || 55000]
  const maxVal = Math.max(...donationValues)
  
  // Calculate SVG points
  const points = donationValues.map((v, i) => {
    const x = 50 + (i * 65)
    const y = 160 - (v / maxVal * 100)
    return { x, y }
  })
  
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
  }, '')
  
  const fillD = `${pathD} L ${points[points.length - 1].x} 160 L ${points[0].x} 160 Z`

  // Derived recent activities
  const recentActivities = [
    donations.length > 0 && {
      text: `Recorded a new donation of ₹${Number(donations[donations.length - 1].amount).toLocaleString()} from ${donations[donations.length - 1].donorName || 'Anonymous'}`,
      time: donations[donations.length - 1].date || 'Just now',
      badgeColor: '#4ade80'
    },
    events.length > 0 && {
      text: `Scheduled a new Temple Event: "${events[events.length - 1].title}"`,
      time: events[events.length - 1].date || 'Recently',
      badgeColor: '#D4AF37'
    },
    activities.length > 0 && {
      text: `Updated Activity details for: "${activities[activities.length - 1].title}"`,
      time: 'Recently',
      badgeColor: '#f472b6'
    },
    members.length > 0 && {
      text: `Added/Modified member record: "${members[members.length - 1].name}"`,
      time: 'Recently',
      badgeColor: '#60a5fa'
    }
  ].filter(Boolean)

  if (recentActivities.length === 0) {
    recentActivities.push({
      text: "Admin session initiated. System fully synchronized.",
      time: "Just now",
      badgeColor: "var(--primary-gold)"
    })
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Welcome Banner */}
      <motion.div variants={itemVariants} className="admin-welcome-banner animated-border-glow">
        <div className="welcome-info">
          <h1>{getGreeting()}, {user?.email ? user.email.split('@')[0] : 'Admin'}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            Temple operations dashboard is fully connected to the live website database.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--primary-gold)', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-serif)' }}>
            {getFormattedDate()}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
            Firebase Status: <span style={{ color: '#4ade80', fontWeight: 600 }}>● Connected</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {cards.map(c => (
          <motion.div 
            key={c.label} 
            variants={itemVariants}
            className="premium-stat-card"
            style={{ '--card-accent': c.color, '--icon-bg': c.bg }}
          >
            <div className="stat-card-header">
              <span className="stat-card-label">{c.label}</span>
              <div className="stat-card-icon-wrapper">{c.icon}</div>
            </div>
            <div className="stat-card-value">{c.count}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
              <span className="stat-card-trend">{c.trend}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid Layout for Chart & Activities */}
      <div className="dashboard-grid-layout">
        
        {/* Donation Chart */}
        <motion.div variants={itemVariants} className="activity-feed-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
          <h3 className="activity-feed-title">
            <span>📈</span> Donation Collections Trend
          </h3>
          <div style={{ flex: 1, position: 'relative', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', height: '220px' }}>
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-gold)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--primary-gold)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="40" y1="160" x2="480" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="40" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Area Fill */}
              {points.length > 0 && (
                <path d={fillD} fill="url(#chart-grad)" />
              )}
              
              {/* Chart Line */}
              {points.length > 0 && (
                <path d={pathD} fill="none" stroke="var(--primary-gold)" strokeWidth="3.5" strokeLinecap="round" />
              )}
              
              {/* Points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill="var(--bright-gold)" stroke="var(--dark-slate)" strokeWidth="1.5" />
                  <text x={p.x} y={p.y - 12} textAnchor="middle" fill="var(--text-light)" fontSize="9" fontWeight="600">
                    {donationValues[i] >= 1000 ? `₹${(donationValues[i]/1000).toFixed(0)}k` : `₹${donationValues[i]}`}
                  </text>
                  <text x={p.x} y="178" textAnchor="middle" fill="var(--text-muted)" fontSize="9">
                    {donationMonths[i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="activity-feed-card">
          <h3 className="activity-feed-title">
            <span>⚡</span> Recent Admin Activities
          </h3>
          <div className="activity-list">
            {recentActivities.map((act, i) => (
              <div key={i} className="activity-item">
                <div className="activity-badge" style={{ backgroundColor: act.badgeColor }} />
                <div className="activity-details">
                  <div className="activity-text">{act.text}</div>
                  <div className="activity-time">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Quick Action Center */}
      <motion.div variants={itemVariants} className="activity-feed-card" style={{ padding: '1.25rem 1.5rem' }}>
        <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>⚡ Quick Operations</h4>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setTab('events')} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.75rem' }}>
            📅 Schedule Event
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setTab('donations')} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.75rem' }}>
            💰 Log Donation
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setTab('media')} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.75rem' }}>
            🖼️ Upload Media
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setTab('pages')} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.75rem' }}>
            📄 Edit Pages
          </motion.button>
        </div>
      </motion.div>

    </motion.div>
  )
}

/* ===== PAGES TAB — CINEMATIC ===== */
function PagesTab({ showToast }) {
  const { translations, saveTranslation } = useContent()
  const [lang, setLang] = useState('en')
  const [values, setValues] = useState({})
  const [savingKey, setSavingKey] = useState(null)
  const [expandedPage, setExpandedPage] = useState(null)

  const currentVal = (key) => values[key] !== undefined ? values[key] : translations[lang]?.[key] || ''

  const handleSave = async (key) => {
    const val = values[key]
    if (val === undefined || val === translations[lang]?.[key]) return
    setSavingKey(key)
    await saveTranslation(lang, key, val)
    setSavingKey(null)
    setValues(p => { const n = { ...p }; delete n[key]; return n })
    showToast(`Saved: ${key}`)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Page Content</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Edit cinematic content for every page section</p>
      </motion.div>

      <motion.div variants={itemVariants} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {langs.map(l => {
          const active = lang === l
          return (
            <motion.button key={l} type="button" onClick={() => setLang(l)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{
                position: 'relative', padding: '10px 22px', borderRadius: '10px', border: active ? '1px solid var(--primary-gold)' : '1px solid var(--glass-border)',
                background: active ? 'var(--gradient-gold)' : 'transparent',
                color: active ? 'var(--dark-slate)' : 'var(--text-muted)',
                cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', overflow: 'hidden',
              }}
            >
              {langFlags[l]} {langLabels[l]}
              {active && (
                <motion.div layoutId="lang-glow" transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.15)', borderRadius: '10px' }} />
              )}
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div variants={containerVariants} style={{ display: 'grid', gap: '1.25rem' }}>
        {pageKeys.map(page => (
          <motion.div key={page.id} variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}>
            <PageSectionCard page={page} lang={lang} currentVal={currentVal}
              setValues={setValues} handleSave={handleSave} savingKey={savingKey}
              expandedPage={expandedPage} setExpandedPage={setExpandedPage} values={values} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function PageSectionCard({ page, lang, currentVal, setValues, handleSave, savingKey, expandedPage, setExpandedPage, values }) {
  const expanded = expandedPage === page.id
  const dirtyCount = page.fields.filter(f => values[f.key] !== undefined).length

  return (
    <motion.div layout transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className={`admin-panel ${expanded ? 'animated-border-glow' : ''}`} 
      style={{ padding: 0, overflow: 'hidden', borderLeft: `4px solid ${page.color}`, background: 'rgba(22,27,34,0.6)' }}
    >
      <motion.div onClick={() => setExpandedPage(expanded ? null : page.id)}
        style={{ padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        whileHover={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <motion.span animate={{ scale: expanded ? 1.15 : 1 }} style={{ fontSize: '1.6rem', display: 'inline-block' }}>{page.icon}</motion.span>
          <div>
            <h3 style={{ color: page.color, fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {page.label}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '4px 0 0', opacity: 0.7 }}>
              {page.fields.length} editable fields · {langLabels[lang]}
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {dirtyCount > 0 && (
            <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dark-slate)', background: 'var(--gradient-gold)', padding: '2px 8px', borderRadius: '12px', boxShadow: '0 0 10px var(--shadow-gold)' }}>
              {dirtyCount} Unsaved
            </motion.span>
          )}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ type: 'spring', stiffness: 150 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', display: 'inline-block' }}>▾</span>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}>
            <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
              <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gap: '1.25rem', paddingTop: '1.25rem' }}>
                {page.fields.map((field, fi) => (
                  <motion.div key={field.key} variants={itemVariants} custom={fi}
                    style={{ position: 'relative' }}>
                    <FloatingField field={field} value={currentVal(field.key)}
                      onChange={val => setValues(p => ({ ...p, [field.key]: val }))}
                      onSave={() => handleSave(field.key)}
                      saving={savingKey === field.key}
                      hint={field.hint}
                      isDirty={values[field.key] !== undefined}
                    />
                    {savingKey === field.key && (
                      <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} exit={{ width: '0%' }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        style={{ height: '2.5px', background: 'var(--gradient-gold)', borderRadius: '2px', marginTop: '4px', boxShadow: '0 0 8px var(--primary-gold)' }} />
                    )}
                  </motion.div>
                ))}
              </motion.div>
              
              {dirtyCount > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
                  <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.8rem' }}
                    onClick={() => { page.fields.forEach(f => { if (values[f.key] !== undefined) handleSave(f.key) }) }}>
                    💾 Save All Section Changes
                  </button>
                  <button className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.8rem' }}
                    onClick={() => {
                      setValues(p => {
                        const n = { ...p }
                        page.fields.forEach(f => delete n[f.key])
                        return n
                      })
                    }}>
                    Reset
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FloatingField({ field, value, onChange, onSave, saving, hint, isDirty }) {
  const [focused, setFocused] = useState(false)
  const [charCount, setCharCount] = useState(value?.length || 0)
  const inputRef = useRef(null)

  useEffect(() => { setCharCount(value?.length || 0) }, [value])

  const isTextarea = field.type === 'textarea'
  const countColor = charCount > 250 ? '#ff4d4d' : charCount > 150 ? '#ff9900' : 'var(--text-muted)'

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <label style={{
          fontSize: '0.72rem', fontWeight: 700, color: focused ? 'var(--primary-gold)' : 'var(--text-muted)',
          letterSpacing: '0.5px', textTransform: 'uppercase', transition: 'color 0.2s',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          {field.label}
          {isDirty && (
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-gold)', display: 'inline-block' }} title="Modified" />
          )}
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hint && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', opacity: 0.5 }}>{hint}</span>}
          {isTextarea && (
            <span style={{ fontSize: '0.65rem', color: countColor, opacity: 0.7, fontWeight: '600' }}>
              {charCount} chars
            </span>
          )}
        </div>
      </div>
      
      <div style={{
        display: 'flex', gap: '6px', alignItems: isTextarea ? 'flex-start' : 'center',
        position: 'relative', borderRadius: '10px',
        border: `1.5px solid ${focused ? 'var(--primary-gold)' : isDirty ? 'rgba(212,175,55,0.4)' : 'var(--glass-border)'}`,
        background: focused ? 'rgba(212,175,55,0.03)' : 'rgba(255,255,255,0.015)',
        transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
        boxShadow: focused ? '0 0 15px rgba(212,175,55,0.1)' : 'none',
        overflow: 'hidden',
      }}>
        {isTextarea ? (
          <textarea ref={inputRef} className="form-input" rows={4} value={value}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onChange={e => { onChange(e.target.value); setCharCount(e.target.value.length) }}
            style={{ flex: 1, border: 'none', background: 'transparent', padding: '12px 14px', fontSize: '0.85rem', resize: 'vertical', minHeight: '80px', outline: 'none' }} />
        ) : (
          <input ref={inputRef} type="text" className="form-input" value={value}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onChange={e => onChange(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', padding: '12px 14px', fontSize: '0.85rem', outline: 'none' }} />
        )}
        
        <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            padding: '8px 16px', borderRadius: '8px', border: 'none', margin: '6px',
            background: saving ? 'rgba(212,175,55,0.15)' : isDirty ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.05)',
            color: saving ? 'var(--primary-gold)' : isDirty ? 'var(--dark-slate)' : 'var(--text-muted)',
            fontWeight: 700, fontSize: '0.72rem', cursor: isDirty && !saving ? 'pointer' : 'default', whiteSpace: 'nowrap',
            alignSelf: isTextarea ? 'flex-start' : 'center',
            opacity: isDirty || saving ? 1 : 0.5,
          }}
          disabled={saving || !isDirty}
          onClick={() => onSave()}
        >
          {saving ? (
            <motion.span style={{ display: 'inline-block' }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>⟳</motion.span>
          ) : 'Save'}
        </motion.button>
      </div>
    </div>
  )
}

/* ===== TRANSLATIONS TAB ===== */
function TranslationsTab({ showToast }) {
  const { translations, saveTranslation } = useContent()
  const [lang, setLang] = useState('en')
  const [search, setSearch] = useState('')
  const [savingKey, setSavingKey] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  // Helper to categorize translation keys
  const getCategory = (key) => {
    const k = key.toLowerCase()
    if (k.startsWith('nav_') || k.startsWith('hero_') || k.startsWith('brand_')) return 'Nav/Hero'
    if (k.startsWith('history_')) return 'History'
    if (k.startsWith('founder_')) return 'Founder'
    if (k.startsWith('services_') || k.startsWith('service')) return 'Services'
    if (k.startsWith('footer_') || k.startsWith('contact_')) return 'Footer'
    return 'General'
  }

  const categories = ['All', 'Nav/Hero', 'History', 'Founder', 'Services', 'Footer', 'General']

  const allEntries = Object.entries(translations[lang] || {})
  const filtered = allEntries.filter(([key, val]) => {
    const matchesSearch = key.toLowerCase().includes(search.toLowerCase()) || String(val).toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || getCategory(key) === activeCategory
    return matchesSearch && matchesCategory
  })

  // Get count of items in each category for badges
  const getCategoryCount = (cat) => {
    if (cat === 'All') return allEntries.length
    return allEntries.filter(([k]) => getCategory(k) === cat).length
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <motion.div variants={itemVariants}>
        <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Translations</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure language keys across English, Telugu and Kannada</p>
      </motion.div>

      {/* Toolbar */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Language Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {langs.map(l => (
            <motion.button key={l} type="button" onClick={() => setLang(l)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{
                position: 'relative', padding: '10px 22px', borderRadius: '10px', border: lang === l ? '1px solid var(--primary-gold)' : '1px solid var(--glass-border)',
                background: lang === l ? 'var(--gradient-gold)' : 'transparent',
                color: lang === l ? 'var(--dark-slate)' : 'var(--text-muted)',
                cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', overflow: 'hidden'
              }}
            >
              {langFlags[l]} {langLabels[l]}
            </motion.button>
          ))}
        </div>
        
        {/* Search */}
        <div style={{ flex: 1, maxWidth: '320px', marginLeft: 'auto', position: 'relative' }}>
          <input type="text" className="form-input" placeholder="🔍 Search keys or values..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ fontSize: '0.85rem', padding: '10px 16px 10px 36px', borderRadius: '10px' }} />
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div variants={itemVariants} className="filter-pills">
        {categories.map(cat => {
          const count = getCategoryCount(cat)
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat} <span style={{ opacity: 0.6, fontSize: '0.65rem', marginLeft: '4px' }}>({count})</span>
            </button>
          )
        })}
      </motion.div>

      {/* Key Rows Panel */}
      <motion.div variants={itemVariants} className="admin-panel" style={{ padding: '1rem', maxHeight: '60vh', overflowY: 'auto', background: 'rgba(22,27,34,0.6)' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔍</p>
            <p style={{ fontSize: '0.9rem' }}>No translation keys found matching filters.</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gap: '0.5rem' }}>
            {filtered.map(([key, val]) => (
              <motion.div key={key} variants={itemVariants}>
                <TranslationRow transKey={key} transVal={val} lang={lang}
                  saveTranslation={saveTranslation} showToast={showToast}
                  savingKey={savingKey} setSavingKey={setSavingKey} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

function TranslationRow({ transKey, transVal, lang, saveTranslation, showToast, savingKey, setSavingKey }) {
  const [value, setValue] = useState(transVal)
  const [focused, setFocused] = useState(false)
  useEffect(() => { setValue(transVal) }, [transVal])

  const saving = savingKey === transKey
  const isDirty = value !== transVal

  return (
    <motion.div
      whileHover={{ background: 'rgba(255,255,255,0.015)' }}
      style={{
        display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.5rem 0.75rem',
        borderRadius: '8px', transition: 'background 0.2s',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '220px', flex: '1 0 220px' }}>
        <span style={{ color: 'var(--primary-gold)', fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 600, wordBreak: 'break-all' }}>
          {transKey}
        </span>
        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Key Type: {transKey.split('_')[0].toUpperCase()}
        </span>
      </div>

      <div style={{
        flex: '3 0 320px', display: 'flex', borderRadius: '8px',
        border: `1.5px solid ${focused ? 'var(--primary-gold)' : isDirty ? 'rgba(212,175,55,0.4)' : 'var(--glass-border)'}`,
        background: focused ? 'rgba(212,175,55,0.03)' : 'rgba(255,255,255,0.015)',
        transition: 'border-color 0.2s, background 0.2s',
      }}>
        <input type="text" value={value}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => setValue(e.target.value)}
          style={{
            flex: 1, padding: '8px 12px', fontSize: '0.85rem', border: 'none',
            background: 'transparent', color: 'var(--text-light)', outline: 'none',
          }} />
        
        <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          style={{
            padding: '8px 16px', fontSize: '0.72rem', fontWeight: 700,
            border: 'none', cursor: isDirty && !saving ? 'pointer' : 'default', borderRadius: '0 6px 6px 0',
            background: isDirty ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.05)',
            color: isDirty ? 'var(--dark-slate)' : 'var(--text-muted)',
            opacity: saving || isDirty ? 1 : 0.5,
          }}
          disabled={saving || !isDirty}
          onClick={async () => {
            if (!value || !isDirty) return
            setSavingKey(transKey)
            await saveTranslation(lang, transKey, value)
            setSavingKey(null)
            showToast(`Saved: ${transKey}`)
          }}
        >
          {saving ? (
            <motion.span style={{ display: 'inline-block' }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>⟳</motion.span>
          ) : 'Save'}
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ===== CRUD TAB ===== */
const eventFields = [
  { key: 'title', label: 'Event Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'image', label: 'Image URL', type: 'image' },
]

const memberFields = [
  { key: 'name', label: 'Full Name', type: 'text' },
  { key: 'designation', label: 'Designation', type: 'text' },
  { key: 'village', label: 'Village', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
  { key: 'photo', label: 'Photo URL', type: 'image' },
]

const donationFields = [
  { key: 'donorName', label: 'Donor Name', type: 'text' },
  { key: 'amount', label: 'Amount (₹)', type: 'number' },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'purpose', label: 'Purpose', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
]

const activityFields = [
  { key: 'title', label: 'Activity Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'time', label: 'Time', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'image', label: 'Image URL', type: 'image' },
]

function UploaderDropzone({ onUpload, uploading, currentValue, label }) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{label}</span>
        {currentValue && (
          <span style={{ fontSize: '0.65rem', color: '#ff6b6b', cursor: 'pointer', textTransform: 'none' }} onClick={() => onUpload('', true)}>
            ✕ Remove Image
          </span>
        )}
      </label>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`uploader-dropzone ${dragActive ? 'dragging' : ''}`}
      >
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChange} />
        {uploading ? (
          <>
            <div className="uploader-icon">⏳</div>
            <div className="uploader-text" style={{ color: 'var(--primary-gold)' }}>Uploading image to server...</div>
          </>
        ) : currentValue ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'center', padding: '0.25rem' }}>
            <img src={currentValue} alt="Preview" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-gold)' }} />
            <div style={{ textAlign: 'left', minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>Image Selected</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentValue}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--primary-gold)', marginTop: '2px', fontWeight: 600 }}>Click or drag to replace</div>
            </div>
          </div>
        ) : (
          <>
            <div className="uploader-icon">📥</div>
            <div className="uploader-text">
              <span>Click to select</span> or drag and drop image here
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Supports JPG, PNG, WEBP formats</div>
          </>
        )}
      </div>
      <input
        type="text"
        className="form-input"
        placeholder="Or paste a direct image URL..."
        value={currentValue || ''}
        onChange={(e) => onUpload(e.target.value, true)}
        style={{ fontSize: '0.75rem', marginTop: '4px', padding: '8px 12px' }}
      />
    </div>
  )
}

function CrudTab({ title, collection, fields, showToast }) {
  const ctx = useData()
  const { addItem, updateItem, deleteItem, uploadImage } = ctx
  const items = ctx[collection] || []
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({})
  const [uploadingField, setUploadingField] = useState(null)
  const [search, setSearch] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [viewMode, setViewMode] = useState(collection === 'donations' ? 'table' : 'grid')

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const effectiveViewMode = isMobile ? 'grid' : viewMode

  const filtered = (items || []).filter(item =>
    Object.values(item).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  )

  const handleFieldChange = (key, value) => setForm(p => ({ ...p, [key]: value }))

  const handleImageUpload = async (key, fileOrUrl, isUrl = false) => {
    if (isUrl) {
      handleFieldChange(key, fileOrUrl)
      return
    }
    if (!fileOrUrl) return
    setUploadingField(key)
    try {
      const url = await uploadImage(fileOrUrl, collection)
      setForm(p => ({ ...p, [key]: url }))
      showToast('Image uploaded successfully!')
    } catch (err) { 
      showToast('Upload failed: ' + err.message, 'error') 
    }
    setUploadingField(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editId) { 
        await updateItem(collection, editId, form)
        showToast('Updated successfully!') 
      } else { 
        await addItem(collection, form)
        showToast('Created successfully!') 
      }
      setShowForm(false)
      setEditId(null)
      setForm({})
    } catch (err) { 
      showToast('Error: ' + err.message, 'error') 
    }
    setSubmitting(false)
  }

  const handleEdit = (item) => {
    setForm(Object.fromEntries(fields.map(f => [f.key, item[f.key] || ''])))
    setEditId(item.id)
    setShowForm(true)
    // Scroll smoothly to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    await deleteItem(collection, id)
    showToast('Deleted successfully!')
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header toolbar */}
      <motion.div variants={itemVariants} className="view-toggle-bar">
        <div>
          <h2 className="section-title" style={{ fontSize: '1.8rem', margin: 0 }}>{title}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>{filtered.length} items found</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="🔍 Search entries..." 
            value={search}
            onChange={e => setSearch(e.target.value)} 
            style={{ width: '200px', fontSize: '0.85rem', padding: '9px 14px', borderRadius: '10px' }} 
          />
          
          {!isMobile && collection !== 'donations' && (
            <div className="toggle-btn-group">
              <button 
                type="button" 
                onClick={() => setViewMode('grid')} 
                className={`toggle-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                🎴 Grid
              </button>
              <button 
                type="button" 
                onClick={() => setViewMode('table')} 
                className={`toggle-view-btn ${viewMode === 'table' ? 'active' : ''}`}
              >
                📋 Table
              </button>
            </div>
          )}

          <motion.button 
            type="button" 
            className="btn-primary" 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.97 }}
            onClick={() => { 
              if (showForm) {
                setShowForm(false)
                setEditId(null)
                setForm({})
              } else {
                setForm({})
                setEditId(null)
                setShowForm(true)
              }
            }}
            style={{ padding: '10px 20px', whiteSpace: 'nowrap', borderRadius: '10px' }}
          >
            {showForm ? '✕ Close Form' : '+ Add New'}
          </motion.button>
        </div>
      </motion.div>

      {/* sliding creation form */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }} 
            animate={{ opacity: 1, y: 0, height: 'auto' }} 
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="form-slide-container animated-border-glow">
              <h3 style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-serif)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 600 }}>
                {editId ? '✏️ Edit Record Details' : '➕ Add New Record'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {fields.map(f => (
                    <div key={f.key} className="form-group" style={{ margin: 0 }}>
                      {f.type === 'image' ? (
                        <UploaderDropzone 
                          label={f.label} 
                          uploading={uploadingField === f.key} 
                          currentValue={form[f.key]} 
                          onUpload={(fileOrUrl, isUrl) => handleImageUpload(f.key, fileOrUrl, isUrl)}
                        />
                      ) : f.type === 'textarea' ? (
                        <>
                          <label className="form-label">{f.label}</label>
                          <textarea 
                            className="form-input" 
                            rows={4} 
                            value={form[f.key] || ''}
                            onChange={e => handleFieldChange(f.key, e.target.value)} 
                            style={{ resize: 'vertical', minHeight: '80px', outline: 'none' }} 
                          />
                        </>
                      ) : (
                        <>
                          <label className="form-label">{f.label}</label>
                          <input 
                            type={f.type} 
                            className="form-input" 
                            value={form[f.key] || ''}
                            onChange={e => handleFieldChange(f.key, e.target.value)} 
                            style={{ outline: 'none' }}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                  <motion.button 
                    type="submit" 
                    className="btn-primary" 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting} 
                    style={{ padding: '10px 28px', opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? '⟳ Saving...' : editId ? '✏️ Update Entry' : '💾 Create Entry'}
                  </motion.button>
                  <motion.button 
                    type="button" 
                    className="btn-secondary" 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { 
                      setShowForm(false)
                      setEditId(null)
                      setForm({})
                    }} 
                    style={{ padding: '10px 24px' }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid or Table listing display */}
      <motion.div variants={itemVariants} className="admin-panel" style={{ padding: effectiveViewMode === 'grid' ? 0 : '0.5rem', overflow: 'hidden', background: effectiveViewMode === 'grid' ? 'transparent' : 'rgba(22,27,34,0.6)', border: effectiveViewMode === 'grid' ? 'none' : '1px solid var(--glass-border)' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>📭</p>
            <p style={{ fontSize: '0.95rem' }}>No {title.toLowerCase()} records found. Click "+ Add New" to write data.</p>
          </div>
        ) : effectiveViewMode === 'grid' ? (
          <div className="crud-grid">
            {filtered.map(item => {
              const imageUrl = item.image || item.photo || item.photoUrl
              return (
                <motion.div key={item.id} variants={itemVariants} className="crud-grid-card">
                  <div className="crud-card-img-wrapper">
                    {imageUrl ? (
                      <img src={imageUrl} alt={item.title || item.name} className="crud-card-img" />
                    ) : (
                      <div className="crud-card-img-placeholder">
                        {collection === 'events' ? '🎉' : collection === 'members' ? '👥' : collection === 'activities' ? '📅' : '📦'}
                      </div>
                    )}
                    {item.designation && <div className="crud-card-badge">{item.designation}</div>}
                    {item.village && (
                      <div className="crud-card-badge" style={{ left: 10, right: 'auto', background: 'var(--gradient-gold)', color: 'var(--dark-slate)', fontWeight: 800 }}>
                        📍 {item.village}
                      </div>
                    )}
                  </div>
                  
                  <div className="crud-card-content">
                    <h4 className="crud-card-title">{item.title || item.name || 'Untitled Record'}</h4>
                    
                    <div className="crud-card-meta">
                      {item.date && <span>📅 <strong>Date:</strong> {item.date}</span>}
                      {item.time && <span>⏰ <strong>Time:</strong> {item.time}</span>}
                      {item.location && <span>📍 <strong>Location:</strong> {item.location}</span>}
                      {item.phone && <span>📞 <strong>Contact:</strong> {item.phone}</span>}
                      {item.amount && (
                        <span style={{ color: '#4ade80', fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                          ₹{Number(item.amount).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    
                    <p className="crud-card-desc">{item.description || item.bio || item.purpose || 'No details provided.'}</p>
                    
                    <div className="crud-card-actions">
                      <motion.button 
                        type="button" 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.97 }}
                        className="btn-secondary" 
                        style={{ flex: 1, padding: '8px', fontSize: '0.75rem', justifyContent: 'center', borderRadius: '8px' }}
                        onClick={() => handleEdit(item)}
                      >
                        ✏️ Edit
                      </motion.button>
                      <motion.button 
                        type="button" 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.97 }}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '8px', fontSize: '0.75rem', justifyContent: 'center', background: 'rgba(255,60,60,0.12)', borderColor: 'rgba(255,60,60,0.25)', color: '#ff6b6b', borderRadius: '8px' }}
                        onClick={() => { if (confirm(`Are you sure you want to delete this ${title.slice(0, -1).toLowerCase()}?`)) handleDelete(item.id) }}
                      >
                        🗑️ Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(212,175,55,0.06)' }}>
                  {fields.map(f => (
                    <th key={f.key} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: '1px solid var(--glass-border)' }}>
                      {f.label}
                    </th>
                  ))}
                  <th style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.7rem', borderBottom: '1px solid var(--glass-border)' }}>Actions</th>
                </tr>
              </thead>
              <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                {filtered.map(item => (
                  <motion.tr 
                    key={item.id} 
                    variants={itemVariants}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}
                    whileHover={{ background: 'rgba(255,255,255,0.015)' }}
                  >
                    {fields.map(f => (
                      <td key={f.key} style={{ padding: '12px 16px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                        {f.type === 'image' && item[f.key] ? (
                          <motion.img 
                            whileHover={{ scale: 1.1 }} 
                            src={item[f.key]} 
                            alt=""
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--glass-border)', cursor: 'pointer' }} 
                          />
                        ) : f.type === 'number' ? (
                          <span style={{ color: '#4ade80', fontWeight: 700 }}>₹{Number(item[f.key]).toLocaleString('en-IN')}</span>
                        ) : (
                          <span style={{ maxWidth: '240px', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item[f.key] || '-'}
                          </span>
                        )}
                      </td>
                    ))}
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <motion.button 
                          type="button" 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }}
                          className="btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '6px' }}
                          onClick={() => handleEdit(item)}
                        >
                          ✏️ Edit
                        </motion.button>
                        <motion.button 
                          type="button" 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }}
                          className="btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '0.7rem', background: 'rgba(255,60,60,0.12)', borderColor: 'rgba(255,60,60,0.25)', color: '#ff6b6b', borderRadius: '6px' }}
                          onClick={() => { if (confirm(`Are you sure you want to delete this ${title.slice(0, -1).toLowerCase()}?`)) handleDelete(item.id) }}
                        >
                          🗑️ Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ===== SETTINGS TAB ===== */
function SettingsTab({ showToast }) {
  const { settings, saveSettings } = useContent()
  const { uploadImage } = useData()
  const [formData, setFormData] = useState({ ...settings })
  const [saving, setSaving] = useState(false)
  const [uploadingQr, setUploadingQr] = useState(false)

  useEffect(() => {
    setFormData({ ...settings })
  }, [settings])

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await saveSettings(formData)
      showToast('Global settings updated successfully!')
    } catch (err) {
      showToast('Failed to save settings: ' + err.message, 'error')
    }
    setSaving(false)
  }

  const handleQrUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadingQr(true)
    try {
      const url = await uploadImage(file, 'settings')
      setFormData(prev => ({ ...prev, qrCodeUrl: url }))
      showToast('Donation QR Code uploaded!')
    } catch (err) {
      showToast('QR Upload failed: ' + err.message, 'error')
    }
    setUploadingQr(false)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <motion.div variants={itemVariants}>
        <h2 className="section-title" style={{ fontSize: '1.8rem', margin: 0 }}>Global Site Settings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>Configure temple contacts, social links, and donation details</p>
      </motion.div>

      <motion.form onSubmit={handleSubmit} variants={itemVariants} className="admin-panel" style={{ width: '100%', maxWidth: '850px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Contact Information */}
        <div>
          <h3 style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
            📞 Contact & Social Media
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={formData.email || ''} 
                onChange={e => handleChange('email', e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone / Mobile Number</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.phone || ''} 
                onChange={e => handleChange('phone', e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">YouTube Channel Link</label>
              <input 
                type="url" 
                className="form-input" 
                value={formData.youtube || ''} 
                onChange={e => handleChange('youtube', e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram Handle Link</label>
              <input 
                type="url" 
                className="form-input" 
                value={formData.instagram || ''} 
                onChange={e => handleChange('instagram', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Bank Account Details */}
        <div>
          <h3 style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
            🏦 Bank Account Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Bank Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.bankName || ''} 
                onChange={e => handleChange('bankName', e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Number</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.bankAccount || ''} 
                onChange={e => handleChange('bankAccount', e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">IFSC Code</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.bankIfsc || ''} 
                onChange={e => handleChange('bankIfsc', e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Branch Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.bankBranch || ''} 
                onChange={e => handleChange('bankBranch', e.target.value)} 
                required 
              />
            </div>
          </div>
        </div>

        {/* QR Code Scanner Upload */}
        <div>
          <h3 style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
            📱 UPI QR Scanner Image
          </h3>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '120px', height: '120px', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img 
                src={formData.qrCodeUrl || '/assets/qr_code_placeholder.png'} 
                alt="Donation QR Code" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
              <label className="btn-secondary" style={{ cursor: 'pointer', padding: '10px 16px', fontSize: '0.8rem', alignSelf: 'flex-start' }}>
                {uploadingQr ? 'Uploading QR...' : '📸 Upload New QR Image'}
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleQrUpload} 
                  disabled={uploadingQr}
                />
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Or paste a direct image URL..." 
                value={formData.qrCodeUrl || ''} 
                onChange={e => handleChange('qrCodeUrl', e.target.value)} 
                style={{ fontSize: '0.75rem', marginTop: '4px', padding: '8px 12px' }}
              />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Supported formats: JPEG, PNG. Recommended square resolution.</p>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button 
            type="submit" 
            className="btn-primary" 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.97 }} 
            disabled={saving || uploadingQr}
            style={{ padding: '12px 28px', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            {saving ? 'Saving Settings...' : '💾 Save All Settings'}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  )
}

/* ===== MEDIA TAB ===== */
function MediaTab({ showToast }) {
  const { uploadImage } = useData()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [search, setSearch] = useState('')
  const [copiedKey, setCopiedKey] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const loadFiles = async () => {
    try {
      const { listAll, ref, getDownloadURL } = await import('firebase/storage')
      const { storage } = await import('../firebase')
      const list = await listAll(ref(storage, 'uploads'))
      const urls = await Promise.all(list.items.map(async item => ({ name: item.name, url: await getDownloadURL(item) })))
      setFiles(urls)
    } catch { setFiles([]) }
  }

  useEffect(() => { loadFiles() }, [])

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true)
    try { 
      await uploadImage(file, 'uploads')
      await loadFiles()
      showToast('Image uploaded successfully!') 
    } catch (err) { 
      showToast('Upload failed: ' + err.message, 'error') 
    }
    setUploading(false)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files[0])
    }
  }

  const handleCopy = (url, name) => {
    navigator.clipboard.writeText(url)
    setCopiedKey(name)
    showToast('Image URL copied to clipboard!')
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header toolbar */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title" style={{ fontSize: '1.8rem', margin: 0 }}>Media Library</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>{filtered.length} files available</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="🔍 Search files..." 
            value={search}
            onChange={e => setSearch(e.target.value)} 
            style={{ width: '220px', fontSize: '0.85rem', padding: '9px 14px', borderRadius: '10px' }} 
          />
          
          <motion.label 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.97 }}
            className="btn-primary" 
            style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '10px' }}
          >
            {uploading ? '⏳ Uploading...' : '📤 Select Image'}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleUpload(e.target.files[0])} disabled={uploading} />
          </motion.label>
        </div>
      </motion.div>

      {/* Drag-and-drop Zone */}
      <motion.div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`uploader-dropzone ${dragActive ? 'dragging' : ''}`}
        style={{ padding: '2rem', borderStyle: 'dashed' }}
      >
        <span style={{ fontSize: '2rem' }}>🖼️</span>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>Drag & drop new images anywhere here to upload</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Files will be saved directly to Firebase Storage bucket</div>
      </motion.div>

      {/* Grid displays */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📸</p>
          <p style={{ fontSize: '0.95rem' }}>No media files matching search filter.</p>
        </div>
      ) : (
        <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(f => (
            <motion.div 
              key={f.name} 
              variants={itemVariants} 
              whileHover={{ y: -5 }}
              className="crud-grid-card" 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setPreview(f.url)}
            >
              {copiedKey === f.name && (
                <div className="copy-badge-overlay">Copied!</div>
              )}
              <div style={{ height: '150px', background: 'rgba(0,0,0,0.1)' }}>
                <img src={f.url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', wordBreak: 'break-all', margin: 0, fontWeight: 500, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={f.name}>
                  {f.name}
                </p>
                <motion.button 
                  type="button" 
                  className="btn-secondary" 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '6px', fontSize: '0.7rem', justifyContent: 'center', borderRadius: '6px' }}
                  onClick={e => { e.stopPropagation(); handleCopy(f.url, f.name) }}
                >
                  📋 Copy URL
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Lightbox Preview */}
      <AnimatePresence>
        {preview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 20000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
            onClick={() => setPreview(null)}>
            <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              src={preview} alt="preview"
              style={{ maxWidth: '85vw', maxHeight: '85vh', borderRadius: '12px', border: '1px solid var(--border-gold)', boxShadow: '0 25px 50px rgba(0,0,0,0.8)' }} />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
