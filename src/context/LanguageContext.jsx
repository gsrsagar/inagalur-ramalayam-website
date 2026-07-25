import { createContext, useContext, useState, useEffect } from 'react'
import en from '../i18n/en.json'
import te from '../i18n/te.json'
import kn from '../i18n/kn.json'
import { useContent } from './ContentContext'

const defaults = { en, te, kn }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('temple-lang') || 'en')
  const content = useContent()

  const t = (key) => {
    const remote = content?.translations?.[lang]?.[key]
    return remote || defaults[lang]?.[key] || key
  }

  useEffect(() => {
    localStorage.setItem('temple-lang', lang)
    document.documentElement.lang = lang
    document.body.classList.remove('telugu-text', 'kannada-text')
    if (lang === 'te') document.body.classList.add('telugu-text')
    if (lang === 'kn') document.body.classList.add('kannada-text')
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
