import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const formulas = [
  {code:'GV-NC-VN-2026-A3',market:'VN',brix:12.5,ph:3.8,acidPct:0.28,preservePpm:500,vitC:200,sugar:112,cal:48,date:'15/03/2026'},
  {code:'GV-NC-VN-2026-A2',market:'VN',brix:12.0,ph:3.9,acidPct:0.25,preservePpm:480,vitC:180,sugar:105,cal:46,date:'01/01/2026'},
  {code:'GV-NC-US-2025-B2',market:'US',brix:12.0,ph:3.7,acidPct:0.30,preservePpm:450,vitC:250,sugar:108,cal:47,date:'05/05/2025'},
]

const radar = [
  {attr:'Độ ngọt',A3:83,A2:80,B2:80},
  {attr:'Độ chua',A3:70,A2:65,B2:75},
  {attr:'Chất bảo quản',A3:67,A2:64,B2:60},
  {attr:'Vitamin C',A3:67,A2:60,B2:83},
  {attr:'Calories',A3:80,A2:77,B2:78},
]

const barCompare = [
  {name:'°Brix',A3:12.5,A2:12.0,B2:12.0},
  {name:'pH (×10)',A3:38,A2:39,B2:37},
  {name:'Acid %×100',A3:28,A2:25,B2:30},
]

const COLORS = {'A3':'#0078d4','A2':'#00897b','B2':'#d97706'}

export default function FormulaComparison() {
  return (
    <div className="sg">
      <div className="ph">
        <div><h1>📊 So Sánh Công Thức</h1><p>Đặt cạnh nhau các phiên bản công thức, phân tích điểm khác biệt và rủi ro</p></div>
        <button className="btn btn-outline btn-sm">+ Thêm công thức</button>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">📋 Bảng so sánh tham số</span></div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Tham số</th>
                {formulas.map(f=><th key={f.code}><span className="badge badge-blue">{f.code}</span></th>)}
                <th>Nhận xét AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                {param:'Thị trường',vals:['VN','VN','US'],note:'US dùng chuẩn FDA khác VN'},
                {param:'Độ đường (°Brix)',vals:['12.5','12.0','12.0'],note:'A3 ngọt hơn 0.5Brix, phù hợp thị hiếu VN'},
                {param:'pH',vals:['3.8','3.9','3.7'],note:'B2 chua hơn, phù hợp khẩu vị US'},
                {param:'Acid citric (%)',vals:['0.28','0.25','0.30'],note:'B2 gần ngưỡng ảnh hưởng ổn định màu'},
                {param:'Bảo quản (ppm)',vals:['500','480','450'],note:'A3 tối đa theo QCVN, B2 thấp hơn do FDA'},
                {param:'Vitamin C (mg/L)',vals:['200','180','250'],note:'B2 bổ sung nhiều hơn theo tiêu chuẩn US'},
                {param:'Sugar (g/L)',vals:['112','105','108'],note:'A3 calories cao nhất trong 3 phiên bản'},
                {param:'Calories (kcal/100ml)',vals:['48','46','47'],note:'Chênh lệch không đáng kể'},
              ].map((row,i)=>(
                <tr key={i}>
                  <td className="fw5">{row.param}</td>
                  {row.vals.map((v,j)=><td key={j}>{v}</td>)}
                  <td className="cm tsm">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">🕸️ Radar so sánh đặc tính</span></div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radar}>
              <PolarGrid/>
              <PolarAngleAxis dataKey="attr" tick={{fontSize:11}}/>
              <Radar name="A3" dataKey="A3" stroke="#0078d4" fill="#0078d4" fillOpacity={0.15} strokeWidth={2}/>
              <Radar name="A2" dataKey="A2" stroke="#00897b" fill="#00897b" fillOpacity={0.1} strokeWidth={2}/>
              <Radar name="B2" dataKey="B2" stroke="#d97706" fill="#d97706" fillOpacity={0.1} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
          <div className="fl g12 mt8" style={{justifyContent:'center'}}>
            {Object.entries(COLORS).map(([k,c])=><span key={k} className="fl ic g6 tsm"><span className="cdot" style={{background:c}}/>{k}</span>)}
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">📊 So sánh chỉ số chính</span></div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barCompare} margin={{left:-20}}>
              <XAxis dataKey="name" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="A3" fill="#0078d4" radius={[3,3,0,0]}/>
              <Bar dataKey="A2" fill="#00897b" radius={[3,3,0,0]}/>
              <Bar dataKey="B2" fill="#d97706" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">🤖 Phân tích AI – Khuyến nghị</span></div>
        <div className="sg" style={{gap:10}}>
          <div className="al al-blue">📌 <span><strong>GV-NC-VN-2026-A3</strong> phù hợp nhất cho thị trường VN: cân bằng giữa độ ngọt, độ bảo quản và chi phí nguyên liệu.</span></div>
          <div className="al al-yellow">⚠️ <span><strong>GV-NC-US-2025-B2</strong>: Acid citric 0.30% gần ngưỡng gây ảnh hưởng màu sắc tại nhiệt độ cao. Nên giảm xuống 0.27–0.28% nếu phân phối vùng nhiệt đới.</span></div>
          <div className="al al-green">✅ <span>Cả 3 công thức đều đạt yêu cầu kỹ thuật cơ bản. Chênh lệch calories dưới 5% – không cần điều chỉnh nhãn dinh dưỡng.</span></div>
        </div>
      </div>
    </div>
  )
}
