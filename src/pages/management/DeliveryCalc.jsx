import { useState } from 'react'
const calcResult = [
  {code:'PM-PET-330',name:'Bao bì PET 330ml',orderQty:50000,leadDays:5,stockNow:45000,need:5000,orderDate:'09/06',deliveryDate:'14/06',status:'Đúng hạn'},
  {code:'PM-PET-500',name:'Bao bì PET 500ml',orderQty:30200,leadDays:5,stockNow:18600,need:11600,orderDate:'09/06',deliveryDate:'14/06',status:'Cần đặt ngay'},
  {code:'PM-NHAN-CAM',name:'Nhãn NC Cam',orderQty:50400,leadDays:3,stockNow:5400,need:45000,orderDate:'09/06',deliveryDate:'12/06',status:'Cần đặt ngay'},
  {code:'PM-NHAN-CH',name:'Nhãn NC Chanh',orderQty:30200,leadDays:3,stockNow:7200,need:23000,orderDate:'11/06',deliveryDate:'14/06',status:'Đúng hạn'},
  {code:'PM-NAP',name:'Nắp nhựa trắng',orderQty:80600,leadDays:4,stockNow:120000,need:0,orderDate:'—',deliveryDate:'—',status:'Đủ kho'},
  {code:'PM-THUNG',name:'Thùng carton',orderQty:6750,leadDays:3,stockNow:17600,need:0,orderDate:'—',deliveryDate:'—',status:'Đủ kho'},
]
export default function DeliveryCalc() {
  const [prodQty, setProdQty] = useState('')
  const [deadline, setDeadline] = useState('')
  const [product, setProduct] = useState('NC-CAM-330')
  const [calculated, setCalculated] = useState(true)

  return (
    <div className="sg">
      <div className="ph"><div><h1>🚚 Tính Toán Ngày Giao Hàng & Kế Hoạch Đặt Mua</h1><p>AI tính lượng đặt bao bì, lead time NCC, ngày cần đặt hàng để đảm bảo đúng deadline sản xuất</p></div></div>
      <div className="sg3">
        {[
          {label:'Đơn hàng cần tính',val:'ORD-2610/11/12',color:'#0078d4'},
          {label:'Bao bì cần đặt ngay',val:'2 loại',color:'#d13438'},
          {label:'Bao bì đủ kho',val:'2 loại',color:'#107c10'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div></div>)}
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">⚙️ Thông số tính toán</span></div>
          <div className="sg" style={{gap:12}}>
            <div className="fg2">
              <div className="fr"><label>Sản phẩm cần sản xuất</label>
                <select value={product} onChange={e=>setProduct(e.target.value)}>
                  <option value="NC-CAM-330">NC Cam 330ml</option>
                  <option value="NC-CH-500">NC Chanh 500ml</option>
                  <option value="OI-EP-1L">Ổi Ép 1L</option>
                </select>
              </div>
              <div className="fr"><label>Số lượng sản xuất</label>
                <input type="number" value={prodQty} onChange={e=>setProdQty(e.target.value)} placeholder="Vd: 50000 chai"/>
              </div>
            </div>
            <div className="fg2">
              <div className="fr"><label>Deadline giao thành phẩm</label>
                <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}/>
              </div>
              <div className="fr"><label>Bao gồm đơn hàng</label>
                <select><option>ORD-2610 + 2611 + 2612</option><option>ORD-2613</option></select>
              </div>
            </div>
            <button className="btn btn-primary" onClick={()=>setCalculated(true)}>🤖 Tính kế hoạch đặt mua</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">📋 Tóm tắt kế hoạch</span></div>
          <div className="tl">
            {[
              {date:'09/06 (Hôm nay)',action:'Đặt PET 500ml + Nhãn NC Cam ngay',color:'tl-red'},
              {date:'11/06 (T5)',action:'Xác nhận đơn hàng Nhãn NC Chanh với NCC',color:'tl-yellow'},
              {date:'12/06 (T6)',action:'Nhãn NC Cam giao hàng – kiểm tra chất lượng',color:'tl-blue'},
              {date:'14/06 (T7)',action:'PET 500ml + Nhãn Chanh giao hàng',color:'tl-green'},
              {date:'16/06 (T2)',action:'Bắt đầu sản xuất ORD-2611 NC Chanh 500ml',color:'tl-green'},
            ].map((t,i)=>(
              <div className="tl-item" key={i}>
                <div className={`tl-dot ${t.color}`} style={{fontSize:9,whiteSpace:'nowrap',width:32}}>{t.date.slice(0,5)}</div>
                <div className="tl-body"><div className="tl-title">{t.action}</div><div className="tl-meta">{t.date}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {calculated && (
        <div className="card">
          <div className="card-title">
            <span className="card-title-left">📊 Chi tiết kế hoạch đặt mua bao bì</span>
            <div className="fl g8"><button className="btn btn-outline btn-sm">📥 Xuất Excel</button><button className="btn btn-primary btn-sm">📋 Tạo PR tự động</button></div>
          </div>
          <div className="tw"><table>
            <thead><tr><th>Mã bao bì</th><th>Tên bao bì</th><th>Nhu cầu SX</th><th>Tồn kho</th><th>Cần đặt</th><th>Lead time</th><th>Ngày đặt</th><th>Ngày nhận</th><th>Trạng thái</th></tr></thead>
            <tbody>{calcResult.map((r,i)=>(
              <tr key={i}>
                <td className="fw5 tb tsm">{r.code}</td>
                <td>{r.name}</td>
                <td>{r.orderQty.toLocaleString()}</td>
                <td>{r.stockNow.toLocaleString()}</td>
                <td className={r.need>0?'tr fw6':'tg'}>{r.need>0?r.need.toLocaleString():'—'}</td>
                <td className="cm">{r.leadDays > 0 ? `${r.leadDays} ngày` : '—'}</td>
                <td className="fw5">{r.orderDate}</td>
                <td className="fw5">{r.deliveryDate}</td>
                <td><span className={`badge ${r.status==='Đủ kho'?'badge-green':r.status==='Đúng hạn'?'badge-blue':'badge-red'}`}>{r.status}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
          <div className="fl g8 mt12">
            <div className="al al-red f1">🔴 <span><strong>PET 500ml & Nhãn NC Cam</strong> – Phải đặt hàng ngay hôm nay để kịp deadline sản xuất. AI đã tạo sẵn PR Draft, cần phê duyệt.</span></div>
          </div>
        </div>
      )}
    </div>
  )
}
