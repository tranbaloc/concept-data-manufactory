import { useState } from 'react'
import PDFDrawer from '../../components/PDFDrawer'
import FormsBanner from '../../components/FormsBanner'
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

const stages = ['Bóc vỏ/Peeling','Nghiền/Crushing','Chà/Milling','Lọc/Pulper','Cô đặc/Conc.','Rót/Filling']

const mockResult = {
  brix:['65.2','65.0','≥65.0','✅'],
  acid:['3.45','3.45','3.2–4.0','✅'],
  ph:['3.72','3.72','3.5–4.2','✅'],
  an:['8.2','—','<10','✅'],
  solid:['66.1','66.0','≥65.5','✅'],
  ratio:['18.9','18.8','16–22','✅'],
  tpc:['<10','—','<100','✅'],
  ym:['<10','—','<50','✅'],
  yield:['—','—','—','42.3%'],
}


const FORMS = [
  {n:1, code:'表P-RS1 003-01 03', label:'SAMPLE REPORT - GIAVICO INTERNATIONAL FOOD COMPANY Ltd.', file:'/forms/P-RS1-003-01.03.pdf'},
]
const T = {
  vi: {
    title: '🧪 Bước 3 – R&D Sample Report',
    subtitle: 'Biểu mẫu P-RS1 003-01.03 – Báo cáo mẫu thử & phân tích chất lượng',
  },
  zh: {
    title: '🧪 步骤3 – R&D样品报告',
    subtitle: '表单 P-RS1 003-01.03 – 样品报告与质量分析',
  },
}

export default function SampleReport() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
  const [pdf, setPdf] = useState(null)
  const [tab, setTab] = useState('report')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true) }, 1600)
  }

  return (
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div className="sg" style={{flex:1}}>
      <div className="ph">
        <div>
          <h1>{tx.title}</h1>
          <p>Biểu mẫu P-RS1 003-01.03 – SAMPLE REPORT · Phân tích mẫu từng công đoạn sản xuất</p>
        </div>
        <div className="fl ic g8">
          <span className="badge badge-blue">GV-OL-V3-JP-001</span>
          <span className="badge badge-yellow">R&D đang thực hiện</span>
        </div>
      </div>

      <StepBar active={3} />

      <div className="tabs">
        {[['report','📋 Sample Report'],['formula','🧬 Công Thức Mẫu'],['flowchart','🔄 Lưu Đồ Công Đoạn'],['send','📦 Gửi Mẫu COA']].map(([id,label]) => (
          <div key={id} className={'tab '+(tab===id?'active':'')} onClick={()=>setTab(id)}>{label}</div>
        ))}
      </div>

      {tab === 'report' && <FormsBanner forms={[{code:'P-RS1 003-01.03',label:'Sample Report',file:'/forms/P-RS1-003-01.03.pdf'}]} onOpen={f=>setPdf({url:f.file,title:f.code})} />}

      {tab === 'report' && (
        <div className="sg">

                    <div className="card">
            <div className="card-title"><span className="card-title-left">📋 SAMPLE REPORT (P-RS1 003-01.03)</span></div>
            <div className="fg4" style={{marginBottom:14}}>
              <div className="fr"><label>Sample Code</label><input defaultValue="SR-2026-0614-A1" /></div>
              <div className="fr"><label>Product Code</label><input defaultValue="GV-OL-V3-JP-001" /></div>
              <div className="fr"><label>Man. Date</label><input defaultValue="15/06/2026" /></div>
              <div className="fr"><label>Storage Condition</label><input defaultValue="-18°C, kín khí" /></div>
            </div>
            <div className="fg4" style={{marginBottom:14}}>
              <div className="fr"><label>Product Name</label><input defaultValue="Nước Cam NFC 65°Brix" /></div>
              <div className="fr"><label>Quantities</label><input defaultValue="5 kg" /></div>
              <div className="fr"><label>Packing</label><input defaultValue="Túi PE vô trùng 5kg" /></div>
              <div className="fr" style={{alignSelf:'end'}}>
                <button className="btn btn-primary" onClick={handleAnalyze} disabled={analyzing||analyzed}>
                  {analyzing ? '⏳ Đang phân tích...' : analyzed ? '✅ Đã xong' : '🤖 AI Phân Tích Mẫu'}
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Kết Quả Phân Tích Từng Công Đoạn</span></div>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>Chỉ Tiêu</th>
                    {stages.map(s => <th key={s}>{s}</th>)}
                    <th>QC Kh.Hàng</th>
                    <th>TC Nội Bộ</th>
                    <th>Kết Quả</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['°Brix','11.2','12.0','13.1','15.8','65.2','65.2'],
                    ['Acid (%)','0.92','0.94','0.96','1.10','3.45','3.45'],
                    ['pH','3.85','3.82','3.80','3.74','3.72','3.72'],
                    ['AN','—','—','—','—','8.2','—'],
                    ['Solid (%)','—','—','—','—','66.1','66.0'],
                    ['TPC(cfu/ml)','—','—','—','—','<10','—'],
                    ['Y&M(cfu/ml)','—','—','—','—','<10','—'],
                    ['Yield (%)','—','—','—','—','—','42.3'],
                  ].map(([item,...vals],i) => (
                    <tr key={i}>
                      <td className="fw5">{item}</td>
                      {vals.map((v,j) => <td key={j} style={{color:v==='—'?'var(--muted)':'inherit'}}>{v}</td>)}
                      <td>{analyzed ? <span className="badge badge-green">✅ Đạt</span> : <span style={{color:'var(--muted)'}}>—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {analyzed && (
            <div className="g2">
              <div className="card">
                <div className="card-title"><span className="card-title-left">✅ Đánh Giá AI</span></div>
                <div className="al al-green mb12">✅ Tất cả 8 chỉ tiêu đều đạt tiêu chuẩn JAS Nhật Bản và nội bộ Giavico.</div>
                <div className="tl">
                  {[
                    ['tl-green','Brix 65.2 đạt','Vượt ngưỡng tối thiểu 0.2°Brix. Năng suất cô đặc ổn định.'],
                    ['tl-green','Vi sinh <10 cfu','Đạt tiêu chuẩn vô trùng thương mại. TPC và Y&M đều tốt.'],
                    ['tl-green','Yield 42.3%','Phù hợp định mức sản xuất. Có thể tối ưu thêm ở khâu Milling.'],
                  ].map(([cls,t,d],i) => (
                    <div key={i} className="tl-item">
                      <div className={'tl-dot '+cls}>✓</div>
                      <div className="tl-body"><div className="tl-title">{t}</div><div className="tl-meta">{d}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-title"><span className="card-title-left">👥 Ký Duyệt R&D</span></div>
                {[['R&D Department Manager','Nguyễn Văn An'],['Research Supervisor','Trần Thị Bảo'],['Reporter','Lê Minh Cường']].map(([r,n]) => (
                  <div key={r} className="fl ic jb" style={{padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                    <span style={{fontSize:12,color:'var(--muted)'}}>{r}</span>
                    <span className="badge badge-green">{n} ✓</span>
                  </div>
                ))}
                <div className="mt12 fl ic g8">
                  <button className="btn btn-primary" onClick={() => navigate('/orders/new-product-notice')}>
                    📄 Tiếp: Thông Báo Chế Biến →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'formula' && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">🧬 Công Thức Mẫu – Batch 50 kg</span></div>
          <div className="tw">
            <table>
              <thead><tr><th>#</th><th>Nguyên liệu / Phụ gia</th><th>°Brix thành phần</th><th>Tỷ lệ (%W)</th><th>Khối lượng (kg)</th><th>Vai trò</th></tr></thead>
              <tbody>
                {[
                  ['1','Cam Valencia tươi (nguyên quả)','11.5','96.30','48.15','Nguyên liệu chính'],
                  ['2','Acid citric (điều chỉnh)','—','0.05','0.025','Điều chỉnh acid'],
                  ['3','Enzyme pectinase 0.1%','—','0.20','0.10','Xử lý dịch quả'],
                  ['4','Nước rửa máy (lưu thông)','—','3.45','1.725','Rửa thiết bị'],
                ].map(([no,...r]) => (
                  <tr key={no}><td className="fw5">{no}</td>{r.map((v,j) => <td key={j}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="al al-blue mt12">ℹ️ Công thức này được đăng ký theo mã Giavico GV-OL-V3-JP-001 và sẽ được lưu vào hệ thống R&D sau khi ký duyệt.</div>
        </div>
      )}

      {tab === 'flowchart' && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">🔄 Lưu Đồ Sản Xuất – Flow Chart</span></div>
          <div className="sg" style={{gap:0}}>
            {[
              ['📦','Tiếp Nhận Nguyên Quả','Kiểm tra ngoại quan, cân, lấy mẫu phân tích Brix/Acid/pH đầu vào'],
              ['🔪','Bóc Vỏ / Peeling','Bóc vỏ cơ học. Kiểm soát vệ sinh thiết bị. Loại bỏ phần hư, mốc.'],
              ['⚙️','Nghiền / Crushing','Tỷ số nghiền 4mm. Kiểm soát nhiệt độ < 15°C để hạn chế oxy hóa.'],
              ['🌀','Chà / Milling','Màng lọc 0.5mm. Thu dịch quả, ghi yield từng lô.'],
              ['🔬','Lọc / Pulper Finisher','Lọc tinh 0.2mm. Loại bỏ hạt và xơ còn lại.'],
              ['💧','Cô Đặc / Concentration','Bốc hơi chân không 4 tầng, t° < 55°C. Mục tiêu 65°Brix.'],
              ['🧊','Thanh Trùng / Pasteurize','UHT 95°C / 15 giây. Làm lạnh nhanh < 5°C.'],
              ['🛢️','Rót / Filling','Rót vô trùng túi PE. Cân, dán nhãn, ghi lô.'],
              ['❄️','Bảo Quản / Storage','Kho lạnh -18°C. Lấy mẫu thành phẩm 24h sau rót.'],
            ].map(([icon,title,desc],i) => (
              <div key={i} style={{display:'flex',gap:12,paddingBottom:12,position:'relative'}}>
                {i < 8 && <div style={{position:'absolute',left:17,top:32,bottom:0,width:2,background:'var(--border)'}} />}
                <div style={{width:34,height:34,borderRadius:'50%',background:'var(--blue-light)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:15}}>{icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500,fontSize:13}}>{i+1}. {title}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{desc}</div>
                </div>
                <span className="badge badge-blue" style={{alignSelf:'center'}}>Bước {i+1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'send' && (
        <div className="g2">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📦 Thông Tin Gửi Mẫu & COA</span></div>
            <div className="sg" style={{gap:10}}>
              {[
                ['1','Sunny Foods Japan – Tanaka Hiroshi','15/06/2026','5 kg – DHL Express','Đang chuẩn bị'],
                ['2','Backup – Giavico QA Lab','15/06/2026','0.5 kg – Nội bộ','Đã giao'],
              ].map(([no,dest,date,qty,cond]) => (
                <div key={no} style={{display:'grid',gridTemplateColumns:'28px 1fr auto',gap:8,alignItems:'center',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                  <div style={{width:24,height:24,borderRadius:'50%',background:'var(--blue-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'var(--blue)',fontWeight:700}}>{no}</div>
                  <div>
                    <div style={{fontWeight:500,fontSize:13}}>{dest}</div>
                    <div style={{fontSize:12,color:'var(--muted)'}}>{date} · {qty}</div>
                  </div>
                  <span className={'badge ' + (cond==='Đã giao'?'badge-green':'badge-yellow')}>{cond}</span>
                </div>
              ))}
            </div>
            <div className="mt12">
              <div className="fr" style={{marginBottom:10}}>
                <label>Người gửi</label>
                <input defaultValue="Lê Minh Cường – R&D" />
              </div>
              <div className="fr">
                <label>Người được ủy quyền</label>
                <input defaultValue="Nguyễn Văn An – Trưởng R&D" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📄 COA – Certificate of Analysis</span></div>
            <div className="tw">
              <table>
                <thead><tr><th>Chỉ tiêu</th><th>Đơn vị</th><th>Tiêu chuẩn KH</th><th>Kết quả</th><th>Đánh giá</th></tr></thead>
                <tbody>
                  {[
                    ['Brix','°Brix','≥65.0','65.2','Đạt'],
                    ['Acid','%','3.2–4.0','3.45','Đạt'],
                    ['pH','—','3.5–4.2','3.72','Đạt'],
                    ['AN','—','<10','8.2','Đạt'],
                    ['Solid','%','≥65.5','66.1','Đạt'],
                    ['TPC','cfu/ml','<100','<10','Đạt'],
                    ['Y&M','cfu/ml','<50','<10','Đạt'],
                    ['Coliform','cfu/ml','Không có','ND','Đạt'],
                  ].map(([a,b,c,d,e]) => (
                    <tr key={a}>
                      <td className="fw5">{a}</td><td className="cm">{b}</td><td>{c}</td><td className="fw5">{d}</td>
                      <td><span className="badge badge-green">{e}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt12 fl ic g8">
              <button className="btn btn-primary">📧 Gửi COA Cho Khách Hàng</button>
              <button className="btn btn-ghost" onClick={()=>setPdf({url:'/forms/P-RS1-003-01.03.pdf',title:'P-RS1 003-01.03'})}>📄 P-RS1 003-01.03</button>
            </div>
          </div>
        </div>
      )}
      <PDFDrawer url={pdf?.url} title={pdf?.title} onClose={()=>setPdf(null)} />
    </div>
    <FormsPanel forms={FORMS} onOpen={f=>setPdf({url:f.file,title:f.code})} />
  </div>
  )
}