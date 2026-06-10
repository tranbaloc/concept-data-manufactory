import { useState, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
         ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from 'recharts'
import { useNavigate } from 'react-router-dom'

const areaData = [
  {m:'T1',rd:72,kh:85,cv:91,kho:78},{m:'T2',rd:78,kh:82,cv:88,kho:81},
  {m:'T3',rd:85,kh:90,cv:87,kho:84},{m:'T4',rd:80,kh:88,cv:92,kho:86},
  {m:'T5',rd:88,kh:93,cv:89,kho:90},{m:'T6',rd:91,kh:95,cv:94,kho:92},
]
const hourlyReq = [
  {h:'06h',r:12},{h:'07h',r:34},{h:'08h',r:89},{h:'09h',r:145},
  {h:'10h',r:178},{h:'11h',r:192},{h:'12h',r:110},{h:'13h',r:88},
  {h:'14h',r:210},{h:'15h',r:196},{h:'16h',r:154},{h:'17h',r:98},
  {h:'18h',r:43},{h:'19h',r:21},
]
const pie = [
  {name:'R&D',v:22,color:'#0078d4'},
  {name:'Kế Hoạch',v:18,color:'#00897b'},
  {name:'Công Vụ',v:35,color:'#d97706'},
  {name:'Quản Kho',v:25,color:'#7c3aed'},
]
const responseTimeTrend = [
  {m:'T1',rt:1.8},{m:'T2',rt:1.6},{m:'T3',rt:1.5},{m:'T4',rt:1.4},{m:'T5',rt:1.3},{m:'T6',rt:1.2},
]

const modules = [
  {dept:'R&D',name:'Tạo Formula AI',path:'/rd/formula-gen',status:'Đang dùng',users:8,requests:142,uptime:99.8,trend:+18,badge:'badge-green'},
  {dept:'R&D',name:'Tính Toán Batch',path:'/rd/batch-calc',status:'Đang dùng',users:5,requests:89,uptime:99.5,trend:+7,badge:'badge-green'},
  {dept:'R&D',name:'So Sánh Formula',path:'/rd/formula-compare',status:'Đang dùng',users:4,requests:61,uptime:99.2,trend:+4,badge:'badge-green'},
  {dept:'R&D',name:'Quản Lý BOM',path:'/rd/bom',status:'Đang dùng',users:3,requests:47,uptime:98.9,trend:+2,badge:'badge-green'},
  {dept:'Kế Hoạch',name:'Lịch Sản Xuất',path:'/planning/schedule',status:'Đang dùng',users:4,requests:56,uptime:99.1,trend:+11,badge:'badge-green'},
  {dept:'Công Vụ',name:'Bảo Trì Thiết Bị',path:'/facilities/equipment',status:'Đang dùng',users:12,requests:203,uptime:99.6,trend:+31,badge:'badge-green'},
  {dept:'Công Vụ',name:'Quản Lý Năng Lượng',path:'/facilities/energy',status:'Thử nghiệm',users:3,requests:74,uptime:97.4,trend:+5,badge:'badge-yellow'},
  {dept:'Công Vụ',name:'Hỗ Trợ Sản Xuất',path:'/facilities/production',status:'Đang dùng',users:9,requests:118,uptime:99.3,trend:+14,badge:'badge-green'},
  {dept:'Công Vụ',name:'An Toàn & Rủi Ro',path:'/facilities/safety',status:'Đang dùng',users:6,requests:87,uptime:99.0,trend:+9,badge:'badge-green'},
  {dept:'Công Vụ',name:'Báo Sửa Chữa',path:'/facilities/repair',status:'Đang dùng',users:8,requests:64,uptime:98.7,trend:+6,badge:'badge-green'},
  {dept:'Công Vụ',name:'Tài Liệu & Kiến Thức',path:'/facilities/knowledge',status:'Đang dùng',users:14,requests:156,uptime:99.4,trend:+22,badge:'badge-green'},
  {dept:'Quản Kho',name:'Dịch Thuật AI',path:'/warehouse/translation',status:'Đang dùng',users:15,requests:118,uptime:99.7,trend:+16,badge:'badge-green'},
  {dept:'Quản Kho',name:'Đối Chiếu Excel',path:'/warehouse/reconciliation',status:'Đang dùng',users:6,requests:95,uptime:98.5,trend:+8,badge:'badge-green'},
  {dept:'Quản Kho',name:'Quản Lý Tồn Kho',path:'/warehouse/inventory',status:'Đang dùng',users:7,requests:112,uptime:99.2,trend:+20,badge:'badge-green'},
  {dept:'Quản Kho',name:'Tính Giờ Công',path:'/warehouse/workhour',status:'Đang dùng',users:5,requests:67,uptime:99.0,trend:+5,badge:'badge-green'},
  {dept:'Quản Kho',name:'Theo Dõi Bao Bì',path:'/warehouse/packaging',status:'Đang dùng',users:4,requests:54,uptime:98.8,trend:+4,badge:'badge-green'},
  {dept:'Quản Kho',name:'Thống Kê Tổng Hợp',path:'/warehouse/statistics',status:'Thử nghiệm',users:3,requests:41,uptime:96.8,trend:+3,badge:'badge-yellow'},
  {dept:'Quản Lý',name:'Tính Ngày Giao Hàng',path:'/management/delivery',status:'Thử nghiệm',users:2,requests:31,uptime:97.1,trend:-2,badge:'badge-yellow'},
]

const alerts = [
  {level:'red',  msg:<span><strong>Thiết bị MX-04</strong> – Nhiệt độ động cơ 87°C, vượt ngưỡng an toàn. Dự báo hỏng trong 6–12h nếu không can thiệp.</span>, time:'08:14'},
  {level:'red',  msg:<span><strong>ORD-2611 (NC Chanh)</strong> – Nguy cơ trễ deadline 18/06 do NCC chưa xác nhận nguyên liệu.</span>, time:'07:52'},
  {level:'yellow',msg:<span><strong>Bao bì PET-500ml</strong> – Tồn kho 320 thùng, dưới mức tối thiểu 500. Cần đặt mua trước 11/06.</span>, time:'07:30'},
  {level:'yellow',msg:<span><strong>Hệ thống lọc RO</strong> – Áp suất lọc giảm 18%, dự báo cần thay màng lọc trước 20/06.</span>, time:'06:45'},
  {level:'blue', msg:<span><strong>Lịch sản xuất tuần 24</strong> – Đã được AI tối ưu, chờ phê duyệt từ trưởng BP Kế Hoạch.</span>, time:'06:00'},
  {level:'green',msg:<span><strong>Báo cáo ESG tháng 5</strong> – Xuất thành công. Carbon: 42.3 tCO₂e (giảm 8% so tháng 4).</span>, time:'05:30'},
]

const activity = [
  {user:'Nguyễn Văn A',action:'Tạo formula NC Cam mới v3.2',module:'Formula AI',time:'08:28'},
  {user:'Trần Thị B',action:'Xuất báo cáo tồn kho tuần 23',module:'Tồn Kho',time:'08:15'},
  {user:'Lê Văn C',action:'Cập nhật lịch bảo trì MX-03',module:'Bảo Trì',time:'07:55'},
  {user:'Phạm Thị D',action:'Duyệt lịch sản xuất ORD-2613',module:'Lịch SX',time:'07:40'},
  {user:'Hoàng Văn E',action:'Dịch thuật COA NFC từ Trung Quốc',module:'Dịch Thuật',time:'07:22'},
  {user:'Võ Thị F',action:'Đối chiếu Excel nhập kho lô #448',module:'Đối Chiếu',time:'07:10'},
]

const deptColors = {
  'R&D':'#0078d4','Kế Hoạch':'#00897b','Công Vụ':'#d97706','Quản Kho':'#7c3aed','Quản Lý':'#d13438'
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [filterDept, setFilterDept] = useState('Tất cả')

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  const depts = ['Tất cả', 'R&D', 'Kế Hoạch', 'Công Vụ', 'Quản Kho', 'Quản Lý']
  const filtered = filterDept === 'Tất cả' ? modules : modules.filter(m => m.dept === filterDept)
  const totalReq = modules.reduce((s, m) => s + m.requests, 0)
  const activeUsers = [...new Set(modules.map(m => m.users))].reduce((a, b) => a + b, 0)

  return (
    <div className="sg">
      <div className="ph">
        <div>
          <h1>Tổng Quan Hệ Thống AI</h1>
          <p>Giavico AI Platform · Cập nhật: {now.toLocaleString('vi-VN')}</p>
        </div>
        <div className="fl g8">
          <span className="badge badge-green"><span className="bdot"/> Hệ thống ổn định</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="sg4">
        {[
          {icon:'🧑‍💼',color:'#e8f4fd',ic:'#0078d4',label:'Người dùng hoạt động',val:'54',sub:'▲ +12 so tháng trước',trend:'up'},
          {icon:'⚡',color:'#e8f8e8',ic:'#107c10',label:'Yêu cầu AI hôm nay',val:totalReq.toLocaleString(),sub:'Đỉnh 14:00–15:00 (210 req)'},
          {icon:'📦',color:'#fff4e6',ic:'#d97706',label:'Modules hoạt động',val:`${modules.filter(m=>m.status==='Đang dùng').length}/${modules.length}`,sub:`${modules.filter(m=>m.status==='Thử nghiệm').length} đang thử nghiệm`},
          {icon:'⏱️',color:'#fde7e9',ic:'#107c10',label:'Thời gian phản hồi TB',val:'1.2s',sub:'▼ Giảm 33% so T1/2026',trend:'down'},
        ].map((s,i) => (
          <div className="sc" key={i}>
            <div className="sc-icon" style={{background:s.color}}><span style={{fontSize:18}}>{s.icon}</span></div>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.ic}}>{s.val}</div>
            <div className="sc-sub" style={{color:s.trend==='up'?'#107c10':s.trend==='down'?'#d13438':undefined}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
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
          <div className="fl g16 mt8" style={{flexWrap:'wrap',justifyContent:'center'}}>
            {[{k:'R&D',c:'#0078d4'},{k:'Kế Hoạch',c:'#00897b'},{k:'Công Vụ',c:'#d97706'},{k:'Kho',c:'#7c3aed'}].map(x=>(
              <span key={x.k} className="fl ic g6 tsm"><span className="cdot" style={{background:x.c}}/>{x.k}</span>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">📊 Yêu cầu theo giờ hôm nay</span></div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={hourlyReq} margin={{top:5,right:5,bottom:0,left:-20}}>
              <XAxis dataKey="h" tick={{fontSize:9}} />
              <YAxis tick={{fontSize:11}} />
              <Tooltip />
              <ReferenceLine y={150} stroke="#d97706" strokeDasharray="3 3" />
              <Bar dataKey="r" name="Yêu cầu" radius={[3,3,0,0]}>
                {hourlyReq.map((e,i)=>(
                  <Cell key={i} fill={e.r>=150?'#d97706':e.r>=100?'#0078d4':'#93c5fd'}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="tsm cm mt4">Đường cam = ngưỡng cao (150 req/h)</p>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">🍩 Phân bổ yêu cầu theo bộ phận</span></div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={pie} cx="50%" cy="50%" outerRadius={72} innerRadius={36}
                   dataKey="v" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}
                   labelLine={false} fontSize={11}>
                {pie.map((p,i)=><Cell key={i} fill={p.color}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
          <div className="fl g16 mt4" style={{justifyContent:'center',flexWrap:'wrap'}}>
            {pie.map(p=><span key={p.name} className="fl ic g6 tsm"><span className="cdot" style={{background:p.color}}/>{p.name}</span>)}
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">⏱️ Xu hướng thời gian phản hồi (giây)</span></div>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={responseTimeTrend} margin={{top:5,right:10,bottom:0,left:-20}}>
              <XAxis dataKey="m" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}} domain={[0.8,2.2]}/>
              <Tooltip formatter={v=>`${v}s`}/>
              <ReferenceLine y={2.0} stroke="#d13438" strokeDasharray="4 4" label={{value:'Mục tiêu',fontSize:9,fill:'#d13438'}}/>
              <Line type="monotone" dataKey="rt" stroke="#107c10" strokeWidth={2.5} dot={{r:4,fill:'#107c10'}} name="RT TB"/>
            </LineChart>
          </ResponsiveContainer>
          <div className="fl ic g6 mt4 tsm" style={{justifyContent:'center',color:'#107c10'}}>
            ▼ Giảm từ 1.8s → 1.2s (–33%) trong 6 tháng
          </div>
        </div>
      </div>

      {/* Module table with filter */}
      <div className="card">
        <div className="card-title">
          <span className="card-title-left">📋 Trạng thái modules ({filtered.length})</span>
          <div className="fl g6">
            {depts.map(d=>(
              <button key={d} onClick={()=>setFilterDept(d)}
                style={{padding:'3px 10px',borderRadius:20,border:'1px solid var(--border)',
                  background:filterDept===d?'#0078d4':'transparent',
                  color:filterDept===d?'#fff':'var(--text)',fontSize:11,cursor:'pointer'}}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Bộ phận</th><th>Module</th><th>Trạng thái</th>
                <th>Người dùng</th><th>Req/tháng</th><th>So tháng trước</th>
                <th>Uptime</th><th>Đi đến</th>
              </tr>
            </thead>
            <tbody>{filtered.map((m,i)=>(
              <tr key={i}>
                <td><span className="badge badge-blue" style={{background:deptColors[m.dept]+'22',color:deptColors[m.dept],borderColor:deptColors[m.dept]+'44'}}>{m.dept}</span></td>
                <td className="fw5">{m.name}</td>
                <td><span className={`badge ${m.badge}`}><span className="bdot"/> {m.status}</span></td>
                <td>{m.users}</td>
                <td className="fw5">{m.requests}</td>
                <td style={{color:m.trend>0?'#107c10':m.trend<0?'#d13438':'var(--text)',fontWeight:600}}>
                  {m.trend>0?'▲':m.trend<0?'▼':'–'} {Math.abs(m.trend)}%
                </td>
                <td>
                  <div className="fl ic g6">
                    <div className="pb" style={{width:50}}><div className="pf" style={{width:`${m.uptime}%`,background:m.uptime>=99?'#107c10':'#d97706'}}/></div>
                    <span className="tsm">{m.uptime}%</span>
                  </div>
                </td>
                <td>
                  <button onClick={()=>navigate(m.path)}
                    style={{padding:'2px 8px',borderRadius:4,border:'1px solid var(--border)',
                      background:'transparent',cursor:'pointer',fontSize:11,color:'#0078d4'}}>
                    →
                  </button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* Alerts + Activity */}
      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">🚨 Cảnh báo & Thông báo ({alerts.length})</span></div>
          <div className="sg" style={{gap:7}}>
            {alerts.map((a,i)=>(
              <div key={i} className={`al al-${a.level}`} style={{fontSize:12}}>
                <span style={{marginRight:6,opacity:.6,fontFamily:'monospace',fontSize:11}}>{a.time}</span>
                {a.level==='red'?'🔴':a.level==='yellow'?'⚠️':a.level==='blue'?'ℹ️':'✅'}
                <span style={{marginLeft:6}}>{a.msg}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">🕒 Hoạt động gần đây</span></div>
          <div className="tl">
            {activity.map((a,i)=>(
              <div className="tl-item" key={i}>
                <div className="tl-dot tl-blue" style={{fontSize:9}}>{a.time}</div>
                <div className="tl-body">
                  <div className="tl-title" style={{fontSize:12}}>{a.action}</div>
                  <div className="tl-meta fl ic g8">
                    <span style={{fontWeight:600}}>{a.user}</span>
                    <span className="badge badge-blue" style={{fontSize:9,padding:'0 5px'}}>{a.module}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
