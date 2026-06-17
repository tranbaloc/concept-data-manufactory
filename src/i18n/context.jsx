import { createContext, useContext, useState } from 'react'
import vi from './vi'
import zh from './zh'

const translations = { vi, zh }

const LangContext = createContext({
  lang: 'vi',
  setLang: () => {},
  t: (key) => key,
})

export function LangProvider({ children }) {
  const [lang, setLang] = useState('vi')

  function t(key, fallback) {
    const tr = translations[lang] || {}
    const val = key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), tr)
    if (val !== undefined) return val
    // fallback to vi
    const valVi = key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), translations.vi)
    return valVi !== undefined ? valVi : (fallback ?? key)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
