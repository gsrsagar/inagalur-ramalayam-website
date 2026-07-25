import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { db } from '../firebase'
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import en from '../i18n/en.json'
import te from '../i18n/te.json'
import kn from '../i18n/kn.json'

const defaultTranslations = { en, te, kn }

const ContentContext = createContext()

export function ContentProvider({ children }) {
  const [pages, setPages] = useState({})
  const [translations, setTranslations] = useState(defaultTranslations)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const pageSnap = await getDoc(doc(db, 'cms', 'pages'))
        if (pageSnap.exists()) setPages(pageSnap.data())

        const transSnap = await getDoc(doc(db, 'cms', 'translations'))
        if (transSnap.exists()) {
          const remote = transSnap.data()
          setTranslations({
            en: { ...defaultTranslations.en, ...(remote.en || {}) },
            te: { ...defaultTranslations.te, ...(remote.te || {}) },
            kn: { ...defaultTranslations.kn, ...(remote.kn || {}) },
          })
        }
      } catch (e) {
        console.warn('Firestore unavailable, using defaults')
      }
      setLoading(false)
    }
    load()
  }, [])

  const savePage = useCallback(async (pageId, data) => {
    await setDoc(doc(db, 'cms', 'pages'), { [pageId]: data }, { merge: true })
    setPages(prev => ({ ...prev, [pageId]: data }))
  }, [])

  const saveTranslation = useCallback(async (lang, key, value) => {
    await setDoc(doc(db, 'cms', 'translations'), { [lang]: { [key]: value } }, { merge: true })
    setTranslations(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [key]: value },
    }))
  }, [])

  const t = useCallback((key) => {
    for (const lang of ['en', 'te', 'kn']) {
      if (translations[lang] && translations[lang][key]) return translations[lang][key]
    }
    return key
  }, [translations])

  const getContent = useCallback((pageId, fallback) => {
    return pages[pageId] || fallback || {}
  }, [pages])

  return (
    <ContentContext.Provider value={{ pages, translations, loading, savePage, saveTranslation, t, getContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
