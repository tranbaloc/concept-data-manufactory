import { useLang } from '../i18n/context'
export default function FormsBanner({ forms, onOpen }) {
  const { t } = useLang()
  if (!forms || !forms.length) return null
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      background: 'var(--blue-xlight)',
      border: '1px solid var(--blue)',
      borderRadius: 6,
      marginBottom: 10,
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', whiteSpace: 'nowrap', marginRight: 2 }}>
        {t('common.forms')}
      </span>
      {forms.map(function(f) {
        return (
          <button
            key={f.code}
            onClick={function() { onOpen(f) }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              border: '1px solid var(--blue)',
              borderRadius: 4,
              background: '#fff',
              cursor: 'pointer',
              fontSize: 11.5,
              fontWeight: 600,
              color: 'var(--blue)',
              whiteSpace: 'nowrap',
            }}
          >
            {f.n != null && (
              <span style={{
                background: '#e8f3ff', color: '#0078d4',
                borderRadius: 3, padding: '0 4px', fontSize: 10, fontWeight: 700, marginRight: 2
              }}>Mẫu {f.n}</span>
            )}
            {f.code}
          </button>
        )
      })}
    </div>
  )
}
