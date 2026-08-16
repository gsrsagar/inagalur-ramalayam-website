import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import { useLightbox } from '../components/Lightbox'
import AnimatedSection from '../components/AnimatedSection'

const festivalsList = [
  { sNo: 1, nameKey: 'fest_name_1', timeKey: 'fest_time_1', icon: '🏹' },
  { sNo: 2, nameKey: 'fest_name_2', timeKey: 'fest_time_2', icon: '🪔' },
  { sNo: 3, nameKey: 'fest_name_3', timeKey: 'fest_time_3', icon: '🌕' }
]

const pendingWorks = [
  { sNo: 1, nameKey: 'work1_name', costKey: 'work1_cost' },
  { sNo: 2, nameKey: 'work2_name', costKey: 'work2_cost' },
  { sNo: 3, nameKey: 'work3_name', costKey: 'work3_cost' }
]

const personsToRemember = [
  { sNo: 1, name: 'Inagalore Villagers', details: 'All Time Support for the development, sustenance and maintenance of the Temple.' },
  { sNo: 2, name: 'Late Sri Pancharathnam Subbaramappa', details: 'Founder of the Temple (~1845) & Nithya Kainkaryams till 1967.' },
  { sNo: 3, name: 'Late Sri Nuligommu Suryanarayana Rao', details: 'Nithya Pooja Kainkaryams for 14 Years (1967 to 1981).' },
  { sNo: 4, name: 'Late Sri Nuligommu Kasipathi Rao', details: 'Nithya Pooja Kainkaryams for 10 Years (1981 to 1991).' },
  { sNo: 5, name: 'Late Sri Nuligommu Srinivasappa', details: 'Nithya Pooja Kainkaryams for 9 Years (1991 to 2000).' },
  { sNo: 6, name: 'Sri Pancharathnam Nagaraja Rao', details: 'Nithya Pooja for 24 years (2000 to 2024) & Renovated Temple with RCC roof in 2000.' },
  { sNo: 7, name: 'Sri Nuligommu Rama Mohan Rao', details: 'Nithya Pooja since Oct 2024 — Voluntarily shifted family from Bangalore to Inagalore.' },
  { sNo: 8, name: 'Late Sri Sathrasala Narasimhiah Setty', details: 'Sponsored Karthika Pournima Annual Festival Expenditure for 25 years.' },
  { sNo: 9, name: 'Sri Gudibanda Seshagiri Rao', details: 'Performed Karthika Pournima Sacred Pooja for 25 years.' },
  { sNo: 10, name: 'Sathrasala Family, Inagalore', details: 'Donated 2 cents of land site for construction of Temple Room.' },
  { sNo: 11, name: 'Thallam Family, Inagalore', details: 'Sponsored Sri Rama Navami Annual Festival Expenditure for 10 years.' }
]

function FloatingAboutGeometry() {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <MeshDistortMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.25} />
      </mesh>
    </Float>
  )
}

export default function About() {
  const { t } = useLanguage()
  const { open } = useLightbox()

  return (
    <section id="about-section" className="section" style={{ position: 'relative', zIndex: 1, padding: '120px 20px 100px' }}>
      <div className="canvas-overlay">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <FloatingAboutGeometry />
        </Canvas>
      </div>

      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Title & Subtitle */}
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="section-subtitle" style={{ letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            ✦ {t('about_subtitle')} ✦
          </p>
          <h1 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('about_title')}
          </h1>
          <p style={{ color: 'var(--light-gold)', maxWidth: '850px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.95 }}>
            {t('about_desc')}
          </p>
        </AnimatedSection>

        {/* 1. Official Legal Registrations & Form 10AC Section */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '24px', border: '2px solid var(--border-gold)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="reconstruction-badge">{t('form10ac_badge')}</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '2rem', margin: '8px 0' }}>
                {t('form10ac_title')}
              </h2>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
                {t('form10ac_desc')}
              </p>
            </div>

            {/* Form 10AC Details Showcase Grid */}
            <div className="trust-details-layout" style={{ marginBottom: '2rem' }}>
              
              {/* Form 10AC Registration Summary */}
              <div className="bank-account-box glass-card" style={{ background: 'rgba(0,0,0,0.35)' }}>
                <h3 style={{ color: 'var(--bright-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '8px' }}>
                  📜 Section 12A Order Particulars
                </h3>
                <div className="bank-info-row">
                  <span className="bank-label">Trust Name:</span>
                  <span className="bank-val" style={{ fontWeight: 700 }}>SRI SEETHA LAKSHMANA HANUMATH SAMETHA RAMACHANDRA SWAMY TEMPLE TRUST</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">PAN:</span>
                  <span className="bank-val highlight" style={{ letterSpacing: '1px', fontSize: '1.05rem' }}>ABKTS6306C</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">URN (Unique Reg No):</span>
                  <span className="bank-val highlight" style={{ letterSpacing: '0.5px' }}>ABKTS6306CE20251</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">DIN:</span>
                  <span className="bank-val highlight" style={{ letterSpacing: '0.5px' }}>ABKTS6306CE2025101</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">Application Number:</span>
                  <span className="bank-val">532304240100326</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">Section & Rule:</span>
                  <span className="bank-val">Section 12A(1)(ac)(vi) • Rule 17A/11AA</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">Nature of Activities:</span>
                  <span className="bank-val highlight">Religious</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">Assessment Years:</span>
                  <span className="bank-val highlight">From AY 2026-27 to AY 2028-2029</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">Registration Authority:</span>
                  <span className="bank-val">Principal Commissioner / Commissioner of Income Tax</span>
                </div>
                <div className="bank-info-row">
                  <span className="bank-label">Trust Reg No:</span>
                  <span className="bank-val">8/2025 dated 11th June 2025 (District Registrar, Ananthapuramu)</span>
                </div>
              </div>

              {/* Form 10AC & PAN Card Action Box */}
              <div className="pan-card-box glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <h3 style={{ color: 'var(--bright-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', textAlign: 'center', margin: 0 }}>
                  🪪 Official Trust PAN & Documents
                </h3>

                <div 
                  className="pan-card-img-wrap"
                  onClick={() => open({ type: 'photo', url: '/assets/temple_pan_card.png', title: 'Official Temple Trust PAN Card (ABKTS6306C)', desc: 'Sri Seetha Lakshmana Hanumath Sametha Ramachandra Swamy Temple Trust' })}
                >
                  <img 
                    src="/assets/temple_pan_card.png" 
                    alt="Temple Trust PAN Card ABKTS6306C" 
                    className="pan-card-img"
                  />
                  <div className="pan-card-overlay">
                    <span>🔍 Click to View Full PAN Card & Download</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px' }}>
                  <a 
                    href="/assets/Form_10AC_Registration.pdf" 
                    download="Form_10AC_Provisional_Registration.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textAlign: 'center', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    📥 {t('btn_download_10ac')}
                  </a>
                  <a 
                    href="/assets/Form_10AC_Registration.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ textAlign: 'center', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    📄 {t('btn_view_10ac')}
                  </a>
                </div>
              </div>

            </div>

          </div>
        </AnimatedSection>

        {/* 2. Official Bank Account Details */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '24px', border: '1.5px solid var(--border-gold)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="reconstruction-badge">OFFICIAL DONATION BANK ACCOUNT</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '8px 0' }}>
                Bank Account for Temple Kainkaryams & Development
              </h2>
            </div>

            <div className="bank-account-box glass-card" style={{ maxWidth: '850px', margin: '0 auto', background: 'rgba(0,0,0,0.3)' }}>
              <div className="bank-info-row">
                <span className="bank-label">Account Type:</span>
                <span className="bank-val highlight">CURRENT ACCOUNT</span>
              </div>
              <div className="bank-info-row">
                <span className="bank-label">Account Name:</span>
                <span className="bank-val">Sri Seetha Lakshmana Hanumath sametha Ramachandra Swamy Temple Trust</span>
              </div>
              <div className="bank-info-row">
                <span className="bank-label">Account Number:</span>
                <span className="bank-val highlight" style={{ letterSpacing: '1.5px', fontSize: '1.2rem' }}>563411000189871</span>
              </div>
              <div className="bank-info-row">
                <span className="bank-label">IFSC Code:</span>
                <span className="bank-val highlight" style={{ letterSpacing: '1px', fontSize: '1.05rem' }}>UBIN0CG7999</span>
              </div>
              <div className="bank-info-row">
                <span className="bank-label">Name of the Bank:</span>
                <span className="bank-val">Andhra Pradesh Grameena Bank (Government Scheduled Bank)</span>
              </div>
              <div className="bank-info-row">
                <span className="bank-label">Branch:</span>
                <span className="bank-val">Obula Devara Cheruvu Branch</span>
              </div>
              <div className="bank-info-row">
                <span className="bank-label">Address:</span>
                <span className="bank-val">Inagalore Village, Obula Devara Cheruvu Mandal, Sri Sathya Sai District, AP - 515591</span>
              </div>
              <div className="bank-info-row">
                <span className="bank-label">Contact Person:</span>
                <span className="bank-val">Sri Krishna Kumar Pancharathnam (President, Temple Trust) • 📞 +91 99087 15022</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => window.dispatchEvent(new CustomEvent('open-donate-modal'))}
              >
                🙏 Donate Online (విరాళం ఇవ్వండి)
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* 3. Pending Works & Financial Appeal */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '24px', border: '1.5px solid var(--border-gold)', background: 'linear-gradient(135deg, rgba(88,24,26,0.35), rgba(12,12,16,0.85))' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="reconstruction-badge" style={{ background: '#d97706', color: '#fff' }}>DEVOTIONAL APPEAL</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '8px 0' }}>
                {t('pending_works_title')}
              </h2>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '850px', margin: '0 auto' }}>
                {t('pending_works_desc')}
              </p>
            </div>

            <div className="history-table-wrapper" style={{ marginBottom: '1.5rem' }}>
              <table className="history-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px', textAlign: 'center' }}>S.No</th>
                    <th>Nature of Work (పని వివరము)</th>
                    <th style={{ textAlign: 'right' }}>Estimated Cost (అంచనా వ్యయం)</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingWorks.map((work) => (
                    <tr key={work.sNo}>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--bright-gold)' }}>{work.sNo}</td>
                      <td style={{ fontWeight: 600, color: 'var(--text-light)' }}>{t(work.nameKey)}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--bright-gold)' }}>{t(work.costKey)}</td>
                    </tr>
                  ))}
                  <tr style={{ background: 'rgba(212, 175, 55, 0.15)' }}>
                    <td colSpan={2} style={{ textAlign: 'right', fontWeight: 700, color: 'var(--bright-gold)', fontSize: '1.05rem' }}>
                      {t('total_estimated_cost')}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--bright-gold)', fontSize: '1.15rem' }}>
                      ₹28,45,000.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => window.dispatchEvent(new CustomEvent('open-donate-modal'))}
              >
                🙏 Contribute for Sacred Works
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* 4. Sacred Festivals & Occasions */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '24px', border: '1.5px solid var(--border-gold)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="reconstruction-badge">DIVINE CALENDAR</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '8px 0' }}>
                {t('festivals_title')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px', margin: '0 auto' }}>
                {t('festivals_desc')}
              </p>
            </div>

            <div className="history-table-wrapper">
              <table className="history-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px', textAlign: 'center' }}>S.No</th>
                    <th>Festivals / Occasions (పండుగలు / ఉత్సవాలు)</th>
                    <th>Month / Timing (మాసము / సమయము)</th>
                  </tr>
                </thead>
                <tbody>
                  {festivalsList.map((fest) => (
                    <tr key={fest.sNo}>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--bright-gold)' }}>{fest.sNo}</td>
                      <td style={{ fontWeight: 600, color: 'var(--text-light)' }}>
                        <span style={{ marginRight: '8px' }}>{fest.icon}</span>
                        {t(fest.nameKey)}
                      </td>
                      <td style={{ color: 'var(--light-gold)' }}>{t(fest.timeKey)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* 5. Persons to Remember Tribute Table */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '24px', border: '1.5px solid var(--border-gold)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="reconstruction-badge">ETERNAL TRIBUTE</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '8px 0' }}>
                {t('persons_remember_title')}
              </h2>
            </div>

            <div className="history-table-wrapper">
              <table className="history-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '70px', textAlign: 'center' }}>S.No</th>
                    <th style={{ width: '320px' }}>Name of the Person / Family (పేరు)</th>
                    <th>Particulars & Sacred Contribution (విశేష సేవలు)</th>
                  </tr>
                </thead>
                <tbody>
                  {personsToRemember.map((p) => (
                    <tr key={p.sNo}>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--bright-gold)' }}>{p.sNo}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text-light)' }}>{p.name}</td>
                      <td style={{ color: 'var(--light-gold)', lineHeight: '1.5' }}>{p.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
