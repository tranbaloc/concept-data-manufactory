import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../i18n/context'
import PlanningStepBar from './PlanningStepBar'
import FormsPanel from '../../components/FormsPanel'
import { printFormWindow } from '../orders/forms/printUtils'
import { formProductionOrder } from './forms/planningForms'
import { LINES, productionData } from './planningData'
import './planning.css'

const fmt = (n)=>Number(n).toLocaleString('vi-VN')

const T = {
  vi:{ title:'Lệnh Sản Xuất – Sắp Kế Hoạch Chi Tiết & Phát Hành Xuống Xưởng',
    issueTitle:'📤 Phát Hành Lệnh Sản Xuất', issueFields:['Số lệnh SX','Line / Bộ phận','Ngày bắt đầu','Ngày hoàn thành','Ca SX','Người duyệt'],
    issueBtn:'🏭 Phát Hành Lệnh Sản Xuất Xuống Xưởng',
    issued:'Lệnh sản xuất đã phát hành xuống xưởng — cập nhật trạng thái đơn sang "Đang SX" & theo dõi real-time',
    backHome:'← Về Bảng Quản Chế Đơn', schedule:'📅 Lịch Sản Xuất' },
  zh:{ title:'生产指令 – 详细排程与下达车间',
    issueTitle:'📤 下达生产指令', issueFields:['生产指令号','线别/部门','开始日','完成日','生产班','审核人'],
    issueBtn:'🏭 下达生产指令至车间',
    issued:'生产指令已下达车间 — 订单状态更新为"生产中"并实时追踪',
    backHome:'← 返回订单管制表', schedule:'📅 生产排程' },
}

function AVContent({D,L}){
  return (
    <div className="card">
      <div className="card-title"><span className="card-title-left" style={{color:L.color}}>📅 Kế Hoạch Chi Tiết AV (計劃 / 實際)</span><span className="tsm cm">NVL chuẩn 20.000 kg/ngày · chia theo quy cách</span></div>
      <div className="tw"><table>
        <thead><tr><th>Mã đơn</th><th>Mã SP</th><th>Quy cách</th><th>SL</th><th>Tổ</th><th>Kế hoạch vs Thực tế theo ngày</th></tr></thead>
        <tbody>{D.detail.map((r,i)=>(
          <tr key={i}>
            <td className="fw6 tsm tb">{r.order}</td><td className="tsm">{r.code}</td>
            <td><span className="badge badge-gray">{r.spec}</span></td>
            <td className="tsm">{fmt(r.qty)} {r.unit}</td><td><span className="badge badge-blue">{r.sub}</span></td>
            <td><div className="fl ic g6" style={{flexWrap:'wrap'}}>
              {r.plan.map((p,j)=>(
                <div key={j} style={{textAlign:'center',minWidth:56,padding:'6px 8px',borderRadius:8,background:'var(--bg)',border:'1px solid var(--border)'}}>
                  <div className="cm" style={{fontSize:13,fontWeight:600}}>N{j+1}</div>
                  <div className="tb" style={{fontSize:16,fontWeight:700}}>{p}</div>
                  <div style={{fontSize:16,fontWeight:600,color:r.actual[j]>=p?'var(--green)':r.actual[j]?'var(--red)':'var(--muted)'}}>{r.actual[j]||'·'}</div>
                </div>
              ))}
            </div></td>
          </tr>
        ))}</tbody>
      </table></div>
      <div className="tsm cm mt8">Hàng trên = Kế hoạch (計劃), hàng dưới = Thực tế (實際). Xanh: đạt/vượt KH.</div>
    </div>
  )
}

function NDContent({D,L}){
  return (
    <div className="g2" style={{gridTemplateColumns:'1fr 1.1fr'}}>
      <div className="card">
        <div className="card-title"><span className="card-title-left" style={{color:L.color}}>⏪ Hồi Tính Thời Gian Nata</span></div>
        <p className="tsm cm" style={{marginBottom:12}}>Từ ngày SX cuối, hồi tính ngược qua các công đoạn để xác định ngày NVL sẵn sàng & ngày cấy sớm nhất.</p>
        <div className="tl">{D.backCalc.map((s,i)=>(
          <div key={i} className="tl-item">
            <div className="tl-dot" style={{background:i===D.backCalc.length-1?'var(--green-lt)':'var(--blue-xlight)'}}>{s.icon}</div>
            <div className="tl-body"><div className="fl ic jb"><span className="tl-title">{s.step}</span><span className="badge badge-blue">{s.date}</span></div>
            <div className="tl-meta">{s.who} · {s.note}{s.lead>0?` · −${s.lead} ngày`:''}</div></div>
          </div>
        ))}</div>
        <div className="al al-green mt12"><div><div className="fw6 tsm">✅ Ngày cấy sớm nhất: 01/03/2026</div>
        <div className="tsm cm mt4">Để kịp SX 15/03, nata phải cấy chậm nhất 01/03 (ủ 14 ngày).</div></div></div>
      </div>
      <div className="card">
        <div className="card-title"><span className="card-title-left">📋 Đơn ND & Thời Gian Quan Sát</span></div>
        <div className="tw"><table>
          <thead><tr><th>Mã đơn</th><th>Mã SP</th><th>SL</th><th>Deadline</th><th>QS</th></tr></thead>
          <tbody>{D.orders.map((o,i)=>(
            <tr key={i}><td className="fw6 tsm tb">{o.order}</td><td className="tsm">{o.code}</td><td className="tsm">{fmt(o.qty)} {o.unit}</td>
            <td className="tsm cm" style={{maxWidth:150}}>{o.deadline}</td><td><span className={`badge ${o.obs==='cqs'?'badge-yellow':'badge-green'}`}>{o.obs}</span></td></tr>
          ))}</tbody>
        </table></div>
        <div className="tsm cm mt8">cqs = có thời gian quan sát · kqs = không có (đóng cont trực tiếp).</div>
      </div>
    </div>
  )
}

function GVContent({D,L}){
  return (
    <div className="g2">
      <div className="card">
        <div className="card-title"><span className="card-title-left" style={{color:L.color}}>⚙️ Kiểm Tra Đụng Máy (GV)</span></div>
        <div className="tw"><table>
          <thead><tr><th>Sản phẩm A</th><th>Sản phẩm B</th><th>Máy</th><th>Trạng thái</th></tr></thead>
          <tbody>{D.machine.map((m,i)=>(
            <tr key={i}><td className="tsm fw5">{m.a}</td><td className="tsm fw5">{m.b}</td><td className="tsm">{m.machine}</td>
            <td><span className={`badge ${m.conflict?'badge-red':'badge-green'}`}>{m.conflict?'Đụng máy':'OK'}</span></td></tr>
          ))}</tbody>
        </table></div>
        <div className="al al-yellow mt12 tsm">⚠️ Các cặp SP dùng chung máy NF 8mt → không xếp cùng ca, cần giãn lịch.</div>
      </div>
      <div className="card">
        <div className="card-title"><span className="card-title-left">🍬 Kế Hoạch Lượng Đường (融糖)</span></div>
        <div className="tw"><table>
          <thead><tr><th>Tuần</th><th>WM01 NVL</th><th>Lượng đường</th><th>Trạng thái</th></tr></thead>
          <tbody>{D.sugar.map((s,i)=>(
            <tr key={i}><td className="tsm fw5">{s.week}</td><td className="tsm">{s.wm01}</td><td className="tsm fw6 tb">{s.sugar}</td>
            <td><span className={`badge ${s.status==='done'?'badge-green':'badge-gray'}`}>{s.status==='done'?'Đã gửi mail':'Kế hoạch'}</span></td></tr>
          ))}</tbody>
        </table></div>
        <div className="tsm cm mt8">KT cung cấp lịch xử lý đường theo ca · gửi mail báo lượng đường.</div>
      </div>
    </div>
  )
}

export default function ProductionOrderIssue() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const navigate = useNavigate()
  const { line='av' } = useParams()
  const L = LINES[line] || LINES.av
  const D = productionData[line] || productionData.av
  const [issued, setIssued] = useState(false)

  const FORMS = [{code:'P-PM 004-01', label:'Lệnh Sản Xuất'}]
  const openForm = () => {
    let rows = []
    if (line==='av') rows = D.detail.map(r=>({order:r.order,code:r.code,spec:r.spec,qty:r.qty,unit:r.unit,note:r.sub}))
    else if (line==='nd') rows = D.orders.map(r=>({order:r.order,code:r.code,qty:r.qty,unit:r.unit,deadline:r.deadline,note:r.obs}))
    else rows = D.machine.map(m=>({order:m.a,code:m.b,note:'Đụng máy '+m.machine}))
    printFormWindow(formProductionOrder({orderNo:D.issue.orderNo, line:D.issue.line, start:D.issue.start, finish:D.issue.finish, rows}), 'P-PM 004-01')
  }

  return (
    <div className="plan-ui" style={{display:'flex',gap:16,alignItems:'flex-start'}}>
    <div className="sg" style={{flex:1,minWidth:0}}>
      <div className="ph">
        <div className="fl ic g12">
          <div style={{width:46,height:46,borderRadius:12,background:L.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:800,flexShrink:0}}>{L.code}</div>
          <div><h1>{L.emoji} Line {L.code} – {tx.title}</h1><p>{L.name} · {L.dept}</p></div>
        </div>
        <div className="badge badge-blue">V1.1 · 生管部</div>
      </div>

      <PlanningStepBar active={4} line={line} />

      {line==='av' && <AVContent D={D} L={L} />}
      {line==='nd' && <NDContent D={D} L={L} />}
      {line==='gv' && <GVContent D={D} L={L} />}

      <div className="card" style={{borderTop:`3px solid ${L.color}`}}>
        <div className="card-title"><span className="card-title-left">{tx.issueTitle}</span><span className="badge badge-blue">{D.issue.line}</span></div>
        <div className="fg3" style={{marginBottom:12}}>
          <div className="fr"><label>{tx.issueFields[0]}</label><input defaultValue={D.issue.orderNo} /></div>
          <div className="fr"><label>{tx.issueFields[1]}</label><input defaultValue={D.issue.line} /></div>
          <div className="fr"><label>{tx.issueFields[2]}</label><input defaultValue={D.issue.start} /></div>
          <div className="fr"><label>{tx.issueFields[3]}</label><input defaultValue={D.issue.finish} /></div>
          <div className="fr"><label>{tx.issueFields[4]}</label><select defaultValue="2"><option value="1">1 ca</option><option value="2">2 ca</option><option value="3">3 ca</option></select></div>
          <div className="fr"><label>{tx.issueFields[5]}</label><input defaultValue="洪寶玲 (CQBP Kế Hoạch)" /></div>
        </div>
        {!issued ? (
          <button className="btn btn-primary w100" onClick={()=>setIssued(true)}>{tx.issueBtn}</button>
        ) : (
          <div className="sg" style={{gap:8}}>
            <div className="al al-green">✅ {tx.issued}</div>
            <div className="fl ic g8">
              <button className="btn btn-outline" onClick={()=>navigate(`/planning/${line}/order-control`)}>{tx.backHome}</button>
              <button className="btn btn-ghost" onClick={()=>navigate('/planning/schedule')}>{tx.schedule}</button>
            </div>
          </div>
        )}
      </div>
    </div>
    <FormsPanel forms={FORMS} onOpen={openForm} collapsible />
    </div>
  )
}
