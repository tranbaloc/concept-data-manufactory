import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../i18n/context'
import PlanningStepBar from './PlanningStepBar'
import FormsPanel from '../../components/FormsPanel'
import { printFormWindow } from '../orders/forms/printUtils'
import { formDeliveryConfirm } from './forms/planningForms'
import { LINES, deliveryData } from './planningData'
import './planning.css'

const SBADGE = {done:['Đã xác nhận','badge-green'], risk:['Cần theo dõi','badge-yellow'], pending:['Chờ xác nhận','badge-gray']}

const T = {
  vi:{
    title:'Xác Nhận Giao Kỳ Liên Phòng Ban',
    subtitle:'Tổng hợp xác nhận từ KT / SX / Thu Mua / QA / Kho để chốt ngày giao & trả lời nghiệp vụ',
    confTitle:'📑 Ma Trận Xác Nhận Liên Phòng Ban', confHead:['Phòng ban','Nội dung xác nhận','Kết quả','Trạng thái','Phụ trách'],
    scTitle:'🧮 Mô Phỏng Phương Án Giao Kỳ (AI)', scHead:['Phương án','Ngày giao','Chênh lệch','Chi phí','Rủi ro','Ghi chú'],
    trackTitle:'📌 Theo Dõi Sát Sao (跟催)', trackHead:['Nhóm','Mục theo dõi','Bộ phận','Trạng thái'],
    suggestTitle:'✅ Ngày Giao Đề Xuất', confirmBtn:'🔒 Chốt Ngày Giao & Trả Lời Nghiệp Vụ',
    confirmed:'Đã chốt ngày giao — lưu hệ thống làm căn cứ排程 & theo dõi tiến độ', next:'→ Lệnh Sản Xuất',
  },
  zh:{
    title:'跨部门交期确认',
    subtitle:'汇总技术/生产/采购/QA/仓储确认，确定交货日期并回复业务',
    confTitle:'📑 跨部门确认矩阵', confHead:['部门','确认内容','结果','状态','负责'],
    scTitle:'🧮 交期方案模拟 (AI)', scHead:['方案','交货日','差异','成本','风险','备注'],
    trackTitle:'📌 相关项目跟催', trackHead:['分组','跟催项目','部门','状态'],
    suggestTitle:'✅ 建议交货日', confirmBtn:'🔒 确定交期并回复业务',
    confirmed:'交期已确定 — 存入系统作为排程与进度追踪依据', next:'→ 生产指令',
  },
}

export default function DeliveryConfirm() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
  const { line='av' } = useParams()
  const L = LINES[line] || LINES.av
  const D = deliveryData[line] || deliveryData.av

  const [pick, setPick] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const doneCount = D.deptConfirms.filter(d=>d.status==='done').length

  const FORMS = [{code:'P-PM 003-01', label:'Phiếu Xác Nhận Giao Kỳ'}]
  const openForm = () => printFormWindow(formDeliveryConfirm({order:D.order, product:D.product, deliveryDate:D.scenarios[pick].date, rows:D.deptConfirms}), 'P-PM 003-01')

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

      <PlanningStepBar active={3} line={line} />

      <div className="card" style={{padding:'14px 18px'}}>
        <div className="fl ic jb">
          <div className="fl ic g8"><span className="tsm cm">Đơn hàng:</span><span className="badge badge-blue">{D.order} · {D.product}</span></div>
          <div className="fl ic g8"><span className="tsm cm">Xác nhận: {doneCount}/{D.deptConfirms.length} phòng ban</span>
            <div className="meter-bar" style={{width:120}}><div className="meter-fill" style={{width:`${doneCount/D.deptConfirms.length*100}%`,background:'var(--green)'}} /></div></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">{tx.confTitle}</span></div>
        <div className="tw"><table>
          <thead><tr>{tx.confHead.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
          <tbody>{D.deptConfirms.map((d,i)=>(
            <tr key={i}>
              <td><span className="fw6 tsm" style={{color:d.color}}>{d.icon} {d.dept}</span></td>
              <td className="tsm cm" style={{maxWidth:260}}>{d.items}</td>
              <td className="tsm fw5">{d.value}</td>
              <td><span className={`badge ${SBADGE[d.status][1]}`}>{SBADGE[d.status][0]}</span></td>
              <td className="tsm">{d.who}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>

      <div className="g2" style={{gridTemplateColumns:'1.3fr 1fr'}}>
        <div className="card">
          <div className="card-title"><span className="card-title-left">{tx.scTitle}</span></div>
          <div className="tw"><table>
            <thead><tr>{tx.scHead.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>{D.scenarios.map((s,i)=>(
              <tr key={i} onClick={()=>setPick(i)} style={{cursor:'pointer',background:i===pick?'var(--blue-xlight)':undefined}}>
                <td className="fl ic g6"><input type="radio" checked={i===pick} onChange={()=>setPick(i)} /><span className="fw5 tsm">{s.name}</span></td>
                <td className="fw6 tsm tb">{s.date}</td>
                <td className="tsm tg">{s.delay}</td>
                <td className="tsm">{s.cost}%</td>
                <td><span className={`badge ${s.risk==='Thấp'?'badge-green':s.risk==='TB'?'badge-yellow':'badge-red'}`}>{s.risk}</span></td>
                <td className="tsm cm">{s.note}</td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
        <div className="sg">
          <div className="card" style={{borderLeft:'3px solid var(--green)'}}>
            <div className="card-title"><span className="card-title-left">{tx.suggestTitle}</span></div>
            <div style={{fontSize:30,fontWeight:800,color:'var(--green)',lineHeight:1.1}}>{D.scenarios[pick].date}</div>
            <div className="tsm cm mt4">Phương án: {D.scenarios[pick].name} · {D.scenarios[pick].delay} · rủi ro {D.scenarios[pick].risk}</div>
            {D.deptConfirms.some(d=>d.status!=='done') && (
              <div className="al al-yellow mt12"><div><div className="fw6 tsm">⚠️ Còn {D.deptConfirms.filter(d=>d.status!=='done').length} phòng ban chưa xác nhận</div>
              <div className="tsm cm mt4">Hệ thống cảnh báo nguyên nhân để xử lý trước.</div></div></div>
            )}
            {!confirmed ? (
              <button className="btn btn-primary w100 mt12" onClick={()=>setConfirmed(true)}>{tx.confirmBtn}</button>
            ) : (
              <div className="sg" style={{gap:8,marginTop:12}}>
                <div className="al al-green tsm">✅ {tx.confirmed}</div>
                <button className="btn btn-primary" onClick={()=>navigate(`/planning/${line}/production-order`)}>{tx.next} 🏭</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">{tx.trackTitle}</span><span className="tsm cm">{D.tracking.filter(t=>t.status==='done').length}/{D.tracking.length} hoàn tất</span></div>
        <div className="tw"><table>
          <thead><tr>{tx.trackHead.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
          <tbody>{D.tracking.map((t,i)=>(
            <tr key={i}><td><span className="badge badge-gray">{t.grp}</span></td><td className="tsm">{t.item}</td><td className="tsm cm">{t.dept}</td>
            <td><span className={`badge ${SBADGE[t.status][1]}`}>{SBADGE[t.status][0]}</span></td></tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
    <FormsPanel forms={FORMS} onOpen={openForm} collapsible />
    </div>
  )
}
