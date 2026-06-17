import { useState } from 'react'
import { useLang } from '../../i18n/context'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
         ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'

const items = [
  {code:'FG-NC-CAM-330',name:'NC Cam 330ml (thung)',cat:'Thanh pham',qty:4200,min:2000,max:8000,loc:'A-01-03',unit:'thung',status:'Binh thuong',in7:980,out7:820,supplier:'NCC Noi dia',leadtime:'5 ngay',
   history:[
     {date:'09/06',type:'Xuat',qty:280,ref:'DH-2026-0612',note:'Xuat giao Dai ly HCM'},
     {date:'08/06',type:'Nhap',qty:500,ref:'PO-2026-0541',note:'Nhap tu kho san xuat'},
     {date:'07/06',type:'Xuat',qty:320,ref:'DH-2026-0608',note:'Xuat giao Dai ly HN'},
     {date:'06/06',type:'Nhap',qty:400,ref:'PO-2026-0538',note:'Nhap tu kho san xuat'},
   ]},
  {code:'FG-OI-EP-1L',name:'Oi Ep 1L (thung)',cat:'Thanh pham',qty:1850,min:2000,max:6000,loc:'A-02-01',unit:'thung',status:'Thieu',in7:240,out7:390,supplier:'NCC Noi dia',leadtime:'5 ngay',
   history:[
     {date:'09/06',type:'Xuat',qty:180,ref:'DH-2026-0613',note:'Xuat giao Dai ly Da Nang'},
     {date:'08/06',type:'Xuat',qty:210,ref:'DH-2026-0609',note:'Xuat giao Dai ly Can Tho'},
     {date:'07/06',type:'Nhap',qty:240,ref:'PO-2026-0535',note:'Nhap tu kho san xuat'},
   ]},
  {code:'FG-DM-CHANH-500',name:'Dau Mut Chanh 500ml (thung)',cat:'Thanh pham',qty:2650,min:1500,max:5000,loc:'A-03-02',unit:'thung',status:'Binh thuong',in7:600,out7:420,supplier:'NCC Noi dia',leadtime:'5 ngay',
   history:[
     {date:'09/06',type:'Nhap',qty:300,ref:'PO-2026-0542',note:'Nhap tu kho san xuat'},
     {date:'08/06',type:'Xuat',qty:240,ref:'DH-2026-0610',note:'Xuat giao Dai ly HCM'},
   ]},
  {code:'FG-XD-TRAI-330',name:'Xoai Dua Trai Cay 330ml (thung)',cat:'Thanh pham',qty:3100,min:1800,max:7000,loc:'A-04-01',unit:'thung',status:'Binh thuong',in7:720,out7:580,supplier:'NCC Noi dia',leadtime:'5 ngay',
   history:[
     {date:'09/06',type:'Xuat',qty:280,ref:'DH-2026-0611',note:'Xuat giao Dai ly Can Tho'},
     {date:'07/06',type:'Nhap',qty:400,ref:'PO-2026-0536',note:'Nhap tu kho san xuat'},
   ]},
  {code:'RM-NFC-65',name:'NFC 65Brix (thung)',cat:'Nguyen lieu',qty:320,min:500,max:1500,loc:'B-01-05',unit:'thung',status:'Canh bao',in7:0,out7:180,supplier:'Tropical Foods Co.',leadtime:'14 ngay',
   history:[
     {date:'08/06',type:'Xuat',qty:80,ref:'WO-2026-0318',note:'Cap cho Line 1 san xuat NC Cam'},
     {date:'07/06',type:'Xuat',qty:100,ref:'WO-2026-0315',note:'Cap cho Line 2 san xuat Oi Ep'},
   ]},
  {code:'RM-SUCROSE',name:'Sucrose (bao 25kg)',cat:'Nguyen lieu',qty:580,min:200,max:1000,loc:'B-02-01',unit:'bao',status:'Binh thuong',in7:200,out7:120,supplier:'CTCP Duong Bien Hoa',leadtime:'3 ngay',
   history:[
     {date:'09/06',type:'Nhap',qty:200,ref:'PO-2026-0543',note:'Nhap tu Duong Bien Hoa'},
     {date:'07/06',type:'Xuat',qty:60,ref:'WO-2026-0316',note:'Cap cho phong pha che'},
   ]},
  {code:'RM-ACID-CITRIC',name:'Acid Citric E330 (kg)',cat:'Nguyen lieu',qty:1250,min:500,max:3000,loc:'B-03-02',unit:'kg',status:'Binh thuong',in7:400,out7:220,supplier:'Sincochem Vietnam',leadtime:'10 ngay',
   history:[
     {date:'08/06',type:'Nhap',qty:400,ref:'PO-2026-0540',note:'Nhap tu Sincochem'},
     {date:'07/06',type:'Xuat',qty:110,ref:'WO-2026-0317',note:'Cap pha che Oi Ep'},
   ]},
  {code:'RM-VITAMIN-C',name:'Vitamin C tong hop (kg)',cat:'Nguyen lieu',qty:85,min:60,max:200,loc:'B-04-01',unit:'kg',status:'Binh thuong',in7:50,out7:38,supplier:'DSM Nutritional',leadtime:'21 ngay',
   history:[
     {date:'07/06',type:'Nhap',qty:50,ref:'PO-2026-0532',note:'Nhap tu DSM Nutritional'},
     {date:'06/06',type:'Xuat',qty:38,ref:'WO-2026-0310',note:'Cap pha che NC Cam'},
   ]},
  {code:'PM-PET-330',name:'Bao bi PET 330ml (cai)',cat:'Bao bi',qty:45000,min:20000,max:80000,loc:'C-01-01',unit:'cai',status:'Binh thuong',in7:8000,out7:6500,supplier:'CTCP Nhua Tien Phong',leadtime:'7 ngay',
   history:[
     {date:'08/06',type:'Nhap',qty:8000,ref:'PO-2026-0539',note:'Nhap tu Nhua Tien Phong'},
     {date:'07/06',type:'Xuat',qty:3500,ref:'WO-2026-0313',note:'Cap Line 1 chiet rot'},
     {date:'06/06',type:'Xuat',qty:3000,ref:'WO-2026-0308',note:'Cap Line 2 chiet rot'},
   ]},
  {code:'PM-PET-1L',name:'Bao bi PET 1L (cai)',cat:'Bao bi',qty:18500,min:8000,max:35000,loc:'C-01-03',unit:'cai',status:'Binh thuong',in7:5000,out7:3200,supplier:'CTCP Nhua Tien Phong',leadtime:'7 ngay',
   history:[
     {date:'07/06',type:'Nhap',qty:5000,ref:'PO-2026-0533',note:'Nhap tu Nhua Tien Phong'},
     {date:'06/06',type:'Xuat',qty:3200,ref:'WO-2026-0309',note:'Cap Line 2 chiet Oi Ep'},
   ]},
  {code:'PM-NHAN-CAM',name:'Nhan NC Cam (cuon)',cat:'Bao bi',qty:280,min:300,max:800,loc:'C-02-03',unit:'cuon',status:'Canh bao',in7:0,out7:120,supplier:'Sai Gon Label',leadtime:'10 ngay',
   history:[
     {date:'08/06',type:'Xuat',qty:60,ref:'WO-2026-0314',note:'Cap Line 1 dan nhan sang'},
     {date:'07/06',type:'Xuat',qty:60,ref:'WO-2026-0311',note:'Cap Line 1 dan nhan chieu'},
   ]},
  {code:'PM-NHAN-OI',name:'Nhan Oi Ep (cuon)',cat:'Bao bi',qty:420,min:250,max:700,loc:'C-02-04',unit:'cuon',status:'Binh thuong',in7:200,out7:80,supplier:'Sai Gon Label',leadtime:'10 ngay',
   history:[
     {date:'08/06',type:'Nhap',qty:200,ref:'PO-2026-0537',note:'Nhap tu Sai Gon Label'},
     {date:'07/06',type:'Xuat',qty:80,ref:'WO-2026-0312',note:'Cap dan nhan Oi Ep'},
   ]},
  {code:'PM-NAP-38MM',name:'Nap 38mm (cai)',cat:'Bao bi',qty:52000,min:25000,max:90000,loc:'C-03-01',unit:'cai',status:'Binh thuong',in7:10000,out7:9800,supplier:'CTCP Nhua Binh Duong',leadtime:'5 ngay',
   history:[
     {date:'08/06',type:'Nhap',qty:10000,ref:'PO-2026-0534',note:'Nhap tu Nhua Binh Duong'},
     {date:'07/06',type:'Xuat',qty:9800,ref:'WO-2026-0307',note:'Cap Line 1+2 ghep nap'},
   ]},
  {code:'CH-CIP-SUD',name:'Hoa chat ve sinh CIP (lit)',cat:'Hoa chat',qty:850,min:400,max:1500,loc:'D-01-01',unit:'lit',status:'Binh thuong',in7:200,out7:150,supplier:'Diversey Vietnam',leadtime:'5 ngay',
   history:[
     {date:'07/06',type:'Nhap',qty:200,ref:'PO-2026-0530',note:'Nhap tu Diversey Vietnam'},
     {date:'06/06',type:'Xuat',qty:150,ref:'WO-2026-0306',note:'Ve sinh CIP tuan'},
   ]},
  {code:'CH-CHLORINE',name:'Chlorine 70% (kg)',cat:'Hoa chat',qty:125,min:50,max:300,loc:'D-01-02',unit:'kg',status:'Binh thuong',in7:50,out7:28,supplier:'Hoa chat A Dong',leadtime:'3 ngay',
   history:[
     {date:'08/06',type:'Nhap',qty:50,ref:'PO-2026-0531',note:'Nhap tu Hoa chat A Dong'},
     {date:'07/06',type:'Xuat',qty:28,ref:'WO-2026-0308',note:'Ve sinh be nuoc RO'},
   ]},
]

const trendData = [
  {w:'T18',cam:3600,oi:2100,pet:38000},{w:'T19',cam:3800,oi:2200,pet:40000},
  {w:'T20',cam:4100,oi:2000,pet:42000},{w:'T21',cam:3900,oi:1950,pet:41000},
  {w:'T22',cam:4200,oi:1850,pet:45000},
]

const catColor = c=>({'Thanh pham':'#0078d4','Nguyen lieu':'#107c10','Bao bi':'#d97706','Hoa chat':'#8764b8'}[c]||'#aaa')
const statusBadge = s=>s==='Binh thuong'?'badge-green':s==='Thieu'?'badge-red':'badge-yellow'
const CATS = ['Tat ca','Thanh pham','Nguyen lieu','Bao bi','Hoa chat']

const T = {
  vi: {
    title: '📦 Quản Lý Tồn Kho',
    subtitle: 'Real-time inventory tracking · {n} SKU · Cập nhật lúc 08:47',
    tabs: ['📋 Chi tiết SKU', '📜 Lịch sử giao dịch', '📊 Tổng quan danh mục', '📈 Xu hướng tồn kho'],
    thTx: 'Ngày', thTxType: 'Loại', thTxQty: 'Số lượng', thTxCode: 'Mã phiếu', thTxNote: 'Ghi chú',
    thSku: 'Mã SKU', thName: 'Tên hàng', thCat: 'Danh mục', thStock: 'Tồn kho', thMinMax: 'Min / Max',
    thIn7: 'Nhập 7N', thOut7: 'Xuất 7N', thLoc: 'Vị trí', thStatus: 'Trạng thái',
    kpi: ['Tổng SKU quản lý','Dưới mức tối thiểu','Cảnh báo sắp hết','Xuất kho 7 ngày'],
    kpiSub: ['4 danh mục','Cần nhập bổ sung','Trong 7 ngày tới','4% so tuần trước'],
    outerTabs: ['📋 Chi tiết SKU','📜 Lịch sử giao dịch','📊 Tổng quan danh mục','📈 Xu hướng tồn kho'],
    lStock: 'Tồn kho',
    lMin: 'Tối thiểu',
    lMax: 'Tối đa',
    lIn7: 'Nhập 7 ngày',
    lOut7: 'Xuất 7 ngày',
    jsTabs: ['Danh sách SKU','Xu hướng tồn kho','Phân bố danh mục'],
  },
  zh: {
    title: '📦 库存管理',
    subtitle: '实时库存跟踪 · {n} SKU · 更新于08:47',
    tabs: ['📋 SKU详情', '📜 交易历史', '📊 品类总览', '📈 库存趋势'],
    thTx: '日期', thTxType: '类型', thTxQty: '数量', thTxCode: '单据编号', thTxNote: '备注',
    thSku: 'SKU编号', thName: '品名', thCat: '品类', thStock: '库存', thMinMax: '最小/最大',
    thIn7: '7天入库', thOut7: '7天出库', thLoc: '位置', thStatus: '状态',
    kpi: ['管理SKU总数','低于最低库存','即将耗尽警告','7天出库'],
    kpiSub: ['4个品类','需补货','7天内','较上周-4%'],
    outerTabs: ['📋 SKU详情','📜 交易历史','📊 品类总览','📈 库存趋势'],
    lStock: '库存',
    lMin: '最小值',
    lMax: '最大值',
    lIn7: '7天入库',
    lOut7: '7天出库',
    jsTabs: ['SKU列表','库存趋势','品类分布'],
  },
}

export default function InventoryManagement() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [cat, setCat] = useState('Tat ca')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState(0)

  const filtered = items.filter(it=>
    (cat==='Tat ca'||it.cat===cat) &&
    (it.name.toLowerCase().includes(search.toLowerCase())||it.code.toLowerCase().includes(search.toLowerCase()))
  )
  const item = items.find(i=>i.code===selected)
  const pieData = CATS.slice(1).map(c=>({name:c,value:items.filter(i=>i.cat===c).length,color:catColor(c)}))

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>{tx.title}</h1><p>{tx.subtitle.replace('{n}', items.length)}</p></div>
        <div className="fl g8">
          <button className="btn btn-primary btn-sm">+ Nhập kho</button>
          <button className="btn btn-outline btn-sm">📤 Xuất kho</button>
          <button className="btn btn-outline btn-sm">📊 Xuất Excel</button>
        </div>
      </div>
      <div className="sg4">
        {[
          {label:tx.kpi[0],val:`${items.length}`,sub:tx.kpiSub[0],color:'#0078d4'},
          {label:tx.kpi[1],val:'3',sub:tx.kpiSub[1],color:'#d13438'},
          {label:tx.kpi[2],val:'2',sub:tx.kpiSub[2],color:'#d97706'},
          {label:tx.kpi[3],val:'~18.3T',sub:tx.kpiSub[3],color:'#107c10'},
        ].map((s,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value" style={{color:s.color}}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title"><span className="card-title-left">🚨 Cảnh báo tồn kho</span></div>
        <div className="sg" style={{gap:8}}>
          <div className="al al-red">🔴 <span><strong>FG-OI-EP-1L</strong> – Tồn 1,850 / Tối thiểu 2,000 thùng. Thiếu 150. Cần nhập ngay. Lead time: 5 ngày.</span></div>
          <div className="al al-yellow">⚠️ <span><strong>PM-NHAN-CAM</strong> – Còn 280 cuộn / Tối thiểu 300. Đặt hàng trước 11/06. Lead time: 10 ngày.</span></div>
          <div className="al al-yellow">⚠️ <span><strong>RM-NFC-65</strong> – Còn 320 thùng / Tối thiểu 500. Tiêu thụ 90 thùng/ngày – hết trong 3.5 ngày. Lead time: 14 ngày, đặt ngay!</span></div>
        </div>
      </div>
      {item && (
        <div className="card" style={{border:`2px solid ${catColor(item.cat)}44`}}>
          <div className="card-title" style={{borderBottom:'1px solid var(--border)',paddingBottom:12,marginBottom:12}}>
            <div>
              <div className="fl ic g8">
                <span className="card-title-left">{item.code}</span>
                <span className={`badge ${statusBadge(item.status)}`}>{item.status}</span>
                <span className="badge badge-blue">{item.cat}</span>
              </div>
              <p className="tsm cm mt4">{item.name} · {item.loc} · NCC: {item.supplier} · Lead time: {item.leadtime}</p>
            </div>
            <button onClick={()=>setSelected(null)} style={{border:'none',background:'#f1f5f9',borderRadius:6,padding:'4px 12px',cursor:'pointer',fontSize:12}}>✕ Đóng</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:16}}>
            {[
              {label:tx.lStock,val:`${item.qty.toLocaleString()} ${item.unit}`,color:item.qty<item.min?'#d13438':item.qty<item.min*1.3?'#d97706':'#107c10'},
              {label:tx.lMin,val:`${item.min.toLocaleString()}`,color:'#d97706'},
              {label:tx.lMax,val:`${item.max.toLocaleString()}`,color:'#0078d4'},
              {label:tx.lIn7,val:`+${item.in7.toLocaleString()}`,color:'#107c10'},
              {label:tx.lOut7,val:`-${item.out7.toLocaleString()}`,color:'#d13438'},
            ].map((k,i)=>(
              <div key={i} style={{textAlign:'center',background:'var(--bg)',borderRadius:8,padding:'10px 8px',border:'1px solid var(--border)'}}>
                <div style={{fontSize:11,color:'var(--text2)',marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:17,fontWeight:700,color:k.color}}>{k.val}</div>
              </div>
            ))}
          </div>
          <div className="fl ic g8 mb12">
            <span className="tsm fw6">Mức tồn kho:</span>
            <div style={{flex:1,background:'var(--border)',borderRadius:6,height:10,position:'relative'}}>
              <div style={{position:'absolute',left:`${(item.min/item.max)*100}%`,top:0,bottom:0,width:2,background:'#d97706'}}/>
              <div style={{width:`${Math.min((item.qty/item.max)*100,100)}%`,height:10,borderRadius:6,background:item.qty<item.min?'#d13438':item.qty<item.min*1.3?'#d97706':'#107c10'}}/>
            </div>
            <span className="tsm cm">{Math.round((item.qty/item.max)*100)}% công suất</span>
          </div>
          <div className="tsm fw6 mb8">📋 Lịch sử nhập/xuất gần nhất</div>
          <div className="tw"><table>
            <thead><tr><th>{tx.thTx}</th><th>{tx.thTxType}</th><th>{tx.thTxQty}</th><th>{tx.thTxCode}</th><th>{tx.thTxNote}</th></tr></thead>
            <tbody>{item.history.map((h,i)=>(
              <tr key={i}>
                <td className="fw5">{h.date}</td>
                <td><span className={`badge ${h.type==='Nhap'?'badge-green':'badge-blue'}`}>{h.type}</span></td>
                <td className="fw6">{h.type==='Nhap'?'+':'-'}{h.qty.toLocaleString()} {item.unit}</td>
                <td className="cm tsm">{h.ref}</td><td className="tsm">{h.note}</td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      )}
      <div className="tabs">
        {tx.jsTabs.map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>
      {tab===0 && (
        <div className="card">
          <div className="card-title">
            <div className="fl ic g8" style={{flexWrap:'wrap'}}>
              <span className="card-title-left">📋 Danh sách tồn kho</span>
              {CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{border:'1px solid var(--border)',borderRadius:20,padding:'3px 10px',fontSize:11,cursor:'pointer',background:cat===c?'#0078d4':'transparent',color:cat===c?'#fff':'var(--text)',fontWeight:cat===c?600:400}}>{c}</button>
              ))}
            </div>
            <div className="ir" style={{width:200}}><input placeholder="Tìm mã/tên..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          </div>
          <div className="tw"><table>
            <thead><tr><th>{tx.thSku}</th><th>{tx.thName}</th><th>{tx.thCat}</th><th>{tx.thStock}</th><th>{tx.thMinMax}</th><th>{tx.thIn7}</th><th>{tx.thOut7}</th><th>{tx.thLoc}</th><th>{tx.thStatus}</th></tr></thead>
            <tbody>{filtered.map((it,i)=>(
              <tr key={i} onClick={()=>setSelected(it.code===selected?null:it.code)} style={{cursor:'pointer',background:it.code===selected?'#e8f4fd':undefined}}>
                <td className="fw5 tb tsm">{it.code}</td><td className="fw5">{it.name}</td>
                <td><span className="badge" style={{background:catColor(it.cat)+'22',color:catColor(it.cat),border:`1px solid ${catColor(it.cat)}44`}}>{it.cat}</span></td>
                <td>
                  <div className="fl ic g6">
                    <div style={{width:48,height:6,background:'var(--border)',borderRadius:3}}>
                      <div style={{width:`${Math.min((it.qty/it.max)*100,100)}%`,height:6,borderRadius:3,background:it.qty<it.min?'#d13438':it.qty<it.min*1.3?'#d97706':'#107c10'}}/>
                    </div>
                    <span className={`fw6 ${it.qty<it.min?'tr':''}`}>{it.qty.toLocaleString()}</span>
                  </div>
                </td>
                <td className="tsm cm">{it.min.toLocaleString()} / {it.max.toLocaleString()}</td>
                <td style={{color:'#107c10'}}>+{it.in7.toLocaleString()}</td>
                <td style={{color:'#d13438'}}>-{it.out7.toLocaleString()}</td>
                <td className="cm tsm">{it.loc}</td>
                <td><span className={`badge ${statusBadge(it.status)}`}>{it.status}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
          <p className="tsm cm mt8">💡 Click vào hàng để xem lịch sử nhập/xuất · {filtered.length}/{items.length} SKU</p>
        </div>
      )}
      {tab===1 && (
        <div className="g2">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📈 Tồn kho NC Cam 330ml vs Ổi Ép 1L (5 tuần)</span></div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData} margin={{left:-20,right:10}}>
                <XAxis dataKey="w" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
                <Tooltip/>
                <Line type="monotone" dataKey="cam" stroke="#0078d4" dot={false} name="NC Cam 330ml" strokeWidth={2}/>
                <Line type="monotone" dataKey="oi" stroke="#d13438" dot={false} name="Oi Ep 1L" strokeWidth={2} strokeDasharray="4 2"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📦 Bao bì PET 330ml (5 tuần)</span></div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData} margin={{left:-20}}>
                <XAxis dataKey="w" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
                <Tooltip formatter={v=>`${(v/1000).toFixed(1)}K cai`}/>
                <Bar dataKey="pet" fill="#d97706" radius={[3,3,0,0]} name="PET 330ml"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {tab===2 && (
        <div className="g2">
          <div className="card">
            <div className="card-title"><span className="card-title-left">🍩 Phân bố SKU theo danh mục</span></div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                  dataKey="value" nameKey="name" label={({name,value})=>`${name}: ${value}`} labelLine={false}>
                  {pieData.map((d,i)=><Cell key={i} fill={d.color}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Tỉ lệ đáp ứng tồn kho</span></div>
            <div className="sg" style={{gap:12,padding:'8px 0'}}>
              {CATS.slice(1).map(c=>{
                const catItems = items.filter(i=>i.cat===c)
                const ok = catItems.filter(i=>i.qty>=i.min).length
                const pct = Math.round((ok/catItems.length)*100)
                return (
                  <div key={c}>
                    <div className="fl jb tsm mb4">
                      <span className="fw6" style={{color:catColor(c)}}>{c}</span>
                      <span className="cm">{ok}/{catItems.length} SKU dat · {pct}%</span>
                    </div>
                    <div className="pb"><div className="pf" style={{width:`${pct}%`,background:pct===100?'#107c10':pct>=80?'#d97706':'#d13438'}}/></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
