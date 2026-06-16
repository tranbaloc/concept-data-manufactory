import { useEffect } from 'react'

/**
 * Slide-in PDF drawer
 * Usage: <PDFDrawer url="/forms/P-RS1-001-01.02.pdf" title="..." onClose={() => setUrl(null)} />
 * Render null when url is falsy.
 */
export default function PDFDrawer({ url, title, onClose }) {
  // Close on Escape
  useEffect(() => {
    if (!url) return
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [url, onClose])

  if (!url) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 1000,
          animation: 'fadeIn 0.18s ease',
        }}
      />

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(860px, 96vw)',
        background: '#fff',
        boxShadow: '-4px 0 32px rgba(0,0,0,0.22)',
        zIndex: 1001,
        display: 'flex', flexDirection: 'column',
        animation: 'slideIn 0.22s cubic-bezier(.4,0,.2,1)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px',
          borderBottom: '1px solid #e5e7eb',
          background: '#1a56db',
          color: '#fff',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14 }}>📄</span>
          <span style={{ fontWeight: 600, fontSize: 13, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </span>
          <a
            href={url}
            download
            style={{ color: '#fff', fontSize: 12, textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 4, marginRight: 6 }}
          >
            ⬇ Tải PDF
          </a>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* PDF iframe */}
        <iframe
          src={url + '#toolbar=1&navpanes=0&scrollbar=1&view=FitH'}
          style={{ flex: 1, border: 'none', width: '100%' }}
          title={title}
        />
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </>
  )
}
