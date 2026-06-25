import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../i18n/context'
import PlanningStepBar from './PlanningStepBar'
import FormsPanel from '../../components/FormsPanel'
import { printFormWindow } from '../orders/forms/printUtils'
import { formOrderControl } from './forms/planningForms'
import { LINES, orderData, orderRegions } from './planningData'
import './planning.css'

function statusOf(o){
  const remain = o.qty - o.produced
  if (o.produced > o.qty) return {key:'over', label:'SX dư', cls:'badge-yellow'}
  if (o.shipped >= o.qty && o.qty>0) return {key:'shipped', label:'Đã xuất', cls:'badge-green'}
  if (o.produced === 0) return {key:'notyet', label:'Chưa SX', cls:'badge-gray'}
  if (remain > 0) return {key:'running', label:'Đang SX', cls:'badge-blue'}
  return {key:'done', label:'Đã SX xong', cls:'badge-green'}
}
const fmt = (n) => Number(n).toLocaleString('vi-VN')

const T = {
  vi: {
    title:'Bảng Quản Chế Đơn Hàng & Trạng Thái Order',
    subtitle:'Tự động nhập đơn các khu vực, theo dõi: đã đặt / đã SX / chưa SX / SX dư / tiến độ xuất',
    kpis:['Tổng đơn hàng','Đang sản xuất','Chưa sản xuất','Đơn SX dư','Tiến độ xuất TB'],
    head:['Mã đơn','Khu vực','Mã SP','Quy cách','SL đặt','Đã SX','Chưa SX','SX dư','Đã xuất','Tiến độ xuất','Trạng thái','Ưu tiên'],
    formTitle:'➕ Nhập Đơn Hàng Mới (Biểu Mẫu)',
    fields:['Mã đơn','Khu vực','Mã sản phẩm','Quy cách','Số lượng','Đơn vị','Ngày giao','Ưu tiên'],
    addBtn:'➕ Thêm Vào Bảng Quản Chế', tableTitle:'Bảng Quản Chế Đơn',
    aiTitle:'🤖 Phân Tích AI – Theo Dõi & Cảnh Báo', next:'→ Phân Tích NVL',
  },
  zh: {
    title:'订单管制表与订单状态',
    subtitle:'自动汇入各区订单，追踪：已下单 / 已生产 / 未生产 / 多生产 / 出货进度',
    kpis:['订单总数','生产中','未生产','多生产订单','平均出货进度'],
    head:['订单号','区域','产品代号','规格','订单量','已生产','未生产','多生产','已出货','出货进度','状态','优先'],
    formTitle:'➕ 新增订单 (表单录入)',
    fields:['订单号','区域','产品代号','规格','数量','单位','交期','优先'],
    addBtn:'➕ 加入管制表', tableTitle:'订单管制表',
    aiTitle:'🤖 AI 分析 – 追踪与预警', next:'→ 原料分析',
  },
}

export default function OrderControl() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
  const { line = 'av' } = useParams()
  const L = LINES[line] || LINES.av
  const regions = orderRegions[line] || orderRegions.av

  const [region, setRegion] = useState('Tất cả')
  const [rows, setRows] = useState(orderData[line] || [])
  const [draft, setDraft] = useState({id:'',region:regions[1],code:'',spec:'',qty:'',unit:'thùng',deadline:'',priority:'TB'})

  const filtered = region==='Tất cả' ? rows : rows.filter(o=>o.region===region)
  const stats = useMemo(()=>{
    const total = rows.length || 1
    const running = rows.filter(o=>statusOf(o).key==='running').length
    const notyet = rows.filter(o=>statusOf(o).key==='notyet').length
    const over = rows.filter(o=>statusOf(o).key==='over').length
    const shipPct = Math.round(rows.reduce((s,o)=>s+(o.qty?o.shipped/o.qty:0),0)/total*100)
    return {total:rows.length,running,notyet,over,shipPct}
  },[rows])

  const kpis = [
    {label:tx.kpis[0],val:stats.total,color:'var(--blue)'},
    {label:tx.kpis[1],val:stats.running,color:'#0078d4'},
    {label:tx.kpis[2],val:stats.notyet,color:'var(--muted)'},
    {label:tx.kpis[3],val:stats.over,color:'#d97706'},
    {label:tx.kpis[4],val:stats.shipPct+'%',color:'var(--green)'},
  ]
  const addOrder = () => {
    if(!draft.id || !draft.code) return
    setRows([{...draft,qty:Number(draft.qty)||0,produced:0,shipped:0},...rows])
    setDraft({id:'',region:regions[1],code:'',spec:'',qty:'',unit:'thùng',deadline:'',priority:'TB'})
  }
  const FORMS = [{code:'P-PM 001-01', label:'Bảng Thống Kê & Quản Chế Đơn Hàng'}]
  const openForm = () => printFormWindow(formOrderControl({period:`Line ${L.code}`, region, date:'25/06/2026', rows}), 'P-PM 001-01')

  return (
    <div className="plan-ui" style={{display:'flex',gap:16,alignItems:'flex-start'}}>
    <div className="sg" style={{flex:1,minWidth:0}}>
      <div className="ph">
        <div className="fl ic g12">
          <div style={{width:46,height:46,borderRadius:12,background:L.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:800,flexShrink:0}}>{L.code}</div>
          <div><h1>{L.emoji} Line {L.code} – {tx.title}</h1><p>{L.name} · {tx.subtitle}</p></div>
        </div>
        <div className="badge badge-blue">V1.1 · 生管部</div>
      </div>

      <PlanningStepBar active={1} line={line} />

      <div className="g4">
        {kpis.map((k,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{k.label}</div>
            <div className="sc-value" style={{color:k.color}}>{k.val}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {regions.map((r)=>(
          <div key={r} className={`tab ${region===r?'active':''}`} onClick={()=>setRegion(r)}>{r}</div>
        ))}
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left" style={{color:L.color}}>📋 {tx.tableTitle} – Line {L.code} ({filtered.length})</span><span className="tsm cm">Cập nhật trạng thái real-time</span></div>
        <div className="tw"><table>
          <thead><tr>{tx.head.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map(o=>{
            const st = statusOf(o)
            const remain = Math.max(0,o.qty-o.produced)
            const over = Math.max(0,o.produced-o.qty)
            const shipPct = o.qty?Math.round(o.shipped/o.qty*100):0
            return (
              <tr key={o.id}>
                <td className="fw6 tsm tb">{o.id}</td>
                <td className="tsm">{o.region}</td>
                <td className="tsm">{o.code}</td>
                <td><span className="badge badge-gray">{o.spec}</span></td>
                <td className="tsm fw5">{fmt(o.qty)}</td>
                <td className="tsm tg">{fmt(o.produced)}</td>
                <td className="tsm">{remain?fmt(remain):'—'}</td>
                <td className="tsm" style={{color:over?'#d97706':'var(--muted)'}}>{over?'+'+fmt(over):'—'}</td>
                <td className="tsm">{fmt(o.shipped)}</td>
                <td style={{minWidth:90}}>
                  <div className="meter-bar" style={{height:8}}><div className="meter-fill" style={{width:shipPct+'%',background:shipPct>=100?'var(--green)':'var(--blue)'}} /></div>
                  <span className="tsm cm">{shipPct}%</span>
                </td>
                <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                <td><span className={`badge ${o.priority==='Cao'?'badge-red':o.priority==='TB'?'badge-yellow':'badge-gray'}`}>{o.priority}</span></td>
              </tr>
            )
          })}</tbody>
        </table></div>
      </div>

      <div className="g2" style={{gridTemplateColumns:'1.2fr 1fr'}}>
        <div className="card">
          <div className="card-title"><span className="card-title-left">{tx.formTitle}</span></div>
          <div className="fg4" style={{marginBottom:12}}>
            <div className="fr"><label>{tx.fields[0]}</label><input value={draft.id} onChange={e=>setDraft({...draft,id:e.target.value})} placeholder="Mã đơn..." /></div>
            <div className="fr"><label>{tx.fields[1]}</label>
              <select value={draft.region} onChange={e=>setDraft({...draft,region:e.target.value})}>{regions.slice(1).map(r=><option key={r}>{r}</option>)}</select>
            </div>
            <div className="fr"><label>{tx.fields[2]}</label><input value={draft.code} onChange={e=>setDraft({...draft,code:e.target.value})} placeholder="Mã SP..." /></div>
            <div className="fr"><label>{tx.fields[3]}</label><input value={draft.spec} onChange={e=>setDraft({...draft,spec:e.target.value})} /></div>
            <div className="fr"><label>{tx.fields[4]}</label><input value={draft.qty} onChange={e=>setDraft({...draft,qty:e.target.value})} /></div>
            <div className="fr"><label>{tx.fields[5]}</label>
              <select value={draft.unit} onChange={e=>setDraft({...draft,unit:e.target.value})}><option>thùng</option><option>箱</option><option>桶</option><option>chai</option></select>
            </div>
            <div className="fr"><label>{tx.fields[6]}</label><input value={draft.deadline} onChange={e=>setDraft({...draft,deadline:e.target.value})} placeholder="dd/mm/yyyy" /></div>
            <div className="fr"><label>{tx.fields[7]}</label>
              <select value={draft.priority} onChange={e=>setDraft({...draft,priority:e.target.value})}><option>Cao</option><option>TB</option><option>Thấp</option></select>
            </div>
          </div>
          <button className="btn btn-primary w100" onClick={addOrder}>{tx.addBtn}</button>
        </div>

        <div className="card">
          <div className="card-title"><span className="card-title-left">{tx.aiTitle}</span></div>
          <div className="tl">
            {[
              ['tl-blue','📥','Tự động nhập đơn',`Tự nhập đơn line ${L.code} từ các khu vực, dịch sang tiếng Việt, thay thế nhập tay.`],
              ['tl-yellow','⚠️','Cảnh báo vượt số lượng','Tự phát hiện đơn SX vượt kế hoạch bán hàng dự kiến.'],
              ['tl-green','✅','Khấu trừ KH năm','Tự động trừ số đã thông báo SX khỏi kế hoạch bán hàng năm.'],
              ['tl-red','🔴','Đơn gấp/chèn ngang',`${stats.notyet} đơn chưa SX, ưu tiên Cao cần chèn lịch.`],
            ].map(([cls,icon,title,desc],i)=>(
              <div key={i} className="tl-item">
                <div className={'tl-dot '+cls}>{icon}</div>
                <div className="tl-body"><div className="tl-title">{title}</div><div className="tl-meta">{desc}</div></div>
              </div>
            ))}
          </div>
          <button className="btn btn-outline w100 mt12" onClick={()=>navigate(`/planning/${line}/material-analysis`)}>{tx.next} 🧪</button>
        </div>
      </div>
    </div>
    <FormsPanel forms={FORMS} onOpen={openForm} collapsible />
    </div>
  )
}
