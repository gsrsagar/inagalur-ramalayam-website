import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'
import { motion } from 'framer-motion'

const Events = () => {
  const { events } = useData()
  const { t } = useLanguage()

  return (
    <AnimatedSection>
      <section className="section">
        <div className="container">
          <p className="section-subtitle">{t('eventsSubtitle', 'Our Sacred Events')}</p>
          <h2 className="section-title">{t('eventsTitle', 'Past Temple Events')}</h2>

          {!events || events.length === 0 ? (
            <div className="empty-state">{t('noEvents', 'No events recorded yet')}</div>
          ) : (
            <div className="grid grid-3">
              {events.map((event, index) => (
                <motion.div
                  key={event._id || index}
                  className="admin-panel"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  style={{ border: '1px solid var(--glass-border)', borderRadius: 16, overflow: 'hidden' }}
                >
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '1rem' }}>
                    <h3>{event.title}</h3>
                    <p className="text-muted">{event.date}</p>
                    {event.location && <p className="text-muted">{event.location}</p>}
                    <p>{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimatedSection>
  )
}

export default Events

