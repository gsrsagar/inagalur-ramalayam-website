import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

const sacredBooks = [
  {
    id: 'book1',
    titleKey: 'book1_title',
    genreKey: 'book1_genre',
    img: '/assets/book_ramayanam.png',
    actionType: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=wVGH-9Znwq4&list=PL4-zN5NLKyzwvbvtFOQYp7UjC62whcu',
    backDesc: 'A sacred illustrated poetic work meditating upon the holy name of Lord Sri Rama, replete with divine artwork, verses and spiritual devotion.'
  },
  {
    id: 'book2',
    titleKey: 'book2_title',
    genreKey: 'book2_genre',
    img: '/assets/book_eeswara.png',
    actionType: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=MzO9IC-Sbwg&list=PL4-zN5NLKyzzXiTag01CJ2WpY0W1KIhK2',
    backDesc: 'An insightful philosophical and spiritual novel elaborating on devotion, omnipresence of the Divine, and pathways of spiritual surrender.'
  },
  {
    id: 'book3',
    titleKey: 'book3_title',
    genreKey: 'book3_genre',
    img: '/assets/book_kalaabhanu.png',
    actionType: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=sIA3zIHy1YU&list=PL4-zN5NLKyzwk6U4kzrnQr1Ei-cTlsMUf',
    pdfUrl: '/assets/Kalaabhaanu-Vijayamu.pdf',
    archiveUrl: 'https://archive.org/details/in.ernet.dli.2015.331109',
    backDesc: 'A classical Telugu literary masterwork highlighting romantic folk narrative, moral virtues, and cultural brilliance.'
  }
]

const classicalDramas = [
  {
    id: 'drama1',
    icon: '🎭',
    titleKey: 'drama1_title',
    genreKey: 'drama1_genre',
    desc: 'An exquisite classical play dramatizing the divine legend and heroic valour of Arjuna and Subhadra.',
    shloka: 'శ్రీ కృష్ణ ద్వైపాయన ప్రణీత భారత కథాంశము • వీర రస ప్రధాన నాటక రాజము',
    fullDesc: 'Subhadra Arjuneyam is an exquisite classical Yakshagana and theatrical drama composed with poetic mastery. It portrays the heroic journey of Arjuna, the divine guidance of Lord Sri Krishna, and the righteous celestial union with Subhadra. Rich in poetic meters (padyams), devotional ragas, and profound moral teachings.',
    highlights: ['Heroic Valour of Vijaya (Arjuna)', 'Divine Leelas & Guidance of Lord Sri Krishna', 'Classical Telugu Verses & Dramatic Dialogue', 'Ideal Conjugal Devotion & Kshatriya Dharma']
  },
  {
    id: 'drama2',
    icon: '📜',
    titleKey: 'drama2_title',
    genreKey: 'drama2_genre',
    desc: 'A comprehensive sacred chronicle documenting the inspirational lives and divine experiences of 24 great devotees.',
    shloka: 'భక్త రక్షణ తత్పరం పరమ పావనం • చతుర్వింశతి భక్త చరిత్ర వైభవం',
    fullDesc: 'Bhaktha Vijayam chronicles the inspirational, miracle-filled life histories of 24 paramount saints and devotees across Bharatavarsha. It celebrates the unwavering devotion (Bhakti Yoga) of saints including Prahlada, Dhruva, Tukaram, Ramadasu, Meera Bai, Tyagaraja, Kabir, and Gouranga Mahaprabhu.',
    highlights: ['Chronicles of 24 Paramount Devotees', 'Divine Miracles & Unshakable Faith', 'Path of Complete Self-Surrender (Saranagati)', 'Eternal Inspiration for Spiritual Seekers']
  },
  {
    id: 'drama3',
    icon: '🏛️',
    titleKey: 'drama3_title',
    genreKey: 'drama3_genre',
    desc: 'The sacred history and puranic sanctity of the revered Hatakeswara Kshetra.',
    shloka: 'హాటకేశ్వర మహాక్షేత్ర స్థల పురాణ వైభవమ్ • పాపహరం పుణ్యప్రదం ముక్తిదాయకమ్',
    fullDesc: 'Hatakeswara Sthala Puraanam details the sacred puranic history, divine linga consecration, holy teerthams, and spiritual importance of Hatakeswara Kshetra. Rendered in classical devotional prose and poetry, it illuminates the glory of Lord Shiva and eternal sanctity of the pilgrimage site.',
    highlights: ['Puranic Origin of Hatakeswara Lingam', 'Sacred Teerthams & Holy Bathing Rituals', 'Remover of All Karmic Afflictions', 'Detailed Pilgrimage & Worship Guidelines']
  }
]

const ashtottaraData = [
  {
    id: 'ashtottaram_vishnu',
    titleKey: 'ashtottaram_vishnu',
    icon: '🪷',
    deity: 'Lord Maha Vishnu',
    mantra: 'ॐ నమో నారాయణాయ • Om Namo Narayanaya',
    desc: '108 Divine Names and compound descriptive epithets (*Deergha Samaasa*) extolling the omnipresent Protector Lord Maha Vishnu, Granter of Moksha and Sustainer of the Cosmos.'
  },
  {
    id: 'ashtottaram_lakshmi',
    titleKey: 'ashtottaram_lakshmi',
    icon: '🌸',
    deity: 'Goddess Sri Maha Lakshmi',
    mantra: 'ॐ శ్రీం మహాలక్ష్మ్యై నమః • Om Shreem Mahalakshmyai Namah',
    desc: '108 Holy Names praising Goddess Mahalakshmi, bestower of Ashta Aishwarya (eightfold wealth), auspiciousness, wisdom, and spiritual abundance.'
  },
  {
    id: 'ashtottaram_dakshinamurthy',
    titleKey: 'ashtottaram_dakshinamurthy',
    icon: '🧘',
    deity: 'Lord Dakshinamurthy',
    mantra: 'ॐ నమో భగవతే దక్షిణామూర్తయే • Om Namo Bhagavate Dakshinamurtaye',
    desc: '108 Divine Names praising Lord Dakshinamurthy, the primordial Silent Guru seated beneath the banyan tree, dispelling the darkness of ignorance and bestowing Brahma Vidya.'
  },
  {
    id: 'ashtottaram_surya',
    titleKey: 'ashtottaram_surya',
    icon: '☀️',
    deity: 'Lord Surya Bhagavan',
    mantra: 'ॐ సూర్యాయ నమః • ఆదిత్యాయ నమః • Om Suryaya Namah',
    desc: '108 Sacred Names praising the radiant Sun God Surya Narayana, source of all universal energy, good health (Aarogyam), longevity, and intellectual brilliance.'
  },
  {
    id: 'ashtottaram_ganga',
    titleKey: 'ashtottaram_ganga',
    icon: '🌊',
    deity: 'Mother Ganga Bhavani',
    mantra: 'ॐ గంగాయై నమః • భాగీరథ్యై నమః • Om Gangayai Namah',
    desc: '108 Sacred Names in praise of the celestial river Goddess Ganga Bhavani, the purifier of all sins and sanctifier of the three worlds.'
  },
  {
    id: 'ashtottaram_krishna',
    titleKey: 'ashtottaram_krishna',
    icon: '🦚',
    deity: 'Lord Sri Krishna',
    mantra: 'ॐ నమో భగవతే వాసుదేవాయ • Om Namo Bhagavate Vasudevaya',
    desc: '108 Divine Names commemorating the blissful avatar of Lord Sri Krishna, the Supreme Preceptor of the Bhagavad Gita and protector of the virtuous.'
  },
  {
    id: 'ashtottaram_anjaneya',
    titleKey: 'ashtottaram_anjaneya',
    icon: '🚩',
    deity: 'Lord Anjaneya Swamy (Hanuman)',
    mantra: 'ॐ శ్రీ హనుమతే నమః • Om Sri Hanumate Namah',
    desc: '108 Holy Names worshipping Lord Hanuman, embodiment of courage, unyielding devotion, supreme intellect, and protector against all fears and negative energies.'
  },
  {
    id: 'ashtottaram_sri_raama',
    titleKey: 'ashtottaram_sri_raama',
    icon: '🏹',
    deity: 'Lord Sri Ramachandra Swamy',
    mantra: 'శ్రీరామ జయరామ జయజయ రామ • Sri Rama Jaya Rama Jaya Jaya Rama',
    desc: '108 Sacred Namavali meditating on Maryada Purushottama Lord Sri Ramachandra Swamy, the supreme upholder of Dharma, truth, compassion, and divine grace.'
  }
]

const harikathaData = [
  {
    id: 'harikatha_daksha',
    titleKey: 'harikatha_daksha',
    icon: '🔥',
    category: 'Harikatha Gana',
    mantra: 'శ్రీ శివ లీలా తరంగిణి • దక్ష యజ్ఞ భంగ వైభవం',
    desc: 'An electrifying musical Harikatha narrating Daksha Prajapati’s prideful yagna, the sacrifice of Mother Sati, the wrath of Veerabhadra, and Lord Shiva’s supreme cosmic justice.'
  },
  {
    id: 'harikatha_rukmini',
    titleKey: 'harikatha_rukmini',
    icon: '💍',
    category: 'Harikatha Gana',
    mantra: 'శ్రీ రుక్మిణీ కళ్యాణ మహోత్సవ గానం',
    desc: 'A divine musical Harikatha celebrating Goddess Rukmini’s secret love letter, Lord Krishna’s daring journey to Kundinapura, and their auspicious celestial wedding ceremony.'
  }
]

const devotionalStotramsData = [
  {
    id: 'stotram_seethamma',
    titleKey: 'stotram_seethamma',
    icon: '🪷',
    category: 'Devotional Hymn',
    mantra: 'శ్రీ జనక నందినీ స్తోత్ర తరంగిణి',
    desc: 'Heartfelt verses of adoration honoring Mother Seetha Devi, the epitome of sacrifice, purity, patience, and divine motherly grace.'
  },
  {
    id: 'stotram_amba',
    titleKey: 'stotram_amba',
    icon: '🌺',
    category: 'Devotional Hymn',
    mantra: 'శ్రీ జగన్మాతృ అంబా స్తవమాలిక',
    desc: 'A rhythmic and potent Sanskrit-Telugu hymn in praise of Goddess Parashakti Amba, bestowing inner strength, family peace, and protection from all distress.'
  },
  {
    id: 'stotram_kasi',
    titleKey: 'stotram_kasi',
    icon: '🔱',
    category: 'Mental Pooja Hymn',
    mantra: 'కాశీ విశ్వనాథ మానస పూజా విధానమ్',
    desc: 'A transcendent meditation stotram performing the entire sacred Abhishekam, Harathi, and worship of Lord Kashi Vishwanatha within one’s own heart and mind.'
  }
]

const sathakamData = {
  id: 'sathakam_main',
  titleKey: 'sathakam_main',
  icon: '🦁',
  category: 'Classical Sathakam',
  mantra: 'శ్రీ ఖాద్రి లక్ష్మీ నృసింహ ప్రభో • పాహిమాం రక్షమాం శరణాగతం',
  desc: '108 Classical Telugu Metrical Verses dedicated to Lord Sri Lakshmi Narasimha Swamy of Kadiri. Renowned for its poetic elegance, philosophical depth, rhythmic cadence, and intense devotional plea for divine protection and spiritual liberation.'
}

const milestones = [
  {
    year: '1845',
    title: 'Temple Inception & Consecration',
    desc: 'Sri Pancharatnam Subbaraamappa Gaaru established the sacred temple sanctuary with village elders in Inagaluru, Kadiri region.'
  },
  {
    year: '1940s',
    title: 'Literary Works, Sathakams & Harikathas',
    desc: 'Authored and published timeless classics including Bommalla Ramayanam, Eeswara Prasannam, Kalaabhaanu Vijayamu, Sathakams and Harikathas.'
  },
  {
    year: '1970s - 2000s',
    title: '30+ Years Unbroken Anna Daana Satram',
    desc: 'Managed and sustained the Kadiri Lakshmi Narasimha Swami Anna Daana Satram, feeding tens of thousands of visiting pilgrims without break.'
  },
  {
    year: '2024',
    title: 'Grand Granite Reconstruction',
    desc: 'The eternal legacy continues as devotees unite to celebrate the monumental black granite temple reconstruction.'
  }
]

export default function Founder() {
  const { t } = useLanguage()
  const [selectedWork, setSelectedWork] = useState(null)

  return (
    <section id="founder-section" className="section" style={{ position: 'relative', zIndex: 1, padding: '120px 20px 80px' }}>
      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Split Layout: Left Portrait Card + Right Literary Works */}
        <div className="founder-hero-grid" style={{ marginBottom: '4rem' }}>
          
          {/* Left Column: Founder Portrait Card */}
          <div className="founder-hero-left">
            <motion.div 
              className="founder-portrait-card animated-border-glow"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="founder-card-image-box">
                <img 
                  src="/assets/founder_portrait.png" 
                  alt={t('founder_name')} 
                  className="founder-card-img"
                />
              </div>
              <div className="founder-card-content">
                <h3 className="founder-card-name">{t('founder_name')}</h3>
                <p className="founder-card-role">{t('founder_role')}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Literary Works Showcase */}
          <div className="founder-hero-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="founder-section-subhead">{t('literary_subtitle')}</p>
              <h2 className="founder-section-heading">{t('literary_title')}</h2>
            </motion.div>

            {/* 3 Books Grid */}
            <div className="founder-books-grid">
              {sacredBooks.map((book, idx) => (
                <motion.div
                  key={book.id}
                  className="founder-book-card glass-card"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                >
                  <div className="founder-book-cover-box">
                    <img 
                      src={book.img} 
                      alt={t(book.titleKey)} 
                      className="founder-book-cover-img"
                    />
                  </div>

                  <div className="founder-book-info">
                    <h4 className="founder-book-title">{t(book.titleKey)}</h4>
                    <p className="founder-book-genre">{t(book.genreKey)}</p>
                  </div>

                  <div className="founder-book-action-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {book.youtubeUrl && (
                      <a 
                        href={book.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="founder-btn-youtube"
                      >
                        <span className="yt-icon">▶</span> {t('btn_listen_youtube')}
                      </a>
                    )}
                    {book.pdfUrl && (
                      <a 
                        href={book.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="founder-btn-pdf"
                      >
                        <span className="pdf-icon">📄</span> {t('btn_pdf_download')}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* =========================================================================
            SECTION 1: CLASSICAL DRAMAS & STHALA PURAANAM (INTERACTIVE BUTTONS & CARDS)
           ========================================================================= */}
        <AnimatedSection style={{ marginBottom: '4rem' }}>
          <div className="literary-section-header">
            <span className="section-badge-pill">🎭 Classical Stage & Literature</span>
            <h3 className="section-title-sm">Classical Dramas & Sthala Puraanam</h3>
            <p className="section-desc-sm">Masterpieces composed by Sri Subbaraamappa Gaaru blending poetry, moral duty, and devotion.</p>
          </div>

          <div className="drama-showcase-grid">
            {classicalDramas.map((drama, idx) => (
              <motion.div
                key={drama.id}
                className="drama-interactive-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="drama-card-top">
                  <div className="drama-icon-box">{drama.icon}</div>
                  <span className="drama-genre-badge">{t(drama.genreKey)}</span>
                </div>
                
                <h4 className="drama-title">{t(drama.titleKey)}</h4>
                <p className="drama-desc">{drama.desc}</p>

                <button
                  type="button"
                  className="drama-action-btn"
                  onClick={() => setSelectedWork({
                    title: t(drama.titleKey),
                    genre: t(drama.genreKey),
                    icon: drama.icon,
                    mantra: drama.shloka,
                    desc: drama.fullDesc,
                    highlights: drama.highlights
                  })}
                >
                  <span>📖 Read Overview & Highlights</span>
                  <span>→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* =========================================================================
            SECTION 2 & 3: SATHAKAMS & ASHTOTTARAMS + HARIKATHAS & DEVOTIONAL HYMNS
           ========================================================================= */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="literary-deep-grid">
            
            {/* Left Box: Sathakams & Printed Ashtottarams Buttons */}
            <div className="literary-deep-box glass-card">
              <div className="deep-box-header">
                <span className="deep-box-icon">📜</span>
                <div>
                  <h3 className="deep-box-title">{t('sathakams_title')}</h3>
                  <span className="deep-box-subtitle">108 Metrical Verses & Compound Ashtottarams</span>
                </div>
              </div>

              <div className="deep-box-body">
                
                {/* Featured Sathakam Button */}
                <div className="featured-sathakam-card">
                  <div className="featured-sathakam-left">
                    <span className="featured-sathakam-icon">🦁</span>
                    <div>
                      <span className="featured-tag">🌟 Featured Classical Sathakam</span>
                      <h4 className="featured-sathakam-title">{t('sathakam_main')}</h4>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="featured-sathakam-btn"
                    onClick={() => setSelectedWork({
                      title: t('sathakam_main'),
                      genre: 'Classical Telugu Sathakam (108 Verses)',
                      icon: '🦁',
                      mantra: sathakamData.mantra,
                      desc: sathakamData.desc,
                      highlights: [
                        '108 Metrical Telugu Verses to Lord Narasimha Swamy',
                        'Intense Devotion & Prapatti (Total Surrender)',
                        'Remover of All Fears, Sorrows, and Malefic Influences',
                        'Authored in Traditional Classical Padya Kavitvam'
                      ]
                    })}
                  >
                    <span>🕉️ View Sathakam Details</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Deergha Samaasa Ashtottarams Button Grid */}
                <div className="deergha-section" style={{ marginTop: '1.5rem' }}>
                  <div className="section-label-row">
                    <h4 className="deergha-title">{t('deergha_title')}</h4>
                    <span className="pills-count-badge">8 Sacred Ashtottarams</span>
                  </div>

                  <div className="ashtottara-buttons-grid">
                    {ashtottaraData.map((item) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        className="ashtottara-interactive-btn"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedWork({
                          title: t(item.titleKey),
                          genre: 'Deergha Samaasa Ashtottaram (108 Holy Names)',
                          icon: item.icon,
                          mantra: item.mantra,
                          desc: item.desc,
                          highlights: [
                            `Dedicated to ${item.deity}`,
                            '108 Sacred Compound Divine Epithets (*Deergha Samaasa*)',
                            'Chanted for Divine Grace, Inner Peace & Prosperity',
                            'Traditional Archana & Daily Nitya Pooja Namavali'
                          ]
                        })}
                      >
                        <span className="btn-icon">{item.icon}</span>
                        <span className="btn-text">{t(item.titleKey)}</span>
                        <span className="btn-arrow">›</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Box: Harikathas & Devotional Songs Buttons */}
            <div className="literary-deep-box glass-card">
              <div className="deep-box-header">
                <span className="deep-box-icon">🎶</span>
                <div>
                  <h3 className="deep-box-title">{t('harikathas_title')}</h3>
                  <span className="deep-box-subtitle">Musical Storytelling, Stotrams & Hymns</span>
                </div>
              </div>

              <div className="deep-box-body">
                
                {/* Harikathas Group */}
                <div className="harikatha-group-section">
                  <div className="section-label-row">
                    <h4 className="harikatha-subhead">{t('harikatha_subhead')}</h4>
                    <span className="pills-count-badge">Musical Dramas</span>
                  </div>

                  <div className="harikatha-buttons-grid">
                    {harikathaData.map((hk) => (
                      <motion.button
                        key={hk.id}
                        type="button"
                        className="harikatha-interactive-btn"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedWork({
                          title: t(hk.titleKey),
                          genre: hk.category,
                          icon: hk.icon,
                          mantra: hk.mantra,
                          desc: hk.desc,
                          highlights: [
                            'Rich Blend of Classical Telugu Ragas & Prose',
                            'Puranic Drama with Profound Spiritual Morals',
                            'Celebrates Divine Leelas & Dharma',
                            'Authored for Public Devotional Musical Discourses'
                          ]
                        })}
                      >
                        <div className="btn-left">
                          <span className="hk-bullet">✦</span>
                          <span className="hk-title">{t(hk.titleKey)}</span>
                        </div>
                        <span className="hk-action-tag">View Katha →</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Devotional Stotrams Group */}
                <div className="stotrams-group-section" style={{ marginTop: '1.75rem' }}>
                  <div className="section-label-row">
                    <h4 className="deergha-title">{t('devotional_subhead')}</h4>
                    <span className="pills-count-badge">Holy Hymns</span>
                  </div>

                  <div className="stotrams-buttons-grid">
                    {devotionalStotramsData.map((st) => (
                      <motion.button
                        key={st.id}
                        type="button"
                        className="stotram-interactive-btn"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedWork({
                          title: t(st.titleKey),
                          genre: st.category,
                          icon: st.icon,
                          mantra: st.mantra,
                          desc: st.desc,
                          highlights: [
                            'Sacred Devotional Hymn & Daily Prayer',
                            'Composed in Rhythmic Classical Metres',
                            'Brings Peace of Mind, Spiritual Focus & Protection',
                            'Ideal for Morning and Evening Meditation'
                          ]
                        })}
                      >
                        <span className="st-icon">{st.icon}</span>
                        <span className="st-name">{t(st.titleKey)}</span>
                        <span className="st-arrow">›</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* Founder Bio & Quote Section */}
        <AnimatedSection style={{ marginBottom: '4.5rem' }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary-gold)', borderRadius: '20px' }}>
            <p className="section-subtitle" style={{ margin: 0 }}>{t('founder_subtitle')}</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bright-gold)', fontSize: '1.8rem', margin: '0.4rem 0 1rem' }}>
              {t('founder_name')}
            </h3>
            <blockquote className="founder-quote" style={{ margin: '1rem 0', fontSize: '1.15rem' }}>
              &ldquo;{t('founder_quote')}&rdquo;
            </blockquote>
            <p style={{ color: 'var(--text-light)', opacity: 0.9, fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
              {t('founder_desc')}
            </p>
          </div>
        </AnimatedSection>

        {/* Milestone Timeline Section */}
        <AnimatedSection style={{ marginBottom: '5rem' }}>
          <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Timeline of Selfless Devotion</h3>
          <div className="timeline" style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year}
                className="timeline-event"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2.5rem',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div className="timeline-year" style={{
                    background: 'var(--gradient-gold)',
                    color: 'var(--dark-slate)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px var(--shadow-gold)',
                    whiteSpace: 'nowrap'
                  }}>
                    {m.year}
                  </div>
                  <div style={{
                    width: '2px',
                    flexGrow: 1,
                    background: 'linear-gradient(to bottom, var(--primary-gold), transparent)',
                    marginTop: '8px',
                    minHeight: '40px'
                  }} />
                </div>

                <div className="glass-card" style={{
                  padding: '1.5rem',
                  flexGrow: 1,
                  borderLeft: '3px solid var(--primary-gold)'
                }}>
                  <h4 style={{ color: 'var(--text-light)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {m.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

      </div>

      {/* =========================================================================
          SACRED WORK DETAIL MODAL POPUP
         ========================================================================= */}
      <AnimatePresence>
        {selectedWork && (
          <div className="work-modal-backdrop" onClick={() => setSelectedWork(null)}>
            <motion.div 
              className="work-modal-card glass-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            >
              <div className="work-modal-header">
                <div className="work-modal-title-wrap">
                  <span className="work-modal-icon">{selectedWork.icon}</span>
                  <div>
                    <span className="work-modal-genre">{selectedWork.genre}</span>
                    <h3 className="work-modal-title">{selectedWork.title}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  className="work-modal-close-btn"
                  onClick={() => setSelectedWork(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {selectedWork.mantra && (
                <div className="work-modal-shloka-box">
                  <span className="shloka-om">🕉️</span>
                  <p className="work-modal-shloka">{selectedWork.mantra}</p>
                </div>
              )}

              <div className="work-modal-body">
                <p className="work-modal-desc">{selectedWork.desc}</p>

                {selectedWork.highlights && selectedWork.highlights.length > 0 && (
                  <div className="work-modal-highlights">
                    <h5 className="highlights-title">✦ Sacred Significance & Themes:</h5>
                    <ul className="highlights-list">
                      {selectedWork.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="highlight-bullet">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="work-modal-footer">
                <button
                  type="button"
                  className="btn-primary modal-close-btn-bottom"
                  onClick={() => setSelectedWork(null)}
                >
                  <span>✓</span> Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}
