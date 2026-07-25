import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'
import { motion } from 'framer-motion'

const Members = () => {
  const { members } = useData()
  const { t } = useLanguage()

  return (
    <AnimatedSection>
      <section className="section">
        <div className="container">
          <p className="section-subtitle">{t('membersSubtitle', 'Temple Committee')}</p>
          <h2 className="section-title">{t('membersTitle', 'Our Members')}</h2>

          {!members || members.length === 0 ? (
            <div className="empty-state">{t('noMembers', 'No members added yet')}</div>
          ) : (
            <div className="grid grid-3">
              {members.map((member, index) => (
                <motion.div
                  key={member._id || index}
                  className="admin-panel glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '1.5rem',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 16,
                  }}
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '0.75rem',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'var(--glass-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--gold)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <h3 style={{ fontWeight: 700, color: 'var(--gold)' }}>{member.name}</h3>
                  {member.designation && <p className="text-muted">{member.designation}</p>}
                  {member.village && <p className="text-muted">{member.village}</p>}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="phone-link">{member.phone}</a>
                  )}
                  {member.bio && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{member.bio}</p>}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimatedSection>
  )
}

export default Members

