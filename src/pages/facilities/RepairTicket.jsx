import { useState } from 'react'

const tickets = [
  {id:'RT-2406-041',time:'08:15',reporter:'Nguyễn Văn An',area:'Line 1 – Máy chiết',desc:'Máy chiết MX-01 phát ra tiếng kêu lạ khi vận hành, tốc độ giảm ~10%',priority:'Cao',category:'Cơ khí',assignTo:'Trần Bảo Trì',estTime:'2h',status:'Đang xử lý',aiNote:'Khả năng cao: ổ bi con lăn băng tải mòn. Xem hồ sơ bảo trì tháng 3.'},
  {id:'RT-2406-040',time:'07:42',reporter:'Lê Thị Bình',area:'Kho lạnh B2',desc:'Máy lạnh kho B2 không xuống nhiệt đủ, đang ở 8°C thay vì 4°C',priority:'Cao',category:'Điện lạnh',assignTo:'Phạm Điện Lạnh',estTime:'3h',status:'Chờ phụ tùng',aiNote:'Gas lạnh có thể bị rò rỉ nhẹ. Kiểm tra van tiết lưu và áp suất gas.'},
  {id:'RT-2406-039',time:'06:30',reporter:'Hệ thống tự động',area:'Máy dán nhãn MX-03',desc:'Cảm biến vị trí nhãn báo lỗi E-07, máy dừng tự động',priority:'Trung bình',category:'Điện/Cảm biến',assignTo:'Hoàng Điện',estTime:'1h',status:'Hoàn thành',aiNote:'Lỗi E-07 thường do cảm biến quang bị bụi bám. Vệ sinh đầu cảm biến, kiểm tra nguồn cấp 24VDC.'},
  {id:'RT-2406-038',time:'14:20',reporter:'Võ Minh Đức',area:'Hệ thống RO',desc:'Áp suất đầu ra lọc RO giảm còn 2.1 bar (bình thường 3.5 bar)',priority:'Trung bình',category:'Xử lý nước',assignTo:'Đặng Vận Hành',estTime:'4h',status:'Đang xử lý',aiNote:'Màng RO có thể bị nghẽn. Kiểm tra độ muối đầu vào và backwash. Nếu vẫn thấp, thay màng.'},
  {id:'RT-2406-037',time:'13:05',reporter:'Trần Thị Cẩm',area:'Line 2 – Băng chuyền',desc:'Băng chuyền bị lệch sang phải ~3cm, sản phẩm có nguy cơ rơi',priority:'Thấp',category:'Cơ khí',assignTo:'Nguyễn Cơ Khí',estTime:'45 phút',status:'Hoàn thành',aiNote:'Điều chỉnh bu lông căng băng phía phải, kiểm tra độ phẳng con lăn dẫn hướng.'},
]

const staff = [
  {name:'Trần Bảo Trì',skill:'Cơ khí',available:false,current:'RT-2406-041'},
  {name:'Phạm Điện Lạnh',skill:'Điện lạnh',available:false,current:'RT-2406-040'},
  {name:'Hoàng Điện',skill:'Điện/Cảm biến',available:true,current:'—'},
  {name:'Đặng Vận Hành',skill:'Vận hành/Xử lý nước',available:false,current:'RT-2406-038'},
  {name:'Nguyễn Cơ Khí',skill:'Cơ khí',available:true,current:'—'},
]

const [statDone, statPending, statInProgress] = [2, 1, 2]

export default function RepairTicket() {
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState(tickets[0])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({area:'',desc:'',reporter:''})
  const [aiAnalyzed, setAiAnalyzed] = useState(false)

  const analyzeAI = () => setTimeout(() => setAiAnalyzed(true), 800)

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>🛠️ Báo Sửa Chữa Thông Minh</h1><p>AI tự động phân loại phiếu báo sửa, dự báo thời gian xử lý, phân công kỹ thuật viên phù hợp</p></div>
        <button className="btn btn-primary" onClick={()=>setShowForm(!showForm)}>+ Tạo phiếu báo sửa</button>
      </div>

      <div className="sg4">
        {[
          {label:'Phiếu hôm nay',val:'5',sub:'2 mức cao',color:'#d97706'},
          {label:'Đang xử lý',val:'2',sub:'Trung bình 2.5h/phiếu',color:'#0078d4'},
          {label:'Hoàn thành hôm nay',val:'2',sub:'Đúng SLA: 100%',color:'#107c10'},
          {label:'Chờ phụ tùng',val:'1',sub:'ETA: chiều nay',color:'#d13438'},
        ].map((s,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📝 Tạo phiếu báo sửa mới</span></div>
          <div className="fg3 mb12">
            <div className="fr"><label>Khu vực / Thiết bị</label>
              <select value={form.area} onChange={e=>setForm({...form,area:e.target.value})}>
                <option value="">-- Chọn khu vực --</option>
                <option>Line 1 – Máy chiết MX-01</option>
                <option>Line 2 – Máy chiết MX-04</option>
                <option>Máy dán nhãn MX-03</option>
                <option>Hệ thống RO</option>
                <option>Kho lạnh B2</option>
                <option>Băng chuyền chính</option>
              </select>
            </div>
            <div className="fr"><label>Người báo cáo</label>
              <input value={form.reporter} onChange={e=>setForm({...form,reporter:e.target.value})} placeholder="Họ tên"/>
            </div>
            <div className="fr"><label>Mức độ ưu tiên (AI sẽ điều chỉnh)</label>
              <select><option>Tự động (AI phân loại)</option><option>Cao</option><option>Trung bình</option><option>Thấp</option></select>
            </div>
          </div>
          <div className="fr mb12"><label>Mô tả sự cố</label>
            <textarea rows={3} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Mô tả hiện tượng, tiếng ồn, lỗi hiển thị..."/>
          </div>
          <div className="fl g8">
            <button className="btn btn-primary" onClick={analyzeAI}>🤖 Phân tích & Tạo phiếu</button>
            <button className="btn btn-ghost" onClick={()=>setShowForm(false)}>Hủy</button>
          </div>
          {aiAnalyzed && (
            <div className="al al-blue mt12">
              🤖 <span>AI phân loại: <strong>Cơ khí – Mức Trung bình</strong> · Thời gian dự kiến: <strong>1.5h</strong> · Đề xuất phân công: <strong>Nguyễn Cơ Khí</strong> (đang rảnh, phù hợp chuyên môn) · Tài liệu liên quan: Sổ tay bảo trì MX-01 tr.47.</span>
            </div>
          )}
        </div>
      )}

      <div className="tabs">
        {['Danh sách phiếu','Phân công nhân sự','Thống kê SLA'].map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>

      {tab===0 && (
        <div className="g2" style={{gridTemplateColumns:'1fr 340px'}}>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📋 Phiếu báo sửa hôm nay</span></div>
            <div className="sg" style={{gap:6}}>
              {tickets.map((t,i)=>(
                <div key={i} onClick={()=>setSelected(t)} style={{
                  padding:'10px 14px',borderRadius:6,cursor:'pointer',border:'1px solid var(--border)',
                  background:selected.id===t.id?'var(--blue-xlight)':'#fff',
                  borderColor:selected.id===t.id?'var(--blue)':'var(--border)',
                }}>
                  <div className="fl ic jb">
                    <span className="fw6 tb tsm">{t.id}</span>
                    <div className="fl g6 ic">
                      <span className={`badge ${t.priority==='Cao'?'badge-red':t.priority==='Trung bình'?'badge-yellow':'badge-gray'}`}>{t.priority}</span>
                      <span className={`badge ${t.status==='Hoàn thành'?'badge-green':t.status==='Đang xử lý'?'badge-blue':'badge-yellow'}`}>{t.status}</span>
                    </div>
                  </div>
                  <div className="fw5" style={{fontSize:13,margin:'3px 0'}}>{t.area}</div>
                  <div className="cm tsm trunc">{t.desc}</div>
                  <div className="fl g8 mt4 cm tsm">{t.time} · {t.reporter} · {t.category}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sg" style={{gap:14}}>
            <div className="card">
              <div className="card-title"><span className="card-title-left">🔍 Chi tiết phiếu</span></div>
              <div className="sg" style={{gap:8}}>
                <div style={{background:'var(--bg)',padding:'10px',borderRadius:6}}>
                  <div className="cm tsm mb4">Mô tả sự cố</div>
                  <div style={{fontSize:13}}>{selected.desc}</div>
                </div>
                {[
                  {label:'Khu vực',val:selected.area},
                  {label:'Phân loại AI',val:selected.category},
                  {label:'Phân công',val:selected.assignTo},
                  {label:'Thời gian dự kiến',val:selected.estTime},
                ].map((f,i)=>(
                  <div key={i} className="fl ic jb" style={{padding:'5px 0',borderBottom:'1px solid var(--border)'}}>
                    <span className="cm tsm">{f.label}</span>
                    <span className="fw5 tsm">{f.val}</span>
                  </div>
                ))}
                <div className="al al-blue" style={{fontSize:12}}>
                  🤖 <strong>Phân tích AI:</strong> {selected.aiNote}
                </div>
                <div className="fl g8">
                  <button className="btn btn-primary btn-sm w100">✓ Xác nhận xử lý</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab===1 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">👷 Trạng thái kỹ thuật viên hôm nay</span></div>
          <div className="tw"><table>
            <thead><tr><th>Kỹ thuật viên</th><th>Chuyên môn</th><th>Trạng thái</th><th>Đang xử lý</th><th>Phân công mới</th></tr></thead>
            <tbody>{staff.map((s,i)=>(
              <tr key={i}>
                <td className="fw5">{s.name}</td>
                <td><span className="badge badge-blue">{s.skill}</span></td>
                <td><span className={`badge ${s.available?'badge-green':'badge-yellow'}`}>{s.available?'🟢 Rảnh':'🟡 Đang bận'}</span></td>
                <td className="cm tsm">{s.current}</td>
                <td>{s.available?<button className="btn btn-outline btn-sm">Phân công</button>:<span className="cm tsm">—</span>}</td>
              </tr>
            ))}</tbody>
          </table></div>
          <div className="al al-blue mt12">🤖 AI đề xuất: Phân công <strong>Hoàng Điện</strong> cho RT-2406-040 (điện lạnh gần nhất với chuyên môn điện của anh). Thời gian di chuyển: ~5 phút.</div>
        </div>
      )}

      {tab===2 && (
        <div className="sg">
          <div className="sg3">
            {[
              {label:'Tỷ lệ xử lý đúng SLA (tháng 6)',val:'94%',sub:'Mục tiêu: 90%',color:'#107c10'},
              {label:'Thời gian xử lý TB',val:'2.1h',sub:'Giảm 18% so tháng 5',color:'#0078d4'},
              {label:'Phiếu tái phát (cùng thiết bị)',val:'3',sub:'MX-03 xuất hiện 2 lần',color:'#d97706'},
            ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div><div className="sc-sub">{s.sub}</div></div>)}
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Phân loại phiếu theo danh mục (tháng 6)</span></div>
            {[
              {cat:'Cơ khí',count:12,pct:38,color:'#0078d4'},
              {cat:'Điện / Cảm biến',count:9,pct:28,color:'#d97706'},
              {cat:'Điện lạnh',count:5,pct:16,color:'#00897b'},
              {cat:'Xử lý nước / RO',count:4,pct:13,color:'#7c3aed'},
              {cat:'Khác',count:2,pct:5,color:'#6b7a90'},
            ].map((r,i)=>(
              <div className="meter-row" key={i}>
                <div className="meter-label">{r.cat}</div>
                <div className="meter-bar"><div className="meter-fill" style={{width:`${r.pct}%`,background:r.color}}/></div>
                <div className="meter-val" style={{color:r.color}}>{r.count} phiếu</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
