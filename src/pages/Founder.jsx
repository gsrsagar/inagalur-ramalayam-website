import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

const books = [
  {
    id: 'book1',
    titleKey: 'book1_title',
    genreKey: 'book1_genre',
    img: '/assets/book_ramayanam.jpg',
    backDesc: 'A beautifully illustrated journey through the holy name of Lord Rama, blending visual storytelling with deep devotional verses and chants.'
  },
  {
    id: 'book2',
    titleKey: 'book2_title',
    genreKey: 'book2_genre',
    img: '/assets/temple_reconstruction.png', // Fallback image for book2
    backDesc: 'An insightful narrative exploring the omnipresence of Lord Shiva and the pathways of divine surrender and spiritual realization.'
  },
  {
    id: 'book3',
    titleKey: 'book3_title',
    genreKey: 'book3_genre',
    img: '/assets/temple_hero_deity.png', // Fallback image for book3
    backDesc: 'A classical Telugu masterwork highlighting the victory of art, moral virtues, and spiritual devotion in our ancient heritage.',
    viewUrl: 'https://archive.org/details/in.ernet.dli.2015.331109',
    downloadUrl: 'https://archive.org/download/in.ernet.dli.2015.331109/2015.331109.Kalaabhaanu-Vijayamu.pdf'
  }
]

const milestones = [
  {
    year: '1990',
    title: 'Literary Inception',
    desc: 'Commenced publication of sacred epics and commentaries to preserve traditional wisdom for future generations.'
  },
  {
    year: '1994',
    title: 'Vedic Chanting & discourses',
    desc: 'Established regular spiritual discourses and chanting services, making the temple a thriving cultural hub.'
  },
  {
    year: '2004',
    title: 'Daily Anna Daana Satram',
    desc: 'Founded the Kadiri Lakshmi Narasimha Swami Anna Daana Satram, providing free, sanctified meals daily to all pilgrims.'
  },
  {
    year: '2014',
    title: 'Reconstruction Blueprint',
    desc: 'Began architectural planning and community fundraising to reconstruct the ancient temple complex in pure granite stone.'
  }
]

export default function Founder() {
  const { t } = useLanguage()

  return (
    <section id="founder-section" className="section" style={{ position: 'relative', zIndex: 1, padding: '120px 20px 80px' }}>
      <div className="section-container">
        
        {/* Main Biography Block */}
        <div className="founder-grid" style={{ marginBottom: '5rem' }}>
          <div className="founder-image-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div 
              className="founder-portrait-frame animated-border-glow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                borderRadius: '24px',
                border: '2px solid var(--border-gold)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                maxWidth: '380px'
              }}
            >
              <img 
                src="/assets/founder_portrait.png" 
                alt={t('founder_name')} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, rgba(22,27,34,0.9))'
              }} />
            </motion.div>
          </div>
          
          <div className="founder-text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p className="section-subtitle">{t('founder_subtitle')}</p>
            <h2 className="section-title" style={{ margin: '0.5rem 0' }}>{t('founder_name')}</h2>
            <p className="founder-role" style={{ color: 'var(--primary-gold)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {t('founder_role')}
            </p>
            <blockquote className="founder-quote" style={{ margin: '1.5rem 0', paddingLeft: '1.5rem', borderLeft: '3px solid var(--primary-gold)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--light-gold)', fontFamily: 'var(--font-serif)', lineHeight: '1.7' }}>
              &ldquo;{t('founder_quote')}&rdquo;
            </blockquote>
            <p className="founder-desc" style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {t('founder_desc')}
            </p>
          </div>
        </div>

        {/* Milestone Timeline Section */}
        <AnimatedSection style={{ marginBottom: '5rem' }}>
          <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Timeline of Selfless Devotion</h3>
          <div className="timeline" style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year}
                className="timeline-event"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2.5rem',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div className="timeline-year" style={{
                    background: 'var(--gradient-gold)',
                    color: 'var(--dark-slate)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px var(--shadow-gold)',
                    whiteSpace: 'nowrap'
                  }}>
                    {m.year}
                  </div>
                  <div style={{
                    width: '2px',
                    flexGrow: 1,
                    background: 'linear-gradient(to bottom, var(--primary-gold), transparent)',
                    marginTop: '8px',
                    minHeight: '40px'
                  }} />
                </div>

                <div className="glass-card" style={{
                  padding: '1.5rem',
                  flexGrow: 1,
                  borderLeft: '3px solid var(--primary-gold)'
                }}>
                  <h4 style={{ color: 'var(--text-light)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {m.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* 3D Books Showcase Section */}
        <AnimatedSection>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Divine Wisdom</p>
          <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>{t('literary_title')}</h3>
          
          <div className="book-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', justifyContent: 'center' }}>
            {books.map(b => (
              <div key={b.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <div className="book-3d-scene">
                  <div className="book-3d-card">
                    
                    {/* Front Cover */}
                    <div className="book-3d-front">
                      <img src={b.img} alt={t(b.titleKey)} />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(13,17,23,0.95))',
                        padding: '1.25rem 1rem 1rem',
                        textAlign: 'left'
                      }}>
                        <h4 className="book-genre" style={{ color: 'var(--primary-gold)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                          {t(b.genreKey)}
                        </h4>
                        <h3 className="book-title" style={{ color: 'var(--text-light)', fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t(b.titleKey)}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Back Cover */}
                    <div className="book-3d-back">
                      <h4 style={{ color: 'var(--primary-gold)', fontSize: '0.85rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                        Synopsis
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', opacity: 0.9, lineHeight: '1.6', margin: 0 }}>
                        {b.backDesc}
                      </p>
                      <div style={{ marginTop: '1.25rem', fontSize: '0.65rem', color: 'var(--primary-gold)', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '0.5rem', width: '100%' }}>
                        ✦ Sri Subbaraamappa Gaaru
                      </div>
                    </div>

                    {/* 3D Pages representation */}
                    <div className="book-3d-pages" />
                    
                  </div>
                </div>

                {/* View / Download options */}
                {b.viewUrl && (
                  <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '220px', justifyContent: 'center' }}>
                    <a 
                      href={b.viewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '0.75rem', justifyContent: 'center', borderRadius: '8px', whiteSpace: 'nowrap' }}
                    >
                      📖 View Book
                    </a>
                    <a 
                      href={b.downloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '0.75rem', justifyContent: 'center', borderRadius: '8px', whiteSpace: 'nowrap' }}
                    >
                      📥 PDF
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
