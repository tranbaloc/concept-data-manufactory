import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const areaData = [
  {m:'T1',rd:72,kh:85,cv:91,kho:78},{m:'T2',rd:78,kh:82,cv:88,kho:81},
  {m:'T3',rd:85,kh:90,cv:87,kho:84},{m:'T4',rd:80,kh:88,cv:92,kho:86},
  {m:'T5',rd:88,kh:93,cv:89,kho:90},{m:'T6',rd:91,kh:95,cv:94,kho:92},
]
const barData = [
  {name:'Formula Gen',val:142},{name:'Batch Calc',val:89},{name:'Lịch SX',val:56},
  {name:'Bảo Trì',val:203},{name:'Năng Lượng',val:74},{name:'Dịch Thuật',val:118},
  {name:'Tồn Kho',val:95},{name:'Giờ Công',val:67},
]
const pie = [{name:'R&D',v:22},{name:'Kế Hoạch',v:18},{name:'Công Vụ',v:35},{name:'Quản Kho',v:25}]
const COLORS = ['#0078d4','#2196f3','#00897b','#43a047']

const modules = [
  {dept:'R&D',name:'Tạo Formula AI',status:'Đang dùng',users:8,requests:142,badge:'badge-green'},
  {dept:'R&D',name:'Tính Toán Batch',status:'Đang dùng',users:5,requests:89,badge:'badge-green'},
  {dept:'Kế Hoạch',name:'Lịch Sản Xuất',status:'Đang dùng',users:4,requests:56,badge:'badge-green'},
  {dept:'Công Vụ',name:'Bảo Trì Thiết Bị',status:'Đang dùng',users:12,requests:203,badge:'badge-green'},
  {dept:'Công Vụ',name:'Quản Lý Năng Lượng',status:'Thử nghiệm',users:3,requests:74,badge:'badge-yellow'},
  {dept:'Quản Kho',name:'Dịch Thuật AI',status:'Đang dùng',users:15,requests:118,badge:'badge-green'},
  {dept:'Quản Kho',name:'Đối Chiếu Excel',status:'Đang dùng',users:6,requests:95,badge:'badge-green'},
  {dept:'Quản Lý',name:'Tính Ngày Giao Hàng',status:'Thử nghiệm',users:2,requests:31,badge:'badge-yellow'},
]

export default function Dashboard() {
  return (
    <div className="sg">
      <div className="ph">
        <div><h1>Tổng Quan Hệ Thống AI</h1><p>Giavico AI Platform · Cập nhật: 09/06/2026 08:30</p></div>
      </div>

      <div className="sg4">
        {[
          {icon:'🧑‍💼',color:'#e8f4fd',ic:'#0078d4',label:'Người dùng hoạt động',val:'54',sub:'Tăng 12 so với tháng trước',trend:true},
          {icon:'⚡',color:'#e8f8e8',ic:'#107c10',label:'Tổng yêu cầu AI hôm nay',val:'1,024',sub:'Đỉnh: 14:00 – 15:00',trend:true},
          {icon:'📦',color:'#fff4e6',ic:'#d97706',label:'Modules đang hoạt động',val:'14',sub:'2 module đang thử nghiệm'},
          {icon:'⏱️',color:'#fde7e9',ic:'#d13438',label:'Thời gian phản hồi TB',val:'1.2s',sub:'Mục tiêu < 2.0s',trend:true},
        ].map((s,i) => (
          <div className="sc" key={i}>
            <div className="sc-icon" style={{background:s.color}}><span style={{fontSize:18}}>{s.icon}</span></div>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.ic}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">📈 Hiệu quả sử dụng theo bộ phận (%)</span></div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={areaData} margin={{top:5,right:5,bottom:0,left:-20}}>
              <XAxis dataKey="m" tick={{fontSize:11}} />
              <YAxis tick={{fontSize:11}} domain={[60,100]} />
              <Tooltip />
              <Area type="monotone" dataKey="rd" stroke="#0078d4" fill="#deecf9" name="R&D" strokeWidth={2}/>
              <Area type="monotone" dataKey="kh" stroke="#00897b" fill="#e0f2f1" name="Kế Hoạch" strokeWidth={2}/>
              <Area type="monotone" dataKey="cv" stroke="#d97706" fill="#fef9c3" name="Công Vụ" strokeWidth={2}/>
              <Area type="monotone" dataKey="kho" stroke="#7c3aed" fill="#ede9fe" name="Kho" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">📊 Yêu cầu theo module</span></div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} margin={{top:5,right:5,bottom:20,left:-20}}>
              <XAxis dataKey="name" tick={{fontSize:9}} angle={-30} textAnchor="end" />
              <YAxis tick={{fontSize:11}} />
              <Tooltip />
              <Bar dataKey="val" fill="#0078d4" radius={[3,3,0,0]} name="Yêu cầu" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">📋 Trạng thái modules</span></div>
          <div className="tw">
            <table>
              <thead><tr><th>Bộ phận</th><th>Module</th><th>Trạng thái</th><th>Người dùng</th><th>Yêu cầu/tháng</th></tr></thead>
              <tbody>{modules.map((m,i)=>(
                <tr key={i}>
                  <td><span className="badge badge-blue">{m.dept}</span></td>
                  <td className="fw5">{m.name}</td>
                  <td><span className={`badge ${m.badge}`}><span className="bdot"/>  {m.status}</span></td>
                  <td>{m.users}</td>
                  <td>{m.requests}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">🍩 Phân bổ yêu cầu theo bộ phận</span></div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={pie} cx="50%" cy="50%" outerRadius={70} dataKey="v" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
              {pie.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
            </Pie></PieChart>
          </ResponsiveContainer>
          <div className="fl g16 mt12" style={{justifyContent:'center',flexWrap:'wrap'}}>
            {pie.map((p,i)=><span key={i} className="fl ic g6 tsm"><span className="cdot" style={{background:COLORS[i]}}/>{p.name}</span>)}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">🚨 Cảnh báo & Thông báo hệ thống</span></div>
        <div className="sg" style={{gap:8}}>
          <div className="al al-red">🔴 <span><strong>Thiết bị MX-04</strong> – Nhiệt độ động cơ vượt ngưỡng 87°C. Cần kiểm tra ngay.</span></div>
          <div className="al al-yellow">⚠️ <span><strong>Bao bì PET-500ml</strong> – Tồn kho còn 320 thùng, dưới mức tối thiểu 500.</span></div>
          <div className="al al-blue">ℹ️ <span><strong>Lịch sản xuất tuần 24</strong> – Đã được AI tối ưu, chờ phê duyệt từ trưởng BP Kế Hoạch.</span></div>
          <div className="al al-green">✅ <span><strong>Báo cáo ESG tháng 5</strong> – Đã xuất thành công. Carbon: 42.3 tCO₂e (giảm 8% so tháng 4).</span></div>
        </div>
      </div>
    </div>
  )
}
