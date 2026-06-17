import { useNavigate } from 'react-router-dom'
import { useLang } from '../../i18n/context'

const orders = [
  {
    id:'EM-2026-0614', company:'Sunny Foods Japan', product:'Nước Cam NFC 65 Brix',
    code:'GV-OL-V3-JP-001', qty:'20,000 kg', date:'14/06/2026',
    stage: 7, urgent: true, value:'~USD 36,400',
    history:[
      '14/06 · Nhận email đơn hàng',
      '14/06 · AI phân tích email - trích xuất xong',
      '14/06 · Tổng hợp đơn & phân tích (P-RS1 002-06.01)',
      '15/06 · Sample Report hoàn tất (SR-2026-0614-A1)',
      '15/06 · Gửi mẫu & COA đến khách hàng - DHL',
      '15/06 · Thông báo chế biến phát hành (001-01.02)',
      '15/06 · Quy cách NT đã duyệt (TP/BTP/NL)',
      '15/06 · Họp phối hợp - 7 bộ phận đã XN',
      '17/06 · Lệnh SX xuất chính thức (LS-GV-2026-0614-001)',
    ]
  },
  {
    id:'EM-2026-0613', company:'Tropical Pulp USA', product:'Nước Chanh Leo 10 Brix',
    code:'GV-PS-V3-US-002', qty:'8,000 kg', date:'13/06/2026',
    stage: 4, urgent: false, value:'~USD 11,200',
    history:[
      '13/06 · Nhận email đơn hàng',
      '13/06 · AI phân tích email - trích xuất xong',
      '14/06 · Tổng hợp đơn & phân tích (P-RS1 002-06.01)',
      '14/06 · R&D Sample Report đang thực hiện',
    ]
  },
  {
    id:'EM-2026-0612', company:'VitaDrink GmbH (EU)', product:'Nước Ổi Trắng 15 Brix',
    code:'GV-GW-V3-EU-003', qty:'Mẫu 5 kg', date:'12/06/2026',
    stage: 3, urgent: true, value:'Mẫu thử',
    history:[
      '12/06 · Nhận email yêu cầu mẫu',
      '12/06 · AI phân tích email - trích xuất xong',
      '13/06 · Tổng hợp đơn & phân tích',
      '14/06 · R&D đang chuẩn bị mẫu ổi trắng 5 kg',
    ]
  },
]

const stages = [
  { step:1, label:'Nh\u1eadn Email', icon:'\u{1F4E7}', color:'#0078d4' },
  { step:2, label:'T\u1ed5ng H\u1ee3p \u0110\u01a1n', icon:'\u{1F4CB}', color:'#107c10' },
  { step:3, label:'R&D Sample', icon:'\u{1F9EA}', color:'#ca8a04' },
  { step:4, label:'Th\u00f4ng B\u00e1o CB', icon:'\u{1F4C4}', color:'#8b5cf6' },
  { step:5, label:'Quy C\u00e1ch NT', icon:'\u2705', color:'#0891b2' },
  { step:6, label:'X\u00e1c Nh\u1eadn SP', icon:'\u{1F91D}', color:'#db2777' },
  { step:7, label:'L\u1ec7nh S\u1ea3n Xu\u1ea5t', icon:'\u{1F3ED}', color:'#16a34a' },
]

const stepRoutes = [
  '/orders/inbox','/orders/summary','/orders/sample-report',
  '/orders/new-product-notice','/orders/acceptance-specs',
  '/orders/product-confirm','/orders/production-order'
]

const stageColors = ['#ef4444','#f97316','#eab308','#22c55e','#0891b2','#db2777','#16a34a']

const T = {
  vi: {
    title: '\u{1F504} Quy Trình Đơn Hàng - Pipeline Tổng Quan',
    subtitle: 'Theo dõi toàn bộ đơn hàng từ email khách hàng đến lệnh sản xuất · Dựa theo biểu mẫu P-RS1',
    newEmail: '+ Nhận Email Mới',
    processing: 'đang xử lý',
    passed: 'đã qua',
    empty: 'Trống',
    listTitle: '\u{1F4E6} Danh Sách Đơn Hàng',
    orderListActive: 'đơn đang hoạt động',
    urgent: 'Gấp',
    code: 'Mã',
    progress: 'Tiến độ: Bước',
    of: '/ 7 -',
    latest: 'Gần nhất',
    orderValue: 'Giá trị đơn',
    stepBtn: '-> Bước',
    viewDetail: '\u{1F4CB} Xem Chi Tiết',
    workflowTitle: '\u{1F4D6} Hướng Dẫn Quy Trình - Biểu Mẫu Tương Ứng (17/17)',
    thStep: 'Bước', thName: 'Tên Bước', thForm: 'Biểu Mẫu P-RS1', thDept: 'Bộ Phận Phụ Trách', thAction: 'Thao Tác',
    open: 'Mở ->',
    mainFlow: 'LUỒNG CHÍNH - SẢN PHẨM MỚI (13 biểu mẫu: 1 · 4 · 5 · 6 · 8 · 10 · 11 · 12 · 13 · 14 · 15 · 16 · 17)',
    changeFlow: 'LUỒNG THAY ĐỔI KỸ THUẬT - Engineering Change Control (4 biểu mẫu: 2 · 3 · 7 · 9)',
    coming: 'Sắp có',
    totalForms: 'Tổng: 17/17 biểu mẫu',
    mainForms: 'Luồng chính: 13 biểu mẫu (Mẫu 1, 4, 5, 6, 8, 10, 11, 12, 13, 14, 15, 16, 17)',
    changeForms: 'Luồng thay đổi: 4 biểu mẫu (Mẫu 2, 3, 7, 9) - Engineering Change Control',
  },
  zh: {
    title: '\u{1F504} \u8BA2\u5355\u6D41\u7A0B - \u603B\u89C8 Pipeline',
    subtitle: '\u8DDF\u8E2A\u4ECE\u5BA2\u6237\u90AE\u4EF6\u5230\u751F\u4EA7\u6307\u4EE4\u7684\u5168\u6D41\u7A0B · \u57FA\u4E8E\u8868\u5355 P-RS1',
    newEmail: '+ \u63A5\u6536\u65B0\u90AE\u4EF6',
    processing: '\u5904\u7406\u4E2D',
    passed: '\u5DF2\u901A\u8FC7',
    empty: '\u7A7A',
    listTitle: '\u{1F4E6} \u8BA2\u5355\u5217\u8868',
    orderListActive: '\u4E2A\u6709\u6548\u8BA2\u5355',
    urgent: '\u7D27\u6025',
    code: '\u7F16\u53F7',
    progress: '\u8FDB\u5EA6\uFF1A\u6B65\u9AA4',
    of: '/ 7 -',
    latest: '\u6700\u8FD1',
    orderValue: '\u8BA2\u5355\u91D1\u989D',
    stepBtn: '-> \u6B65\u9AA4',
    viewDetail: '\u{1F4CB} \u67E5\u770B\u8BE6\u60C5',
    workflowTitle: '\u{1F4D6} \u6D41\u7A0B\u6307\u5357 - \u5BF9\u5E94\u8868\u5355 (17/17)',
    thStep: '\u6B65\u9AA4', thName: '\u6B65\u9AA4\u540D\u79F0', thForm: 'P-RS1 \u8868\u5355', thDept: '\u8D23\u4EFB\u90E8\u95E8', thAction: '\u64CD\u4F5C',
    open: '\u6253\u5F00 ->',
    mainFlow: '\u4E3B\u6D41\u7A0B - \u65B0\u4EA7\u54C1 (13\u4E2A\u8868\u5355: 1 · 4 · 5 · 6 · 8 · 10 · 11 · 12 · 13 · 14 · 15 · 16 · 17)',
    changeFlow: '\u5DE5\u7A0B\u53D8\u66F4\u6D41\u7A0B - Engineering Change Control (4\u4E2A\u8868\u5355: 2 · 3 · 7 · 9)',
    coming: '\u5373\u5C06\u4E0A\u7EBF',
    totalForms: '\u603B\u8BA1\uFF1A17/17\u4E2A\u8868\u5355',
    mainForms: '\u4E3B\u6D41\u7A0B\uFF1A13\u4E2A\u8868\u5355',
    changeForms: '\u5DE5\u7A0B\u53D8\u66F4\uFF1A4\u4E2A\u8868\u5355',
  },
}

// Form badge component helper
const Mau = ({n, change}) => (
  <span style={{
    background: change ? '#fef3c7' : '#e8f3ff',
    color: change ? '#92400e' : '#0078d4',
    borderRadius:4, padding:'1px 6px', fontSize:10, fontWeight:700,
    whiteSpace:'nowrap', flexShrink:0
  }}>Mẫu {n}</span>
)

const mainSteps = [
  {step:1, name:'\u{1F4E7} Nh\u1eadn Email \u0110\u01a1n H\u00e0ng', forms:[], dept:'Kinh Doanh', route:'/orders/inbox'},
  {step:2, name:'\u{1F4CB} T\u1ed5ng H\u1ee3p & Ph\u00e2n T\u00edch', forms:[
    {n:4, code:'P-RS1 002-06.01', desc:'B\u1ea3ng \u0110\u1ec1 Xu\u1ea5t Thay \u0110\u1ed5i C\u00f4ng Tr\u00ecnh'},
  ], dept:'Kinh Doanh + K\u1ebf Ho\u1ea1ch', route:'/orders/summary'},
  {step:3, name:'\u{1F9EA} R&D Sample Report', forms:[
    {n:1, code:'P-RS1 003-01.03', desc:'Sample Report'},
  ], dept:'R&D', route:'/orders/sample-report'},
  {step:4, name:'\u{1F4C4} Th\u00f4ng B\u00e1o Ch\u1ebf Bi\u1ebfn', forms:[
    {n:10, code:'P-RS1 001-01.02', desc:'Th\u00f4ng B\u00e1o Ch\u1ebf Bi\u1ebfn S\u1ea3n Ph\u1ea9m M\u1edbi'},
    {n:11, code:'P-RS1 001-03.02', desc:'T\u1edd Quy C\u00e1ch S\u1ea3n Ph\u1ea9m M\u1edbi'},
    {n:15, code:'P-RS1 001-07.02 (ZH)', desc:'Nguy\u00ean T\u1eafc M\u00e3 H\u00f3a S\u1ea3n Ph\u1ea9m (Chinese)'},
    {n:16, code:'P-RS1 001-07.02 (VI)', desc:'Nguy\u00ean T\u1eafc M\u00e3 H\u00f3a S\u1ea3n Ph\u1ea9m (Vietnam)'},
  ], dept:'R&D + K\u1ef9 Thu\u1eadt', route:'/orders/new-product-notice'},
  {step:5, name:'\u2705 Quy C\u00e1ch Nghi\u1ec7m Thu', forms:[
    {n:12, code:'P-RS1 001-02.02', desc:'B\u1ea3ng NT Th\u00e0nh Ph\u1ea9m'},
    {n:13, code:'P-RS1 003-09.03', desc:'B\u1ea3ng NT B\u00e1n Th\u00e0nh Ph\u1ea9m'},
    {n:14, code:'P-RS1 003-03.02', desc:'B\u1ea3ng NT Nguy\u00ean Li\u1ec7u'},
  ], dept:'QA + R&D + K\u1ef9 Thu\u1eadt', route:'/orders/acceptance-specs'},
  {step:6, name:'\u{1F91D} X\u00e1c Nh\u1eadn S\u1ea3n Ph\u1ea9m', forms:[
    {n:17, code:'P-RS1 001-06.03', desc:'Bi\u00ean B\u1ea3n H\u1ecdp Ph\u1ed1i H\u1ee3p - X\u00e1c Nh\u1eadn S\u1ea3n Ph\u1ea9m'},
  ], dept:'T\u1ea5t C\u1ea3 B\u1ed9 Ph\u1eadn', route:'/orders/product-confirm'},
  {step:7, name:'\u{1F3ED} Xu\u1ea5t L\u1ec7nh S\u1ea3n Xu\u1ea5t', forms:[
    {n:8, code:'P-RS1 002-02.02', desc:'Thu H\u1ed3i Th\u00f4ng B\u00e1o Ch\u1ebf Bi\u1ebfn S\u1ea3n Ph\u1ea9m M\u1edbi'},
    {n:6, code:'P-RS1 002-04.01', desc:'Thu H\u1ed3i T\u1edd Quy C\u00e1ch S\u1ea3n Ph\u1ea9m M\u1edbi'},
    {n:5, code:'P-RS1 003-10.01', desc:'Thu H\u1ed3i B\u1ea3ng NT B\u00e1n Th\u00e0nh Ph\u1ea9m'},
  ], dept:'K\u1ebf Ho\u1ea1ch + S\u1ea3n Xu\u1ea5t', route:'/orders/production-order'},
]

const changeSteps = [
  {step:'EC-1', name:'\u{1F4DD} \u0110\u1EC1 Xu\u1EA5t Thay \u0110\u1ED5i', forms:[
    {n:3, code:'P-RS1 002-01.07', desc:'\u0110\u1EC1 Xu\u1EA5t Thay \u0110\u1ED5i Quy Tr\u00ECnh / C\u00F4ng Th\u1EE9c / Quy C\u00E1ch'},
  ], dept:'R&D / K\u1EF9 Thu\u1EADt', route:'/orders/engineering-change', tab:0},
  {step:'EC-2', name:'\u{1F4E2} Th\u00F4ng B\u00E1o Thay \u0110\u1ED5i QT', forms:[
    {n:9, code:'P-RS1 002-07.03', desc:'Th\u00F4ng B\u00E1o Thay \u0110\u1ED5i Quy Tr\u00ECnh, C\u00F4ng Th\u1EE9c, Quy C\u00E1ch'},
  ], dept:'R&D + QA', route:'/orders/engineering-change', tab:1},
  {step:'EC-3', name:'\u2699\uFE0F Th\u00F4ng B\u00E1o Thay \u0110\u1ED5i CT', forms:[
    {n:2, code:'P-RS1 002-05.04', desc:'Th\u00F4ng B\u00E1o Thay \u0110\u1ED5i K\u1EF9 Thu\u1EADt (Engineering Change Notice)'},
  ], dept:'K\u1EF9 Thu\u1EADt + S\u1EA3n Xu\u1EA5t', route:'/orders/engineering-change', tab:2},
  {step:'EC-4', name:'\u267B\uFE0F Thu H\u1ED3i Th\u00F4ng B\u00E1o C\u0169', forms:[
    {n:7, code:'P-RS1 002-03.02', desc:'Thu H\u1ED3i Th\u00F4ng B\u00E1o Thay \u0110\u1ED5i C\u00F4ng Th\u1EE9c H\u1ED7 Tr\u1EE3 S\u1EA3n Ph\u1EA9m'},
  ], dept:'QA + L\u01B0u Tr\u1EEF', route:'/orders/engineering-change', tab:3},
]

export default function OrderPipeline() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()

  return (
    <div className="sg">
      <div className="ph">
        <div>
          <h1>{tx.title}</h1>
          <p>{tx.subtitle}</p>
        </div>
        <div className="fl ic g8">
          <button className="btn btn-primary" onClick={() => navigate('/orders/inbox')}>
            {tx.newEmail}
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
                {count > 0 && <span className="badge badge-yellow">{count} {tx.processing}</span>}
                {passed > 0 && <span style={{fontSize:10,color:'var(--muted)'}}>{passed} {tx.passed}</span>}
                {count === 0 && passed === 0 && <span style={{fontSize:10,color:'var(--muted)'}}>{tx.empty}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Order cards */}
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div style={{padding:'14px 20px',borderBottom:'1px solid var(--border)',fontWeight:600,fontSize:13}}>
          {tx.listTitle} ({orders.length} {tx.orderListActive})
        </div>
        {orders.map(order => (
          <div key={order.id} style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr auto',gap:16,alignItems:'start'}}>
              <div>
                <div className="fl ic g8 mb4">
                  <span style={{fontWeight:700,fontSize:13}}>{order.id}</span>
                  {order.urgent && <span className="badge badge-red">{tx.urgent}</span>}
                </div>
                <div style={{fontWeight:600,fontSize:12.5,marginBottom:2}}>{order.company}</div>
                <div style={{fontSize:12,color:'var(--muted)'}}>{order.product}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>
                  {tx.code}: <b className="tb">{order.code}</b> · {order.qty} · {order.date}
                </div>
              </div>
              <div style={{gridColumn:'2/4'}}>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>
                  {tx.progress} {order.stage}/7 - {stages[order.stage-1].label}
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
                  {tx.latest}: {order.history[order.history.length-1]}
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>{tx.orderValue}</div>
                <div style={{fontWeight:700,fontSize:14,color:'var(--green)'}}>{order.value}</div>
              </div>
              <div className="fl fc g8">
                <button className="btn btn-primary btn-sm"
                  onClick={() => navigate(stepRoutes[order.stage-1])}>
                  {tx.stepBtn} {order.stage}: {stages[order.stage-1].label}
                </button>
                <button className="btn btn-ghost btn-sm">{tx.viewDetail}</button>
              </div>
            </div>
            <div style={{marginTop:12,display:'flex',gap:6,flexWrap:'wrap'}}>
              {order.history.map((h, i) => (
                <div key={i} style={{
                  display:'flex',alignItems:'center',gap:4,fontSize:10.5,
                  color: i < order.stage-1 ? 'var(--green)' : i === order.stage-1 ? 'var(--blue)' : 'var(--muted)',
                  background: i < order.stage-1 ? 'var(--green-lt)' : i === order.stage-1 ? 'var(--blue-light)' : 'var(--bg)',
                  padding:'2px 8px',borderRadius:10,
                  border:'1px solid ' + (i < order.stage-1 ? '#a8e6a8' : i === order.stage-1 ? '#b3d7f7' : 'var(--border)')
                }}>
                  {i < order.stage-1 ? '\u2713' : i === order.stage-1 ? '\u25CF' : '\u25CB'} {h.split('·')[1]?.trim() || h}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Workflow guide - all 17 forms */}
      <div className="card">
        <div className="card-title"><span className="card-title-left">{tx.workflowTitle}</span></div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th style={{width:60}}>{tx.thStep}</th>
                <th>{tx.thName}</th>
                <th>{tx.thForm}</th>
                <th style={{width:160}}>{tx.thDept}</th>
                <th style={{width:80}}>{tx.thAction}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} style={{background:'var(--bg)',padding:'6px 12px',fontSize:11,fontWeight:700,color:'var(--muted)',letterSpacing:.4}}>
                  {'\U0001F195'} {tx.mainFlow}
                </td>
              </tr>
              {mainSteps.map(({step,name,forms,dept,route}) => (
                <tr key={step}>
                  <td style={{fontWeight:700,color:stageColors[step-1],textAlign:'center',fontSize:15}}>{step}</td>
                  <td style={{fontWeight:500,fontSize:12.5}}>{name}</td>
                  <td>
                    {forms.length === 0
                      ? <span style={{color:'var(--muted)',fontSize:11}}>- (AI trích xuất email)</span>
                      : <div style={{display:'flex',flexDirection:'column',gap:5}}>
                          {forms.map(f => (
                            <div key={f.n} style={{display:'flex',alignItems:'center',gap:6,fontSize:11.5}}>
                              <Mau n={f.n} change={false} />
                              <span style={{fontWeight:600,color:'var(--text)',whiteSpace:'nowrap'}}>{f.code}</span>
                              <span style={{color:'var(--muted)'}}>- {f.desc}</span>
                            </div>
                          ))}
                        </div>
                    }
                  </td>
                  <td style={{fontSize:12}}>{dept}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => navigate(route)}>{tx.open}</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} style={{background:'#fff8e6',padding:'6px 12px',fontSize:11,fontWeight:700,color:'#92400e',letterSpacing:.4,borderTop:'2px solid #f59e0b'}}>
                  {'\U0001F504'} {tx.changeFlow}
                </td>
              </tr>
              {changeSteps.map(({step,name,forms,dept,route,tab}) => (
                <tr key={step} style={{background:'#fffbf0'}}>
                  <td style={{fontWeight:700,color:'#d97706',textAlign:'center',fontSize:12}}>{step}</td>
                  <td style={{fontWeight:500,fontSize:12.5}}>{name}</td>
                  <td>
                    <div style={{display:'flex',flexDirection:'column',gap:5}}>
                      {forms.map(f => (
                        <div key={f.n} style={{display:'flex',alignItems:'center',gap:6,fontSize:11.5}}>
                          <Mau n={f.n} change={true} />
                          <span style={{fontWeight:600,color:'var(--text)',whiteSpace:'nowrap'}}>{f.code}</span>
                          <span style={{color:'var(--muted)'}}>- {f.desc}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{fontSize:12}}>{dept}</td>
                  <td><button className="btn btn-outline btn-sm" onClick={() => navigate(route, {state:{tab}})}>{tx.open}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:'10px 16px',borderTop:'1px solid var(--border)',fontSize:11.5,color:'var(--muted)',display:'flex',gap:16,flexWrap:'wrap'}}>
          <span>{'✅'} <b>{tx.mainForms}</b></span>
          <span>{'🔄'} <b>{tx.changeForms}</b></span>
          <span style={{marginLeft:'auto',fontWeight:700,color:'var(--text)'}}>{tx.totalForms}</span>
        </div>
      </div>
    </div>
  )
}
