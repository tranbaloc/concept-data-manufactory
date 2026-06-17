import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../i18n/context'

const mockEmails = [
  {
    id: 'EM-2026-0614',
    from: 'procurement@sunny-foods.jp',
    company: 'Sunny Foods Japan',
    subject: 'Order Request – Concentrated Orange Juice NFC 65°Brix',
    date: '14/06/2026 09:22',
    status: 'new',
    body: `Dear Giavico Team,

We would like to place an order for the following product:

- Product: Concentrated Orange Juice NFC 65°Brix
- Quantity: 20,000 kg
- Packaging: 230 kg aseptic bag-in-drum
- Market: Japan (JAS standard)
- Delivery: within 45 days
- Special requirements: Non-GMO certification, Brix ≥ 65.0, Acid 3.2–4.0%, pH 3.5–4.2

Please confirm availability and provide COA for the latest batch.

Best regards,
Tanaka Hiroshi
Procurement Manager`,
    parsed: {
      productCode: 'GV-OL-V3-JP-001',
      productName: 'Nước Cam Cô Đặc NFC 65°Brix',
      market: 'Nhật Bản (JAS)',
      qty: '20,000 kg',
      packing: 'Túi vô trùng 230 kg/thùng',
      brix: '≥ 65.0',
      acid: '3.2 – 4.0%',
      ph: '3.5 – 4.2',
      delivery: '45 ngày',
      urgency: 'Một phần'
    }
  },
  {
    id: 'EM-2026-0613',
    from: 'orders@tropicalpulp.us',
    company: 'Tropical Pulp USA',
    subject: 'PO#2026-887 – Passion Fruit Puree 10 Brix',
    date: '13/06/2026 16:45',
    status: 'processing',
    body: `Hi Giavico,

Please find our purchase order attached:

PO#: 2026-887
- Product: Passion Fruit Puree, 10°Brix aseptic
- Quantity: 8,000 kg
- Packaging: 200 kg aseptic drum
- Standard: FDA 21 CFR
- Delivery: 30 days from order confirmation

Please send draft COA for review.

Thanks,
Maria Chen`,
    parsed: {
      productCode: 'GV-PS-V3-US-002',
      productName: 'Nước Chanh Leo Cô Đặc 10°Brix',
      market: 'Mỹ (FDA)',
      qty: '8,000 kg',
      packing: 'Thùng vô trùng 200 kg',
      brix: '10.0 ± 0.5',
      acid: '2.8 – 3.5%',
      ph: '2.9 – 3.4',
      delivery: '30 ngày',
      urgency: 'Bình thường'
    }
  },
  {
    id: 'EM-2026-0612',
    from: 'rnd@vitadrink.eu',
    company: 'VitaDrink GmbH (EU)',
    subject: 'Sample Request – Guava Juice Concentrate + Spec Sheet',
    date: '12/06/2026 11:10',
    status: 'rd_pending',
    body: `Hello,

We are evaluating new suppliers for guava juice concentrate.
Please send:
- 5 kg sample of Guava Concentrate (White Guava, 15 Brix)
- Full specification sheet (COA + microbiological analysis)

Our target specs: Brix 15±0.5, Acid < 1.0%, TPC < 100 cfu/ml, Y&M < 50 cfu/ml

Regards,
Klaus Weber
R&D Manager, VitaDrink GmbH`,
    parsed: {
      productCode: 'GV-GW-V3-EU-003',
      productName: 'Nước Ổi Trắng Cô Đặc 15°Brix',
      market: 'EU (EC 1333/2008)',
      qty: 'Mẫu 5 kg (đơn chính 15,000 kg)',
      packing: 'Mẫu: hộp 5 kg / Đơn: thùng 220 kg',
      brix: '15.0 ± 0.5',
      acid: '< 1.0%',
      ph: '3.6 – 4.0',
      delivery: 'Mẫu: 7 ngày / Đơn: 60 ngày',
      urgency: 'Mẫu gấp'
    }
  }
]

const statusMap = {
  new: { label: 'Mới', cls: 'badge-red' },
  processing: { label: 'Đang xử lý', cls: 'badge-yellow' },
  rd_pending: { label: 'Chờ R&D', cls: 'badge-blue' },
  done: { label: 'Hoàn tất', cls: 'badge-green' }
}

function StepBar({ active }) {
  const steps = [
    ['1','📧','Nhận Email'],
    ['2','📋','Tổng Hợp'],
    ['3','🧪','R&D Sample'],
    ['4','📄','Thông Báo CB'],
    ['5','✅','Quy Cách NT'],
    ['6','🤝','Xác Nhận SP'],
    ['7','🏭','Lệnh SX'],
  ]
  return (
    <div className="card" style={{padding:'12px 20px'}}>
      <div className="fl ic" style={{gap:0,overflowX:'auto'}}>
        {steps.map(([num, icon, label], i) => (
          <div key={i} className="fl ic" style={{flexShrink:0}}>
            <div style={{
              padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:500,whiteSpace:'nowrap',
              background: i+1 === active ? 'var(--blue)' : i+1 < active ? 'var(--green-lt)' : 'var(--bg)',
              color: i+1 === active ? '#fff' : i+1 < active ? 'var(--green)' : 'var(--muted)',
              border: i+1 === active ? 'none' : '1px solid var(--border)'
            }}>
              {icon} {num}. {label}
            </div>
            {i < steps.length-1 && <span style={{color:'var(--muted)',padding:'0 4px',fontSize:14}}>›</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const T = {
  vi: {
    title: '📧 Bước 1 – Nhận & Phân Tích Email Đơn Hàng',
    subtitle: 'AI tự động đọc email, trích xuất thông tin đơn hàng và chuẩn bị dữ liệu cho bước tiếp theo',
    statusNew: 'Mới', statusProcessing: 'Đang xử lý', statusRD: 'Chờ R&D', statusDone: 'Hoàn tất',
    all: 'Tất cả',
    extract: '🤖 Trích Xuất AI',
    next: '→ Bước 2: Tổng Hợp',
    reply: '↩ Trả Lời Email',
    extracted: '✅ Thông tin đã trích xuất',
    aiAnalysis: '🤖 Phân tích AI',
  },
  zh: {
    title: '📧 步骤1 – 接收与分析订单邮件',
    subtitle: 'AI自动读取邮件，提取订单信息并准备下一步数据',
    statusNew: '新', statusProcessing: '处理中', statusRD: '等待R&D', statusDone: '完成',
    all: '全部',
    extract: '🤖 AI 提取',
    next: '→ 步骤2：汇总',
    reply: '↩ 回复邮件',
    extracted: '✅ 已提取信息',
    aiAnalysis: '🤖 AI分析',
  },
}

export default function EmailInbox() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
  const [selected, setSelected] = useState(mockEmails[0])
  const [parsing, setParsing] = useState(false)
  const [parsed, setParsed] = useState(false)

  const handleSelect = (email) => {
    setSelected(email)
    setParsed(false)
    setParsing(false)
  }

  const handleParse = () => {
    setParsing(true)
    setTimeout(() => { setParsing(false); setParsed(true) }, 1400)
  }

  return (
    <div className="sg">
      <div className="ph">
        <div>
          <h1>📧 Bước 1 – Nhận Đơn Hàng Qua Email</h1>
          <p>AI tự động phân tích email khách hàng và trích xuất thông tin đơn hàng để chuyển sang bước tổng hợp</p>
        </div>
        <div className="fl ic g8">
          <span className="badge badge-red">1 mới</span>
          <span className="badge badge-yellow">1 đang xử lý</span>
          <span className="badge badge-blue">1 chờ R&D</span>
        </div>
      </div>

      <StepBar active={1} />

      <div style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:16,alignItems:'start'}}>
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',fontWeight:600,fontSize:13}}>
            📥 Hộp thư đến ({mockEmails.length})
          </div>
          {mockEmails.map(email => (
            <div
              key={email.id}
              onClick={() => handleSelect(email)}
              style={{
                padding:'12px 16px',cursor:'pointer',borderBottom:'1px solid var(--border)',
                background: selected?.id === email.id ? 'var(--blue-xlight)' : '#fff',
                borderLeft: selected?.id === email.id ? '3px solid var(--blue)' : '3px solid transparent',
              }}
            >
              <div className="fl ic jb mb4">
                <span style={{fontWeight:600,fontSize:12.5}}>{email.company}</span>
                <span className={'badge ' + statusMap[email.status].cls}>{statusMap[email.status].label}</span>
              </div>
              <div style={{fontSize:12,color:'var(--text)',marginBottom:3,fontWeight:500}} className="trunc">{email.subject}</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>{email.date} · {email.id}</div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="sg">
            <div className="card">
              <div className="fl ic jb" style={{marginBottom:14}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{selected.subject}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>
                    Từ: <b>{selected.from}</b> · {selected.date} · <b>{selected.id}</b>
                  </div>
                </div>
                <span className={'badge ' + statusMap[selected.status].cls}>{statusMap[selected.status].label}</span>
              </div>
              <div style={{
                background:'var(--bg)',borderRadius:6,padding:'14px 16px',
                fontSize:13,lineHeight:1.8,whiteSpace:'pre-wrap',fontFamily:'inherit',
                border:'1px solid var(--border)',marginBottom:14
              }}>{selected.body}</div>
              <button className="btn btn-primary" onClick={handleParse} disabled={parsing || parsed}>
                {parsing ? '⏳ AI đang phân tích email...' : parsed ? '✅ Đã phân tích xong' : '🤖 Phân Tích Email Bằng AI'}
              </button>
            </div>

            {parsed && (
              <div className="card">
                <div className="card-title">
                  <span className="card-title-left">✅ Kết Quả Trích Xuất AI – Biểu Mẫu P-RS1 002-06</span>
                  <span className="badge badge-green">Độ chính xác 97%</span>
                </div>
                <div className="fg3" style={{marginBottom:14}}>
                  {Object.entries(selected.parsed).map(([key, val]) => {
                    const labels = {
                      productCode:'Mã Sản Phẩm', productName:'Tên Sản Phẩm',
                      market:'Thị Trường', qty:'Số Lượng', packing:'Bao Bì',
                      brix:'Độ Brix', acid:'Acid (%)', ph:'pH',
                      delivery:'Thời Gian Giao', urgency:'Mức Độ Hoàn Thành'
                    }
                    return (
                      <div key={key} className="fr">
                        <label>{labels[key] || key}</label>
                        <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:13}}>{val}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="al al-blue" style={{marginBottom:12}}>
                  ℹ️ AI đã đối chiếu với cơ sở dữ liệu sản phẩm Giavico (P-RS1 001-07) và gán mã sản phẩm tự động. Vui lòng kiểm tra trước khi chuyển bước.
                </div>
                <div className="fl ic g8">
                  <button className="btn btn-primary" onClick={() => navigate('/orders/summary')}>
                    📋 Tạo Phiếu Tổng Hợp Đơn →
                  </button>
                  <button className="btn btn-ghost">💾 Lưu Nháp</button>
                  <button className="btn btn-ghost">📩 Gửi Email Xác Nhận</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
