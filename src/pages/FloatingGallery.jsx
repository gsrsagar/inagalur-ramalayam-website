import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'
import Slideshow from '../components/Slideshow'

export default function FloatingGallery() {
  const { t } = useLanguage()
  return (
    <section id="floating-media-section" className="section">
      <AnimatedSection className="section-container">
        <p className="section-subtitle">{t('floating_subtitle')}</p>
        <h2 className="section-title">{t('floating_title')}</h2>
        <p className="section-desc">{t('floating_desc')}</p>
      </AnimatedSection>

      <AnimatedSection>
        <Slideshow />
      </AnimatedSection>
    </section>
  )
}
