import { useState } from 'react'
import { useLang } from '../../i18n/context'

const boms = [
  {
    code:'BOM-NC-CAM-330-VN-v4',
    product:'NC Cam 330ml',
    market:'VN',region:'HCM',customer:'General',version:'v4',
    date:'15/03/2026',status:'Hiện hành',
    lines:[
      {seq:'01',code:'RM-NFC-CAM-65',name:'NFC Cam 65°Brix',unit:'kg',qty:258.9,loss:0.5,supplier:'FruitCo'},
      {seq:'02',code:'RM-WATER',name:'Nước tinh khiết RO',unit:'kg',qty:624.0,loss:0,supplier:'Internal'},
      {seq:'03',code:'RM-SUCROSE',name:'Sucrose tinh luyện',unit:'kg',qty:112.0,loss:0.2,supplier:'BienHoa'},
      {seq:'04',code:'RM-ACID-CIT',name:'Acid citric khan',unit:'kg',qty:2.8,loss:0.1,supplier:'TTCA'},
      {seq:'05',code:'RM-NA-BENZ',name:'Natri benzoate',unit:'g',qty:500,loss:0,supplier:'Brenntag'},
      {seq:'06',code:'RM-FLAVOR-C',name:'Hương cam tự nhiên',unit:'g',qty:1500,loss:0,supplier:'IFF'},
      {seq:'07',code:'RM-VITC',name:'Vitamin C (Acid ascorbic)',unit:'g',qty:200,loss:0,supplier:'DSM'},
      {seq:'08',code:'RM-COLOR-B',name:'Màu β-caroten',unit:'g',qty:100,loss:0,supplier:'CHR Hansen'},
      {seq:'09',code:'PM-PET-330',name:'Chai PET 330ml',unit:'cái',qty:3030,loss:0.3,supplier:'TienHung'},
      {seq:'10',code:'PM-NAP-T',name:'Nắp nhựa trắng 28mm',unit:'cái',qty:3030,loss:0.3,supplier:'TienHung'},
      {seq:'11',code:'PM-NHAN-CAM',name:'Nhãn NC Cam 330ml',unit:'cái',qty:3030,loss:0.5,supplier:'InXanh'},
      {seq:'12',code:'PM-THUNG-12',name:'Thùng carton 12 chai',unit:'cái',qty:253,loss:0.2,supplier:'GiayVN'},
    ]
  },
  {
    code:'BOM-NC-CAM-330-VN-v3',
    product:'NC Cam 330ml',
    market:'VN',region:'HCM',customer:'General',version:'v3',
    date:'01/09/2025',status:'Lưu trữ',lines:[]
  },
  {
    code:'BOM-NC-CAM-330-US-v2',
    product:'NC Cam 330ml',
    market:'US (FDA)',region:'Export',customer:'WholeFoods',version:'v2',
    date:'05/05/2025',status:'Hiện hành',lines:[]
  },
  {
    code:'BOM-NC-CH-500-VN-v2',
    product:'NC Chanh 500ml',
    market:'VN',region:'HCM',customer:'General',version:'v2',
    date:'10/01/2026',status:'Hiện hành',lines:[]
  },
  {
    code:'BOM-OI-EP-1L-VN-v1',
    product:'Ổi Ép 1L',
    market:'VN',region:'HN',customer:'General',version:'v1',
    date:'20/02/2026',status:'Hiện hành',lines:[]
  },
]

const history = [
  {date:'15/03/2026',bom:'BOM-NC-CAM-330-VN-v4',user:'Nguyễn Kỹ Thuật',type:'Tạo mới',desc:'Cập nhật tỷ lệ acid citric từ 0.30% xuống 0.28% để cải thiện ổn định màu. Thêm Vitamin C 0.02%.'},
  {date:'01/09/2025',bom:'BOM-NC-CAM-330-VN-v3',user:'Trần R&D',type:'Chỉnh sửa',desc:'Thay thế hương cam tổng hợp → hương cam tự nhiên. Tăng NFC từ 24% lên 25.89%.'},
  {date:'12/05/2025',bom:'BOM-NC-CAM-330-VN-v2',user:'Lê Quản Lý',type:'Phê duyệt',desc:'Phê duyệt v2 sau kiểm thử cảm quan 3 đợt. Tỷ lệ đạt 92% người thử nghiệm.'},
  {date:'03/01/2025',bom:'BOM-NC-CAM-330-VN-v1',user:'Hệ thống',type:'Khởi tạo',desc:'Nhập BOM gốc từ tài liệu giấy vào hệ thống. Version đầu tiên được số hóa.'},
]

const T = {
  vi: {
    title: '📑 Quản Lý & Phân Tích BOM',
    subtitle: 'Single Source of Truth cho công thức – Tra cứu, so sánh phiên bản BOM, lịch sử thay đổi và AI hỗ trợ',
    tabs: ['📋 Chi tiết BOM', '📜 Lịch sử thay đổi', '📊 So sánh phiên bản', '🤖 AI hỗ trợ'],
    kpi: ['Tổng số BOM đang quản lý','BOM đang hiện hành','Thay đổi tháng này','Thành phần theo dõi'],
    kpiSub: ['5 sản phẩm · 4 thị trường','6 đã lưu trữ','Chờ phê duyệt: 1','Nguyên liệu + Bao bì'],
    innerTabs: ['Thành phần BOM','Lịch sử thay đổi','AI Tra cứu','So sánh phiên bản'],
    lProduct: 'Sản phẩm',
    lMarket: 'Thị trường',
    lRegion: 'Khu vực SX',
    lVersion: 'Phiên bản',
    lDate: 'Ngày tạo',
    lCustomer: 'Khách hàng',
    lStatus: 'Trạng thái',
    lLines: 'Số dòng BOM',
  },
  zh: {
    title: '📑 BOM管理与分析',
    subtitle: '配方的唯一数据源 – 查询、比较BOM版本、变更历史和AI支持',
    tabs: ['📋 BOM详情', '📜 变更历史', '📊 版本对比', '🤖 AI支持'],
    kpi: ['管理中的BOM总数','现行BOM','本月变更','跟踪成分数'],
    kpiSub: ['5个产品 · 4个市场','6个已归档','待审批: 1','原料+包装'],
    innerTabs: ['BOM成分','变更历史','AI查询','版本对比'],
    lProduct: '产品',
    lMarket: '市场',
    lRegion: '生产区域',
    lVersion: '版本',
    lDate: '创建日期',
    lCustomer: '客户',
    lStatus: '状态',
    lLines: 'BOM行数',
  },
}

export default function BOMAnalysis() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [selected, setSelected] = useState(boms[0])
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatLog, setChatLog] = useState([
    {role:'ai',text:'Xin chào! Tôi có thể giúp bạn tra cứu BOM, so sánh phiên bản, hoặc giải thích lý do thay đổi thành phần. Hỏi tôi bất kỳ điều gì về BOM.'},
  ])

  const filteredBoms = boms.filter(b =>
    b.code.toLowerCase().includes(search.toLowerCase()) ||
    b.product.toLowerCase().includes(search.toLowerCase()) ||
    b.market.toLowerCase().includes(search.toLowerCase())
  )

  const sendChat = () => {
    if (!chatInput.trim()) return
    const q = chatInput
    setChatLog(prev => [...prev, {role:'user', text: q}])
    setChatInput('')
    setTimeout(() => {
      let answer = ''
      if (q.toLowerCase().includes('acid') || q.toLowerCase().includes('chua'))
        answer = 'Acid citric được giảm từ 0.30% (v3) xuống 0.28% (v4) từ ngày 15/03/2026. Lý do: tại 0.30% quan sát thấy hiện tượng nhạt màu sau 3 tháng bảo quản ở nhiệt độ 30°C. Mức 0.28% vẫn đạt pH mục tiêu 3.8 và cải thiện ổn định màu 15%.';
      else if (q.toLowerCase().includes('vitamin') || q.toLowerCase().includes('vitc'))
        answer = 'Vitamin C (Acid ascorbic) được thêm vào v4 với hàm lượng 0.02% (200g/tấn). Mục đích: chống oxy hóa tự nhiên và hỗ trợ duy trì màu sắc NFC trong quá trình bảo quản. Không ảnh hưởng đến pH.';
      else if (q.toLowerCase().includes('so sánh') || q.toLowerCase().includes('khác'))
        answer = 'So sánh v3 và v4 của BOM-NC-CAM-330-VN:\n• Acid citric: 0.30% → 0.28% (↓)\n• Hương cam: tổng hợp → tự nhiên (cải thiện)\n• Vitamin C: không có → 0.02% (thêm mới)\n• NFC: 24% → 25.89% (↑)\nTổng 4 thay đổi, không ảnh hưởng cấu trúc BOM chính.';
      else if (q.toLowerCase().includes('nfc') || q.toLowerCase().includes('cam'))
        answer = 'NFC Cam 65°Brix là nguyên liệu chính chiếm 25.89% w/w. Nhà cung cấp: FruitCo. Tỷ lệ hao hụt: 0.5%. Trên mỗi mẻ 1000kg thành phẩm cần 258.9kg NFC ± 1.3kg dung sai.';
      else
        answer = `Tôi tìm thấy BOM liên quan: "${selected.code}" (${selected.version}, ${selected.date}). BOM này có ${selected.lines.length} dòng thành phần, thị trường ${selected.market}. Bạn muốn biết thêm về thành phần cụ thể nào?`;
      setChatLog(prev => [...prev, {role:'ai', text: answer}])
    }, 700)
  }

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div>
        <div className="fl g8">
          <button className="btn btn-primary btn-sm">+ Tạo BOM mới</button>
          <button className="btn btn-outline btn-sm">📥 Import Excel</button>
        </div>
      </div>

      <div className="sg4">
        {[
          {label:tx.kpi[0],val:'24',sub:tx.kpiSub[0],color:'#0078d4'},
          {label:tx.kpi[1],val:'18',sub:tx.kpiSub[1],color:'#107c10'},
          {label:tx.kpi[2],val:'3',sub:tx.kpiSub[2],color:'#d97706'},
          {label:tx.kpi[3],val:'48',sub:tx.kpiSub[3],color:'#00897b'},
        ].map((s,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="g2" style={{gridTemplateColumns:'280px 1fr'}}>
        {/* BOM list panel */}
        <div className="card" style={{padding:'14px'}}>
          <div className="fw6 mb8" style={{fontSize:13}}>📋 Danh sách BOM</div>
          <div className="fr mb8"><input placeholder="🔍 Tìm BOM..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div className="sg" style={{gap:4}}>
            {filteredBoms.map((b,i)=>(
              <div
                key={i}
                onClick={()=>setSelected(b)}
                style={{
                  padding:'9px 11px',borderRadius:6,cursor:'pointer',border:'1px solid var(--border)',
                  background:selected.code===b.code?'var(--blue-xlight)':'#fff',
                  borderColor:selected.code===b.code?'var(--blue)':'var(--border)',
                }}
              >
                <div className="fl ic jb">
                  <span style={{fontSize:11,fontWeight:600,color:'var(--blue)'}}>{b.code}</span>
                  <span className={`badge ${b.status==='Hiện hành'?'badge-green':'badge-gray'}`} style={{fontSize:10}}>{b.status}</span>
                </div>
                <div style={{fontSize:12,fontWeight:500,marginTop:2}}>{b.product}</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>{b.market} · {b.version} · {b.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOM detail */}
        <div className="sg" style={{gap:14}}>
          <div className="card">
            <div className="card-title">
              <span className="card-title-left">
                <span style={{fontSize:16}}>📄</span>
                <span>{selected.code}</span>
                <span className={`badge ${selected.status==='Hiện hành'?'badge-green':'badge-gray'}`}>{selected.status}</span>
              </span>
              <div className="fl g8">
                <button className="btn btn-outline btn-sm">✏️ Chỉnh sửa</button>
                <button className="btn btn-ghost btn-sm">📋 Nhân bản</button>
                <button className="btn btn-ghost btn-sm">📥 Xuất PDF</button>
              </div>
            </div>
            <div className="fg4 mb12" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
              {[
                {label:tx.lProduct,val:selected.product},
                {label:tx.lMarket,val:selected.market},
                {label:tx.lRegion,val:selected.region},
                {label:tx.lVersion,val:selected.version},
                {label:tx.lDate,val:selected.date},
                {label:tx.lCustomer,val:selected.customer},
                {label:tx.lStatus,val:selected.status},
                {label:tx.lLines,val:selected.lines.length||'—'},
              ].map((f,i)=>(
                <div key={i} style={{background:'var(--bg)',padding:'8px 10px',borderRadius:6}}>
                  <div style={{fontSize:10.5,color:'var(--muted)',fontWeight:500}}>{f.label}</div>
                  <div style={{fontSize:13,fontWeight:600,marginTop:2}}>{f.val}</div>
                </div>
              ))}
            </div>

            <div className="tabs" style={{marginBottom:14}}>
              {tx.innerTabs.map((t,i)=>(
                <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
              ))}
            </div>

            {tab===0 && (
              selected.lines.length > 0 ? (
                <div>
                  <div className="tw">
                    <table>
                      <thead>
                        <tr><th>#</th><th>Mã NVL</th><th>Tên thành phần</th><th>ĐVT</th><th>Số lượng/tấn TP</th><th>Hao hụt (%)</th><th>Nhà cung cấp</th><th>Phân loại</th></tr>
                      </thead>
                      <tbody>
                        {selected.lines.map((l,i)=>(
                          <tr key={i}>
                            <td className="cm">{l.seq}</td>
                            <td className="fw5 tb tsm">{l.code}</td>
                            <td>{l.name}</td>
                            <td>{l.unit}</td>
                            <td className="fw6">{l.qty.toLocaleString()}</td>
                            <td className={l.loss>0?'':'cm'}>{l.loss>0?`${l.loss}%`:'—'}</td>
                            <td className="cm">{l.supplier}</td>
                            <td>
                              <span className={`badge ${l.code.startsWith('RM')?'badge-blue':l.code.startsWith('PM')?'badge-yellow':'badge-gray'}`}>
                                {l.code.startsWith('RM')?'Nguyên liệu':l.code.startsWith('PM')?'Bao bì':'Khác'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="fl g8 mt12">
                    <div className="al al-blue f1" style={{fontSize:12}}>
                      📊 Tóm tắt: <strong>8 nguyên liệu</strong> (chiếm ~100% khối lượng sản phẩm) · <strong>4 loại bao bì</strong> · Tổng {selected.lines.filter(l=>l.code.startsWith('RM')).length} RM + {selected.lines.filter(l=>l.code.startsWith('PM')).length} PM
                    </div>
                  </div>
                </div>
              ) : (
                <div className="al al-blue">ℹ️ Chọn <strong>BOM-NC-CAM-330-VN-v4</strong> để xem chi tiết đầy đủ với 12 dòng thành phần.</div>
              )
            )}

            {tab===1 && (
              <div className="tl">
                {history.map((h,i)=>(
                  <div className="tl-item" key={i}>
                    <div className={`tl-dot ${h.type==='Tạo mới'?'tl-blue':h.type==='Phê duyệt'?'tl-green':h.type==='Chỉnh sửa'?'tl-yellow':'tl-blue'}`} style={{fontSize:10}}>
                      {h.type==='Tạo mới'?'✚':h.type==='Phê duyệt'?'✓':h.type==='Chỉnh sửa'?'✎':'●'}
                    </div>
                    <div className="tl-body">
                      <div className="fl ic jb">
                        <span className="tl-title">{h.bom}</span>
                        <span className={`badge ${h.type==='Tạo mới'?'badge-blue':h.type==='Phê duyệt'?'badge-green':h.type==='Chỉnh sửa'?'badge-yellow':'badge-gray'}`}>{h.type}</span>
                      </div>
                      <div className="tl-meta">{h.date} · {h.user}</div>
                      <div style={{fontSize:12.5,marginTop:4,lineHeight:1.5,color:'var(--text)'}}>{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab===2 && (
              <div>
                <div className="al al-blue mb12">🤖 Hỏi AI về bất kỳ thành phần, lý do thay đổi, hoặc so sánh BOM. Thử: <em>"Tại sao acid citric giảm?"</em> hoặc <em>"NFC cần bao nhiêu mỗi mẻ?"</em></div>
                <div className="chat-box mb8">
                  {chatLog.map((m,i)=>(
                    <div key={i} className={`chat-msg ${m.role==='user'?'chat-user':'chat-ai'}`} style={{whiteSpace:'pre-line'}}>
                      {m.role==='ai' && <div style={{fontSize:10,fontWeight:600,marginBottom:3,opacity:0.6}}>🤖 AI BOM Assistant</div>}
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="ir">
                  <input
                    value={chatInput}
                    onChange={e=>setChatInput(e.target.value)}
                    onKeyDown={e=>e.key==='Enter'&&sendChat()}
                    placeholder="Hỏi về BOM, thành phần, lý do thay đổi..."
                  />
                  <button className="btn btn-primary" onClick={sendChat}>Gửi ↵</button>
                </div>
                <div className="fl g8 mt8">
                  {['Tại sao acid citric giảm?','So sánh v3 và v4','NFC cần bao nhiêu/mẻ?','Vitamin C thêm vào làm gì?'].map((q,i)=>(
                    <button key={i} className="btn btn-ghost btn-sm" onClick={()=>{setChatInput(q)}}>{q}</button>
                  ))}
                </div>
              </div>
            )}

            {tab===3 && (
              <div>
                <div className="al al-blue mb12">ℹ️ So sánh v3 vs v4 của NC Cam 330ml thị trường VN</div>
                <div className="tw">
                  <table>
                    <thead><tr><th>Thành phần</th><th>BOM v3 (01/09/2025)</th><th>BOM v4 (15/03/2026)</th><th>Thay đổi</th><th>Lý do</th></tr></thead>
                    <tbody>
                      {[
                        {comp:'NFC Cam 65°Brix',v3:'240.0 kg',v4:'258.9 kg',change:'+18.9 kg ↑',reason:'Cải thiện hương vị tự nhiên',changed:true},
                        {comp:'Nước RO',v3:'641.0 kg',v4:'624.0 kg',change:'-17.0 kg ↓',reason:'Cân bằng lại tổng khối lượng',changed:true},
                        {comp:'Sucrose',v3:'112.0 kg',v4:'112.0 kg',change:'Không đổi',reason:'—',changed:false},
                        {comp:'Acid citric',v3:'3.0 kg',v4:'2.8 kg',change:'-0.2 kg ↓',reason:'Giảm ảnh hưởng ổn định màu',changed:true},
                        {comp:'Hương cam',v3:'1.5 kg (TH)',v4:'1.5 kg (TN)',change:'Đổi loại ↔',reason:'Chuyển sang hương tự nhiên',changed:true},
                        {comp:'Vitamin C',v3:'Không có',v4:'200 g',change:'Thêm mới ✚',reason:'Chống oxy hóa, bảo màu',changed:true},
                        {comp:'Bao bì PET 330ml',v3:'3,030 cái',v4:'3,030 cái',change:'Không đổi',reason:'—',changed:false},
                      ].map((r,i)=>(
                        <tr key={i} style={{background:r.changed?'':''}}>
                          <td className="fw5">{r.comp}</td>
                          <td className="cm">{r.v3}</td>
                          <td className="fw5">{r.v4}</td>
                          <td><span className={r.changed?'tb fw6':'cm'}>{r.change}</span></td>
                          <td className="cm tsm">{r.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="al al-green mt12">✅ Tổng 5/7 dòng có thay đổi so với v3. Tất cả thay đổi đã được phê duyệt bởi trưởng bộ phận R&D ngày 15/03/2026.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
