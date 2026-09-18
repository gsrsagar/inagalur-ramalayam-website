import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    descKey: 'donor_founder_desc',
    fullDesc: 'Around 1845, Late Sri Subbaramappa Pancharathnam founded and constructed the ancient sanctum of Sree Seetha Lakshmana Hanumath Sametha Ramachandra Swamy Temple in Inagalore. Serving as the village elder, he consecrated the sanctum sanctorum and initiated 180+ years of unbroken spiritual worship.',
    highlights: [
      'Original Temple Sanctum Construction (~1845)',
      'Consecration of Holy Krishnasila (Blackstone) Deities',
      'Established Daily Nithya Kainkaryams & Archana',
      'Enduring 180-Year Unbroken Spiritual Lineage'
    ]
  },
  {
    id: 'donor2',
    icon: '🪔',
    badgeKey: 'donor_rama_badge',
    nameKey: 'donor_rama_name',
    descKey: 'donor_rama_desc',
    fullDesc: 'Late Sri Satrasala Venkata Ramiah and Smt Peddamma with deep devotion commissioned and donated the divine Blackstone (Krishnasila) idol of Lord Sri Ramachandra Swamy. Sculpted with transcendental grace holding the divine bow and arrow, the idol has been revered by generations of devotees.',
    highlights: [
      'Sacred Blackstone (Krishnasila) Idol of Lord Sri Ramachandra',
      'Sculpted with Masterful Shilpa Shastra Iconography',
      'Donated by Satrasala Family with Selfless Devotion',
      'Consecrated in the Original Sanctum in 1845'
    ]
  },
  {
    id: 'donor3',
    icon: '🌸',
    badgeKey: 'donor_seetha_badge',
    nameKey: 'donor_seetha_name',
    descKey: 'donor_seetha_desc',
    fullDesc: 'Late Sri Nuligommu Subramanyappa and Smt Subbamma blessed the temple by donating the divine Blackstone (Krishnasila) idol of Divine Mother Seetha Devi. Embodying eternal grace, purity, and motherly protection, the idol stands beside Lord Rama in the sanctum sanctorum.',
    highlights: [
      'Divine Blackstone (Krishnasila) Idol of Mother Seetha Devi',
      'Epitome of Purity, Motherly Grace, and Auspiciousness',
      'Donated by Nuligommu Family of Inagalore',
      'Worshipped Continuously through Daily Nithya Pooja'
    ]
  },
  {
    id: 'donor4',
    icon: '🏹',
    badgeKey: 'donor_lakshmana_badge',
    nameKey: 'donor_lakshmana_name',
    descKey: 'donor_lakshmana_desc',
    fullDesc: 'Late Sri Pancharathnam Subbaramappa and Smt Gowramma donated the sacred Blackstone (Krishnasila) idol of Lord Lakshmana Swamy. Depicted in royal posture with divine bow, symbolising eternal service, devotion, and steadfast protection to Lord Sri Ramachandra.',
    highlights: [
      'Sacred Blackstone (Krishnasila) Idol of Lord Lakshmana Swamy',
      'Embodiment of Selfless Service (Kainkaryam) & Valour',
      'Donated by Pancharathnam Family with Reverence',
      'Preserved and Re-consecrated in October 2024 Punah Pratishtha'
    ]
  }
]

const poojaChronology = [
  {
    id: 'pooja1',
    period: 'Upto 1967',
    name: 'Late Sri Pancharathnam Subbaramappa',
    role: 'Founder of the Temple & Nithya Kainkaryams till his demise in 1967',
    tag: 'Founder & Archaka',
    desc: 'Led the temple from inception, conducting daily Nithya Dhoopa Deepa Naivedyams, festive parayanams, and literary works until his holy demise in 1967.'
  },
  {
    id: 'pooja2',
    period: '1967 – 1981 (14 Years)',
    name: 'Late Sri Nuligommu Suryanarayana Rao',
    role: 'Dedicated Nithya Pooja and Archana Kainkaryams for 14 continuous years',
    tag: '14 Years Seva',
    desc: 'Selflessly performed daily archana, naivedyam, and weekly Saturday Abhishekam for 14 continuous years with utmost devotion and purity.'
  },
  {
    id: 'pooja3',
    period: '1981 – 1991 (10 Years)',
    name: 'Late Sri Nuligommu Kasipathi Rao',
    role: 'Sacred Nithya Pooja and Temple Aaradhana for 10 continuous years',
    tag: '10 Years Seva',
    desc: 'Maintained the sacred sanctum daily worship, Sri Rama Navami celebrations, and community pujas with great dedication for 10 full years.'
  },
  {
    id: 'pooja4',
    period: '1991 – 2000 (9 Years)',
    name: 'Late Sri Nuligommu Sreenivasappa',
    role: 'Devotional Nithya Pooja and Festival Celebrations for 9 continuous years',
    tag: '9 Years Seva',
    desc: 'Led uninterrupted morning and evening prayers, Harikathas, and annual festival kainkaryams for 9 years sustaining the temple tradition.'
  },
  {
    id: 'pooja5',
    period: '2000 – Sept 2024 (24 Years)',
    name: 'Sri Pancharathnam Nagaraja Rao',
    role: 'Retired Government Teacher who renovated the temple with RCC roof in 2000 and led Nithya Pooja for 24 years',
    tag: '24 Years Seva & Renovation',
    desc: 'A noble educator who renovated the ancient temple structure with a durable RCC roof in 2000, and performed daily pooja for 24 uninterrupted years.'
  },
  {
    id: 'pooja6',
    period: 'From Oct 2024 (Punahprathishta)',
    name: 'Sri Nuligommu Rama Mohan Rao',
    role: 'Voluntarily shifted family from Bangalore to Inagalore to perform Nithya Pooja Kainkaryams',
    tag: 'Current Archaka',
    desc: 'Demonstrating supreme devotion, he relocated his family from Bangalore back to ancestral Inagalore village to serve as full-time resident Archaka.'
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
    videoUrl: 'https://www.youtube.com/watch?v=wVGH-9Znwq4&list=PL4-zN5NLKyzwvbvtFOQYp7UjC62whcu',
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
  const [selectedItem, setSelectedItem] = useState(null)

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

        {/* =========================================================================
            VILLAGE HARMONY & PANCHAYATH INTERACTIVE BUTTON BANNER
           ========================================================================= */}
        <AnimatedSection style={{ marginBottom: '3.5rem' }}>
          <div className="village-harmony-interactive-card glass-card">
            <div className="harmony-top-row">
              <div className="village-harmony-badge">
                {t('village_harmony_badge')}
              </div>
              <span className="harmony-live-tag">🕊️ Mutual Respect & Unity</span>
            </div>

            <p className="village-harmony-text">
              {t('village_harmony_desc')}
            </p>

            <div className="harmony-action-row">
              <button
                type="button"
                className="harmony-btn-primary"
                onClick={() => setSelectedItem({
                  title: 'Inagalore Grama Panchayath • Communal Harmony & Unity',
                  subtitle: '~230 Houses • ~1200 Population',
                  icon: '🕊️',
                  desc: 'Inagalore is a small Revenue Village and Grama Panchayath having around 230 houses with approximately 1200 population comprising of all religions, castes, sects and sub sects. All the villagers live with mutual love, affection, and high respect towards other religions, celebrating festivals of all faiths with shared happiness and devotion.',
                  highlights: [
                    'Revenue Village & Grama Panchayath in Sri Sathya Sai District',
                    '230+ Families Living in Complete Mutual Harmony',
                    'Shared Devotion & Joyous Celebrations Across All Faiths',
                    'United Community Support for Temple Reconstruction'
                  ]
                })}
              >
                <span>🕊️ View Village Harmony & Unity Details</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* =========================================================================
            4 HISTORIC DONORS & BLACKSTONE IDOLS (INTERACTIVE BUTTONS & CARDS)
           ========================================================================= */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="historical-donors-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="reconstruction-badge">HISTORICAL DONORS & GUARDIANS</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.85rem', margin: '8px 0' }}>
              Sacred Blackstone (Krishnasila) Idols & Temple Founder
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '700px', margin: '0 auto' }}>
              Click any donor button below to view the sacred history and consecration details.
            </p>
          </div>

          <div className="historical-donors-grid">
            {historicalDonors.map((donor, idx) => (
              <motion.div
                key={donor.id}
                className="donor-interactive-card glass-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="donor-card-header">
                  <div className="donor-icon-wrap">
                    <span className="donor-icon">{donor.icon}</span>
                  </div>
                  <div className="donor-badge-text">
                    {t(donor.badgeKey)}
                  </div>
                </div>

                <h3 className="donor-name">
                  {t(donor.nameKey)}
                </h3>
                <p className="donor-desc">
                  {t(donor.descKey)}
                </p>

                <button
                  type="button"
                  className="donor-action-btn"
                  onClick={() => setSelectedItem({
                    title: t(donor.nameKey),
                    subtitle: t(donor.badgeKey),
                    icon: donor.icon,
                    desc: donor.fullDesc,
                    highlights: donor.highlights
                  })}
                >
                  <span>📖 View Consecration Details</span>
                  <span>→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* =========================================================================
            CHRONOLOGY OF NITHYA POOJA KAINKARYAMS (1845 TO PRESENT) BUTTONS
           ========================================================================= */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '32px 28px', borderRadius: '20px', border: '1.5px solid var(--border-gold)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="reconstruction-badge">1845 – 2026+ • UNBROKEN WORSHIP</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '8px 0' }}>
                {t('history_section_pooja_title')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Generations of devoted Archakas who maintained uninterrupted daily worship and kainkaryams.
              </p>
            </div>

            <div className="pooja-chronology-grid">
              {poojaChronology.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="pooja-chronology-interactive-card"
                  whileHover={{ y: -4 }}
                >
                  <div className="pooja-period-badge">{item.period}</div>
                  <h4 className="pooja-person-name">{item.name}</h4>
                  <p className="pooja-person-desc">{item.role}</p>

                  <button
                    type="button"
                    className="pooja-view-btn"
                    onClick={() => setSelectedItem({
                      title: item.name,
                      subtitle: `${item.period} • ${item.tag}`,
                      icon: '🕉️',
                      desc: item.desc,
                      highlights: [
                        `Dedicated Seva Period: ${item.period}`,
                        `Role: ${item.role}`,
                        'Conducted Daily Nithya Dhoopa Deepa Naivedyam',
                        'Preserved Temple Purity & Devotional Tradition'
                      ]
                    })}
                  >
                    <span>🕉️ View Seva Chronicle</span>
                    <span>→</span>
                  </button>
                </motion.div>
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
                    onClick={() => open(evt.videoUrl ? { type: 'video', url: evt.videoUrl, title: t(evt.title), desc: t(evt.desc) } : { type: 'photo', url: evt.image, title: t(evt.title), desc: t(evt.desc) })}
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

      {/* =========================================================================
          HISTORY DETAIL MODAL POPUP
         ========================================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <div className="work-modal-backdrop" onClick={() => setSelectedItem(null)}>
            <motion.div 
              className="work-modal-card glass-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            >
              <div className="work-modal-header">
                <div className="work-modal-title-wrap">
                  <span className="work-modal-icon">{selectedItem.icon}</span>
                  <div>
                    {selectedItem.subtitle && (
                      <span className="work-modal-genre">{selectedItem.subtitle}</span>
                    )}
                    <h3 className="work-modal-title">{selectedItem.title}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  className="work-modal-close-btn"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="work-modal-body">
                <p className="work-modal-desc">{selectedItem.desc}</p>

                {selectedItem.highlights && selectedItem.highlights.length > 0 && (
                  <div className="work-modal-highlights">
                    <h5 className="highlights-title">✦ Sacred Key Details & Significance:</h5>
                    <ul className="highlights-list">
                      {selectedItem.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="highlight-bullet">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="work-modal-footer">
                <button
                  type="button"
                  className="btn-primary modal-close-btn-bottom"
                  onClick={() => setSelectedItem(null)}
                >
                  <span>✓</span> Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}
