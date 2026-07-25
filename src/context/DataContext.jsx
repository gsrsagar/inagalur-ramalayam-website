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

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
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
