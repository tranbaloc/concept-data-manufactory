// ============================================================
// Dữ liệu 3 LINE sản phẩm: AV / ND / GV (生管部 V1.1)
// Nguồn: AV計算原料, AV/ND生産排程, GV排程, BẢNG TỔNG HỢP
// ============================================================

export const LINES = {
  av: { key: 'av', code: 'AV', emoji: '🟦', name: 'Lô Hội · Nước Quả', nameZh: '芦荟·果汁', color: '#0078d4', dept: 'BP Sản Xuất 2' },
  nd: { key: 'nd', code: 'ND', emoji: '🟩', name: 'Nata de coco', nameZh: '椰果', color: '#059669', dept: 'BP Sản Xuất 1+2' },
  gv: { key: 'gv', code: 'GV', emoji: '🟨', name: 'Chai · Đường', nameZh: '瓶装·糖', color: '#d97706', dept: 'BP Sản Xuất 4' },
}
export const LINE_KEYS = ['av', 'nd', 'gv']

/* ───────────── 1) QUẢN CHẾ ĐƠN & TRẠNG THÁI ───────────── */
export const orderData = {
  av: [
    {id:'VN-25100014',region:'Nội địa',code:'VAV-AI266-HAA-07',qty:2676,produced:2676,shipped:2200,deadline:'3-24/12/2025',spec:'0505',priority:'TB'},
    {id:'VN-25100017',region:'Nội địa',code:'VAV-AI266-HAA-25',qty:1000,produced:1000,shipped:1000,deadline:'16/12/2025',spec:'0505',priority:'TB'},
    {id:'VN-25110013-1+2',region:'Nội địa',code:'VAV-AI266-HAA-25',qty:2000,produced:1180,shipped:0,deadline:'16-26/01/2026',spec:'0505',priority:'Cao'},
    {id:'VN-25110014',region:'Nội địa',code:'VAV-AI266-HAA-07',qty:2141,produced:0,shipped:0,deadline:'20-30/01/2026',spec:'0505',priority:'Cao'},
    {id:'VN-25110003',region:'Nội địa',code:'VAV-AI270-HAA-25',qty:1400,produced:1211,shipped:1117,deadline:'26/12/2025',spec:'0808',priority:'TB'},
    {id:'PPO-24120020-5',region:'Hàn Quốc',code:'VAV-AE020-BAA-55',qty:223,produced:223,shipped:223,deadline:'11/2025: 3FCL',spec:'0305',priority:'Cao'},
    {id:'PPO-24120004',region:'Hàn Quốc',code:'VAV-AE084-BAA-52',qty:537,produced:329,shipped:208,deadline:'11/2025: 8FCL',spec:'—',priority:'Cao'},
    {id:'PPO-25070009-2',region:'Đông Nam Á',code:'VAV-AE098-BAA-94',qty:110,produced:118,shipped:110,deadline:'01/11/2025',spec:'0306',priority:'TB'},
    {id:'PPO-24090021-11',region:'Đông Nam Á',code:'VAV-AI132-HAA-6G',qty:1400,produced:1400,shipped:1380,deadline:'14/11/2025',spec:'0406',priority:'TB'},
    {id:'YPI-25100007',region:'TW001',code:'VAV-AI119-HAA-07',qty:500,produced:0,shipped:0,deadline:'30/12/2025',spec:'0204',priority:'Thấp'},
  ],
  nd: [
    {id:'PPO-25100016',region:'Đông Nam Á',code:'VND-AI002-BAA-5B',qty:4032,produced:504,shipped:0,deadline:'15/03-4cont…11/2026',spec:'0705',priority:'Cao'},
    {id:'YPI-26010002',region:'TW001',code:'VND-AI018-HAA-07',qty:940,produced:929,shipped:0,deadline:'ETD 24/03/2026',spec:'0705',priority:'Cao'},
    {id:'PPO-26020004-1-3',region:'Đông Nam Á',code:'VND-AI002-HAA-25',qty:5600,produced:0,shipped:0,deadline:'16-27/03 → 12/04/2026',spec:'0705',priority:'TB'},
    {id:'PPO-25120009-1+2',region:'Đông Nam Á',code:'VNC-AI195-HAA-17',qty:2890,produced:1445,shipped:0,deadline:'ETD 27/03 & 10/07/2026',spec:'—',priority:'TB'},
    {id:'VN-24050014-2',region:'Nội địa',code:'VNC-AI446-BAA-92',qty:250,produced:0,shipped:0,deadline:'NV đã YC SX 75T',spec:'—',priority:'TB'},
  ],
  gv: [
    {id:'VN-26020018',region:'Nội địa',code:'VMX-AP244-RAL-T1',qty:6720,produced:2400,shipped:0,deadline:'13-23/03/2026',spec:'355ml',priority:'Cao'},
    {id:'VN-25090010',region:'Nội địa',code:'VMX-AP244-RAL-T1',qty:6720,produced:6720,shipped:6720,deadline:'09/2025',spec:'355ml',priority:'TB'},
    {id:'VN-26020018-2',region:'Nội địa',code:'VKM-BC063-FAL-50',qty:3360,produced:0,shipped:0,deadline:'04/2026',spec:'500ml',priority:'TB'},
  ],
}
export const orderRegions = {
  av: ['Tất cả','Nội địa','Hàn Quốc','Đông Nam Á','TW001','TW002'],
  nd: ['Tất cả','Nội địa','Đông Nam Á','TW001'],
  gv: ['Tất cả','Nội địa','Đông Nam Á'],
}

/* ───────────── 2) PHÂN TÍCH NVL TỪNG ĐƠN ───────────── */
export const materialData = {
  av: {
    reqDoc: 'GV01',
    orders: [
      {id:'VN-25090012-1+2',region:'Nội địa',code:'VAV-AI266-HAA-07',spec:'0505',specType:'lớn',qty:1597,unit:'thùng',deadline:'14+21/11/2025',materialReq:72702,nvlRule:100,prevStock:9,note:'100% NVL quy cách lớn'},
      {id:'VN-25090011',region:'Nội địa',code:'VAV-AI266-HAA-25',spec:'0505',specType:'lớn',qty:1500,unit:'thùng',deadline:'06/11/2025',materialReq:36517,nvlRule:60,prevStock:0,note:'60% NVL quy cách lớn'},
      {id:'PPO-24120020-5',region:'Hàn Quốc',code:'VAV-AE020-BAA-55',spec:'0305',specType:'nhỏ',qty:223,unit:'thùng',deadline:'11/2025: 3FCL',materialReq:98238,nvlRule:100,prevStock:11,note:'Quy cách nhỏ'},
      {id:'PPO-24120004',region:'Hàn Quốc',code:'VAV-AE084-BAA-52',spec:'—',specType:'nhỏ',qty:537,unit:'thùng',deadline:'11/2025: 8FCL',materialReq:253302,nvlRule:100,prevStock:55,note:''},
      {id:'PPO-25070009-2',region:'Đông Nam Á',code:'VAV-AE098-BAA-94',spec:'0306',specType:'nhỏ',qty:110,unit:'thùng',deadline:'01/11/2025',materialReq:48780,nvlRule:100,prevStock:0,note:''},
      {id:'VN-25100014',region:'Nội địa',code:'VAV-AI266-HAA-07',spec:'0505',specType:'lớn',qty:2676,unit:'thùng',deadline:'3-24/12/2025',materialReq:121823,nvlRule:100,prevStock:0,note:'100% NVL'},
      {id:'VN-25110003',region:'Nội địa',code:'VAV-AI270-HAA-25',spec:'0808',specType:'lớn',qty:1330,unit:'thùng',deadline:'26/12/2025',materialReq:32019,nvlRule:30,prevStock:0,note:'30% NVL quy cách lớn'},
    ],
    specRules: [
      {code:'VAV-AI266-HAA-07',spec:'0505',rule:'100% NVL',color:'#0078d4'},
      {code:'VAV-AI266-HAA-25',spec:'0505',rule:'60% NVL',color:'#059669'},
      {code:'VAV-AI270-HAA-25/36',spec:'0808',rule:'30% NVL',color:'#d97706'},
      {code:'VAV-AI004-HAA-29',spec:'1010',rule:'30% NVL',color:'#8b5cf6'},
      {code:'VAV-AP020-HAL-25',spec:'Đặc biệt',rule:'NVL nhỏ ×4.7%÷10 → số bao (max 80=17t)',color:'#dc2626'},
      {code:'VAV-BP046-FAL',spec:'Đặc biệt',rule:'NVL nhỏ ×2.3%÷20 → số rổ (đơn trái cây)',color:'#be185d'},
    ],
    inventory: [
      {material:'NVL miếng nata (1010 CP2)',need:574976,onHand:312000,reserved:88000,incoming:120000,unit:'kg'},
      {material:'Hương liệu nho (VAV-AE020)',need:1850,onHand:600,reserved:120,incoming:1500,unit:'kg'},
      {material:'Đường (融糖)',need:142000,onHand:96000,reserved:12000,incoming:60000,unit:'kg'},
      {material:'Bao bì thùng (0505)',need:24350,onHand:18000,reserved:0,incoming:8000,unit:'thùng'},
    ],
    requestRows: [
      {date:'2025/11/03',need:'21 MTS'},{date:'2025/11/04',need:'21 MTS'},{date:'2025/11/05',need:'21 MTS'},
      {date:'2025/11/06',need:'21 MTS'},{date:'2025/11/07',need:'21 MTS'},
    ],
  },
  nd: {
    reqDoc: 'ND02',
    orders: [
      {id:'PPO-25100016',region:'Đông Nam Á',code:'VND-AI002-BAA-5B',spec:'0705',specType:'nata',qty:4032,unit:'桶',deadline:'15/03/2026',materialReq:181440,nvlRule:'nata miếng',prevStock:3,note:'Cấy-thu hoạch-cắt'},
      {id:'YPI-26010002',region:'TW001',code:'VND-AI018-HAA-07',spec:'0705',specType:'nata',qty:940,unit:'桶',deadline:'24/03/2026',materialReq:42300,nvlRule:'nata miếng',prevStock:11,note:''},
      {id:'PPO-26020004-1-3',region:'Đông Nam Á',code:'VND-AI002-HAA-25',spec:'0705',specType:'nata',qty:5600,unit:'箱',deadline:'12/04/2026',materialReq:142800,nvlRule:'nata miếng',prevStock:0,note:'kqs đóng cont'},
    ],
    specRules: [
      {code:'Cấy giống (培養)',spec:'CP9/CP2',rule:'Ủ 10-14 ngày',color:'#059669'},
      {code:'Thu hoạch (收成)',spec:'—',rule:'Theo HS thu hoạch',color:'#0891b2'},
      {code:'Cắt miếng (切割)',spec:'0705',rule:'HS cắt SX1→SX2',color:'#d97706'},
      {code:'Cắt hạt/dạng (SX2)',spec:'0404/05C5',rule:'Theo đơn',color:'#8b5cf6'},
    ],
    inventory: [
      {material:'NVL miếng nata SX1→SX2',need:366540,onHand:240000,reserved:60000,incoming:90000,unit:'kg'},
      {material:'Nata thành phẩm nấu (05C5)',need:60537,onHand:42000,reserved:8000,incoming:25000,unit:'kg'},
      {material:'Đường (融糖)',need:48000,onHand:36000,reserved:4000,incoming:18000,unit:'kg'},
      {material:'Bao bì 桶/箱',need:10572,onHand:6500,reserved:0,incoming:5000,unit:'cái'},
    ],
    requestRows: [
      {date:'Tuần 15-21/11',need:'49 MTS'},{date:'Tuần 22-28/11',need:'24 MTS'},
      {date:'Tuần 29/11-05/12',need:'33 MTS'},{date:'Tuần 06-12/12',need:'24 MTS'},
    ],
  },
  gv: {
    reqDoc: 'WM01',
    orders: [
      {id:'VN-26020018',region:'Nội địa',code:'VMX-AP244-RAL-T1',spec:'355ml',specType:'chai',qty:6720,unit:'thùng',deadline:'13-23/03/2026',materialReq:322572,nvlRule:'chai+đường',prevStock:0,note:'CLASSY 355ml'},
      {id:'VN-26020018-2',region:'Nội địa',code:'VKM-BC063-FAL-50',spec:'500ml',specType:'chai',qty:3360,unit:'thùng',deadline:'04/2026',materialReq:161280,nvlRule:'chai+đường',prevStock:0,note:''},
    ],
    specRules: [
      {code:'融糖 (xử lý đường)',spec:'KT cung cấp',rule:'Theo ca SX',color:'#d97706'},
      {code:'Chai nhựa (HP010)',spec:'355ml',rule:'40,500 chai/cont',color:'#0078d4'},
      {code:'Nhãn/Decal (FD004)',spec:'—',rule:'164,000 bộ/đợt',color:'#8b5cf6'},
      {code:'Đụng máy NF 8mt',spec:'—',rule:'Không xếp cùng ca',color:'#dc2626'},
    ],
    inventory: [
      {material:'Chai nhựa 355ml (HP010)',need:322766,onHand:53762,reserved:0,incoming:322766,unit:'chai'},
      {material:'Nhãn/Decal (FD004)',need:330000,onHand:3900,reserved:0,incoming:319272,unit:'bộ'},
      {material:'Nắp chai trắng (NA078)',need:336300,onHand:3560,reserved:0,incoming:319582,unit:'cái'},
      {material:'Đường (融糖)',need:96000,onHand:64000,reserved:8000,incoming:40000,unit:'kg'},
    ],
    requestRows: [
      {date:'2026/03/03',need:'20 MTS'},{date:'2026/03/04',need:'39 MTS'},{date:'2026/03/05',need:'57 MTS'},
    ],
  },
}

/* ───────────── 3) XÁC NHẬN GIAO KỲ (chung quy trình, đổi đơn theo line) ───────────── */
const baseDeptConfirms = [
  {dept:'Kỹ Thuật', icon:'🔬', color:'#8b5cf6', items:'Phương thức SP, quy trình SX, hạn chế kỹ thuật, xử lý đường', value:'Công thức đã có tiền lệ', status:'done', who:'BP Kỹ Thuật'},
  {dept:'Sản Xuất', icon:'🏭', color:'#dc2626', items:'Năng lực, gộp đơn cùng quy trình, nhân lực, máy/công cụ, số ngày đóng gói', value:'Line trống, đóng gói 3 ngày', status:'done', who:'BP Sản Xuất'},
  {dept:'Thu Mua / NVL', icon:'🏪', color:'#d97706', items:'Tình trạng cung ứng NVL & bao bì, ETA dự kiến', value:'Một số vật tư ETA 18 ngày', status:'risk', who:'BP Thu Mua'},
  {dept:'QA / Phẩm Bảo', icon:'✅', color:'#059669', items:'Thời gian quan sát SP, số ngày làm lạnh', value:'Quan sát 7 ngày', status:'done', who:'BP QA'},
  {dept:'Kho Vận', icon:'🚢', color:'#0078d4', items:'Thời gian đóng container (pallet, thùng gỗ)', value:'Đóng cont 1.5 ngày/40RF', status:'pending', who:'BP Quản Kho'},
]
const baseTracking = [
  {grp:'KT', item:'Phương thức / loss SP, cập nhật công thức, xử lý BTP', dept:'Kỹ Thuật', status:'done'},
  {grp:'NVL', item:'Xác nhận nguyên liệu, ngày giao BTP & NVL', dept:'Nguyên Liệu/Thu Mua', status:'risk'},
  {grp:'Bao bì', item:'Tiến độ bao bì, decal (nhãn)', dept:'Thu Mua/Kho', status:'pending'},
  {grp:'SX', item:'Xác nhận số ca, đụng thiết bị, tiến độ SX', dept:'Sản Xuất', status:'done'},
  {grp:'QA', item:'Tiến độ nghiệm thu nguyên liệu', dept:'QA', status:'done'},
  {grp:'NV', item:'Kế hoạch xuất hàng, phê duyệt mẫu', dept:'Nghiệp Vụ', status:'pending'},
]
export const deliveryData = {
  av: { order:'VN-25110014', product:'VAV-AI266-HAA-07 (0505)', deptConfirms:baseDeptConfirms, tracking:baseTracking,
    scenarios:[
      {name:'Giữ nguyên kế hoạch',date:'30/01/2026',delay:'+0',cost:100,risk:'TB',note:'Theo năng lực hiện tại'},
      {name:'Tăng ca cuối tuần',date:'26/01/2026',delay:'−4 ngày',cost:108,risk:'Thấp',note:'Tăng ca T7 Line AV'},
      {name:'Ưu tiên chèn đơn gấp',date:'24/01/2026',delay:'−6 ngày',cost:104,risk:'TB',note:'Dời 1 đơn TB'},
      {name:'Chia batch giao trước',date:'22/01/2026',delay:'−8 ngày',cost:112,risk:'Thấp',note:'Giao 50% trước'},
    ] },
  nd: { order:'PPO-25100016', product:'VND-AI002-BAA-5B (nata)', deptConfirms:baseDeptConfirms, tracking:baseTracking,
    scenarios:[
      {name:'Giữ nguyên kế hoạch',date:'15/03/2026',delay:'+0',cost:100,risk:'TB',note:'Phụ thuộc thời gian ủ nata'},
      {name:'Cấy sớm + tăng ca cắt',date:'11/03/2026',delay:'−4 ngày',cost:106,risk:'TB',note:'Cấy 01/03, tăng ca SX1'},
      {name:'Ưu tiên line ND',date:'13/03/2026',delay:'−2 ngày',cost:103,risk:'Thấp',note:'Ưu tiên nồi nấu'},
    ] },
  gv: { order:'VN-26020018', product:'VMX-AP244-RAL-T1 (CLASSY 355ml)', deptConfirms:baseDeptConfirms, tracking:baseTracking,
    scenarios:[
      {name:'Giữ nguyên kế hoạch',date:'23/03/2026',delay:'+0',cost:100,risk:'Cao',note:'Chờ chai & nắp về'},
      {name:'Giao trước 4 cont',date:'13/03/2026',delay:'−10 ngày',cost:105,risk:'TB',note:'162,000 chai đợt 1'},
      {name:'Tăng tốc dán nhãn',date:'18/03/2026',delay:'−5 ngày',cost:108,risk:'Thấp',note:'24,000 bộ/ngày'},
    ] },
}

/* ───────────── 4) LỆNH SẢN XUẤT (nội dung riêng theo line) ───────────── */
export const productionData = {
  av: {
    detail: [
      {order:'VN-25100014',code:'VAV-AI266-HAA-07',spec:'0505',qty:2676,unit:'桶',plan:[299,439,439,439,439,439],actual:[322,448,471,467,449,449],sub:'AV-1'},
      {order:'VN-25100017',code:'VAV-AI266-HAA-25',spec:'0505',qty:1000,unit:'箱',plan:[289,493,218],actual:[356,492,152],sub:'AV-1'},
      {order:'VN-25110003',code:'VAV-AI270-HAA-25',spec:'0808',qty:1400,unit:'箱',plan:[249,249,249,249,120,283],actual:[279,262,264,254,152,0],sub:'AV-2'},
    ],
    issue:{orderNo:'LSX-AV-260301',line:'BP Sản Xuất 2 (AV)',start:'01/03/2026',finish:'15/03/2026'},
  },
  nd: {
    backCalc: [
      {step:'Nấu & Đóng gói (SX2)', icon:'🍲', lead:0, date:'15/03/2026', who:'SX2', note:'Ngày SX cuối (mốc)'},
      {step:'Cắt hạt/dạng (SX2)', icon:'⚡', lead:1, date:'14/03/2026', who:'SX2', note:'Trước nấu 1 ngày'},
      {step:'Chuyển NVL miếng SX1→SX2', icon:'🚚', lead:2, date:'13/03/2026', who:'SX1→SX2', note:'Chốt tuần'},
      {step:'Cắt miếng (SX1)', icon:'🔪', lead:3, date:'12/03/2026', who:'SX1', note:'Theo HS cắt'},
      {step:'Thu hoạch (收成)', icon:'🫙', lead:4, date:'11/03/2026', who:'SX1', note:'Sau ủ 10-14 ngày'},
      {step:'Cấy giống (培養)', icon:'🌱', lead:14, date:'01/03/2026', who:'SX1', note:'Mốc bắt đầu sớm nhất'},
    ],
    orders: [
      {order:'PPO-25100016',code:'VND-AI002-BAA-5B',qty:4032,unit:'桶',deadline:'15/03 - 4 cont',obs:'cqs'},
      {order:'YPI-26010002',code:'VND-AI018-HAA-07',qty:940,unit:'桶',deadline:'ETD 24/03/2026',obs:'cqs'},
      {order:'PPO-26020004-1-3',code:'VND-AI002-HAA-25',qty:5600,unit:'箱',deadline:'16/03+27/03 (kqs)',obs:'kqs'},
    ],
    issue:{orderNo:'LSX-ND-260301',line:'BP Sản Xuất 1+2 (ND)',start:'01/03/2026',finish:'15/03/2026'},
  },
  gv: {
    machine: [
      {a:'VKM-BC063-FAL-50', b:'VAA-AC101-FAC-08', machine:'NF 8mt', conflict:true},
      {a:'VKM-AC063-FAL-50', b:'VAA-BC001-FAW-50', machine:'NF 8mt', conflict:true},
      {a:'VKM-AC040-FAL-50', b:'LC-9C113-FC-50', machine:'NF 8mt', conflict:true},
      {a:'PS-AC122', b:'VKM-BC063-FAL-50', machine:'NF 8mt', conflict:true},
    ],
    sugar: [
      {week:'Tuần 10 (03-05/03)', wm01:'20→39→57 MTS', sugar:'8.2 tấn', status:'done'},
      {week:'Tuần 11', wm01:'45 MTS/ngày', sugar:'9.4 tấn', status:'planned'},
      {week:'Tuần 12', wm01:'50 MTS/ngày', sugar:'10.1 tấn', status:'planned'},
    ],
    issue:{orderNo:'LSX-GV-260303',line:'BP Sản Xuất 4 (GV)',start:'03/03/2026',finish:'12/03/2026'},
  },
}
