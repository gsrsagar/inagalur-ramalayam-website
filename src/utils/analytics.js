/**
 * Web Analytics (Google Analytics 4 & Custom Devotee Telemetry) Utility
 * Sri Seetha Rama Swamy Devasthanam, Inagaluru
 * Measurement ID: G-42WSRT2YX8 (or from import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)
 */

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-42WSRT2YX8'

/**
 * Checks whether Google Analytics / gtag is initialized and running
 */
export function getAnalyticsStatus() {
  const isGtagDefined = typeof window !== 'undefined' && typeof window.gtag === 'function'
  const hasDataLayer = typeof window !== 'undefined' && Array.isArray(window.dataLayer)
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true

  return {
    configured: Boolean(GA_MEASUREMENT_ID),
    measurementId: GA_MEASUREMENT_ID,
    gtagActive: isGtagDefined,
    dataLayerActive: hasDataLayer,
    isOnline,
    statusText: isGtagDefined ? 'Active & Tracking' : 'Initialized (Local Cache)',
  }
}

/**
 * Tracks a Single Page Application route change in Google Analytics 4
 */
export function trackPageView(pagePath, pageTitle) {
  if (typeof window === 'undefined') return

  const title = pageTitle || document.title || 'Sri Seetha Rama Swamy Devasthanam'
  const path = pagePath || window.location.pathname || '/'

  // 1. Google Analytics 4 gtag.js
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        page_location: window.location.href,
        send_to: GA_MEASUREMENT_ID,
      })
    } catch (err) {
      console.debug('[Analytics] GA4 page_view tracking error:', err)
    }
  }

  // 2. Record into session history for local analytics cache
  try {
    const historyKey = 'temple_pageviews_log'
    const existing = JSON.parse(sessionStorage.getItem(historyKey) || '[]')
    const updated = [
      { path, title, timestamp: Date.now() },
      ...existing.slice(0, 99),
    ]
    sessionStorage.setItem(historyKey, JSON.stringify(updated))
  } catch {}
}

/**
 * Tracks a custom event in Google Analytics 4
 * e.g., trackEvent('donate_modal_open', { source: 'navbar' })
 * e.g., trackEvent('audio_play', { title: 'Sri Rama Chants' })
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window === 'undefined' || !eventName) return

  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, {
        ...eventParams,
        send_to: GA_MEASUREMENT_ID,
      })
    } catch (err) {
      console.debug('[Analytics] GA4 trackEvent error:', err)
    }
  }
}

/**
 * Dispatches a live diagnostic test event to Google Analytics
 */
export function sendTestGAEvent() {
  const testId = 'test_' + Date.now().toString(36)
  const payload = {
    test_id: testId,
    timestamp: new Date().toISOString(),
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    source: 'Admin Web Analytics Tool',
  }

  trackEvent('admin_diagnostic_ping', payload)

  return {
    success: true,
    testId,
    measurementId: GA_MEASUREMENT_ID,
    timestamp: Date.now(),
  }
}
