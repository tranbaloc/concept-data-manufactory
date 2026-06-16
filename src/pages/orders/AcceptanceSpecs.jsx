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
    {code:'P-RS1 001-02.02', label:'NT Thành Phẩm', file:'/forms/P-RS1-001-02.02.pdf'},
    {code:'P-RS1 003-09.03', label:'NT Bán Thành Phẩm', file:'/forms/P-RS1-003-09.03.pdf'},
    {code:'P-RS1 003-03.02', label:'NT Nguyên Liệu', file:'/forms/P-RS1-003-03.02.pdf'},
    {code:'P-RS1 003-10.01', label:'Ký Nhận BTP', file:'/forms/P-RS1-003-10.01.pdf'},
    {code:'P-RS1 002-04.01', label:'Ký Nhận QC SP', file:'/forms/P-RS1-002-04.01.pdf'}
  ]
export default function AcceptanceSpecs() {
  const navigate = useNavigate()
  const [pdf, setPdf] = useState(null)
  const [tab, setTab] = useState('finished')
  const [approved, setApproved] = useState({ finished: false, semi: false, raw: false })

  const handleApprove = (key) => setApproved(p => ({...p, [key]: true}))

  const allDone = approved.finished && approved.semi && approved.raw

  return (
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div className="sg" style={{flex:1}}>
      <div className="ph">
        <div>
          <h1>✅ Bước 5 – Bảng Quy Cách Nghiệm Thu</h1>
          <p>P-RS1 001-02.02 (Thành Phẩm) · P-RS1 003-09.03 (Bán Thành Phẩm) · P-RS1 003-03.02 (Nguyên Liệu)</p>
        </div>
        <div className="fl ic g8">
          {['finished','semi','raw'].map(k => (
            <span key={k} className={'badge ' + (approved[k] ? 'badge-green' : 'badge-yellow')}>
              {k==='finished'?'Thành phẩm':k==='semi'?'Bán thành phẩm':'Nguyên liệu'}: {approved[k]?'✅ Duyệt':'Chờ'}
            </span>
          ))}
        </div>
      </div>

      <StepBar active={5} />

      <div className="tabs">
        {[
          ['finished','🏆 Thành Phẩm (001-02.02)'],
          ['semi','🔬 Bán TP (003-09.03)'],
          ['raw','🌿 Nguyên Liệu (003-03.02)'],
          ['recall','📋 Ký Nhận & Thu Hồi (003-10.01)'],
        ].map(([id,label]) => (
          <div key={id} className={'tab '+(tab===id?'active':'')} onClick={()=>setTab(id)}>{label}</div>
        ))}
      </div>

      {tab === 'finished' && <FormsBanner forms={[{code:'P-RS1 001-02.02',label:'NT Thành Phẩm',file:'/forms/P-RS1-001-02.02.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}
      {tab === 'semi' && <FormsBanner forms={[{code:'P-RS1 003-09.03',label:'NT Bán Thành Phẩm',file:'/forms/P-RS1-003-09.03.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}
      {tab === 'raw' && <FormsBanner forms={[{code:'P-RS1 003-03.02',label:'NT Nguyên Liệu',file:'/forms/P-RS1-003-03.02.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}
      {tab === 'recall' && <FormsBanner forms={[{code:'P-RS1 003-10.01',label:'Ký Nhận BTP',file:'/forms/P-RS1-003-10.01.pdf'},{code:'P-RS1 002-04.01',label:'Ký Nhận QC SP',file:'/forms/P-RS1-002-04.01.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}

      {tab === 'finished' && (
        <div className="card">

                    <div className="card-title">
            <span className="card-title-left">🏆 Bảng Quy Cách Nghiệm Thu Thành Phẩm (P-RS1 001-02.02)</span>
            <span style={{fontSize:11,color:'var(--muted)'}}>Giavico International Food Company Ltd</span>
          </div>
          <div className="fg4" style={{marginBottom:14}}>
            <div className="fr"><label>Mã số / Tên SP</label><input defaultValue="GV-OL-V3-JP-001" /></div>
            <div className="fr"><label>Tên gọi</label><input defaultValue="Cam NFC 65°Brix – Cô Đặc" /></div>
            <div className="fr"><label>Phiên bản</label><input defaultValue="1" /></div>
            <div className="fr"><label>Ngày lập</label><input defaultValue="15/06/2026" /></div>
          </div>

          <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>CHỈ TIÊU KỸ THUẬT</div>
          <div className="tw" style={{marginBottom:14}}>
            <table>
              <thead><tr><th>Chỉ Tiêu</th><th>Quy Cách KH</th><th>Nội Bộ</th><th>Phương Pháp</th><th>Kết Quả Mẫu</th><th>Đánh Giá</th></tr></thead>
              <tbody>
                {[
                  ['Brix (°Brix)','≥65.0','65.0–66.5','Khúc xạ kế','65.2','✅ Đạt'],
                  ['Acid (%)','3.2–4.0','3.2–4.2','Chuẩn độ NaOH','3.45','✅ Đạt'],
                  ['pH','3.5–4.2','3.4–4.3','pH kế điện tử','3.72','✅ Đạt'],
                  ['AN','<10','<10','Formol','8.2','✅ Đạt'],
                  ['Solid (%)','≥65.5','≥65.0','Oven 105°C','66.1','✅ Đạt'],
                  ['Bx/Acid Ratio','16–22','16–22','Tính toán','18.9','✅ Đạt'],
                  ['Ash (%)','<0.5','<0.5','Nung 550°C','0.31','✅ Đạt'],
                  ['TPC (cfu/ml)','<100','<50','Đĩa thạch','<10','✅ Đạt'],
                  ['Y&M (cfu/ml)','<50','<30','Đĩa YGC','<10','✅ Đạt'],
                  ['Coliform','Không có','ND','VRBA agar','ND','✅ Đạt'],
                  ['E.Coli','Không có','ND','EC broth','ND','✅ Đạt'],
                ].map(([a,b,c,d,e,f]) => (
                  <tr key={a}>
                    <td className="fw5">{a}</td><td className="tb">{b}</td><td>{c}</td><td className="cm tsm">{d}</td>
                    <td className="fw5">{e}</td><td><span className="badge badge-green" style={{fontSize:11}}>{f}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fg2" style={{marginBottom:12}}>
            <div className="fr"><label>Trọng lượng / Bao bì</label><input defaultValue="230 kg ± 2% / Túi PE vô trùng 230L" /></div>
            <div className="fr"><label>Điều kiện bảo quản / HSD</label><input defaultValue="-18°C, kín khí / 18 tháng" /></div>
          </div>

          <div className="fg3" style={{marginBottom:14}}>
            {['Chủ Quản Bộ Phận KT','Chủ Quản Đơn Vị','Người Lập Biểu'].map(r => (
              <div key={r} className="fr">
                <label>{r}</label>
                <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:12,
                  color: approved.finished ? 'var(--green)' : 'var(--muted)',fontStyle:'italic'}}>
                  {approved.finished ? '✅ Đã ký duyệt 15/06/2026' : 'Chờ ký...'}
                </div>
              </div>
            ))}
          </div>

          <div className="fl ic g8" style={{marginTop:8}}>
            <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-001-02.02.pdf',title:'P-RS1 001-02.02'})}>📄 P-RS1 001-02.02</button>
          </div>
          {!approved.finished && (
            <button className="btn btn-primary" onClick={() => handleApprove('finished')}>✅ Phê Duyệt Quy Cách Thành Phẩm</button>
          )}
        </div>
      )}

      {tab === 'semi' && (
        <div className="card">

                    <div className="card-title">
            <span className="card-title-left">🔬 Bảng Quy Cách Nghiệm Thu Bán Thành Phẩm (P-RS1 003-09.03)</span>
          </div>
          <div className="fg4" style={{marginBottom:14}}>
            <div className="fr"><label>Tên nguyên liệu BTP</label><input defaultValue="Dịch quả cam sau chà lọc" /></div>
            <div className="fr"><label>Chủng loại</label><input defaultValue="BTP nội địa (Tây Ninh)" /></div>
            <div className="fr"><label>Mã số BTP</label><input defaultValue="BTP-OL-V3-2026" /></div>
            <div className="fr"><label>Phiên bản</label><input defaultValue="1 · 15/06/2026" /></div>
          </div>

          <div className="g2">
            <div>
              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>QUY CÁCH NHẬP XƯỞNG</div>
              <div className="tw">
                <table>
                  <thead><tr><th>Hạng Mục</th><th>Yêu Cầu</th><th>PP Kiểm Nghiệm</th></tr></thead>
                  <tbody>
                    {[['Brix','≥11.0°','Khúc xạ kế'],['Acid','0.8–1.3%','Chuẩn độ'],['pH','3.5–4.2','pH kế'],
                      ['Màu sắc','Vàng tươi, đồng nhất','Quan sát'],['Mùi','Đặc trưng cam tươi','Cảm quan'],
                      ['Tạp chất','Không có hạt, xơ thô','Lọc thử 0.5mm']].map(([a,b,c]) => (
                      <tr key={a}><td className="fw5">{a}</td><td>{b}</td><td className="cm tsm">{c}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>TIÊU CHUẨN KIM LOẠI NẶNG</div>
              <div className="tw" style={{marginBottom:10}}>
                <table>
                  <thead><tr><th>Kim Loại</th><th>Yêu Cầu (mg/kg)</th><th>Ghi Chú</th></tr></thead>
                  <tbody>
                    {[['Pb (Chì)','≤ 2.00',''],['Cu (Đồng)','≤ 30.00',''],['Mn (Mangan)','= 0','Không được có'],
                      ['Zn (Kẽm)','≤ 40.00',''],['As (Asen)','≤ 1.00','']].map(([a,b,c]) => (
                      <tr key={a}><td className="fw5">{a}</td><td>{b}</td><td className="cm tsm">{c||'—'}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="al al-yellow">⚠️ Dư lượng thuốc trừ sâu: Không được có (0 tolerance)</div>
            </div>
          </div>

          <div className="fg4" style={{marginTop:14,marginBottom:14}}>
            {['Phó Tổng Điều Hành','Chủ Quản QA','Chủ Quản KT','Người Lập Biểu'].map(r => (
              <div key={r} className="fr">
                <label>{r}</label>
                <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:12,
                  color: approved.semi ? 'var(--green)' : 'var(--muted)',fontStyle:'italic'}}>
                  {approved.semi ? '✅ Đã ký 15/06/2026' : 'Chờ ký...'}
                </div>
              </div>
            ))}
          </div>
          <div className="fl ic g8" style={{marginTop:8}}>
            <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-003-09.03.pdf',title:'P-RS1 003-09.03'})}>📄 P-RS1 003-09.03</button>
          </div>
          {!approved.semi && (
            <button className="btn btn-primary" onClick={() => handleApprove('semi')}>✅ Phê Duyệt Quy Cách Bán Thành Phẩm</button>
          )}
        </div>
      )}

      {tab === 'raw' && (
        <div className="card">

                    <div className="card-title"><span className="card-title-left">🌿 Bảng Quy Cách Nghiệm Thu Nguyên Liệu (P-RS1 003-03.02)</span></div>
          <div className="fg4" style={{marginBottom:14}}>
            <div className="fr"><label>Tên nguyên liệu</label><input defaultValue="Cam Valencia tươi (Nguyên quả)" /></div>
            <div className="fr"><label>Chủng loại</label><input defaultValue="Cam ngọt – Citrus sinensis" /></div>
            <div className="fr"><label>Mã số NL</label><input defaultValue="NL-OL-TVNX-2026" /></div>
            <div className="fr"><label>Phiên bản</label><input defaultValue="2 · 15/06/2026" /></div>
          </div>

          <div className="g2">
            <div>
              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>QUY CÁCH NHẬP XƯỞNG</div>
              <div className="tw">
                <table>
                  <thead><tr><th>Hạng Mục</th><th>Yêu Cầu</th><th>PP KN</th></tr></thead>
                  <tbody>
                    {[['Brix nguyên quả','≥10.0°','Khúc xạ kế'],['Acid (%)','0.8–1.3','Chuẩn độ'],
                      ['pH','3.5–4.5','pH kế'],['Ngoại quan','Tươi, không bệnh, không dập nát','Quan sát'],
                      ['Màu sắc','Vàng xanh–vàng cam đồng đều','Quan sát'],
                      ['Kích thước','Đường kính 50–80mm','Đo thủ công'],
                      ['Độ chín','≥75% diện tích chuyển màu','Quan sát']].map(([a,b,c]) => (
                      <tr key={a}><td className="fw5">{a}</td><td>{b}</td><td className="cm tsm">{c}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>QUY CÁCH SỬ DỤNG & AN TOÀN</div>
              <div className="tw" style={{marginBottom:10}}>
                <table>
                  <thead><tr><th>Kim Loại</th><th>Giới Hạn</th></tr></thead>
                  <tbody>
                    {[['Pb','≤ 2.00 mg/kg'],['Cu','≤ 30.00 mg/kg'],['Mn','= 0 mg/kg'],['Zn','≤ 40.00 mg/kg'],['As','≤ 1.00 mg/kg']].map(([a,b]) => (
                      <tr key={a}><td className="fw5">{a}</td><td>{b}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="al al-red">🚫 Dư lượng thuốc trừ sâu: Không được có bất kỳ dư lượng nào (Zero tolerance)</div>
              <div className="al al-yellow mt12">⚠️ Yêu cầu chứng nhận Non-GMO từ nhà cung cấp cho thị trường Nhật Bản (JAS).</div>
            </div>
          </div>

          <div className="fg3" style={{marginTop:14,marginBottom:14}}>
            {['Tổng Giám Đốc','Chủ Quản Nguyên Liệu','Người Lập Biểu'].map(r => (
              <div key={r} className="fr">
                <label>{r}</label>
                <div style={{padding:'6px 10px',background:'var(--bg)',borderRadius:5,border:'1px solid var(--border)',fontSize:12,
                  color: approved.raw ? 'var(--green)' : 'var(--muted)',fontStyle:'italic'}}>
                  {approved.raw ? '✅ Đã ký 15/06/2026' : 'Chờ ký...'}
                </div>
              </div>
            ))}
          </div>
          <div className="fl ic g8" style={{marginTop:8}}>
            <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-003-03.02.pdf',title:'P-RS1 003-03.02'})}>📄 P-RS1 003-03.02</button>
          </div>
          {!approved.raw && (
            <button className="btn btn-primary" onClick={() => handleApprove('raw')}>✅ Phê Duyệt Quy Cách Nguyên Liệu</button>
          )}
        </div>
      )}

      {tab === 'recall' && (
        <div className="sg">

                    <div className="card">
            <div className="card-title">
              <span className="card-title-left">📋 Ký Nhận & Thu Hồi Bảng QC BTP (P-RS1 003-10.01)</span>
              <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-003-10.01.pdf',title:'P-RS1 003-10.01'})}>📄 P-RS1 003-10.01</button>
            </div>
            <div className="tw">
              <table>
                <thead><tr><th>STT</th><th>Mã SP</th><th>Tên NL</th><th>Ngày Lập</th><th>Ngày Giao</th><th>Người Nhận</th><th>Ngày TH</th><th>Người Giao</th><th>Ghi Chú</th></tr></thead>
                <tbody>
                  {[['BTP','Dịch quả cam sau chà','15/06','15/06','QA Dept.','—','R&D/KT','Phát hành v1'],
                    ['BTP','Dịch quả cam sau chà','15/06','15/06','Sản Xuất','—','R&D/KT','Tham khảo SX'],
                    ['BTP','Dịch quả cam sau chà','15/06','15/06','Kho Lạnh','—','R&D/KT','Kiểm soát NVL'],
                  ].map(([t,n,a,b,c,d,e,f],i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td className="tb fw5">GV-OL-V3-JP-001</td>
                      <td>{n}</td><td>{a}</td><td>{b}</td><td>{c}</td>
                      <td style={{color:'var(--muted)'}}>{d}</td><td>{e}</td>
                      <td className="cm tsm">{f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <span className="card-title-left">📋 Ký Nhận & Thu Hồi Bảng QC Thành Phẩm (P-RS1 002-04.01)</span>
              <button className='btn btn-ghost' onClick={()=>setPdf({url:'/forms/P-RS1-002-04.01.pdf',title:'P-RS1 002-04.01'})}>📄 P-RS1 002-04.01</button>
            </div>
            <div className="tw">
              <table>
                <thead><tr><th>STT</th><th>Mã SP</th><th>Ngày Lập</th><th>Ngày Giao</th><th>Người Nhận</th><th>Ngày TH</th><th>Người Giao</th><th>Ghi Chú</th></tr></thead>
                <tbody>
                  {[['QA Manager','Nội bộ QC'],['KH Sunny Foods Japan','Xác nhận KH'],['Kế Hoạch SX','Lên lịch SX']].map(([recv,note],i) => (
                    <tr key={i}>
                      <td>{i+1}</td><td className="tb fw5">GV-OL-V3-JP-001</td>
                      <td>15/06</td><td>15/06</td><td>{recv}</td>
                      <td style={{color:'var(--muted)'}}>—</td><td>R&D Team</td>
                      <td className="cm tsm">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {allDone && (
            <div className="sg" style={{gap:8}}>
              <div className="al al-green">✅ Tất cả 3 bảng quy cách đã được phê duyệt. Sẵn sàng chuyển bước Xác Nhận Sản Phẩm.</div>
              <button className="btn btn-primary" onClick={() => navigate('/orders/product-confirm')}>
                🤝 Bước Tiếp: Xác Nhận Sản Phẩm →
              </button>

            </div>
          )}
          {!allDone && (
            <div className="al al-yellow">⚠️ Cần phê duyệt đủ 3 bảng quy cách trước khi chuyển bước tiếp theo.</div>
          )}
        </div>
      )}
      <PDFDrawer url={pdf?.url} title={pdf?.title} onClose={()=>setPdf(null)} />
    </div>
    <FormsPanel forms={FORMS} onOpen={f=>setPdf({url:f.file,title:f.code})} />
  </div>
  )
}