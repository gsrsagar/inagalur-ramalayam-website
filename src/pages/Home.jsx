import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useLoader } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { TextureLoader } from 'three'
import ScrollingTicker from '../components/ScrollingTicker'
import { useLightbox } from '../components/Lightbox'

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

const heroPhotos = [
  {
    id: 'hero-emblem',
    url: '/assets/temple_logo_emblem.jpg',
    titleTe: 'శ్రీ సీత రామ స్వామి దేవస్థానం ఇనగలూరు - దివ్య రాజముద్ర',
    titleEn: 'Sri Seetha Rama Swamy Devasthanam Inagalur - Divine Emblem',
    tagTe: 'రాజముద్ర',
    tagEn: 'Sacred Emblem',
    badge: 'Emblem'
  },
  {
    id: 'hero-deity-1',
    url: '/assets/ramalayam_deity_1.jpg',
    titleTe: 'శ్రీ సీతాలక్ష్మణ హనుమత్సమేత శ్రీ కోదండ రామచంద్ర స్వామి',
    titleEn: 'Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy',
    tagTe: 'దివ్య దర్శనం',
    tagEn: 'Divya Darshanam',
    badge: '2024'
  },
  {
    id: 'hero-deity-4',
    url: '/assets/ramalayam_deity_4.jpg',
    titleTe: 'శ్రీ రామచంద్ర స్వామి మూలమూర్తి దివ్య మంగళ దర్శనం',
    titleEn: 'Sri Ramachandra Swamy Sacred Sanctum Close-up Darshan',
    tagTe: 'మూలమూర్తి సేవ',
    tagEn: 'Sanctum Deity',
    badge: 'Moolavirat'
  },
  {
    id: 'hero-deity-2',
    url: '/assets/ramalayam_deity_2.jpg',
    titleTe: 'గర్భాలయ మూలవిరాట్ సమగ్ర పుష్పాలంకార దీపారాధన',
    titleEn: 'Complete Sanctum Sanctorum Floral Alankaram & Deeparadhana',
    tagTe: 'దీపారాధన',
    tagEn: 'Deeparadhana',
    badge: 'Sanctum'
  },
  {
    id: 'hero-deity-3',
    url: '/assets/ramalayam_deity_3.jpg',
    titleTe: 'శ్రీ సీతారామచంద్ర స్వామి పుష్పాలంకార తోరణ వైభవం',
    titleEn: 'Grand Celestial Floral Toranam & Sacred Alankaram',
    tagTe: 'పుష్పాలంకారం',
    tagEn: 'Floral Alankaram',
    badge: 'Alankaram'
  },
  {
    id: 'hero-swami',
    url: '/assets/swami_portrait.jpg',
    titleTe: 'శ్రీ సుబ్బరామప్ప గారు (గురుదేవులు & పరమ రామభక్తులు)',
    titleEn: 'Sri Subbaraamappa Gaaru (Temple Founder & Revered Devotee)',
    tagTe: 'గురుదేవులు',
    tagEn: 'Founder & Yogi',
    badge: '30+ Yrs'
  }
]

export default function Home() {
  const { t, language } = useLanguage()
  const { open } = useLightbox()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const activePhoto = heroPhotos[currentIndex]

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroPhotos.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length)
  }, [])

  useEffect(() => {
    if (isHovered) return
    timerRef.current = setInterval(nextSlide, 5000)
    return () => clearInterval(timerRef.current)
  }, [isHovered, nextSlide])

  const handleOpenLightbox = () => {
    open({
      type: 'photo',
      url: activePhoto.url,
      title: language === 'te' ? activePhoto.titleTe : activePhoto.titleEn,
      desc: language === 'te' ? `${activePhoto.tagTe} • ఇనగలూరు శ్రీ కోదండ రామాలయం` : `${activePhoto.tagEn} • Inagalur Sri Kodanda Ramalayam`
    })
  }

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
              className="hero-carousel-container"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="hero-image-glow" />

              <div className="hero-carousel-viewport" onClick={handleOpenLightbox}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhoto.id}
                    className="hero-carousel-slide"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <img
                      src={activePhoto.url}
                      alt={language === 'te' ? activePhoto.titleTe : activePhoto.titleEn}
                      className="hero-image"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Carousel Navigation Buttons */}
                <button
                  type="button"
                  className="hero-nav-btn prev"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevSlide()
                  }}
                  aria-label="Previous Photo"
                >
                  ❮
                </button>
                <button
                  type="button"
                  className="hero-nav-btn next"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextSlide()
                  }}
                  aria-label="Next Photo"
                >
                  ❯
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="hero-carousel-dots" onClick={(e) => e.stopPropagation()}>
                {heroPhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
