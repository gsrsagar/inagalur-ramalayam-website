import { Suspense } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas, useLoader } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { TextureLoader } from 'three'
import ScrollingTicker from '../components/ScrollingTicker'

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
      <ScrollingTicker />
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
          <Suspense fallback={null}>
            <RamaBanamBg />
          </Suspense>
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
                src="/assets/temple_hero_deity.png"
                alt="Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy"
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
    </>
  )
}
