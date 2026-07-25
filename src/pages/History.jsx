import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

const timeline = [
  { year: 'timeline_1800_year', title: 'timeline_1800_title', desc: 'timeline_1800_desc', image: '/assets/temple_hero_deity.png', side: 'left' },
  { year: 'timeline_1900_year', title: 'timeline_1900_title', desc: 'timeline_1900_desc', image: '/assets/book_ramayanam.jpg', side: 'right' },
  { year: 'timeline_2020_year', title: 'timeline_2020_title', desc: 'timeline_2020_desc', image: '/assets/temple_reconstruction.png', side: 'left' },
  { year: 'timeline_2024_year', title: 'timeline_2024_title', desc: 'timeline_2024_desc', image: '/assets/anna_daana.png', side: 'right' },
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
  return (
    <section id="history-section" className="section">
      <div className="canvas-overlay">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <FloatingHistoryGeometry />
        </Canvas>
      </div>

      <AnimatedSection className="section-container">
        <p className="section-subtitle">{t('history_subtitle')}</p>
        <h2 className="section-title">{t('history_title')}</h2>
        <p className="section-desc">{t('history_desc')}</p>
      </AnimatedSection>

      <div className="timeline">
        {timeline.map((evt, i) => (
          <AnimatedSection key={i}>
            <div className={`timeline-event ${evt.side}`}>
              <div className="timeline-content glass-card">
                <span className="timeline-year">{t(evt.year)}</span>
                <h3>{t(evt.title)}</h3>
                <p>{t(evt.desc)}</p>
              </div>
              <div className="timeline-image-wrapper">
                <img src={evt.image} alt={t(evt.title)} loading="lazy" />
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
