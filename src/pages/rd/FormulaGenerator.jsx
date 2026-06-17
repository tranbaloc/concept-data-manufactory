import { useState } from 'react'
import { useLang } from '../../i18n/context'

const mockResult = {
  name: 'GIAVICO-NC-VN-2026-A3',
  ingredients: [
    {name:'Nước tinh khiết',pct:'62.40',role:'Dung môi'},
    {name:'Sucrose',pct:'11.20',role:'Chất tạo ngọt'},
    {name:'Acid citric',pct:'0.28',role:'Điều chỉnh pH'},
    {name:'Natri benzoate',pct:'0.05',role:'Bảo quản'},
    {name:'Hương tự nhiên cam',pct:'0.15',role:'Hương liệu'},
    {name:'Vitamin C',pct:'0.02',role:'Chất tăng cường'},
    {name:'Màu thực phẩm β-caroten',pct:'0.01',role:'Màu sắc'},
    {name:'Nước cô đặc NFC 65°Brix',pct:'25.89',role:'Nguyên liệu chính'},
  ],
  brix: '12.5',
  ph: '3.8',
  notes: ['Phù hợp quy định FDA 21 CFR cho thị trường Mỹ','Không chứa chất bảo quản có nguồn gốc tổng hợp vượt mức','Độ pH tối ưu cho ổn định màu và hương'],
  risks: ['Acid citric > 0.30% có thể ảnh hưởng ổn định màu','Kiểm tra tương tác Vitamin C – Natri benzoate trước khi scale lên'],
}

const T = {
  vi: {
    title: '🧪 Tạo Formula Theo Mục Tiêu',
    subtitle: 'Nhập điều kiện đầu vào, AI sẽ đề xuất công thức phù hợp và giải thích lý do điều chỉnh',
    inputCard: '⚙️ Điều kiện đầu vào',
    historyCard: '📋 Lịch sử công thức tương tự',
    generateBtn: '🤖 Tạo Formula AI',
    thCode: 'Mã công thức', thMarket: 'Thị trường', thBrix: 'Brix', thDate: 'Ngày tạo',
    thIngredient: 'Nguyên liệu', thPercent: '% w/w', thRole: 'Vai trò',
  },
  zh: {
    title: '🧪 AI配方生成',
    subtitle: '输入条件，AI将推荐合适的配方并解释调整原因',
    inputCard: '⚙️ 输入条件',
    historyCard: '📋 相似配方历史',
    generateBtn: '🤖 生成AI配方',
    thCode: '配方编号', thMarket: '市场', thBrix: 'Brix', thDate: '创建日期',
    thIngredient: '原料', thPercent: '% w/w', thRole: '作用',
  },
}

export default function FormulaGenerator() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [form, setForm] = useState({market:'vn',brix:'12.5',acid:'yes',reg:'FDA',region:'HCM',flavor:'cam'})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const generate = () => {
    setLoading(true)
    setTimeout(() => { setResult(mockResult); setLoading(false) }, 1200)
  }

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">{tx.inputCard}</span></div>
          <div className="sg" style={{gap:12}}>
            <div className="fg3">
              <div className="fr"><label>Thị trường</label>
                <select value={form.market} onChange={e=>setForm({...form,market:e.target.value})}>
                  <option value="vn">Việt Nam</option><option value="us">Mỹ (FDA)</option>
                  <option value="eu">EU</option><option value="cn">Trung Quốc</option>
                </select>
              </div>
              <div className="fr"><label>Độ đường (°Brix)</label>
                <input value={form.brix} onChange={e=>setForm({...form,brix:e.target.value})} placeholder="Vd: 12.5" />
              </div>
              <div className="fr"><label>Hương vị</label>
                <select value={form.flavor} onChange={e=>setForm({...form,flavor:e.target.value})}>
                  <option value="cam">Cam</option><option value="chanh">Chanh</option>
                  <option value="dua">Dứa</option><option value="xoai">Xoài</option>
                </select>
              </div>
            </div>
            <div className="fg3">
              <div className="fr"><label>Có acid hóa?</label>
                <select value={form.acid} onChange={e=>setForm({...form,acid:e.target.value})}>
                  <option value="yes">Có</option><option value="no">Không</option>
                </select>
              </div>
              <div className="fr"><label>Quy chuẩn pháp lý</label>
                <select value={form.reg} onChange={e=>setForm({...form,reg:e.target.value})}>
                  <option value="FDA">FDA (Mỹ)</option><option value="QCVN">QCVN (VN)</option>
                  <option value="EU">EU Reg.</option>
                </select>
              </div>
              <div className="fr"><label>Khu vực sản xuất</label>
                <select value={form.region} onChange={e=>setForm({...form,region:e.target.value})}>
                  <option value="HCM">TP. HCM</option><option value="HN">Hà Nội</option>
                  <option value="DN">Đà Nẵng</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary w100" onClick={generate} disabled={loading}>
              {loading ? '⏳ Đang phân tích...' : '🤖 Tạo Formula với AI'}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-title"><span className="card-title-left">{tx.historyCard}</span></div>
          <div className="tw">
            <table>
              <thead><tr><th>{tx.thCode}</th><th>{tx.thMarket}</th><th>{tx.thBrix}</th><th>{tx.thDate}</th></tr></thead>
              <tbody>
                {[['GV-NC-VN-2025-A1','VN','11.8','12/03/2025'],['GV-NC-US-2025-B2','US','12.0','05/05/2025'],
                  ['GV-NC-EU-2026-A1','EU','12.5','10/01/2026'],['GV-NC-VN-2026-A2','VN','12.5','15/03/2026']
                ].map(([code,mkt,brix,date],i)=>(
                  <tr key={i}><td className="tb fw5">{code}</td><td>{mkt}</td><td>{brix}</td><td className="cm tsm">{date}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="al al-blue mt12">ℹ️ AI sẽ so sánh với {4} công thức trong database và giải thích sự khác biệt.</div>
        </div>
      </div>

      {result && (
        <div className="card">
          <div className="card-title">
            <span className="card-title-left">✅ Kết quả đề xuất: <span className="tb">{result.name}</span></span>
            <div className="fl g8">
              <span className="badge badge-blue">Brix: {result.brix}</span>
              <span className="badge badge-blue">pH: {result.ph}</span>
              <button className="btn btn-outline btn-sm">📥 Xuất PDF</button>
            </div>
          </div>
          <div className="g2">
            <div>
              <div className="fw6 mb8">Thành phần công thức</div>
              <div className="tw">
                <table>
                  <thead><tr><th>{tx.thIngredient}</th><th>{tx.thPercent}</th><th>{tx.thRole}</th></tr></thead>
                  <tbody>{result.ingredients.map((r,i)=>(
                    <tr key={i}><td className="fw5">{r.name}</td><td>{r.pct}%</td><td className="cm">{r.role}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
            <div className="sg" style={{gap:12}}>
              <div>
                <div className="fw6 mb8">Giải thích của AI</div>
                <div className="tl">
                  {result.notes.map((n,i)=>(
                    <div className="tl-item" key={i}>
                      <div className="tl-dot tl-blue">✓</div>
                      <div className="tl-body"><div className="tl-title">{n}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="fw6 mb8">⚠️ Rủi ro cần lưu ý</div>
                {result.risks.map((r,i)=>(
                  <div className="al al-yellow mb8" key={i}>⚠️ {r}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
