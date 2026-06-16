import { useState } from 'react'
import PDFDrawer from '../../components/PDFDrawer'
import FormsBanner from '../../components/FormsBanner'
import FormsPanel from '../../components/FormsPanel'
import { useNavigate } from 'react-router-dom'


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


const FORMS = [
    {code:'P-RS1 001-01.02', label:'Thông Báo Chế Biến SP', file:'/forms/P-RS1-001-01.02.pdf'},
    {code:'P-RS1 001-03.02', label:'Quy Cách SP Mới', file:'/forms/P-RS1-001-03.02.pdf'},
    {code:'P-RS1 002-02.02', label:'Ký Nhận & Thu Hồi TB', file:'/forms/P-RS1-002-02.02.pdf'}
  ]
export default function NewProductNotice() {
  const navigate = useNavigate()
  const [pdf, setPdf] = useState(null)
  const [tab, setTab] = useState('notice')
  const [issued, setIssued] = useState(false)

  return (
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div className="sg" style={{flex:1}}>
      <div className="ph">
        <div>
          <h1>📄 Bước 4 – Thông Báo Chế Biến & Quy Cách Sản Phẩm Mới</h1>
          <p>P-RS1 001-01.02 – Bảng Thông Báo Chế Biến · P-RS1 001-03.02 – Bảng Diễn Giải Quy Cách Sản Phẩm Mới</p>
        </div>
        <div className="fl ic g8">
          <span className="badge badge-blue">GV-OL-V3-JP-001</span>
          <span className="badge badge-yellow">Chờ ký duyệt</span>
        </div>
      </div>

      <StepBar active={4} />

      <div className="tabs">
        {[
          ['notice','📋 Thông Báo Chế Biến (001-01.02)'],
          ['spec','📑 Quy Cách SP Mới (001-03.02)'],
          ['code','🔖 Mã Số SP (001-07)'],
        ].map(([id,label]) => (
          <div key={id} className={'tab '+(tab===id?'active':'')} onClick={()=>setTab(id)}>{label}</div>
        ))}
      </div>

      {tab === 'notice' && <FormsBanner forms={[{code:'P-RS1 001-01.02',label:'Thông Báo Chế Biến SP',file:'/forms/P-RS1-001-01.02.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}
      {tab === 'spec' && <FormsBanner forms={[{code:'P-RS1 001-03.02',label:'Quy Cách SP Mới',file:'/forms/P-RS1-001-03.02.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}
      {tab === 'code' && <FormsBanner forms={[{code:'P-RS1 002-02.02',label:'Ký Nhận & Thu Hồi',file:'/forms/P-RS1-002-02.02.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}

      {tab === 'notice' && (
        <div className="g2">

                    <div className="card">
            <div className="card-title">
              <span className="card-title-left">📋 Bảng Thông Báo Chế Biến Sản Phẩm Mới (P-RS1 001-01.02)</span>
              <span style={{fontSize:11,color:'var(--muted)'}}>Phiên bản 1 · 15/06/2026</span>
            </div>
            <div className="fg2" style={{marginBottom:12}}>
              <div className="fr"><label>Mã số (Vietnam)</label><input defaultValue="GV-OL-V3-JP-001" /></div>
              <div className="fr"><label>Mã số (Taiwan)</label><input defaultValue="C-OL-V3-JP-001" /></div>
              <div className="fr"><label>Tên sản phẩm</label><input defaultValue="Nước Cam Cô Đặc NFC 65°Brix" /></div>
              <div className="fr"><label>Bao bì</label><input defaultValue="Túi vô trùng 230 kg/thùng" /></div>
              <div className="fr"><label>Điều kiện bảo quản</label><input defaultValue="-18°C, tránh ánh sáng" /></div>
              <div className="fr"><label>Hạn sử dụng</label><input defaultValue="18 tháng từ ngày sản xuất" /></div>
              <div className="fr"><label>Trọng lượng</label><input defaultValue="230 kg ± 2 kg" /></div>
            </div>

            <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>CHỈ TIÊU KỸ THUẬT</div>
            <div className="tw" style={{marginBottom:14}}>
              <table>
                <thead><tr><th>Chỉ Tiêu</th><th>Quy Cách</th><th>KH Yêu Cầu</th><th>Nội Bộ</th></tr></thead>
                <tbody>
                  {[
                    ['Brix','≥65.0','≥65.0','65.0–66.5'],
                    ['Acid (%)','3.2–4.0','3.2–4.0','3.2–4.2'],
                    ['pH','3.5–4.2','3.5–4.2','3.4–4.3'],
                    ['AN','<10','<10','<10'],
                    ['Solid (%)','≥65.5','≥65.5','≥65.0'],
                    ['TPC (cfu/ml)','<100','<100','<50'],
                    ['Y/M (cfu/ml)','<50','<50','<30'],
                    ['Coliform','Không có','Không có','ND'],
                  ].map(([a,b,c,d]) => (
                    <tr key={a}><td className="fw5">{a}</td><td>{b}</td><td className="tb">{c}</td><td>{d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>NGUYÊN LIỆU & PHỤ GIA</div>
            <div className="fr" style={{marginBottom:12}}>
              <textarea rows={3} defaultValue="Cam Valencia tươi (Tây Ninh), Enzyme pectinase 0.1%, Acid citric (điều chỉnh pH nếu cần)" />
            </div>

            <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>QUY TRÌNH / PHƯƠNG THỨC</div>
            <div className="fr" style={{marginBottom:12}}>
              <textarea rows={4} defaultValue="Tiếp nhận → Bóc vỏ → Nghiền → Chà (Milling) → Lọc tinh → Cô đặc chân không 4 tầng (t < 55°C) → UHT 95°C/15s → Làm lạnh → Rót vô trùng → Bảo quản -18°C" />
            </div>

            <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>GHI CHÚ</div>
            <div className="fr" style={{marginBottom:14}}>
              <textarea rows={2} defaultValue="Ưu tiên cam vụ chính (tháng 11-3). Kiểm tra Brix/Acid/pH tại từng công đoạn. Chứng nhận Non-GMO yêu cầu từ nhà cung cấp cam." />
            </div>

            <div className="card-title" style={{marginTop:8}}><span className="card-title-left">✍️ Ký Duyệt</span></div>
            <div className="fg3">
              {['Chủ Quản Kỹ Thuật','Chủ Quản Đơn Vị','Người Lập Biểu'].map(r => (
                <div key={r} className="fr">
                  <label>{r}</label>
                  <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:12,color:'var(--muted)',fontStyle:'italic'}}>
                    Chờ ký...
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📬 Lưu Vết Phát Hành & Thu Hồi (P-RS1 002-02.02)</span></div>
            <div className="tw" style={{marginBottom:12}}>
              <table>
                <thead><tr><th>STT</th><th>Mã SP</th><th>Tên SP</th><th>Ngày Lập</th><th>Ngày Giao</th><th>Người Nhận</th><th>Ngày TH</th><th>Người Giao</th><th>Ghi Chú</th></tr></thead>
                <tbody>
                  <tr>
                    <td>1</td><td className="tb fw5">GV-OL-V3-JP-001</td>
                    <td>Cam NFC 65°Brix</td>
                    <td>15/06</td><td>15/06</td>
                    <td>KH: Sunny Foods</td>
                    <td style={{color:'var(--muted)'}}>—</td>
                    <td>R&D Team</td>
                    <td>Phát hành lần 1</td>
                  </tr>
                  <tr>
                    <td>2</td><td className="tb fw5">GV-OL-V3-JP-001</td>
                    <td>Cam NFC 65°Brix</td>
                    <td>15/06</td><td>15/06</td>
                    <td>QA Dept.</td>
                    <td style={{color:'var(--muted)'}}>—</td>
                    <td>R&D Team</td>
                    <td>Nội bộ kiểm soát</td>
                  </tr>
                  <tr>
                    <td>3</td><td className="tb fw5">GV-OL-V3-JP-001</td>
                    <td>Cam NFC 65°Brix</td>
                    <td>15/06</td><td>15/06</td>
                    <td>Sản Xuất</td>
                    <td style={{color:'var(--muted)'}}>—</td>
                    <td>R&D Team</td>
                    <td>Phục vụ lập lịch SX</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="al al-yellow" style={{marginBottom:12}}>⚠️ Sau khi có phiên bản mới, cần thu hồi tất cả bản phát hành trước theo danh sách ký nhận trên.</div>

            {!issued ? (
              <button className="btn btn-primary w100" onClick={() => setIssued(true)}>
                📤 Phát Hành Bảng Thông Báo Chế Biến
              </button>
            ) : (
              <div className="sg" style={{gap:8}}>
                <div className="al al-green">✅ Đã phát hành thành công đến 3 bộ phận liên quan</div>
                <button className="btn btn-primary" onClick={() => navigate('/orders/acceptance-specs')}>
                  ✅ Bước Tiếp: Quy Cách Nghiệm Thu →
                </button>
                <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-001-01.02.pdf',title:'P-RS1 001-01.02'})}>📄 P-RS1 001-01.02</button>
                <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-001-03.02.pdf',title:'P-RS1 001-03.02'})}>📄 P-RS1 001-03.02</button>
                <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-002-02.02.pdf',title:'P-RS1 002-02.02'})}>📄 P-RS1 002-02.02</button>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'spec' && (
        <div className="card">

                    <div className="card-title">
            <span className="card-title-left">📑 Bảng Diễn Giải Quy Cách Sản Phẩm Mới (P-RS1 001-03.02)</span>
            <span style={{fontSize:11,color:'var(--muted)'}}>Dành cho Sản Xuất tham khảo</span>
          </div>
          <div className="al al-blue" style={{marginBottom:14}}>
            ℹ️ Bảng này là phiên bản phát cho Sản Xuất làm tài liệu tham khảo. Không chỉnh sửa khi đang sản xuất – liên hệ R&D nếu cần thay đổi.
          </div>
          <div className="fg2" style={{marginBottom:12}}>
            <div className="fr"><label>Mã số VN</label><input defaultValue="GV-OL-V3-JP-001" readOnly /></div>
            <div className="fr"><label>Mã số TW</label><input defaultValue="C-OL-V3-JP-001" readOnly /></div>
            <div className="fr"><label>Tên sản phẩm</label><input defaultValue="Nước Cam Cô Đặc NFC 65°Brix" readOnly /></div>
            <div className="fr"><label>Bao bì</label><input defaultValue="Túi vô trùng 230 kg/thùng" readOnly /></div>
            <div className="fr"><label>Điều kiện BQ / HSD</label><input defaultValue="-18°C / 18 tháng" readOnly /></div>
            <div className="fr"><label>Trọng lượng</label><input defaultValue="230 kg ± 2 kg" readOnly /></div>
          </div>

          <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>CHỈ TIÊU KỸ THUẬT (SX THAM KHẢO)</div>
          <div className="tw" style={{marginBottom:14}}>
            <table>
              <thead><tr><th>Chỉ Tiêu</th><th>Quy Cách</th><th>KH</th><th>Nội Bộ</th></tr></thead>
              <tbody>
                {[['Brix','≥65.0','≥65.0','65.0–66.5'],['Acid','3.2–4.0%','3.2–4.0%','3.2–4.2%'],
                  ['pH','3.5–4.2','3.5–4.2','3.4–4.3'],['TPC','<100 cfu/ml','<100','<50'],
                  ['Y/M','<50 cfu/ml','<50','<30']].map(([a,b,c,d]) => (
                  <tr key={a}><td className="fw5">{a}</td><td>{b}</td><td className="tb">{c}</td><td>{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fg2" style={{marginBottom:12}}>
            <div className="fr">
              <label>Nguyên liệu</label>
              <textarea rows={3} defaultValue="Cam Valencia tươi (Tây Ninh/Bình Thuận), enzyme pectinase 0.1%, acid citric (nếu cần điều chỉnh)" readOnly />
            </div>
            <div className="fr">
              <label>Quy trình</label>
              <textarea rows={3} defaultValue="Tiếp nhận → Bóc vỏ → Nghiền → Chà → Lọc → Cô đặc (t<55°C) → UHT 95°C/15s → Làm lạnh → Rót vô trùng → -18°C" readOnly />
            </div>
          </div>

          <div className="fg3">
            {['Chủ Quản Kỹ Thuật','Chủ Quản Đơn Vị','Người Lập Biểu'].map(r => (
              <div key={r} className="fr">
                <label>{r}</label>
                <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:12,color:'var(--muted)',fontStyle:'italic'}}>Chờ ký...</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'code' && (
        <div className="card">

                    <div className="card-title"><span className="card-title-left">🔖 Nguyên Tắc Mã Hóa Sản Phẩm (P-RS1 001-07) – Phiên Bản 67</span></div>
          <div className="al al-blue" style={{marginBottom:14}}>
            Mã sản phẩm Giavico được cấu trúc theo nguyên tắc: [Xưởng]-[Tên SP]-[Loại]-[Thị Trường]-[Số thứ tự]
          </div>
          <div style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:8,padding:'16px 20px',marginBottom:14}}>
            <div style={{fontFamily:'monospace',fontSize:15,fontWeight:700,color:'var(--blue)',marginBottom:12}}>GV - OL - V3 - JP - 001</div>
            <div className="fg3">
              {[['GV','Xưởng Việt Nam – Giavico International'],['OL','Cam (Orange/柳橙)'],['V3','Loại cô đặc 3x'],['JP','Thị trường Nhật Bản'],['001','Số thứ tự sản phẩm']].map(([code,desc]) => (
                <div key={code} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                  <div style={{background:'var(--blue)',color:'#fff',padding:'2px 8px',borderRadius:4,fontSize:12,fontWeight:700,flexShrink:0,fontFamily:'monospace'}}>{code}</div>
                  <div style={{fontSize:12,color:'var(--text)'}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="tw">
            <table>
              <thead><tr><th>Mã Xưởng</th><th>Tên Xưởng</th><th>Mã SP</th><th>Tên SP (VN)</th><th>Mã SP</th><th>Tên SP (VN)</th></tr></thead>
              <tbody>
                {[['V (GV)','Vietnam – Giavico','OL','Cam (Orange)','GV','Ổi trắng (Guava white)'],
                  ['C','Taiwan – Chiame','PS','Chanh leo (Passion)','CR','Cà rốt (Carrot)'],
                  ['S','Shanghai – Chiame','MN','Xoài (Mango)','LM','Chanh (Lemon)'],
                ].map((r,i) => <tr key={i}>{r.map((v,j) => <td key={j} className={j===0||j===2||j===4?'fw5 tb':''}>{v}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <PDFDrawer url={pdf?.url} title={pdf?.title} onClose={()=>setPdf(null)} />
    </div>
    <FormsPanel forms={FORMS} onOpen={f=>setPdf({url:f.file,title:f.code})} />
  </div>
  )
}