import { useNavigate } from 'react-router-dom'
import { useLang } from '../../i18n/context'

const STEPS = {
  vi: [
    ['1','📥','Quản Chế Đơn','order-control'],
    ['2','🧪','Phân Tích NVL','material-analysis'],
    ['3','🤝','Xác Nhận Giao Kỳ','delivery-confirm'],
    ['4','🏭','Lệnh Sản Xuất','production-order'],
  ],
  zh: [
    ['1','📥','订单管制','order-control'],
    ['2','🧪','原料分析','material-analysis'],
    ['3','🤝','交期确认','delivery-confirm'],
    ['4','🏭','生产指令','production-order'],
  ],
}

export default function PlanningStepBar({ active, line = 'av' }) {
  const { lang } = useLang()
  const navigate = useNavigate()
  const steps = STEPS[lang] || STEPS.vi
  return (
    <div className="card" style={{ padding: '14px 20px' }}>
      <div className="fl ic" style={{ gap: 0, overflowX: 'auto' }}>
        {steps.map(([num, icon, label, step], i) => {
          const isActive = i + 1 === active
          const isDone = i + 1 < active
          return (
            <div key={i} className="fl ic" style={{ flexShrink: 0 }}>
              <div
                onClick={() => navigate(`/planning/${line}/${step}`)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 10,
                  fontSize: 15.5,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all .12s',
                  background: isActive ? 'var(--blue)' : isDone ? 'var(--green-lt)' : 'var(--bg)',
                  color: isActive ? '#fff' : isDone ? 'var(--green)' : 'var(--muted)',
                  border: isActive ? 'none' : '1px solid var(--border)',
                  boxShadow: isActive ? '0 2px 8px rgba(26,86,219,.30)' : 'none',
                }}
              >
                {icon} {num}. {label}
              </div>
              {i < steps.length - 1 && (
                <span style={{ color: 'var(--muted)', padding: '0 7px', fontSize: 18 }}>›</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
