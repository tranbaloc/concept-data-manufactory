import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const orders = [
  {id:'ORD-2610',product:'NC Cam 330ml',qty:50000,deadline:'16/06',priority:'Cao',status:'Đang SX',line:'Line 1'},
  {id:'ORD-2611',product:'NC Chanh 500ml',qty:30000,deadline:'18/06',priority:'TB',status:'Chờ',line:'Line 2'},
  {id:'ORD-2612',product:'NC Dứa 1L',qty:20000,deadline:'20/06',priority:'TB',status:'Chờ',line:'Line 3'},
  {id:'ORD-2613',product:'Ổi Ép 330ml',qty:40000,deadline:'17/06',priority:'Cao',status:'Đang SX',line:'Line 1'},
  {id:'ORD-2614',product:'Chanh Muối 500ml',qty:25000,deadline:'22/06',priority:'Thấp',status:'Kế hoạch',line:'Line 2'},
]

const ganttData = [
  {task:'Line 1 – NC Cam',start:0,dur:3,color:'#0078d4'},
  {task:'Line 1 – Ổi Ép',start:2,dur:2,color:'#1a8cc9'},
  {task:'Line 2 – NC Chanh',start:1,dur:4,color:'#00897b'},
  {task:'Line 2 – Chanh Muối',start:5,dur:3,color:'#43a047'},
  {task:'Line 3 – NC Dứa',start:2,dur:5,color:'#d97706'},
]

const days = ['T2','T3','T4','T5','T6','T7','CN']

const resourceData = [
  {r:'Nhân lực',plan:100,actual:87},{r:'Máy chiết',plan:100,actual:92},
  {r:'Nguyên liệu',plan:100,actual:78},{r:'Bao bì',plan:100,actual:95},
]

const simulate = [
  {scenario:'Giữ nguyên kế hoạch',efficiency:82,delay:2,cost:100},
  {scenario:'Tăng ca T7 Line 1',efficiency:91,delay:0,cost:108},
  {scenario:'Chuyển ORD-2613 sang Line 3',efficiency:88,delay:1,cost:103},
]

export default function ProductionSchedule() {
  const [tab, setTab] = useState(0)

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>📅 Lịch Sản Xuất AI</h1><p>Tự động lập lịch, quản lý nguồn lực và mô phỏng kịch bản điều chỉnh</p></div>
        <div className="fl g8">
          <button className="btn btn-primary">🤖 Tối ưu lại lịch</button>
          <button className="btn btn-outline btn-sm">📥 Xuất Excel</button>
        </div>
      </div>

      <div className="sg4">
        {[
          {label:'Đơn hàng tuần này',val:'12',sub:'3 đang sản xuất',color:'#0078d4'},
          {label:'Công suất trung bình',val:'87%',sub:'Mục tiêu: 90%',color:'#d97706'},
          {label:'Đơn có nguy cơ trễ',val:'2',sub:'Cần điều chỉnh',color:'#d13438'},
          {label:'Hiệu suất dự báo',val:'91%',sub:'Sau khi tối ưu AI',color:'#107c10'},
        ].map((s,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {['Lịch sản xuất','Nguồn lực','Mô phỏng kịch bản','Cảnh báo'].map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>

      {tab===0 && (
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📋 Danh sách đơn hàng tuần 24</span></div>
            <div className="tw">
              <table>
                <thead><tr><th>Mã ĐH</th><th>Sản phẩm</th><th>Số lượng</th><th>Deadline</th><th>Ưu tiên</th><th>Trạng thái</th><th>Line</th></tr></thead>
                <tbody>{orders.map((o,i)=>(
                  <tr key={i}>
                    <td className="tb fw5">{o.id}</td>
                    <td>{o.product}</td>
                    <td>{o.qty.toLocaleString()}</td>
                    <td>{o.deadline}</td>
                    <td><span className={`badge ${o.priority==='Cao'?'badge-red':o.priority==='TB'?'badge-yellow':'badge-gray'}`}>{o.priority}</span></td>
                    <td><span className={`badge ${o.status==='Đang SX'?'badge-green':o.status==='Chờ'?'badge-blue':'badge-gray'}`}>{o.status}</span></td>
                    <td>{o.line}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Gantt – Lịch tuần 24 (9–15/06)</span></div>
            <div style={{display:'grid',gridTemplateColumns:'180px repeat(7,1fr)',gap:0,borderBottom:'1px solid var(--border)',paddingBottom:6,marginBottom:8}}>
              <div className="tsm cm fw6">Dây chuyền</div>
              {days.map(d=><div key={d} className="tsm cm fw6" style={{textAlign:'center'}}>{d}</div>)}
            </div>
            {ganttData.map((g,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'180px repeat(7,1fr)',gap:0,marginBottom:6,alignItems:'center'}}>
                <div className="tsm fw5 trunc">{g.task}</div>
                {days.map((_,d)=>(
                  <div key={d} style={{padding:'2px 2px'}}>
                    {d>=g.start && d<g.start+g.dur ? (
                      <div style={{background:g.color,height:22,borderRadius:4,opacity:d===g.start?1:0.75}} />
                    ) : <div style={{height:22}}/>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab===1 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">👷 Tình trạng nguồn lực tuần 24</span></div>
          {resourceData.map((r,i)=>(
            <div className="meter-row" key={i}>
              <div className="meter-label fw5">{r.r}</div>
              <div className="meter-bar"><div className="meter-fill" style={{width:`${r.actual}%`,background:r.actual>=90?'#107c10':r.actual>=75?'#d97706':'#d13438'}}/></div>
              <div className="meter-val" style={{color:r.actual>=90?'#107c10':r.actual>=75?'#d97706':'#d13438'}}>{r.actual}%</div>
            </div>
          ))}
          <div className="al al-yellow mt12">⚠️ <span>Nguyên liệu NFC 65°Brix còn 78% kế hoạch – Dự báo thiếu vào T5/T6. Đề xuất đặt bổ sung ngay.</span></div>
        </div>
      )}

      {tab===2 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">🔮 Mô phỏng kịch bản điều chỉnh</span></div>
          <div className="tw">
            <table>
              <thead><tr><th>Kịch bản</th><th>Hiệu suất</th><th>Nguy cơ trễ (đơn)</th><th>Chi phí tương đối</th><th>AI đề xuất</th></tr></thead>
              <tbody>{simulate.map((s,i)=>(
                <tr key={i}>
                  <td className="fw5">{s.scenario}</td>
                  <td><span style={{color:s.efficiency>=90?'var(--green)':'var(--yellow)'}}>{s.efficiency}%</span></td>
                  <td>{s.delay===0?<span className="badge badge-green">0</span>:<span className="badge badge-yellow">{s.delay}</span>}</td>
                  <td>{s.cost}%</td>
                  <td>{i===1?<span className="badge badge-green">⭐ Tốt nhất</span>:i===2?<span className="badge badge-blue">Khả thi</span>:<span className="badge badge-gray">Cơ sở</span>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="al al-blue mt12">🤖 AI khuyến nghị: <strong>Tăng ca T7 Line 1</strong> để đảm bảo ORD-2610 và ORD-2613 đúng hạn, tăng hiệu suất lên 91% với chi phí +8%.</div>
        </div>
      )}

      {tab===3 && (
        <div className="sg" style={{gap:10}}>
          <div className="al al-red">🔴 <strong>ORD-2611 (NC Chanh 500ml)</strong> – Nguy cơ trễ deadline 18/06 do thiếu nguyên liệu. Cần xác nhận từ NCC trước 12/06.</div>
          <div className="al al-red">🔴 <strong>Line 2</strong> – Bảo trì định kỳ lên lịch 13/06, xung đột với ORD-2611. AI đề xuất chuyển sang Line 3.</div>
          <div className="al al-yellow">⚠️ <strong>Bao bì nhãn PET-500ml</strong> – Tồn kho còn 32,000 cái, cần thêm 5,000 cho ORD-2614.</div>
          <div className="al al-green">✅ <strong>ORD-2610 và ORD-2613</strong> – Tiến độ đúng kế hoạch, dự kiến hoàn thành trước deadline 1 ngày.</div>
        </div>
      )}
    </div>
  )
}
