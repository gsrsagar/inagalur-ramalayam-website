import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const DataContext = createContext()

const DEFAULT_GALLERY = [
  {
    id: 'rec-main',
    type: 'photo',
    category: 'sanctum',
    title: 'Grand Reconstruction & Garudastambha Sanctum',
    desc: 'Holy Krishnasila Sanctum, Sacred Deepastambha & Traditional Floral Alankaram',
    url: '/assets/temple_reconstruction.png',
    createdAt: 1700000001
  },
  {
    id: 'rec1',
    type: 'photo',
    category: 'heritage',
    title: 'Temple Grand Re-construction & Puna Prathistha 1',
    desc: 'Ancient Granite Architecture & Consecration Rituals',
    url: '/assets/temple_reconstruction1.jpeg',
    createdAt: 1700000002
  },
  {
    id: 'rec2',
    type: 'photo',
    category: 'heritage',
    title: 'Temple Grand Re-construction & Puna Prathistha 2',
    desc: 'Sanctum Elevation & Traditional Shilpa Shastra Stone Craftsmanship',
    url: '/assets/temple_reconstruction2.jpeg',
    createdAt: 1700000003
  },
  {
    id: 'm1',
    type: 'photo',
    category: 'sanctum',
    title: 'Sanctum Sree Sitha Raama Swamy',
    desc: 'Main Sanctum Divine Altar & Sacred Blackstone Deities',
    url: '/assets/temple_hero_deity.png',
    createdAt: 1700000004
  },
  {
    id: 'm4',
    type: 'photo',
    category: 'service',
    title: 'Founder Sri Subbaraamappa Gaaru',
    desc: '30+ Continuous Years of Anna Daana & Devotional Service',
    url: '/assets/founder_portrait.png',
    createdAt: 1700000005
  },
  {
    id: 'm6',
    type: 'video',
    category: 'literature',
    title: 'Sacred Ramayana Book (Audio & Chants)',
    desc: 'Sachitra Bommalla Raamaa Naama Ramayanam & Chants',
    url: 'https://www.youtube.com/watch?v=wVGH-9Znwq4&list=PL4-zN5NLKyzwvbvtFOQYp7UjC62whcu',
    thumb: '/assets/book_ramayanam.png',
    createdAt: 1700000006
  },
  {
    id: 'm7',
    type: 'photo',
    category: 'service',
    title: 'Anna Daana Seva & Prasad Distribution',
    desc: 'Daily Annadaanam providing free nutritious meals to all visiting devotees and pilgrims',
    url: '/assets/anna_daana.png',
    createdAt: 1700000007
  },
  {
    id: 'm8',
    type: 'photo',
    category: 'heritage',
    title: 'Ancient Heritage Temple Structure',
    desc: 'Historical 1845 sanctum preservation before grand renewal',
    url: '/assets/temple_old_heritage.jpg',
    createdAt: 1700000008
  }
]

const DEFAULT_EVENTS = [
  {
    id: 'ev1',
    title: 'Sri Rama Navami Grand Kalyana Mahotsavam',
    date: 'April 2025 (Chaitra Suddha Navami)',
    time: '09:00 AM - 01:30 PM',
    location: 'Sri Rama Temple Courtyard, Inagalore',
    description: 'Celestial Wedding Ceremony (Sita Rama Kalyanam), Grand Procession, Visesha Abhishekam, and Maha Annadaanam for thousands of devotees.',
    image: '/assets/temple_hero_deity.png',
    category: 'Festivals',
    status: 'Annual Festival',
    createdAt: 1700000010
  },
  {
    id: 'ev2',
    title: 'Temple Reconstruction & Puna Prathistha Anniversary',
    date: 'October 2025',
    time: '06:00 AM - 08:30 PM',
    location: 'Main Sanctum, Inagalore',
    description: 'Commemorative Homam, Yagashala Pujas, Veda Parayanam, and special honors to Shilpis and contributing devotees.',
    image: '/assets/temple_reconstruction1.jpeg',
    category: 'Consecration',
    status: 'Special Celebration',
    createdAt: 1700000011
  },
  {
    id: 'ev3',
    title: 'Sri Hanuman Jayanthi Deepotsavam & Visesha Pooja',
    date: 'May 2025',
    time: '05:30 PM - 09:00 PM',
    location: 'Hanuman Sannidhi & Temple Corridor',
    description: 'Sindhoora Pooja, Sri Hanuman Chalisa 108 times chanting parayanam, and 1,008 oil lamps Deepotsavam.',
    image: '/assets/temple_reconstruction.png',
    category: 'Pooja',
    status: 'Special Event',
    createdAt: 1700000012
  },
  {
    id: 'ev4',
    title: 'Weekly Saturday Special Abhishekam & Sahasranamarchana',
    date: 'Every Saturday',
    time: '07:30 AM - 10:30 AM',
    location: 'Garbagudi, Inagalore Ramalayam',
    description: 'Weekly sacred Panchamrutha Abhishekam to Lord Sri Ramachandra Swamy and Mother Sita Devi with prasadam distribution.',
    image: '/assets/temple_inner_sanctum_pillar.jpg',
    category: 'Nithya Seva',
    status: 'Weekly Service',
    createdAt: 1700000013
  }
]

export function DataProvider({ children }) {
  const [events, setEvents] = useState(() => {
    try {
      const cached = localStorage.getItem('app_events')
      return cached ? JSON.parse(cached) : DEFAULT_EVENTS
    } catch {
      return DEFAULT_EVENTS
    }
  })

  const [gallery, setGallery] = useState(() => {
    try {
      const cached = localStorage.getItem('app_gallery')
      return cached ? JSON.parse(cached) : DEFAULT_GALLERY
    } catch {
      return DEFAULT_GALLERY
    }
  })

  const [members, setMembers] = useState([])
  const [donations, setDonations] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCollection = useCallback(async (name, setter, fallback = []) => {
    try {
      const q = query(collection(db, name), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      if (snap.docs.length > 0) {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setter(data)
        try { localStorage.setItem(`app_${name}`, JSON.stringify(data)) } catch {}
      } else {
        const cached = localStorage.getItem(`app_${name}`)
        if (cached) {
          setter(JSON.parse(cached))
        } else if (fallback.length > 0) {
          setter(fallback)
          try { localStorage.setItem(`app_${name}`, JSON.stringify(fallback)) } catch {}
        } else {
          setter([])
        }
      }
    } catch {
      const cached = localStorage.getItem(`app_${name}`)
      if (cached) {
        setter(JSON.parse(cached))
      } else if (fallback.length > 0) {
        setter(fallback)
      } else {
        setter([])
      }
    }
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([
      loadCollection('events', setEvents, DEFAULT_EVENTS),
      loadCollection('gallery', setGallery, DEFAULT_GALLERY),
      loadCollection('members', setMembers),
      loadCollection('donations', setDonations),
      loadCollection('activities', setActivities),
    ])
    setLoading(false)
  }, [loadCollection])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const addItem = async (collectionName, data) => {
    const id = 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
    const newData = { id, ...data, createdAt: Date.now() }

    // Update local state and localStorage immediately
    if (collectionName === 'events') {
      setEvents(prev => {
        const updated = [newData, ...prev]
        try { localStorage.setItem('app_events', JSON.stringify(updated)) } catch {}
        return updated
      })
    } else if (collectionName === 'gallery' || collectionName === 'media') {
      setGallery(prev => {
        const updated = [newData, ...prev]
        try { localStorage.setItem('app_gallery', JSON.stringify(updated)) } catch {}
        return updated
      })
    } else if (collectionName === 'members') {
      setMembers(prev => [newData, ...prev])
    } else if (collectionName === 'donations') {
      setDonations(prev => [newData, ...prev])
    } else if (collectionName === 'activities') {
      setActivities(prev => [newData, ...prev])
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), newData)
      return docRef.id
    } catch (e) {
      console.warn('Firestore offline, item saved locally to state & storage')
      return id
    }
  }

  const updateItem = async (collectionName, id, data) => {
    if (collectionName === 'events') {
      setEvents(prev => {
        const updated = prev.map(item => (item.id === id || item._id === id ? { ...item, ...data } : item))
        try { localStorage.setItem('app_events', JSON.stringify(updated)) } catch {}
        return updated
      })
    } else if (collectionName === 'gallery' || collectionName === 'media') {
      setGallery(prev => {
        const updated = prev.map(item => (item.id === id || item._id === id ? { ...item, ...data } : item))
        try { localStorage.setItem('app_gallery', JSON.stringify(updated)) } catch {}
        return updated
      })
    } else if (collectionName === 'members') {
      setMembers(prev => prev.map(item => (item.id === id ? { ...item, ...data } : item)))
    } else if (collectionName === 'donations') {
      setDonations(prev => prev.map(item => (item.id === id ? { ...item, ...data } : item)))
    } else if (collectionName === 'activities') {
      setActivities(prev => prev.map(item => (item.id === id ? { ...item, ...data } : item)))
    }

    try {
      await updateDoc(doc(db, collectionName, id), data)
    } catch (e) {
      console.warn('Firestore offline, update saved locally')
    }
  }

  const deleteItem = async (collectionName, id) => {
    if (collectionName === 'events') {
      setEvents(prev => {
        const updated = prev.filter(item => item.id !== id && item._id !== id)
        try { localStorage.setItem('app_events', JSON.stringify(updated)) } catch {}
        return updated
      })
    } else if (collectionName === 'gallery' || collectionName === 'media') {
      setGallery(prev => {
        const updated = prev.filter(item => item.id !== id && item._id !== id)
        try { localStorage.setItem('app_gallery', JSON.stringify(updated)) } catch {}
        return updated
      })
    } else if (collectionName === 'members') {
      setMembers(prev => prev.filter(item => item.id !== id))
    } else if (collectionName === 'donations') {
      setDonations(prev => prev.filter(item => item.id !== id))
    } else if (collectionName === 'activities') {
      setActivities(prev => prev.filter(item => item.id !== id))
    }

    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch (e) {
      console.warn('Firestore offline, deletion saved locally')
    }
  }

  const compressImage = (file, maxW = 1200, quality = 0.75) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > maxW) {
          height = Math.round((height * maxW) / width)
          width = maxW
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(blob => {
          if (blob) resolve(blob)
          else reject(new Error('Compression failed'))
        }, file.type || 'image/jpeg', quality)
      }
      img.onerror = () => reject(new Error('Failed to load image for compression'))
      img.src = url
    })
  }

  const uploadImage = async (file, path = 'gallery') => {
    try {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    } catch (err) {
      const maxSize = 800 * 1024
      let processedFile = file
      if (file.size > maxSize) {
        try {
          const compressed = await compressImage(file, 900, 0.7)
          processedFile = compressed
        } catch {
          processedFile = file
        }
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Failed to read file as base64'))
        reader.readAsDataURL(processedFile)
      })
    }
  }

  return (
    <DataContext.Provider value={{
      events, setEvents,
      gallery, setGallery,
      members, setMembers,
      donations, setDonations,
      activities, setActivities,
      loading,
      addItem, updateItem, deleteItem,
      uploadImage, loadAll,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
