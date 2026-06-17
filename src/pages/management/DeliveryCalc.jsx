import { useState } from 'react'
import { useLang } from '../../i18n/context'
const calcResult = [
  {code:'PM-PET-330',name:'Bao bì PET 330ml',orderQty:50000,leadDays:5,stockNow:45000,need:5000,orderDate:'09/06',deliveryDate:'14/06',status:'Đúng hạn'},
  {code:'PM-PET-500',name:'Bao bì PET 500ml',orderQty:30200,leadDays:5,stockNow:18600,need:11600,orderDate:'09/06',deliveryDate:'14/06',status:'Cần đặt ngay'},
  {code:'PM-NHAN-CAM',name:'Nhãn NC Cam',orderQty:50400,leadDays:3,stockNow:5400,need:45000,orderDate:'09/06',deliveryDate:'12/06',status:'Cần đặt ngay'},
  {code:'PM-NHAN-CH',name:'Nhãn NC Chanh',orderQty:30200,leadDays:3,stockNow:7200,need:23000,orderDate:'11/06',deliveryDate:'14/06',status:'Đúng hạn'},
  {code:'PM-NAP',name:'Nắp nhựa trắng',orderQty:80600,leadDays:4,stockNow:120000,need:0,orderDate:'—',deliveryDate:'—',status:'Đủ kho'},
  {code:'PM-THUNG',name:'Thùng carton',orderQty:6750,leadDays:3,stockNow:17600,need:0,orderDate:'—',deliveryDate:'—',status:'Đủ kho'},
]
const T = {
  vi: {
    title: '🚚 Tính Toán Ngày Giao Hàng & Kế Hoạch Đặt Mua',
    subtitle: 'AI tính lượng đặt bao bì, lead time NCC, ngày cần đặt hàng để đảm bảo đúng deadline sản xuất',
    thCode: 'Mã bao bì', thName: 'Tên bao bì', thNeed: 'Nhu cầu SX', thStock: 'Tồn kho',
    thOrder: 'Cần đặt', thLead: 'Lead time', thOrderDate: 'Ngày đặt', thRecv: 'Ngày nhận', thStatus: 'Trạng thái',
    kpi: ['Đơn hàng cần tính','Bao bì cần đặt ngay','Bao bì đủ kho'],
  },
  zh: {
    title: '🚚 交货日期与采购计划计算',
    subtitle: 'AI计算包装订购量、供应商交货期、下单日期以确保准时生产',
    thCode: '包装编号', thName: '包装名称', thNeed: '生产需求', thStock: '库存',
    thOrder: '需订购', thLead: '交货期', thOrderDate: '下单日期', thRecv: '收货日期', thStatus: '状态',
    kpi: ['需计算的订单','需立即订购的包装','库存充足的包装'],
  },
}

export default function DeliveryCalc() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [prodQty, setProdQty] = useState('')
  const [deadline, setDeadline] = useState('')
  const [product, setProduct] = useState('NC-CAM-330')
  const [calculated, setCalculated] = useState(true)

  return (
    <div className="sg">
      <div className="ph"><div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div></div>
      <div className="sg3">
        {[
          {label:tx.kpi[0],val:'ORD-2610/11/12',color:'#0078d4'},
          {label:tx.kpi[1],val:'2 loại',color:'#d13438'},
          {label:tx.kpi[2],val:'2 loại',color:'#107c10'},
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
            <thead><tr><th>{tx.thCode}</th><th>{tx.thName}</th><th>{tx.thNeed}</th><th>{tx.thStock}</th><th>{tx.thOrder}</th><th>{tx.thLead}</th><th>{tx.thOrderDate}</th><th>{tx.thRecv}</th><th>{tx.thStatus}</th></tr></thead>
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
