import { useState } from 'react'
import { useLang } from '../../i18n/context'

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

const T = {
  vi: {
    title: '📐 Tính Toán Batch & Quy Đổi',
    subtitle: 'Tự động scale công thức theo kích thước batch, cảnh báo tham số có rủi ro',
    paramsCard: '🔢 Thông số tính toán',
    statsCard: '📊 Thông số batch',
    detailCard: '📋 Chi tiết thành phần',
    lConvert: 'Hệ số quy đổi',
    lTotal: 'Tổng khối lượng',
    lYield: 'Năng suất dự kiến',
    lColor: 'Độ đồng nhất màu sắc',
    lPH: 'Ổn định pH',
    lCO2: 'Độ bão hòa CO₂',
    lTol: 'Kiểm soát dung sai',
    thIng: 'Nguyên liệu',
    thWw: '% w/w',
    thBase: 'Batch gốc',
    thTarget: 'Batch mục tiêu',
    thUnit: 'Đơn vị',
    thRisk: 'Rủi ro',
  },
  zh: {
    title: '📐 批量计算与换算',
    subtitle: '根据批量大小自动缩放配方，警告有风险的参数',
    paramsCard: '🔢 计算参数',
    statsCard: '📊 批量参数',
    detailCard: '📋 成分详情',
    lConvert: '换算系数',
    lTotal: '总质量',
    lYield: '预计产量',
    lColor: '颜色均匀性',
    lPH: 'pH稳定性',
    lCO2: 'CO₂饱和度',
    lTol: '公差控制',
    thIng: '原料',
    thWw: '% w/w',
    thBase: '基础批量',
    thTarget: '目标批量',
    thUnit: '单位',
    thRisk: '风险',
  },
}

export default function BatchCalculation() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
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
        <div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">{tx.paramsCard}</span></div>
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
          <div className="card-title"><span className="card-title-left">{tx.statsCard}</span></div>
          <div className="sg3">
            {[
              {label:tx.lConvert,val:`${(targetSize/baseSize).toFixed(2)}x`},
              {label:tx.lTotal,val:`${targetSize} kg`},
              {label:tx.lYield,val:`${Math.round(targetSize/0.345)} chai`},
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
            {label:tx.lColor,val:97,color:'#107c10'},
            {label:tx.lPH,val:94,color:'#0078d4'},
            {label:tx.lCO2,val:88,color:'#d97706'},
            {label:tx.lTol,val:99,color:'#107c10'},
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
        <div className="card-title"><span className="card-title-left">{tx.detailCard}</span></div>
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
