import { useState } from 'react'
const swipeData = [
  {emp:'NV001',name:'Nguyễn Văn An',in:'07:54',out:'17:12',regular:8.3,ot:0.3,total:8.6},
  {emp:'NV002',name:'Trần Thị Bình',in:'08:01',out:'18:45',regular:8.0,ot:1.75,total:9.75},
  {emp:'NV003',name:'Lê Văn Cường',in:'07:45',out:'20:30',regular:8.0,ot:3.5,total:11.5},
  {emp:'NV004',name:'Phạm Thị Dung',in:'08:00',out:'17:00',regular:8.0,ot:0,total:8.0},
  {emp:'NV005',name:'Võ Minh Đức',in:'07:50',out:'19:15',regular:8.0,ot:2.25,total:10.25},
  {emp:'NV006',name:'Hoàng Thị Em',in:'08:05',out:'17:30',regular:8.0,ot:0.5,total:8.5},
]

export default function WorkHourCalc() {
  const [file, setFile] = useState(null)
  const [analyzed, setAnalyzed] = useState(false)
  const totalReg = swipeData.reduce((s,r)=>s+r.regular,0)
  const totalOT = swipeData.reduce((s,r)=>s+r.ot,0)

  return (
    <div className="sg">
      <div className="ph"><div><h1>⏱️ Tính Giờ Công Tự Động</h1><p>AI đọc dữ liệu thẻ quẹt, phân tích giờ hành chính + tăng ca – Không cần tính thủ công</p></div></div>
      <div className="sg3">
        {[
          {label:'Tổng nhân viên hôm nay',val:`${swipeData.length}`,color:'#0078d4'},
          {label:'Tổng giờ hành chính',val:`${totalReg.toFixed(1)}h`,color:'#107c10'},
          {label:'Tổng giờ tăng ca',val:`${totalOT.toFixed(1)}h`,color:'#d97706'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div></div>)}
      </div>

      {!analyzed ? (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📂 Tải dữ liệu thẻ quẹt</span></div>
          <div style={{border:'2px dashed var(--border)',borderRadius:8,padding:28,textAlign:'center',marginBottom:16}}>
            <div style={{fontSize:32,marginBottom:8}}>🗂️</div>
            <div className="fw5 mb4">Tải file dữ liệu thẻ quẹt (Access Control)</div>
            <div className="cm tsm">Hỗ trợ .xlsx, .csv từ hệ thống chấm công</div>
            <button className="btn btn-outline mt12">📁 Chọn file</button>
          </div>
          <div className="al al-blue mb12">ℹ️ Hệ thống tự động nhận dạng: giờ vào, giờ ra, giờ hành chính (8h), tính thêm tăng ca theo quy định.</div>
          <div className="fl g8">
            <button className="btn btn-ghost btn-sm">📅 Chọn ngày</button>
            <button className="btn btn-primary" onClick={()=>setAnalyzed(true)}>⚡ Phân tích dữ liệu mẫu</button>
          </div>
        </div>
      ) : (
        <div className="sg">
          <div className="al al-green">✅ Phân tích hoàn tất 6 nhân viên · Ngày 09/06/2026 · Tự động phân loại giờ công</div>
          <div className="card">
            <div className="card-title">
              <span className="card-title-left">📊 Bảng chấm công ngày 09/06/2026</span>
              <div className="fl g8"><button className="btn btn-outline btn-sm">📥 Xuất Excel</button><button className="btn btn-ghost btn-sm" onClick={()=>setAnalyzed(false)}>🔄 Phân tích lại</button></div>
            </div>
            <div className="tw"><table>
              <thead><tr><th>Mã NV</th><th>Họ tên</th><th>Giờ vào</th><th>Giờ ra</th><th>Giờ HC (h)</th><th>Tăng ca (h)</th><th>Tổng (h)</th><th>Ghi chú AI</th></tr></thead>
              <tbody>{swipeData.map((r,i)=>(
                <tr key={i}>
                  <td className="fw5 tb">{r.emp}</td>
                  <td>{r.name}</td>
                  <td>{r.in}</td><td>{r.out}</td>
                  <td>{r.regular}</td>
                  <td className={r.ot>0?'fw6 tb':'cm'}>{r.ot>0?`+${r.ot}`:r.ot}</td>
                  <td className="fw6">{r.total}</td>
                  <td className="cm tsm">{r.ot>3?'⚠️ Tăng ca nhiều':r.ot>0?'Tăng ca bình thường':'Giờ hành chính'}</td>
                </tr>
              ))}</tbody>
              <tfoot><tr style={{background:'var(--blue-xlight)'}}>
                <td colSpan={4} className="fw6">Tổng cộng</td>
                <td className="fw6">{totalReg.toFixed(1)}</td>
                <td className="fw6 tb">{totalOT.toFixed(1)}</td>
                <td className="fw6">{(totalReg+totalOT).toFixed(1)}</td>
                <td/>
              </tr></tfoot>
            </table></div>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">🤖 Nhận xét AI</span></div>
            <div className="sg" style={{gap:8}}>
              <div className="al al-yellow">⚠️ <strong>NV003 – Lê Văn Cường</strong>: Tăng ca 3.5h, vượt ngưỡng khuyến nghị 3h/ngày. Kiểm tra chính sách làm thêm giờ.</div>
              <div className="al al-blue">ℹ️ Trung bình tăng ca hôm nay: <strong>1.38h/người</strong>. Cao hơn mức TB tuần trước (0.9h).</div>
              <div className="al al-green">✅ Toàn bộ nhân viên đều quẹt thẻ đúng quy trình. Không có trường hợp quên quẹt.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
