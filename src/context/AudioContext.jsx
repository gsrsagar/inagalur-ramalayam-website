import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.6)
  const howlRef = useRef(null)
  const userStoppedRef = useRef(false)

  useEffect(() => {
    const sound = new Howl({
      src: ['/assets/chant.mp3'],
      loop: true,
      volume: 0.6,
      html5: true,
      preload: true,
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onloaderror: (_id, err) => console.log('Audio load error:', err),
      onplayerror: (_id, _err) => {
        // If autoplay is blocked by browser policy, play once unlocked
        sound.once('unlock', () => {
          if (!userStoppedRef.current) {
            sound.play()
          }
        })
      }
    })

    howlRef.current = sound

    // Attempt direct autoplay immediately when website opens
    try {
      const playPromise = sound.play()
      if (playPromise !== undefined && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Autoplay policy prevented immediate playback without gesture
        })
      }
    } catch {
      // Browser policy prevented unprompted autoplay
    }

    // Interaction fallback for browsers blocking audio before first interaction
    const handleFirstInteraction = () => {
      if (userStoppedRef.current) return
      if (howlRef.current && !howlRef.current.playing()) {
        try {
          howlRef.current.play()
        } catch (e) {
          console.log('Audio autoplay on interaction:', e)
        }
      }
    }

    const events = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll']
    events.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { once: true, passive: true })
    })

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction)
      })
      sound.unload()
    }
  }, [])

  const play = useCallback(() => {
    userStoppedRef.current = false
    const sound = howlRef.current
    if (sound && !sound.playing()) {
      sound.play()
    }
  }, [])

  const pause = useCallback(() => {
    userStoppedRef.current = true
    const sound = howlRef.current
    if (sound && sound.playing()) {
      sound.pause()
    }
  }, [])

  const stop = useCallback(() => {
    userStoppedRef.current = true
    const sound = howlRef.current
    if (sound) {
      sound.stop()
      setPlaying(false)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const sound = howlRef.current
    if (!sound) return

    if (sound.playing()) {
      userStoppedRef.current = true
      sound.pause()
    } else {
      userStoppedRef.current = false
      sound.play()
    }
  }, [])

  const setVolume = useCallback((v) => {
    setVolumeState(v)
    if (howlRef.current) {
      howlRef.current.volume(v)
    }
  }, [])

  return (
    <AudioContext.Provider value={{ playing, togglePlay, play, pause, stop, volume, setVolume }}>
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
