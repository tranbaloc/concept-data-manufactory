import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/context'
export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang, t } = useLang()
  const isOrderPath = location.pathname.startsWith('/orders/')
  const title = t(`pageTitles.${location.pathname}`, 'GIAVICO AI')
  const nav = [
    // { key: 'overview',          path: '/dashboard',                 icon: '⊞' },
    { key: 'architecture',      path: '/architecture',              icon: '🗺️' },
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
    // { section: 'sectionRD' },
    // { key: 'formulaGen',        path: '/rd/formula-gen',            icon: '🧪' },
    // { key: 'batchCalc',         path: '/rd/batch-calc',             icon: '📐' },
    // { key: 'formulaCompare',    path: '/rd/formula-compare',        icon: '📊' },
    // { key: 'bom',               path: '/rd/bom',                    icon: '📑' },
    // { section: 'sectionPlanning' },
    // { key: 'schedule',          path: '/planning/schedule',         icon: '📅' },
    // { section: 'sectionFacilities' },
    // { key: 'equipment',         path: '/facilities/equipment',      icon: '🔧' },
    // { key: 'energy',            path: '/facilities/energy',         icon: '⚡' },
    // { key: 'production',        path: '/facilities/production',     icon: '⚙️' },
    // { key: 'safety',            path: '/facilities/safety',         icon: '🦺' },
    // { key: 'repair',            path: '/facilities/repair',         icon: '🛠️' },
    // { key: 'knowledge',         path: '/facilities/knowledge',      icon: '📚' },
    // { section: 'sectionWarehouse' },
    // { key: 'translation',       path: '/warehouse/translation',     icon: '🌐' },
    // { key: 'reconciliation',    path: '/warehouse/reconciliation',  icon: '🔍' },
    // { key: 'inventory',         path: '/warehouse/inventory',       icon: '📦' },
    // { key: 'workhour',          path: '/warehouse/workhour',        icon: '⏱️' },
    // { key: 'packaging',         path: '/warehouse/packaging',       icon: '🏷️' },
    // { key: 'statistics',        path: '/warehouse/statistics',      icon: '📈' },
    // { section: 'sectionManagement' },
    // { key: 'delivery',          path: '/management/delivery',       icon: '🚚' },
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
              style={{
                paddingLeft: item.indent ? 24 : undefined,
                fontSize: item.indent ? 12.5 : undefined,
              }}
            >
              <span style={{ fontSize: 13 }}>{item.icon}</span>
              <span>{t(`nav.${item.key}`)}</span>
            </div>
          )
        )}
        <div style={{ height: 16 }} />
      </aside>
      <div className="main-area">
        <header className="topbar">
          <span className="topbar-title">{t('topbar.platform')}</span>
          <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 13 }}>›</span>
          <span className="topbar-date">{title}</span>
          <div className="topbar-right">
            {isOrderPath && (
              <span className="topbar-chip" style={{ background: 'rgba(255,255,255,.25)' }}>
                {t('topbar.orderFlow')}
              </span>
            )}
            <span className="topbar-chip">
              {lang === 'zh' ? `6${t('topbar.month')} / ${t('topbar.year')}` : 'Tháng 6 / 2026'}
            </span>
            {/* Language switcher */}
            <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
              {[
                { code: 'vi', flag: '[VI]', label: 'VI' },
                { code: 'zh', flag: '[ZH]', label: '中文' },
              ].map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  title={code === 'vi' ? 'Tiếng Việt' : '中文'}
                  style={{
                    padding: '2px 7px',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.4)',
                    background: lang === code ? '#fff' : 'rgba(255,255,255,0.15)',
                    color: lang === code ? '#1a56db' : '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    lineHeight: 1.7,
                    transition: 'background 0.15s, color 0.15s',
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
