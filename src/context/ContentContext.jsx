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
  const [settings, setSettings] = useState({
    email: 'kkpancharathnam@gmail.com',
    phone: '+91 99087 15022 / +91 94411 91394',
    youtube: 'https://www.youtube.com/watch?v=OatkwowN61g&list=PLETIcg9ZhPhg',
    instagram: 'https://instagram.com',
    accountType: 'CURRENT ACCOUNT',
    accountName: 'Sri Seetha Lakshmana Hanumath sametha Ramachandra Swamy Temple Trust',
    bankName: 'Andhra Pradesh Grameena Bank (Government Scheduled Bank)',
    bankAccount: '563411000189871',
    bankIfsc: 'UBIN0CG7999',
    bankBranch: 'Obula Devara Cheruvu Branch',
    trustName: 'Sri Seetha Lakshmana Hanumath sametha Ramachandra Swamy Temple Trust, Inagalore',
    regNo: '8/2025 dated 11th June 2025',
    pan: 'ABKTS6306C',
    contactPerson: 'Sri Krishna Kumar Pancharathnam (President, Temple Trust)',
    address: 'Inagalore Village, Obula Devara Cheruvu Mandal, Sri Sathya Sai District, Andhra Pradesh - 515591',
    qrCodeUrl: '/assets/temple_pan_card.png',
    panCardUrl: '/assets/temple_pan_card.png'
  })
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

        const settingsSnap = await getDoc(doc(db, 'cms', 'settings'))
        if (settingsSnap.exists()) setSettings(prev => ({ ...prev, ...settingsSnap.data() }))
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

  const saveSettings = useCallback(async (data) => {
    await setDoc(doc(db, 'cms', 'settings'), data)
    setSettings(data)
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
    <ContentContext.Provider value={{ pages, translations, settings, loading, savePage, saveTranslation, saveSettings, t, getContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
