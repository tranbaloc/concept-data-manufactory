import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useLang } from '../../i18n/context'

const orders = [
  {id:'ORD-2608',product:'NC Cam 500ml',qty:35000,done:35000,deadline:'08/06',priority:'Cao',status:'Hoan thanh',line:'Line 2',oee:91,
   steps:[
     {step:'Pha che',start:'06:00',end:'08:30',status:'done',worker:'Phong R&D'},
     {step:'Chiet rot',start:'08:30',end:'14:00',status:'done',worker:'Line 2'},
     {step:'Dan nhan',start:'14:00',end:'16:30',status:'done',worker:'Line 2'},
     {step:'Dong thung',start:'16:30',end:'18:00',status:'done',worker:'Nhom dong goi'},
   ]},
  {id:'ORD-2610',product:'NC Cam 330ml',qty:50000,done:32000,deadline:'16/06',priority:'Cao',status:'Dang SX',line:'Line 1',oee:88,
   steps:[
     {step:'Pha che',start:'06:00',end:'08:00',status:'done',worker:'Phong R&D'},
     {step:'Chiet rot',start:'08:00',end:'16:00',status:'active',worker:'Line 1 - dang chay'},
     {step:'Dan nhan',start:'16:00',end:'18:30',status:'pending',worker:'Line 1'},
     {step:'Dong thung',start:'18:30',end:'20:00',status:'pending',worker:'Nhom dong goi'},
   ]},
  {id:'ORD-2611',product:'NC Chanh 500ml',qty:30000,done:0,deadline:'18/06',priority:'Cao',status:'Cho NVL',line:'Line 2',oee:0,
   steps:[
     {step:'Pha che',start:'Cho NFC 65Brix',end:'',status:'blocked',worker:'Phong R&D'},
     {step:'Chiet rot',start:'',end:'',status:'pending',worker:'Line 2'},
     {step:'Dan nhan',start:'',end:'',status:'pending',worker:'Line 2'},
     {step:'Dong thung',start:'',end:'',status:'pending',worker:'Nhom dong goi'},
   ]},
  {id:'ORD-2612',product:'NC Dua 1L',qty:20000,done:0,deadline:'20/06',priority:'TB',status:'Ke hoach',line:'Line 3',oee:0,
   steps:[
     {step:'Pha che',start:'11/06 06:00',end:'11/06 08:00',status:'pending',worker:'Phong R&D'},
     {step:'Chiet rot',start:'11/06 08:00',end:'13/06 16:00',status:'pending',worker:'Line 3'},
     {step:'Dan nhan',start:'13/06 16:00',end:'14/06 10:00',status:'pending',worker:'Line 3'},
     {step:'Dong thung',start:'14/06 10:00',end:'14/06 16:00',status:'pending',worker:'Nhom dong goi'},
   ]},
  {id:'ORD-2613',product:'Oi Ep 330ml',qty:40000,done:18500,deadline:'17/06',priority:'Cao',status:'Dang SX',line:'Line 1',oee:85,
   steps:[
     {step:'Pha che',start:'06:00',end:'07:30',status:'done',worker:'Phong R&D'},
     {step:'Chiet rot',start:'07:30',end:'14:00',status:'active',worker:'Line 1'},
     {step:'Dan nhan',start:'14:00',end:'17:00',status:'pending',worker:'Line 1'},
     {step:'Dong thung',start:'17:00',end:'19:00',status:'pending',worker:'Nhom dong goi'},
   ]},
  {id:'ORD-2614',product:'Chanh Muoi 500ml',qty:25000,done:0,deadline:'22/06',priority:'Thap',status:'Ke hoach',line:'Line 2',oee:0,
   steps:[
     {step:'Pha che',start:'14/06 06:00',end:'14/06 08:00',status:'pending',worker:'Phong R&D'},
     {step:'Chiet rot',start:'14/06 08:00',end:'16/06 16:00',status:'pending',worker:'Line 2'},
     {step:'Dan nhan',start:'16/06 16:00',end:'17/06 10:00',status:'pending',worker:'Line 2'},
     {step:'Dong thung',start:'17/06 10:00',end:'17/06 16:00',status:'pending',worker:'Nhom dong goi'},
   ]},
  {id:'ORD-2615',product:'NC Buoi 330ml',qty:28000,done:0,deadline:'24/06',priority:'TB',status:'Ke hoach',line:'Line 3',oee:0,
   steps:[
     {step:'Pha che',start:'16/06 06:00',end:'16/06 08:00',status:'pending',worker:'Phong R&D'},
     {step:'Chiet rot',start:'16/06 08:00',end:'19/06 16:00',status:'pending',worker:'Line 3'},
     {step:'Dan nhan',start:'19/06 16:00',end:'20/06 10:00',status:'pending',worker:'Line 3'},
     {step:'Dong thung',start:'20/06 10:00',end:'20/06 16:00',status:'pending',worker:'Nhom dong goi'},
   ]},
]

const ganttBars = [
  {task:'Line 1 – NC Cam 330ml',start:0,dur:5,pct:64,color:'#0078d4',ord:'ORD-2610'},
  {task:'Line 1 – Oi Ep 330ml',start:0,dur:6,pct:46,color:'#2196f3',ord:'ORD-2613'},
  {task:'Line 2 – NC Chanh 500ml',start:2,dur:5,pct:0,color:'#d13438',ord:'ORD-2611'},
  {task:'Line 2 – Chanh Muoi 500ml',start:5,dur:3,pct:0,color:'#43a047',ord:'ORD-2614'},
  {task:'Line 3 – NC Dua 1L',start:1,dur:4,pct:0,color:'#d97706',ord:'ORD-2612'},
  {task:'Line 3 – NC Buoi 330ml',start:6,dur:4,pct:0,color:'#ff7043',ord:'ORD-2615'},
]

const days = ['T2 9/6','T3 10/6','T4 11/6','T5 12/6','T6 13/6','T7 14/6','CN 15/6']

const resourceData = [
  {r:'Line 1',actual:88},{r:'Line 2',actual:65},{r:'Line 3',actual:72},
  {r:'Nguyen lieu',actual:78},{r:'Bao bi',actual:95},{r:'Nhan luc',actual:87},
]

const simulate = [
  {scenario:'Giu nguyen ke hoach',efficiency:82,delay:2,cost:100,risk:'Cao'},
  {scenario:'Tang ca T7 Line 1',efficiency:91,delay:0,cost:108,risk:'Thap'},
  {scenario:'Chuyen ORD-2611 sang Line 3',efficiency:88,delay:1,cost:103,risk:'Trung binh'},
  {scenario:'Thue them 6 nhan cong',efficiency:94,delay:0,cost:115,risk:'Thap'},
]

const oeeData = [
  {ca:'Ca1 T2',line1:88,line2:72,line3:80},{ca:'Ca2 T2',line1:91,line2:68,line3:75},
  {ca:'Ca1 T3',line1:85,line2:0,line3:82},{ca:'Ca2 T3',line1:90,line2:0,line3:78},
  {ca:'Ca1 T4',line1:87,line2:0,line3:71},
]

const statusColor = s=>({
  'Hoan thanh':'badge-green','Dang SX':'badge-blue',
  'Cho NVL':'badge-red','Ke hoach':'badge-gray','Cho':'badge-gray'
}[s]||'badge-gray')

const rcColor = v=>v>=90?'#107c10':v>=75?'#d97706':'#d13438'

const T = {
  vi: {
    title: '📅 Lịch Sản Xuất AI',
    subtitle: 'Tự động lập lịch · Quản lý nguồn lực · Mô phỏng kịch bản tối ưu',
    tabs: ['📋 Kế hoạch tuần', '📊 Biểu đồ Gantt', '🤖 AI kịch bản'],
    thOrder: 'Mã ĐH', thProduct: 'Sản phẩm', thQty: 'Số lượng', thProgress: 'Tiến độ',
    thDeadline: 'Deadline', thPriority: 'Ưu tiên', thStatus: 'Trạng thái', thLine: 'Line', thOEE: 'OEE',
    thScenario: 'Kịch bản', thEff: 'Hiệu suất', thRisk: 'Đơn nguy cơ trễ', thCost: 'Chi phí', thRiskLevel: 'Rủi ro', thAI: 'AI đề xuất',
    kpi: ['Đơn hàng tuần 24','Công suất trung bình','Nguy cơ trễ deadline','OEE Line 1 hôm nay'],
    kpiSub: ['3 đang sản xuất','Mục tiêu: 90%','ORD-2611, ORD-2613','3% so hôm qua'],
    outerTabs: ['📋 Kế hoạch tuần','📊 Biểu đồ Gantt','🤖 AI kịch bản'],
    lPlan: 'Kế hoạch',
    lDone: 'Đã sản xuất',
    lRemain: 'Còn lại',
    lOEE: 'OEE',
    jsTabs: ['Lich Gantt','Danh sach don','Nguon luc & OEE','Mo phong kich ban'],
  },
  zh: {
    title: '📅 AI生产排程',
    subtitle: '自动排程 · 资源管理 · 最优情景模拟',
    tabs: ['📋 周计划', '📊 甘特图', '🤖 AI情景'],
    thOrder: '订单编号', thProduct: '产品', thQty: '数量', thProgress: '进度',
    thDeadline: '截止日期', thPriority: '优先级', thStatus: '状态', thLine: '产线', thOEE: 'OEE',
    thScenario: '情景', thEff: '效率', thRisk: '延误风险订单', thCost: '成本', thRiskLevel: '风险', thAI: 'AI建议',
    kpi: ['第24周订单','平均产能','截止日期风险','今日产线1 OEE'],
    kpiSub: ['3个生产中','目标: 90%','ORD-2611, ORD-2613','较昨日+3%'],
    outerTabs: ['📋 周计划','📊 甘特图','🤖 AI情景'],
    lPlan: '计划',
    lDone: '已生产',
    lRemain: '剩余',
    lOEE: 'OEE',
    jsTabs: ['甘特图','订单列表','资源与OEE','情景模拟'],
  },
}

export default function ProductionSchedule() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState(null)
  const order = orders.find(o=>o.id===selected)

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div>
        <div className="fl g8">
          <button className="btn btn-primary btn-sm">🤖 Toi uu lai lich</button>
          <button className="btn btn-outline btn-sm">📥 Xuat Excel</button>
        </div>
      </div>
      <div className="sg4">
        {[
          {label:tx.kpi[0],val:'7',sub:tx.kpiSub[0],color:'#0078d4'},
          {label:tx.kpi[1],val:'87%',sub:tx.kpiSub[1],color:'#d97706'},
          {label:tx.kpi[2],val:'2',sub:tx.kpiSub[2],color:'#d13438'},
          {label:tx.kpi[3],val:'88%',sub:tx.kpiSub[3],color:'#107c10'},
        ].map((s,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title"><span className="card-title-left">🚨 Canh bao san xuat</span></div>
        <div className="sg" style={{gap:8}}>
          <div className="al al-red">🔴 <span><strong>ORD-2611 (NC Chanh 500ml)</strong> – Bi chan boi thieu NFC 65Brix. Deadline 18/06. Lead time NCC: 14 ngay. Can quyet dinh ngay hom nay.</span></div>
          <div className="al al-yellow">⚠️ <span><strong>Line 2</strong> – Bao tri dinh ky 13/06 xung dot voi ke hoach san xuat. AI de xuat chuyen sang Line 3 hoac tang ca T4.</span></div>
          <div className="al al-green">✅ <span><strong>ORD-2610 + ORD-2613</strong> – Tien do dung ke hoach. Du kien hoan thanh truoc deadline 1 ngay.</span></div>
        </div>
      </div>
      {order && (
        <div className="card" style={{border:'2px solid #0078d444'}}>
          <div className="card-title" style={{borderBottom:'1px solid var(--border)',paddingBottom:12,marginBottom:12}}>
            <div>
              <div className="fl ic g8">
                <span className="card-title-left">{order.id} – {order.product}</span>
                <span className={`badge ${statusColor(order.status)}`}>{order.status}</span>
                <span className={`badge ${order.priority==='Cao'?'badge-red':order.priority==='TB'?'badge-yellow':'badge-gray'}`}>Uu tien: {order.priority}</span>
              </div>
              <p className="tsm cm mt4">Deadline: {order.deadline} · {order.line}</p>
            </div>
            <button onClick={()=>setSelected(null)} style={{border:'none',background:'#f1f5f9',borderRadius:6,padding:'4px 12px',cursor:'pointer',fontSize:12}}>✕ Dong</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:12}}>
            {[
              {label:tx.lPlan,val:`${order.qty.toLocaleString()} chai`,color:'#0078d4'},
              {label:tx.lDone,val:`${order.done.toLocaleString()} chai`,color:'#107c10'},
              {label:tx.lRemain,val:`${(order.qty-order.done).toLocaleString()} chai`,color:'#d97706'},
              {label:tx.lOEE,val:order.oee?`${order.oee}%`:'—',color:order.oee>=90?'#107c10':order.oee>0?'#d97706':'#aaa'},
            ].map((k,i)=>(
              <div key={i} style={{textAlign:'center',background:'var(--bg)',borderRadius:8,padding:'10px 8px',border:'1px solid var(--border)'}}>
                <div style={{fontSize:11,color:'var(--text2)',marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:18,fontWeight:700,color:k.color}}>{k.val}</div>
              </div>
            ))}
          </div>
          <div className="fl ic g8 mb12">
            <span className="tsm fw6">Tien do:</span>
            <div className="pb" style={{flex:1,height:12,borderRadius:6}}>
              <div className="pf" style={{width:`${Math.round((order.done/order.qty)*100)}%`,height:12,borderRadius:6,background:'#0078d4'}}/>
            </div>
            <span className="fw6 tsm">{Math.round((order.done/order.qty)*100)}%</span>
          </div>
          <div className="tsm fw6 mb10">🔄 Quy trinh san xuat</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
            {order.steps.map((s,i)=>(
              <div key={i} style={{
                border:`2px solid ${s.status==='done'?'#107c10':s.status==='active'?'#0078d4':s.status==='blocked'?'#d13438':'var(--border)'}`,
                borderRadius:8,padding:10,
                background:s.status==='done'?'#107c1010':s.status==='active'?'#0078d410':s.status==='blocked'?'#d1343810':'transparent'
              }}>
                <div className="fl ic jb mb4">
                  <span style={{fontSize:12,fontWeight:600}}>{s.step}</span>
                  <span style={{fontSize:16}}>{s.status==='done'?'✅':s.status==='active'?'⚡':s.status==='blocked'?'🔴':'⏳'}</span>
                </div>
                <div className="tsm cm">{s.worker}</div>
                {s.start && <div className="tsm mt4" style={{opacity:.7}}>{s.start}{s.end?' → '+s.end:''}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="tabs">
        {tx.jsTabs.map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>
      {tab===0 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📊 Gantt – Tuan 24 (9-15/06/2026)</span></div>
          <div style={{display:'grid',gridTemplateColumns:'190px repeat(7,1fr)',gap:0,borderBottom:'1px solid var(--border)',paddingBottom:6,marginBottom:10}}>
            <div className="tsm cm fw6">Day chuyen</div>
            {days.map((d,i)=>(
              <div key={i} className="tsm fw6" style={{textAlign:'center',color:i===1?'#0078d4':'var(--text2)',fontSize:10}}>{d}</div>
            ))}
          </div>
          {ganttBars.map((g,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'190px repeat(7,1fr)',gap:0,marginBottom:8,alignItems:'center'}}>
              <div className="tsm fw5 trunc" style={{paddingRight:8}}>{g.task}</div>
              {[0,1,2,3,4,5,6].map(d=>(
                <div key={d} style={{padding:'1px 2px'}}>
                  {d>=g.start && d<g.start+g.dur ? (
                    <div style={{background:g.color,height:26,
                      borderRadius:d===g.start?'4px 0 0 4px':d===g.start+g.dur-1?'0 4px 4px 0':'0',
                      position:'relative',overflow:'hidden',cursor:'pointer',display:'flex',alignItems:'center',paddingLeft:4}}
                      onClick={()=>setSelected(g.ord===selected?null:g.ord)}>
                      {d===g.start && g.pct>0 && (
                        <div style={{position:'absolute',left:0,top:0,bottom:0,width:`${g.pct}%`,background:'rgba(255,255,255,.25)',borderRadius:'4px 0 0 4px'}}/>
                      )}
                      {d===g.start && g.pct>0 && (
                        <span style={{fontSize:9,color:'#fff',fontWeight:700,position:'relative',zIndex:1}}>{g.pct}%</span>
                      )}
                    </div>
                  ) : <div style={{height:26,background:'var(--border)',opacity:.15,borderRadius:2}}/>}
                </div>
              ))}
            </div>
          ))}
          <p className="tsm cm mt8">Click vao thanh de xem chi tiet don hang · So dam = da hoan thanh</p>
        </div>
      )}
      {tab===1 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📋 Danh sach don hang – Tuan 24</span></div>
          <div className="tw"><table>
            <thead><tr><th>{tx.thOrder}</th><th>{tx.thProduct}</th><th>{tx.thQty}</th><th>{tx.thProgress}</th><th>{tx.thDeadline}</th><th>{tx.thPriority}</th><th>{tx.thStatus}</th><th>{tx.thLine}</th><th>{tx.thOEE}</th></tr></thead>
            <tbody>{orders.map((o,i)=>(
              <tr key={i} onClick={()=>setSelected(o.id===selected?null:o.id)} style={{cursor:'pointer',background:o.id===selected?'#e8f4fd':undefined}}>
                <td className="tb fw5">{o.id}</td><td className="fw5">{o.product}</td>
                <td>{o.qty.toLocaleString()} chai</td>
                <td>
                  <div className="fl ic g6">
                    <div style={{width:60,height:6,background:'var(--border)',borderRadius:3}}>
                      <div style={{width:`${(o.done/o.qty)*100}%`,height:6,borderRadius:3,background:'#0078d4'}}/>
                    </div>
                    <span className="tsm">{Math.round((o.done/o.qty)*100)}%</span>
                  </div>
                </td>
                <td className="fw5">{o.deadline}</td>
                <td><span className={`badge ${o.priority==='Cao'?'badge-red':o.priority==='TB'?'badge-yellow':'badge-gray'}`}>{o.priority}</span></td>
                <td><span className={`badge ${statusColor(o.status)}`}>{o.status}</span></td>
                <td>{o.line}</td><td>{o.oee?`${o.oee}%`:'—'}</td>
              </tr>
            ))}</tbody>
          </table></div>
          <p className="tsm cm mt8">💡 Click vao hang de xem quy trinh san xuat chi tiet</p>
        </div>
      )}
      {tab===2 && (
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">👷 Cong suat nguon luc tuan 24</span></div>
            {resourceData.map((r,i)=>(
              <div className="meter-row" key={i}>
                <div className="meter-label fw5 tsm">{r.r}</div>
                <div className="meter-bar"><div className="meter-fill" style={{width:`${r.actual}%`,background:rcColor(r.actual)}}/></div>
                <div className="meter-val tsm" style={{color:rcColor(r.actual)}}>{r.actual}%</div>
              </div>
            ))}
            <div className="al al-yellow mt12">⚠️ NFC 65Brix con 78% – Du bao het nguyen lieu T5 neu khong nhap bo sung. De xuat dat hang khan tu NCC.</div>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📈 OEE theo ca – Tuan 24</span></div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={oeeData} margin={{left:-20,right:10}}>
                <XAxis dataKey="ca" tick={{fontSize:10}}/><YAxis domain={[50,100]} tick={{fontSize:11}}/>
                <Tooltip formatter={v=>v?`${v}%`:'Nghi'}/>
                <ReferenceLine y={85} stroke="#107c10" strokeDasharray="4 3" label={{value:'Muc tieu 85%',fontSize:10,fill:'#107c10',position:'right'}}/>
                <Line type="monotone" dataKey="line1" stroke="#0078d4" dot name="Line 1" strokeWidth={2}/>
                <Line type="monotone" dataKey="line2" stroke="#d97706" dot name="Line 2" strokeWidth={2} strokeDasharray="4 2"/>
                <Line type="monotone" dataKey="line3" stroke="#107c10" dot name="Line 3" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {tab===3 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">🔮 Mo phong kich ban dieu chinh</span></div>
          <div className="tw mb12"><table>
            <thead><tr><th>{tx.thScenario}</th><th>{tx.thEff}</th><th>{tx.thRisk}</th><th>{tx.thCost}</th><th>{tx.thRiskLevel}</th><th>{tx.thAI}</th></tr></thead>
            <tbody>{simulate.map((s,i)=>(
              <tr key={i} style={{background:i===1?'#107c1008':undefined}}>
                <td className="fw5">{s.scenario}</td>
                <td><span style={{color:s.efficiency>=90?'#107c10':'#d97706',fontWeight:600}}>{s.efficiency}%</span></td>
                <td>{s.delay===0?<span className="badge badge-green">0</span>:<span className="badge badge-yellow">{s.delay}</span>}</td>
                <td>{s.cost}%</td>
                <td><span className={`badge ${s.risk==='Thap'?'badge-green':s.risk==='Cao'?'badge-red':'badge-yellow'}`}>{s.risk}</span></td>
                <td>{i===1?<span className="badge badge-green">Tot nhat</span>:i===3?<span className="badge badge-blue">Toi uu nhat</span>:i===2?<span className="badge badge-blue">Kha thi</span>:<span className="badge badge-gray">Co so</span>}</td>
              </tr>
            ))}</tbody>
          </table></div>
          <div className="al al-blue">🤖 <strong>AI khuyen nghi:</strong> Ket hop Tang ca T7 Line 1 va dat khan NFC 65Brix de dam bao tat ca don hang tuan 24 dung han. Hieu suat du kien 91%, chi phi +8% — trong nguong cho phep.</div>
        </div>
      )}
    </div>
  )
}
