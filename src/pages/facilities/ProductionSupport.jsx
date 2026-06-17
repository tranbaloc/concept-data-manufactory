
const T = {
  vi: {
    title: '⚙️ Hỗ Trợ Sản Xuất',
    subtitle: 'Tối ưu lịch máy, điều phối AGV, kiểm tra chất lượng bằng camera AI',
    kpi: ['Máy đang hoạt động','AGV đang vận hành','Lỗi phát hiện bởi AI hôm nay'],
  },
  zh: {
    title: '⚙️ 生产支持',
    subtitle: '优化机器排程，调度AGV，AI摄像头质量检测',
    kpi: ['运行中的机器','运行中的AGV','今日AI检测缺陷'],
  },
}
export default function ProductionSupport() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  return (
    <div className="sg">
      <div className="ph"><div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div></div>
      <div className="sg3">
        {[
          {label:tx.kpi[0],val:'8/10',color:'#107c10'},
          {label:tx.kpi[1],val:'4/5',color:'#0078d4'},
          {label:tx.kpi[2],val:'12',color:'#d97706'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div></div>)}
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">🚦 Thứ tự khởi động tối ưu hôm nay</span></div>
          <div className="tl">
            {[
              {t:'06:00',name:'Hệ thống lọc nước RO',reason:'Cần 30 phút ổn định trước chiết',color:'tl-blue'},
              {t:'06:30',name:'Nồi thanh trùng 1 & 2',reason:'Làm nóng trước khi batch đầu',color:'tl-blue'},
              {t:'07:00',name:'Máy chiết Line 1 (MX-01)',reason:'Ưu tiên đơn ORD-2610 deadline sớm',color:'tl-green'},
              {t:'07:15',name:'Băng chuyền chính',reason:'Sau khi Line 1 khởi động ổn định',color:'tl-green'},
              {t:'07:30',name:'Máy dán nhãn (MX-03)',reason:'Chạy sau để tránh tắc nghẽn',color:'tl-yellow'},
            ].map((t,i)=>(
              <div className="tl-item" key={i}>
                <div className={`tl-dot ${t.color}`} style={{fontSize:9}}>{t.t}</div>
                <div className="tl-body"><div className="tl-title">{t.name}</div><div className="tl-meta">{t.reason}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">🤖 Điều phối AGV</span></div>
          {[
            {id:'AGV-01',status:'Đang chạy',from:'Kho NVL A3',to:'Line 1',load:'NFC 65°Brix 200kg',eta:'3 phút'},
            {id:'AGV-02',status:'Đang chạy',from:'Line 2',to:'Kho TP B1',load:'Sản phẩm hoàn thành',eta:'7 phút'},
            {id:'AGV-03',status:'Chờ',from:'—',to:'—',load:'—',eta:'—'},
            {id:'AGV-04',status:'Sạc pin',from:'Trạm sạc',to:'—',load:'—',eta:'18 phút'},
          ].map((a,i)=>(
            <div key={i} style={{padding:'9px 0',borderBottom:'1px solid var(--border)',display:'grid',gridTemplateColumns:'60px 80px 1fr 60px',gap:8,alignItems:'center',fontSize:12}}>
              <span className="fw6 tb">{a.id}</span>
              <span className={`badge ${a.status==='Đang chạy'?'badge-green':a.status==='Chờ'?'badge-gray':'badge-yellow'}`}>{a.status}</span>
              <span className="cm">{a.load !== '—' ? `${a.from} → ${a.to}` : a.status}</span>
              <span className="cm">{a.eta}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title"><span className="card-title-left">📷 Kiểm Tra Chất Lượng AI – Camera Vision</span></div>
        <div className="sg3">
          {[
            {cam:'CAM-01 – Kiểm tra mực chai',pass:1248,fail:3,rate:99.76,color:'#107c10'},
            {cam:'CAM-02 – Kiểm tra nhãn dán',pass:1239,fail:9,rate:99.28,color:'#107c10'},
            {cam:'CAM-03 – Kiểm tra nắp',pass:1244,fail:7,rate:99.44,color:'#107c10'},
          ].map((c,i)=>(
            <div className="sc" key={i}>
              <div className="sc-label tsm">{c.cam}</div>
              <div className="fl ic g8 mt4">
                <span style={{fontSize:20,fontWeight:700,color:c.color}}>{c.rate}%</span>
                <span className="badge badge-green">Đạt</span>
              </div>
              <div className="sc-sub">✓ {c.pass.toLocaleString()} &nbsp;✗ {c.fail} lỗi hôm nay</div>
            </div>
          ))}
        </div>
        <div className="al al-blue mt12">📷 Các lỗi phổ biến hôm nay: nhãn lệch 4mm (5 chai), nắp chưa vặn kín (4 chai), mực thấp hơn 2ml (3 chai). Đã tách dòng và cách ly.</div>
      </div>
    </div>
  )
}
