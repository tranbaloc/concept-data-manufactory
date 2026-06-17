import { useState } from 'react'
import PDFDrawer from '../../components/PDFDrawer'
import FormsBanner from '../../components/FormsBanner'
import FormsPanel from '../../components/FormsPanel'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../../i18n/context'

// ── EC Step Bar ─────────────────────────────────────────────────────────────
function ECStepBar({ active, done }) {
  const steps = [
    ['EC-1','📝','Đề Xuất TĐ','#8b5cf6'],
    ['EC-2','📢','TB Thay Đổi QT','#0891b2'],
    ['EC-3','⚙️','ECN','#d97706'],
    ['EC-4','♻️','Thu Hồi TB Cũ','#16a34a'],
  ]
  return (
    <div className="card" style={{padding:'12px 20px'}}>
      <div style={{fontSize:11,color:'var(--muted)',marginBottom:8,fontWeight:600}}>
        🔄 LUỒNG THAY ĐỔI KỸ THUẬT — Engineering Change Control
      </div>
      <div className="fl ic" style={{gap:0,overflowX:'auto'}}>
        {steps.map(([id, icon, label, color], i) => {
          const isDone = done[`ec${i+1}`]
          const isActive = i+1 === active
          return (
            <div key={id} className="fl ic" style={{flexShrink:0}}>
              <div style={{
                padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:500,whiteSpace:'nowrap',
                background: isDone ? '#dcfce7' : isActive ? color : 'var(--bg)',
                color: isDone ? '#16a34a' : isActive ? '#fff' : 'var(--muted)',
                border: isDone ? '1px solid #86efac' : isActive ? 'none' : '1px solid var(--border)',
              }}>
                {isDone ? '✅' : icon} {id}. {label}
              </div>
              {i < steps.length-1 && <span style={{color:'var(--muted)',padding:'0 4px',fontSize:14}}>›</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Signature row component ──────────────────────────────────────────────────
function SigRow({ roles, signed }) {
  return (
    <div className={`fg${Math.min(roles.length, 4)}`} style={{marginTop:14,marginBottom:4}}>
      {roles.map(r => (
        <div key={r} className="fr">
          <label>{r}</label>
          <div style={{
            padding:'6px 10px',background:'var(--bg)',borderRadius:5,
            border:'1px solid var(--border)',fontSize:12,
            color: signed ? 'var(--green)' : 'var(--muted)',fontStyle:'italic'
          }}>
            {signed ? '✅ Đã ký duyệt' : 'Chờ ký...'}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Change table: Trước / Sau with 3 cols ───────────────────────────────────
function ChangeTable({ readOnly = false }) {
  return (
    <div className="tw" style={{marginBottom:14}}>
      <table>
        <thead>
          <tr>
            <th style={{width:120}} colSpan={2}>Hạng Mục Sửa Đổi</th>
            <th>Qui Cách</th>
            <th>Phương Thức / Công Thức</th>
            <th>Quy Trình</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={2} style={{
              fontWeight:700,fontSize:11,textAlign:'center',background:'var(--bg)',
              writingMode:'vertical-rl',textOrientation:'mixed',width:30,padding:'4px 6px'
            }}>
              Nội Dung Sửa Đổi
            </td>
            <td style={{fontWeight:600,fontSize:11.5,background:'#fff8e6',whiteSpace:'nowrap',padding:'4px 8px'}}>
              📄 Trong văn bản tiêu chuẩn
            </td>
            <td><textarea className="input" rows={2} readOnly={readOnly}
              defaultValue={readOnly ? '' : ''} style={{width:'100%',resize:'vertical',fontSize:11.5}} /></td>
            <td><textarea className="input" rows={2} readOnly={readOnly}
              defaultValue={readOnly ? '' : ''} style={{width:'100%',resize:'vertical',fontSize:11.5}} /></td>
            <td><textarea className="input" rows={2} readOnly={readOnly}
              defaultValue={readOnly ? '' : ''} style={{width:'100%',resize:'vertical',fontSize:11.5}} /></td>
          </tr>
          <tr>
            <td style={{fontWeight:600,fontSize:11.5,background:'#eef8ff',whiteSpace:'nowrap',padding:'4px 8px'}}>
              ✏️ Đề xuất sửa đổi
            </td>
            <td><textarea className="input" rows={2} readOnly={readOnly}
              style={{width:'100%',resize:'vertical',fontSize:11.5}} /></td>
            <td><textarea className="input" rows={2} readOnly={readOnly}
              style={{width:'100%',resize:'vertical',fontSize:11.5}} /></td>
            <td><textarea className="input" rows={2} readOnly={readOnly}
              style={{width:'100%',resize:'vertical',fontSize:11.5}} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// ── FORMS sidebar ────────────────────────────────────────────────────────────
const FORMS = [
  {code:'P-RS1 002-01.07', label:'Mẫu 3 – Đề Xuất Thay Đổi', file:'/forms/P-RS1-002-01.07.pdf'},
  {code:'P-RS1 002-07.03', label:'Mẫu 9 – TB Thay Đổi QT', file:'/forms/P-RS1-002-07.03.pdf'},
  {code:'P-RS1 002-05.04', label:'Mẫu 2 – Engineering Change Notice', file:'/forms/P-RS1-002-05.04.pdf'},
  {code:'P-RS1 002-03.02', label:'Mẫu 7 – Thu Hồi TB Cũ', file:'/forms/P-RS1-002-03.02.pdf'},
]

const T = {
  vi: {
    title: '🔄 Thay Đổi Kỹ Thuật – Engineering Change Control',
    subtitle: 'Quản lý đề xuất và thông báo thay đổi quy trình, công thức, quy cách sản phẩm · 4 biểu mẫu: Mẫu 2 · 3 · 7 · 9',
  },
  zh: {
    title: '🔄 工程变更控制 – Engineering Change Control',
    subtitle: '管理产品工艺、配方、规格的变更申请和通知 · 4个表单: 表2 · 3 · 7 · 9',
  },
}

// ── Recall rows initial data ─────────────────────────────────────────────────
const initRecallRows = [
  {id:1, masp:'GV-OL-V3-JP-001', tensp:'Nước Cam NFC 65°Brix', ngayLap:'17/06/2026', ngayGiao:'17/06/2026', nguoiNhan:'R&D / Kỹ Thuật', ngayTH:'', nguoiGiao:'QA Manager', ghiChu:'Phát hành lần 1', recalled:false},
  {id:2, masp:'GV-OL-V3-JP-001', tensp:'Nước Cam NFC 65°Brix', ngayLap:'17/06/2026', ngayGiao:'17/06/2026', nguoiNhan:'Sản Xuất', ngayTH:'', nguoiGiao:'QA Manager', ghiChu:'Phục vụ SX', recalled:false},
  {id:3, masp:'GV-OL-V3-JP-001', tensp:'Nước Cam NFC 65°Brix', ngayLap:'17/06/2026', ngayGiao:'17/06/2026', nguoiNhan:'Kế Hoạch', ngayTH:'', nguoiGiao:'QA Manager', ghiChu:'Lên lịch SX', recalled:false},
  {id:4, masp:'', tensp:'', ngayLap:'', ngayGiao:'', nguoiNhan:'', ngayTH:'', nguoiGiao:'', ghiChu:'', recalled:false},
  {id:5, masp:'', tensp:'', ngayLap:'', ngayGiao:'', nguoiNhan:'', ngayTH:'', nguoiGiao:'', ghiChu:'', recalled:false},
]

// ═══════════════════════════════════════════════════════════════════════════════
export default function EngineeringChange() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
  const location = useLocation()
  const [pdf, setPdf] = useState(null)
  const [tab, setTab] = useState(location.state?.tab ?? 0)
  const [done, setDone] = useState({ ec1: false, ec2: false, ec3: false, ec4: false })
  const [recallRows, setRecallRows] = useState(initRecallRows)
  const [ec3change, setEc3change] = useState({ type: 'normal', factor: '', sample: '' })

  const today = new Date().toLocaleDateString('vi-VN')
  const allDone = done.ec1 && done.ec2 && done.ec3 && done.ec4
  const allRecalled = recallRows.filter(r => r.masp).every(r => r.recalled)

  const markDone = (key) => setDone(p => ({ ...p, [key]: true }))
  const recall = (id) => setRecallRows(rows =>
    rows.map(r => r.id === id ? { ...r, recalled: true, ngayTH: today } : r)
  )

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div className="sg" style={{ flex: 1 }}>

        {/* ── Header ── */}
        <div className="ph">
          <div>
            <h1>{tx.title}</h1>
            <p>{tx.subtitle}</p>
          </div>
          <div className="fl g8">
            <span style={{background:'#fef3c7',color:'#92400e',borderRadius:6,padding:'4px 10px',fontSize:11.5,fontWeight:700}}>
              4 biểu mẫu: Mẫu 2 · 3 · 7 · 9
            </span>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/orders/pipeline')}>
              ← Pipeline
            </button>
          </div>
        </div>

        {/* ── EC StepBar ── */}
        <ECStepBar active={tab + 1} done={done} />

        {/* ── Tabs ── */}
        <div className="tabs">
          {[
            ['📝 Đề Xuất TĐ (Mẫu 3)', 0],
            ['📢 TB Thay Đổi QT (Mẫu 9)', 1],
            ['⚙️ ECN – TB Kỹ Thuật (Mẫu 2)', 2],
            ['♻️ Thu Hồi TB Cũ (Mẫu 7)', 3],
          ].map(([label, i]) => (
            <div key={i} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>
              {label}
              {done[`ec${i+1}`] && <span style={{marginLeft:4,color:'var(--green)'}}>✅</span>}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            TAB 0 — EC-1: Mẫu 3 – P-RS1 002-01.07
            Bảng Đề Xuất Thay Đổi Quy Trình / Công Thức / Quy Cách
        ══════════════════════════════════════════════════════════════════ */}
        {tab === 0 && (
          <div className="sg">
            <FormsBanner
              forms={[{code:'P-RS1 002-01.07', label:'Đề Xuất Thay Đổi', file:'/forms/P-RS1-002-01.07.pdf'}]}
              onOpen={f => setPdf({url:f.file, title:f.code})}
            />

            <div className="card">
              <div className="card-title">
                <span className="card-title-left">📝 Mẫu 3 – P-RS1 002-01.07 &nbsp;·&nbsp; Bảng Đề Xuất Thay Đổi QT / Công Thức / Quy Cách</span>
                <span style={{fontSize:11,color:'var(--muted)'}}>製程、配方、規格提議更改單</span>
              </div>

              <div className="al al-blue" style={{marginBottom:14}}>
                ℹ️ Điền khi R&D hoặc Kỹ Thuật cần đề xuất thay đổi quy trình sản xuất, công thức, hoặc quy cách sản phẩm hiện có.
              </div>

              <div className="fg2" style={{marginBottom:14}}>
                <div className="fr"><label>Số phiếu đề xuất</label>
                  <input defaultValue={`EC-${today.replace(/\//g,'')}-001`} /></div>
                <div className="fr"><label>Ngày lập</label>
                  <input defaultValue={today} /></div>
                <div className="fr"><label>Mã số sản phẩm</label>
                  <input defaultValue="GV-OL-V3-JP-001" /></div>
                <div className="fr"><label>Bộ phận đề xuất</label>
                  <input defaultValue="R&D / Kỹ Thuật" /></div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>
                NỘI DUNG SỬA ĐỔI ĐỀ XUẤT
              </div>
              <ChangeTable />

              <div className="fg2" style={{marginBottom:14}}>
                <div className="fr"><label>Thời điểm bắt đầu thực hiện</label>
                  <input defaultValue="" placeholder="dd/mm/yyyy" /></div>
                <div className="fr"><label>Lý do sửa đổi</label>
                  <textarea className="input" rows={3} defaultValue=""
                    placeholder="Mô tả lý do cần thay đổi..." style={{width:'100%'}} /></div>
                <div className="fr"><label>Ghi chú</label>
                  <textarea className="input" rows={2} defaultValue="" style={{width:'100%'}} /></div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>✍️ KÝ DUYỆT</div>
              <SigRow
                roles={['Tổng Giám Đốc','Phó Tổng Điều Hành','Chủ Quản KT','Chủ Quản QA & SX','Chủ Quản Đơn Vị','Người Lập Biểu']}
                signed={done.ec1}
              />

              <div style={{marginTop:16,display:'flex',gap:8,flexWrap:'wrap'}}>
                <button className="btn btn-ghost btn-sm"
                  onClick={() => setPdf({url:'/forms/P-RS1-002-01.07.pdf', title:'P-RS1 002-01.07'})}>
                  📄 Xem Mẫu 3 PDF
                </button>
                {!done.ec1 ? (
                  <button className="btn btn-primary" onClick={() => { markDone('ec1'); setTab(1) }}>
                    📤 Gửi Đề Xuất Thay Đổi → EC-2
                  </button>
                ) : (
                  <div className="al al-green" style={{flex:1}}>
                    ✅ Đề xuất đã gửi. Chờ phê duyệt để phát hành Mẫu 9.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 1 — EC-2: Mẫu 9 – P-RS1 002-07.03
            Thông Báo Thay Đổi Quy Trình, Công Thức, Quy Cách
        ══════════════════════════════════════════════════════════════════ */}
        {tab === 1 && (
          <div className="sg">
            <FormsBanner
              forms={[{code:'P-RS1 002-07.03', label:'TB Thay Đổi QT', file:'/forms/P-RS1-002-07.03.pdf'}]}
              onOpen={f => setPdf({url:f.file, title:f.code})}
            />

            {!done.ec1 && (
              <div className="al al-yellow">
                ⚠️ Cần hoàn thành EC-1 (Đề Xuất Thay Đổi – Mẫu 3) trước khi phát hành thông báo này.
              </div>
            )}

            <div className="card">
              <div className="card-title">
                <span className="card-title-left">📢 Mẫu 9 – P-RS1 002-07.03 &nbsp;·&nbsp; Thông Báo Thay Đổi Quy Trình, Công Thức, Quy Cách</span>
                <span style={{fontSize:11,color:'var(--muted)'}}>產品製程、配方、規格更改通知單</span>
              </div>

              <div className="al al-blue" style={{marginBottom:14}}>
                ℹ️ Phát hành sau khi đề xuất thay đổi (EC-1) được phê duyệt. Thông báo chính thức đến tất cả bộ phận liên quan.
              </div>

              <div className="fg2" style={{marginBottom:14}}>
                <div className="fr"><label>Mã số sản phẩm</label>
                  <input defaultValue="GV-OL-V3-JP-001" readOnly={!done.ec1} /></div>
                <div className="fr"><label>Phiên bản thông báo</label>
                  <input defaultValue="1" /></div>
                <div className="fr"><label>Ngày phát hành</label>
                  <input defaultValue={today} /></div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>
                NỘI DUNG THAY ĐỔI (SO SÁNH TRƯỚC / SAU)
              </div>
              <ChangeTable readOnly={!done.ec1} />

              <div className="fg2" style={{marginBottom:14}}>
                <div className="fr"><label>Ghi chú / Lưu ý thực hiện</label>
                  <textarea className="input" rows={3} defaultValue=""
                    readOnly={!done.ec1} style={{width:'100%'}} /></div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>PHÁT HÀNH ĐẾN CÁC BỘ PHẬN</div>
              <div className="tw" style={{marginBottom:14}}>
                <table>
                  <thead>
                    <tr><th>Bộ Phận</th><th>Người Nhận</th><th>Ngày Giao</th><th>Xác Nhận</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ['R&D / Kỹ Thuật','Chủ Quản KT'],
                      ['QA / Chất Lượng','Chủ Quản QA'],
                      ['Sản Xuất','Trưởng Sản Xuất'],
                      ['Kế Hoạch','Kế Hoạch SX'],
                    ].map(([dept, person]) => (
                      <tr key={dept}>
                        <td className="fw5">{dept}</td>
                        <td>{person}</td>
                        <td>{done.ec2 ? today : '—'}</td>
                        <td>
                          {done.ec2
                            ? <span className="badge badge-green" style={{fontSize:11}}>✅ Đã nhận</span>
                            : <span className="badge badge-yellow" style={{fontSize:11}}>Chờ</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>✍️ KÝ DUYỆT</div>
              <SigRow
                roles={['Tổng Giám Đốc','Phó Tổng Điều Hành','Chủ Quản Kỹ Thuật','Chủ Quản Đơn Vị','Người Lập Biểu']}
                signed={done.ec2}
              />

              <div style={{marginTop:16,display:'flex',gap:8,flexWrap:'wrap'}}>
                <button className="btn btn-ghost btn-sm"
                  onClick={() => setPdf({url:'/forms/P-RS1-002-07.03.pdf', title:'P-RS1 002-07.03'})}>
                  📄 Xem Mẫu 9 PDF
                </button>
                {done.ec1 && !done.ec2 && (
                  <button className="btn btn-primary" onClick={() => { markDone('ec2'); setTab(2) }}>
                    📤 Phát Hành Thông Báo Thay Đổi → EC-3
                  </button>
                )}
                {done.ec2 && (
                  <div className="al al-green" style={{flex:1}}>
                    ✅ Thông báo đã phát hành đến 4 bộ phận. Tiến hành phát Engineering Change Notice.
                  </div>
                )}
                {!done.ec1 && (
                  <button className="btn btn-outline btn-sm" onClick={() => setTab(0)}>
                    ← Quay lại EC-1
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 2 — EC-3: Mẫu 2 – P-RS1 002-05.04
            Engineering Change Notice (ECN) – Thông Báo Thay Đổi Kỹ Thuật
        ══════════════════════════════════════════════════════════════════ */}
        {tab === 2 && (
          <div className="sg">
            <FormsBanner
              forms={[{code:'P-RS1 002-05.04', label:'Engineering Change Notice', file:'/forms/P-RS1-002-05.04.pdf'}]}
              onOpen={f => setPdf({url:f.file, title:f.code})}
            />

            {!done.ec2 && (
              <div className="al al-yellow">
                ⚠️ Cần hoàn thành EC-2 (Thông Báo Thay Đổi QT – Mẫu 9) trước khi phát ECN này.
              </div>
            )}

            <div className="card">
              <div className="card-title">
                <span className="card-title-left">⚙️ Mẫu 2 – P-RS1 002-05.04 &nbsp;·&nbsp; Engineering Change Notice (ECN)</span>
                <span style={{fontSize:11,color:'var(--muted)'}}>工程變更通知單</span>
              </div>

              <div className="al al-blue" style={{marginBottom:14}}>
                ℹ️ Thông báo cụ thể về thay đổi kỹ thuật, bao gồm mô tả thay đổi, lý do, và hiệu lực áp dụng.
              </div>

              <div className="fg2" style={{marginBottom:14}}>
                <div className="fr"><label>Tên sản phẩm</label>
                  <input defaultValue="Nước Cam Cô Đặc NFC 65°Brix" /></div>
                <div className="fr"><label>Ngày phát hành ECN</label>
                  <input defaultValue={today} /></div>
                <div className="fr"><label>Dự tính ngày thực hiện</label>
                  <input defaultValue="" placeholder="dd/mm/yyyy" /></div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>MÔ TẢ THAY ĐỔI</div>
              <div className="fg2" style={{marginBottom:14}}>
                <div className="fr"><label>Hạng mục sửa đổi</label>
                  <input defaultValue="" placeholder="VD: Qui cách Brix, Công thức phụ gia..." /></div>
                <div className="fr"><label>Trước sửa đổi</label>
                  <textarea className="input" rows={3} defaultValue="" style={{width:'100%'}} /></div>
                <div className="fr"><label>Sau sửa đổi</label>
                  <textarea className="input" rows={3} defaultValue="" style={{width:'100%'}} /></div>
                <div className="fr"><label>Qui trình thực hiện</label>
                  <textarea className="input" rows={3} defaultValue="" style={{width:'100%'}} /></div>
                <div className="fr"><label>Ghi chú</label>
                  <textarea className="input" rows={2} defaultValue="" style={{width:'100%'}} /></div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>PHÂN LOẠI THAY ĐỔI</div>
              <div className="g2" style={{marginBottom:14}}>
                <div className="card" style={{padding:'12px 16px'}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:8,color:'var(--muted)'}}>Cách thay đổi / 變更方式</div>
                  <div className="fl ic g8" style={{flexWrap:'wrap'}}>
                    {['☑ Bình thường (正常)','□ Giai đoạn (階段)','□ Tạm thời (臨時)'].map(v => (
                      <label key={v} style={{fontSize:12,display:'flex',alignItems:'center',gap:4,cursor:'pointer'}}>
                        <input type="radio" name="changetype" defaultChecked={v.startsWith('☑')} /> {v.replace('☑ ','').replace('□ ','')}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="card" style={{padding:'12px 16px'}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:8,color:'var(--muted)'}}>Thay đổi các yếu tố / 更改因素</div>
                  {[
                    'A: An toàn (安全性)',
                    'B: Nguyên liệu (原料)',
                    'C: Phụ liệu (輔料)',
                    'D: Khách hàng yêu cầu (客戶需求)',
                    'E: Xử lý hàng tồn (消化庫存)',
                    'F: Sửa đổi qui cách / qui trình (規格、製程更改)',
                    'G: Khác (其他)',
                  ].map(v => (
                    <label key={v} style={{fontSize:11.5,display:'flex',alignItems:'center',gap:6,marginBottom:4,cursor:'pointer'}}>
                      <input type="checkbox" /> {v}
                    </label>
                  ))}
                </div>
                <div className="card" style={{padding:'12px 16px'}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:8,color:'var(--muted)'}}>Giới hạn mẫu / 限度樣品</div>
                  {['Bán thành phẩm (半成品)','Trước sát khuẩn (殺菌前)','Thành phẩm (成品)'].map(v => (
                    <label key={v} style={{fontSize:11.5,display:'flex',alignItems:'center',gap:6,marginBottom:4,cursor:'pointer'}}>
                      <input type="checkbox" /> {v}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>✍️ KÝ DUYỆT</div>
              <SigRow
                roles={['Tổng Giám Đốc','Phó Tổng Điều Hành','Chủ Quản Kỹ Thuật','Chủ Quản Đơn Vị','Người Lập Biểu']}
                signed={done.ec3}
              />

              <div style={{marginTop:16,display:'flex',gap:8,flexWrap:'wrap'}}>
                <button className="btn btn-ghost btn-sm"
                  onClick={() => setPdf({url:'/forms/P-RS1-002-05.04.pdf', title:'P-RS1 002-05.04'})}>
                  📄 Xem Mẫu 2 PDF
                </button>
                {done.ec2 && !done.ec3 && (
                  <button className="btn btn-primary" onClick={() => { markDone('ec3'); setTab(3) }}>
                    📤 Phát Hành ECN → Thu Hồi TB Cũ (EC-4)
                  </button>
                )}
                {done.ec3 && (
                  <div className="al al-green" style={{flex:1}}>
                    ✅ ECN đã phát hành. Cần thu hồi thông báo cũ theo Mẫu 7.
                  </div>
                )}
                {!done.ec2 && (
                  <button className="btn btn-outline btn-sm" onClick={() => setTab(1)}>
                    ← Quay lại EC-2
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 3 — EC-4: Mẫu 7 – P-RS1 002-03.02
            Thu Hồi Thông Báo Thay Đổi Công Thức / Hỗ Trợ Sản Phẩm
        ══════════════════════════════════════════════════════════════════ */}
        {tab === 3 && (
          <div className="sg">
            <FormsBanner
              forms={[{code:'P-RS1 002-03.02', label:'Thu Hồi TB Cũ', file:'/forms/P-RS1-002-03.02.pdf'}]}
              onOpen={f => setPdf({url:f.file, title:f.code})}
            />

            {!done.ec3 && (
              <div className="al al-yellow">
                ⚠️ Cần hoàn thành EC-3 (ECN – Mẫu 2) trước khi thu hồi thông báo cũ.
              </div>
            )}

            <div className="card">
              <div className="card-title">
                <span className="card-title-left">♻️ Mẫu 7 – P-RS1 002-03.02 &nbsp;·&nbsp; Thu Hồi Thông Báo Thay Đổi Công Thức Hỗ Trợ Sản Phẩm</span>
                <span style={{fontSize:11,color:'var(--muted)'}}>產品製程，配方，規格更改通知單回收簽收單</span>
              </div>

              <div className="al al-blue" style={{marginBottom:14}}>
                ℹ️ Ký nhận và thu hồi các thông báo thay đổi công thức cũ, đảm bảo phiên bản mới được áp dụng đồng bộ.
                Sau khi thu hồi, thông báo mới (Mẫu 9) sẽ có hiệu lực chính thức.
              </div>

              <div className="tw" style={{marginBottom:14}}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width:32}}>STT</th>
                      <th>Mã SP</th>
                      <th>Tên Sản Phẩm</th>
                      <th>Ngày Lập</th>
                      <th>Ngày Giao</th>
                      <th>Người Nhận</th>
                      <th>Ngày Thu Hồi</th>
                      <th>Người Giao</th>
                      <th>Ghi Chú</th>
                      <th style={{width:90}}>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recallRows.map(r => (
                      <tr key={r.id} style={{background: r.recalled ? '#f0fdf4' : r.masp ? '#fffbf0' : undefined}}>
                        <td style={{textAlign:'center'}}>{r.id}</td>
                        <td className="tb fw5">{r.masp}</td>
                        <td style={{fontSize:11.5}}>{r.tensp}</td>
                        <td style={{fontSize:11.5}}>{r.ngayLap}</td>
                        <td style={{fontSize:11.5}}>{r.ngayGiao}</td>
                        <td style={{fontSize:11.5}}>{r.nguoiNhan}</td>
                        <td style={{fontSize:11.5,color: r.recalled ? 'var(--green)' : 'var(--muted)'}}>
                          {r.recalled ? r.ngayTH : '—'}
                        </td>
                        <td style={{fontSize:11.5}}>{r.nguoiGiao}</td>
                        <td style={{fontSize:11}}>{r.ghiChu}</td>
                        <td>
                          {r.masp && !r.recalled && done.ec3 && (
                            <button className="btn btn-outline btn-sm" onClick={() => recall(r.id)}
                              style={{fontSize:11,padding:'2px 8px'}}>
                              ♻️ Thu Hồi
                            </button>
                          )}
                          {r.recalled && (
                            <span className="badge badge-green" style={{fontSize:10}}>✅ Đã TH</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {done.ec3 && !allRecalled && (
                <div className="al al-yellow">
                  ⚠️ Cần thu hồi tất cả {recallRows.filter(r => r.masp && !r.recalled).length} thông báo còn lại trước khi hoàn tất.
                </div>
              )}

              {allRecalled && !done.ec4 && (
                <div className="sg" style={{gap:8}}>
                  <div style={{fontWeight:600,fontSize:12.5,marginBottom:10,color:'var(--muted)'}}>✍️ KÝ DUYỆT HOÀN TẤT THU HỒI</div>
                  <SigRow
                    roles={['Chủ Quản QA','Bộ Phận Lưu Trữ','Người Lập Biểu']}
                    signed={false}
                  />
                  <div className="fl g8" style={{marginTop:8,flexWrap:'wrap'}}>
                    <button className="btn btn-ghost btn-sm"
                      onClick={() => setPdf({url:'/forms/P-RS1-002-03.02.pdf', title:'P-RS1 002-03.02'})}>
                      📄 Xem Mẫu 7 PDF
                    </button>
                    <button className="btn btn-primary" onClick={() => markDone('ec4')}>
                      ✅ Xác Nhận Hoàn Tất Thu Hồi
                    </button>
                  </div>
                </div>
              )}

              {done.ec4 && (
                <div className="sg" style={{gap:8}}>
                  <div className="al al-green">
                    ✅ Đã thu hồi toàn bộ thông báo cũ. Thông báo thay đổi mới (Mẫu 9) có hiệu lực chính thức.
                  </div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    <button className="btn btn-ghost btn-sm"
                      onClick={() => setPdf({url:'/forms/P-RS1-002-03.02.pdf', title:'P-RS1 002-03.02'})}>
                      📄 Xem Mẫu 7 PDF
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/orders/pipeline')}>
                      🔄 Về Pipeline Đơn Hàng
                    </button>
                  </div>
                </div>
              )}

              {!done.ec3 && (
                <button className="btn btn-outline btn-sm" onClick={() => setTab(2)}>
                  ← Quay lại EC-3
                </button>
              )}
            </div>

            {/* Summary when all done */}
            {allDone && (
              <div className="card" style={{border:'2px solid var(--green)',background:'#f0fdf4'}}>
                <div className="card-title">
                  <span className="card-title-left">🎉 Hoàn Tất Luồng Engineering Change Control</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:14}}>
                  {[
                    ['Mẫu 3','Đề Xuất','P-RS1 002-01.07','#8b5cf6'],
                    ['Mẫu 9','TB Thay Đổi','P-RS1 002-07.03','#0891b2'],
                    ['Mẫu 2','ECN','P-RS1 002-05.04','#d97706'],
                    ['Mẫu 7','Thu Hồi','P-RS1 002-03.02','#16a34a'],
                  ].map(([mau,name,code,color]) => (
                    <div key={mau} style={{
                      background:'#fff',borderRadius:8,padding:'10px 12px',
                      border:`2px solid ${color}`,textAlign:'center'
                    }}>
                      <div style={{fontSize:18,marginBottom:4}}>✅</div>
                      <div style={{fontSize:12,fontWeight:700,color}}>{mau}</div>
                      <div style={{fontSize:11,color:'var(--muted)'}}>{name}</div>
                      <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{code}</div>
                    </div>
                  ))}
                </div>
                <div className="fl g8">
                  <button className="btn btn-primary" onClick={() => navigate('/orders/pipeline')}>
                    🔄 Trở Về Pipeline Đơn Hàng
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <PDFDrawer url={pdf?.url} title={pdf?.title} onClose={() => setPdf(null)} />
      </div>

      <FormsPanel forms={FORMS} onOpen={f => setPdf({url:f.file, title:f.code})} />
    </div>
  )
}
