import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

const books = ['book1', 'book2', 'book3']

export default function Founder() {
  const { t } = useLanguage()
  return (
    <section id="founder-section" className="section">
      <AnimatedSection className="section-container">
        <div className="founder-grid">
          <div className="founder-image-col">
            <div className="founder-portrait-frame">
              <img src="/assets/founder_portrait.png" alt={t('founder_name')} />
            </div>
          </div>
          <div className="founder-text-col">
            <p className="section-subtitle">{t('founder_subtitle')}</p>
            <h2 className="section-title">{t('founder_name')}</h2>
            <p className="founder-role">{t('founder_role')}</p>
            <blockquote className="founder-quote">&ldquo;{t('founder_quote')}&rdquo;</blockquote>
            <p className="founder-desc">{t('founder_desc')}</p>
          </div>
        </div>

        <AnimatedSection>
          <h3 className="section-title">{t('literary_title')}</h3>
        </AnimatedSection>

        <div className="book-grid">
          {books.map(b => (
            <motion.div key={b} className="book-card" whileHover={{ scale: 1.05 }}>
              <img src={`/assets/book_${b}_ramayanam.jpg`} alt={t(`${b}_title`)} />
              <div>
                <h4 className="book-genre">{t(`${b}_genre`)}</h4>
                <h3 className="book-title">{t(`${b}_title`)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
