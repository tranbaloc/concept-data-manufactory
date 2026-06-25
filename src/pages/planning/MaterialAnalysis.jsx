import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../i18n/context'
import PlanningStepBar from './PlanningStepBar'
import FormsPanel from '../../components/FormsPanel'
import { printFormWindow } from '../orders/forms/printUtils'
import { formMaterialAnalysis, formMaterialRequest } from './forms/planningForms'
import { LINES, materialData } from './planningData'
import './planning.css'

const fmt = (n) => typeof n === 'number' ? n.toLocaleString('vi-VN') : n

const T = {
  vi: {
    title:'Phân Tích Nguyên Vật Liệu Từng Đơn Hàng',
    subtitle:'Tính BOM nhu cầu NVL theo từng đơn, đối chiếu tồn kho, cảnh báo thiếu & phiếu xin mua',
    kpis:['Tổng nhu cầu NVL','Số đơn phân tích','Cảnh báo thiếu liệu','Phiếu xin mua'],
    tabs:['① Phân Tích NVL Từng Đơn','② Đối Chiếu Tồn Kho','③ Phiếu Xin Mua NVL'],
    colHead:['Mã đơn','Khu vực','Mã SP','Quy cách','Số lượng','Định mức','Nhu cầu NVL','Ghi chú'],
    breakdown:'Chi Tiết Phân Tích BOM',
    invHead:['Nguyên vật liệu','Nhu cầu','Tồn kho','Đã giữ','Đang về','Khả dụng','Trạng thái'],
    enough:'Đủ', shortage:'Thiếu', risk:'Cần theo dõi',
    reqHead:['Ngày nhu cầu','Lượng nhu cầu','Ngày cung cấp','Lượng cung cấp'],
    submit:'📤 Gửi Phiếu Xin Mua → BP Nguyên Liệu', next:'→ Xác Nhận Giao Kỳ',
    aiTitle:'🤖 Phân Tích AI – Khả Năng Đáp Ứng NVL', ruleTitle:'📐 Tiêu Chuẩn / Công Đoạn',
  },
  zh: {
    title:'各订单原料需求分析',
    subtitle:'依订单计算 BOM 原料需求、比对库存、缺料预警与请购单',
    kpis:['原料总需求','分析订单数','缺料预警','请购单'],
    tabs:['① 各订单原料分析','② 库存比对','③ 原料请购单'],
    colHead:['订单号','区域','产品代号','规格','数量','定额','原料需求','备注'],
    breakdown:'BOM 详细分析',
    invHead:['原物料','需求','库存','已保留','在途','可用','状态'],
    enough:'足够', shortage:'不足', risk:'需追踪',
    reqHead:['需求日','需求量','供应日','供应量'],
    submit:'📤 提交请购单 → 原料部', next:'→ 交期确认',
    aiTitle:'🤖 AI 分析 – 原料供应能力', ruleTitle:'📐 标准 / 工序',
  },
}

export default function MaterialAnalysis() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
  const { line='av' } = useParams()
  const L = LINES[line] || LINES.av
  const D = materialData[line] || materialData.av
  const orders = D.orders

  const [tab, setTab] = useState(0)
  const [selId, setSelId] = useState(orders[0].id)
  const [submitted, setSubmitted] = useState(false)

  const sel = orders.find(o => o.id === selId) || orders[0]
  const totalReq = useMemo(()=>orders.reduce((s,o)=>s+(o.materialReq||0),0),[orders])

  const invCalc = D.inventory.map(m=>{
    const avail = m.onHand - m.reserved + m.incoming
    const status = avail >= m.need ? 'enough' : avail >= m.need*0.85 ? 'risk' : 'shortage'
    return {...m, avail, status}
  })
  const shortageCount = invCalc.filter(m=>m.status==='shortage').length

  const kpis = [
    {label:tx.kpis[0],val:fmt(totalReq),sub:'kg',color:'var(--blue)'},
    {label:tx.kpis[1],val:orders.length,sub:`Line ${L.code}`,color:'var(--green)'},
    {label:tx.kpis[2],val:shortageCount,sub:'cần mua gấp',color:'var(--red)'},
    {label:tx.kpis[3],val:D.reqDoc,sub:'mã phiếu',color:'#8b5cf6'},
  ]

  const FORMS = [
    {code:'P-PM 002-01', label:'Bảng Tính Nguyên Liệu'},
    {code:'P-OO 001-01.05', label:'Bảng Nhu Cầu Nguyên Liệu'},
  ]
  const openForm = (f) => {
    if (f.code === 'P-OO 001-01.05') printFormWindow(formMaterialRequest({docNo:D.reqDoc, date:'25/06/2026', block:L.code, rows:D.requestRows.map(r=>({needDate:r.date, need:r.need}))}), f.code)
    else printFormWindow(formMaterialAnalysis({period:`Line ${L.code}`, date:'25/06/2026', total:totalReq, rows:orders}), f.code)
  }

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

      <PlanningStepBar active={2} line={line} />

      <div className="g4">
        {kpis.map((k,i)=>(
          <div className="sc" key={i}>
            <div className="sc-label">{k.label}</div>
            <div className="sc-value" style={{color:k.color}}>{k.val}</div>
            <div className="sc-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {tx.tabs.map((t,i)=>(<div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>))}
      </div>

      {tab===0 && (
        <div className="g2" style={{gridTemplateColumns:'1.4fr 1fr'}}>
          <div className="sg">
            <div className="card">
              <div className="card-title"><span className="card-title-left" style={{color:L.color}}>📋 Bảng Tính Nhu Cầu NVL – Line {L.code}</span></div>
              <div className="tw"><table>
                <thead><tr>{tx.colHead.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
                <tbody>{orders.map(o=>(
                  <tr key={o.id} onClick={()=>setSelId(o.id)} style={{cursor:'pointer',background:o.id===selId?'var(--blue-xlight)':undefined}}>
                    <td className="fw6 tsm tb">{o.id}</td>
                    <td className="tsm">{o.region}</td>
                    <td className="tsm">{o.code}</td>
                    <td><span className={`badge ${o.specType==='lớn'?'badge-blue':o.specType==='đặc biệt'?'badge-red':'badge-gray'}`}>{o.spec}</span></td>
                    <td className="tsm">{fmt(o.qty)} {o.unit}</td>
                    <td className="tsm fw5">{typeof o.nvlRule==='number'?`${o.nvlRule}%`:o.nvlRule}</td>
                    <td className="fw6 tsm">{fmt(o.materialReq)}</td>
                    <td className="tsm cm trunc" style={{maxWidth:130}}>{o.note}</td>
                  </tr>
                ))}</tbody>
                <tfoot><tr style={{fontWeight:700,background:'var(--bg)'}}><td colSpan={6}>Tổng cộng</td><td className="tb">{fmt(totalReq)}</td><td>kg</td></tr></tfoot>
              </table></div>
            </div>
            <div className="card">
              <div className="card-title"><span className="card-title-left">{tx.ruleTitle} – Line {L.code}</span></div>
              <div className="sg" style={{gap:6}}>
                {D.specRules.map((r,i)=>(
                  <div key={i} className="fl ic jb" style={{padding:'9px 12px',background:'var(--bg)',borderRadius:8,borderLeft:`3px solid ${r.color}`}}>
                    <div><span className="fw6 tsm">{r.code}</span> <span className="badge badge-gray" style={{marginLeft:6}}>{r.spec}</span></div>
                    <span className="tsm fw5" style={{color:r.color}}>{r.rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sg">
            <div className="card">
              <div className="card-title"><span className="card-title-left">🔍 {tx.breakdown}</span><span className="badge badge-blue">{sel.id}</span></div>
              <div className="fg2" style={{marginBottom:12}}>
                <div className="fr"><label>Mã sản phẩm</label><input readOnly value={sel.code} /></div>
                <div className="fr"><label>Quy cách</label><input readOnly value={`${sel.spec}`} /></div>
                <div className="fr"><label>Số lượng</label><input readOnly value={`${fmt(sel.qty)} ${sel.unit}`} /></div>
                <div className="fr"><label>Định mức NVL</label><input readOnly value={typeof sel.nvlRule==='number'?`${sel.nvlRule}%`:sel.nvlRule} /></div>
              </div>
              <div className="al al-blue">
                <div><div className="fw6">Nhu cầu NVL = {fmt(sel.materialReq)} kg</div>
                <div className="tsm cm mt4">= SL đơn × định mức quy cách {sel.spec} × tỉ lệ NVL</div></div>
              </div>
            </div>
            <div className="card">
              <div className="card-title"><span className="card-title-left">{tx.aiTitle}</span></div>
              <div className="tl">
                {invCalc.slice(0,4).map((m,i)=>{
                  const cls = m.status==='enough'?'tl-green':m.status==='risk'?'tl-yellow':'tl-red'
                  const ic = m.status==='enough'?'✅':m.status==='risk'?'⚠️':'🔴'
                  return (
                    <div key={i} className="tl-item">
                      <div className={'tl-dot '+cls}>{ic}</div>
                      <div className="tl-body"><div className="tl-title">{m.material}</div>
                      <div className="tl-meta">Cần {fmt(m.need)} · khả dụng {fmt(m.avail)} {m.unit}</div></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab===1 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">📦 Đối Chiếu Nhu Cầu vs Tồn Kho – Line {L.code}</span><span className="tsm cm">Khả dụng = Tồn − Đã giữ + Đang về</span></div>
          <div className="tw"><table>
            <thead><tr>{tx.invHead.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>{invCalc.map((m,i)=>(
              <tr key={i}>
                <td className="fw6 tsm">{m.material}</td>
                <td className="tsm">{fmt(m.need)} {m.unit}</td>
                <td className="tsm">{fmt(m.onHand)}</td>
                <td className="tsm tr">−{fmt(m.reserved)}</td>
                <td className="tsm tg">+{fmt(m.incoming)}</td>
                <td className="fw6 tsm">{fmt(m.avail)}</td>
                <td><span className={`badge ${m.status==='enough'?'badge-green':m.status==='risk'?'badge-yellow':'badge-red'}`}>{m.status==='enough'?tx.enough:m.status==='risk'?tx.risk:tx.shortage}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
          <div className="al al-yellow mt12"><div><div className="fw6">⚠️ {shortageCount} loại NVL thiếu hụt → tự đề xuất phiếu xin mua</div>
          <div className="tsm cm mt4">AI so sánh tồn kho, đã giữ, đang về & mức an toàn theo thời gian thực.</div></div></div>
        </div>
      )}

      {tab===2 && (
        <div className="g2" style={{gridTemplateColumns:'1.3fr 1fr'}}>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📝 Phiếu Nhu Cầu NVL (P-OO 001-01.05)</span><span className="badge badge-gray">{D.reqDoc}</span></div>
            <div className="fg3" style={{marginBottom:12}}>
              <div className="fr"><label>Mã số đơn</label><input defaultValue={D.reqDoc} /></div>
              <div className="fr"><label>Ngày lập biểu</label><input defaultValue="25/06/2026" /></div>
              <div className="fr"><label>Khối sản xuất</label><input defaultValue={L.code} /></div>
            </div>
            <div className="tw"><table>
              <thead><tr><th>STT</th>{tx.reqHead.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
              <tbody>{D.requestRows.map((r,i)=>(
                <tr key={i}><td className="fw5">{i+1}</td><td className="tsm">{r.date}</td><td className="fw6 tsm tb">{r.need}</td>
                <td><input className="tsm" placeholder="—" style={{width:'100%'}} /></td><td><input className="tsm" placeholder="—" style={{width:'100%'}} /></td></tr>
              ))}</tbody>
            </table></div>
          </div>
          <div className="sg">
            <div className="card">
              <div className="card-title"><span className="card-title-left">✍️ Ký Duyệt</span></div>
              <div className="fg3">
                {[['Phó Tổng Điều Hành','李群立'],['CQ BP Nguyên Liệu','—'],['CQ BP Kế Hoạch','洪寶玲']].map(([r,n])=>(
                  <div key={r} className="fr"><label>{r}</label>
                  <div style={{padding:'8px 10px',background:'var(--bg)',borderRadius:6,border:'1px solid var(--border)',fontSize:12,textAlign:'center',color:n==='—'?'var(--muted)':'var(--text)',fontStyle:n==='—'?'italic':'normal'}}>{n==='—'?'Chờ ký...':n}</div></div>
                ))}
              </div>
            </div>
            {!submitted ? (
              <button className="btn btn-primary w100" onClick={()=>setSubmitted(true)}>{tx.submit}</button>
            ) : (
              <div className="sg" style={{gap:8}}>
                <div className="al al-green">✅ Phiếu xin mua NVL đã gửi & lưu hệ thống</div>
                <button className="btn btn-primary" onClick={()=>navigate(`/planning/${line}/delivery-confirm`)}>{tx.next} 🤝</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    <FormsPanel forms={FORMS} onOpen={openForm} collapsible />
    </div>
  )
}
