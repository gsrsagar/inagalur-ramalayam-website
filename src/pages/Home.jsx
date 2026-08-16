import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas, useLoader } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { TextureLoader } from 'three'
import AnimatedSection from '../components/AnimatedSection'

function RamaBanamBg() {
  const texture = useLoader(TextureLoader, '/assets/Rama_Banamm.png')
  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.3}>
      <mesh scale={[2.2, 2.2, 1]}>
        <planeGeometry args={[1.5, 2]} />
        <meshBasicMaterial map={texture} transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </Float>
  )
}

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />

        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 1,
          }}
        >
          <ambientLight intensity={1} />
          <RamaBanamBg />
        </Canvas>

        <div className="hero-content">
          <div className="hero-text-block">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('hero_badge')}
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero_title_prefix')} <span>{t('hero_title_highlight')}</span> {t('hero_title_suffix')}
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('hero_subtitle')}
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/history" className="btn-primary">
                {t('hero_cta_history')}
              </Link>
              <Link to="/gallery" className="btn-secondary">
                {t('hero_cta_darshan')}
              </Link>
            </motion.div>
          </div>

          <div className="hero-image-frame">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="hero-image-glow" />
              <img
                src="/assets/founder_portrait.png"
                alt={t('founder_name')}
                className="hero-image"
              />
              <div className="hero-year-badge">
                <span className="year">2024</span>
                <span className="label">{t('hero_year_label')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Tribute & Spotlight Section on Home */}
      <section className="section" style={{ position: 'relative', zIndex: 2, padding: '40px 20px 80px' }}>
        <AnimatedSection className="section-container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div className="home-founder-spotlight glass-card">
            <div className="home-founder-portrait-col">
              <div className="founder-portrait-frame animated-border-glow" style={{ maxWidth: '280px', margin: '0 auto' }}>
                <img
                  src="/assets/founder_portrait.png"
                  alt={t('founder_name')}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <h4 style={{ color: 'var(--bright-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.15rem', margin: '0 0 4px' }}>
                  {t('founder_name')}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                  {t('founder_role')}
                </p>
              </div>
            </div>

            <div className="home-founder-info-col">
              <span className="hero-badge" style={{ display: 'inline-block', marginBottom: '0.75rem', width: 'fit-content' }}>
                {t('founder_home_badge')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-light)', fontSize: '2rem', marginBottom: '0.8rem' }}>
                {t('founder_home_title')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
                {t('founder_home_desc')}
              </p>

              {/* 3 Books Mini Row */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <img src="/assets/book_ramayanam.png" alt="Ramayanam" style={{ width: '28px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--light-gold)' }}>{t('book1_title')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <img src="/assets/book_eeswara.png" alt="Eeswara" style={{ width: '28px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--light-gold)' }}>{t('book2_title')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <img src="/assets/book_kalaabhanu.png" alt="Kalaabhanu" style={{ width: '28px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--light-gold)' }}>{t('book3_title')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/founder" className="btn-primary">
                  {t('founder_home_cta')}
                </Link>
                <Link to="/gallery" className="btn-secondary">
                  {t('nav_gallery')}
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
