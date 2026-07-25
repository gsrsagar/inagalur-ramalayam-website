import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

function FloatingServicesGeometry() {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial color="#8B0000" emissive="#d4af37" emissiveIntensity={0.2} distort={0.4} />
      </Sphere>
    </Float>
  )
}

export default function Services() {
  const { t } = useLanguage()
  return (
    <section id="services-section" className="section">
      <div className="canvas-overlay">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <FloatingServicesGeometry />
        </Canvas>
      </div>

      <AnimatedSection className="section-container">
        <p className="section-subtitle">{t('services_subtitle')}</p>
        <h2 className="section-title">{t('services_title')}</h2>
        <p className="section-desc">{t('services_desc')}</p>
      </AnimatedSection>

      <AnimatedSection>
        <div className="services-grid">
          <div className="service-card highlight">
            <div className="service-icon">🍛</div>
            <h3 className="service-title">{t('service1_title')}</h3>
            <p className="service-desc">{t('service1_desc')}</p>
            <div className="service-stats">
              <div className="stat">
                <span className="stat-value">10,000+</span>
                <span className="stat-label">{t('service1_stat1')}</span>
              </div>
              <div className="stat">
                <span className="stat-value">30</span>
                <span className="stat-label">{t('service1_stat2')}</span>
              </div>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">🪔</div>
            <h3 className="service-title">{t('service2_title')}</h3>
            <p className="service-desc">{t('service2_desc')}</p>
          </div>

          <div className="service-card">
            <div className="service-icon">📿</div>
            <h3 className="service-title">{t('service3_title')}</h3>
            <p className="service-desc">{t('service3_desc')}</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
