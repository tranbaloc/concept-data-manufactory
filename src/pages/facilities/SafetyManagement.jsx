import { useState, useEffect } from 'react'

/* ── Camera metadata ──────────────────────────────────────────────────────── */
// Verified free Unsplash photo IDs (fetched from live search results)
const CAMS = [
  { id:'CAM-S01', name:'Khu chiết rót', area:'Line 1 & 2', alert:true,
    img:'https://images.unsplash.com/photo-1780145180040-0beda1df60e6?w=640&h=360&fit=crop&q=75',
    box:{x:'18%',y:'22%',w:'28%',h:'38%'}, label:'⚠ Không đeo khẩu trang' },
  { id:'CAM-S02', name:'Kho nguyên liệu', area:'Kho A-B', alert:false,
    img:'https://images.unsplash.com/photo-1553413077-190dd305871c?w=640&h=360&fit=crop&q=75' },
  { id:'CAM-S03', name:'Phòng điện cao thế', area:'Tầng 2', alert:true,
    img:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=360&fit=crop&q=75',
    box:{x:'55%',y:'15%',w:'24%',h:'44%'}, label:'⚠ Vào khu vực cấm' },
  { id:'CAM-S04', name:'Cổng ra vào', area:'Cổng chính', alert:false,
    img:'https://images.unsplash.com/photo-1779600493796-1f3d68589cee?w=640&h=360&fit=crop&q=75' },
  { id:'CAM-S05', name:'Khu pha chế', area:'Phòng pha chế', alert:false,
    img:'https://images.unsplash.com/photo-1608899466500-0d83b26d1639?w=640&h=360&fit=crop&q=75' },
  { id:'CAM-S06', name:'Bãi xe & Sân ngoài', area:'Ngoài trời', alert:false,
    img:'https://images.unsplash.com/photo-1778016193071-c841d6a2fc6a?w=640&h=360&fit=crop&q=75' },
]

/* ── CSS injected once for scan-line + blink animations ─────────────────── */
const STYLE = `
@keyframes scanline {
  0%   { background-position: 0 0 }
  100% { background-position: 0 100% }
}
@keyframes blink-rec {
  0%,49%  { opacity:1 }
  50%,100%{ opacity:0 }
}
@keyframes detect-pulse {
  0%,100%{ box-shadow:0 0 0 2px rgba(255,60,60,.9) }
  50%    { box-shadow:0 0 0 5px rgba(255,60,60,.3) }
}
.cam-scanline {
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px, transparent 2px,
    rgba(0,0,0,.22) 2px, rgba(0,0,0,.22) 3px
  );
  background-size: 100% 3px;
  animation: scanline 6s linear infinite;
}
.cam-rec { animation: blink-rec 1.2s step-start infinite }
.cam-alert-box { animation: detect-pulse 1.5s ease-in-out infinite }
`

/* ── Single camera feed component ───────────────────────────────────────── */
function CamFeed({ cam, large }) {
  const [ts, setTs] = useState('')
  useEffect(()=>{
    const fmt = () => {
      const n = new Date()
      setTs(n.toLocaleDateString('vi-VN') + '  ' + n.toLocaleTimeString('vi-VN'))
    }
    fmt(); const t = setInterval(fmt, 1000); return ()=>clearInterval(t)
  },[])

  return (
    <div style={{ position:'relative', borderRadius:10, overflow:'hidden',
      background:'#000', cursor:'pointer', aspectRatio:'16/9',
      boxShadow: cam.alert ? '0 0 0 2px #ef4444, 0 4px 16px rgba(239,68,68,.3)'
                           : '0 2px 10px rgba(0,0,0,.4)' }}>

      {/* Base image — green night-vision filter, fills 16:9 container */}
      <img src={cam.img}
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block',
          filter:'contrast(1.25) brightness(0.82) saturate(1.1)' }}
        loading="lazy"
      />

      {/* Scan lines overlay */}
      <div className="cam-scanline" style={{
        position:'absolute', inset:0, pointerEvents:'none', mixBlendMode:'overlay' }}/>

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.7) 100%)' }}/>

      {/* AI detection box */}
      {cam.alert && cam.box && (
        <div className="cam-alert-box" style={{
          position:'absolute', left:cam.box.x, top:cam.box.y,
          width:cam.box.w, height:cam.box.h,
          border:'2px solid #ef4444', borderRadius:3, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:-18, left:0, background:'#ef4444',
            color:'#fff', fontSize:9, fontWeight:700, padding:'1px 5px',
            borderRadius:'3px 3px 0 0', whiteSpace:'nowrap' }}>{cam.label}</div>
          {/* corner ticks */}
          {['tl','tr','bl','br'].map(c=>(
            <div key={c} style={{
              position:'absolute',
              ...(c.includes('t')?{top:-1}:{bottom:-1}),
              ...(c.includes('l')?{left:-1}:{right:-1}),
              width:8, height:8,
              borderTop: c.includes('t')?'2px solid #ef4444':'none',
              borderBottom: c.includes('b')?'2px solid #ef4444':'none',
              borderLeft: c.includes('l')?'2px solid #ef4444':'none',
              borderRight: c.includes('r')?'2px solid #ef4444':'none',
            }}/>
          ))}
        </div>
      )}

      {/* Top bar: ID + LIVE */}
      <div style={{ position:'absolute', top:0, left:0, right:0,
        padding:'5px 8px', display:'flex', justifyContent:'space-between', alignItems:'center',
        background:'linear-gradient(to bottom,rgba(0,0,0,.7),transparent)' }}>
        <span style={{ color:'#4ade80', fontFamily:'monospace', fontSize:10, fontWeight:700,
          letterSpacing:1 }}>{cam.id}</span>
        <span style={{ display:'flex', alignItems:'center', gap:4 }}>
          <span className="cam-rec" style={{ width:7, height:7, borderRadius:'50%',
            background: cam.alert ? '#ef4444' : '#4ade80', display:'inline-block' }}/>
          <span style={{ color:'#fff', fontSize:9, fontWeight:700,
            fontFamily:'monospace' }}>{cam.alert ? 'ALERT' : 'REC'}</span>
        </span>
      </div>

      {/* Bottom bar: name + timestamp */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        padding:'5px 8px', display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        background:'linear-gradient(to top,rgba(0,0,0,.75),transparent)' }}>
        <div>
          <div style={{ color:'#fff', fontSize:10, fontWeight:600, fontFamily:'monospace' }}>{cam.name}</div>
          <div style={{ color:'rgba(255,255,255,.55)', fontSize:9, fontFamily:'monospace' }}>{cam.area} · 4K</div>
        </div>
        <span style={{ color:'#a3e635', fontSize:9, fontFamily:'monospace', letterSpacing:.5 }}>{ts}</span>
      </div>
    </div>
  )
}

const incidents = [
  {time:'08:14',cam:'CAM-S01',type:'Không đeo khẩu trang',area:'Khu chiết rót',level:'Trung bình',action:'Đã cảnh báo'},
  {time:'09:32',cam:'CAM-S03',type:'Vào khu vực cấm',area:'Phòng điện cao thế',level:'Cao',action:'Báo bảo vệ'},
  {time:'11:05',cam:'CAM-S02',type:'Không mang giày bảo hộ',area:'Kho nguyên liệu',level:'Thấp',action:'Đã nhắc nhở'},
  {time:'13:47',cam:'CAM-S01',type:'Không đeo kính bảo hộ',area:'Khu pha chế',level:'Trung bình',action:'Đã cảnh báo'},
]
export default function SafetyManagement() {
  const [tab, setTab] = useState(0)
  const [focus, setFocus] = useState(null)   // focused camera ID

  return (
    <div className="sg">
      {/* inject keyframe styles once */}
      <style>{STYLE}</style>
      <div className="ph"><div><h1>🦺 An Toàn & Quản Lý Rủi Ro</h1><p>Giám sát camera AI, cảnh báo thiên tai, lên lịch tuần tra thông minh</p></div></div>
      <div className="sg4">
        {[
          {label:'Sự kiện an toàn hôm nay',val:'4',sub:'2 mức cao',color:'#d97706'},
          {label:'Camera đang hoạt động',val:'12/12',sub:'100% online',color:'#107c10'},
          {label:'Cảnh báo thiên tai',val:'0',sub:'Thời tiết bình thường',color:'#0078d4'},
          {label:'Tuần tra theo lịch hôm nay',val:'3/4',sub:'1 còn lại 14:00',color:'#0078d4'},
        ].map((s,i)=><div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div><div className="sc-sub">{s.sub}</div></div>)}
      </div>
      <div className="tabs">
        {['Giám sát camera','Cảnh báo thiên tai','Tuần tra thông minh'].map((t,i)=>(
          <div key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>
      {tab===0 && (
        <div className="sg">
          <div className="card">
            <div className="card-title"><span className="card-title-left">📹 Sự kiện vi phạm an toàn hôm nay</span></div>
            <div className="tw"><table>
              <thead><tr><th>Thời gian</th><th>Camera</th><th>Loại vi phạm</th><th>Khu vực</th><th>Mức độ</th><th>Hành động</th></tr></thead>
              <tbody>{incidents.map((e,i)=>(
                <tr key={i}>
                  <td className="fw5">{e.time}</td><td className="cm">{e.cam}</td>
                  <td>{e.type}</td><td className="cm">{e.area}</td>
                  <td><span className={`badge ${e.level==='Cao'?'badge-red':e.level==='Trung bình'?'badge-yellow':'badge-gray'}`}>{e.level}</span></td>
                  <td><span className="badge badge-blue">{e.action}</span></td>
                </tr>
              ))}</tbody>
            </table></div>
          </div>
          {/* focused view */}
          {focus && (
            <div className="card" style={{padding:12}}>
              <div className="fl ic jb" style={{marginBottom:8}}>
                <span className="card-title-left" style={{margin:0}}>
                  🔍 {CAMS.find(c=>c.id===focus)?.name} — Xem chi tiết
                </span>
                <button onClick={()=>setFocus(null)}
                  style={{border:'none',background:'#f1f5f9',borderRadius:6,padding:'4px 10px',
                    cursor:'pointer',fontSize:12,color:'#475569'}}>✕ Đóng</button>
              </div>
              <CamFeed cam={CAMS.find(c=>c.id===focus)} large />
            </div>
          )}

          {/* 6-camera grid: 3 columns */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {CAMS.map(cam=>(
              <div key={cam.id} onClick={()=>setFocus(cam.id===focus?null:cam.id)}
                style={{cursor:'pointer'}}>
                <CamFeed cam={cam}/>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
                  marginTop:5,paddingInline:2}}>
                  <span style={{fontSize:11,color:'#374151',fontWeight:600}}>{cam.name}</span>
                  <span className={`badge ${cam.alert?'badge-red':'badge-green'}`}>
                    {cam.alert?'⚠ Sự kiện':'🟢 Bình thường'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab===1 && (
        <div className="sg" style={{gap:10}}>
          <div className="al al-green">✅ <strong>Trời nắng</strong> – Không có cảnh báo thời tiết nguy hiểm. Nhiệt độ kho: 22–24°C, độ ẩm: 65%.</div>
          <div className="card">
            <div className="card-title"><span className="card-title-left">🌡️ Thông số môi trường nhà máy</span></div>
            <div className="sg3">
              {[
                {label:'Nhiệt độ kho NVL',val:'18°C',status:'Bình thường',badge:'badge-green'},
                {label:'Độ ẩm phòng chiết',val:'62%',status:'Bình thường',badge:'badge-green'},
                {label:'Nồng độ CO₂ nội bộ',val:'420 ppm',status:'An toàn',badge:'badge-green'},
                {label:'Áp suất nước cứu hỏa',val:'4.8 bar',status:'Đủ áp lực',badge:'badge-green'},
                {label:'Cảm biến khí gas',val:'0 ppm',status:'Không rò rỉ',badge:'badge-green'},
                {label:'Hệ thống báo cháy',val:'Hoạt động',status:'Sẵn sàng',badge:'badge-green'},
              ].map((m,i)=>(
                <div className="sc" key={i}><div className="sc-label tsm">{m.label}</div>
                  <div className="sc-value" style={{fontSize:18,color:'var(--green)'}}>{m.val}</div>
                  <span className={`badge ${m.badge}`}>{m.status}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab===2 && (
        <div className="card">
          <div className="card-title"><span className="card-title-left">🗺️ Lịch tuần tra thông minh hôm nay</span></div>
          <div className="tl">
            {[
              {time:'08:00',area:'Khu chiết rót – Line 1 & 2',guard:'Nguyễn Văn A',status:'Hoàn thành',color:'tl-green'},
              {time:'10:00',area:'Kho nguyên liệu A, B, C',guard:'Trần Thị B',status:'Hoàn thành',color:'tl-green'},
              {time:'12:00',area:'Khu điện – Phòng máy biến áp',guard:'Lê Văn C',status:'Hoàn thành',color:'tl-green'},
              {time:'14:00',area:'Khu xử lý nước thải + bờ bao',guard:'Phạm Thị D',status:'Chưa thực hiện',color:'tl-yellow'},
            ].map((t,i)=>(
              <div className="tl-item" key={i}>
                <div className={`tl-dot ${t.color}`} style={{fontSize:9}}>{t.time}</div>
                <div className="tl-body">
                  <div className="tl-title">{t.area}</div>
                  <div className="tl-meta fl ic g8">{t.guard} · <span className={`badge ${t.status==='Hoàn thành'?'badge-green':'badge-yellow'}`}>{t.status}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
