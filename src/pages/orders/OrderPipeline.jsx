import { useNavigate } from 'react-router-dom'

const orders = [
  {
    id:'EM-2026-0614', company:'Sunny Foods Japan', product:'Nước Cam NFC 65°Brix',
    code:'GV-OL-V3-JP-001', qty:'20,000 kg', date:'14/06/2026',
    stage: 7, urgent: true, value:'~USD 36,400',
    history:[
      '14/06 · Nhận email đơn hàng',
      '14/06 · AI phân tích email – trích xuất xong',
      '14/06 · Tổng hợp đơn & phân tích (P-RS1 002-06.01)',
      '15/06 · Sample Report hoàn tất (SR-2026-0614-A1)',
      '15/06 · Gửi mẫu & COA đến khách hàng – DHL',
      '15/06 · Thông báo chế biến phát hành (001-01.02)',
      '15/06 · Quy cách NT đã duyệt (TP/BTP/NL)',
      '15/06 · Họp phối hợp – 7 bộ phận đã XN',
      '17/06 · Lệnh SX xuất chính thức (LS-GV-2026-0614-001)',
    ]
  },
  {
    id:'EM-2026-0613', company:'Tropical Pulp USA', product:'Nước Chanh Leo 10°Brix',
    code:'GV-PS-V3-US-002', qty:'8,000 kg', date:'13/06/2026',
    stage: 4, urgent: false, value:'~USD 11,200',
    history:[
      '13/06 · Nhận email đơn hàng',
      '13/06 · AI phân tích email – trích xuất xong',
      '14/06 · Tổng hợp đơn & phân tích (P-RS1 002-06.01)',
      '14/06 · R&D Sample Report đang thực hiện',
    ]
  },
  {
    id:'EM-2026-0612', company:'VitaDrink GmbH (EU)', product:'Nước Ổi Trắng 15°Brix',
    code:'GV-GW-V3-EU-003', qty:'Mẫu 5 kg', date:'12/06/2026',
    stage: 3, urgent: true, value:'Mẫu thử',
    history:[
      '12/06 · Nhận email yêu cầu mẫu',
      '12/06 · AI phân tích email – trích xuất xong',
      '13/06 · Tổng hợp đơn & phân tích',
      '14/06 · R&D đang chuẩn bị mẫu ổi trắng 5 kg',
    ]
  },
]

const stages = [
  { step:1, label:'Nhận Email', icon:'📧', color:'#0078d4' },
  { step:2, label:'Tổng Hợp Đơn', icon:'📋', color:'#107c10' },
  { step:3, label:'R&D Sample', icon:'🧪', color:'#ca8a04' },
  { step:4, label:'Thông Báo CB', icon:'📄', color:'#8b5cf6' },
  { step:5, label:'Quy Cách NT', icon:'✅', color:'#0891b2' },
  { step:6, label:'Xác Nhận SP', icon:'🤝', color:'#db2777' },
  { step:7, label:'Lệnh Sản Xuất', icon:'🏭', color:'#16a34a' },
]

const stepRoutes = [
  '/orders/inbox','/orders/summary','/orders/sample-report',
  '/orders/new-product-notice','/orders/acceptance-specs',
  '/orders/product-confirm','/orders/production-order'
]

const stageColors = ['#ef4444','#f97316','#eab308','#22c55e','#0891b2','#db2777','#16a34a']

export default function OrderPipeline() {
  const navigate = useNavigate()

  return (
    <div className="sg">
      <div className="ph">
        <div>
          <h1>🔄 Quy Trình Đơn Hàng – Pipeline Tổng Quan</h1>
          <p>Theo dõi toàn bộ đơn hàng từ email khách hàng đến lệnh sản xuất · Dựa theo biểu mẫu P-RS1</p>
        </div>
        <div className="fl ic g8">
          <button className="btn btn-primary" onClick={() => navigate('/orders/inbox')}>
            + Nhận Email Mới
          </button>
        </div>
      </div>

      {/* Stage summary */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:10}}>
        {stages.map(s => {
          const count = orders.filter(o => o.stage === s.step).length
          const passed = orders.filter(o => o.stage > s.step).length
          return (
            <div
              key={s.step}
              className="card"
              style={{cursor:'pointer',borderTop:`3px solid ${s.color}`,padding:'12px 14px'}}
              onClick={() => navigate(stepRoutes[s.step-1])}
            >
              <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
              <div style={{fontSize:11,fontWeight:600,color:'var(--text)',marginBottom:6,lineHeight:1.3}}>{s.step}. {s.label}</div>
              <div className="fl ic g8">
                {count > 0 && <span className="badge badge-yellow">{count} đang xử lý</span>}
                {passed > 0 && <span style={{fontSize:10,color:'var(--muted)'}}>{passed} đã qua</span>}
                {count === 0 && passed === 0 && <span style={{fontSize:10,color:'var(--muted)'}}>Trống</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Order cards */}
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div style={{padding:'14px 20px',borderBottom:'1px solid var(--border)',fontWeight:600,fontSize:13}}>
          📦 Danh Sách Đơn Hàng ({orders.length} đơn đang hoạt động)
        </div>
        {orders.map(order => (
          <div key={order.id} style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr auto',gap:16,alignItems:'start'}}>
              {/* Order info */}
              <div>
                <div className="fl ic g8 mb4">
                  <span style={{fontWeight:700,fontSize:13}}>{order.id}</span>
                  {order.urgent && <span className="badge badge-red">Gấp</span>}
                </div>
                <div style={{fontWeight:600,fontSize:12.5,marginBottom:2}}>{order.company}</div>
                <div style={{fontSize:12,color:'var(--muted)'}}>{order.product}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>
                  Mã: <b className="tb">{order.code}</b> · {order.qty} · {order.date}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{gridColumn:'2/4'}}>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>
                  Tiến độ: Bước {order.stage}/7 – {stages[order.stage-1].label}
                </div>
                <div style={{display:'flex',gap:3}}>
                  {stages.map(s => (
                    <div key={s.step} style={{
                      flex:1,height:8,borderRadius:4,
                      background: s.step <= order.stage ? stageColors[s.step-1] : 'var(--border)',
                      opacity: s.step === order.stage ? 1 : s.step < order.stage ? 0.6 : 0.3,
                      transition:'all .2s'
                    }} title={s.label} />
                  ))}
                </div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:6}}>
                  Gần nhất: {order.history[order.history.length-1]}
                </div>
              </div>

              {/* Value */}
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>Giá trị đơn</div>
                <div style={{fontWeight:700,fontSize:14,color:'var(--green)'}}>{order.value}</div>
              </div>

              {/* Actions */}
              <div className="fl fc g8">
                <button className="btn btn-primary btn-sm"
                  onClick={() => navigate(stepRoutes[order.stage-1])}>
                  → Bước {order.stage}: {stages[order.stage-1].label}
                </button>
                <button className="btn btn-ghost btn-sm">📋 Xem Chi Tiết</button>
              </div>
            </div>

            {/* History mini */}
            <div style={{marginTop:12,display:'flex',gap:6,flexWrap:'wrap'}}>
              {order.history.map((h, i) => (
                <div key={i} style={{
                  display:'flex',alignItems:'center',gap:4,fontSize:10.5,
                  color: i < order.stage-1 ? 'var(--green)' : i === order.stage-1 ? 'var(--blue)' : 'var(--muted)',
                  background: i < order.stage-1 ? 'var(--green-lt)' : i === order.stage-1 ? 'var(--blue-light)' : 'var(--bg)',
                  padding:'2px 8px',borderRadius:10,
                  border:'1px solid ' + (i < order.stage-1 ? '#a8e6a8' : i === order.stage-1 ? '#b3d7f7' : 'var(--border)')
                }}>
                  {i < order.stage-1 ? '✓' : i === order.stage-1 ? '●' : '○'} {h.split('·')[1]?.trim() || h}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Workflow guide */}
      <div className="card">
        <div className="card-title"><span className="card-title-left">📖 Hướng Dẫn Quy Trình – Biểu Mẫu Tương Ứng</span></div>
        <div className="tw">
          <table>
            <thead><tr><th>Bước</th><th>Tên Bước</th><th>Biểu Mẫu P-RS1</th><th>Bộ Phận Phụ Trách</th><th>Thao Tác</th></tr></thead>
            <tbody>
              {[
                [1,'📧 Nhận Email Đơn Hàng','—','Kinh Doanh','/orders/inbox'],
                [2,'📋 Tổng Hợp & Phân Tích','P-RS1 002-06.01 – Bảng ĐXTĐ Công Trình','Kinh Doanh + Kế Hoạch','/orders/summary'],
                [3,'🧪 R&D Sample Report','P-RS1 003-01.03 – Sample Report','R&D Department','/orders/sample-report'],
                [4,'📄 Thông Báo Chế Biến','P-RS1 001-01.02 + 001-03.02 + 001-07','R&D + Kỹ Thuật','/orders/new-product-notice'],
                [5,'✅ Quy Cách Nghiệm Thu','P-RS1 001-02.02 + 003-09.03 + 003-03.02','QA + R&D + Kỹ Thuật','/orders/acceptance-specs'],
                [6,'🤝 Xác Nhận Sản Phẩm','P-RS1 001-06.03 – Họp Phối Hợp','Tất Cả Bộ Phận','/orders/product-confirm'],
                [7,'🏭 Xuất Lệnh Sản Xuất','P-RS1 002-02.02 + 002-04.01 + 003-10.01','Kế Hoạch + Sản Xuất','/orders/production-order'],
              ].map(([step,name,form,dept,route]) => (
                <tr key={step}>
                  <td style={{fontWeight:700,color:stageColors[step-1]}}>{step}</td>
                  <td style={{fontWeight:500}}>{name}</td>
                  <td style={{fontSize:11.5,color:'var(--muted)'}}>{form}</td>
                  <td style={{fontSize:12}}>{dept}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => navigate(route)}>Mở →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
