import { useState } from 'react'
import PDFDrawer from '../../components/PDFDrawer'
import FormsPanel from '../../components/FormsPanel'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../i18n/context'


function StepBar({ active }) {
  const steps = [
    ['1','📧','Nhận Email'],['2','📋','Tổng Hợp'],['3','🧪','R&D Sample'],
    ['4','📄','Thông Báo CB'],['5','✅','Quy Cách NT'],['6','🤝','Xác Nhận SP'],['7','🏭','Lệnh SX'],
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

const depts = [
  { dept: 'R&D / Kỹ Thuật', rep: 'Nguyễn Văn An', role: 'Chủ Quản Kỹ Thuật', status: 'confirm' },
  { dept: 'QA / Chất Lượng', rep: 'Trần Thị Bảo', role: 'Chủ Quản QA', status: 'confirm' },
  { dept: 'Sản Xuất', rep: 'Phạm Minh Đức', role: 'Trưởng SX', status: 'pending' },
  { dept: 'Kế Hoạch', rep: 'Lê Thu Hương', role: 'Kế Hoạch SX', status: 'pending' },
  { dept: 'Kho / Nguyên Liệu', rep: 'Vũ Anh Khoa', role: 'Thủ Kho', status: 'pending' },
  { dept: 'Kinh Doanh', rep: 'Ngô Bảo Linh', role: 'Sale Manager', status: 'confirm' },
  { dept: 'Ban Điều Hành', rep: 'Lý Minh Phúc', role: 'Phó Tổng Điều Hành', status: 'pending' },
]


const FORMS = [
    {code:'P-RS1 001-06.03', label:'Xác Nhận Sản Phẩm', file:'/forms/P-RS1-001-06.03.pdf'}
  ]
const T = {
  vi: {
    title: '🤝 Bước 6 – Xác Nhận Sản Phẩm (Họp Phối Hợp)',
    subtitle: 'Biểu mẫu P-RS1 001-06.03 – Biên Bản Họp Phối Hợp 7 Bộ Phận',
    confirm: 'Xác nhận',
    pending: 'Chờ',
    confirmAll: '✅ Xác Nhận & Xuất Lệnh SX',
    next: '→ Bước 7: Lệnh SX',
  },
  zh: {
    title: '🤝 步骤6 – 产品确认（协调会议）',
    subtitle: '表单 P-RS1 001-06.03 – 7部门协调会议记录',
    confirm: '确认',
    pending: '待定',
    confirmAll: '✅ 确认并下达生产指令',
    next: '→ 步骤7：生产指令',
  },
}

export default function ProductConfirm() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
const [pdf, setPdf] = useState(null)
    const [statuses, setStatuses] = useState(depts.map(d => d.status))
  const [notes, setNotes] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const toggle = (i) => setStatuses(prev => {
    const next = [...prev]
    next[i] = next[i] === 'confirm' ? 'pending' : 'confirm'
    return next
  })

  const allConfirmed = statuses.every(s => s === 'confirm')

  return (
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div className="sg" style={{flex:1}}>
      <div className="ph">
        <div>
          <h1>🤝 Bước 6 – Họp Thỏa Thuận & Xác Nhận Sản Phẩm</h1>
          <p>P-RS1 001-06.03 – Biên Bản Họp Phối Hợp – Bảng Xác Định Sản Phẩm (協調會-產品確認單)</p>
        </div>
        <div className="fl ic g8">
          <span className="badge badge-blue">GV-OL-V3-JP-001</span>
          <span className={'badge ' + (allConfirmed ? 'badge-green' : 'badge-yellow')}>
            {statuses.filter(s=>s==='confirm').length}/{depts.length} Đã Xác Nhận
          </span>
        </div>
      </div>

      <StepBar active={6} />

      <div className="g2">
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📋 Thông Tin Cuộc Họp Phối Hợp</span></div>
            <div className="fg2" style={{marginBottom:12}}>
              <div className="fr"><label>Số biên bản</label><input defaultValue="BB-2026-0615-001" /></div>
              <div className="fr"><label>Ngày họp</label><input defaultValue="15/06/2026" /></div>
              <div className="fr"><label>Giờ</label><input defaultValue="14:00 – 15:30" /></div>
              <div className="fr"><label>Địa điểm</label><input defaultValue="Phòng họp R&D – Tây Ninh" /></div>
              <div className="fr"><label>Mã sản phẩm</label><input defaultValue="GV-OL-V3-JP-001" /></div>
              <div className="fr"><label>Tên sản phẩm</label><input defaultValue="Nước Cam Cô Đặc NFC 65°Brix" /></div>
              <div className="fr"><label>Khách hàng</label><input defaultValue="Sunny Foods Japan Co., Ltd" /></div>
              <div className="fr"><label>Đơn hàng liên quan</label><input defaultValue="EM-2026-0614 / PO dự kiến" /></div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📌 Các Vấn Đề Thảo Luận</span></div>
            <div className="sg" style={{gap:10}}>
              {[
                ['✅','Quy cách kỹ thuật','Brix 65.2, Acid 3.45%, pH 3.72 – Tất cả đạt tiêu chuẩn JAS và nội bộ Giavico.'],
                ['✅','Nguyên liệu','Tồn kho hiện có 12,000 kg BTP; cần thu mua thêm 18 tấn cam Tây Ninh.'],
                ['⚠️','Kế hoạch sản xuất','Dây chuyền cô đặc bận tuần 27. Đề xuất sản xuất tuần 28–30 (08–26/07/2026).'],
                ['✅','Bao bì & Nhãn','Nhà cung cấp túi vô trùng 230L xác nhận giao trong 5 ngày. Nhãn JAS đã duyệt mẫu.'],
                ['✅','Giá & Giao hàng','FOB USD 1.82/kg · Xuất khẩu container 20ft lạnh · Ngày giao dự kiến 29/07/2026.'],
                ['📝','Chứng từ','COA, Non-GMO cert, Phytosanitary cert cần chuẩn bị trước ngày xuất hàng.'],
              ].map(([icon,title,desc],i) => (
                <div key={i} style={{display:'flex',gap:10,padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                  <div style={{fontSize:16,flexShrink:0}}>{icon}</div>
                  <div>
                    <div style={{fontWeight:500,fontSize:13}}>{title}</div>
                    <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📝 Ghi Chú Cuộc Họp</span></div>
            <div className="fr">
              <textarea rows={4} value={notes} onChange={e=>setNotes(e.target.value)}
                placeholder="Nhập ghi chú, quyết định bổ sung từ cuộc họp..." />
            </div>
          </div>
        </div>

        <div className="sg">
          <div className="card">
            <div className="card-title">
              <span className="card-title-left">✍️ Danh Sách Xác Nhận Các Bộ Phận</span>
              <span style={{fontSize:12,color:'var(--muted)'}}>Click để toggle xác nhận</span>
            </div>
            <div className="sg" style={{gap:0}}>
              {depts.map((d, i) => (
                <div key={i} style={{
                  display:'flex',alignItems:'center',gap:12,padding:'10px 0',
                  borderBottom:'1px solid var(--border)',cursor:'pointer'
                }} onClick={() => toggle(i)}>
                  <div style={{
                    width:32,height:32,borderRadius:'50%',flexShrink:0,display:'flex',
                    alignItems:'center',justifyContent:'center',fontSize:14,
                    background: statuses[i]==='confirm' ? 'var(--green-lt)' : 'var(--bg)',
                    border: '2px solid ' + (statuses[i]==='confirm' ? 'var(--green)' : 'var(--border)'),
                    color: statuses[i]==='confirm' ? 'var(--green)' : 'var(--muted)',
                  }}>
                    {statuses[i]==='confirm' ? '✓' : '○'}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:500,fontSize:13}}>{d.dept}</div>
                    <div style={{fontSize:12,color:'var(--muted)'}}>{d.rep} · {d.role}</div>
                  </div>
                  <span className={'badge ' + (statuses[i]==='confirm' ? 'badge-green' : 'badge-yellow')}>
                    {statuses[i]==='confirm' ? 'Đã XN' : 'Chờ'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt12">
              <div className="pb" style={{marginBottom:6}}>
                <div className="pf" style={{
                  width: (statuses.filter(s=>s==='confirm').length/depts.length*100)+'%',
                  background:'var(--green)'
                }} />
              </div>
              <div style={{fontSize:11,color:'var(--muted)'}}>
                {statuses.filter(s=>s==='confirm').length}/{depts.length} bộ phận đã xác nhận
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">🏁 Kết Luận Cuộc Họp</span></div>
            <div className="fg2" style={{marginBottom:12}}>
              <div className="fr"><label>Quyết định</label>
                <select defaultValue="approve">
                  <option value="approve">✅ Chấp thuận sản xuất</option>
                  <option value="conditional">⚠️ Chấp thuận có điều kiện</option>
                  <option value="postpone">⏸️ Hoãn – cần bổ sung thông tin</option>
                  <option value="reject">❌ Từ chối</option>
                </select>
              </div>
              <div className="fr"><label>Ngày xác nhận KH dự kiến</label><input defaultValue="17/06/2026" /></div>
            </div>

            {allConfirmed && !confirmed ? (
              <button className="btn btn-primary w100" onClick={() => setConfirmed(true)}>
                🤝 Xác Nhận Biên Bản Cuộc Họp & Chốt Sản Phẩm
              </button>
            ) : confirmed ? (
              <div className="sg" style={{gap:8}}>
                <div className="al al-green">✅ Biên bản đã được ký xác nhận bởi {depts.length} bộ phận. Đơn hàng GV-OL-V3-JP-001 được phê duyệt sản xuất.</div>
                <button className="btn btn-primary" onClick={() => navigate('/orders/production-order')}>
                  🏭 Bước Cuối: Xuất Lệnh Sản Xuất →
                </button>
              <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-001-06.03.pdf',title:'P-RS1 001-06.03'})}>📄 P-RS1 001-06.03</button>
              </div>
            ) : (
              <div className="al al-yellow">⚠️ Cần {depts.length - statuses.filter(s=>s==='confirm').length} bộ phận còn lại xác nhận để hoàn tất cuộc họp.</div>
            )}
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Tóm Tắt Thông Số Đã Thỏa Thuận</span></div>
            <div className="sg" style={{gap:8}}>
              {[['Sản phẩm','Nước Cam Cô Đặc NFC 65°Brix'],
                ['Mã số','GV-OL-V3-JP-001'],
                ['Số lượng xác nhận','20,000 kg / Container 20ft lạnh'],
                ['Brix chấp nhận','≥65.0 (đo khi xuất xưởng)'],
                ['Ngày sản xuất dự kiến','08/07 – 26/07/2026'],
                ['Ngày giao hàng','29/07/2026 (FOB Tây Ninh)'],
                ['Giá FOB','USD 1.82/kg (đã bao gồm lạnh)'],
              ].map(([k,v]) => (
                <div key={k} className="fl ic jb" style={{padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontSize:12,color:'var(--muted)'}}>{k}</span>
                  <span style={{fontWeight:500,fontSize:13}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PDFDrawer url={pdf?.url} title={pdf?.title} onClose={()=>setPdf(null)} />
    </div>
    <FormsPanel forms={FORMS} onOpen={f=>setPdf({url:f.file,title:f.code})} />
  </div>
  )
}