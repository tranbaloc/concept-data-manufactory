import { useState } from 'react'
import { useLang } from '../i18n/context'
/**
 * FormsPanel — sticky right sidebar listing all forms for a step.
 * Props:
 *   forms: [{ code, label, file }, ...]
 *   onOpen: (form) => void
 *   collapsible: boolean — nếu true, cho phép thu gọn panel để bảng rộng hơn
 */
export default function FormsPanel({ forms = [], onOpen, collapsible = false }) {
  const { t } = useLang()
  const [open, setOpen] = useState(true)

  // Nút mở lại khi đã thu gọn
  if (collapsible && !open) {
    return (
      <div style={{ flexShrink: 0, position: 'sticky', top: 16, alignSelf: 'flex-start' }}>
        <button
          onClick={() => setOpen(true)}
          title={t('common.allForms')}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            padding: '12px 8px', border: '1px solid var(--border)', borderRadius: 10,
            background: 'var(--blue)', color: '#fff', cursor: 'pointer', fontWeight: 700,
            fontSize: 13, writingMode: 'vertical-rl', boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
          }}
        >
          📋 {t('common.allForms')} ›
        </button>
      </div>
    )
  }

  return (
    <div style={{ width: 210, flexShrink: 0, position: 'sticky', top: 16, alignSelf: 'flex-start' }}>
      <div style={{
        border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden',
        background: 'var(--surface)', boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--blue)', color: '#fff', padding: '9px 12px', fontSize: 13,
          fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 6,
        }}>
          <span>{t('common.allForms')}</span>
          {collapsible && (
            <button
              onClick={() => setOpen(false)}
              title="Thu gọn"
              style={{
                background: 'rgba(255,255,255,.2)', color: '#fff', border: 'none',
                borderRadius: 5, width: 22, height: 22, cursor: 'pointer', fontSize: 13, lineHeight: 1,
              }}
            >‹</button>
          )}
        </div>

        {/* Form list */}
        <div style={{ padding: '6px 0' }}>
          {forms.map((f) => (
            <button
              key={f.code}
              onClick={() => onOpen(f)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 12px',
                border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left',
                borderBottom: '1px solid var(--border)', transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-xlight)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 15, flexShrink: 0 }}>📄</span>
              <div style={{ minWidth: 0 }}>
                {f.n != null && (
                  <div style={{ marginBottom: 2 }}>
                    <span style={{ background: '#e8f3ff', color: '#0078d4', borderRadius: 4, padding: '1px 5px', fontSize: 10, fontWeight: 700 }}>Mẫu {f.n}</span>
                  </div>
                )}
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', lineHeight: 1.3, wordBreak: 'break-all' }}>
                  {f.code}
                </div>
                {f.label && (
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, lineHeight: 1.4 }}>
                    {f.label}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '7px 12px 9px', fontSize: 10.5, color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          {t('common.formHint')}
        </div>
      </div>
    </div>
  )
}
