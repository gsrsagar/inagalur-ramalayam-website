import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import { useLightbox } from '../components/Lightbox'
import AnimatedSection from '../components/AnimatedSection'

const historicalDonors = [
  {
    id: 'donor1',
    icon: '🚩',
    badgeKey: 'donor_founder_badge',
    nameKey: 'donor_founder_name',
    descKey: 'donor_founder_desc'
  },
  {
    id: 'donor2',
    icon: '🪔',
    badgeKey: 'donor_rama_badge',
    nameKey: 'donor_rama_name',
    descKey: 'donor_rama_desc'
  },
  {
    id: 'donor3',
    icon: '🌸',
    badgeKey: 'donor_seetha_badge',
    nameKey: 'donor_seetha_name',
    descKey: 'donor_seetha_desc'
  },
  {
    id: 'donor4',
    icon: '🏹',
    badgeKey: 'donor_lakshmana_badge',
    nameKey: 'donor_lakshmana_name',
    descKey: 'donor_lakshmana_desc'
  }
]

const poojaChronology = [
  {
    period: 'Upto 1967',
    name: 'Late Sri Pancharathnam Subbaramappa',
    role: 'Founder of the Temple & Nithya Kainkaryams till his demise in 1967',
    tag: 'Founder & Archaka'
  },
  {
    period: '1967 – 1981 (14 Years)',
    name: 'Late Sri Nuligommu Suryanarayana Rao',
    role: 'Dedicated Nithya Pooja and Archana Kainkaryams for 14 continuous years',
    tag: '14 Years Seva'
  },
  {
    period: '1981 – 1991 (10 Years)',
    name: 'Late Sri Nuligommu Kasipathi Rao',
    role: 'Sacred Nithya Pooja and Temple Aaradhana for 10 continuous years',
    tag: '10 Years Seva'
  },
  {
    period: '1991 – 2000 (9 Years)',
    name: 'Late Sri Nuligommu Sreenivasappa',
    role: 'Devotional Nithya Pooja and Festival Celebrations for 9 continuous years',
    tag: '9 Years Seva'
  },
  {
    period: '2000 – Sept 2024 (24 Years)',
    name: 'Sri Pancharathnam Nagaraja Rao',
    role: 'Retired Government Teacher who renovated the temple with RCC roof in 2000 and led Nithya Pooja for 24 years',
    tag: '24 Years Seva & Renovation'
  },
  {
    period: 'From Oct 2024 (Punahprathishta)',
    name: 'Sri Nuligommu Rama Mohan Rao',
    role: 'Voluntarily shifted family from Bangalore to Inagalore to perform Nithya Pooja Kainkaryams',
    tag: 'Current Archaka'
  }
]

const reconstructionPhotos = [
  {
    id: 'rec1',
    img: '/assets/temple_reconstruction1.jpeg',
    titleKey: 'photo_reconstruction1',
    descKey: 'timeline_2024_desc'
  },
  {
    id: 'rec2',
    img: '/assets/temple_reconstruction2.jpeg',
    titleKey: 'photo_reconstruction2',
    descKey: 'timeline_2024_desc'
  },
  {
    id: 'gopuram',
    img: '/assets/temple_reconstruction.png',
    titleKey: 'photo_gopuram',
    descKey: 'timeline_2024_desc'
  }
]

const timeline = [
  { 
    year: 'timeline_1845_year', 
    title: 'timeline_1845_title', 
    desc: 'timeline_1845_desc', 
    image: '/assets/temple_hero_deity.png', 
    side: 'left' 
  },
  { 
    year: 'timeline_1900_year', 
    title: 'timeline_1900_title', 
    desc: 'timeline_1900_desc', 
    image: '/assets/book_ramayanam.png', 
    side: 'right' 
  },
  { 
    year: 'timeline_2020_year', 
    title: 'timeline_2020_title', 
    desc: 'timeline_2020_desc', 
    image: '/assets/temple_reconstruction.png', 
    side: 'left' 
  },
  { 
    year: 'timeline_2024_year', 
    title: 'timeline_2024_title', 
    desc: 'timeline_2024_desc', 
    image: '/assets/temple_reconstruction1.jpeg', 
    side: 'right' 
  },
]

function FloatingHistoryGeometry() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <torusKnotGeometry args={[1, 0.4, 128, 16]} />
        <MeshDistortMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  )
}

export default function History() {
  const { t } = useLanguage()
  const { open } = useLightbox()

  return (
    <section id="history-section" className="section" style={{ position: 'relative', zIndex: 1, padding: '120px 20px 100px' }}>
      <div className="canvas-overlay">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <FloatingHistoryGeometry />
        </Canvas>
      </div>

      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Title & Subtitle */}
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-subtitle" style={{ letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            ✦ {t('history_subtitle')} ✦
          </p>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
            {t('history_title')}
          </h1>
          <p style={{ color: 'var(--light-gold)', maxWidth: '850px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.95 }}>
            {t('history_desc')}
          </p>
        </AnimatedSection>

        {/* Village Harmony Banner */}
        <AnimatedSection style={{ marginBottom: '3.5rem' }}>
          <div className="village-harmony-card glass-card">
            <div className="village-harmony-badge">
              {t('village_harmony_badge')}
            </div>
            <p className="village-harmony-text">
              {t('village_harmony_desc')}
            </p>
          </div>
        </AnimatedSection>

        {/* 4 Historic Donors & Blackstone Idols Cards */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="historical-donors-grid">
            {historicalDonors.map((donor, idx) => (
              <motion.div
                key={donor.id}
                className="donor-card glass-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="donor-icon-wrap">
                  <span className="donor-icon">{donor.icon}</span>
                </div>
                <div className="donor-badge-text">
                  {t(donor.badgeKey)}
                </div>
                <h3 className="donor-name">
                  {t(donor.nameKey)}
                </h3>
                <p className="donor-desc">
                  {t(donor.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Chronology of Nithya Pooja Kainkaryams (1845 to Present) */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '32px 28px', borderRadius: '20px', border: '1.5px solid var(--border-gold)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="reconstruction-badge">1845 – 2026+ • UNBROKEN WORSHIP</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '8px 0' }}>
                {t('history_section_pooja_title')}
              </h2>
            </div>

            <div className="pooja-chronology-grid">
              {poojaChronology.map((item, idx) => (
                <div key={idx} className="pooja-chronology-item">
                  <div className="pooja-period-badge">{item.period}</div>
                  <h4 className="pooja-person-name">{item.name}</h4>
                  <p className="pooja-person-desc">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 300-Year Sacred Peepal Tree & 2024 Renovation Story */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '32px 28px', borderRadius: '20px', border: '1.5px solid var(--border-gold)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span className="reconstruction-badge">ASWARTHA VRUKSHAMU • MAY 2024</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '8px 0' }}>
                {t('history_section_tree_title')}
              </h2>
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
              {t('history_tree_desc')}
            </p>
            <p style={{ color: 'var(--light-gold)', fontSize: '0.95rem', lineHeight: '1.8', background: 'rgba(212, 175, 55, 0.08)', padding: '14px 18px', borderRadius: '12px', borderLeft: '4px solid var(--bright-gold)' }}>
              {t('history_punah_desc')}
            </p>
          </div>
        </AnimatedSection>

        {/* Dedicated 2024 Reconstruction Photo Gallery Section */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="reconstruction-showcase-container glass-card">
            <div className="reconstruction-header">
              <span className="reconstruction-badge">2024 • PUNA PRATHISTHA</span>
              <h2 className="reconstruction-main-title">{t('timeline_2024_title')}</h2>
              <p className="reconstruction-main-desc">{t('timeline_2024_desc')}</p>
            </div>

            <div className="reconstruction-grid-enhanced">
              {reconstructionPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  className="reconstruction-card-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => open({ type: 'photo', url: photo.img, title: t(photo.titleKey), desc: t(photo.descKey) })}
                >
                  <div className="reconstruction-img-wrapper">
                    <img src={photo.img} alt={t(photo.titleKey)} className="reconstruction-full-thumb" />
                    <div className="reconstruction-overlay-hover">
                      <span className="reconstruction-zoom-icon">🔍 View & Download</span>
                    </div>
                  </div>
                  <div className="reconstruction-card-caption">
                    <h4 className="reconstruction-card-title">{t(photo.titleKey)}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Timeline Title */}
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-subtitle">Chronology of Faith</p>
          <h2 className="section-title">Grand Construction & Sacred Journey</h2>
        </AnimatedSection>

        {/* Timeline Events */}
        <div className="timeline" style={{ marginBottom: '3.5rem' }}>
          {timeline.map((evt, i) => (
            <AnimatedSection key={i}>
              <div className={`timeline-event ${evt.side}`}>
                <div className="timeline-content glass-card">
                  <span className="timeline-year">{t(evt.year)}</span>
                  <h3>{t(evt.title)}</h3>
                  <p>{t(evt.desc)}</p>
                </div>

                {evt.image && (
                  <div 
                    className="timeline-image-wrapper"
                    onClick={() => open({ type: 'photo', url: evt.image, title: t(evt.title), desc: t(evt.desc) })}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={evt.image} alt={t(evt.title)} loading="lazy" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bridge Card to About / Trust Details */}
        <AnimatedSection style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '32px', borderRadius: '20px', border: '1.5px solid var(--border-gold)', background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(12,12,16,0.9))' }}>
            <span className="reconstruction-badge">TRUST & COMPLIANCE</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.6rem', margin: '8px 0 12px' }}>
              Explore Official Temple Trust, Form 10AC & Development Plans
            </h3>
            <p style={{ color: 'var(--text-light)', maxWidth: '750px', margin: '0 auto 1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              View the 12A Income Tax Provisional Registration (Form 10AC), Trust PAN card, Bank particulars, Pending Works budget, and Annual Festivals calendar.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn-primary">
                🏛️ {t('nav_about')} →
              </Link>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => window.dispatchEvent(new CustomEvent('open-donate-modal'))}
              >
                🙏 Donate for Temple Works
              </button>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
