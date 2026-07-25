import { useEffect, useState, useRef } from 'react'
import { Howl } from 'howler'
import { motion } from 'framer-motion'

const AudioControl = () => {
  const [playing, setPlaying] = useState(false)
  const howlRef = useRef(null)

  useEffect(() => {
    const howl = new Howl({
      src: ['/assets/chant.mp3'],
      loop: true,
      volume: 0.5,
      html5: true,
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
    })

    howlRef.current = howl

    const play = () => {
      try {
        howl.play()
      } catch {}
    }

    play()

    const handleFirstInteraction = () => {
      if (!howl.playing()) {
        howl.play()
      }
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      howl.unload()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  const toggle = () => {
    const howl = howlRef.current
    if (!howl) return

    if (howl.playing()) {
      howl.pause()
    } else {
      howl.play()
    }
  }

  return (
    <motion.button
      className={`audio-control ${playing ? 'playing' : ''}`}
      onClick={toggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label={playing ? 'Pause audio' : 'Play audio'}
    >
      <div className="audio-icon">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </motion.button>
  )
}

export default AudioControl
