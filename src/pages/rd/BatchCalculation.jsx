import { useState } from 'react'

const initRows = [
  {name:'Nước tinh khiết',pct:62.40,unit:'kg',base:312.0,scaled:'',risk:false},
  {name:'Sucrose',pct:11.20,unit:'kg',base:56.0,scaled:'',risk:false},
  {name:'Acid citric',pct:0.28,unit:'kg',base:1.40,scaled:'',risk:true},
  {name:'Natri benzoate',pct:0.05,unit:'g',base:250,scaled:'',risk:false},
  {name:'Hương tự nhiên cam',pct:0.15,unit:'g',base:750,scaled:'',risk:false},
  {name:'NFC 65°Brix',pct:25.89,unit:'kg',base:129.45,scaled:'',risk:false},
  {name:'Vitamin C',pct:0.02,unit:'g',base:100,scaled:'',risk:false},
  {name:'Màu β-caroten',pct:0.01,unit:'g',base:50,scaled:'',risk:false},
]

export default function BatchCalculation() {
  const [baseSize, setBaseSize] = useState(500)
  const [targetSize, setTargetSize] = useState(500)
  const [variance, setVariance] = useState(2)
  const [rows, setRows] = useState(initRows)
  const [calculated, setCalculated] = useState(false)

  const calculate = () => {
    const ratio = targetSize / baseSize
    setRows(rows.map(r => ({
      ...r,
      scaled: (r.base * ratio * (1 + variance/100)).toFixed(r.unit === 'kg' ? 2 : 0),
    })))
    setCalculated(true)
  }

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>📐 Tính Toán Batch & Quy Đổi</h1><p>Tự động scale công thức theo kích thước batch, cảnh báo tham số có rủi ro</p></div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">🔢 Thông số tính toán</span></div>
          <div className="fg2">
            <div className="fr"><label>Batch gốc (kg)</label>
              <input type="number" value={baseSize} onChange={e=>setBaseSize(+e.target.value)} />
            </div>
            <div className="fr"><label>Batch mục tiêu (kg)</label>
              <input type="number" value={targetSize} onChange={e=>setTargetSize(+e.target.value)} />
            </div>
            <div className="fr"><label>Dung sai nguyên liệu (%)</label>
              <input type="number" value={variance} onChange={e=>setVariance(+e.target.value)} />
            </div>
            <div className="fr"><label>Công thức</label>
              <select><option>GV-NC-VN-2026-A3</option><option>GV-NC-US-2025-B2</option></select>
            </div>
          </div>
          <div className="fl g8 mt16">
            <button className="btn btn-primary" onClick={calculate}>⚡ Tính Toán</button>
            <button className="btn btn-ghost">🔄 Reset</button>
          </div>

          {calculated && (
            <div className="mt16">
              <div className="al al-blue">
                ℹ️ Hệ số scale: <strong>{(targetSize/baseSize).toFixed(2)}x</strong> · Tổng batch mục tiêu: <strong>{targetSize} kg</strong>
              </div>
              {rows.some(r=>r.risk) && (
                <div className="al al-yellow mt8">⚠️ <strong>Acid citric</strong> gần ngưỡng ảnh hưởng ổn định – xem xét kiểm tra batch trung gian.</div>
              )}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title"><span className="card-title-left">📊 Thông số batch</span></div>
          <div className="sg3">
            {[
              {label:'Hệ số quy đổi',val:`${(targetSize/baseSize).toFixed(2)}x`},
              {label:'Tổng khối lượng',val:`${targetSize} kg`},
              {label:'Năng suất dự kiến',val:`${Math.round(targetSize/0.345)} chai`},
            ].map((s,i)=>(
              <div className="sc" key={i}>
                <div className="sc-label">{s.label}</div>
                <div className="sc-value" style={{fontSize:20,color:'var(--blue)'}}>{s.val}</div>
              </div>
            ))}
          </div>
          <div className="divider"/>
          <div className="fw6 mb8">Kiểm tra ổn định batch</div>
          {[
            {label:'Độ đồng nhất màu sắc',val:97,color:'#107c10'},
            {label:'Ổn định pH',val:94,color:'#0078d4'},
            {label:'Độ bão hòa CO₂',val:88,color:'#d97706'},
            {label:'Kiểm soát dung sai',val:99,color:'#107c10'},
          ].map((m,i)=>(
            <div className="meter-row" key={i}>
              <div className="meter-label tsm">{m.label}</div>
              <div className="meter-bar"><div className="meter-fill" style={{width:`${m.val}%`,background:m.color}}/></div>
              <div className="meter-val" style={{color:m.color}}>{m.val}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">📋 Chi tiết thành phần</span></div>
        <div className="tw">
          <table>
            <thead><tr><th>Nguyên liệu</th><th>% w/w</th><th>Batch gốc ({baseSize}kg)</th><th>Batch mục tiêu ({targetSize}kg)</th><th>Đơn vị</th><th>Rủi ro</th></tr></thead>
            <tbody>{rows.map((r,i)=>(
              <tr key={i}>
                <td className="fw5">{r.name}</td>
                <td>{r.pct}%</td>
                <td>{r.base}</td>
                <td className={calculated?'fw6 tb':''}>
                  {calculated ? r.scaled : '—'}
                </td>
                <td className="cm">{r.unit}</td>
                <td>{r.risk ? <span className="badge badge-yellow">⚠️ Kiểm tra</span> : <span className="badge badge-green">✓ OK</span>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        {calculated && <div className="fl g8 mt12"><button className="btn btn-outline btn-sm">📥 Xuất Excel</button><button className="btn btn-ghost btn-sm">🖨️ In phiếu</button></div>}
      </div>
    </div>
  )
}
