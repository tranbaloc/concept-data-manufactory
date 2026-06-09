import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
const daily = [{d:'T2',elec:1240,steam:320,air:180},{d:'T3',elec:1180,steam:310,air:175},{d:'T4',elec:1320,steam:340,air:190},{d:'T5',elec:1290,steam:330,air:185},{d:'T6',elec:1350,steam:350,air:195},{d:'T7',elec:980,steam:260,air:140},{d:'CN',elec:420,steam:120,air:80}]
const pie = [{name:'Điện',v:58},{name:'Hơi nước',v:25},{name:'Khí nén',v:17}]
const COLS = ['#0078d4','#d97706','#00897b']

export default function EnergyManagement() {
  return (
    <div className="sg">
      <div className="ph">
        <div><h1>⚡ Quản Lý Năng Lượng & Môi Trường</h1><p>Phân tích tiêu thụ, đề xuất tối ưu, tính phát thải carbon – Hỗ trợ báo cáo ESG</p></div>
        <button className="btn btn-outline btn-sm">📄 Xuất báo cáo ESG</button>
      </div>

      <div className="sg4">
        {[
          {label:'Điện tuần này (kWh)',val:'7,782',sub:'↓ 4.2% so tuần trước',color:'#0078d4',trend:true},
          {label:'Hơi nước (GJ)',val:'193',sub:'↑ 1.1% so tuần trước',color:'#d97706'},
          {label:'CO₂ phát thải (tCO₂e)',val:'9.8',sub:'Tháng 6 tổng: 42.3t',color:'#107c10'},
          {label:'Tiết kiệm ước tính/tháng',val:'2.4M ₫',sub:'Từ tối ưu hóa AI',color:'#00897b'},
        ].map((s,i)=>(
          <div className="sc" key={i}><div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div></div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">📈 Tiêu thụ năng lượng theo ngày (tuần 24)</span></div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={daily} margin={{left:-20,right:5}}>
              <XAxis dataKey="d" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Area type="monotone" dataKey="elec" stroke="#0078d4" fill="#deecf9" name="Điện (kWh)" strokeWidth={2}/>
              <Area type="monotone" dataKey="steam" stroke="#d97706" fill="#fef9c3" name="Hơi nước (GJ×10)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">🍩 Cơ cấu năng lượng</span></div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart><Pie data={pie} cx="50%" cy="50%" outerRadius={60} dataKey="v" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} fontSize={11} labelLine={false}>
              {pie.map((_,i)=><Cell key={i} fill={COLS[i]}/>)}
            </Pie></PieChart>
          </ResponsiveContainer>
          <div className="fl g12 mt8" style={{justifyContent:'center'}}>
            {pie.map((p,i)=><span key={i} className="fl ic g6 tsm"><span className="cdot" style={{background:COLS[i]}}/>{p.name}</span>)}
          </div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">🤖 Đề xuất tối ưu hóa từ AI</span></div>
          <div className="tl">
            {[
              {color:'tl-blue',icon:'⚡',title:'Dịch lịch máy nén khí sang 22:00–05:00',desc:'Tiết kiệm 12% chi phí điện máy nén (giờ thấp điểm)'},
              {color:'tl-green',icon:'💡',title:'Tắt 30% đèn khu vực kho chiều chủ nhật',desc:'Giảm 420 kWh/tuần dựa trên dữ liệu lưu lượng người'},
              {color:'tl-yellow',icon:'🌡️',title:'Tăng set-point điều hòa khu văn phòng 1°C',desc:'Giảm 6% điện điều hòa, tiết kiệm ~180 kWh/tuần'},
              {color:'tl-blue',icon:'♻️',title:'Thu hồi nhiệt từ hơi nước thanh trùng',desc:'Tái sử dụng 18% nhiệt lượng, giảm 0.8 tCO₂e/tháng'},
            ].map((t,i)=>(
              <div className="tl-item" key={i}>
                <div className={`tl-dot ${t.color}`}>{t.icon}</div>
                <div className="tl-body"><div className="tl-title">{t.title}</div><div className="tl-meta">{t.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title"><span className="card-title-left">🌱 Phát thải Carbon – Báo cáo ESG</span></div>
          <div className="sg" style={{gap:10}}>
            {[
              {scope:'Scope 1 – Đốt nhiên liệu trực tiếp',val:'8.2',unit:'tCO₂e/tháng',color:'#d13438'},
              {scope:'Scope 2 – Điện tiêu thụ',val:'28.4',unit:'tCO₂e/tháng',color:'#d97706'},
              {scope:'Scope 3 – Vận chuyển & chuỗi cung ứng',val:'5.7',unit:'tCO₂e/tháng',color:'#0078d4'},
            ].map((s,i)=>(
              <div key={i} style={{padding:'10px 14px',background:'var(--bg)',borderRadius:6,border:'1px solid var(--border)'}}>
                <div className="tsm cm">{s.scope}</div>
                <div className="fl ic jb mt4">
                  <span style={{fontSize:20,fontWeight:700,color:s.color}}>{s.val}</span>
                  <span className="tsm cm">{s.unit}</span>
                </div>
              </div>
            ))}
            <div className="al al-green">✅ Tổng tháng 6: 42.3 tCO₂e – Giảm 8% so tháng 5. Đang hướng tới mục tiêu Net-Zero 2035.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
