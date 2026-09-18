import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LightboxContext = createContext(null)

const getYouTubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[1].length === 11 ? match[1] : null
}

const LightboxProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((item) => {
    setData(item)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setData(null), 250)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) close()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  const renderMedia = () => {
    if (!data) return null

    const youtubeId = data.url ? getYouTubeId(data.url) : null

    if (youtubeId) {
      return (
        <div className="lightbox-iframe-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={data.title || 'Divine Video'}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    if (data.type === 'video') {
      return (
        <video controls autoPlay playsInline className="lightbox-img-element">
          <source src={data.url} type="video/mp4" />
        </video>
      )
    }

    return (
      <img 
        src={data.url} 
        alt={data.title || 'Temple Photo'} 
        className="lightbox-img-element"
      />
    )
  }

  const getDownloadFileName = () => {
    if (!data || !data.url) return 'temple-image.jpg'
    const cleanTitle = (data.title || 'temple-photo').replace(/[^a-zA-Z0-9_-]/g, '_')
    const ext = data.url.split('.').pop().split('?')[0] || 'jpg'
    return `${cleanTitle}.${ext}`
  }

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}

      <AnimatePresence>
        {isOpen && data && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              className="lightbox-dialog"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="lightbox-header">
                <div className="lightbox-header-text">
                  {data.title && <h3 className="lightbox-title-text">{data.title}</h3>}
                  {data.desc && <p className="lightbox-desc-text">{data.desc}</p>}
                </div>
                <button 
                  type="button" 
                  className="lightbox-close-btn" 
                  onClick={close} 
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Media Body */}
              <div className="lightbox-body">
                {renderMedia()}
              </div>

              {/* Footer Toolbar */}
              <div className="lightbox-footer">
                {data.type !== 'video' && data.url && !getYouTubeId(data.url) && (
                  <a
                    href={data.url}
                    download={getDownloadFileName()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary lightbox-download-btn"
                  >
                    📥 Download Full Image
                  </a>
                )}
                
                {data.url && (
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary lightbox-open-btn"
                  >
                    {getYouTubeId(data.url) ? '▶ Open on YouTube' : '↗️ Open Original'}
                  </a>
                )}

                <button 
                  type="button" 
                  className="btn-secondary lightbox-done-btn" 
                  onClick={close}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}

const useLightbox = () => {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

export { LightboxProvider, useLightbox }
