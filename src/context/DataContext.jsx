import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [events, setEvents] = useState([])
  const [members, setMembers] = useState([])
  const [donations, setDonations] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCollection = useCallback(async (name, setter) => {
    try {
      const q = query(collection(db, name), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setter(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch { setter([]) }
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([
      loadCollection('events', setEvents),
      loadCollection('members', setMembers),
      loadCollection('donations', setDonations),
      loadCollection('activities', setActivities),
    ])
    setLoading(false)
  }, [loadCollection])

  useEffect(() => { loadAll() }, [loadAll])

  const addItem = async (collectionName, data) => {
    const newData = { ...data, createdAt: Date.now() }
    const docRef = await addDoc(collection(db, collectionName), newData)
    await loadAll()
    return docRef.id
  }

  const updateItem = async (collectionName, id, data) => {
    await updateDoc(doc(db, collectionName, id), data)
    await loadAll()
  }

  const deleteItem = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id))
    await loadAll()
  }

  const compressImage = (file, maxW = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > maxW) { height *= maxW / width; width = maxW }
        canvas.width = width; canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(blob => {
          if (blob) resolve(blob); else reject(new Error('Compression failed'))
        }, file.type || 'image/jpeg', quality)
      }
      img.onerror = () => reject(new Error('Failed to load image for compression'))
      img.src = url
    })
  }

  const uploadImage = async (file, path) => {
    try {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    } catch (err) {
      const maxSize = 700 * 1024
      let processedFile = file
      if (file.size > maxSize) {
        const compressed = await compressImage(file, 700, 0.6)
        if (compressed.size > maxSize) {
          throw new Error('Image is too large even after compression. Please use a smaller image (under 700KB after compression).')
        }
        processedFile = compressed
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
      events, members, donations, activities, loading,
      addItem, updateItem, deleteItem, uploadImage, loadAll,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
