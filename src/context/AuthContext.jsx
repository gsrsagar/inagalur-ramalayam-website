import { createContext, useContext, useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  updateEmail,
  verifyBeforeUpdateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)

  // Update admin display name (Username)
  const updateAdminProfile = async (displayName) => {
    if (!auth.currentUser) throw new Error('No authenticated user found.')
    await updateProfile(auth.currentUser, { displayName })
    await auth.currentUser.reload()
    setUser({ ...auth.currentUser })
  }

  // Update admin password with re-authentication
  const updateAdminPassword = async (currentPassword, newPassword) => {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error('No authenticated user found.')
    }
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
    await updatePassword(auth.currentUser, newPassword)
  }

  // Reload user from Firebase Auth
  const reloadUser = async () => {
    if (!auth.currentUser) return null
    await auth.currentUser.reload()
    setUser({ ...auth.currentUser })
    return auth.currentUser
  }

  // Update admin email with re-authentication
  const updateAdminEmail = async (currentPassword, newEmail) => {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error('No authenticated user found.')
    }
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
    
    let result = { direct: false, verificationSent: false }
    try {
      await updateEmail(auth.currentUser, newEmail)
      result.direct = true
    } catch (err) {
      if (typeof verifyBeforeUpdateEmail === 'function') {
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail)
        result.verificationSent = true
      } else {
        throw err
      }
    }
    await auth.currentUser.reload()
    setUser({ ...auth.currentUser })
    return result
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        reloadUser,
        updateAdminProfile,
        updateAdminPassword,
        updateAdminEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

