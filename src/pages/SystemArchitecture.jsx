import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/context'
import {
  ReactFlow, Background, Controls, MiniMap, Panel,
  Handle, Position, useNodesState, useEdgesState,
  MarkerType, BaseEdge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

/* ─── PALETTE ────────────────────────────────────────────────────────────── */
const C = {
  green:  { main:'#16a34a', light:'#dcfce7', border:'#86efac', dark:'#14532d' },
  orange: { main:'#ea580c', light:'#fff7ed', border:'#fdba74', dark:'#7c2d12' },
  blue:   { main:'#2563eb', light:'#eff6ff', border:'#93c5fd', dark:'#1e3a8a' },
  purple: { main:'#7c3aed', light:'#f5f3ff', border:'#c4b5fd', dark:'#4c1d95' },
  teal:   { main:'#0d9488', light:'#f0fdfa', border:'#5eead4', dark:'#134e4a' },
  indigo: { main:'#4f46e5', light:'#eef2ff', border:'#a5b4fc', dark:'#312e81' },
}
const ff = "'Inter','system-ui','-apple-system','sans-serif'"

/* ─── CUSTOM NODES ───────────────────────────────────────────────────────── */

function SectionNode({ data }) {
  return (
    <div style={{ width:data.w, height:data.h, background:data.bg,
      border:`1.5px solid ${data.border}`, borderRadius:16, fontFamily:ff }}>
      <div style={{ background:data.main, borderRadius:'14px 14px 0 0',
        padding:'8px 16px', display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:16 }}>{data.icon}</span>
        <div>
          <div style={{ fontSize:11.5, fontWeight:700, color:'#fff', letterSpacing:'.3px' }}>{data.label}</div>
          {data.sub && <div style={{ fontSize:10, color:'rgba(255,255,255,.7)', marginTop:1 }}>{data.sub}</div>}
        </div>
      </div>
    </div>
  )
}

function SourceNode({ data }) {
  return (
    <div style={{ width:220, background:'#fff', border:`1px solid ${C.green.border}`,
      borderLeft:`4px solid ${C.green.main}`, borderRadius:10, padding:'12px 14px',
      boxShadow:'0 2px 12px rgba(0,0,0,.08)', fontFamily:ff }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
        <span style={{ fontSize:20 }}>{data.icon}</span>
        <span style={{ fontSize:12, fontWeight:700, color:C.green.dark, lineHeight:1.3 }}>{data.title}</span>
      </div>
      {data.items.map((it,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:6,
          fontSize:11, color:'#374151', padding:'2px 0', lineHeight:1.4 }}>
          <div style={{ width:5, height:5, borderRadius:'50%', background:C.green.main,
            flexShrink:0, marginTop:4 }}/>
          {it}
        </div>
      ))}
      <Handle type="source" position={Position.Right}
        style={{ background:C.green.main, border:'2px solid #fff', width:10, height:10 }}/>
    </div>
  )
}

function PipelineNode({ data }) {
  return (
    <div style={{ width:200, background:'#fff', border:`1px solid ${C.orange.border}`,
      borderRadius:10, padding:'10px 14px', boxShadow:'0 2px 10px rgba(0,0,0,.07)',
      fontFamily:ff, display:'flex', alignItems:'center', gap:10 }}>
      <div style={{ width:28, height:28, borderRadius:'50%',
        background:`linear-gradient(135deg,${C.orange.main},#f97316)`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:12, fontWeight:800, color:'#fff', flexShrink:0,
        boxShadow:`0 2px 8px ${C.orange.main}60` }}>{data.step}</div>
      <div>
        <div style={{ fontSize:10, color:C.orange.main, fontWeight:700,
          letterSpacing:'.3px', textTransform:'uppercase' }}>Step {data.step}</div>
        <div style={{ fontSize:11.5, fontWeight:600, color:'#1f2937',
          lineHeight:1.35, marginTop:1 }}>{data.label}</div>
      </div>
      {/* LEFT handle — all source nodes connect here */}
      <Handle type="target" position={Position.Left} id="left"
        style={{ background:C.green.main, border:'2px solid #fff', width:10, height:10 }}/>
      {/* TOP/BOTTOM for vertical sequential flow within pipeline */}
      <Handle type="target" position={Position.Top} id="top"
        style={{ background:C.orange.main, border:'2px solid #fff', width:10, height:10 }}/>
      <Handle type="source" position={Position.Bottom} id="bottom"
        style={{ background:C.orange.main, border:'2px solid #fff', width:10, height:10 }}/>
      {/* RIGHT handle — connects to AI groups */}
      {data.rightHandle && (
        <Handle type="source" position={Position.Right} id="right"
          style={{ background:C.blue.main, border:'2px solid #fff', width:10, height:10 }}/>
      )}
    </div>
  )
}

function AIGroupNode({ data }) {
  const navigate = useNavigate()
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [hov, setHov] = useState(null)
  const pal = C[data.pal]
  return (
    <div style={{ width:340, background:'#fff', border:`1.5px solid ${pal.border}`,
      borderRadius:12, boxShadow:`0 4px 24px ${pal.main}20`,
      overflow:'hidden', fontFamily:ff }}>
      <div style={{ background:`linear-gradient(135deg,${pal.main},${pal.dark})`,
        padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ fontSize:18 }}>{data.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{data.title}</div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,.7)', marginTop:1 }}>
            {data.fns.length} AI functions · {tx.clickHint}</div>
        </div>
      </div>
      <div style={{ padding:'6px 8px' }}>
        {data.fns.map((fn,i)=>(
          <div key={i}
            onClick={()=>navigate(fn.path)}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{ display:'flex', alignItems:'center', gap:8,
              padding:'5px 8px', borderRadius:7, cursor:'pointer', marginBottom:2,
              transition:'all .12s', backgroundColor: hov===i ? pal.main : 'transparent' }}>
            <div style={{ width:22, height:22, borderRadius:6, display:'flex',
              alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0,
              background: hov===i ? 'rgba(255,255,255,.2)' : pal.light }}>{fn.icon}</div>
            <span style={{ fontSize:11.5, fontWeight:500, flex:1, lineHeight:1.3,
              color: hov===i ? '#fff' : '#1f2937' }}>{fn.label}</span>
            {hov===i && <span style={{ fontSize:11, color:'rgba(255,255,255,.8)' }}>→</span>}
          </div>
        ))}
      </div>
      <Handle type="target" position={Position.Left}
        style={{ background:pal.main, border:'2px solid #fff', width:10, height:10 }}/>
      <Handle type="source" position={Position.Right}
        style={{ background:pal.main, border:'2px solid #fff', width:10, height:10 }}/>
    </div>
  )
}

function AppGroupNode({ data }) {
  const navigate = useNavigate()
  const [hov, setHov] = useState(null)
  const pal = C[data.pal]
  return (
    <div style={{ width:200, background:'#fff', border:`1.5px solid ${pal.border}`,
      borderRadius:12, overflow:'hidden', boxShadow:`0 4px 20px ${pal.main}18`,
      fontFamily:ff }}>
      <div style={{ background:`linear-gradient(135deg,${pal.main},${pal.dark})`,
        padding:'8px 14px', display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:14 }}>{data.icon}</span>
        <span style={{ fontSize:11, fontWeight:700, color:'#fff' }}>{data.label}</span>
      </div>
      <div style={{ padding:'5px 6px' }}>
        {data.apps.map((app,i)=>(
          <div key={i}
            onClick={()=>navigate(app.path)}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px',
              borderRadius:7, cursor:'pointer', marginBottom:2, transition:'all .12s',
              backgroundColor: hov===i ? pal.main : 'transparent' }}>
            <span style={{ fontSize:14, flexShrink:0 }}>{app.icon}</span>
            <span style={{ fontSize:11.5, fontWeight:500, lineHeight:1.3,
              color: hov===i ? '#fff' : '#1f2937' }}>{app.label}</span>
          </div>
        ))}
      </div>
      <Handle type="target" position={Position.Left}
        style={{ background:pal.main, border:'2px solid #fff', width:10, height:10 }}/>
    </div>
  )
}

/* ─── CUSTOM EDGE: H → V → H path (horizontal depart & arrive) ──────────── */
function HorizEdge({ id, sourceX, sourceY, targetX, targetY, style, markerEnd, animated }) {
  const mx = (sourceX + targetX) / 2
  const d = `M${sourceX},${sourceY} H${mx} V${targetY} H${targetX}`
  return <BaseEdge id={id} path={d} style={style} markerEnd={markerEnd}
    className={animated ? 'animated' : ''} />
}

/* ─── BRIDGE NODE: compact solid-colour badge floating between sections ──── */
function BridgeNode({ data }) {
  return (
    <div style={{
      fontFamily: ff,
      background: data.color,
      color: '#fff',
      borderRadius: 8,
      padding: '6px 12px',
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '.2px',
      boxShadow: '0 2px 8px rgba(0,0,0,.22)',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      userSelect: 'none',
    }}>
      <span style={{ fontSize:12 }}>{data.icon}</span>
      <span>{data.label}</span>
    </div>
  )
}

const nodeTypes = { section:SectionNode, source:SourceNode, pipeline:PipelineNode,
  aiGroup:AIGroupNode, appGroup:AppGroupNode, bridge:BridgeNode }
const edgeTypes = { horiz: HorizEdge }

/* ─── DATA ───────────────────────────────────────────────────────────────── */

const SOURCES = [
  { id:'s1', icon:'🏭', title:'Dữ liệu cốt lõi Sản xuất',
    items:['Công thức & BOM','Kho & Vật tư','Chất lượng QC/QA'] },
  { id:'s2', icon:'📅', title:'Kế hoạch & Vận hành',
    items:['Kế hoạch & Điều độ','Sản xuất & Nhà máy','Nhân sự SX'] },
  { id:'s3', icon:'⚡', title:'Thiết bị & Năng lượng',
    items:['IoT & Thiết bị & Bảo trì','Camera data','Năng lượng & ESG'] },
  { id:'s4', icon:'👤', title:'Hoạt động Người dùng',
    items:['Truy cập hệ thống (RBAC)','Action Logging','Chấm công & Tăng ca'] },
]

const PIPE = [
  { step:1, label:'Thu thập & chuẩn hoá dữ liệu',  rightHandle:true  },
  { step:2, label:'Lưu trữ & mô hình hoá dữ liệu', rightHandle:true  },
  { step:3, label:'Làm sạch & hợp nhất dữ liệu',   rightHandle:false },
  { step:4, label:'Gán nhãn dữ liệu (Labeling)',    rightHandle:true  },
  { step:5, label:'Tạo tập dữ liệu huấn luyện',    rightHandle:false },
]

const AI = [
  { id:'ai1', pal:'blue', icon:'🧠', title:'AI Phân tích dữ liệu tĩnh',
    fns:[
      { icon:'🧪', label:'Tạo công thức/BOM theo mục tiêu',  path:'/rd/formula-gen' },
      { icon:'📐', label:'Cảnh báo rủi ro ổn định Batch',     path:'/rd/batch-calc' },
      { icon:'📅', label:'Tạo kế hoạch sản xuất tự động',     path:'/planning/schedule' },
      { icon:'🔧', label:'Dự báo tuổi thọ linh kiện',         path:'/facilities/equipment' },
      { icon:'📦', label:'Quản lí kho & báo cáo tồn kho',     path:'/warehouse/inventory' },
      { icon:'🌐', label:'Dịch Zalo, đơn hàng, phiên họp',    path:'/warehouse/translation' },
      { icon:'⚙️', label:'Tích hợp & tìm đường xe AGV',        path:'/facilities/production' },
    ] },
  { id:'ai2', pal:'purple', icon:'⚡', title:'AI Phân tích dữ liệu Realtime',
    fns:[
      { icon:'🔧', label:'Dự đoán bảo trì thiết bị',           path:'/facilities/equipment' },
      { icon:'🛠️', label:'Phát hiện bất thường vận hành',       path:'/facilities/repair' },
      { icon:'📷', label:'Computer Vision – lỗi & an toàn LĐ', path:'/facilities/production' },
      { icon:'🌪️', label:'Dự báo & cảnh báo thiên tai',         path:'/facilities/safety' },
      { icon:'⚡', label:'Bất thường tiêu thụ năng lượng',      path:'/facilities/energy' },
    ] },
  { id:'ai3', pal:'teal', icon:'🏛️', title:'Data Warehouse – Single Source of Truth',
    fns:[
      { icon:'🔍', label:'Hợp nhất dữ liệu toàn hệ thống',     path:'/warehouse/reconciliation' },
      { icon:'🔒', label:'Bảo mật & phân quyền (RBAC)',         path:'/dashboard' },
      { icon:'📈', label:'Nền tảng AI & phân tích tổng hợp',    path:'/warehouse/statistics' },
      { icon:'📚', label:'Quản lý tài liệu & kiến thức',        path:'/facilities/knowledge' },
    ] },
]

const APPS = [
  { id:'app1', pal:'blue', icon:'⊞', label:'Tổng quan & R&D',
    apps:[
      { icon:'⊞',  label:'Dashboard hệ thống',  path:'/dashboard' },
      { icon:'🧪', label:'Tạo Formula AI',        path:'/rd/formula-gen' },
      { icon:'📐', label:'Tính Toán Batch',        path:'/rd/batch-calc' },
      { icon:'📊', label:'So Sánh Formula',        path:'/rd/formula-compare' },
      { icon:'📑', label:'Quản Lý BOM',            path:'/rd/bom' },
      { icon:'📅', label:'Lịch Sản Xuất AI',       path:'/planning/schedule' },
    ] },
  { id:'app2', pal:'purple', icon:'🔧', label:'Công vụ & Sản xuất',
    apps:[
      { icon:'🔧', label:'Bảo Trì Thiết Bị',       path:'/facilities/equipment' },
      { icon:'⚡', label:'Quản Lý Năng Lượng',      path:'/facilities/energy' },
      { icon:'⚙️', label:'Hỗ Trợ Sản Xuất',         path:'/facilities/production' },
      { icon:'🦺', label:'An Toàn & Rủi Ro',        path:'/facilities/safety' },
      { icon:'🛠️', label:'Báo Sửa Chữa',            path:'/facilities/repair' },
      { icon:'📚', label:'Tài Liệu & Kiến Thức',    path:'/facilities/knowledge' },
    ] },
  { id:'app3', pal:'teal', icon:'📦', label:'Quản kho & Quản lý',
    apps:[
      { icon:'🌐', label:'Dịch Thuật AI',           path:'/warehouse/translation' },
      { icon:'🔍', label:'Đối Chiếu Excel',          path:'/warehouse/reconciliation' },
      { icon:'📦', label:'Quản Lý Tồn Kho',         path:'/warehouse/inventory' },
      { icon:'⏱️', label:'Tính Giờ Công',            path:'/warehouse/workhour' },
      { icon:'🏷️', label:'Theo Dõi Bao Bì',         path:'/warehouse/packaging' },
      { icon:'📈', label:'Thống Kê Tổng Hợp',       path:'/warehouse/statistics' },
      { icon:'🚚', label:'Tính Ngày Giao Hàng',      path:'/management/delivery' },
    ] },
]

/* ─── BUILD NODES + EDGES ─────────────────────────────────────────────────── */

const SRC_X=60,  SRC_H=148, SRC_GAP=28
const PPL_X=480, PPL_H=60           // gap col1↔col2 = ~180px (badge ~80px → safe)
const AI_X=870                       // gap col2↔col3 = ~148px (badge ~90px → safe)
const APP_X=1430                     // gap col3↔col4 = ~180px for 3 horiz arrows

const Y = 58  // clearance below section header

const aiH  = (fns)  => 58 + fns  * 34
const appH = (apps) => 52 + apps * 30

const GAP = 20   // gap between cards inside a section
const PAD = 32   // bottom padding inside section background

function build() {
  const nodes=[], edges=[]
  const eBase = {
    animated:true,
    markerEnd:{ type:MarkerType.ArrowClosed, width:14, height:14 },
    style:{ strokeWidth:2 },
  }
  const eHoriz = { ...eBase, type:'horiz' }
  const eStep  = { ...eBase, type:'step'  }

  // ── AI heights & canvas Y positions ──────────────────────────────────────
  const aiNodeH   = AI.map(g => aiH(g.fns.length))
  const aiYs      = AI.map((_,i) => Y + aiNodeH.slice(0,i).reduce((s,h)=>s+h+GAP, 0))
  const aiCenters = AI.map((_,i) => aiYs[i] + aiNodeH[i] / 2)
  const aiSectionH = aiYs[2] + aiNodeH[2] + PAD   // total AI section height

  // ── App node heights: center each app group on its paired AI center ───────
  const appNodeH = APPS.map(g => appH(g.apps.length))
  const appYs = []
  APPS.forEach((_,i) => {
    const idealY = aiCenters[i] - appNodeH[i] / 2
    const minY   = i === 0 ? Y : appYs[i-1] + appNodeH[i-1] + GAP
    appYs.push(Math.max(idealY, minY))
  })

  // ── Pipeline nodes: spread evenly across the AI section height ────────────
  // With 5 nodes spread across aiSectionH, p3 (middle node, index 2) lands
  // at the vertical midpoint of the AI section → the single pipe→AI arrow is horizontal.
  const pipeUsable = aiSectionH - Y - PAD           // usable vertical space
  const pipeGap    = (pipeUsable - PIPE.length * PPL_H) / (PIPE.length - 1)
  const pipeYs     = PIPE.map((_,i) => Y + i * (PPL_H + pipeGap))

  // ── Section heights ───────────────────────────────────────────────────────
  const srcSectionH = Y + 4*(SRC_H+SRC_GAP) - SRC_GAP + PAD
  const appSectionH = appYs[2] + appNodeH[2] + PAD
  const maxH = Math.max(srcSectionH, aiSectionH, appSectionH)

  /* ── Section backgrounds ─────────────────────────────────────────────── */
  nodes.push({ id:'sec-src',  type:'section', position:{x:SRC_X-18,y:-20},
    data:{w:258, h:maxH, main:C.green.main, bg:C.green.light, border:C.green.border,
          icon:'🗂️', label:'Nguồn dữ liệu Giavico', sub:'4 nhóm dữ liệu đầu vào'},
    draggable:false, selectable:false, zIndex:-1 })
  nodes.push({ id:'sec-pipe', type:'section', position:{x:PPL_X-18,y:-20},
    data:{w:240, h:maxH, main:C.orange.main, bg:C.orange.light, border:C.orange.border,
          icon:'⚙️', label:'Thu thập & Training Data', sub:'5 bước pipeline'},
    draggable:false, selectable:false, zIndex:-1 })
  nodes.push({ id:'sec-ai',   type:'section', position:{x:AI_X-18,y:-20},
    data:{w:380, h:maxH, main:C.blue.dark, bg:'#f0f4ff', border:C.blue.border,
          icon:'🤖', label:'Nền tảng AI Xử lý dữ liệu',
          sub:`${AI.reduce((s,g)=>s+g.fns.length,0)} AI functions`},
    draggable:false, selectable:false, zIndex:-1 })
  nodes.push({ id:'sec-app',  type:'section', position:{x:APP_X-18,y:-20},
    data:{w:240, h:maxH, main:C.indigo.dark, bg:C.indigo.light, border:C.indigo.border,
          icon:'📱', label:'Ứng dụng người dùng', sub:'19 modules'},
    draggable:false, selectable:false, zIndex:-1 })

  /* ── Source nodes ────────────────────────────────────────────────────── */
  SOURCES.forEach((s,i)=>{
    nodes.push({ id:s.id, type:'source', position:{x:SRC_X, y: Y + i*(SRC_H+SRC_GAP)}, data:s, zIndex:1 })
  })

  /* ── Col1 ↔ Col2: bridge badge in the gap (no line) ──────────────────── */
  // Gap: SRC right edge (SRC_X+220) = 280  →  PPL left edge (PPL_X) = 450
  // Badge centre X = midpoint of the gap between section backgrounds
  const srcSecRight = SRC_X - 18 + 258          // right edge of src section bg
  const pplSecLeft  = PPL_X - 18                // left edge of ppl section bg
  const bridge1X    = (srcSecRight + pplSecLeft) / 2
  const bridge1Y    = aiSectionH / 2 - 28       // vertical centre of diagram
  nodes.push({
    id:'bridge-src-pipe', type:'bridge',
    position:{ x: bridge1X - 44, y: bridge1Y },
    data:{
      label:'4 nguồn',
      icon:'▶',
      color: '#374151',
    },
    draggable:false, selectable:false, zIndex:2,
  })

  /* ── Pipeline nodes (evenly spaced) ─────────────────────────────────── */
  PIPE.forEach((p,i)=>{
    nodes.push({ id:`p${i+1}`, type:'pipeline', position:{x:PPL_X, y:pipeYs[i]}, data:p, zIndex:1 })
    if(i>0) edges.push({
      ...eStep, id:`e-p${i}-p${i+1}`,
      source:`p${i}`, sourceHandle:'bottom',
      target:`p${i+1}`, targetHandle:'top',
      style:{...eStep.style, stroke:C.orange.main, strokeWidth:2},
      markerEnd:{...eBase.markerEnd, color:C.orange.main},
    })
  })

  /* ── Col2 ↔ Col3: bridge badge in the gap (no line) ──────────────────── */
  // Gap: PPL right edge  →  AI left edge
  const pplSecRight = PPL_X - 18 + 240
  const aiSecLeft   = AI_X  - 18
  const bridge2X    = (pplSecRight + aiSecLeft) / 2
  nodes.push({
    id:'bridge-pipe-ai', type:'bridge',
    position:{ x: bridge2X - 46, y: bridge1Y },
    data:{
      label:'Pipeline',
      icon:'▶',
      color: '#374151',
    },
    draggable:false, selectable:false, zIndex:2,
  })

  /* ── AI group nodes ──────────────────────────────────────────────────── */
  AI.forEach((g,i)=>{
    nodes.push({ id:g.id, type:'aiGroup', position:{x:AI_X, y:aiYs[i]}, data:g, zIndex:1 })
  })

  /* ── Col3 → Col4: 3 horizontal arrows (one per group, appYs ≈ aiYs) ─── */
  APPS.forEach((g,i)=>{
    nodes.push({ id:g.id, type:'appGroup', position:{x:APP_X, y:appYs[i]}, data:g, zIndex:1 })
    edges.push({
      ...eHoriz, id:`e-${AI[i].id}-${g.id}`,
      source:AI[i].id, target:g.id,
      style:{...eHoriz.style, stroke:C[g.pal].main, strokeWidth:2.5},
      markerEnd:{...eBase.markerEnd, color:C[g.pal].main, width:16, height:16},
    })
  })

  return { nodes, edges }
}

const { nodes:N0, edges:E0 } = build()

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
const T = {
  vi: {
    title: '🗺️ Kiến trúc hệ thống & Luồng dữ liệu AI',
    subtitle: 'Luồng dữ liệu từ nguồn → pipeline → AI xử lý → ứng dụng. Scroll để zoom, drag để di chuyển. Click node để mở module.',
    legend: [['#16a34a','Nguồn dữ liệu'],['#ea580c','Data Pipeline'],['#2563eb','AI tĩnh'],['#7c3aed','AI Realtime'],['#0d9488','Data Warehouse'],['#4f46e5','Ứng dụng']],
    legendHint: '🖱 Scroll = zoom · Drag = pan · Click node = mở trang',
    panelTitle: 'GIAVICO AI Platform',
    panelLine1: '4 nguồn dữ liệu  →  5 bước pipeline',
    panelLine2: '3 nhóm AI  →  19 module ứng dụng',
    panelVersion: 'Phiên bản 2026 R1',
    clickHint: 'click to open',
  },
  zh: {
    title: '🗺️ 系统架构与AI数据流',
    subtitle: '数据流：数据源 → Pipeline → AI处理 → 应用。滚轮缩放，拖拽平移，点击节点打开模块。',
    legend: [['#16a34a','数据源'],['#ea580c','数据Pipeline'],['#2563eb','静态AI'],['#7c3aed','实时AI'],['#0d9488','数据仓库'],['#4f46e5','应用']],
    legendHint: '🖱 滚轮 = 缩放 · 拖拽 = 平移 · 点击节点 = 打开页面',
    panelTitle: 'GIAVICO AI 平台',
    panelLine1: '4个数据源  →  5步Pipeline',
    panelLine2: '3个AI模块  →  19个应用模块',
    panelVersion: '2026年 R1版本',
    clickHint: '点击打开',
  },
}

export default function SystemArchitecture() {
  const { lang } = useLang()
  const tx = T[lang] || T.vi
  const [nodes,,onNodesChange] = useNodesState(N0)
  const [edges,,onEdgesChange] = useEdgesState(E0)

  return (
    <div className="sg">
      <div className="ph">
        <div>
          <h1>{tx.title}</h1>
          <p>{tx.subtitle}</p>
        </div>
      </div>

      <div style={{ display:'flex', gap:16, flexWrap:'wrap', padding:'8px 14px',
        background:'#f8faff', borderRadius:8, fontSize:11.5, color:'#475569',
        alignItems:'center' }}>
        {tx.legend.map(([c,l])=>(
          <div key={l} style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:10, height:10, borderRadius:3, background:c }}/>
            <span>{l}</span>
          </div>
        ))}
        <span style={{ marginLeft:'auto', opacity:.6, fontSize:11 }}>
          {tx.legendHint}
        </span>
      </div>

      <div style={{ height:'calc(100vh - 230px)', minHeight:580, borderRadius:12,
        overflow:'hidden', border:'1px solid #e2e8f0',
        boxShadow:'0 4px 32px rgba(0,0,0,.08)' }}>
        <ReactFlow nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes} edgeTypes={edgeTypes}
          fitView fitViewOptions={{ padding:0.06 }}
          minZoom={0.25} maxZoom={1.6}
          style={{ background:'#f8faff' }}
          attributionPosition="bottom-left">
          <Background variant="dots" gap={24} size={1.2} color="#cbd5e1"/>
          <Controls position="bottom-right"
            style={{ bottom:16, right:16, borderRadius:8,
              boxShadow:'0 2px 12px rgba(0,0,0,.1)', border:'1px solid #e2e8f0' }}/>
          <MiniMap position="bottom-left"
            style={{ bottom:16, left:16, borderRadius:8,
              border:'1px solid #e2e8f0', boxShadow:'0 2px 12px rgba(0,0,0,.08)' }}
            nodeColor={n=>{
              if(n.type==='source') return C.green.main
              if(n.type==='pipeline') return C.orange.main
              if(n.type==='aiGroup') return C[n.data?.pal]?.main||'#666'
              if(n.type==='appGroup') return C[n.data?.pal]?.main||'#666'
              return '#e2e8f0'
            }}
            maskColor="rgba(248,250,252,.8)"/>
          <Panel position="top-right">
            <div style={{ background:'rgba(255,255,255,.92)', backdropFilter:'blur(8px)',
              border:'1px solid #e2e8f0', borderRadius:10, padding:'10px 14px',
              fontSize:11, color:'#64748b', lineHeight:1.7,
              boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
              <div style={{ fontWeight:700, color:'#1e293b', marginBottom:2, fontSize:12 }}>
                {tx.panelTitle}
              </div>
              <div>{tx.panelLine1}</div>
              <div>{tx.panelLine2}</div>
              <div style={{ marginTop:4, paddingTop:4, borderTop:'1px solid #f1f5f9', color:'#94a3b8' }}>
                {tx.panelVersion}
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}
