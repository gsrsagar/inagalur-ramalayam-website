import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useLightbox } from '../components/Lightbox'
import AnimatedSection from '../components/AnimatedSection'

const sacredBooks = [
  {
    id: 'book1',
    titleKey: 'book1_title',
    genreKey: 'book1_genre',
    img: '/assets/book_ramayanam.png',
    actionType: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg&pp=sAgC',
    backDesc: 'A sacred illustrated poetic work meditating upon the holy name of Lord Sri Rama, replete with divine artwork, verses and spiritual devotion.'
  },
  {
    id: 'book2',
    titleKey: 'book2_title',
    genreKey: 'book2_genre',
    img: '/assets/book_eeswara.png',
    actionType: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg&pp=sAgC',
    backDesc: 'An insightful philosophical and spiritual novel elaborating on devotion, omnipresence of the Divine, and pathways of spiritual surrender.'
  },
  {
    id: 'book3',
    titleKey: 'book3_title',
    genreKey: 'book3_genre',
    img: '/assets/book_kalaabhanu.png',
    actionType: 'pdf',
    pdfUrl: '/assets/Kalaabhaanu-Vijayamu.pdf',
    archiveUrl: 'https://archive.org/details/in.ernet.dli.2015.331109',
    backDesc: 'A classical Telugu literary masterwork highlighting romantic folk narrative, moral virtues, and cultural brilliance.'
  }
]

const classicalDramas = [
  {
    id: 'drama1',
    icon: '🎭',
    titleKey: 'drama1_title',
    genreKey: 'drama1_genre',
    desc: 'An exquisite classical play dramatizing the divine legend and heroic valour of Arjuna and Subhadra.'
  },
  {
    id: 'drama2',
    icon: '📜',
    titleKey: 'drama2_title',
    genreKey: 'drama2_genre',
    desc: 'A comprehensive sacred chronicle documenting the inspirational lives and divine experiences of 24 great devotees.'
  },
  {
    id: 'drama3',
    icon: '🏛️',
    titleKey: 'drama3_title',
    genreKey: 'drama3_genre',
    desc: 'The sacred history and puranic sanctity of the revered Hatakeswara Kshetra.'
  }
]

const ashtottaraList = [
  'ashtottaram_vishnu',
  'ashtottaram_lakshmi',
  'ashtottaram_dakshinamurthy',
  'ashtottaram_surya',
  'ashtottaram_ganga',
  'ashtottaram_krishna',
  'ashtottaram_anjaneya',
  'ashtottaram_sri_raama'
]

const devotionalStotrams = [
  'stotram_seethamma',
  'stotram_amba',
  'stotram_kasi'
]

const milestones = [
  {
    year: '1845',
    title: 'Temple Inception & Consecration',
    desc: 'Sri Pancharatnam Subbaraamappa Gaaru established the sacred temple sanctuary with village elders in Inagaluru, Kadiri region.'
  },
  {
    year: '1940s',
    title: 'Literary Works, Sathakams & Harikathas',
    desc: 'Authored and published timeless classics including Bommalla Ramayanam, Eeswara Prasannam, Kalaabhaanu Vijayamu, Sathakams and Harikathas.'
  },
  {
    year: '1970s - 2000s',
    title: '30+ Years Unbroken Anna Daana Satram',
    desc: 'Managed and sustained the Kadiri Lakshmi Narasimha Swami Anna Daana Satram, feeding tens of thousands of visiting pilgrims without break.'
  },
  {
    year: '2024',
    title: 'Grand Granite Reconstruction',
    desc: 'The eternal legacy continues as devotees unite to celebrate the monumental black granite temple reconstruction.'
  }
]

export default function Founder() {
  const { t } = useLanguage()
  const { open } = useLightbox()

  const handleBookAction = (book) => {
    if (book.actionType === 'youtube') {
      open({
        type: 'video',
        title: t(book.titleKey),
        desc: t(book.genreKey),
        url: book.youtubeUrl
      })
    }
  }

  return (
    <section id="founder-section" className="section" style={{ position: 'relative', zIndex: 1, padding: '120px 20px 80px' }}>
      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Split Layout: Left Portrait Card + Right Literary Works */}
        <div className="founder-hero-grid" style={{ marginBottom: '4rem' }}>
          
          {/* Left Column: Founder Portrait Card */}
          <div className="founder-hero-left">
            <motion.div 
              className="founder-portrait-card animated-border-glow"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="founder-card-image-box">
                <img 
                  src="/assets/founder_portrait.png" 
                  alt={t('founder_name')} 
                  className="founder-card-img"
                />
              </div>
              <div className="founder-card-content">
                <h3 className="founder-card-name">{t('founder_name')}</h3>
                <p className="founder-card-role">{t('founder_role')}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Literary Works Showcase */}
          <div className="founder-hero-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="founder-section-subhead">{t('literary_subtitle')}</p>
              <h2 className="founder-section-heading">{t('literary_title')}</h2>
            </motion.div>

            {/* 3 Books Grid */}
            <div className="founder-books-grid">
              {sacredBooks.map((book, idx) => (
                <motion.div
                  key={book.id}
                  className="founder-book-card glass-card"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                >
                  <div className="founder-book-cover-box">
                    <img 
                      src={book.img} 
                      alt={t(book.titleKey)} 
                      className="founder-book-cover-img"
                    />
                  </div>

                  <div className="founder-book-info">
                    <h4 className="founder-book-title">{t(book.titleKey)}</h4>
                    <p className="founder-book-genre">{t(book.genreKey)}</p>
                  </div>

                  <div className="founder-book-action-wrap">
                    {book.actionType === 'youtube' ? (
                      <button 
                        type="button"
                        onClick={() => handleBookAction(book)}
                        className="founder-btn-youtube"
                      >
                        <span className="yt-icon">▶</span> {t('btn_listen_youtube')}
                      </button>
                    ) : (
                      <a 
                        href={book.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="founder-btn-pdf"
                      >
                        <span className="pdf-icon">📄</span> {t('btn_pdf_download')}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* 3 Classical Dramas & Sthala Puraanam Section */}
        <AnimatedSection style={{ marginBottom: '4rem' }}>
          <div className="drama-showcase-grid">
            {classicalDramas.map((drama, idx) => (
              <motion.div
                key={drama.id}
                className="drama-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="drama-icon-box">{drama.icon}</div>
                <h4 className="drama-title">{t(drama.titleKey)}</h4>
                <span className="drama-genre-badge">{t(drama.genreKey)}</span>
                <p className="drama-desc">{drama.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Sathakams & Harikathas Grid Section */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="literary-deep-grid">
            
            {/* Left Box: Sathakams & Ashtottarams */}
            <div className="literary-deep-box glass-card">
              <div className="deep-box-header">
                <span className="deep-box-icon">📜</span>
                <h3 className="deep-box-title">{t('sathakams_title')}</h3>
              </div>

              <div className="deep-box-body">
                <div className="deep-sathakam-featured">
                  <div className="featured-dot" />
                  <p className="featured-sathakam-text">{t('sathakam_main')}</p>
                </div>

                <div className="deergha-section">
                  <h4 className="deergha-title">{t('deergha_title')}</h4>
                  <div className="ashtottara-pills-wrap">
                    {ashtottaraList.map((k) => (
                      <span key={k} className="ashtottara-pill">
                        {t(k)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Harikathas & Devotional Songs */}
            <div className="literary-deep-box glass-card">
              <div className="deep-box-header">
                <span className="deep-box-icon">🎶</span>
                <h3 className="deep-box-title">{t('harikathas_title')}</h3>
              </div>

              <div className="deep-box-body">
                <div className="harikatha-section">
                  <h4 className="harikatha-subhead">{t('harikatha_subhead')}</h4>
                  <div className="harikatha-items">
                    <div className="harikatha-item">
                      <span className="gold-bullet">✦</span>
                      <span>{t('harikatha_daksha')}</span>
                    </div>
                    <div className="harikatha-item">
                      <span className="gold-bullet">✦</span>
                      <span>{t('harikatha_rukmini')}</span>
                    </div>
                  </div>
                </div>

                <div className="devotional-stotrams-section" style={{ marginTop: '1.8rem' }}>
                  <h4 className="deergha-title">{t('devotional_subhead')}</h4>
                  <div className="ashtottara-pills-wrap">
                    {devotionalStotrams.map((k) => (
                      <span key={k} className="ashtottara-pill stotram-pill">
                        {t(k)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* Founder Bio & Quote Section */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary-gold)', borderRadius: '20px' }}>
            <p className="section-subtitle" style={{ margin: 0 }}>{t('founder_subtitle')}</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '0.4rem 0 1rem' }}>
              {t('founder_name')}
            </h3>
            <blockquote className="founder-quote" style={{ margin: '1rem 0', fontSize: '1.15rem' }}>
              &ldquo;{t('founder_quote')}&rdquo;
            </blockquote>
            <p style={{ color: 'var(--text-light)', opacity: 0.9, fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
              {t('founder_desc')}
            </p>
          </div>
        </AnimatedSection>

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

        {/* Interactive 3D Books Showcase Section */}
        <AnimatedSection>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Interactive 3D Library</p>
          <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>{t('literary_title')}</h3>
          
          <div className="book-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', justifyContent: 'center' }}>
            {sacredBooks.map(b => (
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
                <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '240px', justifyContent: 'center' }}>
                  {b.actionType === 'youtube' ? (
                    <button 
                      onClick={() => handleBookAction(b)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '0.78rem', justifyContent: 'center', borderRadius: '8px', whiteSpace: 'nowrap', cursor: 'pointer' }}
                    >
                      ▶ {t('btn_listen_youtube')}
                    </button>
                  ) : (
                    <>
                      <a 
                        href={b.archiveUrl || b.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary"
                        style={{ flex: 1, padding: '8px 12px', fontSize: '0.75rem', justifyContent: 'center', borderRadius: '8px', whiteSpace: 'nowrap' }}
                      >
                        📖 View Book
                      </a>
                      <a 
                        href={b.pdfUrl} 
                        download="Kalaabhaanu-Vijayamu.pdf"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary"
                        style={{ flex: 1, padding: '8px 12px', fontSize: '0.75rem', justifyContent: 'center', borderRadius: '8px', whiteSpace: 'nowrap' }}
                      >
                        📥 PDF
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
