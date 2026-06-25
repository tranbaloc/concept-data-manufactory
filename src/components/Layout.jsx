import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/context'
import { LINES, LINE_KEYS } from '../pages/planning/planningData'

const planSteps = [
  { key: 'orderControl',         step: 'order-control',     icon: '📥' },
  { key: 'materialAnalysis',     step: 'material-analysis', icon: '🧪' },
  { key: 'deliveryConfirm',      step: 'delivery-confirm',  icon: '🤝' },
  { key: 'productionOrderIssue', step: 'production-order',  icon: '🏭' },
]

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang, t } = useLang()
  const isOrderPath = location.pathname.startsWith('/orders/')
  const curLine = (location.pathname.match(/^\/planning\/(av|nd|gv)\//) || [])[1]
  const curStep = (location.pathname.match(/^\/planning\/(?:av|nd|gv)\/(.+)$/) || [])[1]
  const stepKey = { 'order-control':'orderControl', 'material-analysis':'materialAnalysis', 'delivery-confirm':'deliveryConfirm', 'production-order':'productionOrderIssue' }[curStep]
  let title = t(`pageTitles.${location.pathname}`, '')
  if (!title) {
    if (curLine && stepKey) title = `Line ${LINES[curLine].code} – ${t(`nav.${stepKey}`)}`
    else title = 'GIAVICO AI'
  }
  const [openLine, setOpenLine] = useState(curLine || 'av')
  useEffect(() => { if (curLine) setOpenLine(curLine) }, [curLine])

  const nav = [
    { key: 'architecture', path: '/architecture', icon: '🗺️' },
    { section: 'sectionOrder' },
    { key: 'pipeline',          path: '/orders/pipeline',           icon: '🔄' },
    { key: 'inbox',             path: '/orders/inbox',              icon: '📧', indent: true },
    { key: 'summary',           path: '/orders/summary',            icon: '📋', indent: true },
    { key: 'sampleReport',      path: '/orders/sample-report',      icon: '🧪', indent: true },
    { key: 'newProductNotice',  path: '/orders/new-product-notice', icon: '📄', indent: true },
    { key: 'acceptanceSpecs',   path: '/orders/acceptance-specs',   icon: '✅', indent: true },
    { key: 'productConfirm',    path: '/orders/product-confirm',    icon: '🤝', indent: true },
    { key: 'productionOrder',   path: '/orders/production-order',   icon: '🏭', indent: true },
    { key: 'engineeringChange', path: '/orders/engineering-change', icon: '🔄', indent: true },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">GV</div>
          <div>
            <div className="sidebar-logo-text">GIAVICO</div>
            <div className="sidebar-logo-sub">AI Platform 2026</div>
          </div>
        </div>

        {nav.map((item, i) =>
          item.section ? (
            <div key={i} className="sidebar-section-label" style={{
              color: item.section === 'sectionOrder' ? 'var(--blue)' : undefined,
              fontWeight: item.section === 'sectionOrder' ? 700 : undefined,
            }}>
              {t(`nav.${item.section}`)}
            </div>
          ) : (
            <div
              key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              style={{ paddingLeft: item.indent ? 24 : undefined, fontSize: item.indent ? 12.5 : undefined }}
            >
              <span style={{ fontSize: 13 }}>{item.icon}</span>
              <span>{t(`nav.${item.key}`)}</span>
            </div>
          )
        )}

        {/* ===== Kế Hoạch SX V1.1 – 3 Line ===== */}
        <div className="sidebar-section-label" style={{ color: 'var(--blue)', fontWeight: 700 }}>
          {t('nav.sectionPlanning')}
        </div>

        {LINE_KEYS.map((lk) => {
          const L = LINES[lk]
          const open = openLine === lk
          const onThisLine = curLine === lk
          return (
            <div key={lk}>
              <div
                className="sidebar-item"
                onClick={() => { setOpenLine(lk); navigate(`/planning/${lk}/order-control`) }}
                style={{
                  fontWeight: 700, fontSize: 12.5, color: L.color,
                  background: onThisLine ? 'var(--blue-xlight)' : undefined,
                  borderLeft: `3px solid ${L.color}`,
                }}
              >
                <span style={{ fontSize: 13 }}>{L.emoji}</span>
                <span>Line {L.code} · {L.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}>{open ? '▾' : '▸'}</span>
              </div>
              {open && planSteps.map((s) => {
                const path = `/planning/${lk}/${s.step}`
                return (
                  <div
                    key={path}
                    className={`sidebar-item ${location.pathname === path ? 'active' : ''}`}
                    onClick={() => navigate(path)}
                    style={{ paddingLeft: 38, fontSize: 12 }}
                  >
                    <span style={{ fontSize: 12 }}>{s.icon}</span>
                    <span>{t(`nav.${s.key}`)}</span>
                  </div>
                )
              })}
            </div>
          )
        })}

        <div
          className={`sidebar-item ${location.pathname === '/planning/schedule' ? 'active' : ''}`}
          onClick={() => navigate('/planning/schedule')}
          style={{ paddingLeft: 24, fontSize: 12.5 }}
        >
          <span style={{ fontSize: 13 }}>📅</span>
          <span>{t('nav.schedule')}</span>
        </div>

        <div style={{ height: 16 }} />
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span className="topbar-title">{t('topbar.platform')}</span>
          <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 13 }}>›</span>
          <span className="topbar-date">{title}</span>
          <div className="topbar-right">
            {isOrderPath && (
              <span className="topbar-chip" style={{ background: 'rgba(255,255,255,.25)' }}>{t('topbar.orderFlow')}</span>
            )}
            <span className="topbar-chip">
              {lang === 'zh' ? `6${t('topbar.month')} / ${t('topbar.year')}` : 'Tháng 6 / 2026'}
            </span>
            <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
              {[{ code: 'vi', flag: '[VI]', label: 'VI' }, { code: 'zh', flag: '[ZH]', label: '中文' }].map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  title={code === 'vi' ? 'Tiếng Việt' : '中文'}
                  style={{
                    padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.4)',
                    background: lang === code ? '#fff' : 'rgba(255,255,255,0.15)',
                    color: lang === code ? '#1a56db' : '#fff', fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', lineHeight: 1.7, transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {flag} {label}
                </button>
              ))}
            </div>
            <div className="topbar-avatar">LT</div>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
