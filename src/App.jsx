import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import { DataProvider } from './context/DataContext'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import Members from './pages/Members'
import Activities from './pages/Activities'
import FloatingGallery from './pages/FloatingGallery'
import History from './pages/History'
import Founder from './pages/Founder'
import Services from './pages/Services'
import Admin from './pages/Admin'
import ParticleBackground from './components/ParticleBackground'
import AudioControl from './components/AudioControl'
import { LightboxProvider } from './components/Lightbox'
import DonateModal from './components/DonateModal'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AuthProvider>
      <ContentProvider>
        <DataProvider>
          <LanguageProvider>
            <LightboxProvider>
              <ParticleBackground />
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
                  <Route path="/members" element={<PageTransition><Members /></PageTransition>} />
                  <Route path="/activities" element={<PageTransition><Activities /></PageTransition>} />
                  <Route path="/gallery" element={<PageTransition><FloatingGallery /></PageTransition>} />
                  <Route path="/history" element={<PageTransition><History /></PageTransition>} />
                  <Route path="/founder" element={<PageTransition><Founder /></PageTransition>} />
                  <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                  <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
                </Routes>
              </AnimatePresence>
              <Footer />
              <AudioControl />
              <DonateModal />
            </LightboxProvider>
          </LanguageProvider>
        </DataProvider>
      </ContentProvider>
    </AuthProvider>
  )
}
