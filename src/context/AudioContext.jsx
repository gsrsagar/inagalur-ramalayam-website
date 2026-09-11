import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.6)
  const howlRef = useRef(null)

  useEffect(() => {
    const sound = new Howl({
      src: ['/assets/chant.mp3'],
      loop: true,
      volume: 0.6,
      html5: true,
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onloaderror: (id, err) => console.log('Audio load error:', err),
      onplayerror: (id, err) => {
        sound.once('unlock', () => {
          sound.play()
        })
      }
    })

    howlRef.current = sound

    // Attempt autoplay on first user interaction anywhere on the page
    const unlockAndPlay = () => {
      if (howlRef.current && !howlRef.current.playing()) {
        try {
          howlRef.current.play()
        } catch (e) {}
      }
      window.removeEventListener('click', unlockAndPlay)
      window.removeEventListener('touchstart', unlockAndPlay)
    }

    window.addEventListener('click', unlockAndPlay, { once: true })
    window.addEventListener('touchstart', unlockAndPlay, { once: true })

    return () => {
      sound.unload()
      window.removeEventListener('click', unlockAndPlay)
      window.removeEventListener('touchstart', unlockAndPlay)
    }
  }, [])

  const togglePlay = () => {
    const sound = howlRef.current
    if (!sound) return

    if (sound.playing()) {
      sound.pause()
    } else {
      sound.play()
    }
  }

  const setVolume = (v) => {
    setVolumeState(v)
    if (howlRef.current) {
      howlRef.current.volume(v)
    }
  }

  return (
    <AudioContext.Provider value={{ playing, togglePlay, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
