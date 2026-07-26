import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useContent } from '../context/ContentContext'

export default function DonateModal() {
  const { t } = useLanguage()
  const { settings } = useContent()
  const [open, setOpen] = useState(false)
  const [copiedBank, setCopiedBank] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener('open-donate-modal', handleOpen)
    return () => window.removeEventListener('open-donate-modal', handleOpen)
  }, [])

  const handleCopyAccount = () => {
    const details = `Bank Name: ${settings.bankName}\nAccount Number: ${settings.bankAccount}\nIFSC: ${settings.bankIfsc}\nBranch: ${settings.bankBranch}`
    navigator.clipboard.writeText(details)
    setCopiedBank(true)
    setTimeout(() => setCopiedBank(false), 2000)
  }

  const handleDownloadQR = async () => {
    const url = settings.qrCodeUrl || '/assets/qr_code_placeholder.png'
    if (url.startsWith('data:')) {
      const a = document.createElement('a')
      a.href = url
      a.download = 'donation_qr.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      return
    }
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'donation_qr.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(url, '_blank')
    }
  }

  return (
    <>
      <button
        type="button"
        className="fab-btn fab-btn-admin"
        title="Admin Portal"
        onClick={() => window.location.href = '/admin'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      <button
        type="button"
        className="fab-btn fab-btn-donate"
        onClick={() => setOpen(true)}
        title="Donate Online"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="modal-backdrop active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="modal-window"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '480px' }}
            >
              <button type="button" className="modal-close-btn" onClick={() => setOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              
              <h2 className="modal-title" style={{ color: 'var(--primary-gold)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                {t('sponsor_title')}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {t('sponsor_desc')}
              </p>

              {/* UPI QR Scanner Area */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <div 
                  onClick={() => setIsPreviewOpen(true)}
                  style={{
                    width: '160px',
                    height: '160px',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '8px',
                    boxShadow: '0 0 20px var(--shadow-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginBottom: '0.4rem',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  title="Click to zoom / download"
                >
                  <img 
                    src={settings.qrCodeUrl || '/assets/qr_code_placeholder.png'} 
                    alt="UPI Donation QR Code" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div 
                  onClick={() => setIsPreviewOpen(true)}
                  style={{ fontSize: '0.62rem', color: 'var(--primary-gold)', cursor: 'pointer', marginBottom: '0.8rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}
                >
                  🔍 Click to zoom / Download
                </div>
                <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Scan UPI QR Code
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0 }}>
                  Supports Google Pay, PhonePe, Paytm, and all banking UPI apps.
                </p>
              </div>

              {/* Bank Transfer Details */}
              <div style={{
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                background: 'rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    Direct Bank Transfer
                  </h4>
                  <button 
                    type="button" 
                    onClick={handleCopyAccount}
                    className="btn-secondary" 
                    style={{ padding: '4px 10px', fontSize: '0.65rem', borderRadius: '6px' }}
                  >
                    {copiedBank ? 'Copied! ✓' : '📋 Copy Info'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Bank Name</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 500 }}>{settings.bankName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Account Number</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 500, fontFamily: 'monospace' }}>{settings.bankAccount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>IFSC Code</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 500, fontFamily: 'monospace' }}>{settings.bankIfsc}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Branch</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 500 }}>{settings.bankBranch}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Image Preview Overlay */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            className="modal-backdrop active"
            style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.25rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              style={{
                background: 'white',
                padding: '16px',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                maxWidth: '90%',
                maxHeight: '75%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button" 
                style={{
                  position: 'absolute', top: '-40px', right: '-10px',
                  background: 'none', border: 'none', color: 'white',
                  fontSize: '2rem', cursor: 'pointer', outline: 'none'
                }}
                onClick={() => setIsPreviewOpen(false)}
              >
                ✕
              </button>
              <img 
                src={settings.qrCodeUrl || '/assets/qr_code_placeholder.png'} 
                alt="Donation QR Code Large" 
                style={{ maxWidth: '320px', maxHeight: '320px', width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </motion.div>
            
            {/* Download Button */}
            <motion.button
              type="button"
              onClick={handleDownloadQR}
              className="btn-primary"
              style={{ padding: '10px 24px', textDecoration: 'none', background: 'var(--gradient-gold)', color: 'var(--dark-slate)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📥 Download QR Image
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
