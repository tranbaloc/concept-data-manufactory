import { useState } from 'react'
const samples = [
  {type:'zalo',zh:'今天下午3点前需要确认订单数量，请尽快回复。',vn:'Cần xác nhận số lượng đơn hàng trước 3 giờ chiều hôm nay, vui lòng phản hồi sớm nhất.'},
  {type:'order',zh:'产品编号: NC-CAM-330ML, 数量: 50,000 箱, 交货日期: 2026年6月20日',vn:'Mã sản phẩm: NC-CAM-330ML, Số lượng: 50.000 thùng, Ngày giao hàng: 20/06/2026'},
  {type:'meeting',zh:'会议议题：讨论六月份的包材需求和库存调整方案。',vn:'Nội dung họp: Thảo luận nhu cầu bao bì và phương án điều chỉnh tồn kho tháng 6.'},
]

export default function Translation() {
  const [tab, setTab] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState('zh-vn')

  const translate = () => {
    if (!input.trim()) return
    setLoading(true)
    setTimeout(() => {
      setResult('【AI Dịch】 ' + (lang==='zh-vn'
        ? 'Đây là bản dịch tiếng Việt mẫu cho nội dung bạn vừa nhập. Hệ thống nhận diện đây là nội dung đơn hàng với thông tin sản phẩm, số lượng và thời gian giao hàng.'
        : 'This is a sample English translation for the content you just entered.'))
      setLoading(false)
    }, 900)
  }

  return (
    <div className="sg">
      <div className="ph"><div><h1>🌐 Dịch Thuật AI</h1><p>Dịch tin nhắn Zalo, nội dung họp, đơn hàng tiếng Hoa – Giảm thời gian phiên dịch</p></div></div>
      <div className="sg3">
        {[
          {label:'Tin nhắn đã dịch hôm nay',val:'47',color:'#0078d4'},
          {label:'Thời gian tiết kiệm TB',val:'3.2 phút/tin',color:'#107c10'},
          {label:'Độ chính xác trung bình',val:'97.4%',color:'#00897b'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div></div>)}
      </div>
      <div className="tabs">
        {['Dịch nhanh','Lịch sử dịch','Dịch họp'].map((t,i)=><div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>)}
      </div>
      {tab===0 && (
        <div className="g2">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📝 Nhập nội dung cần dịch</span></div>
            <div className="fr mb12"><label>Chiều dịch</label>
              <select value={lang} onChange={e=>setLang(e.target.value)}>
                <option value="zh-vn">🇨🇳 Tiếng Hoa → 🇻🇳 Tiếng Việt</option>
                <option value="vn-en">🇻🇳 Tiếng Việt → 🇬🇧 Tiếng Anh</option>
                <option value="en-vn">🇬🇧 Tiếng Anh → 🇻🇳 Tiếng Việt</option>
              </select>
            </div>
            <div className="fr mb12"><label>Nội dung gốc</label>
              <textarea rows={5} value={input} onChange={e=>setInput(e.target.value)} placeholder="Dán nội dung tiếng Hoa vào đây..."/>
            </div>
            <div className="fl g8 mb12">
              {samples.map((s,i)=><button key={i} className="btn btn-ghost btn-sm" onClick={()=>setInput(s.zh)}>
                {s.type==='zalo'?'📱 Zalo mẫu':s.type==='order'?'📋 Đơn hàng mẫu':'🎙️ Nội dung họp'}
              </button>)}
            </div>
            <button className="btn btn-primary w100" onClick={translate} disabled={loading}>
              {loading?'⏳ Đang dịch...':'🌐 Dịch ngay'}
            </button>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">✅ Kết quả dịch</span></div>
            {result ? (
              <div>
                <div style={{background:'var(--blue-xlight)',padding:'14px',borderRadius:6,fontSize:13,lineHeight:1.7,border:'1px solid var(--blue-light)',color:'var(--text)'}}>{result}</div>
                <div className="fl g8 mt12">
                  <button className="btn btn-outline btn-sm">📋 Sao chép</button>
                  <button className="btn btn-ghost btn-sm">💾 Lưu vào lịch sử</button>
                </div>
                <div className="al al-blue mt12">🤖 AI phát hiện: đây là <strong>đơn hàng thương mại</strong>. Thuật ngữ chuyên ngành đã được tối ưu theo ngữ cảnh ngành thực phẩm.</div>
              </div>
            ) : <div style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)',fontSize:13}}>Kết quả dịch sẽ hiển thị tại đây</div>}
          </div>
        </div>
      )}
      {tab===1 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📂 Lịch sử dịch hôm nay</span></div>
          <div className="tw"><table>
            <thead><tr><th>Thời gian</th><th>Loại</th><th>Nội dung gốc (tóm tắt)</th><th>Độ tin cậy</th></tr></thead>
            <tbody>
              {[['08:12','Zalo','今天下午3点前需要确认订单...','98%'],['09:45','Đơn hàng','产品编号: NC-CAM-330ML...','99%'],
                ['10:30','Họp','会议议题：讨论六月份的...','96%'],['13:20','Zalo','请确认明天的发货数量...','97%'],
                ['15:10','Đơn hàng','采购单号: PO-2026-0612...','98%'],
              ].map(([t,type,orig,conf],i)=>(
                <tr key={i}><td className="cm tsm">{t}</td><td><span className="badge badge-blue">{type}</span></td>
                  <td className="trunc" style={{maxWidth:260}}>{orig}</td>
                  <td><span className="tg fw6">{conf}</span></td></tr>
              ))}
            </tbody>
          </table></div>
        </div>
      )}
      {tab===2 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">🎙️ Dịch Họp Real-time</span></div>
          <div className="al al-blue mb12">ℹ️ Kết nối với microphone phòng họp để dịch đồng thời. Hỗ trợ: Trung – Việt, Anh – Việt.</div>
          <div style={{border:'2px dashed var(--border)',borderRadius:8,padding:24,textAlign:'center',marginBottom:16}}>
            <div style={{fontSize:32,marginBottom:8}}>🎙️</div>
            <div className="fw5 mb4">Nhấn để bắt đầu ghi âm dịch họp</div>
            <div className="cm tsm">Hỗ trợ phiên họp trực tiếp và ghi âm sẵn có</div>
            <button className="btn btn-primary mt12">▶ Bắt đầu dịch</button>
          </div>
          <div className="chat-box">
            <div><span className="cm tsm">👤 Speaker 1 (ZH):</span><div className="fw5">关于六月份的包材需求，我们需要增加10%的备货量。</div></div>
            <div className="al al-blue">🇻🇳 <em>Về nhu cầu bao bì tháng 6, chúng ta cần tăng 10% lượng dự trữ.</em></div>
            <div><span className="cm tsm">👤 Speaker 2 (VN):</span><div className="fw5">Đồng ý. Tôi sẽ liên hệ nhà cung cấp ngay hôm nay.</div></div>
            <div className="al al-yellow">🇨🇳 <em>同意。我今天就会联系供应商。</em></div>
          </div>
        </div>
      )}
    </div>
  )
}
