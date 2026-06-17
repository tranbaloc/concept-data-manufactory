import { useState } from 'react'
import { useLang } from '../../i18n/context'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
         ResponsiveContainer, ReferenceLine, Cell } from 'recharts'

const equipment = [
  {id:'MX-01',name:'Máy chiết Line 1',type:'Máy chiết rót',status:'Tốt',
   temp:62,vibration:0.8,current:42,health:96,pressure:3.2,
   next:'25/08/2026',risk:'Thấp',lastMaint:'10/03/2026',
   mttr:1.2,mtbf:720,uptime:99.1,totalOps:'2,840h',
   history:[
     {date:'10/03/2026',type:'Định kỳ',tech:'Nguyễn Văn A',duration:'4h',parts:'Lọc dầu, ron cao su',result:'Hoàn thành'},
     {date:'14/01/2026',type:'Định kỳ',tech:'Lê Văn C',duration:'3h',parts:'Bi bơm, dây curoa',result:'Hoàn thành'},
     {date:'02/11/2025',type:'Khẩn cấp',tech:'Nguyễn Văn A',duration:'6h',parts:'Van điều áp',result:'Hoàn thành'},
     {date:'20/08/2025',type:'Định kỳ',tech:'Trần Thị B',duration:'3.5h',parts:'Dầu bôi trơn',result:'Hoàn thành'},
   ],
   tasks:[{date:'25/08/2026',desc:'Thay lọc dầu + kiểm tra van định kỳ',priority:'Thấp'}]},
  {id:'MX-02',name:'Máy ghép nắp',type:'Thiết bị đóng gói',status:'Tốt',
   temp:58,vibration:0.6,current:38,health:91,pressure:2.8,
   next:'10/07/2026',risk:'Thấp',lastMaint:'05/04/2026',
   mttr:1.8,mtbf:600,uptime:98.5,totalOps:'2,110h',
   history:[
     {date:'05/04/2026',type:'Định kỳ',tech:'Lê Văn C',duration:'2h',parts:'Đầu ghép nắp',result:'Hoàn thành'},
     {date:'08/01/2026',type:'Định kỳ',tech:'Nguyễn Văn A',duration:'3h',parts:'Dây đai truyền động',result:'Hoàn thành'},
   ],
   tasks:[{date:'10/07/2026',desc:'Kiểm tra momen ghép + hiệu chỉnh áp lực',priority:'Thấp'}]},
  {id:'MX-03',name:'Máy dán nhãn',type:'Thiết bị đóng gói',status:'Cảnh báo',
   temp:71,vibration:1.4,current:51,health:74,pressure:2.1,
   next:'15/06/2026',risk:'Trung bình',lastMaint:'12/02/2026',
   mttr:3.2,mtbf:380,uptime:95.8,totalOps:'1,820h',
   history:[
     {date:'12/02/2026',type:'Định kỳ',tech:'Trần Thị B',duration:'4h',parts:'Ổ bi trục chính',result:'Hoàn thành'},
     {date:'25/11/2025',type:'Khẩn cấp',tech:'Nguyễn Văn A',duration:'5h',parts:'Bộ căng nhãn',result:'Hoàn thành'},
     {date:'10/09/2025',type:'Định kỳ',tech:'Lê Văn C',duration:'3h',parts:'Bộ cấp nhãn',result:'Hoàn thành'},
     {date:'22/06/2025',type:'Khẩn cấp',tech:'Trần Thị B',duration:'8h',parts:'Motor truyền động',result:'Thay mới'},
   ],
   tasks:[
     {date:'15/06/2026',desc:'Thay ổ bi trục chính – độ rung vượt ngưỡng 1.4mm/s',priority:'Cao'},
     {date:'20/06/2026',desc:'Hiệu chỉnh hệ thống căng nhãn PET 330ml',priority:'Trung bình'},
   ]},
  {id:'MX-04',name:'Máy chiết Line 2',type:'Máy chiết rót',status:'Nguy hiểm',
   temp:87,vibration:2.1,current:68,health:52,pressure:4.8,
   next:'Ngay hôm nay',risk:'Cao',lastMaint:'01/05/2026',
   mttr:5.8,mtbf:210,uptime:88.4,totalOps:'3,150h',
   history:[
     {date:'01/05/2026',type:'Khẩn cấp',tech:'Nguyễn Văn A',duration:'7h',parts:'Bơm tuần hoàn, cảm biến nhiệt',result:'Hoàn thành'},
     {date:'10/03/2026',type:'Định kỳ',tech:'Lê Văn C',duration:'5h',parts:'Vòng bi bơm',result:'Hoàn thành'},
     {date:'15/01/2026',type:'Khẩn cấp',tech:'Nguyễn Văn A',duration:'9h',parts:'Motor bơm chiết',result:'Thay mới'},
     {date:'20/11/2025',type:'Khẩn cấp',tech:'Trần Thị B',duration:'6h',parts:'Van điện từ x3',result:'Hoàn thành'},
   ],
   tasks:[
     {date:'Hôm nay',desc:'KHẨN: Dừng máy kiểm tra – nhiệt độ 87°C, nguy cơ hư hỏng motor',priority:'Khẩn'},
     {date:'12/06/2026',desc:'Thay cảm biến nhiệt mới + kiểm tra hệ thống làm mát',priority:'Cao'},
   ]},
  {id:'MX-05',name:'Băng chuyền chính',type:'Hệ thống vận chuyển',status:'Tốt',
   temp:55,vibration:0.5,current:35,health:98,pressure:0,
   next:'01/12/2026',risk:'Thấp',lastMaint:'15/01/2026',
   mttr:0.8,mtbf:960,uptime:99.7,totalOps:'4,200h',
   history:[
     {date:'15/01/2026',type:'Định kỳ',tech:'Trần Thị B',duration:'2h',parts:'Dây curoa, căng xích',result:'Hoàn thành'},
   ],
   tasks:[{date:'01/12/2026',desc:'Kiểm tra toàn bộ hệ thống dây curoa + bôi trơn',priority:'Thấp'}]},
  {id:'MX-06',name:'Hệ thống lọc nước RO',type:'Hệ thống tiện ích',status:'Cảnh báo',
   temp:43,vibration:0.3,current:28,health:68,pressure:5.5,
   next:'20/06/2026',risk:'Trung bình',lastMaint:'15/03/2026',
   mttr:4.1,mtbf:450,uptime:94.2,totalOps:'6,800h',
   history:[
     {date:'15/03/2026',type:'Định kỳ',tech:'Nguyễn Văn A',duration:'6h',parts:'Màng lọc RO x4 cái',result:'Thay mới'},
     {date:'20/12/2025',type:'Định kỳ',tech:'Trần Thị B',duration:'4h',parts:'Lọc tiền xử lý',result:'Hoàn thành'},
     {date:'10/09/2025',type:'Khẩn cấp',tech:'Nguyễn Văn A',duration:'8h',parts:'Bơm áp cao',result:'Thay mới'},
   ],
   tasks:[
     {date:'20/06/2026',desc:'Thay màng lọc RO – áp suất lọc giảm 18% so thiết kế',priority:'Cao'},
     {date:'25/06/2026',desc:'Vệ sinh bể chứa nước sạch định kỳ 3 tháng',priority:'Trung bình'},
   ]},
]

const tempData = Array.from({length:12},(_,i)=>({
  t:`${7+i}h`,mx01:60+Math.sin(i*0.5)*4,
  mx03:66+i*0.5+Math.sin(i)*1.5,mx04:72+i*1.5+Math.sin(i)*1,
}))

const healthColor = h => h>=90?'#107c10':h>=70?'#d97706':'#d13438'

const T = {
  vi: {
    title: '🔧 Bảo Trì & Quản Lý Thiết Bị',
    subtitle: 'Predictive Maintenance – AI phân tích cảm biến, phát hiện bất thường, dự báo tuổi thọ',
    tabs: ['📊 Cảm biến thực tế', '📋 Lịch bảo trì'],
    kpi: ['Thiết bị hoạt động','Cảnh báo bất thường','Nguy hiểm cao','Uptime trung bình'],
    kpiSub: ['2 đang bảo trì','Cần xem xét ngay','MX-04 vượt ngưỡng','Mục tiêu >= 98%'],
    deviceTabs: ['Lịch sử sửa chữa','Công việc sắp tới','Thông số cảm biến'],
    outerTabs: ['Danh sách thiết bị','Biểu đồ nhiệt độ','Lịch bảo trì'],
    lHealth: 'Sức khỏe',
    lUptime: 'Uptime',
    lMTTR: 'MTTR',
    lMTBF: 'MTBF',
    lTemp: 'Nhiệt độ',
    lVib: 'Độ rung',
    lCurrent: 'Dòng điện',
    thName: 'Tên thiết bị',
    thType: 'Loại',
    thStatus: 'Trạng thái',
    thHealth: 'Sức khỏe',
    thUptime: 'Uptime',
    thAlert: 'Cảnh báo',
    thNext: 'Bảo trì tiếp',
  },
  zh: {
    title: '🔧 设备维护与管理',
    subtitle: '预测性维护 – AI分析传感器，检测异常，预测使用寿命',
    tabs: ['📊 实时传感器', '📋 维护计划'],
    kpi: ['设备运行中','异常警报','高危险','平均在线率'],
    kpiSub: ['2台维护中','需立即查看','MX-04超阈值','目标 >= 98%'],
    deviceTabs: ['维修历史','待办任务','传感器数据'],
    outerTabs: ['设备列表','温度图表','维护计划'],
    lHealth: '健康度',
    lUptime: '在线率',
    lMTTR: 'MTTR',
    lMTBF: 'MTBF',
    lTemp: '温度',
    lVib: '振动',
    lCurrent: '电流',
    thName: '设备名称',
    thType: '类型',
    thStatus: '状态',
    thHealth: '健康度',
    thUptime: '在线率',
    thAlert: '告警',
    thNext: '下次维护',
  },
}

export default function EquipmentMaintenance() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState(0)
  const [viewTab, setViewTab] = useState(0)
  const device = equipment.find(e=>e.id===selected)

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div>
        <div className="fl g8">
          <button className="btn btn-primary btn-sm">+ Tạo phiếu bảo trì</button>
          <button className="btn btn-outline btn-sm">📊 Báo cáo định kỳ</button>
        </div>
      </div>
      <div className="sg4">
        {[
          {label:tx.kpi[0],val:'18/20',sub:tx.kpiSub[0],color:'#107c10'},
          {label:tx.kpi[1],val:'3',sub:tx.kpiSub[1],color:'#d97706'},
          {label:tx.kpi[2],val:'1',sub:tx.kpiSub[2],color:'#d13438'},
          {label:tx.kpi[3],val:'96.3%',sub:tx.kpiSub[3],color:'#0078d4'},
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
          <div className="al al-red">🔴 <span><strong>MX-04 (Máy chiết Line 2)</strong> – Nhiệt độ 87°C (ngưỡng: 75°C). Độ rung 2.1mm/s. Dự báo hỏng trong 6-12h. <strong style={{cursor:'pointer',color:'#d13438',textDecoration:'underline'}} onClick={()=>setSelected('MX-04')}>Xem chi tiết →</strong></span></div>
          <div className="al al-yellow">⚠️ <span><strong>MX-03 (Máy dán nhãn)</strong> – Độ rung 1.4mm/s (ngưỡng: 1.2mm/s). Lên lịch 15/06. <strong style={{cursor:'pointer',color:'#d97706',textDecoration:'underline'}} onClick={()=>setSelected('MX-03')}>Xem chi tiết →</strong></span></div>
          <div className="al al-yellow">⚠️ <span><strong>MX-06 (Lọc nước RO)</strong> – Áp suất 5.5 bar (thiết kế: 4.8 bar), giảm 18% lưu lượng. Cần thay màng lọc trước 20/06.</span></div>
        </div>
      </div>
      {device && (
        <div className="card" style={{border:`2px solid ${healthColor(device.health)}44`}}>
          <div className="card-title" style={{borderBottom:'1px solid var(--border)',paddingBottom:12,marginBottom:12}}>
            <div>
              <div className="fl ic g8">
                <span className="card-title-left">{device.id} – {device.name}</span>
                <span className={`badge ${device.status==='Tốt'?'badge-green':device.status==='Cảnh báo'?'badge-yellow':'badge-red'}`}>{device.status}</span>
                <span className={`badge ${device.risk==='Cao'?'badge-red':device.risk==='Trung bình'?'badge-yellow':'badge-green'}`}>Rủi ro: {device.risk}</span>
              </div>
              <p className="tsm cm mt4">{device.type} · Vận hành: {device.totalOps} · Bảo trì gần nhất: {device.lastMaint}</p>
            </div>
            <button onClick={()=>setSelected(null)} style={{border:'none',background:'#f1f5f9',borderRadius:6,padding:'4px 12px',cursor:'pointer',fontSize:12}}>✕ Đóng</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:16}}>
            {[
              {label:tx.lHealth,val:`${device.health}%`,color:healthColor(device.health)},
              {label:tx.lUptime,val:`${device.uptime}%`,color:'#0078d4'},
              {label:tx.lMTTR,val:`${device.mttr}h`,color:'#d97706'},
              {label:tx.lMTBF,val:`${device.mtbf}h`,color:'#107c10'},
              {label:'Nhiệt độ',val:`${device.temp}°C`,color:device.temp>75?'#d13438':device.temp>65?'#d97706':'#107c10'},
            ].map((k,i)=>(
              <div key={i} style={{textAlign:'center',background:'var(--bg)',borderRadius:8,padding:'10px 8px',border:'1px solid var(--border)'}}>
                <div style={{fontSize:11,color:'var(--text2)',marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:20,fontWeight:700,color:k.color}}>{k.val}</div>
              </div>
            ))}
          </div>
          <div className="fl ic g8 mb12">
            <span className="tsm fw6">Sức khỏe:</span>
            <div className="pb" style={{flex:1,height:10,borderRadius:6}}>
              <div className="pf" style={{width:`${device.health}%`,height:10,borderRadius:6,background:healthColor(device.health)}}/>
            </div>
            <span className="fw6" style={{color:healthColor(device.health)}}>{device.health}%</span>
          </div>
          <div className="tabs" style={{marginBottom:12}}>
            {tx.deviceTabs.map((t,i)=>(
              <div key={i} className={`tab ${viewTab===i?'active':''}`} onClick={()=>setViewTab(i)} style={{fontSize:12}}>{t}</div>
            ))}
          </div>
          {viewTab===0 && (
            <div className="tw"><table>
              <thead><tr><th>Ngày</th><th>Loại</th><th>Kỹ thuật viên</th><th>Thời gian</th><th>Linh kiện</th><th>Kết quả</th></tr></thead>
              <tbody>{device.history.map((h,i)=>(
                <tr key={i}>
                  <td className="fw5 tsm">{h.date}</td>
                  <td><span className={`badge ${h.type==='Khẩn cấp'?'badge-red':'badge-blue'}`}>{h.type}</span></td>
                  <td>{h.tech}</td><td>{h.duration}</td>
                  <td className="tsm">{h.parts}</td>
                  <td><span className="badge badge-green">{h.result}</span></td>
                </tr>
              ))}</tbody>
            </table></div>
          )}
          {viewTab===1 && (
            <div className="sg" style={{gap:8}}>
              {device.tasks.map((t,i)=>(
                <div key={i} className={`al al-${t.priority==='Khẩn'||t.priority==='Cao'?'red':t.priority==='Trung bình'?'yellow':'blue'}`}>
                  <div>
                    <div className="fw6">{t.date} – {t.desc}</div>
                    <div className="fl ic g6 mt4">
                      <span className={`badge ${t.priority==='Khẩn'||t.priority==='Cao'?'badge-red':t.priority==='Trung bình'?'badge-yellow':'badge-gray'}`}>Ưu tiên: {t.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {viewTab===2 && (
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {[
                {label:'Nhiệt độ (°C)',val:device.temp,max:100,warn:65,danger:75,unit:'°C'},
                {label:'Độ rung (mm/s)',val:device.vibration,max:3,warn:1.0,danger:1.2,unit:'mm/s'},
                {label:'Dòng điện (A)',val:device.current,max:80,warn:50,danger:60,unit:'A'},
              ].map((s,i)=>(
                <div key={i} style={{border:'1px solid var(--border)',borderRadius:8,padding:12}}>
                  <div className="tsm fw6 mb8">{s.label}</div>
                  <div style={{fontSize:28,fontWeight:700,color:s.val>=s.danger?'#d13438':s.val>=s.warn?'#d97706':'#107c10'}}>{s.val}{s.unit}</div>
                  <div className="pb mt8" style={{height:8,borderRadius:4}}>
                    <div className="pf" style={{width:`${(s.val/s.max)*100}%`,height:8,borderRadius:4,background:s.val>=s.danger?'#d13438':s.val>=s.warn?'#d97706':'#107c10'}}/>
                  </div>
                  <div className="fl jb tsm mt4" style={{opacity:.6}}>
                    <span>0</span><span>Ngưỡng: {s.warn}</span><span>{s.max}{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="tabs">
        {tx.outerTabs.map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>
      {tab===0 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📋 Danh sách thiết bị</span></div>
          <div className="tw"><table>
            <thead><tr><th>ID</th><th>Tên thiết bị</th><th>Loại</th><th>Sức khỏe</th><th>Nhiệt độ</th><th>Độ rung</th><th>Uptime</th><th>Bảo trì tiếp</th><th>Rủi ro</th></tr></thead>
            <tbody>{equipment.map((e,i)=>(
              <tr key={i} onClick={()=>setSelected(e.id===selected?null:e.id)} style={{cursor:'pointer',background:e.id===selected?'#e8f4fd':undefined}}>
                <td className="fw5 tb">{e.id}</td><td className="fw5">{e.name}</td><td className="tsm">{e.type}</td>
                <td>
                  <div className="fl ic g8">
                    <div className="pb" style={{width:60}}><div className="pf" style={{width:`${e.health}%`,background:healthColor(e.health)}}/></div>
                    <span className="tsm fw6" style={{color:healthColor(e.health)}}>{e.health}%</span>
                  </div>
                </td>
                <td><span style={{color:e.temp>75?'#d13438':e.temp>65?'#d97706':'var(--text)',fontWeight:600}}>{e.temp}°C</span></td>
                <td><span style={{color:e.vibration>1.2?'#d13438':e.vibration>1.0?'#d97706':'var(--text)',fontWeight:600}}>{e.vibration}</span></td>
                <td>{e.uptime}%</td><td className="tsm">{e.next}</td>
                <td><span className={`badge ${e.risk==='Cao'?'badge-red':e.risk==='Trung bình'?'badge-yellow':'badge-green'}`}>{e.risk}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
          <p className="tsm cm mt8">💡 Click vào hàng để xem lịch sử bảo trì chi tiết</p>
        </div>
      )}
      {tab===1 && (
        <div className="g2">
          <div className="card">
            <div className="card-title"><span className="card-title-left">🌡️ Nhiệt độ động cơ theo giờ hôm nay</span></div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={tempData} margin={{left:-20,right:10}}>
                <XAxis dataKey="t" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}} domain={[40,100]}/>
                <Tooltip/>
                <ReferenceLine y={75} stroke="#d13438" strokeDasharray="4 4" label={{value:'Nguy hiểm 75°C',fontSize:10,fill:'#d13438',position:'right'}}/>
                <ReferenceLine y={65} stroke="#d97706" strokeDasharray="3 3" label={{value:'Cảnh báo 65°C',fontSize:10,fill:'#d97706',position:'right'}}/>
                <Line type="monotone" dataKey="mx01" stroke="#107c10" dot={false} name="MX-01" strokeWidth={2}/>
                <Line type="monotone" dataKey="mx03" stroke="#d97706" dot={false} name="MX-03" strokeWidth={2}/>
                <Line type="monotone" dataKey="mx04" stroke="#d13438" dot={false} name="MX-04" strokeWidth={2.5}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">💊 Chỉ số sức khỏe thiết bị</span></div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={equipment} layout="vertical" margin={{left:10,right:40}}>
                <XAxis type="number" domain={[0,100]} tick={{fontSize:11}}/><YAxis type="category" dataKey="id" tick={{fontSize:11}} width={45}/>
                <Tooltip formatter={v=>`${v}%`}/>
                <ReferenceLine x={70} stroke="#d97706" strokeDasharray="3 3"/>
                <ReferenceLine x={90} stroke="#107c10" strokeDasharray="3 3"/>
                <Bar dataKey="health" name="Sức khỏe" radius={[0,4,4,0]}>
                  {equipment.map((e,i)=><Cell key={i} fill={healthColor(e.health)}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {tab===2 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📅 Lịch bảo trì tháng 6-8/2026</span></div>
          <div className="tw"><table>
            <thead><tr><th>Thiết bị</th><th>Ngày dự kiến</th><th>Loại bảo trì</th><th>Ưu tiên</th><th>Kỹ thuật viên</th><th>Thời gian</th></tr></thead>
            <tbody>
              {[
                {dev:'MX-04',date:'Hôm nay',type:'Khẩn cấp – Dừng máy kiểm tra nhiệt',prior:'Khẩn',tech:'Nguyễn Văn A',dur:'6-8h'},
                {dev:'MX-03',date:'15/06/2026',type:'Thay ổ bi trục chính',prior:'Cao',tech:'Lê Văn C',dur:'4h'},
                {dev:'MX-06',date:'20/06/2026',type:'Thay màng lọc RO',prior:'Cao',tech:'Nguyễn Văn A',dur:'6h'},
                {dev:'MX-02',date:'10/07/2026',type:'Kiểm tra momen ghép định kỳ',prior:'Thấp',tech:'Lê Văn C',dur:'2h'},
                {dev:'MX-01',date:'25/08/2026',type:'Bảo dưỡng định kỳ 6 tháng',prior:'Thấp',tech:'Trần Thị B',dur:'4h'},
                {dev:'MX-05',date:'01/12/2026',type:'Kiểm tra dây curoa + bôi trơn',prior:'Thấp',tech:'Trần Thị B',dur:'2h'},
              ].map((r,i)=>(
                <tr key={i}>
                  <td className="fw5 tb">{r.dev}</td><td className="fw5">{r.date}</td><td>{r.type}</td>
                  <td><span className={`badge ${r.prior==='Khẩn'||r.prior==='Cao'?'badge-red':'badge-gray'}`}>{r.prior}</span></td>
                  <td>{r.tech}</td><td>{r.dur}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      )}
    </div>
  )
}
