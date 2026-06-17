import { useState } from 'react'
import PDFDrawer from '../../components/PDFDrawer'
import FormsBanner from '../../components/FormsBanner'
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

const docs = [
  { code:'P-RS1 002-04.01', name:'Bảng QC Quy Cách SP Mới – Ký Nhận & Thu Hồi', recipients:['QA','R&D','Sản Xuất'], issued: true, pdf:'/forms/P-RS1-002-04.01.pdf' },
  { code:'P-RS1 002-02.02', name:'Bảng Thông Báo Chế Biến SP – Ký Nhận & Thu Hồi', recipients:['Sản Xuất','Kế Hoạch','Kinh Doanh'], issued: true, pdf:'/forms/P-RS1-002-02.02.pdf' },
  { code:'P-RS1 002-03.02', name:'Bảng Thông Báo Sửa Đổi CT/PT/QC – Ký Nhận', recipients:['QA','R&D','Sản Xuất'], issued: false, pdf:'/forms/P-RS1-002-03.02.pdf' },
  { code:'P-RS1 003-10.01', name:'Bảng QC Bán Thành Phẩm – Ký Nhận & Thu Hồi', recipients:['Kho','QA','Sản Xuất'], issued: true, pdf:'/forms/P-RS1-003-10.01.pdf' },
]


const FORMS = [
    {code:'P-RS1 002-07.03', label:'Thông Báo Thay Đổi', file:'/forms/P-RS1-002-07.03.pdf'},
    {code:'P-RS1 002-01.07', label:'Đề Xuất Thay Đổi', file:'/forms/P-RS1-002-01.07.pdf'},
    {code:'P-RS1 002-05.04', label:'Thay Đổi Công Trình', file:'/forms/P-RS1-002-05.04.pdf'},
    {code:'P-RS1 002-04.01', label:'Ký Nhận QC SP', file:'/forms/P-RS1-002-04.01.pdf'},
    {code:'P-RS1 002-02.02', label:'Ký Nhận TB Chế Biến', file:'/forms/P-RS1-002-02.02.pdf'},
    {code:'P-RS1 002-03.02', label:'Ký Nhận Sửa Đổi', file:'/forms/P-RS1-002-03.02.pdf'},
    {code:'P-RS1 003-10.01', label:'Ký Nhận QC BTP', file:'/forms/P-RS1-003-10.01.pdf'}
  ]
const T = {
  vi: {
    title: '🏭 Bước 7 – Xuất Lệnh Sản Xuất & Phát Hành Tài Liệu',
    subtitle: 'Biểu mẫu P-RS1 002-02.02 · 002-04.01 · 003-10.01 – Lệnh sản xuất, phân công NVL, kế hoạch đóng gói',
  },
  zh: {
    title: '🏭 步骤7 – 下达生产指令与文件发布',
    subtitle: '表单 P-RS1 002-02.02 · 002-04.01 · 003-10.01 – 生产指令、原料分配、包装计划',
  },
}

export default function ProductionOrder() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [pdf, setPdf] = useState(null)
  const [tab, setTab] = useState('order')
  const [released, setReleased] = useState(false)
  const [docStatus, setDocStatus] = useState(docs.map(d => d.issued))

  return (
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div className="sg" style={{flex:1}}>
      <div className="ph">
        <div>
          <h1>{tx.title}</h1>
          <p>Lệnh sản xuất chính thức · Phát hành và ký nhận các bảng tiêu chuẩn liên quan · Thu hồi phiên bản cũ</p>
        </div>
        <div className="fl ic g8">
          <span className="badge badge-green">GV-OL-V3-JP-001</span>
          <span className="badge badge-green">✅ Đã phê duyệt</span>
        </div>
      </div>

      <StepBar active={7} />

      <div className="tabs">
        {[
          ['order','🏭 Lệnh Sản Xuất'],
          ['docs','📋 Phát Hành Tài Liệu'],
          ['change','🔄 Thay Đổi Công Thức (nếu có)'],
          ['timeline','📅 Tiến Độ Sản Xuất'],
        ].map(([id,label]) => (
          <div key={id} className={'tab '+(tab===id?'active':'')} onClick={()=>setTab(id)}>{label}</div>
        ))}
      </div>

      {tab === 'order' && <FormsBanner forms={[{code:'P-RS1 002-07.03',label:'Thông Báo Thay Đổi',file:'/forms/P-RS1-002-07.03.pdf'},{code:'P-RS1 002-01.07',label:'Đề Xuất Thay Đổi',file:'/forms/P-RS1-002-01.07.pdf'},{code:'P-RS1 002-05.04',label:'Thay Đổi Công Trình',file:'/forms/P-RS1-002-05.04.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}
      {tab === 'docs' && <FormsBanner forms={[{code:'P-RS1 002-04.01',label:'Ký Nhận QC SP',file:'/forms/P-RS1-002-04.01.pdf'},{code:'P-RS1 002-02.02',label:'Ký Nhận TB Chế Biến',file:'/forms/P-RS1-002-02.02.pdf'},{code:'P-RS1 002-03.02',label:'Ký Nhận Sửa Đổi',file:'/forms/P-RS1-002-03.02.pdf'},{code:'P-RS1 003-10.01',label:'Ký Nhận QC BTP',file:'/forms/P-RS1-003-10.01.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}
      {tab === 'change' && <FormsBanner forms={[{code:'P-RS1 002-01.07',label:'Đề Xuất Thay Đổi',file:'/forms/P-RS1-002-01.07.pdf'},{code:'P-RS1 002-07.03',label:'Thông Báo Thay Đổi',file:'/forms/P-RS1-002-07.03.pdf'},{code:'P-RS1 002-05.04',label:'Thay Đổi Công Trình',file:'/forms/P-RS1-002-05.04.pdf'},{code:'P-RS1 002-03.02',label:'Ký Nhận Sửa Đổi',file:'/forms/P-RS1-002-03.02.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}

      {tab === 'order' && (
        <div className="g2">

                    <div className="sg">
            <div className="card">
              <div className="card-title">
                <span className="card-title-left">🏭 LỆNH SẢN XUẤT</span>
                <span className={`badge ${released ? 'badge-green' : 'badge-yellow'}`}>{released ? '✅ Đã Xuất' : 'Chờ Phê Duyệt'}</span>
              </div>
              <div style={{
                border:'2px solid var(--blue)',borderRadius:8,padding:'16px 20px',
                marginBottom:14,background:'var(--blue-xlight)'
              }}>
                <div style={{fontWeight:700,fontSize:16,marginBottom:4,color:'var(--blue)'}}>Lệnh SX: LS-GV-2026-0614-001</div>
                <div style={{fontSize:12,color:'var(--muted)'}}>Ngày xuất: 17/06/2026 · Mã đơn: EM-2026-0614</div>
              </div>

              <div className="fg2" style={{marginBottom:12}}>
                <div className="fr"><label>Sản phẩm</label><input defaultValue="Nước Cam Cô Đặc NFC 65°Brix" readOnly /></div>
                <div className="fr"><label>Mã sản phẩm</label><input defaultValue="GV-OL-V3-JP-001" readOnly /></div>
                <div className="fr"><label>Số lượng sản xuất</label><input defaultValue="20,000 kg" /></div>
                <div className="fr"><label>Số lô sản xuất</label><input defaultValue="LOT-OL-2026-07A" /></div>
                <div className="fr"><label>Ngày bắt đầu SX</label><input defaultValue="08/07/2026" /></div>
                <div className="fr"><label>Ngày kết thúc SX</label><input defaultValue="26/07/2026" /></div>
                <div className="fr"><label>Dây chuyền</label><select><option>Dây chuyền cô đặc #1</option><option>Dây chuyền cô đặc #2</option></select></div>
                <div className="fr"><label>Người phụ trách SX</label><input defaultValue="Phạm Minh Đức – Trưởng SX" /></div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>KẾ HOẠCH NGUYÊN LIỆU</div>
              <div className="tw" style={{marginBottom:14}}>
                <table>
                  <thead><tr><th>Nguyên Liệu / BTP</th><th>Tồn Kho</th><th>Cần Thêm</th><th>Đơn Vị Cung Cấp</th><th>Ngày Dự Kiến Nhập</th></tr></thead>
                  <tbody>
                    {[
                      ['Cam Valencia tươi','—','~47 tấn (NQ)','Nông trại Tây Ninh A & B','01–05/07/2026'],
                      ['BTP cam sau chà (lạnh)','12,000 kg','8,000 kg bổ sung','Tự sản xuất','05–08/07/2026'],
                      ['Túi vô trùng PE 230L','15 bộ','90 bộ','Cty Bao Bì Nam Việt','01/07/2026'],
                      ['Nhãn JAS (theo QC Japan)','0','100 tờ','Cty In Ấn Phú Cường','28/06/2026'],
                      ['Enzyme pectinase 0.1%','2 kg','5 kg','Cty HC Sài Gòn','25/06/2026'],
                    ].map((r,i) => (
                      <tr key={i}>{r.map((v,j) => <td key={j} className={j===0?'fw5':''}>{v}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="fl ic g8" style={{marginBottom:8,flexWrap:'wrap'}}>
                <button className="btn btn-ghost" onClick={()=>setPdf({url:'/forms/P-RS1-002-07.03.pdf',title:'P-RS1 002-07.03'})}>📄 P-RS1 002-07.03</button>
                <button className="btn btn-ghost" onClick={()=>setPdf({url:'/forms/P-RS1-002-01.07.pdf',title:'P-RS1 002-01.07'})}>📄 P-RS1 002-01.07</button>
                <button className="btn btn-ghost" onClick={()=>setPdf({url:'/forms/P-RS1-002-05.04.pdf',title:'P-RS1 002-05.04'})}>📄 P-RS1 002-05.04</button>
              </div>
              {!released ? (
                <button className="btn btn-primary w100" onClick={() => setReleased(true)}>
                  🚀 Xuất Chính Thức Lệnh Sản Xuất LS-GV-2026-0614-001
                </button>
              ) : (
                <div className="al al-green">✅ Lệnh sản xuất đã xuất chính thức. Đã gửi thông báo đến Sản Xuất, Kho, Kế Hoạch và QA.</div>
              )}
            </div>
          </div>

          <div className="sg">
            <div className="card">
              <div className="card-title"><span className="card-title-left">📊 Thống Kê Đơn Hàng</span></div>
              <div className="sg4" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                {[
                  ['Tổng SL đặt','20,000 kg','var(--blue-light)','var(--blue)'],
                  ['Giá FOB','USD 1.82/kg','var(--green-lt)','var(--green)'],
                  ['Giá trị đơn','~ USD 36,400','var(--yellow-lt)','var(--yellow)'],
                  ['Thời gian SX','19 ngày','var(--blue-light)','var(--blue)'],
                ].map(([label,val,bg,col]) => (
                  <div key={label} style={{background:bg,borderRadius:8,padding:'12px 14px'}}>
                    <div style={{fontSize:11,color:col,marginBottom:4}}>{label}</div>
                    <div style={{fontSize:18,fontWeight:700,color:col}}>{val}</div>
                  </div>
                ))}
              </div>
              <div className="divider" />
              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>TIÊU CHÍ QC XUẤT XƯỞNG</div>
              {[['Brix','≥65.0°'],['Acid','3.2–4.0%'],['pH','3.5–4.2'],['TPC','<100 cfu/ml'],['Y&M','<50 cfu/ml'],['Coliform','ND']].map(([k,v]) => (
                <div key={k} className="fl ic jb" style={{padding:'5px 0',borderBottom:'1px solid var(--border)',fontSize:13}}>
                  <span className="cm">{k}</span><span className="fw5">{v}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-title"><span className="card-title-left">🔔 Thông Báo Gửi Tự Động</span></div>
              <div className="sg" style={{gap:6}}>
                {[
                  ['✅','Sản Xuất','Nhận lệnh SX LS-GV-2026-0614-001','Vừa xong'],
                  ['✅','Kho Nguyên Liệu','Chuẩn bị NVL theo kế hoạch','Vừa xong'],
                  ['✅','QA Department','Lên lịch kiểm tra lô sản xuất','Vừa xong'],
                  ['⏳','Kế Hoạch','Cập nhật lịch sản xuất tháng 7','Đang gửi...'],
                  ['⏳','Kinh Doanh','Xác nhận booking tàu / container lạnh','Đang gửi...'],
                ].map(([icon,to,msg,time],i) => (
                  <div key={i} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
                    <span style={{fontSize:14}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12.5,fontWeight:500}}>{to}</div>
                      <div style={{fontSize:11,color:'var(--muted)'}}>{msg}</div>
                    </div>
                    <span style={{fontSize:11,color:'var(--muted)',whiteSpace:'nowrap'}}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'docs' && (
        <div className="sg">

                    <div className="al al-blue">
            ℹ️ Các bảng tiêu chuẩn dưới đây cần được phát hành chính thức và ký nhận bởi các bộ phận liên quan. Sau khi có phiên bản mới, phiên bản cũ phải được thu hồi theo danh sách ký nhận.
          </div>
          {docs.map((doc, i) => (
            <div key={i} className="card">
              <div className="card-title">
                <span className="card-title-left">
                  <span className="badge badge-gray" style={{marginRight:8}}>{doc.code}</span>
                  {doc.name}
                </span>
                <span className={'badge ' + (docStatus[i] ? 'badge-green' : 'badge-yellow')}>
                  {docStatus[i] ? '✅ Đã Phát Hành' : '⏳ Chờ Phát Hành'}
                </span>
              </div>
              <div className="tw" style={{marginBottom:12}}>
                <table>
                  <thead><tr><th>STT</th><th>Mã SP</th><th>Tên SP</th><th>Ngày Lập</th><th>Ngày Giao</th><th>Người Nhận</th><th>Người Giao</th><th>Ngày TH</th><th>Ghi Chú</th></tr></thead>
                  <tbody>
                    {doc.recipients.map((recv, j) => (
                      <tr key={j}>
                        <td>{j+1}</td>
                        <td className="tb fw5">GV-OL-V3-JP-001</td>
                        <td>Cam NFC 65°Brix</td>
                        <td>17/06</td>
                        <td>{docStatus[i] ? '17/06' : '—'}</td>
                        <td>{recv}</td>
                        <td>R&D / KT</td>
                        <td style={{color:'var(--muted)'}}>—</td>
                        <td className="cm tsm">Phát hành lần 1</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="fl ic g8" style={{marginTop:4}}>
                <button className='btn btn-ghost btn-sm' onClick={()=>setPdf({url:doc.pdf,title:doc.code})}>📄 {doc.code}</button>
                {!docStatus[i] && (
                  <button className="btn btn-outline btn-sm" onClick={() => setDocStatus(p => { const n=[...p]; n[i]=true; return n })}>
                    📤 Phát Hành Tài Liệu Này
                  </button>
                )}
              </div>
            </div>
          ))}
          {docStatus.every(Boolean) && (
            <div className="al al-green">✅ Tất cả tài liệu đã được phát hành và ký nhận. Quy trình đơn hàng EM-2026-0614 hoàn tất!</div>
          )}
        </div>
      )}

      {tab === 'change' && (
        <div className="sg">

                    <div className="al al-yellow">⚠️ Mục này chỉ sử dụng khi có yêu cầu thay đổi công thức, quy trình hoặc quy cách trong quá trình sản xuất.</div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">🔄 Bảng Đề Xuất Thay Đổi (P-RS1 002-01.07)</span></div>
            <div className="fg2" style={{marginBottom:12}}>
              <div className="fr"><label>Mã sản phẩm</label><input defaultValue="GV-OL-V3-JP-001" /></div>
              <div className="fr"><label>Ngày đề xuất</label><input defaultValue="17/06/2026" /></div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontWeight:500,fontSize:12.5,marginBottom:8}}>Hạng mục sửa đổi</div>
              <div className="fl ic g8">
                {['Quy cách (Specification)','Phương thức/Công thức (Formula)','Quy trình (Process)'].map(r => (
                  <label key={r} className="fl ic g8" style={{cursor:'pointer',fontWeight:400,fontSize:13}}>
                    <input type="checkbox" /> {r}
                  </label>
                ))}
              </div>
            </div>
            <div className="g2" style={{marginBottom:12}}>
              <div className="fr"><label>Nội dung trước khi sửa đổi</label><textarea rows={3} placeholder="Mô tả trạng thái hiện tại..." /></div>
              <div className="fr"><label>Nội dung đề xuất sửa đổi</label><textarea rows={3} placeholder="Mô tả nội dung thay đổi đề xuất..." /></div>
            </div>
            <div className="fr" style={{marginBottom:12}}>
              <label>Lý do sửa đổi</label>
              <textarea rows={2} placeholder="Nêu rõ lý do cần thay đổi..." />
            </div>
            <div className="fg2" style={{marginBottom:14}}>
              <div className="fr"><label>Thời điểm bắt đầu</label><input type="date" /></div>
              <div className="fr"><label>Ghi chú</label><input placeholder="Thông tin bổ sung..." /></div>
            </div>
            <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>KÝ DUYỆT</div>
            <div className="fg3">
              {['Tổng Giám Đốc','Phó Tổng Điều Hành','Chủ Quản KT','QA & SX','Chủ Quản ĐV','Người Lập Biểu'].map(r => (
                <div key={r} className="fr">
                  <label>{r}</label>
                  <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:12,color:'var(--muted)',fontStyle:'italic'}}>Chờ ký...</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📢 Bảng Thông Báo Sửa Đổi (P-RS1 002-07.03 / 002-05.04)</span></div>
            <div className="al al-blue" style={{marginBottom:14}}>
              ℹ️ Sau khi đề xuất được duyệt, bảng thông báo sửa đổi sẽ được phát hành đến tất cả bộ phận liên quan và các bản cũ được thu hồi theo P-RS1 002-03.02.
            </div>
            <div className="tw">
              <table>
                <thead><tr><th>Biểu mẫu</th><th>Mô tả</th><th>Phát cho</th><th>Trạng thái</th></tr></thead>
                <tbody>
                  {[
                    ['P-RS1 002-07.03','Thông báo sửa đổi Quy Trình/CT/QC','Sản Xuất, QA, R&D, Kho','Chưa phát'],
                    ['P-RS1 002-05.04','Bảng Thay Đổi Quy Trình & Phương Thức','Sản Xuất, Kế Hoạch','Chưa phát'],
                    ['P-RS1 002-03.02','Thu hồi bảng cũ – Ký nhận','Tất cả bộ phận','Chưa thực hiện'],
                  ].map(([code,desc,to,status]) => (
                    <tr key={code}>
                      <td className="fw5 tb">{code}</td><td>{desc}</td><td>{to}</td>
                      <td><span className="badge badge-gray">{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'timeline' && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📅 Tiến Độ Sản Xuất – Đơn EM-2026-0614</span></div>
          <div className="sg" style={{gap:0}}>
            {[
              ['✅','Hoàn Thành','14/06','Nhận Email Đơn Hàng','Sunny Foods Japan · 20,000 kg cam 65°Brix','tl-green'],
              ['✅','Hoàn Thành','14/06','Phân Tích & Tổng Hợp Đơn','Xác định khả năng đáp ứng · Kế hoạch NVL','tl-green'],
              ['✅','Hoàn Thành','15/06','R&D Sample Report','Mẫu SR-2026-0614-A1 đạt tất cả chỉ tiêu','tl-green'],
              ['✅','Hoàn Thành','15/06','Gửi Mẫu & COA Khách Hàng','DHL Express đến Sunny Foods Japan','tl-green'],
              ['✅','Hoàn Thành','15/06','Bảng Thông Báo Chế Biến','Phát hành P-RS1 001-01.02 đến 3 bộ phận','tl-green'],
              ['✅','Hoàn Thành','15/06','Quy Cách Nghiệm Thu','Phê duyệt TP/BTP/NL – 3 bảng tiêu chuẩn','tl-green'],
              ['✅','Hoàn Thành','15/06','Họp Phối Hợp & Xác Nhận SP','7 bộ phận đã ký xác nhận','tl-green'],
              ['✅','Hoàn Thành','17/06','Xuất Lệnh Sản Xuất','LS-GV-2026-0614-001 · Chính thức','tl-green'],
              ['🔵','Đang Thực Hiện','25–30/06','Thu Mua Nguyên Liệu','Cam Tây Ninh A & B · ~47 tấn NQ · Bao bì · Enzyme','tl-blue'],
              ['⏳','Chờ','01–05/07','Nhập Kho Nguyên Liệu','Kiểm tra QC nhập kho theo P-RS1 003-03.02','tl-yellow'],
              ['⏳','Chờ','08–26/07','Sản Xuất Chính','Cô đặc · UHT · Rót vô trùng · Lấy mẫu thành phẩm','tl-yellow'],
              ['⏳','Chờ','27/07','QC Thành Phẩm & COA Cuối','Kiểm tra đủ 11 chỉ tiêu · Cấp COA xuất hàng','tl-yellow'],
              ['⏳','Chờ','29/07','Xuất Hàng FOB Tây Ninh','Container 20ft lạnh · Chứng từ JAS · Non-GMO Cert','tl-yellow'],
            ].map(([icon, status, date, title, desc, cls], i) => (
              <div key={i} style={{display:'flex',gap:12,paddingBottom:12,position:'relative'}}>
                {i < 12 && <div style={{position:'absolute',left:15,top:30,bottom:0,width:2,background:'var(--border)'}} />}
                <div className={'tl-dot '+cls} style={{width:30,height:30,fontSize:12,flexShrink:0}}>{icon}</div>
                <div style={{flex:1}}>
                  <div className="fl ic g8">
                    <span style={{fontWeight:500,fontSize:13}}>{title}</span>
                    <span className={'badge ' + (status==='Hoàn Thành'?'badge-green':status==='Đang Thực Hiện'?'badge-blue':'badge-yellow')}>
                      {status}
                    </span>
                  </div>
                  <div style={{fontSize:11.5,color:'var(--muted)',marginTop:2}}><b>{date}/2026</b> · {desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <PDFDrawer url={pdf?.url} title={pdf?.title} onClose={()=>setPdf(null)} />
    </div>
    <FormsPanel forms={FORMS} onOpen={f=>setPdf({url:f.file,title:f.code})} />
  </div>
  )
}