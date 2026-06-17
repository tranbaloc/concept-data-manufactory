import { useState } from 'react'
import { useLang } from '../../i18n/context'
const diffRows = [
  {item:'NC Cam 330ml','file1':12400,'file2':12350,diff:-50,status:'Lệch'},
  {item:'NC Chanh 500ml','file1':8200,'file2':8200,diff:0,status:'Khớp'},
  {item:'Ổi Ép 1L','file1':5600,'file2':5700,diff:100,status:'Lệch'},
  {item:'NC Dứa 330ml','file1':9100,'file2':9100,diff:0,status:'Khớp'},
  {item:'Bao bì PET 330ml','file1':45000,'file2':44850,diff:-150,status:'Lệch'},
  {item:'Nắp nhựa trắng','file1':48200,'file2':48200,diff:0,status:'Khớp'},
  {item:'Nhãn NC Cam','file1':45200,'file2':45220,diff:20,status:'Lệch'},
  {item:'Sucrose 25kg/bao','file1':320,'file2':320,diff:0,status:'Khớp'},
]
const T = {
  vi: {
    title: '🔍 Đối Chiếu Dữ Liệu Excel',
    subtitle: 'AI so sánh 2 file Excel, phát hiện chênh lệch – Tiết kiệm thời gian đối soát cuối tháng',
    compareCard: '📊 Kết quả so sánh',
    thItem: 'Mặt hàng / Vật tư', thFile1: 'File 1', thFile2: 'File 2', thDiff: 'Chênh lệch', thResult: 'Kết quả',
    kpi: ['Mục khớp hoàn toàn','Mục có chênh lệch','Tổng hàng kiểm tra'],
  },
  zh: {
    title: '🔍 Excel数据对账',
    subtitle: 'AI比较2个Excel文件，发现差异 – 节省月末对账时间',
    compareCard: '📊 对比结果',
    thItem: '商品/物料', thFile1: '文件1', thFile2: '文件2', thDiff: '差异', thResult: '结果',
    kpi: ['完全匹配项','有差异项','总检查行数'],
  },
}

export default function DataReconciliation() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [uploaded, setUploaded] = useState(false)
  const [compared, setCompared] = useState(false)
  const diffs = diffRows.filter(r=>r.status==='Lệch')

  return (
    <div className="sg">
      <div className="ph"><div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div></div>
      <div className="sg3">
        {[
          {label:tx.kpi[0],val:'4',color:'#107c10'},
          {label:tx.kpi[1],val:'4',color:'#d13438'},
          {label:tx.kpi[2],val:'8',color:'#0078d4'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div></div>)}
      </div>
      {!compared ? (
        <div className="g2">
          {['File 1 – Báo cáo kho tháng','File 2 – Dữ liệu ERP/hệ thống'].map((label,idx)=>(
            <div className="card" key={idx}>
              <div className="card-title"><span className="card-title-left">📂 {label}</span></div>
              <div style={{border:'2px dashed var(--border)',borderRadius:8,padding:28,textAlign:'center',cursor:'pointer',background:uploaded?'var(--blue-xlight)':'#fff'}} onClick={()=>setUploaded(true)}>
                <div style={{fontSize:28,marginBottom:8}}>📊</div>
                <div className="fw5 mb4">{uploaded?'inventory_june2026.xlsx':'Kéo thả file Excel vào đây'}</div>
                <div className="cm tsm">{uploaded?'File đã tải lên · 48 dòng · 6 cột':'Hỗ trợ .xlsx, .xls, .csv'}</div>
                {!uploaded && <button className="btn btn-outline btn-sm mt12">📁 Chọn file</button>}
              </div>
            </div>
          ))}
          <div style={{gridColumn:'1/-1'}}>
            <button className="btn btn-primary" onClick={()=>{setUploaded(true);setCompared(true)}} disabled={!uploaded}>
              🤖 Đối chiếu & phân tích
            </button>
          </div>
        </div>
      ) : (
        <div className="sg">
          {diffs.length > 0 && (
            <div className="al al-yellow">⚠️ Phát hiện <strong>{diffs.length} mục chênh lệch</strong>. AI đã đánh dấu để xem xét trước khi chốt số liệu cuối tháng.</div>
          )}
          <div className="card">
            <div className="card-title">
              <span className="card-title-left">📊 Kết quả đối chiếu</span>
              <div className="fl g8"><button className="btn btn-outline btn-sm">📥 Xuất báo cáo</button><button className="btn btn-ghost btn-sm" onClick={()=>setCompared(false)}>🔄 So sánh lại</button></div>
            </div>
            <div className="tw"><table>
              <thead><tr><th>{tx.thItem}</th><th>{tx.thFile1}</th><th>{tx.thFile2}</th><th>{tx.thDiff}</th><th>{tx.thResult}</th></tr></thead>
              <tbody>{diffRows.map((r,i)=>(
                <tr key={i}>
                  <td className="fw5">{r.item}</td>
                  <td>{r.file1.toLocaleString()}</td>
                  <td>{r.file2.toLocaleString()}</td>
                  <td className={r.diff!==0?'tr fw6':'tg fw6'}>{r.diff>0?'+':''}{r.diff}</td>
                  <td><span className={`badge ${r.status==='Khớp'?'badge-green':'badge-red'}`}>{r.status==='Khớp'?'✓ Khớp':'✗ Lệch'}</span></td>
                </tr>
              ))}</tbody>
            </table></div>
          </div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">🤖 Phân tích AI – Nguyên nhân chênh lệch</span></div>
            <div className="tl">
              {[
                {icon:'📦',color:'tl-red',title:'NC Cam 330ml: -50 thùng',desc:'Có thể do xuất kho cấp phát nội bộ chưa cập nhật vào ERP. Kiểm tra phiếu xuất ngày 07/06.'},
                {icon:'📦',color:'tl-yellow',title:'Ổi Ép 1L: +100 thùng',desc:'Dư thừa có thể do trả hàng từ đại lý ngày 08/06 chưa nhập vào file báo cáo kho.'},
                {icon:'🏷️',color:'tl-red',title:'Bao bì PET 330ml: -150 cái',desc:'Khả năng hao hụt trong sản xuất tuần trước. Cần đối chiếu phiếu xuất kho vật liệu.'},
              ].map((t,i)=>(
                <div className="tl-item" key={i}>
                  <div className={`tl-dot ${t.color}`}>{t.icon}</div>
                  <div className="tl-body"><div className="tl-title">{t.title}</div><div className="tl-meta">{t.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
