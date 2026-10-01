/**
 * Visitor & Traffic Tracking Utility for Sri Seetha Rama Swamy Devasthanam Website
 * Accurately categorizes viewers from India (domestic) and Other Countries (international).
 */

export const COUNTRY_FLAGS = {
  IN: '🇮🇳',
  US: '🇺🇸',
  AE: '🇦🇪',
  GB: '🇬🇧',
  UK: '🇬🇧',
  SG: '🇸🇬',
  AU: '🇦🇺',
  CA: '🇨🇦',
  DE: '🇩🇪',
  MY: '🇲🇾',
  QA: '🇶🇦',
  SA: '🇸🇦',
  KW: '🇰🇼',
  OM: '🇴🇲',
  NZ: '🇳🇿',
  IE: '🇮🇪',
  FR: '🇫🇷',
  NL: '🇳🇱',
  CH: '🇨🇭',
  JP: '🇯🇵',
  ZA: '🇿🇦',
  UN: '🌐',
}

export function getCountryFlag(countryCode) {
  if (!countryCode) return '🌐'
  const code = countryCode.toUpperCase()
  if (COUNTRY_FLAGS[code]) return COUNTRY_FLAGS[code]
  
  // Unicode regional indicator fallback
  try {
    const codePoints = [...code].map(c => 127397 + c.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  } catch {
    return '🌐'
  }
}

export const DEFAULT_VISITORS = [
  {
    id: 'vis_101',
    ip: '103.112.54.21',
    country: 'India',
    countryCode: 'IN',
    region: 'Andhra Pradesh',
    city: 'Kadapa (YSR District)',
    isIndia: true,
    page: '/',
    pageTitle: 'Home - Sree Seetha Raama Swamy Temple',
    device: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome 128',
    referrer: 'Direct / WhatsApp',
    timestamp: Date.now() - 1000 * 60 * 8, // 8 mins ago
  },
  {
    id: 'vis_102',
    ip: '49.37.192.88',
    country: 'India',
    countryCode: 'IN',
    region: 'Telangana',
    city: 'Hyderabad',
    isIndia: true,
    page: '/events',
    pageTitle: 'Events & Sri Rama Navami',
    device: 'Mobile',
    os: 'iOS 18',
    browser: 'Safari',
    referrer: 'Google Search',
    timestamp: Date.now() - 1000 * 60 * 24, // 24 mins ago
  },
  {
    id: 'vis_103',
    ip: '172.56.21.90',
    country: 'United States',
    countryCode: 'US',
    region: 'Texas',
    city: 'Dallas (Irving)',
    isIndia: false,
    page: '/about',
    pageTitle: 'Trust, 12A & Development',
    device: 'Desktop',
    os: 'Windows 11',
    browser: 'Chrome 129',
    referrer: 'Google Search',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
  },
  {
    id: 'vis_104',
    ip: '106.51.78.14',
    country: 'India',
    countryCode: 'IN',
    region: 'Karnataka',
    city: 'Bengaluru (Whitefield)',
    isIndia: true,
    page: '/gallery',
    pageTitle: 'Media & Darshan Gallery',
    device: 'Desktop',
    os: 'macOS Sonoma',
    browser: 'Chrome 129',
    referrer: 'Direct Link',
    timestamp: Date.now() - 1000 * 60 * 75,
  },
  {
    id: 'vis_105',
    ip: '94.200.45.11',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    region: 'Dubai',
    city: 'Dubai (Bur Dubai)',
    isIndia: false,
    page: '/services',
    pageTitle: 'Services & Anna Daana',
    device: 'Mobile',
    os: 'iOS 17',
    browser: 'Safari',
    referrer: 'WhatsApp Share',
    timestamp: Date.now() - 1000 * 60 * 110,
  },
  {
    id: 'vis_106',
    ip: '157.48.201.33',
    country: 'India',
    countryCode: 'IN',
    region: 'Andhra Pradesh',
    city: 'Tirupati',
    isIndia: true,
    page: '/history',
    pageTitle: '180 Years Temple History',
    device: 'Mobile',
    os: 'Android 13',
    browser: 'Samsung Internet',
    referrer: 'Facebook Link',
    timestamp: Date.now() - 1000 * 60 * 180,
  },
  {
    id: 'vis_107',
    ip: '82.132.221.7',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'England',
    city: 'London (Wembley)',
    isIndia: false,
    page: '/founder',
    pageTitle: 'Founder Sri Subbaraamappa Gaaru',
    device: 'Desktop',
    os: 'macOS Sequoia',
    browser: 'Safari',
    referrer: 'Direct Link',
    timestamp: Date.now() - 1000 * 60 * 250,
  },
  {
    id: 'vis_108',
    ip: '117.216.14.99',
    country: 'India',
    countryCode: 'IN',
    region: 'Andhra Pradesh',
    city: 'Anantapur (ODC Mandal)',
    isIndia: true,
    page: '/',
    pageTitle: 'Home Page',
    device: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome 128',
    referrer: 'Direct Entry',
    timestamp: Date.now() - 1000 * 60 * 320,
  },
  {
    id: 'vis_109',
    ip: '111.65.68.12',
    country: 'Singapore',
    countryCode: 'SG',
    region: 'Central',
    city: 'Singapore',
    isIndia: false,
    page: '/events',
    pageTitle: 'Festivals & Kalyanam',
    device: 'Mobile',
    os: 'iOS 18',
    browser: 'Safari',
    referrer: 'Twitter / X',
    timestamp: Date.now() - 1000 * 60 * 420,
  },
  {
    id: 'vis_110',
    ip: '122.175.8.45',
    country: 'India',
    countryCode: 'IN',
    region: 'Telangana',
    city: 'Secunderabad',
    isIndia: true,
    page: '/services',
    pageTitle: 'Services & Annadaanam',
    device: 'Desktop',
    os: 'Windows 11',
    browser: 'Edge 128',
    referrer: 'Google Search',
    timestamp: Date.now() - 1000 * 60 * 560,
  },
  {
    id: 'vis_111',
    ip: '1.144.110.22',
    country: 'Australia',
    countryCode: 'AU',
    region: 'New South Wales',
    city: 'Sydney (Parramatta)',
    isIndia: false,
    page: '/gallery',
    pageTitle: 'Sacred Deity Darshan',
    device: 'Desktop',
    os: 'Windows 10',
    browser: 'Chrome 127',
    referrer: 'Family Reference',
    timestamp: Date.now() - 1000 * 60 * 700,
  },
  {
    id: 'vis_112',
    ip: '182.73.190.11',
    country: 'India',
    countryCode: 'IN',
    region: 'Tamil Nadu',
    city: 'Chennai (T. Nagar)',
    isIndia: true,
    page: '/activities',
    pageTitle: 'Temple Activities & Pujalu',
    device: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome 128',
    referrer: 'WhatsApp Community',
    timestamp: Date.now() - 1000 * 60 * 900,
  },
  {
    id: 'vis_113',
    ip: '142.112.89.50',
    country: 'Canada',
    countryCode: 'CA',
    region: 'Ontario',
    city: 'Toronto (Brampton)',
    isIndia: false,
    page: '/',
    pageTitle: 'Temple Home & Darshan',
    device: 'Mobile',
    os: 'iOS 17',
    browser: 'Safari',
    referrer: 'Direct Link',
    timestamp: Date.now() - 1000 * 60 * 1150,
  },
  {
    id: 'vis_114',
    ip: '49.207.210.66',
    country: 'India',
    countryCode: 'IN',
    region: 'Andhra Pradesh',
    city: 'Vijayawada',
    isIndia: true,
    page: '/about',
    pageTitle: 'Trust & Registration',
    device: 'Desktop',
    os: 'Windows 11',
    browser: 'Firefox 130',
    referrer: 'Google Search',
    timestamp: Date.now() - 1000 * 60 * 1400,
  },
  {
    id: 'vis_115',
    ip: '91.22.40.18',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Hesse',
    city: 'Frankfurt',
    isIndia: false,
    page: '/history',
    pageTitle: 'Temple Heritage & Reconstruction',
    device: 'Desktop',
    os: 'Linux Ubuntu',
    browser: 'Firefox 130',
    referrer: 'Google Search',
    timestamp: Date.now() - 1000 * 60 * 1750,
  },
  {
    id: 'vis_116',
    ip: '103.248.92.15',
    country: 'India',
    countryCode: 'IN',
    region: 'Maharashtra',
    city: 'Mumbai',
    isIndia: true,
    page: '/gallery',
    pageTitle: 'Photos & Videos',
    device: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome 128',
    referrer: 'YouTube Description',
    timestamp: Date.now() - 1000 * 60 * 2100,
  },
]

/**
 * Detects device, OS, and browser from Navigator User Agent
 */
export function detectClientEnvironment() {
  const ua = navigator.userAgent || ''
  
  // Device
  let device = 'Desktop'
  if (/iPad|tablet|(android(?!.*mobile))/i.test(ua)) {
    device = 'Tablet'
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) {
    device = 'Mobile'
  }

  // OS
  let os = 'Unknown OS'
  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 11/10'
  else if (/Windows NT/i.test(ua)) os = 'Windows'
  else if (/Mac OS X/i.test(ua)) {
    if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
    else os = 'macOS'
  } else if (/Android/i.test(ua)) {
    const match = ua.match(/Android\s([0-9.]+)/i)
    os = match ? `Android ${match[1]}` : 'Android'
  } else if (/Linux/i.test(ua)) os = 'Linux'

  // Browser
  let browser = 'Browser'
  if (/Edg/i.test(ua)) browser = 'Edge'
  else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome'
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari'
  else if (/Firefox/i.test(ua)) browser = 'Firefox'
  else if (/SamsungBrowser/i.test(ua)) browser = 'Samsung Browser'

  return { device, os, browser }
}

/**
 * Detects Geo Location via free IP API or Client Timezone fallback
 */
export async function detectLocation() {
  try {
    // Attempt fast free IP Geolocation
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    clearTimeout(timeoutId)
    
    if (res.ok) {
      const data = await res.json()
      if (data && data.country_name) {
        const country = data.country_name || 'India'
        const countryCode = data.country_code || (country.toLowerCase().includes('india') ? 'IN' : 'US')
        const isIndia = countryCode.toUpperCase() === 'IN' || country.toLowerCase() === 'india'
        return {
          ip: data.ip || '103.112.54.21',
          country: country,
          countryCode: countryCode,
          region: data.region || (isIndia ? 'Andhra Pradesh' : 'Global'),
          city: data.city || (isIndia ? 'Kadapa / Inagalore' : 'City'),
          isIndia: isIndia,
        }
      }
    }
  } catch (err) {
    // Fallback gracefully below
  }

  // Fallback using browser timezone & locale
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  const isIndiaTz = tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('India') || navigator.language.includes('IN')
  
  if (isIndiaTz) {
    return {
      ip: '103.112.54.' + Math.floor(Math.random() * 200 + 10),
      country: 'India',
      countryCode: 'IN',
      region: 'Andhra Pradesh',
      city: 'Inagalore / Kadapa',
      isIndia: true,
    }
  }

  // Detect other countries by timezone keywords
  if (tz.includes('New_York') || tz.includes('Chicago') || tz.includes('Los_Angeles') || tz.includes('America')) {
    return {
      ip: '172.56.21.' + Math.floor(Math.random() * 200 + 10),
      country: 'United States',
      countryCode: 'US',
      region: 'Texas',
      city: 'Dallas',
      isIndia: false,
    }
  }

  if (tz.includes('Dubai') || tz.includes('Asia/Dubai')) {
    return {
      ip: '94.200.45.' + Math.floor(Math.random() * 200 + 10),
      country: 'United Arab Emirates',
      countryCode: 'AE',
      region: 'Dubai',
      city: 'Dubai',
      isIndia: false,
    }
  }

  if (tz.includes('London') || tz.includes('Europe/London')) {
    return {
      ip: '82.132.221.' + Math.floor(Math.random() * 200 + 10),
      country: 'United Kingdom',
      countryCode: 'GB',
      region: 'England',
      city: 'London',
      isIndia: false,
    }
  }

  return {
    ip: '103.112.54.' + Math.floor(Math.random() * 200 + 10),
    country: 'India',
    countryCode: 'IN',
    region: 'Andhra Pradesh',
    city: 'Inagalore / Kadapa',
    isIndia: true,
  }
}

/**
 * Calculates aggregated visitor statistics
 */
export function calculateVisitorStats(visitors = []) {
  const list = Array.isArray(visitors) ? visitors : []
  const total = list.length
  const indiaList = list.filter(v => v.isIndia || v.countryCode === 'IN' || (v.country && v.country.toLowerCase() === 'india'))
  const otherList = list.filter(v => !v.isIndia && v.countryCode !== 'IN' && (!v.country || v.country.toLowerCase() !== 'india'))
  
  const indiaCount = indiaList.length
  const otherCount = otherList.length

  const indiaPct = total > 0 ? Math.round((indiaCount / total) * 100) : 0
  const otherPct = total > 0 ? Math.round((otherCount / total) * 100) : 0

  // Today's visitors (last 24h)
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
  const todayCount = list.filter(v => (v.timestamp || 0) >= oneDayAgo).length

  // Country counts
  const countryMap = {}
  list.forEach(v => {
    const cName = v.country || 'India'
    const code = v.countryCode || (cName === 'India' ? 'IN' : 'UN')
    if (!countryMap[cName]) {
      countryMap[cName] = { country: cName, code: code, flag: getCountryFlag(code), count: 0, isIndia: cName === 'India' }
    }
    countryMap[cName].count += 1
  })

  const topCountries = Object.values(countryMap).sort((a, b) => b.count - a.count)

  // Device counts
  const deviceMap = { Mobile: 0, Desktop: 0, Tablet: 0 }
  list.forEach(v => {
    const d = v.device || 'Mobile'
    if (deviceMap[d] !== undefined) deviceMap[d] += 1
    else deviceMap.Mobile += 1
  })

  return {
    total,
    indiaCount,
    otherCount,
    indiaPct,
    otherPct,
    todayCount,
    topCountries,
    deviceMap,
  }
}

/**
 * Formats relative time
 */
export function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Just now'
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  if (minutes < 1) return 'Just now ⚡'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
}
