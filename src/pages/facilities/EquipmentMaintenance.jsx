import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
const equipment = [
  {id:'MX-01',name:'Máy chiết Line 1',status:'Tốt',temp:62,vibration:0.8,current:42,health:96,next:'25/08/2026',risk:'Thấp'},
  {id:'MX-02',name:'Máy ghép nắp',status:'Tốt',temp:58,vibration:0.6,current:38,health:91,next:'10/07/2026',risk:'Thấp'},
  {id:'MX-03',name:'Máy dán nhãn',status:'Cảnh báo',temp:71,vibration:1.4,current:51,health:74,next:'15/06/2026',risk:'Trung bình'},
  {id:'MX-04',name:'Máy chiết Line 2',status:'Nguy hiểm',temp:87,vibration:2.1,current:68,health:52,next:'Ngay hôm nay',risk:'Cao'},
  {id:'MX-05',name:'Băng chuyền chính',status:'Tốt',temp:55,vibration:0.5,current:35,health:98,next:'01/12/2026',risk:'Thấp'},
  {id:'MX-06',name:'Hệ thống lọc nước RO',status:'Cảnh báo',temp:43,vibration:0.3,current:28,health:68,next:'20/06/2026',risk:'Trung bình'},
]
const tempData = Array.from({length:12},(_, i)=>({t:`${7+i}h`,mx01:60+Math.sin(i)*4,mx04:75+i*1.2+Math.random()*2}))

export default function EquipmentMaintenance() {
  return (
    <div className="sg">
      <div className="ph">
        <div><h1>🔧 Bảo Trì & Quản Lý Thiết Bị</h1><p>Predictive Maintenance – AI phân tích dữ liệu cảm biến, phát hiện bất thường, dự báo tuổi thọ</p></div>
        <button className="btn btn-primary btn-sm">📊 Báo cáo định kỳ</button>
      </div>

      <div className="sg4">
        {[
          {label:'Thiết bị hoạt động',val:'18/20',sub:'2 đang bảo trì',color:'#107c10'},
          {label:'Cảnh báo bất thường',val:'3',sub:'Cần xem xét ngay',color:'#d97706'},
          {label:'Nguy hiểm cao',val:'1',sub:'MX-04 vượt ngưỡng',color:'#d13438'},
          {label:'Bảo trì tháng này',val:'5',sub:'Theo lịch dự báo',color:'#0078d4'},
        ].map((s,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">🚨 Cảnh báo ưu tiên cao</span></div>
        <div className="sg" style={{gap:8}}>
          <div className="al al-red">🔴 <span><strong>MX-04 (Máy chiết Line 2)</strong> – Nhiệt độ động cơ 87°C (ngưỡng an toàn: 75°C). Dự báo hỏng trong 6–12 giờ nếu không can thiệp.</span></div>
          <div className="al al-yellow">⚠️ <span><strong>MX-03 (Máy dán nhãn)</strong> – Độ rung 1.4mm/s (ngưỡng: 1.2mm/s). Ổ bi có dấu hiệu mòn. Lên lịch kiểm tra trong 3 ngày.</span></div>
          <div className="al al-yellow">⚠️ <span><strong>Hệ thống lọc RO</strong> – Áp suất lọc giảm 18%, dự báo cần thay màng lọc trước 20/06.</span></div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">🌡️ Biểu đồ nhiệt độ động cơ (hôm nay)</span></div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={tempData} margin={{left:-20}}>
              <XAxis dataKey="t" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}} domain={[40,100]}/>
              <Tooltip/>
              <ReferenceLine y={75} stroke="#d13438" strokeDasharray="4 4" label={{value:'Ngưỡng',fontSize:10,fill:'#d13438'}}/>
              <Line type="monotone" dataKey="mx01" stroke="#0078d4" dot={false} name="MX-01" strokeWidth={2}/>
              <Line type="monotone" dataKey="mx04" stroke="#d13438" dot={false} name="MX-04" strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">📋 Danh sách thiết bị</span></div>
          <div className="tw">
            <table>
              <thead><tr><th>ID</th><th>Tên thiết bị</th><th>Sức khỏe</th><th>Bảo trì tiếp theo</th><th>Rủi ro</th></tr></thead>
              <tbody>{equipment.map((e,i)=>(
                <tr key={i}>
                  <td className="fw5 tb">{e.id}</td>
                  <td>{e.name}</td>
                  <td>
                    <div className="fl ic g8">
                      <div className="pb" style={{width:70}}><div className="pf" style={{width:`${e.health}%`,background:e.health>=90?'#107c10':e.health>=70?'#d97706':'#d13438'}}/></div>
                      <span className="tsm" style={{color:e.health>=90?'var(--green)':e.health>=70?'var(--yellow)':'var(--red)'}}>{e.health}%</span>
                    </div>
                  </td>
                  <td className="tsm">{e.next}</td>
                  <td><span className={`badge ${e.risk==='Cao'?'badge-red':e.risk==='Trung bình'?'badge-yellow':'badge-green'}`}>{e.risk}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">📊 Thông số cảm biến real-time</span></div>
        <div className="tw">
          <table>
            <thead><tr><th>Thiết bị</th><th>Nhiệt độ (°C)</th><th>Độ rung (mm/s)</th><th>Dòng điện (A)</th><th>Trạng thái</th></tr></thead>
          <tbody>{equipment.map((e,i)=>(
            <tr key={i}>
              <td className="fw5">{e.id} – {e.name}</td>
              <td><span style={{color:e.temp>75?'var(--red)':e.temp>65?'var(--yellow)':'var(--text)'}}>{e.temp}°C</span></td>
              <td><span style={{color:e.vibration>1.2?'var(--red)':e.vibration>1.0?'var(--yellow)':'var(--text)'}}>{e.vibration}</span></td>
              <td><span style={{color:e.current>60?'var(--red)':e.current>50?'var(--yellow)':'var(--text)'}}>{e.current}A</span></td>
              <td><span className={`badge ${e.status==='Tốt'?'badge-green':e.status==='Cảnh báo'?'badge-yellow':'badge-red'}`}>{e.status}</span></td>
            </tr>
          ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
