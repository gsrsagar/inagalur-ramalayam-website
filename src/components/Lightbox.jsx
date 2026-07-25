import { createContext, useContext, useState, useCallback } from 'react'
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
    setTimeout(() => setData(null), 300)
  }, [])

  const renderMedia = () => {
    if (!data) return null

    const youtubeId = data.url ? getYouTubeId(data.url) : null

    if (youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={data.title || ''}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )
    }

    if (data.type === 'video') {
      return (
        <video controls autoPlay>
          <source src={data.url} type="video/mp4" />
        </video>
      )
    }

    return <img src={data.url} alt={data.title || ''} />
  }

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <motion.div
              className="lightbox-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={close}>
                &times;
              </button>

              {data && data.title && (
                <h2 className="lightbox-title">{data.title}</h2>
              )}

              <div className="lightbox-media">{renderMedia()}</div>

              {data && data.description && (
                <p className="lightbox-description">{data.description}</p>
              )}
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
