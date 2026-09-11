import { motion } from 'framer-motion'
import { useAudio } from '../context/AudioContext'

export default function AudioControl() {
  const { playing, togglePlay } = useAudio()

  return (
    <motion.button
      className={`audio-control-floating ${playing ? 'playing' : ''}`}
      onClick={togglePlay}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={playing ? 'Pause Sacred Chant' : 'Play Sacred Chant'}
      title={playing ? 'Pause Sacred Chant' : 'Play Sacred Chant'}
    >
      <div className="audio-icon-bars">
        <span className="bar bar-1"></span>
        <span className="bar bar-2"></span>
        <span className="bar bar-3"></span>
        <span className="bar bar-4"></span>
      </div>
      <span className="audio-floating-label">
        {playing ? 'Chant Playing' : 'Play Chant'}
      </span>
    </motion.button>
  )
}
