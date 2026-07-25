import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'
import { motion } from 'framer-motion'

const Activities = () => {
  const { activities } = useData()
  const { t } = useLanguage()

  const now = new Date()

  const upcoming = (activities || []).filter(
    (a) => a.date && new Date(a.date) >= now
  )
  const past = (activities || []).filter(
    (a) => a.date && new Date(a.date) < now
  )

  return (
    <AnimatedSection>
      <section className="section">
        <div className="container">
          <p className="section-subtitle">{t('activitiesSubtitle', 'Upcoming Events')}</p>
          <h2 className="section-title">{t('activitiesTitle', 'Temple Activities')}</h2>

          {!activities || activities.length === 0 ? (
            <div className="empty-state">{t('noActivities', 'No upcoming activities')}</div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <>
                  <h3 className="subsection-title">{t('upcoming', 'Upcoming')}</h3>
                  <div className="grid grid-3">
                    {upcoming.map((activity, index) => (
                      <motion.div
                        key={activity._id || index}
                        className="admin-panel"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          border: '2px solid var(--gold)',
                          borderRadius: 16,
                          overflow: 'hidden',
                        }}
                      >
                        {activity.image && (
                          <img
                            src={activity.image}
                            alt={activity.title}
                            style={{ width: '100%', height: 200, objectFit: 'cover' }}
                          />
                        )}
                        <div style={{ padding: '1rem' }}>
                          <h3>{activity.title}</h3>
                          <p className="text-muted">{activity.date}</p>
                          {activity.time && <p className="text-muted">{activity.time}</p>}
                          {activity.location && <p className="text-muted">{activity.location}</p>}
                          <p>{activity.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {past.length > 0 && (
                <>
                  <h3 className="subsection-title" style={{ marginTop: '2rem' }}>
                    {t('past', 'Past')}
                  </h3>
                  <div className="grid grid-3">
                    {past.map((activity, index) => (
                      <motion.div
                        key={activity._id || index}
                        className="admin-panel"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          opacity: 0.6,
                          border: '1px solid var(--glass-border)',
                          borderRadius: 16,
                          overflow: 'hidden',
                        }}
                      >
                        {activity.image && (
                          <img
                            src={activity.image}
                            alt={activity.title}
                            style={{ width: '100%', height: 200, objectFit: 'cover' }}
                          />
                        )}
                        <div style={{ padding: '1rem' }}>
                          <h3>{activity.title}</h3>
                          <p className="text-muted">{activity.date}</p>
                          {activity.time && <p className="text-muted">{activity.time}</p>}
                          {activity.location && <p className="text-muted">{activity.location}</p>}
                          <p>{activity.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </AnimatedSection>
  )
}

export default Activities

