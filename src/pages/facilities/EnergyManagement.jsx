import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line,
         XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from 'recharts'

const daily = [
  {d:'T2',elec:1240,steam:320,air:180,prod:48500},
  {d:'T3',elec:1180,steam:310,air:175,prod:46200},
  {d:'T4',elec:1320,steam:340,air:190,prod:51000},
  {d:'T5',elec:1290,steam:330,air:185,prod:49800},
  {d:'T6',elec:1350,steam:350,air:195,prod:52100},
  {d:'T7',elec:980,steam:260,air:140,prod:38000},
  {d:'CN',elec:420,steam:120,air:80,prod:0},
]

const monthly = [
  {m:'T1',elec:4820,target:5000},{m:'T2',elec:4650,target:4900},
  {m:'T3',elec:5100,target:5000},{m:'T4',elec:4980,target:5000},
  {m:'T5',elec:5250,target:5100},{m:'T6',elec:4780,target:5000},
]

const byLine = [
  {line:'Line 1',elec:2840,steam:980,air:620},
  {line:'Line 2',elec:2210,steam:760,air:480},
  {line:'Line 3',elec:1890,steam:640,air:410},
  {line:'Kho + VP',elec:842,steam:120,air:180},
]

const pie = [
  {name:'Dien',v:58,color:'#0078d4'},
  {name:'Hoi nuoc',v:25,color:'#d97706'},
  {name:'Khi nen',v:17,color:'#00897b'},
]

const scope = [
  {s:'Scope 1 - Dot nhien lieu truc tiep',val:8.2,color:'#d13438',pct:19},
  {s:'Scope 2 - Dien tieu thu',val:28.4,color:'#d97706',pct:67},
  {s:'Scope 3 - Van chuyen & chuoi cung ung',val:5.7,color:'#0078d4',pct:14},
]

export default function EnergyManagement() {
  const [tab, setTab] = useState(0)

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>⚡ Quan Ly Nang Luong & Moi Truong</h1><p>Phan tich tieu thu, de xuat toi uu, tinh phat thai carbon – Ho tro bao cao ESG</p></div>
        <div className="fl g8">
          <button className="btn btn-outline btn-sm">📄 Xuat bao cao ESG</button>
          <button className="btn btn-outline btn-sm">📊 So sanh ky truoc</button>
        </div>
      </div>

      <div className="sg4">
        {[
          {label:'Dien tuan nay (kWh)',val:'7,782',sub:'4.2% so tuan truoc',color:'#0078d4'},
          {label:'Hoi nuoc (GJ)',val:'193',sub:'1.1% so tuan truoc',color:'#d97706'},
          {label:'CO2 phat thai (tCO2e)',val:'42.3',sub:'Thang 6 luy ke',color:'#107c10'},
          {label:'Tiet kiem uoc tinh',val:'2.4M',sub:'Tu toi uu hoa AI',color:'#00897b'},
          {label:'PUE (Power Usage Eff.)',val:'1.08',sub:'Muc tieu: <= 1.10',color:'#0078d4'},
          {label:'Dien dac thu (kWh/thung)',val:'0.028',sub:'4% so thang truoc',color:'#107c10'},
        ].map((s,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color,fontSize:20}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">⚠️ Canh bao bat thuong</span></div>
        <div className="sg" style={{gap:8}}>
          <div className="al al-yellow">⚠️ <span><strong>May nen khi Line 2</strong> – Tieu thu 18% cao hon muc binh thuong luc 14:00-16:00. Co the ro ri duong ong. Kiem tra van tiet luu.</span></div>
          <div className="al al-green">✅ <span><strong>He thong dieu hoa toan nha</strong> – Tiet kiem 6.2 kWh hom nay nho dieu chinh set-point +1°C tu AI tu dong.</span></div>
        </div>
      </div>

      <div className="tabs">
        {['Tong quan','Theo day chuyen','Xu huong thang','ESG & Carbon'].map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>

      {tab===0 && (
        <div className="sg">
          <div className="g2">
            <div className="card">
              <div className="card-title"><span className="card-title-left">📈 Tieu thu nang luong theo ngay (Tuan 24)</span></div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={daily} margin={{left:-20,right:5}}>
                  <XAxis dataKey="d" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
                  <Tooltip/>
                  <Area type="monotone" dataKey="elec" stroke="#0078d4" fill="#deecf9" name="Dien (kWh)" strokeWidth={2}/>
                  <Area type="monotone" dataKey="steam" stroke="#d97706" fill="#fef9c3" name="Hoi nuoc (GJ)" strokeWidth={2}/>
                  <Area type="monotone" dataKey="air" stroke="#00897b" fill="#d0f0eb" name="Khi nen" strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title"><span className="card-title-left">🍩 Co cau nang luong</span></div>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={pie} cx="50%" cy="50%" outerRadius={65} innerRadius={35} dataKey="v"
                    label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} fontSize={11} labelLine={false}>
                    {pie.map((p,i)=><Cell key={i} fill={p.color}/>)}
                  </Pie>
                  <Tooltip formatter={v=>`${v}%`}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="fl g12 mt4" style={{justifyContent:'center'}}>
                {pie.map((p,i)=><span key={i} className="fl ic g6 tsm"><span className="cdot" style={{background:p.color}}/>{p.name}</span>)}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">🤖 De xuat toi uu hoa tu AI</span></div>
            <div className="tl">
              {[
                {color:'tl-blue',icon:'⚡',title:'Dich lich may nen khi sang 22:00-05:00',desc:'Tiet kiem 12% chi phi dien may nen (gio thap diem). Uoc tinh: -890k/thang'},
                {color:'tl-green',icon:'💡',title:'Tat 30% den khu vuc kho chieu chu nhat',desc:'Giam 420 kWh/tuan dua tren du lieu luu luong nguoi'},
                {color:'tl-yellow',icon:'🌡️',title:'Tang set-point dieu hoa khu van phong 1°C',desc:'Giam 6% dien dieu hoa, tiet kiem ~180 kWh/tuan'},
                {color:'tl-blue',icon:'♻️',title:'Thu hoi nhiet tu hoi nuoc thanh trung',desc:'Tai su dung 18% nhiet luong, giam 0.8 tCO2e/thang'},
              ].map((t,i)=>(
                <div className="tl-item" key={i}>
                  <div className={`tl-dot ${t.color}`}>{t.icon}</div>
                  <div className="tl-body"><div className="tl-title">{t.title}</div><div className="tl-meta">{t.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab===1 && (
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">🏭 Tieu thu dien theo day chuyen (Tuan 24, kWh)</span></div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byLine} margin={{left:-20}}>
                <XAxis dataKey="line" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
                <Tooltip/>
                <Bar dataKey="elec" fill="#0078d4" radius={[3,3,0,0]} name="Dien (kWh)"/>
                <Bar dataKey="steam" fill="#d97706" radius={[3,3,0,0]} name="Hoi nuoc (GJ)"/>
                <Bar dataKey="air" fill="#00897b" radius={[3,3,0,0]} name="Khi nen"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Chi tiet tieu thu theo day chuyen</span></div>
            <div className="tw"><table>
              <thead><tr><th>Day chuyen</th><th>Dien (kWh)</th><th>Hoi nuoc (GJ)</th><th>Khi nen</th><th>Tong chi phi (uoc)</th><th>Hieu suat nang luong</th></tr></thead>
              <tbody>{byLine.map((r,i)=>{
                const cost = Math.round((r.elec*2.8 + r.steam*120 + r.air*0.8)/1000)
                const eff = [92,87,89,75][i]
                return (
                  <tr key={i}>
                    <td className="fw5">{r.line}</td>
                    <td className="fw6" style={{color:'#0078d4'}}>{r.elec.toLocaleString()}</td>
                    <td style={{color:'#d97706'}}>{r.steam}</td>
                    <td style={{color:'#00897b'}}>{r.air}</td>
                    <td className="fw5">{cost}K vnd</td>
                    <td>
                      <div className="fl ic g8">
                        <div className="pb" style={{width:60}}><div className="pf" style={{width:`${eff}%`,background:eff>=90?'#107c10':eff>=80?'#d97706':'#d13438'}}/></div>
                        <span className="tsm fw6" style={{color:eff>=90?'#107c10':eff>=80?'#d97706':'#d13438'}}>{eff}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}</tbody>
            </table></div>
          </div>
        </div>
      )}

      {tab===2 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📈 Xu huong tieu thu dien hang thang (kWh/1000)</span></div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthly} margin={{left:-20,right:20}}>
              <XAxis dataKey="m" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
              <Tooltip formatter={v=>`${v*1000} kWh`}/>
              <ReferenceLine y={5000} stroke="#d13438" strokeDasharray="4 3" label={{value:'Muc tieu thang',fontSize:10,fill:'#d13438',position:'right'}}/>
              <Line type="monotone" dataKey="elec" stroke="#0078d4" dot strokeWidth={2.5} name="Tieu thu thuc te"/>
              <Line type="monotone" dataKey="target" stroke="#107c10" dot={false} strokeDasharray="5 3" strokeWidth={1.5} name="Ke hoach"/>
            </LineChart>
          </ResponsiveContainer>
          <div className="g2 mt16">
            {[
              {label:'Trung binh 6 thang',val:'4,930 kWh',color:'#0078d4'},
              {label:'Thang cao nhat',val:'5,250 kWh (T5)',color:'#d13438'},
              {label:'Thang thap nhat',val:'4,650 kWh (T2)',color:'#107c10'},
              {label:'So voi ke hoach',val:'-1.4%',color:'#107c10'},
            ].map((k,i)=>(
              <div key={i} style={{textAlign:'center',background:'var(--bg)',borderRadius:8,padding:'12px 8px',border:'1px solid var(--border)'}}>
                <div style={{fontSize:11,color:'var(--text2)',marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:18,fontWeight:700,color:k.color}}>{k.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab===3 && (
        <div className="sg">
          <div className="g2">
            <div className="card">
              <div className="card-title"><span className="card-title-left">🌱 Phat thai Carbon (tCO2e) – Thang 6/2026</span></div>
              <div className="sg" style={{gap:10}}>
                {scope.map((s,i)=>(
                  <div key={i} style={{padding:'12px 14px',background:'var(--bg)',borderRadius:8,border:'1px solid var(--border)'}}>
                    <div className="tsm cm mb6">{s.s}</div>
                    <div className="fl ic jb">
                      <span style={{fontSize:22,fontWeight:700,color:s.color}}>{s.val} tCO2e</span>
                      <span className="tsm cm">{s.pct}% tong</span>
                    </div>
                    <div className="pb mt6"><div className="pf" style={{width:`${s.pct}%`,background:s.color}}/></div>
                  </div>
                ))}
                <div className="al al-green">✅ Tong thang 6: 42.3 tCO2e – Giam 8% so thang 5. Dang huong toi muc tieu Net-Zero 2035.</div>
              </div>
            </div>
            <div className="card">
              <div className="card-title"><span className="card-title-left">📋 Muc tieu ESG 2026</span></div>
              <div className="sg" style={{gap:10}}>
                {[
                  {target:'Giam tieu thu dien 10% vs 2025',current:72,unit:'%',color:'#0078d4'},
                  {target:'Giam phat thai CO2 15% vs 2025',current:58,unit:'%',color:'#107c10'},
                  {target:'Ty le tai su dung nuoc thai',current:45,unit:'%',color:'#00897b'},
                  {target:'Nang luong tai tao (solar)',current:12,unit:'% san luong',color:'#d97706'},
                ].map((g,i)=>(
                  <div key={i}>
                    <div className="fl jb tsm mb4"><span className="fw5">{g.target}</span><span className="fw6" style={{color:g.color}}>{g.current}{g.unit}</span></div>
                    <div className="pb"><div className="pf" style={{width:`${g.current}%`,background:g.color}}/></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
