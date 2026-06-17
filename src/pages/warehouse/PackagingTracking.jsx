import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useLang } from '../../i18n/context'
const packaging = [
  {code:'PM-PET-330',name:'Bao bì PET 330ml',avgUse:8500,stock:45000,daysLeft:5.3,low:false},
  {code:'PM-PET-500',name:'Bao bì PET 500ml',avgUse:6200,stock:18600,daysLeft:3.0,low:true},
  {code:'PM-NAP-T',name:'Nắp nhựa trắng',avgUse:15000,stock:120000,daysLeft:8.0,low:false},
  {code:'PM-NHAN-CAM',name:'Nhãn NC Cam (cuộn)',avgUse:1800,stock:5400,daysLeft:3.0,low:true},
  {code:'PM-NHAN-CH',name:'Nhãn NC Chanh (cuộn)',avgUse:1200,stock:7200,daysLeft:6.0,low:false},
  {code:'PM-THUNG',name:'Thùng carton',avgUse:2200,stock:17600,daysLeft:8.0,low:false},
]
const trend = [
  {day:'T2',PET330:8200,PET500:5900},{day:'T3',PET330:8600,PET500:6400},
  {day:'T4',PET330:8900,PET500:6100},{day:'T5',PET330:8400,PET500:6500},
  {day:'T6',PET330:8700,PET500:6200},
]
const T = {
  vi: {
    title: '🏷️ Theo Dõi & Dự Báo Bao Bì',
    subtitle: 'Phân loại tiêu chuẩn sử dụng, cảnh báo sắp hết, đề xuất đặt mua tự động',
    thCode: 'Mã', thName: 'Tên bao bì', thStock: 'Tồn kho', thAvgDay: 'TB dùng/ngày',
    thForecast: 'Dự báo hết', thStatus: 'Trạng thái', thAction: 'Hành động',
    kpi: ['Loại bao bì theo dõi','Cảnh báo sắp hết (<4 ngày)','Cần đặt mua ngay','Trung bình ngày sử dụng'],
  },
  zh: {
    title: '🏷️ 包装跟踪与预测',
    subtitle: '标准用量分类，库存预警，自动采购建议',
    thCode: '编号', thName: '包装名称', thStock: '库存', thAvgDay: '日均用量',
    thForecast: '预计耗尽', thStatus: '状态', thAction: '操作',
    kpi: ['跟踪包装类型','即将耗尽警告(<4天)','需立即订购','平均使用天数'],
  },
}

export default function PackagingTracking() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  return (
    <div className="sg">
      <div className="ph">
        <div><h1>🏷️ Theo Dõi & Dự Báo Bao Bì</h1><p>Phân loại tiêu chuẩn sử dụng, cảnh báo sắp hết, đề xuất đặt mua tự động</p></div>
        <button className="btn btn-primary btn-sm">📋 Tạo đơn đặt mua</button>
      </div>
      <div className="sg4">
        {[
          {label:tx.kpi[0],val:'6',color:'#0078d4'},
          {label:tx.kpi[1],val:'2',color:'#d13438'},
          {label:tx.kpi[2],val:'2',color:'#d97706'},
          {label:tx.kpi[3],val:'5.5 ngày',color:'#107c10'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div></div>)}
      </div>
      <div className="al al-red">🔴 <strong>Khẩn:</strong> PET 500ml còn 3 ngày sử dụng và Nhãn NC Cam còn 3 ngày. Cần liên hệ nhà cung cấp ngay hôm nay để đảm bảo giao hàng kịp thứ 4.</div>
      <div className="card">
        <div className="card-title"><span className="card-title-left">📊 Tình trạng bao bì theo kế hoạch sản xuất</span></div>
        <div className="tw"><table>
          <thead><tr><th>{tx.thCode}</th><th>{tx.thName}</th><th>{tx.thStock}</th><th>{tx.thAvgDay}</th><th>{tx.thForecast}</th><th>{tx.thStatus}</th><th>{tx.thAction}</th></tr></thead>
          <tbody>{packaging.map((p,i)=>(
            <tr key={i}>
              <td className="fw5 tb tsm">{p.code}</td>
              <td>{p.name}</td>
              <td>{p.stock.toLocaleString()}</td>
              <td className="cm">{p.avgUse.toLocaleString()}</td>
              <td><span style={{color:p.daysLeft<=3?'var(--red)':p.daysLeft<=5?'var(--yellow)':'var(--green)',fontWeight:600}}>{p.daysLeft} ngày</span></td>
              <td><span className={`badge ${p.low?'badge-red':'badge-green'}`}>{p.low?'⚠️ Cần đặt':'✓ Đủ'}</span></td>
              <td>{p.low?<button className="btn btn-danger btn-sm">📋 Đặt ngay</button>:<button className="btn btn-ghost btn-sm">📋 Xem</button>}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">📈 Xu hướng tiêu thụ bao bì (5 ngày)</span></div>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={trend} margin={{left:-20}}>
              <XAxis dataKey="day" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Line type="monotone" dataKey="PET330" stroke="#0078d4" strokeWidth={2} dot={false} name="PET 330ml"/>
              <Line type="monotone" dataKey="PET500" stroke="#d97706" strokeWidth={2} dot={false} name="PET 500ml"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">📋 Phân loại bao bì theo kế hoạch SX tuần 24</span></div>
          {[
            {prod:'NC Cam 330ml',line:'Line 1',pm:[{name:'PET 330ml',qty:'50,400'},{name:'Nắp trắng',qty:'50,400'},{name:'Nhãn Cam',qty:'50,400'}]},
            {prod:'NC Chanh 500ml',line:'Line 2',pm:[{name:'PET 500ml',qty:'30,200'},{name:'Nắp trắng',qty:'30,200'},{name:'Nhãn Chanh',qty:'30,200'}]},
          ].map((r,i)=>(
            <div key={i} style={{padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <div className="fl ic jb mb4"><span className="fw5">{r.prod}</span><span className="badge badge-blue">{r.line}</span></div>
              <div className="fl g8">
                {r.pm.map((p,j)=><span key={j} className="badge badge-gray">{p.name}: {p.qty}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
