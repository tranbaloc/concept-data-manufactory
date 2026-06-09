import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
const items = [
  {code:'FG-NC-CAM-330',name:'NC Cam 330ml (thùng)',cat:'Thành phẩm',qty:4200,min:2000,max:8000,loc:'A-01-03',status:'Bình thường'},
  {code:'FG-OI-EP-1L',name:'Ổi Ép 1L (thùng)',cat:'Thành phẩm',qty:1850,min:2000,max:6000,loc:'A-02-01',status:'Thiếu'},
  {code:'RM-NFC-65',name:'NFC 65°Brix (thùng)',cat:'Nguyên liệu',qty:320,min:500,max:1500,loc:'B-01-05',status:'Cảnh báo'},
  {code:'PM-PET-330',name:'Bao bì PET 330ml (cái)',cat:'Bao bì',qty:45000,min:20000,max:80000,loc:'C-01-01',status:'Bình thường'},
  {code:'PM-NHAN-CAM',name:'Nhãn NC Cam (cuộn)',cat:'Bao bì',qty:280,min:300,max:800,loc:'C-02-03',status:'Cảnh báo'},
  {code:'RM-SUCROSE',name:'Sucrose (bao 25kg)',cat:'Nguyên liệu',qty:580,min:200,max:1000,loc:'B-02-01',status:'Bình thường'},
]
const trend = [{w:'T21',qty:3800},{w:'T22',qty:4100},{w:'T23',qty:3900},{w:'T24',qty:4200}]
export default function InventoryManagement() {
  return (
    <div className="sg">
      <div className="ph">
        <div><h1>📦 Quản Lý Tồn Kho</h1><p>Real-time inventory, barcode/QR, phân loại hàng hóa thành phẩm – nguyên liệu – bao bì</p></div>
        <div className="fl g8"><button className="btn btn-primary btn-sm">+ Nhập kho</button><button className="btn btn-outline btn-sm">📤 Xuất kho</button></div>
      </div>
      <div className="sg4">
        {[
          {label:'SKU đang quản lý',val:'48',color:'#0078d4'},
          {label:'Hàng dưới mức tối thiểu',val:'3',color:'#d13438'},
          {label:'Cần đặt mua ngay',val:'2',color:'#d97706'},
          {label:'Cập nhật gần nhất',val:'08:47',color:'#107c10'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div></div>)}
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-title"><span className="card-title-left">📊 Xu hướng tồn kho NC Cam 330ml (4 tuần)</span></div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={trend} margin={{left:-20}}>
              <XAxis dataKey="w" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/>
              <Tooltip/><Bar dataKey="qty" fill="#0078d4" radius={[3,3,0,0]} name="Tồn kho"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">🚨 Cảnh báo tồn kho</span></div>
          <div className="sg" style={{gap:8}}>
            <div className="al al-red">🔴 <span><strong>Ổi Ép 1L</strong> – Dưới mức tối thiểu 2,000 thùng. Hiện tại: 1,850. Đề xuất nhập bổ sung ngay.</span></div>
            <div className="al al-yellow">⚠️ <span><strong>NFC 65°Brix</strong> – Còn 320/500 thùng tối thiểu. Ảnh hưởng sản xuất từ thứ 4 tuần tới.</span></div>
            <div className="al al-yellow">⚠️ <span><strong>Nhãn NC Cam</strong> – Còn 280 cuộn, dưới mức 300. Đặt thêm từ NCC trước 11/06.</span></div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">
          <span className="card-title-left">📋 Danh sách tồn kho</span>
          <div className="ir" style={{width:260}}><input placeholder="🔍 Tìm mã/tên hàng..."/></div>
        </div>
        <div className="tw"><table>
          <thead><tr><th>Mã SKU</th><th>Tên hàng</th><th>Danh mục</th><th>Tồn kho</th><th>Mức tối thiểu</th><th>Vị trí</th><th>Trạng thái</th></tr></thead>
          <tbody>{items.map((it,i)=>(
            <tr key={i}>
              <td className="fw5 tb tsm">{it.code}</td><td>{it.name}</td>
              <td><span className="badge badge-blue">{it.cat}</span></td>
              <td className={it.qty<it.min?'tr fw6':'fw5'}>{it.qty.toLocaleString()}</td>
              <td className="cm">{it.min.toLocaleString()}</td>
              <td className="cm">{it.loc}</td>
              <td><span className={`badge ${it.status==='Bình thường'?'badge-green':it.status==='Thiếu'?'badge-red':'badge-yellow'}`}>{it.status}</span></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
  )
}
