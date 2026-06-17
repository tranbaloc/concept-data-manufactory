import { useState } from 'react'
import { useLang } from '../../i18n/context'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts'

const monthly2026 = [
  {month:'T1',orders:312,revenue:2.1,production:8400,defect:0.8},
  {month:'T2',orders:289,revenue:1.9,production:7800,defect:1.1},
  {month:'T3',orders:355,revenue:2.4,production:9100,defect:0.7},
  {month:'T4',orders:340,revenue:2.3,production:8900,defect:0.9},
  {month:'T5',orders:371,revenue:2.5,production:9500,defect:0.6},
  {month:'T6',orders:198,revenue:1.4,production:5100,defect:0.5},
]

const yearlyTrend = [
  {year:'2024 T1',orders:280,revenue:1.8,production:7200},
  {year:'2024 T2',orders:310,revenue:2.0,production:8100},
  {year:'2024 T3',orders:295,revenue:1.9,production:7600},
  {year:'2024 T4',orders:325,revenue:2.2,production:8500},
  {year:'2025 T1',orders:305,revenue:2.0,production:7900},
  {year:'2025 T2',orders:342,revenue:2.3,production:8800},
  {year:'2025 T3',orders:328,revenue:2.2,production:8600},
  {year:'2025 T4',orders:360,revenue:2.4,production:9200},
  {year:'2026 T1',orders:319,revenue:2.2,production:8433},
  {year:'2026 T2*',orders:255,revenue:1.9,production:7300},
]

const products = [
  {name:'Trà xanh 0°',q1:24500,q2:27800,q3:25100,q4:28900,total:106300,yoy:'+8.2%'},
  {name:'Nước tinh khiết 500ml',q1:31200,q2:33400,q3:30800,q4:35200,total:130600,yoy:'+12.4%'},
  {name:'Sữa đậu nành',q1:18700,q2:19200,q3:17900,q4:20100,total:75900,yoy:'+5.1%'},
  {name:'Nước tăng lực',q1:12400,q2:13800,q3:14200,q4:13100,total:53500,yoy:'+18.7%'},
  {name:'Trà sữa đóng chai',q1:9800,q2:11200,q3:10400,q4:12500,total:43900,yoy:'+24.3%'},
]

const T = {
  vi: {
    title: '📈 Thống Kê Dữ Liệu Tổng Hợp',
    subtitle: 'Upload file tổng hợp → AI phân tích theo tháng/năm, xu hướng 3 năm gần nhất, dự báo tương lai',
    tabs: ['📊 Tổng quan năm', '📋 Bảng chi tiết', '📈 Xu hướng 3 năm', '🤖 Phân tích AI'],
    thMonth: 'Tháng', thOrders: 'Đơn hàng', thRevenue: 'Doanh thu', thProd: 'Sản lượng SX', thError: 'Tỷ lệ lỗi', thVsPrev: 'So tháng trước',
    kpi: ['Tổng đơn hàng (YTD)','Doanh thu (YTD)','Sản lượng SX (YTD)','Tỷ lệ lỗi TB'],
    kpiSub: ['↑ 9.4% so cùng kỳ 2025','↑ 11.2% so cùng kỳ 2025','Hiệu suất trung bình: 87%','↓ 0.18% so 2025'],
    outerTabs: ['📊 Tổng quan năm','📋 Bảng chi tiết','📈 Xu hướng 3 năm','🤖 Phân tích AI'],
    thProduct: 'Sản phẩm',
    thQ1: 'Q1',
    thQ2: 'Q2',
    thQ3: 'Q3',
    thQ4: 'Q4',
    thYear: 'Cả năm',
    thYoY: 'YoY',
    jsTabs: ['Tháng / Năm 2026','Xu hướng 3 năm','Theo sản phẩm','Tóm tắt AI'],
  },
  zh: {
    title: '📈 综合数据统计',
    subtitle: '上传汇总文件 → AI按月/年分析，近3年趋势，未来预测',
    tabs: ['📊 年度总览', '📋 详细表格', '📈 3年趋势', '🤖 AI分析'],
    thMonth: '月份', thOrders: '订单量', thRevenue: '营收', thProd: '产量', thError: '不良率', thVsPrev: '环比',
    kpi: ['订单总量(YTD)','营收(YTD)','产量(YTD)','平均不良率'],
    kpiSub: ['↑ 较2025同期9.4%','↑ 较2025同期11.2%','平均效率: 87%','↓ 较2025降0.18%'],
    outerTabs: ['📊 年度总览','📋 详细表格','📈 3年趋势','🤖 AI分析'],
    thProduct: '产品',
    thQ1: 'Q1',
    thQ2: 'Q2',
    thQ3: 'Q3',
    thQ4: 'Q4',
    thYear: '全年',
    thYoY: '同比',
    jsTabs: ['2026月/年','3年趋势','按产品','AI摘要'],
  },
}

export default function DataStatistics() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [tab, setTab] = useState(0)
  const [file, setFile] = useState(null)
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
    setAnalyzed(false)
  }

  const runAnalysis = () => {
    if (!file && !analyzed) { setAnalyzed(true); return }
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true) }, 1200)
  }

  return (
    <div className="sg">
      <div className="ph">
        <div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div>
      </div>

      <div className="card">
        <div className="card-title"><span className="card-title-left">📂 Upload file dữ liệu tổng hợp</span></div>
        <div className="fl ic g12 mb12">
          <div style={{flex:1,background:'var(--bg)',border:'2px dashed var(--border)',borderRadius:8,padding:'20px',textAlign:'center',cursor:'pointer',position:'relative'}}>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile}
              style={{position:'absolute',inset:0,opacity:0,cursor:'pointer'}}/>
            <div style={{fontSize:28,marginBottom:4}}>📊</div>
            <div className="fw5 tsm">{file?file.name:'Kéo thả hoặc click để chọn file'}</div>
            <div className="cm tsm">Hỗ trợ: .xlsx, .xls, .csv (tối đa 50MB)</div>
          </div>
          <button className="btn btn-primary" onClick={runAnalysis} disabled={analyzing}>
            {analyzing?'⏳ Đang phân tích...':'🤖 Phân tích AI'}
          </button>
        </div>
        {analyzed && (
          <div className="al al-green">✅ AI đã phân tích xong dữ liệu 6 tháng 2026 + so sánh xu hướng 3 năm (2024–2026). Xem các tab bên dưới.</div>
        )}
      </div>

      <div className="tabs">
        {tx.jsTabs.map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>

      {tab===0 && (
        <div className="sg">
          <div className="sg4">
            {[
              {label:tx.kpi[0],val:'1,865',sub:tx.kpiSub[0],color:'#0078d4'},
              {label:tx.kpi[1],val:'12.6 tỷ',sub:tx.kpiSub[1],color:'#107c10'},
              {label:tx.kpi[2],val:'48,800 thùng',sub:tx.kpiSub[2],color:'#7c3aed'},
              {label:tx.kpi[3],val:'0.77%',sub:tx.kpiSub[3],color:'#d97706'},
            ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div><div className="sc-sub">{s.sub}</div></div>)}
          </div>
          <div className="g2">
            <div className="card">
              <div className="card-title"><span className="card-title-left">📦 Đơn hàng theo tháng</span></div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthly2026}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                  <XAxis dataKey="month" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}}/>
                  <Tooltip/><Bar dataKey="orders" name="Đơn hàng" fill="#0078d4" radius={[3,3,0,0]}/></BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title"><span className="card-title-left">💰 Doanh thu theo tháng (tỷ VNĐ)</span></div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthly2026}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                  <XAxis dataKey="month" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}}/>
                  <Tooltip/><defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#107c10" stopOpacity={0.3}/><stop offset="95%" stopColor="#107c10" stopOpacity={0.05}/>
                  </linearGradient></defs>
                  <Area type="monotone" dataKey="revenue" name="Doanh thu" stroke="#107c10" fill="url(#rev)"/></AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="tw"><table>
            <thead><tr><th>{tx.thMonth}</th><th>{tx.thOrders}</th><th>{tx.thRevenue}</th><th>{tx.thProd}</th><th>{tx.thError}</th><th>{tx.thVsPrev}</th></tr></thead>
            <tbody>{monthly2026.map((m,i)=>(
              <tr key={i}>
                <td className="fw5">{m.month}</td>
                <td>{m.orders.toLocaleString()}</td>
                <td>{m.revenue} tỷ</td>
                <td>{m.production.toLocaleString()} thùng</td>
                <td><span className={`badge ${m.defect<0.8?'badge-green':'badge-yellow'}`}>{m.defect}%</span></td>
                <td className="cm tsm">{i===0?'—':monthly2026[i].orders>monthly2026[i-1].orders?
                  <span style={{color:'#107c10'}}>▲ {monthly2026[i].orders-monthly2026[i-1].orders}</span>:
                  <span style={{color:'#d13438'}}>▼ {monthly2026[i-1].orders-monthly2026[i].orders}</span>}</td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      )}

      {tab===1 && (
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Xu hướng đơn hàng & doanh thu (2024–2026)</span></div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={yearlyTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="year" tick={{fontSize:11}}/><YAxis yAxisId="l" tick={{fontSize:11}}/><YAxis yAxisId="r" orientation="right" tick={{fontSize:11}}/>
                <Tooltip/><Legend/>
                <Line yAxisId="l" type="monotone" dataKey="orders" name="Đơn hàng" stroke="#0078d4" strokeWidth={2} dot={{r:3}}/>
                <Line yAxisId="r" type="monotone" dataKey="revenue" name="Doanh thu (tỷ)" stroke="#107c10" strokeWidth={2} dot={{r:3}} strokeDasharray="5 5"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="al al-blue">
            🤖 <strong>AI nhận xét:</strong> Xu hướng tăng trưởng đều đặn ~9–12%/năm. Quý 2 luôn là quý mạnh nhất (trùng mùa hè). Quý 1/2025 có dip nhẹ do điều chỉnh danh mục sản phẩm — không phải xu hướng dài hạn. Dự báo cả năm 2026: ~1,380 đơn/tháng TB, doanh thu ~30 tỷ.
          </div>
        </div>
      )}

      {tab===2 && (
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">🏷️ Sản lượng theo sản phẩm (2025 – full year)</span></div>
            <div className="tw"><table>
              <thead><tr><th>{tx.thProduct}</th><th>{tx.thQ1}</th><th>{tx.thQ2}</th><th>{tx.thQ3}</th><th>{tx.thQ4}</th><th>{tx.thYear}</th><th>{tx.thYoY}</th></tr></thead>
              <tbody>{products.map((p,i)=>(
                <tr key={i}>
                  <td className="fw5">{p.name}</td>
                  <td>{p.q1.toLocaleString()}</td><td>{p.q2.toLocaleString()}</td><td>{p.q3.toLocaleString()}</td><td>{p.q4.toLocaleString()}</td>
                  <td className="fw5">{p.total.toLocaleString()}</td>
                  <td><span className="badge badge-green">{p.yoy}</span></td>
                </tr>
              ))}</tbody>
            </table></div>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Top sản phẩm theo sản lượng</span></div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={products} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis type="number" tick={{fontSize:11}}/><YAxis type="category" dataKey="name" tick={{fontSize:11}} width={140}/>
                <Tooltip/><Bar dataKey="total" name="Cả năm 2025" fill="#0078d4" radius={[0,3,3,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab===3 && (
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">🤖 Tóm tắt phân tích AI</span></div>
            <div className="sg" style={{gap:10}}>
              {[
                {icon:'📈',title:'Tăng trưởng doanh thu',body:'Doanh thu 6T/2026 đạt 12.6 tỷ, tăng 11.2% so cùng kỳ 2025. Tốc độ tăng đang cao hơn mục tiêu năm (8%). Dự báo cả năm: 29–31 tỷ.'},
                {icon:'🏭',title:'Hiệu suất sản xuất',body:'Sản lượng trung bình 8,133 thùng/tháng. Tháng 5 cao nhất (9,500). Tỷ lệ lỗi giảm liên tục, từ 1.1% (T2) xuống 0.5% (T6) — cải tiến rõ rệt từ chương trình 5S.'},
                {icon:'⚠️',title:'Điểm cần chú ý',body:'Tháng 2 và tháng 6 có sản lượng thấp hơn đáng kể (kỳ nghỉ Tết + đầu hè). Nên lập kế hoạch tăng tồn kho trước 2 tháng này.'},
                {icon:'🔮',title:'Dự báo Q3/2026',body:'Dựa trên xu hướng 3 năm: Q3/2026 dự kiến 1,020–1,080 đơn hàng, doanh thu 7.0–7.5 tỷ. Tháng 8 thường là đỉnh.'},
              ].map((a,i)=>(
                <div key={i} style={{padding:'12px',border:'1px solid var(--border)',borderRadius:8,background:'var(--blue-xlight)'}}>
                  <div className="fl ic g8 mb6"><span style={{fontSize:18}}>{a.icon}</span><span className="fw6">{a.title}</span></div>
                  <div style={{fontSize:13}}>{a.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
