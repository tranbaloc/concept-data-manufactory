import { useLang } from '../i18n/context'
/**
 * FormsPanel — sticky right sidebar listing all forms for a step.
 * Props:
 *   forms: [{ code: 'P-RS1 001-01.02', file: '/forms/P-RS1-001-01.02.pdf' }, ...]
 *   onOpen: (form) => void  — called when user clicks a form row
 */
export default function FormsPanel({ forms = [], onOpen }) {
  const { t } = useLang()
  return (
    <div style={{
      width: 210,
      flexShrink: 0,
      position: 'sticky',
      top: 16,
      alignSelf: 'flex-start',
    }}>
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--surface)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--blue)',
          color: '#fff',
          padding: '8px 12px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.03em',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          {t('common.allForms')}
        </div>

        {/* Form list */}
        <div style={{ padding: '6px 0' }}>
          {forms.map((f) => (
            <button
              key={f.code}
              onClick={() => onOpen(f)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '7px 12px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-xlight)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 13, flexShrink: 0 }}>📄</span>
              <div style={{ minWidth: 0 }}>
                {f.n != null && (
                  <div style={{ marginBottom: 2 }}>
                    <span style={{
                      background: '#e8f3ff', color: '#0078d4',
                      borderRadius: 4, padding: '1px 5px',
                      fontSize: 10, fontWeight: 700,
                    }}>Mẫu {f.n}</span>
                  </div>
                )}
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--blue)', lineHeight: 1.3, wordBreak: 'break-all' }}>
                  {f.code}
                </div>
                {f.label && (
                  <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2, lineHeight: 1.4 }}>
                    {f.label}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '6px 12px 8px', fontSize: 10, color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          {t('common.formHint')}
        </div>
      </div>
    </div>
  )
}
