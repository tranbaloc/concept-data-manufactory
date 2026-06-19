import { useState } from 'react'
import PDFDrawer from '../../components/PDFDrawer'
import FormsPanel from '../../components/FormsPanel'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../i18n/context'


function StepBar({ active }) {
  const steps = [
    ['1','📋','Đơn Mẫu'],['2','📦','Gửi Mẫu'],['3','📄','COA'],
    ['4','🧪','Báo Cáo R&D'],['5','✅','XNQC'],['6','📑','Tiêu Chuẩn'],['7','🤝','Họp Thỏa Thuận'],
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
            }}>{icon} {num}. {label}</div>
            {i < steps.length-1 && <span style={{color:'var(--muted)',padding:'0 4px',fontSize:14}}>›</span>}
          </div>
        ))}
      </div>
    </div>
  )
}


const FORMS = [
    {code:'P-RS1 002-06.01', label:'Phân Tích Đơn Hàng', file:'/forms/P-RS1-002-06.01.pdf'}
  ]
const T = {
  vi: {
    title: '📋 Bước 2 – Tổng Hợp & Phân Tích Đơn Hàng',
    subtitle: 'Biểu mẫu P-RS1 002-06.01 – Bảng Đề Xuất Thay Đổi Công Trình / Phân Tích Nguyên Nhân Đơn Mới',
    submit: '✅ Gửi Phân Tích',
    next: '→ Bước 3: R&D Sample',
  },
  zh: {
    title: '📋 步骤2 – 汇总与分析订单',
    subtitle: '表单 P-RS1 002-06.01 – 工程变更提案 / 新订单原因分析',
    submit: '✅ 提交分析',
    next: '→ 步骤3：R&D样品',
  },
}

export default function OrderSummary() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
const [pdf, setPdf] = useState(null)
    const [submitted, setSubmitted] = useState(false)
  const [urgency, setUrgency] = useState('general')
  const [importance, setImportance] = useState('A')
  const [changeReason, setChangeReason] = useState([])

  const toggleReason = (r) => setChangeReason(prev =>
    prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
  )

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div className="sg" style={{flex:1}}>
      <div className="ph">
        <div>
          <h1>{tx.title}</h1>
          <p>{tx.subtitle}</p>
        </div>
        <div className="badge badge-yellow">Đơn: EM-2026-0614</div>
      </div>

      <StepBar active={2} />

      <div className="g2">
        {/* Left: Form chinh */}
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📑 Thông Tin Đơn Hàng (P-RS1 002-06.01)</span></div>
            <div className="fg2" style={{marginBottom:12}}>
              <div className="fr"><label>Mã văn kiện</label><input defaultValue="P-RS1-002-06-2026-0614" /></div>
              <div className="fr"><label>Ngày thông báo</label><input defaultValue="14/06/2026" /></div>
              <div className="fr"><label>Ngày nhận</label><input defaultValue="14/06/2026" /></div>
              <div className="fr"><label>Mã sản phẩm</label><input defaultValue="GV-OL-V3-JP-001" /></div>
              <div className="fr"><label>Tên sản phẩm</label><input defaultValue="Nước Cam Cô Đặc NFC 65°Brix" /></div>
              <div className="fr"><label>Bao bì</label><input defaultValue="Túi vô trùng 230 kg/thùng" /></div>
              <div className="fr"><label>Số lượng</label><input defaultValue="20,000 kg" /></div>
              <div className="fr"><label>Tham khảo giá thành</label><input defaultValue="USD 1.80/kg (FOB)" /></div>
              <div className="fr"><label>SL dự tính/năm</label><input defaultValue="80,000 kg/năm" /></div>
              <div className="fr"><label>Ngày hoàn thành dự kiến</label><input defaultValue="29/07/2026" /></div>
            </div>

            <div className="fg2" style={{marginBottom:12}}>
              <div className="fr">
                <label>Mức độ khẩn cấp hoàn thành</label>
                <div className="fl ic g8" style={{marginTop:4}}>
                  {['urgent','general'].map(v => (
                    <label key={v} className="fl ic g8" style={{cursor:'pointer',fontWeight:400}}>
                      <input type="radio" name="urgency" value={v} checked={urgency===v} onChange={()=>setUrgency(v)} />
                      {v==='urgent' ? '🔴 Văn kiện gấp' : '🟢 Văn kiện thường'}
                    </label>
                  ))}
                </div>
              </div>
              <div className="fr">
                <label>Mức độ quan trọng</label>
                <div className="fl ic g8" style={{marginTop:4}}>
                  {['A','B'].map(v => (
                    <label key={v} className="fl ic g8" style={{cursor:'pointer',fontWeight:400}}>
                      <input type="radio" name="importance" value={v} checked={importance===v} onChange={()=>setImportance(v)} />
                      Mức {v}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">🔍 Phân Tích Quy Cách Nguyên Quả & Bán Thành Phẩm</span></div>
            <div className="fg3" style={{marginBottom:12}}>
              <div className="fr"><label>Brix nguyên quả</label><input defaultValue="11.5 – 13.0" /></div>
              <div className="fr"><label>Acid (%)</label><input defaultValue="0.8 – 1.2" /></div>
              <div className="fr"><label>pH</label><input defaultValue="3.5 – 4.0" /></div>
            </div>
            <div className="fr" style={{marginBottom:12}}>
              <label>Kiến nghị sử dụng nguyên liệu & bán thành phẩm</label>
              <textarea rows={3} defaultValue="Sử dụng cam Valencia vụ Tây Ninh (tháng 11-3), cô đặc bằng bốc hơi chân không 4 tầng. BTP dự kiến: 40 tấn cô đặc tươi vụ 2025-26." />
            </div>
          </div>
        </div>

        {/* Right: reasons + analysis */}
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📌 Nguyên Nhân Đặt Hàng (Kinh Doanh)</span></div>
            <div className="sg" style={{gap:8}}>
              {[
                ['new_order','🆕 Đơn đặt hàng mới'],
                ['shortage','📉 Thiếu hụt nguyên quả'],
                ['price_rise','📈 Giá mua nguyên quả tăng'],
                ['insufficient_est','⚠️ Khách hàng ước tính số lượng không đủ'],
                ['season_low','🌿 Lượng sản xuất của mùa vụ không đủ'],
                ['btp_gap','🔗 Liên kết bán thành phẩm không đủ'],
                ['inventory','📦 Tiêu hóa tồn kho'],
                ['spec_exceed','❌ Thành phần nguyên liệu vượt quy cách'],
              ].map(([val, label]) => (
                <label key={val} className="fl ic g8" style={{cursor:'pointer',fontWeight:400,fontSize:13,padding:'4px 0'}}>
                  <input type="checkbox" checked={changeReason.includes(val)} onChange={()=>toggleReason(val)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Phân Tích AI – Khả Năng Đáp Ứng</span></div>
            <div className="tl">
              {[
                ['tl-green','✅','Tồn kho bán thành phẩm','Có sẵn 12,000 kg BTP đạt chuẩn. Đủ cho 55% đơn hàng.'],
                ['tl-blue','🔵','Nguyên liệu tươi','Cần thu mua thêm khoảng 18 tấn cam Valencia.'],
                ['tl-yellow','⚠️','Năng lực sản xuất','Dây chuyền cô đặc có lịch sẵn trong tuần 28-30/2026.'],
                ['tl-green','✅','Quy chuẩn kỹ thuật','Công thức GV-OL-V3-JP đã có tiền lệ. R&D xác nhận đạt JAS.'],
              ].map(([cls,icon,title,desc],i) => (
                <div key={i} className="tl-item">
                  <div className={'tl-dot '+cls}>{icon}</div>
                  <div className="tl-body">
                    <div className="tl-title">{title}</div>
                    <div className="tl-meta">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">✍️ Ký Duyệt</span></div>
            <div className="fg3">
              {['Tổng Giám Đốc','Phó Tổng Điều Hành','Chủ Quản KT','Kế Hoạch','Kinh Doanh','Người Lập Biểu'].map(r => (
                <div key={r} className="fr">
                  <label>{r}</label>
                  <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:12,color:'var(--muted)',fontStyle:'italic'}}>
                    Chờ ký duyệt...
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!submitted ? (
            <button className="btn btn-primary w100" onClick={handleSubmit}>
              📤 Gửi Phiếu Tổng Hợp → Chuyển R&D
            </button>
          ) : (
            <div className="sg" style={{gap:8}}>
              <div className="al al-green">✅ Phiếu đã gửi thành công đến bộ phận R&D và Kế Hoạch</div>
              <button className="btn btn-primary" onClick={() => navigate('/orders/sample-report')}>
                🧪 Bước Tiếp: R&D Sample Report →
              </button> <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-002-06.01.pdf',title:'P-RS1 002-06.01'})}>📄 P-RS1 002-06.01</button>
            </div>
          )}
        </div>
      </div>
      <PDFDrawer url={pdf?.url} title={pdf?.title} onClose={()=>setPdf(null)} />
    </div>
    <FormsPanel forms={FORMS} onOpen={f=>setPdf({url:f.file,title:f.code})} />
  </div>
  )
}