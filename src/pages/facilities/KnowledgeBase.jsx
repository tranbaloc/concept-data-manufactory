import { useState } from 'react'

const docs = [
  {id:'DOC-001',title:'Sổ tay bảo trì máy chiết MX-01',type:'Bảo trì',equipment:'MX-01',updated:'2026-05-12',version:'v3.2',tags:['chiết','cơ khí','ổ bi'],size:'2.4MB'},
  {id:'DOC-002',title:'Hướng dẫn vệ sinh & CIP hệ thống đường ống',type:'Vệ sinh',equipment:'Đường ống',updated:'2026-04-20',version:'v2.0',tags:['CIP','vệ sinh','SOP'],size:'1.1MB'},
  {id:'DOC-003',title:'Sổ tay vận hành hệ thống lọc RO',type:'Vận hành',equipment:'Hệ thống RO',updated:'2026-03-08',version:'v4.1',tags:['RO','lọc nước','màng'],size:'3.7MB'},
  {id:'DOC-004',title:'Quy trình hiệu chỉnh cảm biến nhiệt độ & áp suất',type:'Hiệu chỉnh',equipment:'Cảm biến',updated:'2026-02-14',version:'v1.5',tags:['cảm biến','hiệu chuẩn','nhiệt độ'],size:'0.8MB'},
  {id:'DOC-005',title:'Hồ sơ sửa chữa máy dán nhãn MX-03 (2024–2026)',type:'Lịch sử sửa chữa',equipment:'MX-03',updated:'2026-06-01',version:'v8.0',tags:['nhãn','lỗi E-07','lịch sử'],size:'5.2MB'},
  {id:'DOC-006',title:'Tiêu chuẩn an toàn điện trong nhà máy',type:'An toàn',equipment:'Điện tổng',updated:'2026-01-30',version:'v2.3',tags:['điện','an toàn','5S'],size:'1.9MB'},
]

const history = [
  {id:'RT-2406-039',equip:'MX-03',issue:'Lỗi cảm biến E-07 – máy dừng',solution:'Vệ sinh đầu cảm biến quang, kiểm tra nguồn 24VDC',tech:'Hoàng Điện',date:'2026-06-09',duration:'45 phút',result:'Thành công'},
  {id:'RT-2406-027',equip:'MX-03',issue:'Lỗi E-07 tái phát lần 2',solution:'Thay cảm biến quang mới Model OX-200',tech:'Hoàng Điện',date:'2026-05-28',duration:'1.5h',result:'Thành công'},
  {id:'RT-2406-015',equip:'RO-01',issue:'Màng RO nghẽn, áp giảm xuống 2.0 bar',solution:'Thay màng RO mới, backwash toàn bộ hệ thống',tech:'Đặng Vận Hành',date:'2026-05-10',duration:'4h',result:'Thành công'},
  {id:'RT-2406-008',equip:'MX-01',issue:'Ổ bi con lăn băng tải bị mòn',solution:'Thay ổ bi SKF 6205-2RS, tra dầu mỡ',tech:'Trần Bảo Trì',date:'2026-04-22',duration:'2h',result:'Thành công'},
]

const aiSuggestions = [
  {q:'Cách xử lý lỗi E-07 máy MX-03?',a:'Lỗi E-07 là lỗi cảm biến vị trí nhãn. Bước 1: Vệ sinh đầu cảm biến quang bằng khí nén. Bước 2: Kiểm tra nguồn cấp 24VDC. Bước 3: Nếu vẫn lỗi sau 2 lần xuất hiện, thay cảm biến OX-200 (xem hồ sơ RT-2406-027). Tỷ lệ thành công: 95%. Thời gian dự kiến: 45 phút.',src:'DOC-005 + Lịch sử RT-2406-039'},
  {q:'Quy trình bảo trì định kỳ máy chiết MX-01?',a:'Theo sổ tay DOC-001 v3.2: Hàng tuần: kiểm tra ổ bi, tra dầu mỡ. Hàng tháng: kiểm tra rò rỉ các khớp nối, hiệu chỉnh van định lượng. Mỗi 6 tháng: thay ổ bi con lăn băng tải (SKF 6205-2RS). Hàng năm: kiểm tra toàn diện cùng nhà cung cấp.',src:'DOC-001 tr.23–31'},
  {q:'Áp suất đầu ra RO bình thường là bao nhiêu?',a:'Theo DOC-003 v4.1: Áp suất đầu ra hệ thống RO chuẩn: 3.5–4.0 bar. Nếu dưới 2.5 bar: kiểm tra màng RO và van tiết lưu. Nếu dưới 2.0 bar: có thể cần thay màng (thọ ~12 tháng). Ghi chú: Đặt lịch backwash mỗi 72 giờ vận hành.',src:'DOC-003 tr.14–17'},
]

export default function KnowledgeBase() {
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {role:'ai',text:'Xin chào! Tôi có thể tra cứu sổ tay bảo trì, hồ sơ sửa chữa và đề xuất giải pháp cho bạn. Hãy mô tả sự cố hoặc đặt câu hỏi kỹ thuật.'}
  ])
  const [thinking, setThinking] = useState(false)

  const filtered = docs.filter(d =>
    !search || d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.tags.some(t=>t.includes(search.toLowerCase())) ||
    d.equipment.toLowerCase().includes(search.toLowerCase())
  )

  const ask = (q) => {
    const question = q || chatInput
    if (!question.trim()) return
    setChatHistory(h=>[...h,{role:'user',text:question}])
    setChatInput('')
    setThinking(true)
    const match = aiSuggestions.find(s=>s.q===question) || aiSuggestions[0]
    setTimeout(()=>{
      setChatHistory(h=>[...h,{role:'ai',text:match.a,src:match.src}])
      setThinking(false)
    },900)
  }

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>📚 Quản Lý Tài Liệu & Kiến Thức</h1><p>AI tìm kiếm sổ tay bảo trì, hồ sơ lịch sử sửa chữa và đề xuất giải pháp kỹ thuật nhanh</p></div>
        <div className="fl g8">
          <button className="btn btn-primary">+ Tải tài liệu lên</button>
        </div>
      </div>

      <div className="sg4">
        {[
          {label:'Tài liệu trong hệ thống',val:'6',sub:'3 loại danh mục',color:'#0078d4'},
          {label:'Hồ sơ sửa chữa',val:'47',sub:'12 tháng gần nhất',color:'#107c10'},
          {label:'Truy cập tháng này',val:'132',sub:'↑ 23% so tháng trước',color:'#7c3aed'},
          {label:'Giải pháp AI được áp dụng',val:'18',sub:'Tỷ lệ thành công: 94%',color:'#d97706'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div><div className="sc-sub">{s.sub}</div></div>)}
      </div>

      <div className="tabs">
        {['Thư viện tài liệu','Hồ sơ sửa chữa','AI tra cứu nhanh'].map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>

      {tab===0 && (
        <div className="sg">
          <div className="card">
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="🔍 Tìm kiếm tài liệu theo tên, thiết bị, tag kỹ thuật..."
              style={{width:'100%',padding:'8px 12px',border:'1px solid var(--border)',borderRadius:6,fontSize:13,boxSizing:'border-box'}}/>
          </div>
          <div className="tw"><table>
            <thead><tr><th>Mã tài liệu</th><th>Tên tài liệu</th><th>Loại</th><th>Thiết bị</th><th>Cập nhật</th><th>Phiên bản</th><th>Dung lượng</th><th></th></tr></thead>
            <tbody>{filtered.map((d,i)=>(
              <tr key={i}>
                <td className="fw5 tb tsm">{d.id}</td>
                <td>
                  <div className="fw5" style={{fontSize:13}}>{d.title}</div>
                  <div className="fl g4 mt4">{d.tags.map((t,j)=><span key={j} className="badge badge-blue" style={{fontSize:10}}>{t}</span>)}</div>
                </td>
                <td><span className="badge badge-gray">{d.type}</span></td>
                <td className="tsm">{d.equipment}</td>
                <td className="cm tsm">{d.updated}</td>
                <td><span className="badge badge-green">{d.version}</span></td>
                <td className="cm tsm">{d.size}</td>
                <td><button className="btn btn-outline btn-sm">Xem</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      )}

      {tab===1 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">🔧 Lịch sử sửa chữa gần nhất</span></div>
          <div className="tw"><table>
            <thead><tr><th>Phiếu</th><th>Thiết bị</th><th>Sự cố</th><th>Giải pháp</th><th>Kỹ thuật viên</th><th>Ngày</th><th>Thời gian</th><th>Kết quả</th></tr></thead>
            <tbody>{history.map((h,i)=>(
              <tr key={i}>
                <td className="fw5 tb tsm">{h.id}</td>
                <td><span className="badge badge-blue">{h.equip}</span></td>
                <td style={{fontSize:12,maxWidth:180}}>{h.issue}</td>
                <td style={{fontSize:12,maxWidth:200}}>{h.solution}</td>
                <td className="tsm">{h.tech}</td>
                <td className="cm tsm">{h.date}</td>
                <td className="tsm">{h.duration}</td>
                <td><span className="badge badge-green">{h.result}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
          <div className="al al-blue mt12">🤖 AI nhận thấy: MX-03 đã báo lỗi E-07 <strong>2 lần trong 12 ngày</strong> — khuyến nghị thay cảm biến định kỳ mỗi 6 tháng thay vì chỉ khi hỏng.</div>
        </div>
      )}

      {tab===2 && (
        <div className="g2" style={{gridTemplateColumns:'1fr 320px'}}>
          <div className="card">
            <div className="card-title"><span className="card-title-left">🤖 AI Tra Cứu Kỹ Thuật</span></div>
            <div className="chat-box" style={{height:340,overflowY:'auto',display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
              {chatHistory.map((m,i)=>(
                <div key={i} className={m.role==='user'?'chat-msg chat-user':'chat-msg chat-ai'}>
                  {m.text}
                  {m.src && <div style={{fontSize:11,marginTop:4,opacity:.7}}>📎 Nguồn: {m.src}</div>}
                </div>
              ))}
              {thinking && <div className="chat-msg chat-ai cm tsm">AI đang tra cứu tài liệu...</div>}
            </div>
            <div className="fl g8">
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&ask()}
                placeholder="Nhập câu hỏi kỹ thuật..."
                style={{flex:1,padding:'8px 10px',border:'1px solid var(--border)',borderRadius:6,fontSize:13}}/>
              <button className="btn btn-primary" onClick={()=>ask()}>Gửi</button>
            </div>
          </div>
          <div className="sg" style={{gap:10}}>
            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:8}}>💡 Câu hỏi thường gặp</div>
              {aiSuggestions.map((s,i)=>(
                <div key={i} onClick={()=>ask(s.q)} className="al al-blue" style={{cursor:'pointer',marginBottom:6,fontSize:12}}>
                  {s.q}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
