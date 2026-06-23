import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar } from 'recharts'
import { useLang } from '../../i18n/context'

/* ─────────────────── VERSION 1.0 DATA ─────────────────── */
const ordersV1 = [
  {id:'ORD-2608',product:'NC Cam 500ml',qty:35000,done:35000,deadline:'08/06',priority:'Cao',status:'Hoan thanh',line:'Line 2',oee:91,
   steps:[{step:'Pha che',start:'06:00',end:'08:30',status:'done',worker:'Phong R&D'},{step:'Chiet rot',start:'08:30',end:'14:00',status:'done',worker:'Line 2'},{step:'Dan nhan',start:'14:00',end:'16:30',status:'done',worker:'Line 2'},{step:'Dong thung',start:'16:30',end:'18:00',status:'done',worker:'Nhom dong goi'}]},
  {id:'ORD-2610',product:'NC Cam 330ml',qty:50000,done:32000,deadline:'16/06',priority:'Cao',status:'Dang SX',line:'Line 1',oee:88,
   steps:[{step:'Pha che',start:'06:00',end:'08:00',status:'done',worker:'Phong R&D'},{step:'Chiet rot',start:'08:00',end:'16:00',status:'active',worker:'Line 1 - dang chay'},{step:'Dan nhan',start:'16:00',end:'18:30',status:'pending',worker:'Line 1'},{step:'Dong thung',start:'18:30',end:'20:00',status:'pending',worker:'Nhom dong goi'}]},
  {id:'ORD-2611',product:'NC Chanh 500ml',qty:30000,done:0,deadline:'18/06',priority:'Cao',status:'Cho NVL',line:'Line 2',oee:0,
   steps:[{step:'Pha che',start:'Cho NFC 65Brix',end:'',status:'blocked',worker:'Phong R&D'},{step:'Chiet rot',start:'',end:'',status:'pending',worker:'Line 2'},{step:'Dan nhan',start:'',end:'',status:'pending',worker:'Line 2'},{step:'Dong thung',start:'',end:'',status:'pending',worker:'Nhom dong goi'}]},
  {id:'ORD-2612',product:'NC Dua 1L',qty:20000,done:0,deadline:'20/06',priority:'TB',status:'Ke hoach',line:'Line 3',oee:0,
   steps:[{step:'Pha che',start:'11/06 06:00',end:'11/06 08:00',status:'pending',worker:'Phong R&D'},{step:'Chiet rot',start:'11/06 08:00',end:'13/06 16:00',status:'pending',worker:'Line 3'},{step:'Dan nhan',start:'13/06 16:00',end:'14/06 10:00',status:'pending',worker:'Line 3'},{step:'Dong thung',start:'14/06 10:00',end:'14/06 16:00',status:'pending',worker:'Nhom dong goi'}]},
  {id:'ORD-2613',product:'Oi Ep 330ml',qty:40000,done:18500,deadline:'17/06',priority:'Cao',status:'Dang SX',line:'Line 1',oee:85,
   steps:[{step:'Pha che',start:'06:00',end:'07:30',status:'done',worker:'Phong R&D'},{step:'Chiet rot',start:'07:30',end:'14:00',status:'active',worker:'Line 1'},{step:'Dan nhan',start:'14:00',end:'17:00',status:'pending',worker:'Line 1'},{step:'Dong thung',start:'17:00',end:'19:00',status:'pending',worker:'Nhom dong goi'}]},
  {id:'ORD-2614',product:'Chanh Muoi 500ml',qty:25000,done:0,deadline:'22/06',priority:'Thap',status:'Ke hoach',line:'Line 2',oee:0,
   steps:[{step:'Pha che',start:'14/06 06:00',end:'14/06 08:00',status:'pending',worker:'Phong R&D'},{step:'Chiet rot',start:'14/06 08:00',end:'16/06 16:00',status:'pending',worker:'Line 2'},{step:'Dan nhan',start:'16/06 16:00',end:'17/06 10:00',status:'pending',worker:'Line 2'},{step:'Dong thung',start:'17/06 10:00',end:'17/06 16:00',status:'pending',worker:'Nhom dong goi'}]},
  {id:'ORD-2615',product:'NC Buoi 330ml',qty:28000,done:0,deadline:'24/06',priority:'TB',status:'Ke hoach',line:'Line 3',oee:0,
   steps:[{step:'Pha che',start:'16/06 06:00',end:'16/06 08:00',status:'pending',worker:'Phong R&D'},{step:'Chiet rot',start:'16/06 08:00',end:'19/06 16:00',status:'pending',worker:'Line 3'},{step:'Dan nhan',start:'19/06 16:00',end:'20/06 10:00',status:'pending',worker:'Line 3'},{step:'Dong thung',start:'20/06 10:00',end:'20/06 16:00',status:'pending',worker:'Nhom dong goi'}]},
]
const ganttBarsV1 = [
  {task:'Line 1 – NC Cam 330ml',start:0,dur:5,pct:64,color:'#0078d4',ord:'ORD-2610'},
  {task:'Line 1 – Oi Ep 330ml',start:0,dur:6,pct:46,color:'#2196f3',ord:'ORD-2613'},
  {task:'Line 2 – NC Chanh 500ml',start:2,dur:5,pct:0,color:'#d13438',ord:'ORD-2611'},
  {task:'Line 2 – Chanh Muoi 500ml',start:5,dur:3,pct:0,color:'#43a047',ord:'ORD-2614'},
  {task:'Line 3 – NC Dua 1L',start:1,dur:4,pct:0,color:'#d97706',ord:'ORD-2612'},
  {task:'Line 3 – NC Buoi 330ml',start:6,dur:4,pct:0,color:'#ff7043',ord:'ORD-2615'},
]
const daysV1 = ['T2 9/6','T3 10/6','T4 11/6','T5 12/6','T6 13/6','T7 14/6','CN 15/6']
const resourceDataV1 = [{r:'Line 1',actual:88},{r:'Line 2',actual:65},{r:'Line 3',actual:72},{r:'Nguyen lieu',actual:78},{r:'Bao bi',actual:95},{r:'Nhan luc',actual:87}]
const simulateV1 = [
  {scenario:'Giu nguyen ke hoach',efficiency:82,delay:2,cost:100,risk:'Cao'},
  {scenario:'Tang ca T7 Line 1',efficiency:91,delay:0,cost:108,risk:'Thap'},
  {scenario:'Chuyen ORD-2611 sang Line 3',efficiency:88,delay:1,cost:103,risk:'Trung binh'},
  {scenario:'Thue them 6 nhan cong',efficiency:94,delay:0,cost:115,risk:'Thap'},
]
const oeeDataV1 = [
  {ca:'Ca1 T2',line1:88,line2:72,line3:80},{ca:'Ca2 T2',line1:91,line2:68,line3:75},
  {ca:'Ca1 T3',line1:85,line2:0,line3:82},{ca:'Ca2 T3',line1:90,line2:0,line3:78},
  {ca:'Ca1 T4',line1:87,line2:0,line3:71},
]

/* ─────────────────── VERSION 1.1 DATA (Real từ file) ─────────────────── */

// AV Line – từ AV計算原料 BẢNG TÍNH NGUYÊN LIỆU AV.xlsx (2026計算原料2.3)
const avOrders = [
  {month:'Th.10/2025',region:'Nội địa',orderId:'VN-25090012-1+2',productCode:'VAV-AI266-HAA-07',spec:'0505',qty:1597,unit:'thùng',deadline:'14/11, 21/11/2025',materialReq:72702,note:'100% NVL quy cách lớn'},
  {month:'Th.10/2025',region:'Nội địa',orderId:'VN-25090011',productCode:'VAV-AI266-HAA-25',spec:'0505',qty:1500,unit:'thùng',deadline:'06/11/2025',materialReq:36517,note:'60% NVL quy cách lớn'},
  {month:'Th.10/2025',region:'Hàn Quốc',orderId:'PPO-24120020-5',productCode:'VAV-AE020-BAA-55',spec:'0305',qty:223,unit:'thùng',deadline:'11/2025: 3FCL',materialReq:98238,note:''},
  {month:'Th.10/2025',region:'Hàn Quốc',orderId:'PPO-24120004',productCode:'VAV-AE084-BAA-52',spec:'—',qty:537,unit:'thùng',deadline:'11/2025: 8FCL',materialReq:253302,note:''},
  {month:'Th.10/2025',region:'Đông Nam Á',orderId:'PPO-25070009-2',productCode:'VAV-AE098-BAA-94',spec:'0306',qty:110,unit:'thùng',deadline:'01/11/2025',materialReq:48780,note:''},
  {month:'Th.10/2025',region:'Đông Nam Á',orderId:'PPO-24090021-11',productCode:'VAV-AI132-HAA-6G',spec:'0406',qty:1400,unit:'thùng',deadline:'14/11/2025',materialReq:34340,note:''},
  {month:'Th.11/2025',region:'Nội địa',orderId:'VN-25100014',productCode:'VAV-AI266-HAA-07',spec:'0505',qty:2676,unit:'thùng',deadline:'3+10+17+24/12/2025',materialReq:121823,note:'100% NVL'},
  {month:'Th.11/2025',region:'Nội địa',orderId:'VN-25100017',productCode:'VAV-AI266-HAA-25',spec:'0505',qty:1000,unit:'thùng',deadline:'16/12/2025',materialReq:24345,note:'60% NVL'},
  {month:'Th.11/2025',region:'Nội địa',orderId:'VN-25110003',productCode:'VAV-AI270-HAA-25',spec:'0808',qty:1330,unit:'thùng',deadline:'26/12/2025',materialReq:32019,note:'30% NVL'},
  {month:'Th.11/2025',region:'Hàn Quốc',orderId:'PPO-25110002',productCode:'VAV-AP020-HAL-25',spec:'—',qty:800,unit:'thùng',deadline:'07/12/2025',materialReq:0,note:'Tính theo NVL nhỏ×4.7%/10'},
]

const avWorkflowSteps = [
  {id:1,code:'NHẬN ĐƠN',label:'Nhận Đơn Hàng',icon:'📥',color:'#0078d4',desc:'Khi có đơn xuống, tập hợp đơn vào bảng tính (Excel). Nhập mã đơn, mã SP, số lượng, deadline, khu vực.', detail:'Tập hợp tất cả đơn hàng vào bảng tính. Phân loại theo tháng, khu vực (Nội địa, Hàn Quốc, Đông Nam Á, TW001). Ghi rõ số lượng, quy cách, deadline.', dept:'BP Kế Hoạch', trigger:'Email/Zalo từ Sales'},
  {id:2,code:'TÍNH KẾ HOẠCH',label:'Tính Kế Hoạch',icon:'🧮',color:'#8b5cf6',desc:'Dựa theo ngày giao hàng, mã SP, hiệu suất để tính kế hoạch tổng tháng → chia số ngày làm việc → tính lượng NVL/ngày.', detail:'1. Tổng NVL = Σ(SL đơn × định mức mỗi SP)\n2. NVL/ngày = Tổng NVL ÷ số ngày làm việc\n3. Kiểm tra quy cách lớn có vượt quá số ngày tháng không\n4. Tiêu chuẩn: 0505→100% hoặc 60%, 0808→30%, 1010→30%', dept:'BP Kế Hoạch', trigger:'Sau khi nhận đơn'},
  {id:3,code:'XÁC NHẬN BAO BÌ',label:'Xác Nhận Bao Bì & Phụ Liệu',icon:'📦',color:'#059669',desc:'Xác nhận bao bì với Kho; xác nhận phụ liệu với BP Kỹ Thuật (phương thức kỹ thuật).', detail:'- Kho: Kiểm tra tồn chai, thùng, pallet, nhãn, nắp\n- Kỹ Thuật: Xác nhận phương thức xử lý đường, công thức sản xuất\n- Nếu thiếu → gửi phiếu xin mua sớm', dept:'BP Kế Hoạch + Kho + KT', trigger:'Sau tính kế hoạch'},
  {id:4,code:'THÔNG BÁO NVL',label:'Thông Báo Nguyên Liệu',icon:'📢',color:'#d97706',desc:'Thông báo lượng NVL cần sử dụng mỗi ngày cho BP Nguyên Liệu (thông báo Zalo).', detail:'Gửi Zalo cho BP Nguyên Liệu:\n- NVL sử dụng ngày mai: X tấn\n- Quy cách: 0505/0808/1010\n- Sản phẩm đặc biệt: VAV-AP020 (thu nước nhớt), VAV-BP046 (thu rổ)', dept:'BP Kế Hoạch → BP Nguyên Liệu', trigger:'Hàng ngày, trước 17:00'},
  {id:5,code:'SẮP KẾ HOẠCH',label:'Sắp Lên Bảng Kế Hoạch',icon:'📋',color:'#0891b2',desc:'Đưa chi tiết từng SP cần SX trong tháng vào bảng kế hoạch theo quy cách tương ứng cho BP Sản Xuất.', detail:'Phân bổ đơn theo line:\n- Quy cách lớn ưu tiên\n- Chia đều NVL theo ngày làm việc\n- Ghi rõ: ngày SX, quy cách, mã SP, số lượng dự kiến', dept:'BP Kế Hoạch', trigger:'Đầu tháng hoặc khi có đơn mới'},
  {id:6,code:'SX CHI TIẾT',label:'BP Sản Xuất Sắp Kế Hoạch Chi Tiết',icon:'🏭',color:'#dc2626',desc:'BP Sản Xuất dựa vào ngày giao hàng, ngày chỉ định hoàn thành, NVL/ngày, hiệu suất, quy cách để tính kế hoạch chi tiết từng ngày.', detail:'Tiêu chuẩn chia NVL:\n• VAV-AI266-HAA-25 (0505): lấy 60% NVL\n• VAV-AI266-HAA-07 (0505): lấy 100% NVL\n• VAV-AI270-HAA-25/36 (0808): lấy 30% NVL\n• VAV-AI004-HAA-29 (1010): lấy 30% NVL\n\nSP đặc biệt:\n• VAV-AP020-HAL-25: NVL nhỏ × 4.7% ÷ 10 = số bao thu (max 80 bao=17t)\n• VAV-BP046-FAL: NVL nhỏ × 2.3% ÷ 20 = số rổ thu', dept:'BP Sản Xuất AV', trigger:'Sau khi nhận bảng KH từ Kế Hoạch'},
  {id:7,code:'GỬI PHIẾU MUA',label:'Gửi Phiếu Xin Mua NVL',icon:'📝',color:'#7c3aed',desc:'Mỗi cuối tuần gửi phiếu xin mua nguyên liệu cho BP Nguyên Liệu để đảm bảo NVL tuần sau.', detail:'Tần suất: Mỗi thứ Sáu (cuối tuần)\nNội dung phiếu:\n- Tuần SX: từ ngày → ngày\n- Từng ngày: ngày cần + lượng cần\n- Người ký: BP Kế Hoạch + Phó Tổng Điều Hành', dept:'BP Kế Hoạch → BP Nguyên Liệu', trigger:'Hàng tuần (Thứ Sáu)'},
]

const avProductSpecs = [
  {code:'VAV-AI266-HAA-07',spec:'0505',nvlPct:100,color:'#0078d4',note:'Quy cách lớn – 100% NVL'},
  {code:'VAV-AI266-HAA-25',spec:'0505',nvlPct:60,color:'#059669',note:'Quy cách lớn – 60% NVL'},
  {code:'VAV-AI270-HAA-25/36',spec:'0808',nvlPct:30,color:'#d97706',note:'Quy cách lớn – 30% NVL'},
  {code:'VAV-AI004-HAA-29',spec:'1010',nvlPct:30,color:'#8b5cf6',note:'Quy cách lớn – 30% NVL'},
  {code:'VAV-AP020-HAL-25',spec:'Đặc biệt',nvlPct:'×4.7%÷10',color:'#dc2626',note:'Thu nước nhớt – max 80 bao = 17 tấn'},
  {code:'VAV-BP046-FAL',spec:'Đặc biệt',nvlPct:'×2.3%÷20',color:'#be185d',note:'Thu rổ theo đơn trái cây'},
]

// GV Line – từ PHIẾU NHU CẦU NGUYÊN LIỆU & TIẾN ĐỘ CHAI
const gvMaterialRequests = [
  {date:'03/03/2026',material:'WM01',qty:'20 MTS',status:'done',dept:'BP Kế Hoạch → BP NVL'},
  {date:'04/03/2026',material:'WM01',qty:'39 MTS',status:'done',dept:'BP Kế Hoạch → BP NVL'},
  {date:'05/03/2026',material:'WM01',qty:'57 MTS',status:'done',dept:'BP Kế Hoạch → BP NVL'},
]
const gvPackaging = [
  {stt:1,item:'Chai nhựa 355ml đã dán decal',maCode:'HP010',order:'VN-26020018',product:'VMX-AP244-RAL-T1 CLASSY',tonKho:376,orderQty:322572,unit:'chai',target:'13/3: 4 cont = 162,000 chai\n23/3: 4 cont = 161,736 chai',status:'in_progress',leadtime:'17-26 ngày làm việc',dailyRate:'17,000–24,000 chai/ngày'},
  {stt:2,item:'Nhãn/Decal',maCode:'FD004',order:'VN-26020018',product:'VMX-AP244-RAL-T1 CLASSY',tonKho:3900,orderQty:322572,unit:'bộ',target:'9-11/3: 164,000 bộ\n18/3: 166,000 bộ còn lại',status:'in_progress',leadtime:'12-21 ngày làm việc',dailyRate:'20,000–24,000 bộ/ngày'},
  {stt:3,item:'Nắp chai nhựa trắng 355ml',maCode:'NA078',order:'VN-26020018',product:'VMX-AP244-RAL-T1 CLASSY',tonKho:3560,orderQty:322572,unit:'cái',target:'09/03/2026',status:'pending',leadtime:'36-38 ngày',dailyRate:'Nhập cùng container'},
  {stt:4,item:'Thùng giấy chống thấm',maCode:'BF985',order:'VN-26020018',product:'VMX-AP244-RAL-T1 CLASSY',tonKho:5,orderQty:53762,unit:'cái',target:'10-23/3: 10,000 cái/ngày',status:'in_progress',leadtime:'10-14 ngày',dailyRate:'10,000 cái/ngày'},
  {stt:5,item:'CHEP Pallet gỗ',maCode:'GB023',order:'VN-26020018',product:'VMX-AP244-RAL-T1 CLASSY',tonKho:0,orderQty:160,unit:'cái',target:'16/3: 90 cái, 25/3: 80 cái',status:'pending',leadtime:'15 ngày (300 cái)',dailyRate:'—'},
  {stt:6,item:'Thanh nẹp chống thấm',maCode:'GE003',order:'VN-26020018',product:'VMX-AP244-RAL-T1 CLASSY',tonKho:445,orderQty:800,unit:'cái',target:'10/03/2026',status:'done',leadtime:'7-10 ngày',dailyRate:'—'},
]
const gvWorkflowSteps = [
  {id:1,label:'Nhận Đơn GV',icon:'📥',color:'#0078d4',desc:'Nhận thông tin đơn hàng từ Sales. Kiểm tra mã SP, quy cách chai, nhãn hiệu.'},
  {id:2,label:'Xin Mua Bao Bì Chai',icon:'🍶',color:'#059669',desc:'Kho lập phiếu xin mua chai (TIẾN ĐỘ XIN MUA CHAI). Theo dõi tiến độ giao từng ngày của nhà cung cấp.'},
  {id:3,label:'Phiếu NVL (WM01)',icon:'📋',color:'#d97706',desc:'BP Kế Hoạch lập PHIẾU NHU CẦU NGUYÊN LIỆU (WM01). Ký xác nhận Phó Tổng + BP NVL.'},
  {id:4,label:'KT Cung Cấp Xử Lý Đường',icon:'🍬',color:'#8b5cf6',desc:'Kỹ Thuật cung cấp thông tin xử lý/pha đường cho ca sản xuất. (文件: 技術提供融糖)'},
  {id:5,label:'Kiểm Tra Đụng Máy',icon:'⚙️',color:'#dc2626',desc:'Kiểm tra lịch xung đột máy (Bảng Đụng Máy). Điều chỉnh lịch nếu có xung đột thiết bị.'},
  {id:6,label:'Sản Xuất GV',icon:'🏭',color:'#0891b2',desc:'Tiến hành sản xuất theo kế hoạch. Điền chai, dán nhãn, đóng thùng.'},
  {id:7,label:'Gửi Mail Lượng Đường',icon:'📧',color:'#7c3aed',desc:'Gửi email báo lượng đường sử dụng cho các bộ phận liên quan. (文件: 郵件提供糖量)'},
]

// ND Line – từ Kế hoạch CẤY-THU HOẠCH-CẮT & Kế hoạch cắt Nata
const ndWeeklyPlan = [
  {week:'15/11 – 21/11',sx2Plan:49,sx2Actual:50,sx2Diff:-1,sx1Need:0,sx1Actual:30,sx1Diff:-30,note:'Cắt, Nấu đạt HS / Chuẩn bị trước'},
  {week:'22/11 – 28/11',sx2Plan:24,sx2Actual:null,sx2Diff:24,sx1Need:16,sx1Actual:0,sx1Diff:16,note:''},
  {week:'29/11 – 05/12',sx2Plan:33,sx2Actual:null,sx2Diff:33,sx1Need:33,sx1Actual:null,sx1Diff:33,note:''},
  {week:'06/12 – 12/12',sx2Plan:24,sx2Actual:null,sx2Diff:24,sx1Need:24,sx1Actual:null,sx1Diff:24,note:''},
  {week:'13/12 – 19/12',sx2Plan:32,sx2Actual:null,sx2Diff:32,sx1Need:32,sx1Actual:null,sx1Diff:32,note:''},
]
const ndWorkflowSteps = [
  {id:1,dept:'SX1',label:'Cấy Giống (培養)',icon:'🌱',color:'#059669',desc:'SX1 cấy nata de coco vào bồn ủ. Kiểm soát nhiệt độ, nồng độ, thời gian ủ.'},
  {id:2,dept:'SX1',label:'Thu Hoạch (收成)',icon:'🫙',color:'#0891b2',desc:'Thu hoạch nata sau 10-14 ngày ủ. Kiểm tra độ dày, chất lượng. Phân loại.'},
  {id:3,dept:'SX1',label:'Cắt Miếng (切割)',icon:'🔪',color:'#d97706',desc:'Cắt nata thành miếng theo yêu cầu. Ghi nhận sản lượng cắt thực tế so kế hoạch.'},
  {id:4,dept:'SX1→SX2',label:'Chuyển NVL miếng',icon:'🚚',color:'#8b5cf6',desc:'SX1 chuyển nguyên liệu miếng cho SX2. Chốt số lượng tuần theo bảng nguyên liệu miếng hàng tuần.'},
  {id:5,dept:'SX2',label:'Cắt Hạt/Cắt Dạng',icon:'⚡',color:'#dc2626',desc:'SX2 cắt nguyên liệu miếng thành hạt/dạng theo đơn hàng (cắt hạt xuất khẩu hoặc dạng nội địa).'},
  {id:6,dept:'SX2',label:'Nấu & Đóng Gói',icon:'🍲',color:'#0078d4',desc:'SX2 nấu nata, phối trộn, đóng gói. Theo dõi hiệu suất nấu (HS) so kế hoạch.'},
  {id:7,dept:'Kho',label:'Nhập Kho ND',icon:'📦',color:'#7c3aed',desc:'Thành phẩm ND nhập kho. Kiểm tra chất lượng, date SX, hạn sử dụng.'},
]

// Customer Flow Prototype – full end-to-end
const customerFlowSteps = [
  {id:1,actor:'Khách hàng',label:'Gửi Yêu Cầu Đặt Hàng',icon:'👤',color:'#be185d',
   detail:'Khách hàng gửi Purchase Order (PO) qua Email hoặc hệ thống ERP. Thông tin: mã SP, SL, ngày giao, cảng xuất.',
   inputs:['PO / Email đơn hàng','Mã sản phẩm (VD: VAV-AI266-HAA-07)','Số lượng & Đơn vị','Ngày giao hàng','Cảng xuất / Incoterms'],
   outputs:['Email xác nhận nhận đơn'], aiSupport:false},
  {id:2,actor:'Sales',label:'Xác Nhận & Nhập Đơn',icon:'💼',color:'#0891b2',
   detail:'Sales xác nhận khả năng giao hàng, nhập đơn vào hệ thống. Tạo Order ID (VD: VN-26020018) và chuyển cho BP Kế Hoạch.',
   inputs:['PO từ KH','Kiểm tra tồn kho thành phẩm'],
   outputs:['Order ID','Confirm PI gửi KH','Thông báo nội bộ cho KH, Kế Hoạch'], aiSupport:true,
   aiNote:'AI đề xuất ngày giao dự kiến dựa trên tồn kho + lead time SX hiện tại'},
  {id:3,actor:'Kế Hoạch',label:'Tính Kế Hoạch Sản Xuất',icon:'🧮',color:'#8b5cf6',
   detail:'BP Kế Hoạch tính tổng NVL, chia ngày, lập bảng kế hoạch tháng. Xác nhận bao bì với Kho, phụ liệu với Kỹ Thuật.',
   inputs:['Đơn hàng đã xác nhận','Định mức NVL từng SP','Tồn bao bì từ Kho'],
   outputs:['Bảng kế hoạch tháng','Phiếu NVL hàng ngày','Yêu cầu xin mua bao bì'], aiSupport:true,
   aiNote:'AI tự động tính NVL/ngày, phát cảnh báo khi quy cách lớn vượt số ngày tháng'},
  {id:4,actor:'Kho',label:'Chuẩn Bị Bao Bì & Vật Tư',icon:'📦',color:'#059669',
   detail:'Kho kiểm tra và nhập bao bì theo tiến độ (chai, nhãn, thùng, pallet). Theo dõi từng lô hàng của NCC đến hàng ngày.',
   inputs:['Kế hoạch SX từ Kế Hoạch','Phiếu xin mua từ Kho','Lịch giao hàng NCC'],
   outputs:['Bao bì sẵn sàng cho SX','Báo cáo tồn bao bì hàng ngày'], aiSupport:true,
   aiNote:'AI theo dõi tiến độ bao bì NCC, cảnh báo nguy cơ thiếu hàng trước 3-5 ngày'},
  {id:5,actor:'Nguyên Liệu',label:'Cấp Nguyên Liệu Hàng Ngày',icon:'🏪',color:'#d97706',
   detail:'BP Nguyên Liệu nhận thông báo Zalo từ Kế Hoạch, chuẩn bị và cấp NVL cho dây chuyền SX theo lượng yêu cầu mỗi ngày.',
   inputs:['Phiếu NVL hàng ngày (Zalo)','Phiếu xin mua cuối tuần','Kế hoạch NVL nhập xưởng'],
   outputs:['NVL sẵn sàng tại dây chuyền','Biên bản giao nhận NVL'], aiSupport:false},
  {id:6,actor:'Sản Xuất',label:'Tiến Hành Sản Xuất',icon:'🏭',color:'#dc2626',
   detail:'BP Sản Xuất thực hiện theo kế hoạch chi tiết từng ngày. Line AV: Pha chế → Chiết rót → Dán nhãn → Đóng thùng. Line GV: Điền chai → Dán → Đóng. Line ND: Cấy → Thu hoạch → Cắt → Nấu.',
   inputs:['Kế hoạch chi tiết ngày','NVL từ BP NVL','Bao bì từ Kho'],
   outputs:['BTP hoàn thành từng công đoạn','Báo cáo OEE ca sản xuất'], aiSupport:true,
   aiNote:'AI monitor OEE real-time, phát cảnh báo khi OEE xuống dưới 85%'},
  {id:7,actor:'QC',label:'Kiểm Tra Chất Lượng',icon:'🔬',color:'#7c3aed',
   detail:'QC lấy mẫu kiểm tra theo tiêu chuẩn (vi sinh, hóa lý, cảm quan). Cấp phát phiếu pass/fail. Sản phẩm fail → SX điều chỉnh.',
   inputs:['Mẫu từ dây chuyền','Tiêu chuẩn chất lượng SP','Phiếu KCS nghiệm thu bao bì'],
   outputs:['Phiếu QC PASS/FAIL','Báo cáo kiểm tra mẫu','Giấy chứng nhận CoA'], aiSupport:true,
   aiNote:'AI phát hiện bất thường trong dữ liệu QC theo lịch sử để cảnh báo sớm'},
  {id:8,actor:'Kho TP',label:'Nhập Kho Thành Phẩm',icon:'🏬',color:'#0078d4',
   detail:'Thành phẩm được đóng gói, dán nhãn, nhập kho. Ghi nhận lot number, date SX, số lượng thực tế. Sắp xếp theo FEFO.',
   inputs:['Thành phẩm đã QC PASS','Phiếu nhập kho','Kế hoạch đóng container'],
   outputs:['Phiếu nhập kho TP','Cập nhật tồn kho hệ thống'], aiSupport:false},
  {id:9,actor:'Logistics',label:'Đóng Container & Xuất Kho',icon:'🚢',color:'#475569',
   detail:'Logistics lên kế hoạch booking tàu, đóng container theo ngày. Phối hợp với Kho sắp hàng lên container (SL thùng/pallet đúng per PO).',
   inputs:['Kế hoạch đóng cont','Danh sách hàng xuất','Booking tàu'],
   outputs:['Packing List','Container Stuffing Report','B/L Draft'], aiSupport:true,
   aiNote:'AI tự động tạo Packing List từ dữ liệu đơn hàng + thực tế đóng container'},
  {id:10,actor:'Khách hàng',label:'Nhận Hàng & Thanh Toán',icon:'✅',color:'#059669',
   detail:'Khách hàng nhận B/L, kiểm tra chứng từ, làm thủ tục nhập khẩu. Xác nhận nhận hàng, thanh toán theo điều khoản PO.',
   inputs:['B/L, Invoice, Packing List','C/O, CoA, Phytosanitary','Ảnh container lúc đóng'],
   outputs:['Xác nhận nhận hàng','Thanh toán','Feedback chất lượng'], aiSupport:false},
]

/* ─────────────────── AI SYSTEM ANALYSIS DATA (từ AI軟體系統--生管部 BẢNG TỔNG HỢP.xlsx) ─────────────────── */
const aiPainPoints = [
  {
    id:1, code:'ĐH-01', line:'PT/GV/ND/AV', priority:'Cao',
    process:'Quản Lý Đơn Hàng Năm / 2026年訂單管制',
    current:'Nhập tay đơn hàng vào Bảng Quản Chế 2026. Theo dõi thủ công SL đã đặt/đã SX/chưa SX/xuất dư cho TW001, TW002, Nội địa, ĐNA.',
    problems:['Nhập dữ liệu trùng lặp','Tính kịp thời kém','Dễ bị sót, sai','Dữ liệu không đồng nhất giữa các bảng'],
    aiSolution:'Hệ thống tự động tích hợp đơn hàng từ tất cả khu vực (TW001/TW002/Nội địa/ĐNA/EU/Hàn/Nhật). Real-time tracking: đã đặt → đã SX → chưa SX → xuất dư → tiến độ xuất hàng.',
    tables:['2026 年訂單管制表','越南內銷訂單','台灣區訂單','其他區域訂單','年產季已確認合約量-ĐNA'],
    depts:['業務部 (Nghiệp vụ)','生管部 (Kế Hoạch)'],
    color:'#0078d4'
  },
  {
    id:2, code:'ĐH-02', line:'Tất cả', priority:'Cao',
    process:'Tính Toán Ngày Giao Hàng / 交期計算',
    current:'Khi có đơn mới, Sales phải xác nhận thủ công với: Kỹ Thuật (công thức, điều kiện SX), SX (năng lực, nhân lực, máy), NVL/Thu Mua (tồn kho, lead time), QA (thời gian quan sát), Kho (thời gian đóng container). Mất nhiều thời gian, không thể trả lời KH ngay.',
    problems:['Thông tin SP bị phân tán','Quy trình tốn thời gian','Phải xác nhận thủ công nhiều bước','Thời gian phản hồi không xác định trước','Sales không thể trả lời KH ngay lập tức'],
    aiSolution:'AI tự động tích hợp: công thức KT + năng lực SX + tồn NVL/bao bì + lead time mua + thời gian QA + thời gian đóng cont → Tự động tính ngày giao dự kiến. Mô phỏng nhiều kịch bản (tăng ca, ưu tiên, tách lô). Sales phê duyệt và trả lời KH ngay.',
    tables:['2026 年訂單管制表','半成品配方查詢表','半成品輔料採購前置期','原料庫存表'],
    depts:['業務部','生管部','生產1部','生產2部','技術部','原料部','品保部','儲運部'],
    color:'#8b5cf6'
  },
  {
    id:3, code:'SX-01', line:'Tất cả', priority:'Cao',
    process:'Lập Kế Hoạch Sản Xuất AI / AI生產排程',
    current:'Hiện tại lập KH SX thủ công (ngày/tuần/tháng/quý): điều chỉnh khi có chỉ thị, xử lý đơn chen, điều chỉnh theo deadline thay đổi, theo SL đơn biến động, xem xét máy/bảo trì, xem NVL, sắp xếp pha đường.',
    problems:['Dựa vào kinh nghiệm cá nhân','Phải tính lại nhiều lần thủ công','Khó đánh giá ngay tác động khi chen đơn','Rủi ro trễ deadline cao'],
    aiSolution:'AI tự động: tích hợp data KT + SX + NVL + KCS. Tự ra lịch SX sơ bộ, xem xét ưu tiên đơn/deadline/năng lực. Tự sắp lịch đóng gói, bóc vỏ, xử lý BTP. Khi có thay đổi → tự tính lại ngay, đề xuất phương án điều chỉnh. Cảnh báo quá tải/thiếu NVL/xung đột deadline.',
    tables:['AV排程 KẾ HOẠCH AV','ND排程 KẾ HOẠCH ND','GV排程 KẾ HOẠCH GV','AV生產日報表','ND庫存日報表','GV生產日報表'],
    depts:['生管部','生產1部','生產2部','技術部','品保部','儲運部'],
    color:'#dc2626'
  },
  {
    id:4, code:'ND-01', line:'ND', priority:'Cao',
    process:'Tính Ngược Thời Gian Chuẩn Bị NVL ND / 椰果原料備齊回推',
    current:'Dựa trên KH nấu thạch dừa + thời gian cắt nhỏ + thời gian ủ → thủ công tính ngược thời gian cần chuẩn bị NVL. Chậm, dễ sai.',
    problems:['Phải thu thập và tính toán thủ công','Tính toán chậm và dễ xảy ra lỗi'],
    aiSolution:'1. Hệ thống lưu sẵn thời gian chuẩn SX từng công đoạn ND (nấu, cắt hạt, ủ). 2. Tự động nhận diện quy trình + thời điểm chốt. 3. Tự tính ngược: thời gian muộn nhất cần có NVL. 4. So sánh real-time với tồn kho + lead time mua. 5. Cảnh báo khi NVL không kịp.',
    tables:['培養/收成報告 BÁO CÁO CẤY','椰果切丁計劃 Kế hoạch cắt Nata','ND庫存原料報表'],
    depts:['生管部','生產1部 (SX1)','生產2部 (SX2)','原料部'],
    color:'#d97706'
  },
  {
    id:5, code:'NVL-01', line:'AV/GV/ND/BM', priority:'Cao',
    process:'Tính BOM Nguyên Liệu / 原物料需求計算',
    current:'Dữ liệu KH đơn/bán hàng cho AV, GV, ND, mặt nạ cần nhập tay → người nhập tay tính nhu cầu NVL theo từng đơn theo công thức BOM.',
    problems:['Tính toán BOM thủ công','Nhiều đơn phải tính lại nhiều lần','Khi chen/thay đổi SL phải tính lại','Dễ bỏ sót, sai số','Đánh giá deadline không chính xác'],
    aiSolution:'1. Tự động nhận đơn hàng AV/GV/ND/BM. 2. Khi SL thay đổi/chen đơn/hủy → tự tính lại NVL ngay. 3. Tự áp dụng công thức tương ứng (Công thức 1, 2, 3…) + tỷ lệ hao hụt. 4. Tự tính tổng NVL mỗi loại, gộp nhu cầu từ nhiều SP. 5. So sánh real-time với tồn kho + đơn mua đang chờ.',
    tables:['AV計算原料 BẢNG TÍNH NGUYÊN LIỆU','PHIẾU NHU CẦU NGUYÊN LIỆU AV','PHIẾU NHU CẦU NGUYÊN LIỆU GV','半成品配方查詢表'],
    depts:['生管部','原料部','採購部'],
    color:'#059669'
  },
  {
    id:6, code:'GV-01', line:'GV', priority:'TB',
    process:'Tính Lượng Đường Sử Dụng / 糖用量計算',
    current:'Dựa trên lịch SX → thủ công tính lượng đường hàng tuần/tháng → gửi mail cho các bộ phận liên quan (技術/SX4).',
    problems:['Khi thay đổi lịch SX phải kiểm tra, tính và điều chỉnh nhiều lần','Tốn thời gian','Dễ sai số'],
    aiSolution:'1. Tự động nhập lịch SX từng SP. 2. Tự áp dụng công thức + lượng đường/đơn vị SP. 3. Tự tính tổng đường mỗi kỳ (tuần/tháng). 4. So tồn kho + đơn mua chưa về. 5. Cảnh báo thiếu, đề xuất SL mua + ngày cần về. 6. Sau phê duyệt, tự lưu và gửi thông báo.',
    tables:['郵件提供糖量 GỬI MAIL CUNG CẤP LƯỢNG SỬ DỤNG ĐƯỜNG','技術提供融糖 KỸ THUẬT CUNG CẤP XỬ LÝ ĐƯỜNG','GV生產日報表'],
    depts:['生管部','技術部','生產4部 (SX4)'],
    color:'#0891b2'
  },
  {
    id:7, code:'KT-01', line:'Tất cả', priority:'TB',
    process:'Quản Lý Cập Nhật Công Thức / 配方管理',
    current:'Mỗi khi KT cập nhật công thức SP, phải thủ công cập nhật lại bảng công thức để đảm bảo SX và tính NVL đúng.',
    problems:['Phải chỉnh sửa thủ công từng bước','Công thức cũ/mới dễ gây nhầm','Ảnh hưởng độ chính xác tính NVL và lịch SX'],
    aiSolution:'1. Xây dựng database công thức tập trung (CSDL duy nhất). 2. KT tạo yêu cầu thay đổi online + ngày hiệu lực + phê duyệt trực tuyến. 3. Tự kiểm soát version, lưu lịch sử thay đổi. 4. Sau phê duyệt, tự đồng bộ sang lịch SX, tính NVL, mua hàng. 5. Phân tích tác động thay đổi công thức lên NVL/tồn kho.',
    tables:['架构配方表 BẢNG CẬP NHẬT PHƯƠNG THỨC MỚI','半成品配方查詢表 BẢNG PHƯƠNG THỨC','計算原料 BẢNG TÍNH NGUYÊN LIỆU'],
    depts:['技術部','生管部'],
    color:'#7c3aed'
  },
  {
    id:8, code:'KHO-01', line:'Tất cả', priority:'Cao',
    process:'Tích Hợp Tồn Kho Đa Bộ Phận / 庫存整合',
    current:'Hàng ngày phải thủ công thu thập dữ liệu tồn kho BTP/phụ liệu/NVL từ Kho, SX1, SX2, SX4 → tổng hợp làm cơ sở lập lịch SX.',
    problems:['Format dữ liệu không nhất quán giữa BP','Phải tổng hợp thủ công','Thời gian thu thập không đồng bộ','Dễ bỏ sót, báo sai','Thiếu real-time','Đánh giá NVL khả dụng không chính xác'],
    aiSolution:'1. Tự động kết nối data tồn kho từ Kho, SX1, SX2, SX4. 2. Kiểm tra bất thường tự động (SL tăng/giảm đột biến). 3. Dữ liệu tổng hợp lưu tự động kèm lịch sử để theo dõi/kiểm toán.',
    tables:['原料庫存表 生產一部','ND庫存原料報表生產二部','倉庫庫存管理系統','BM,EM 生產日報表'],
    depts:['生管部','生產1部','生產2部','儲運部','生產4部'],
    color:'#be185d'
  },
  {
    id:9, code:'KHO-02', line:'Tất cả', priority:'TB',
    process:'Tính Thời Hạn Sử Dụng NVL / 可使用期間計算',
    current:'Thủ công dựa trên tồn kho → đánh giá ngày giao + tình trạng đơn hiện tại → tính số ngày có thể sử dụng NVL/BTP/phụ liệu.',
    problems:['Tốn thời gian','Kém hiệu quả','Thiếu tính tức thời','Dễ xảy ra lỗi do người'],
    aiSolution:'1. Real-time tích hợp tồn NVL/BTP/phụ liệu + đơn hiện tại + thời gian giao hàng + lịch SX. 2. Tự tính số ngày khả dụng + ngày hết hạn sử dụng, so với hạn sử dụng thực. 3. So sánh tồn khả dụng vs nhu cầu đơn. 4. Cảnh báo khi thiếu, hết hạn, xung đột deadline.',
    tables:['原料庫存表','ND庫存原料報表','AV計算原料'],
    depts:['生管部','原料部','採購部'],
    color:'#475569'
  },
  {
    id:10, code:'SX-02', line:'Tất cả', priority:'TB',
    process:'Theo Dõi Tiến Độ Sản Xuất Hàng Ngày / 生產進度追蹤',
    current:'Theo dõi tiến độ SX hàng ngày bằng nhập liệu thủ công bởi nhân viên liên quan.',
    problems:['Tốn thời gian','Dễ xảy ra lỗi','Thiếu tính tức thời'],
    aiSolution:'1. Tự động thu thập và cập nhật tiến độ SX, giảm nhập tay. 2. Real-time cập nhật → quản lý nắm ngay tình trạng. 3. Tự ghi chép + hỗ trợ kiểm tra thay nhập tay. 4. Khi tiến độ chậm/bất thường → tự cảnh báo, phân tích nguyên nhân. 5. Tự lưu dữ liệu tiến độ + lịch sử thay đổi.',
    tables:['AV生產日報表','ND庫存日報表','GV生產日報表','BM,EM 生產日報表'],
    depts:['生管部','生產1部','生產2部','生產4部'],
    color:'#0078d4'
  },
  {
    id:11, code:'KHO-03', line:'Tất cả', priority:'Thấp',
    process:'Theo Dõi Hàng Tồn Lâu / 庫存老化追蹤',
    current:'Sản phẩm tồn kho có ngày SX quá 2 tháng → phải thủ công kiểm tra và nhập liệu → theo dõi xuất hàng.',
    problems:['Kiểm kê thủ công (tốn thời gian, dễ bỏ sót)','Nhập liệu thủ công (phải làm lại, dễ xảy ra lỗi)'],
    aiSolution:'1. Hàng ngày tự quét ngày SX sản phẩm tồn kho, tự xác định hàng quá 2 tháng. 2. Tự đưa vào danh sách chờ xử lý, không cần lọc thủ công. 3. Tự tổng hợp: mã SP, số lô, SL, ngày SX, hạn còn lại, thông tin đơn liên quan. 4. Tự đề xuất ưu tiên xuất hàng theo tuổi kho + hạn + nhu cầu đơn.',
    tables:['2026 年訂單管制表','出貨表 BÁO BIỂU XUẤT CONT','出貨票 PHIẾU XUẤT CONT'],
    depts:['儲運部','生管部'],
    color:'#92400e'
  },
  {
    id:12, code:'SYS-01', line:'Tất cả', priority:'TB',
    process:'Theo Dõi Cập Nhật Dữ Liệu / 資料更新跟催',
    current:'Khi dữ liệu không được cập nhật kịp thời, phải chủ động liên hệ từng bộ phận để yêu cầu cập nhật.',
    problems:['Tốn nhân lực và thời gian','Dễ bỏ sót hoặc phát hiện muộn','Ảnh hưởng hiệu quả tổng thể (ví dụ: chậm trễ trả lời deadline)'],
    aiSolution:'1. Hệ thống tự động nhắc nhở và theo dõi trạng thái cập nhật dữ liệu. 2. Cơ chế nhắc nhở tự động thay nhắc nhở thủ công. 3. Real-time cập nhật + hiển thị trạng thái, đảm bảo dữ liệu hoàn tất đúng thời hạn. 4. Tự lưu lịch sử cập nhật để kiểm toán và cải tiến quy trình.',
    tables:['Tất cả bảng có liên quan'],
    depts:['生管部','tất cả bộ phận'],
    color:'#64748b'
  },
]

/* ─────────────────── HELPERS ─────────────────── */
const statusColor = s=>({'Hoan thanh':'badge-green','Dang SX':'badge-blue','Cho NVL':'badge-red','Ke hoach':'badge-gray','Cho':'badge-gray'}[s]||'badge-gray')
const rcColor = v=>v>=90?'#107c10':v>=75?'#d97706':'#d13438'

const DIFF_NOTES = [
  {icon:'✦',cat:'Mới hoàn toàn',items:['Tab AV Line: 7 bước quy trình thực tế từ file QUY TRÌNH SẮP KẾ HOẠCH AV','Tab GV Line: Theo dõi tiến độ bao bì chai 322,572 chai, Phiếu NVL WM01 thực tế','Tab ND Line: Điều phối SX1↔SX2, chốt NVL miếng hàng tuần','Tab Quy Trình KH: Prototype 10 bước end-to-end có tích hợp AI','Tab Phân Tích AI: 12 pain points từ AI軟體系統 BẢNG TỔNG HỢP, hiện trạng→vấn đề→AI']},
  {icon:'◆',cat:'Nâng cấp từ v1.0',items:['Đơn hàng thực tế: VN-25090012, PPO-24120004, VN-26020018… thay vì ORD-2608 generic','Mã sản phẩm thực: VAV-AI266-HAA-07, VAV-AE084-BAA-52… với spec đầy đủ','Công thức phân bổ NVL theo quy cách (0505/0808/1010)','KPI cảnh báo có dữ liệu thực từ bảng tính']},
  {icon:'○',cat:'Giữ nguyên từ v1.0',items:['Gantt chart tổng quan tuần 24','Danh sách đơn hàng trực quan','OEE theo ca & biểu đồ','AI kịch bản mô phỏng']},
]

/* ─────────────────── COMPONENT ─────────────────── */
export default function ProductionSchedule() {
  const { lang } = useLang()
  const [version, setVersion] = useState('v1.0')
  const [showDiff, setShowDiff] = useState(false)

  // v1.0 state
  const [tabV1, setTabV1] = useState(0)
  const [selected, setSelected] = useState(null)
  const orderV1 = ordersV1.find(o=>o.id===selected)

  // v1.1 state
  const [lineTab, setLineTab] = useState(0)       // 0=AV, 1=GV, 2=ND, 3=CustomerFlow
  const [avStep, setAvStep] = useState(null)
  const [gvStep, setGvStep] = useState(null)
  const [ndStep, setNdStep] = useState(null)
  const [cfStep, setCfStep] = useState(null)
  const [activePP, setActivePP] = useState(null)

  // Editable form rows (copies of static data for inline editing)
  const [avRows, setAvRows] = useState(() => avOrders.map((o,i)=>({...o,_id:i})))
  const [gvRows, setGvRows] = useState(() => gvPackaging.map((p,i)=>({...p,_id:i})))
  const [ndRows, setNdRows] = useState(() => ndWeeklyPlan.map((w,i)=>({...w,_id:i})))
  // Approval chains per form (step index, history)
  const [avApproval, setAvApproval] = useState({step:0,history:[],comment:''})
  const [gvApproval, setGvApproval] = useState({step:0,history:[],comment:''})
  const [ndApproval, setNdApproval] = useState({step:0,history:[],comment:''})


  /* ────── VERSION SWITCHER BAR ────── */
  const VersionBar = () => (
    <div style={{background:'#1e293b',borderRadius:10,padding:'12px 18px',marginBottom:18,display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
      <span style={{color:'#94a3b8',fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'.05em'}}>PHIÊN BẢN</span>
      {['v1.0','v1.1'].map(v=>(
        <button key={v} onClick={()=>{setVersion(v);setShowDiff(false)}} style={{
          padding:'5px 18px',borderRadius:20,border:'none',cursor:'pointer',fontWeight:700,fontSize:13,
          background:version===v?'#0078d4':'#334155',color:version===v?'#fff':'#94a3b8',
          transition:'all .15s', position:'relative'
        }}>
          {v}
          {v==='v1.1' && <span style={{position:'absolute',top:-6,right:-2,background:'#059669',color:'#fff',fontSize:9,padding:'1px 5px',borderRadius:8,fontWeight:700}}>MỚI</span>}
        </button>
      ))}
      <div style={{marginLeft:'auto',display:'flex',gap:8}}>
        <button onClick={()=>setShowDiff(!showDiff)} style={{padding:'4px 14px',borderRadius:20,border:'1px solid #475569',background:'transparent',color:'#94a3b8',cursor:'pointer',fontSize:12,fontWeight:500}}>
          {showDiff?'Ẩn':'👁 So sánh'} thay đổi
        </button>
      </div>
    </div>
  )

  /* ────── DIFF PANEL ────── */
  const DiffPanel = () => (
    <div style={{background:'#0f172a',borderRadius:10,padding:16,marginBottom:18,border:'1px solid #1e3a5f'}}>
      <div style={{color:'#60a5fa',fontWeight:700,fontSize:13,marginBottom:12}}>📊 So sánh v1.0 → v1.1</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {DIFF_NOTES.map((d,i)=>(
          <div key={i} style={{background:'#1e293b',borderRadius:8,padding:12}}>
            <div style={{color:i===0?'#4ade80':i===1?'#60a5fa':'#94a3b8',fontWeight:600,fontSize:11,marginBottom:8}}>{d.icon} {d.cat}</div>
            {d.items.map((item,j)=>(
              <div key={j} style={{color:'#cbd5e1',fontSize:11,marginBottom:4,paddingLeft:8,borderLeft:`2px solid ${i===0?'#4ade80':i===1?'#3b82f6':'#475569'}`,lineHeight:1.4}}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  /* ════════════════ VERSION 1.0 RENDER ════════════════ */
  const renderV1 = () => {
    const T = {
      vi:{title:'📅 Lịch Sản Xuất AI',subtitle:'Tự động lập lịch · Quản lý nguồn lực · Mô phỏng kịch bản tối ưu',
        kpi:['Đơn hàng tuần 24','Công suất trung bình','Nguy cơ trễ deadline','OEE Line 1 hôm nay'],
        kpiSub:['3 đang sản xuất','Mục tiêu: 90%','ORD-2611, ORD-2613','3% so hôm qua'],
        thOrder:'Mã ĐH',thProduct:'Sản phẩm',thQty:'Số lượng',thProgress:'Tiến độ',thDeadline:'Deadline',thPriority:'Ưu tiên',thStatus:'Trạng thái',thLine:'Line',thOEE:'OEE',
        thScenario:'Kịch bản',thEff:'Hiệu suất',thRisk:'Đơn nguy cơ trễ',thCost:'Chi phí',thRiskLevel:'Rủi ro',thAI:'AI đề xuất',
        lPlan:'Kế hoạch',lDone:'Đã sản xuất',lRemain:'Còn lại',lOEE:'OEE',
        jsTabs:['Lịch Gantt','Danh sách đơn','Nguồn lực & OEE','Mô phỏng kịch bản']},
      zh:{title:'📅 AI生产排程',subtitle:'自动排程 · 资源管理 · 最优情景模拟',
        kpi:['第24周订单','平均产能','截止日期风险','今日产线1 OEE'],
        kpiSub:['3个生产中','目标: 90%','ORD-2611, ORD-2613','较昨日+3%'],
        thOrder:'订单编号',thProduct:'产品',thQty:'数量',thProgress:'进度',thDeadline:'截止日期',thPriority:'优先级',thStatus:'状态',thLine:'产线',thOEE:'OEE',
        thScenario:'情景',thEff:'效率',thRisk:'延误风险订单',thCost:'成本',thRiskLevel:'风险',thAI:'AI建议',
        lPlan:'计划',lDone:'已生产',lRemain:'剩余',lOEE:'OEE',
        jsTabs:['甘特图','订单列表','资源与OEE','情景模拟']},
    }
    const tx = T[lang]||T.vi
    return (
      <div className="sg">
        <div style={{background:'#fef3c7',border:'1px solid #d97706',borderRadius:8,padding:'8px 14px',marginBottom:12,fontSize:12,color:'#92400e',display:'flex',gap:8,alignItems:'center'}}>
          <span>⚠️</span><span><strong>Phiên bản v1.0</strong> – Dữ liệu mẫu, quy trình tổng quát. Xem <strong>v1.1</strong> để có quy trình AV/GV/ND thực tế từ file sản xuất.</span>
        </div>
        <div className="ph">
          <div><h1>{tx.title}</h1><p>{tx.subtitle}</p></div>
          <div className="fl g8">
            <button className="btn btn-primary btn-sm">🤖 Tối ưu lại lịch</button>
            <button className="btn btn-outline btn-sm">📥 Xuất Excel</button>
          </div>
        </div>
        <div className="sg4">
          {[{label:tx.kpi[0],val:'7',sub:tx.kpiSub[0],color:'#0078d4'},{label:tx.kpi[1],val:'87%',sub:tx.kpiSub[1],color:'#d97706'},{label:tx.kpi[2],val:'2',sub:tx.kpiSub[2],color:'#d13438'},{label:tx.kpi[3],val:'88%',sub:tx.kpiSub[3],color:'#107c10'}].map((s,i)=>(
            <div className="sc" key={i}><div className="sc-label">{s.label}</div><div className="sc-value" style={{color:s.color}}>{s.val}</div><div className="sc-sub">{s.sub}</div></div>
          ))}
        </div>
        <div className="card">
          <div className="card-title"><span className="card-title-left">🚨 Cảnh báo sản xuất</span></div>
          <div className="sg" style={{gap:8}}>
            <div className="al al-red">🔴 <span><strong>ORD-2611 (NC Chanh 500ml)</strong> – Bị chặn bởi thiếu NFC 65Brix. Deadline 18/06. Lead time NCC: 14 ngày.</span></div>
            <div className="al al-yellow">⚠️ <span><strong>Line 2</strong> – Bảo trì định kỳ 13/06 xung đột với kế hoạch sản xuất.</span></div>
            <div className="al al-green">✅ <span><strong>ORD-2610 + ORD-2613</strong> – Tiến độ đúng kế hoạch. Dự kiến hoàn thành trước deadline 1 ngày.</span></div>
          </div>
        </div>
        {orderV1 && (
          <div className="card" style={{border:'2px solid #0078d444'}}>
            <div className="card-title" style={{borderBottom:'1px solid var(--border)',paddingBottom:12,marginBottom:12}}>
              <div>
                <div className="fl ic g8"><span className="card-title-left">{orderV1.id} – {orderV1.product}</span><span className={`badge ${statusColor(orderV1.status)}`}>{orderV1.status}</span><span className={`badge ${orderV1.priority==='Cao'?'badge-red':orderV1.priority==='TB'?'badge-yellow':'badge-gray'}`}>Ưu tiên: {orderV1.priority}</span></div>
                <p className="tsm cm mt4">Deadline: {orderV1.deadline} · {orderV1.line}</p>
              </div>
              <button onClick={()=>setSelected(null)} style={{border:'none',background:'#f1f5f9',borderRadius:6,padding:'4px 12px',cursor:'pointer',fontSize:12}}>✕ Đóng</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:12}}>
              {[{label:tx.lPlan,val:`${orderV1.qty.toLocaleString()} chai`,color:'#0078d4'},{label:tx.lDone,val:`${orderV1.done.toLocaleString()} chai`,color:'#107c10'},{label:tx.lRemain,val:`${(orderV1.qty-orderV1.done).toLocaleString()} chai`,color:'#d97706'},{label:tx.lOEE,val:orderV1.oee?`${orderV1.oee}%`:'—',color:orderV1.oee>=90?'#107c10':orderV1.oee>0?'#d97706':'#aaa'}].map((k,i)=>(
                <div key={i} style={{textAlign:'center',background:'var(--bg)',borderRadius:8,padding:'10px 8px',border:'1px solid var(--border)'}}>
                  <div style={{fontSize:11,color:'var(--text2)',marginBottom:4}}>{k.label}</div>
                  <div style={{fontSize:18,fontWeight:700,color:k.color}}>{k.val}</div>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
              {orderV1.steps.map((s,i)=>(
                <div key={i} style={{border:`2px solid ${s.status==='done'?'#107c10':s.status==='active'?'#0078d4':s.status==='blocked'?'#d13438':'var(--border)'}`,borderRadius:8,padding:10,background:s.status==='done'?'#107c1010':s.status==='active'?'#0078d410':s.status==='blocked'?'#d1343810':'transparent'}}>
                  <div className="fl ic jb mb4"><span style={{fontSize:12,fontWeight:600}}>{s.step}</span><span style={{fontSize:16}}>{s.status==='done'?'✅':s.status==='active'?'⚡':s.status==='blocked'?'🔴':'⏳'}</span></div>
                  <div className="tsm cm">{s.worker}</div>
                  {s.start && <div className="tsm mt4" style={{opacity:.7}}>{s.start}{s.end?' → '+s.end:''}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="tabs">
          {tx.jsTabs.map((t,i)=><div key={i} className={`tab ${tabV1===i?'active':''}`} onClick={()=>setTabV1(i)}>{t}</div>)}
        </div>
        {tabV1===0 && (
          <div className="card">
            <div className="card-title"><span className="card-title-left">📊 Gantt – Tuần 24 (9-15/06/2026)</span></div>
            <div style={{display:'grid',gridTemplateColumns:'190px repeat(7,1fr)',gap:0,borderBottom:'1px solid var(--border)',paddingBottom:6,marginBottom:10}}>
              <div className="tsm cm fw6">Dây chuyền</div>
              {daysV1.map((d,i)=><div key={i} className="tsm fw6" style={{textAlign:'center',color:i===1?'#0078d4':'var(--text2)',fontSize:10}}>{d}</div>)}
            </div>
            {ganttBarsV1.map((g,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'190px repeat(7,1fr)',gap:0,marginBottom:8,alignItems:'center'}}>
                <div className="tsm fw5 trunc" style={{paddingRight:8}}>{g.task}</div>
                {[0,1,2,3,4,5,6].map(d=>(
                  <div key={d} style={{padding:'1px 2px'}}>
                    {d>=g.start && d<g.start+g.dur?(
                      <div style={{background:g.color,height:26,borderRadius:d===g.start?'4px 0 0 4px':d===g.start+g.dur-1?'0 4px 4px 0':'0',position:'relative',overflow:'hidden',cursor:'pointer',display:'flex',alignItems:'center',paddingLeft:4}} onClick={()=>setSelected(g.ord===selected?null:g.ord)}>
                        {d===g.start && g.pct>0 && <><div style={{position:'absolute',left:0,top:0,bottom:0,width:`${g.pct}%`,background:'rgba(255,255,255,.25)',borderRadius:'4px 0 0 4px'}}/><span style={{fontSize:9,color:'#fff',fontWeight:700,position:'relative',zIndex:1}}>{g.pct}%</span></>}
                      </div>
                    ):<div style={{height:26,background:'var(--border)',opacity:.15,borderRadius:2}}/>}
                  </div>
                ))}
              </div>
            ))}
            <p className="tsm cm mt8">Click vào thanh để xem chi tiết đơn hàng</p>
          </div>
        )}
        {tabV1===1 && (
          <div className="card">
            <div className="card-title"><span className="card-title-left">📋 Danh sách đơn hàng – Tuần 24</span></div>
            <div className="tw"><table>
              <thead><tr><th>{tx.thOrder}</th><th>{tx.thProduct}</th><th>{tx.thQty}</th><th>{tx.thProgress}</th><th>{tx.thDeadline}</th><th>{tx.thPriority}</th><th>{tx.thStatus}</th><th>{tx.thLine}</th><th>{tx.thOEE}</th></tr></thead>
              <tbody>{ordersV1.map((o,i)=>(
                <tr key={i} onClick={()=>setSelected(o.id===selected?null:o.id)} style={{cursor:'pointer',background:o.id===selected?'#e8f4fd':undefined}}>
                  <td className="tb fw5">{o.id}</td><td className="fw5">{o.product}</td><td>{o.qty.toLocaleString()} chai</td>
                  <td><div className="fl ic g6"><div style={{width:60,height:6,background:'var(--border)',borderRadius:3}}><div style={{width:`${(o.done/o.qty)*100}%`,height:6,borderRadius:3,background:'#0078d4'}}/></div><span className="tsm">{Math.round((o.done/o.qty)*100)}%</span></div></td>
                  <td className="fw5">{o.deadline}</td><td><span className={`badge ${o.priority==='Cao'?'badge-red':o.priority==='TB'?'badge-yellow':'badge-gray'}`}>{o.priority}</span></td>
                  <td><span className={`badge ${statusColor(o.status)}`}>{o.status}</span></td><td>{o.line}</td><td>{o.oee?`${o.oee}%`:'—'}</td>
                </tr>
              ))}</tbody>
            </table></div>
          </div>
        )}
        {tabV1===2 && (
          <div className="sg">
            <div className="card">
              <div className="card-title"><span className="card-title-left">👷 Công suất nguồn lực tuần 24</span></div>
              {resourceDataV1.map((r,i)=>(
                <div className="meter-row" key={i}><div className="meter-label fw5 tsm">{r.r}</div><div className="meter-bar"><div className="meter-fill" style={{width:`${r.actual}%`,background:rcColor(r.actual)}}/></div><div className="meter-val tsm" style={{color:rcColor(r.actual)}}>{r.actual}%</div></div>
              ))}
            </div>
            <div className="card">
              <div className="card-title"><span className="card-title-left">📈 OEE theo ca – Tuần 24</span></div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={oeeDataV1} margin={{left:-20,right:10}}>
                  <XAxis dataKey="ca" tick={{fontSize:10}}/><YAxis domain={[50,100]} tick={{fontSize:11}}/>
                  <Tooltip formatter={v=>v?`${v}%`:'Nghỉ'}/>
                  <ReferenceLine y={85} stroke="#107c10" strokeDasharray="4 3" label={{value:'Mục tiêu 85%',fontSize:10,fill:'#107c10',position:'right'}}/>
                  <Line type="monotone" dataKey="line1" stroke="#0078d4" dot name="Line 1" strokeWidth={2}/>
                  <Line type="monotone" dataKey="line2" stroke="#d97706" dot name="Line 2" strokeWidth={2} strokeDasharray="4 2"/>
                  <Line type="monotone" dataKey="line3" stroke="#107c10" dot name="Line 3" strokeWidth={2}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {tabV1===3 && (
          <div className="card">
            <div className="card-title"><span className="card-title-left">🔮 Mô phỏng kịch bản điều chỉnh</span></div>
            <div className="tw mb12"><table>
              <thead><tr><th>{tx.thScenario}</th><th>{tx.thEff}</th><th>{tx.thRisk}</th><th>{tx.thCost}</th><th>{tx.thRiskLevel}</th><th>{tx.thAI}</th></tr></thead>
              <tbody>{simulateV1.map((s,i)=>(
                <tr key={i} style={{background:i===1?'#107c1008':undefined}}>
                  <td className="fw5">{s.scenario}</td>
                  <td><span style={{color:s.efficiency>=90?'#107c10':'#d97706',fontWeight:600}}>{s.efficiency}%</span></td>
                  <td>{s.delay===0?<span className="badge badge-green">0</span>:<span className="badge badge-yellow">{s.delay}</span>}</td>
                  <td>{s.cost}%</td>
                  <td><span className={`badge ${s.risk==='Thap'?'badge-green':s.risk==='Cao'?'badge-red':'badge-yellow'}`}>{s.risk}</span></td>
                  <td>{i===1?<span className="badge badge-green">Tốt nhất</span>:i===3?<span className="badge badge-blue">Tối ưu nhất</span>:i===2?<span className="badge badge-blue">Khả thi</span>:<span className="badge badge-gray">Cơ sở</span>}</td>
                </tr>
              ))}</tbody>
            </table></div>
            <div className="al al-blue">🤖 <strong>AI khuyến nghị:</strong> Kết hợp Tăng ca T7 Line 1 và đặt khẩn NFC 65Brix để đảm bảo tất cả đơn hàng tuần 24 đúng hạn.</div>
          </div>
        )}
      </div>
    )
  }

  /* ════════════════ VERSION 1.1 RENDER ════════════════ */
  const NewBadge = () => <span style={{background:'#059669',color:'#fff',fontSize:9,padding:'1px 6px',borderRadius:8,fontWeight:700,marginLeft:6,verticalAlign:'middle'}}>✦ MỚI</span>

  const WorkflowDiagram = ({steps, activeStep, setStep, compact=false}) => (
    <div style={{display:'flex',alignItems:'flex-start',gap:0,overflowX:'auto',padding:'4px 0 12px'}}>
      {steps.map((s,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',flexShrink:0}}>
          <div onClick={()=>setStep(activeStep===s.id?null:s.id)} style={{
            cursor:'pointer',textAlign:'center',width:compact?100:120,
            opacity:activeStep&&activeStep!==s.id?.5:1, transition:'all .15s'
          }}>
            <div style={{width:compact?44:52,height:compact?44:52,borderRadius:'50%',background:activeStep===s.id?s.color:'#f1f5f9',border:`3px solid ${s.color}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px',fontSize:compact?18:22,transition:'all .15s',boxShadow:activeStep===s.id?`0 0 0 4px ${s.color}22`:undefined}}>
              {s.icon}
            </div>
            <div style={{fontSize:10,fontWeight:activeStep===s.id?700:500,color:activeStep===s.id?s.color:'var(--text)',lineHeight:1.3}}>{s.label}</div>
            {s.dept && !compact && <div style={{fontSize:9,color:'var(--muted)',marginTop:2}}>{s.dept}</div>}
          </div>
          {i<steps.length-1 && <div style={{width:20,height:2,background:'#e2e8f0',flexShrink:0,marginTop:-18}}><div style={{width:'100%',height:'100%',background:'#94a3b8',opacity:.5}}/></div>}
        </div>
      ))}
    </div>
  )

  const StepDetail = ({step}) => step ? (
    <div style={{background:`${step.color}08`,border:`1.5px solid ${step.color}44`,borderRadius:10,padding:16,marginTop:8}}>
      <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
        <span style={{fontSize:28}}>{step.icon}</span>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,color:step.color,fontSize:14}}>{step.label}</div>
          {step.dept && <div style={{fontSize:11,color:'var(--muted)',marginBottom:6}}>👥 {step.dept} {step.trigger?`· ⏰ ${step.trigger}`:''}</div>}
          <div style={{fontSize:12.5,color:'var(--text)',lineHeight:1.6,marginBottom:8}}>{step.desc}</div>
          {step.detail && (
            <div style={{background:'#fff',borderRadius:8,padding:'8px 12px',border:'1px solid var(--border)',fontSize:11.5,whiteSpace:'pre-line',color:'var(--text)',lineHeight:1.7}}>{step.detail}</div>
          )}
        </div>
      </div>
    </div>
  ) : null

  /* ────── APPROVAL FLOW COMPONENT ────── */
  const approvalStepsAV = [
    {label:'Người Lập',role:'BP Kế Hoạch',icon:'✍️'},
    {label:'Trưởng BP KH',role:'Nguyễn/Trần',icon:'👔'},
    {label:'Trưởng BP NVL',role:'殷賢清',icon:'📦'},
    {label:'Phó Tổng ĐH',role:'李群立',icon:'🏛️'},
    {label:'Ban Giám Đốc',role:'Phê duyệt cuối',icon:'✅'},
  ]
  const approvalStepsGV = [
    {label:'Người Lập',role:'BP Kế Hoạch',icon:'✍️'},
    {label:'BP NVL Xác Nhận',role:'殷賢清',icon:'📦'},
    {label:'Phó Tổng ĐH',role:'李群立',icon:'🏛️'},
  ]
  const approvalStepsND = [
    {label:'SX1 Lập Kế Hoạch',role:'BP Sản Xuất 1',icon:'🌱'},
    {label:'SX2 Xác Nhận',role:'BP Sản Xuất 2',icon:'⚡'},
    {label:'BP Kế Hoạch',role:'Duyệt tổng',icon:'📋'},
    {label:'Phó Tổng ĐH',role:'李群立',icon:'🏛️'},
  ]

  const ApprovalFlow = ({apv, setApv, steps, color='#0078d4', formLabel}) => {
    const isDone = apv.step >= steps.length
    return (
    <div style={{border:`2px solid ${color}33`,borderRadius:10,overflow:'hidden',marginTop:4}}>
      <div style={{background:color,padding:'8px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{color:'#fff',fontWeight:700,fontSize:13}}>🔏 QUY TRÌNH PHÊ DUYỆT – {formLabel}</div>
        <div style={{color:'rgba(255,255,255,.8)',fontSize:11}}>
          {isDone ? '✅ Đã hoàn tất phê duyệt' : `Bước ${apv.step+1}/${steps.length}: ${steps[apv.step]?.label}`}
        </div>
      </div>
      {/* Chain visualization */}
      <div style={{background:'#f8fafc',padding:'16px 20px',borderBottom:'1px solid #e2e8f0'}}>
        <div style={{display:'flex',alignItems:'center',gap:0,flexWrap:'nowrap',overflowX:'auto'}}>
          {steps.map((s,i)=>{
            const done = i < apv.step
            const active = i === apv.step
            const pending = i > apv.step
            return (
              <div key={i} style={{display:'flex',alignItems:'center',flexShrink:0}}>
                <div style={{textAlign:'center',width:110}}>
                  <div style={{
                    width:48,height:48,borderRadius:'50%',margin:'0 auto 6px',
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,
                    background: done?'#dcfce7':active?color:'#f1f5f9',
                    border:`3px solid ${done?'#16a34a':active?color:'#d1d5db'}`,
                    boxShadow: active?`0 0 0 4px ${color}22`:undefined,
                    transition:'all .2s'
                  }}>{done?'✓':s.icon}</div>
                  <div style={{fontSize:10.5,fontWeight:active||done?700:400,color:done?'#16a34a':active?color:'#9ca3af',lineHeight:1.3}}>{s.label}</div>
                  <div style={{fontSize:9.5,color:'#9ca3af',marginTop:2}}>{s.role}</div>
                  {done && apv.history[i] && (
                    <div style={{fontSize:9,color:'#16a34a',marginTop:2,fontStyle:'italic'}}>
                      {apv.history[i].action==='approved'?'✓ Đã duyệt':'✗ Từ chối'} {apv.history[i].time}
                    </div>
                  )}
                </div>
                {i < steps.length-1 && (
                  <div style={{width:28,height:2,background:done?'#16a34a':'#e2e8f0',flexShrink:0,marginBottom:20,transition:'background .3s'}}/>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {/* Action panel */}
      {!isDone && (
        <div style={{padding:'12px 20px',background:'#fff',display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <input
            value={apv.comment}
            onChange={e=>setApv(p=>({...p,comment:e.target.value}))}
            placeholder={`Ghi chú cho bước "${steps[apv.step]?.label}"...`}
            style={{flex:1,minWidth:200,padding:'6px 10px',borderRadius:6,border:'1px solid #d1d5db',fontSize:12,outline:'none'}}
          />
          <button onClick={()=>{
            const now = new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})
            setApv(p=>({step:p.step+1,comment:'',history:[...p.history,{action:'approved',time:now,note:p.comment,by:steps[p.step]?.role}]}))
          }} style={{padding:'7px 18px',background:'#16a34a',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:12,whiteSpace:'nowrap'}}>
            ✓ Phê Duyệt
          </button>
          <button onClick={()=>{
            const now = new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})
            setApv(p=>({...p,comment:'',history:[...p.history,{action:'rejected',time:now,note:p.comment,by:steps[p.step]?.role}]}))
          }} style={{padding:'7px 14px',background:'#dc2626',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:12,whiteSpace:'nowrap'}}>
            ✗ Từ Chối
          </button>
          <button onClick={()=>setApv({step:0,history:[],comment:''})} style={{padding:'7px 12px',background:'#f1f5f9',color:'#6b7280',border:'1px solid #d1d5db',borderRadius:6,cursor:'pointer',fontSize:12,whiteSpace:'nowrap'}}>
            ↺ Reset
          </button>
        </div>
      )}
      {/* History log */}
      {apv.history.length > 0 && (
        <div style={{padding:'8px 20px 12px',background:'#f8fafc',borderTop:'1px solid #e2e8f0'}}>
          <div style={{fontSize:11,fontWeight:600,color:'#6b7280',marginBottom:6}}>📜 Lịch sử phê duyệt</div>
          {apv.history.map((h,i)=>(
            <div key={i} style={{fontSize:11,display:'flex',gap:8,alignItems:'center',marginBottom:3}}>
              <span style={{color:h.action==='approved'?'#16a34a':'#dc2626',fontWeight:700}}>{h.action==='approved'?'✓':'✗'} {steps[i]?.label}</span>
              <span style={{color:'#6b7280'}}>bởi {h.by} · {h.time}</span>
              {h.note && <span style={{color:'#374151',fontStyle:'italic'}}>"{h.note}"</span>}
            </div>
          ))}
        </div>
      )}
      {isDone && (
        <div style={{padding:'12px 20px',background:'#f0fdf4',borderTop:'1px solid #bbf7d0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{color:'#16a34a',fontWeight:700,fontSize:13}}>🎉 Phiếu đã được phê duyệt hoàn tất!</span>
          <button onClick={()=>setApv({step:0,history:[],comment:''})} style={{padding:'5px 12px',background:'#f1f5f9',color:'#6b7280',border:'1px solid #d1d5db',borderRadius:6,cursor:'pointer',fontSize:12}}>
            ↺ Mở lại
          </button>
        </div>
      )}
    </div>
  )}

  /* ────── EDITABLE CELL HELPERS ────── */
  const numInput = (val, onChange, color='inherit') => (
    <input type="number" value={val||''} onChange={e=>onChange(Number(e.target.value)||0)}
      style={{width:'100%',padding:'3px 6px',border:'1px solid #dbeafe',borderRadius:4,fontSize:12,
        textAlign:'right',color,fontWeight:600,background:'#fffff8',outline:'none',boxSizing:'border-box'}}/>
  )
  const txtInput = (val, onChange) => (
    <input type="text" value={val||''} onChange={e=>onChange(e.target.value)}
      style={{width:'100%',padding:'3px 6px',border:'1px solid #dbeafe',borderRadius:4,fontSize:11,
        color:'inherit',background:'#fffff8',outline:'none',boxSizing:'border-box'}}/>
  )
  const selInput = (val, onChange, opts) => (
    <select value={val} onChange={e=>onChange(e.target.value)}
      style={{width:'100%',padding:'3px 4px',border:'1px solid #dbeafe',borderRadius:4,fontSize:11,background:'#fffff8',outline:'none'}}>
      {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  )


  /* ══ AV LINE ══ */
  const renderAVLine = () => {
    const totalQty = avRows.reduce((s,o)=>s+Number(o.qty||0),0)
    const totalNVL = avRows.reduce((s,o)=>s+Number(o.materialReq||0),0)
    const regionColor = r=>r==='Nội địa'?'#0078d4':r==='Hàn Quốc'?'#059669':r==='Đông Nam Á'?'#d97706':'#8b5cf6'
    const updateAV = (id,field,val) => setAvRows(rows=>rows.map(r=>r._id===id?{...r,[field]:val}:r))
    return (
    <div className="sg">
      {/* ── BIỂU MẪU 1: BẢNG TÍNH NGUYÊN LIỆU AV ── */}
      <div style={{border:'2px solid #0078d4',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#0078d4',padding:'10px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:15}}>BẢNG TÍNH NGUYÊN LIỆU AV / AV計算原料</div>
            <div style={{color:'rgba(255,255,255,.75)',fontSize:11,marginTop:2}}>Sheet: 2026計算原料2.3 · Chỉnh sửa trực tiếp trên bảng · ✏️ = ô có thể nhập</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{textAlign:'right',color:'rgba(255,255,255,.85)',fontSize:11}}>
              <div>Kỳ SX: Tháng 10–11/2025</div>
              <div>Cập nhật: 2026-02-27</div>
            </div>
            <button onClick={()=>setAvRows(avOrders.map((o,i)=>({...o,_id:i})))} style={{padding:'5px 10px',background:'rgba(255,255,255,.2)',color:'#fff',border:'1px solid rgba(255,255,255,.4)',borderRadius:6,cursor:'pointer',fontSize:11}}>↺ Reset</button>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr style={{background:'#dbeafe'}}>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,textAlign:'center',whiteSpace:'nowrap'}}>#</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,whiteSpace:'nowrap'}}>Tháng SX</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,whiteSpace:'nowrap'}}>Khu Vực</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,whiteSpace:'nowrap'}}>Mã Đơn Hàng</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,whiteSpace:'nowrap'}}>Mã Sản Phẩm</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,textAlign:'center',whiteSpace:'nowrap'}}>Quy Cách</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,textAlign:'right',whiteSpace:'nowrap'}}>✏️ SL (thùng)</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,textAlign:'right',whiteSpace:'nowrap'}}>✏️ NVL (kg)</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,whiteSpace:'nowrap'}}>Deadline</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,whiteSpace:'nowrap'}}>✏️ Ghi Chú</th>
                <th style={{padding:'7px 8px',border:'1px solid #bfdbfe',fontSize:10,textAlign:'center',whiteSpace:'nowrap'}}>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {avRows.map((o,i)=>(
                <tr key={o._id} style={{background:i%2===0?'#fff':'#f8fafc'}}>
                  <td style={{padding:'5px 8px',border:'1px solid #e2e8f0',textAlign:'center',color:'#9ca3af',fontSize:11}}>{i+1}</td>
                  <td style={{padding:'5px 8px',border:'1px solid #e2e8f0',fontSize:11,whiteSpace:'nowrap'}}>{o.month}</td>
                  <td style={{padding:'5px 8px',border:'1px solid #e2e8f0'}}>
                    <span style={{background:`${regionColor(o.region)}18`,color:regionColor(o.region),padding:'2px 7px',borderRadius:10,fontSize:10,fontWeight:600}}>{o.region}</span>
                  </td>
                  <td style={{padding:'5px 8px',border:'1px solid #e2e8f0',fontFamily:'monospace',fontSize:11,color:'#0078d4',fontWeight:600,whiteSpace:'nowrap'}}>{o.orderId}</td>
                  <td style={{padding:'5px 8px',border:'1px solid #e2e8f0',fontFamily:'monospace',fontSize:10,whiteSpace:'nowrap'}}>{o.productCode}</td>
                  <td style={{padding:'5px 8px',border:'1px solid #e2e8f0',textAlign:'center'}}>
                    <span style={{background:o.spec==='0505'?'#dbeafe':o.spec==='0808'?'#fef3c7':o.spec==='1010'?'#ede9fe':'#f1f5f9',color:o.spec==='0505'?'#1e40af':o.spec==='0808'?'#92400e':o.spec==='1010'?'#5b21b6':'#475569',padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:700}}>{o.spec}</span>
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:90}}>
                    {numInput(o.qty, v=>updateAV(o._id,'qty',v), '#1e40af')}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:110}}>
                    {numInput(o.materialReq, v=>updateAV(o._id,'materialReq',v), o.materialReq>100000?'#dc2626':o.materialReq>50000?'#d97706':'#059669')}
                  </td>
                  <td style={{padding:'5px 8px',border:'1px solid #e2e8f0',fontSize:11,whiteSpace:'nowrap'}}>{o.deadline}</td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:140}}>
                    {txtInput(o.note, v=>updateAV(o._id,'note',v))}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:110}}>
                    {selInput(o.status||'pending', v=>updateAV(o._id,'status',v), [
                      {v:'pending',l:'⏳ Chưa SX'},{v:'in_progress',l:'⚡ Đang SX'},{v:'done',l:'✓ Hoàn thành'},{v:'blocked',l:'🔴 Bị chặn'}
                    ])}
                  </td>
                </tr>
              ))}
              <tr style={{background:'#dbeafe',fontWeight:700}}>
                <td colSpan={6} style={{padding:'7px 10px',border:'1px solid #93c5fd',fontWeight:800,color:'#1e40af',fontSize:12}}>TỔNG CỘNG / 合計</td>
                <td style={{padding:'7px 10px',border:'1px solid #93c5fd',textAlign:'right',color:'#1e40af',fontSize:13}}>{totalQty.toLocaleString()}</td>
                <td style={{padding:'7px 10px',border:'1px solid #93c5fd',textAlign:'right',color:'#dc2626',fontSize:13,fontWeight:800}}>{totalNVL.toLocaleString()} kg</td>
                <td colSpan={3} style={{padding:'7px 10px',border:'1px solid #93c5fd',color:'#6b7280',fontSize:11}}>≈ {(totalNVL/1000).toFixed(1)} tấn · {avRows.length} đơn hàng</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{padding:'10px 18px',background:'#eff6ff',borderTop:'1px solid #bfdbfe',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          {[{l:'TỔNG ĐƠN',v:avRows.length,u:'đơn',c:'#0078d4'},{l:'TỔNG SL',v:totalQty.toLocaleString(),u:'thùng',c:'#374151'},{l:'TỔNG NVL',v:(totalNVL/1000).toFixed(1),u:'tấn',c:'#dc2626'},{l:'KHU VỰC',v:3,u:'khu vực',c:'#374151'}].map((k,i)=>(
            <div key={i}><div style={{fontSize:10,color:'#6b7280',fontWeight:600}}>{k.l}</div><div style={{fontWeight:800,fontSize:20,color:k.c}}>{k.v}<span style={{fontSize:12,fontWeight:400}}> {k.u}</span></div></div>
          ))}
        </div>
      </div>

      {/* ── TIÊU CHUẨN PHÂN BỔ NVL ── */}
      <div style={{border:'2px solid #e2e8f0',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#1e293b',padding:'8px 18px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{color:'#fff',fontWeight:700,fontSize:13}}>TIÊU CHUẨN PHÂN BỔ NGUYÊN LIỆU THEO QUY CÁCH / 各規格原料分配標準</div>
          <div style={{color:'rgba(255,255,255,.6)',fontSize:11}}>BP Sản Xuất AV áp dụng</div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr style={{background:'#f1f5f9'}}>
                {['Mã Sản Phẩm','Quy Cách','Tỷ Lệ NVL','Trực Quan','Ghi Chú / Công Thức'].map((h,i)=>(
                  <th key={i} style={{padding:'8px 12px',border:'1px solid #e2e8f0',fontSize:11,textAlign:i>1?'center':'left'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {avProductSpecs.map((p,i)=>(
                <tr key={i} style={{background:i%2===0?'#fff':'#f8fafc'}}>
                  <td style={{padding:'7px 12px',border:'1px solid #e2e8f0',fontFamily:'monospace',fontSize:11,color:p.color,fontWeight:700}}>{p.code}</td>
                  <td style={{padding:'7px 12px',border:'1px solid #e2e8f0',textAlign:'center'}}>
                    <span style={{background:`${p.color}18`,color:p.color,padding:'3px 10px',borderRadius:4,fontWeight:700,fontSize:12}}>{p.spec}</span>
                  </td>
                  <td style={{padding:'7px 12px',border:'1px solid #e2e8f0',textAlign:'center',fontWeight:800,fontSize:18,color:p.color}}>{typeof p.nvlPct==='number'?`${p.nvlPct}%`:p.nvlPct}</td>
                  <td style={{padding:'7px 12px',border:'1px solid #e2e8f0',width:180}}>
                    {typeof p.nvlPct==='number' && (
                      <div style={{background:'#f1f5f9',borderRadius:4,height:10,overflow:'hidden'}}>
                        <div style={{width:`${p.nvlPct}%`,height:'100%',background:p.color,borderRadius:4}}/>
                      </div>
                    )}
                  </td>
                  <td style={{padding:'7px 12px',border:'1px solid #e2e8f0',fontSize:11,color:'#6b7280'}}>{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── PHÊ DUYỆT AV ── */}
      <ApprovalFlow apv={avApproval} setApv={setAvApproval} steps={approvalStepsAV} color="#0078d4" formLabel="BẢNG TÍNH NVL AV"/>

      {/* ── QUY TRÌNH 7 BƯỚC ── */}
      <div style={{border:'2px solid #e2e8f0',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#f8fafc',padding:'8px 18px',borderBottom:'1px solid #e2e8f0'}}>
          <div style={{fontWeight:700,fontSize:13,color:'var(--text)'}}>QUY TRÌNH SẮP KẾ HOẠCH AV – 7 BƯỚC / AV計劃排程流程</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>Click vào bước để xem hướng dẫn chi tiết</div>
        </div>
        <div style={{padding:'14px 18px'}}>
          <WorkflowDiagram steps={avWorkflowSteps} activeStep={avStep} setStep={setAvStep}/>
          {avStep ? <StepDetail step={avWorkflowSteps.find(s=>s.id===avStep)}/> : <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>👆 Click vào từng bước để xem nội dung chi tiết</div>}
        </div>
      </div>
    </div>
  )}

  /* ══ GV LINE ══ */
  const renderGVLine = () => {
    const statusBg = s=>s==='done'?'#dcfce7':s==='in_progress'?'#dbeafe':'#f1f5f9'
    const statusColor2 = s=>s==='done'?'#15803d':s==='in_progress'?'#1d4ed8':'#6b7280'
    const statusLabel = s=>({done:'✓ Đã xong',in_progress:'⟳ Đang giao',pending:'⧗ Chưa về'})[s]||s
    const updateGV = (id,field,val) => setGvRows(rows=>rows.map(r=>r._id===id?{...r,[field]:val}:r))
    const totalOrdered = gvRows.reduce((s,p)=>s+Number(p.orderQty||0),0)
    const totalStock = gvRows.reduce((s,p)=>s+Number(p.tonKho||0),0)
    return (
    <div className="sg">
      {/* ── TIẾN ĐỘ BAO BÌ CHAI ── */}
      <div style={{border:'2px solid #059669',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#059669',padding:'10px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:15}}>TIẾN ĐỘ XIN MUA BAO BÌ CHAI / 瓶裝包材採購進度</div>
            <div style={{color:'rgba(255,255,255,.75)',fontSize:11,marginTop:2}}>Đơn: VN-26020018 · SP: VMX-AP244-RAL-T1 CLASSY · ✏️ = ô có thể chỉnh sửa</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <div style={{textAlign:'right',color:'rgba(255,255,255,.85)',fontSize:11}}>
              <div style={{fontWeight:700}}>8 FCL · 160 pallets</div>
              <div>322,572 chai tổng cộng</div>
            </div>
            <button onClick={()=>setGvRows(gvPackaging.map((p,i)=>({...p,_id:i})))} style={{padding:'5px 10px',background:'rgba(255,255,255,.2)',color:'#fff',border:'1px solid rgba(255,255,255,.4)',borderRadius:6,cursor:'pointer',fontSize:11}}>↺ Reset</button>
          </div>
        </div>
        {/* KPI header */}
        <div style={{background:'#f0fdf4',borderBottom:'1px solid #bbf7d0',padding:'10px 18px',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
          {[
            {l:'ĐÃ GIAO XONG',v:gvRows.filter(r=>r.status==='done').length,u:`/${gvRows.length} loại`,c:'#15803d'},
            {l:'ĐANG GIAO',v:gvRows.filter(r=>r.status==='in_progress').length,u:'loại',c:'#1d4ed8'},
            {l:'CHƯA VỀ',v:gvRows.filter(r=>r.status==='pending').length,u:'loại',c:'#dc2626'},
            {l:'TỔNG TỒN KHO',v:totalStock.toLocaleString(),u:'đơn vị',c:'#374151'},
          ].map((k,i)=>(
            <div key={i}><div style={{fontSize:10,color:'#6b7280',fontWeight:600}}>{k.l}</div><div style={{fontWeight:800,fontSize:18,color:k.c}}>{k.v}<span style={{fontSize:11,fontWeight:400}}> {k.u}</span></div></div>
          ))}
        </div>
        {/* Bảng tiến độ - editable */}
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr style={{background:'#dcfce7'}}>
                {['STT','Tên Vật Tư / Bao Bì','Mã Code','✏️ Tồn Kho','✏️ SL Đặt Mua','Đơn Vị','Lead Time','✏️ Tiến Độ Giao','✏️ Trạng Thái'].map((h,i)=>(
                  <th key={i} style={{padding:'7px 9px',border:'1px solid #bbf7d0',fontSize:11,textAlign:i>=3&&i<=4?'right':'left',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gvRows.map((p,i)=>(
                <tr key={p._id} style={{background:i%2===0?'#fff':'#f8fafc'}}>
                  <td style={{padding:'6px 9px',border:'1px solid #e2e8f0',textAlign:'center',color:'#9ca3af',fontSize:11}}>{p.stt}</td>
                  <td style={{padding:'6px 9px',border:'1px solid #e2e8f0',fontWeight:600,fontSize:12}}>{p.item}</td>
                  <td style={{padding:'6px 9px',border:'1px solid #e2e8f0',fontFamily:'monospace',fontSize:11,color:'#059669',fontWeight:700}}>{p.maCode}</td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:90}}>
                    {numInput(p.tonKho, v=>updateGV(p._id,'tonKho',v), p.tonKho===0?'#dc2626':'#374151')}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:100}}>
                    {numInput(p.orderQty, v=>updateGV(p._id,'orderQty',v), '#1d4ed8')}
                  </td>
                  <td style={{padding:'6px 9px',border:'1px solid #e2e8f0',fontSize:11,color:'#6b7280',textAlign:'center'}}>{p.unit}</td>
                  <td style={{padding:'6px 9px',border:'1px solid #e2e8f0',fontSize:11,color:'#6b7280',whiteSpace:'nowrap'}}>{p.leadtime}</td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:160}}>
                    {txtInput(p.target, v=>updateGV(p._id,'target',v))}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:120}}>
                    {selInput(p.status, v=>updateGV(p._id,'status',v), [
                      {v:'done',l:'✓ Đã xong'},{v:'in_progress',l:'⟳ Đang giao'},{v:'pending',l:'⧗ Chưa về'}
                    ])}
                  </td>
                </tr>
              ))}
              <tr style={{background:'#dcfce7',fontWeight:700}}>
                <td colSpan={3} style={{padding:'7px 10px',border:'1px solid #bbf7d0',fontWeight:800,color:'#15803d',fontSize:12}}>TỔNG / 合計</td>
                <td style={{padding:'7px 10px',border:'1px solid #bbf7d0',textAlign:'right',color:'#374151',fontWeight:700}}>{totalStock.toLocaleString()}</td>
                <td style={{padding:'7px 10px',border:'1px solid #bbf7d0',textAlign:'right',color:'#1d4ed8',fontWeight:800}}>{totalOrdered.toLocaleString()}</td>
                <td colSpan={4} style={{padding:'7px 10px',border:'1px solid #bbf7d0',fontSize:11,color:'#6b7280'}}>{gvRows.length} loại vật tư · Giao: 17,000–24,000 chai/ngày</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── PHIẾU NHU CẦU NVL WM01 ── */}
      <div style={{border:'2px solid #8b5cf6',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#8b5cf6',padding:'10px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:15}}>PHIẾU NHU CẦU NGUYÊN LIỆU / 原料需求表</div>
            <div style={{color:'rgba(255,255,255,.75)',fontSize:11,marginTop:2}}>Mẫu: GV03 · Phiếu WM01 · Nguồn: 3.5.原料需求表 PHIẾU NHU CẦU NGUYÊN LIỆU-V9_WM01.xlsx</div>
          </div>
          <div style={{color:'rgba(255,255,255,.85)',fontSize:11,textAlign:'right'}}>
            <div style={{fontWeight:700}}>Phiếu số: GV03 · 27/02/2026</div>
            <div>Tuần SX: 03–05/03/2026</div>
          </div>
        </div>
        <div style={{background:'#faf5ff',borderBottom:'1px solid #e9d5ff',padding:'10px 18px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
          {[{l:'NGUYÊN LIỆU',v:'WM01',c:'#8b5cf6'},{l:'TỔNG YÊU CẦU',v:'116 MTS',c:'#dc2626'},{l:'SỐ NGÀY SX',v:'3 ngày (03–05/03)',c:'#374151'}].map((k,i)=>(
            <div key={i}><div style={{fontSize:10,color:'#6b7280',fontWeight:600}}>{k.l}</div><div style={{fontWeight:700,fontSize:14,color:k.c}}>{k.v}</div></div>
          ))}
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr style={{background:'#ede9fe'}}>
                {['Ngày SX','Nguyên Liệu','Lượng Yêu Cầu','Bộ Phận Nhận','Trạng Thái'].map((h,i)=>(
                  <th key={i} style={{padding:'8px 12px',border:'1px solid #ddd6fe',fontSize:11,textAlign:i===2?'right':'left'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gvMaterialRequests.map((r,i)=>(
                <tr key={i} style={{background:i%2===0?'#fff':'#faf5ff'}}>
                  <td style={{padding:'9px 12px',border:'1px solid #e2e8f0',fontWeight:700,color:'#8b5cf6',whiteSpace:'nowrap'}}>{r.date}</td>
                  <td style={{padding:'9px 12px',border:'1px solid #e2e8f0',fontWeight:600}}>{r.material}</td>
                  <td style={{padding:'9px 12px',border:'1px solid #e2e8f0',textAlign:'right',fontWeight:800,fontSize:14,color:'#dc2626'}}>{r.qty}</td>
                  <td style={{padding:'9px 12px',border:'1px solid #e2e8f0',fontSize:11,color:'#6b7280'}}>{r.dept}</td>
                  <td style={{padding:'9px 12px',border:'1px solid #e2e8f0'}}>
                    <span style={{background:'#dcfce7',color:'#15803d',padding:'3px 10px',borderRadius:10,fontSize:11,fontWeight:600}}>✓ Đã thực hiện</span>
                  </td>
                </tr>
              ))}
              <tr style={{background:'#ede9fe',fontWeight:700}}>
                <td colSpan={2} style={{padding:'8px 12px',border:'1px solid #ddd6fe',fontWeight:800,color:'#6d28d9'}}>TỔNG / 合計</td>
                <td style={{padding:'8px 12px',border:'1px solid #ddd6fe',textAlign:'right',fontSize:14,color:'#dc2626',fontWeight:800}}>116 MTS</td>
                <td colSpan={2} style={{padding:'8px 12px',border:'1px solid #ddd6fe',fontSize:11,color:'#6b7280'}}>3 ngày SX</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Chữ ký */}
        <div style={{padding:'14px 20px',background:'#faf5ff',borderTop:'1px solid #e9d5ff',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:24}}>
          {[{t:'Người Lập Phiếu',n:'BP Kế Hoạch'},{t:'Xác Nhận BP NVL',n:'殷賢清'},{t:'Phê Duyệt',n:'李群立 – Phó Tổng ĐH'}].map((s,i)=>(
            <div key={i} style={{textAlign:'center',paddingTop:8,borderTop:'1px solid #8b5cf6'}}>
              <div style={{fontSize:11,fontWeight:700,color:'#6d28d9'}}>{s.t}</div>
              <div style={{fontSize:12,marginTop:4,color:'#374151'}}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PHÊ DUYỆT GV ── */}
      <ApprovalFlow apv={gvApproval} setApv={setGvApproval} steps={approvalStepsGV} color="#8b5cf6" formLabel="PHIẾU NHU CẦU NVL GV03"/>

      {/* ── QUY TRÌNH GV ── */}
      <div style={{border:'2px solid #e2e8f0',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#f8fafc',padding:'8px 18px',borderBottom:'1px solid #e2e8f0'}}>
          <div style={{fontWeight:700,fontSize:13}}>QUY TRÌNH SẢN XUẤT GV – 7 BƯỚC</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>Click vào bước để xem hướng dẫn</div>
        </div>
        <div style={{padding:'14px 18px'}}>
          <WorkflowDiagram steps={gvWorkflowSteps} activeStep={gvStep} setStep={setGvStep}/>
          {gvStep ? <StepDetail step={gvWorkflowSteps.find(s=>s.id===gvStep)}/> : <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>👆 Click để xem chi tiết</div>}
        </div>
      </div>
    </div>
  )}

  /* ══ ND LINE ══ */
  const renderNDLine = () => {
    const totalSX2Plan = ndRows.reduce((s,w)=>s+Number(w.sx2Plan||0),0)
    const totalSX2Actual = ndRows.reduce((s,w)=>s+(w.sx2Actual!=null?Number(w.sx2Actual):0),0)
    const totalSX1Need = ndRows.reduce((s,w)=>s+Number(w.sx1Need||0),0)
    const totalSX1Actual = ndRows.reduce((s,w)=>s+(w.sx1Actual!=null?Number(w.sx1Actual):0),0)
    const updateND = (id,field,val) => setNdRows(rows=>rows.map(r=>r._id===id?{...r,[field]:val===''?null:Number(val)}:r))
    return (
    <div className="sg">
      {/* ── BẢNG CHỐT NVL MIẾNG HÀNG TUẦN ── */}
      <div style={{border:'2px solid #d97706',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#d97706',padding:'10px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:15}}>KẾ HOẠCH CẮT NATA & CHỐT NVL MIẾNG HÀNG TUẦN</div>
            <div style={{color:'rgba(255,255,255,.75)',fontSize:11,marginTop:2}}>Nguồn: 4.椰果切丁計劃生產二部 Kế hoạch cắt Nata.xlsx · Chốt tuần · ✏️ = ô nhập thực tế</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <div style={{color:'rgba(255,255,255,.85)',fontSize:11,textAlign:'right'}}>
              <div style={{fontWeight:700}}>T11–T12/2025</div>
              <div>SX1 ↔ SX2 điều phối</div>
            </div>
            <button onClick={()=>setNdRows(ndWeeklyPlan.map((w,i)=>({...w,_id:i})))} style={{padding:'5px 10px',background:'rgba(255,255,255,.2)',color:'#fff',border:'1px solid rgba(255,255,255,.4)',borderRadius:6,cursor:'pointer',fontSize:11}}>↺ Reset</button>
          </div>
        </div>
        {/* Legend */}
        <div style={{background:'#fef9ee',borderBottom:'1px solid #fde68a',padding:'8px 18px',display:'flex',gap:20,fontSize:11,flexWrap:'wrap'}}>
          <span style={{color:'#1e40af',fontWeight:600}}>■ SX2 – Cắt hạt / Nấu đóng gói</span>
          <span style={{color:'#15803d',fontWeight:600}}>■ SX1 – Cấy / Thu hoạch / Cắt miếng</span>
          <span style={{color:'#6b7280'}}>KH = Kế hoạch · TT = Thực tế · ✏️ = nhập được</span>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr>
                <th rowSpan={2} style={{padding:'8px 12px',border:'1px solid #fde68a',background:'#fef3c7',textAlign:'center',fontSize:11,verticalAlign:'middle'}}>TUẦN SX</th>
                <th colSpan={3} style={{padding:'7px 12px',border:'1px solid #fde68a',background:'#bfdbfe',color:'#1e40af',textAlign:'center',fontSize:11}}>SX2 – CẮT HẠT / NẤU ĐÓNG GÓI</th>
                <th colSpan={3} style={{padding:'7px 12px',border:'1px solid #fde68a',background:'#bbf7d0',color:'#15803d',textAlign:'center',fontSize:11}}>SX1 – CẤY / THU HOẠCH / CẮT MIẾNG</th>
                <th rowSpan={2} style={{padding:'8px 12px',border:'1px solid #fde68a',background:'#fef3c7',textAlign:'center',fontSize:11,verticalAlign:'middle'}}>✏️ Ghi Chú</th>
              </tr>
              <tr>
                {[{l:'✏️ KH (tấn)',bg:'#bfdbfe',c:'#1e40af'},{l:'✏️ TT (tấn)',bg:'#bfdbfe',c:'#1e40af'},{l:'+/−',bg:'#bfdbfe',c:'#1e40af'},
                  {l:'✏️ Cần cấp (tấn)',bg:'#bbf7d0',c:'#15803d'},{l:'✏️ TT (tấn)',bg:'#bbf7d0',c:'#15803d'},{l:'+/−',bg:'#bbf7d0',c:'#15803d'}].map((h,i)=>(
                  <th key={i} style={{padding:'6px 10px',border:'1px solid #fde68a',background:h.bg,color:h.c,fontSize:10,textAlign:'right'}}>{h.l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ndRows.map((w,i)=>{
                const sx2Diff = w.sx2Actual!=null ? w.sx2Actual - w.sx2Plan : null
                const sx1Diff = w.sx1Actual!=null ? w.sx1Actual - w.sx1Need : null
                return (
                <tr key={w._id} style={{background:i%2===0?'#fff':'#fffbeb'}}>
                  <td style={{padding:'8px 12px',border:'1px solid #e2e8f0',fontWeight:700,color:'#d97706',whiteSpace:'nowrap'}}>{w.week}</td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',background:'#eff6ff',minWidth:80}}>
                    {numInput(w.sx2Plan, v=>updateND(w._id,'sx2Plan',String(v)), '#1e40af')}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',background:'#eff6ff',minWidth:80}}>
                    <input type="number" value={w.sx2Actual??''} onChange={e=>updateND(w._id,'sx2Actual',e.target.value)}
                      placeholder="—" style={{width:'100%',padding:'3px 6px',border:'1px solid #bfdbfe',borderRadius:4,fontSize:12,textAlign:'right',fontWeight:700,color:w.sx2Actual!=null?(w.sx2Actual>=w.sx2Plan?'#15803d':'#dc2626'):'#9ca3af',background:'#fffff8',outline:'none',boxSizing:'border-box'}}/>
                  </td>
                  <td style={{padding:'8px 10px',border:'1px solid #e2e8f0',background:'#eff6ff',textAlign:'right',fontWeight:700,color:sx2Diff!=null?(sx2Diff>=0?'#15803d':'#dc2626'):'#9ca3af'}}>
                    {sx2Diff!=null?(sx2Diff>=0?`+${sx2Diff}`:sx2Diff):'—'}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',background:'#f0fdf4',minWidth:80}}>
                    {numInput(w.sx1Need, v=>updateND(w._id,'sx1Need',String(v)), '#15803d')}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',background:'#f0fdf4',minWidth:80}}>
                    <input type="number" value={w.sx1Actual??''} onChange={e=>updateND(w._id,'sx1Actual',e.target.value)}
                      placeholder="—" style={{width:'100%',padding:'3px 6px',border:'1px solid #bbf7d0',borderRadius:4,fontSize:12,textAlign:'right',fontWeight:700,color:w.sx1Actual!=null?'#15803d':'#9ca3af',background:'#fffff8',outline:'none',boxSizing:'border-box'}}/>
                  </td>
                  <td style={{padding:'8px 10px',border:'1px solid #e2e8f0',background:'#f0fdf4',textAlign:'right',fontWeight:700,color:sx1Diff!=null?(sx1Diff<=0?'#15803d':'#dc2626'):'#9ca3af'}}>
                    {sx1Diff!=null?(sx1Diff>=0?`+${sx1Diff}`:sx1Diff):'—'}
                  </td>
                  <td style={{padding:'4px 8px',border:'1px solid #e2e8f0',minWidth:160}}>
                    <input type="text" value={w.note||''} onChange={e=>setNdRows(rows=>rows.map(r=>r._id===w._id?{...r,note:e.target.value}:r))}
                      placeholder="Ghi chú..."
                      style={{width:'100%',padding:'3px 6px',border:'1px solid #fde68a',borderRadius:4,fontSize:11,background:'#fffff8',outline:'none',boxSizing:'border-box'}}/>
                  </td>
                </tr>
              )})}
              <tr style={{background:'#fef3c7',fontWeight:700}}>
                <td style={{padding:'8px 12px',border:'1px solid #fde68a',fontWeight:800,color:'#92400e'}}>TỔNG / 合計</td>
                <td style={{padding:'8px 10px',border:'1px solid #fde68a',background:'#bfdbfe',textAlign:'right',color:'#1e40af',fontWeight:800}}>{totalSX2Plan}</td>
                <td style={{padding:'8px 10px',border:'1px solid #fde68a',background:'#bfdbfe',textAlign:'right',color:'#1e40af',fontWeight:800}}>{totalSX2Actual||'—'}</td>
                <td style={{padding:'8px 10px',border:'1px solid #fde68a',background:'#bfdbfe'}}/>
                <td style={{padding:'8px 10px',border:'1px solid #fde68a',background:'#bbf7d0',textAlign:'right',color:'#15803d',fontWeight:800}}>{totalSX1Need}</td>
                <td style={{padding:'8px 10px',border:'1px solid #fde68a',background:'#bbf7d0',textAlign:'right',color:'#15803d',fontWeight:800}}>{totalSX1Actual}</td>
                <td style={{padding:'8px 10px',border:'1px solid #fde68a',background:'#bbf7d0'}}/>
                <td style={{padding:'8px 10px',border:'1px solid #fde68a',fontSize:11,color:'#92400e'}}>5 tuần</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{padding:'10px 18px',background:'#fffbeb',borderTop:'1px solid #fde68a',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          {[{l:'TỔNG KH SX2',v:totalSX2Plan,u:'tấn',c:'#d97706'},{l:'SX2 THỰC TẾ',v:totalSX2Actual,u:'tấn',c:'#15803d'},{l:'SX1 CẦN CẤP',v:totalSX1Need,u:'tấn',c:'#1d4ed8'},{l:'SX1 THỰC HIỆN',v:totalSX1Actual,u:'tấn',c:'#15803d'}].map((k,i)=>(
            <div key={i}><div style={{fontSize:10,color:'#6b7280',fontWeight:600}}>{k.l}</div><div style={{fontWeight:800,fontSize:20,color:k.c}}>{k.v}<span style={{fontSize:12,fontWeight:400}}> {k.u}</span></div></div>
          ))}
        </div>
      </div>

      {/* ── PHÊ DUYỆT ND ── */}
      <ApprovalFlow apv={ndApproval} setApv={setNdApproval} steps={approvalStepsND} color="#d97706" formLabel="BẢNG CHỐT NVL MIẾNG TUẦN"/>

      {/* ── QUY TRÌNH ND ── */}
      <div style={{border:'2px solid #e2e8f0',borderRadius:10,overflow:'hidden'}}>
        <div style={{background:'#f8fafc',padding:'8px 18px',borderBottom:'1px solid #e2e8f0'}}>
          <div style={{fontWeight:700,fontSize:13}}>QUY TRÌNH SX NATA DE COCO – SX1 → SX2 (7 BƯỚC)</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>Click vào bước để xem hướng dẫn chi tiết</div>
        </div>
        <div style={{padding:'14px 18px'}}>
          <WorkflowDiagram steps={ndWorkflowSteps} activeStep={ndStep} setStep={setNdStep}/>
          {ndStep ? <StepDetail step={ndWorkflowSteps.find(s=>s.id===ndStep)}/> : <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>👆 Click để xem chi tiết từng bước SX1/SX2</div>}
        </div>
      </div>
    </div>
  )}

  const renderCustomerFlow = () => (
    <div className="sg">
      <div className="card" style={{border:'2px solid #be185d22'}}>
        <div className="card-title">
          <span className="card-title-left">🎯 Quy Trình Khách Hàng – End-to-End Workflow<NewBadge/></span>
          <span className="tsm cm">10 bước từ PO → Nhận hàng</span>
        </div>
        <div className="al al-blue mb12">{'👆 Click vào từng bước để xem chi tiết và điểm tích hợp AI. Các bước có 🤖 hỗ trợ AI được đánh dấu xanh.'}</div>
        <WorkflowDiagram steps={customerFlowSteps} activeStep={cfStep} setStep={setCfStep}/>
        {cfStep && (() => {
          const s = customerFlowSteps.find(x=>x.id===cfStep)
          return s ? (
            <div style={{background:`${s.color}08`,border:`1.5px solid ${s.color}44`,borderRadius:10,padding:16,marginTop:8}}>
              <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                <span style={{fontSize:28}}>{s.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,color:s.color,fontSize:14}}>Bước {s.id}: {s.label}</div>
                  <div style={{fontSize:11,color:'var(--muted)',marginBottom:6}}>👥 Phụ trách: {s.actor}</div>
                  <div style={{fontSize:12.5,lineHeight:1.6,marginBottom:8}}>{s.detail}</div>
                  {s.aiSupport && s.aiNote && (
                    <div style={{background:'#ecfdf5',border:'1px solid #6ee7b7',borderRadius:8,padding:'8px 12px',fontSize:11.5,color:'#065f46'}}>
                      🤖 <strong>AI hỗ trợ:</strong> {s.aiNote}
                    </div>
                  )}
                  {!s.aiSupport && (
                    <div style={{background:'#f8f9fa',border:'1px solid var(--border)',borderRadius:8,padding:'6px 12px',fontSize:11,color:'var(--muted)'}}>
                      Bước thủ công – chưa có AI hỗ trợ
                    </div>
                  )}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:8}}>
                    <div style={{background:'#f1f5f9',borderRadius:6,padding:'8px 10px'}}>
                      <div style={{fontSize:10,fontWeight:600,color:'var(--muted)',marginBottom:4}}>📥 ĐẦU VÀO</div>
                      {s.inputs.map((inp,j)=><div key={j} style={{fontSize:11,padding:'1px 0'}}>• {inp}</div>)}
                    </div>
                    <div style={{background:'#f0fdf4',borderRadius:6,padding:'8px 10px'}}>
                      <div style={{fontSize:10,fontWeight:600,color:'#065f46',marginBottom:4}}>📤 ĐẦU RA</div>
                      {s.outputs.map((out,j)=><div key={j} style={{fontSize:11,padding:'1px 0'}}>• {out}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        })()}
        {!cfStep && <p className="tsm cm mt4">👆 Click vào bước để xem chi tiết</p>}
      </div>
      <div className="card">
        <div className="card-title">📋 Tổng Quan 10 Bước & Tích Hợp AI</div>
        <div className="tw"><table>
          <thead><tr>
            <th>#</th><th>Bước</th><th>Phụ trách</th><th>AI hỗ trợ</th><th>Mô tả AI</th>
          </tr></thead>
          <tbody>{customerFlowSteps.map((s,i)=>(
            <tr key={s.id} style={{cursor:'pointer',background:cfStep===s.id?'var(--blue-xlight)':''}} onClick={()=>setCfStep(cfStep===s.id?null:s.id)}>
              <td style={{fontWeight:700,color:s.color,width:30}}>{i+1}</td>
              <td style={{fontWeight:500}}>{s.icon} {s.label}</td>
              <td><span className="badge badge-gray">{s.actor}</span></td>
              <td style={{textAlign:'center'}}>{s.aiSupport?<span className="badge badge-green">🤖 AI</span>:<span className="badge badge-gray">–</span>}</td>
              <td style={{fontSize:11,color:'#065f46',maxWidth:200}}>{s.aiNote||'–'}</td>
            </tr>
          ))}</tbody>
        </table></div>
        <div className="sg4 mt16">
          <div className="sc"><div className="sc-label">Tổng bước</div><div className="sc-value">10</div><div className="sc-sub">end-to-end</div></div>
          <div className="sc"><div className="sc-label">Có AI</div><div className="sc-value tg">{customerFlowSteps.filter(s=>s.aiSupport).length}</div><div className="sc-sub">bước AI hỗ trợ</div></div>
          <div className="sc"><div className="sc-label">Thủ công</div><div className="sc-value tr">{customerFlowSteps.filter(s=>!s.aiSupport).length}</div><div className="sc-sub">bước chưa AI</div></div>
          <div className="sc"><div className="sc-label">Tỉ lệ AI</div><div className="sc-value">{Math.round(customerFlowSteps.filter(s=>s.aiSupport).length/customerFlowSteps.length*100)}%</div><div className="sc-sub">automation</div></div>
        </div>
      </div>
    </div>
  )

  /* ── AI ANALYSIS TAB ── */
  const renderAIAnalysis = () => (
    <div className="sg">
      <div className="card">
        <div className="card-title">
          <span className="card-title-left">📊 Phân Tích AI – 生管部 AI軟體系統<NewBadge/></span>
          <span className="tsm cm">Nguồn: AI軟體系統--生管部 BẢNG TỔNG HỢP.xlsx</span>
        </div>
        <div className="al al-yellow mb12">{'12 quy trình được phân tích từ BẢNG TỔNG HỢP. Click vào từng thẻ để xem hiện trạng, vấn đề và giải pháp AI chi tiết.'}</div>
        <div className="sg4 mb16">
          <div className="sc"><div className="sc-label">Tổng quy trình</div><div className="sc-value">12</div><div className="sc-sub">đã phân tích</div></div>
          <div className="sc"><div className="sc-label">Ưu tiên Cao</div><div className="sc-value tr">{aiPainPoints.filter(p=>p.priority==='Cao').length}</div><div className="sc-sub">cần xử lý trước</div></div>
          <div className="sc"><div className="sc-label">Ưu tiên TB</div><div className="sc-value" style={{color:'#d97706'}}>{aiPainPoints.filter(p=>p.priority==='TB').length}</div><div className="sc-sub">trung bình</div></div>
          <div className="sc"><div className="sc-label">AI coverage</div><div className="sc-value tg">100%</div><div className="sc-sub">12/12 có giải pháp</div></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
          {aiPainPoints.map(pp=>(
            <div key={pp.id} onClick={()=>setActivePP(activePP===pp.id?null:pp.id)}
              style={{border:`1.5px solid ${activePP===pp.id?pp.color:'var(--border)'}`,borderRadius:8,padding:'10px 12px',cursor:'pointer',background:activePP===pp.id?`${pp.color}0a`:'#fff',transition:'all .15s'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:6,marginBottom:4}}>
                <span style={{fontWeight:700,fontSize:11,color:pp.color,minWidth:50}}>{pp.code}</span>
                <span style={{fontWeight:600,fontSize:11,flex:1,lineHeight:1.3}}>{pp.process}</span>
                <span className={'badge '+(pp.priority==='Cao'?'badge-red':pp.priority==='TB'?'badge-yellow':'badge-green')} style={{fontSize:9,flexShrink:0}}>{pp.priority}</span>
              </div>
              <div style={{fontSize:10,color:'var(--muted)',marginBottom:4}}>🏭 {pp.depts.join(' · ')}</div>
              <div style={{fontSize:10,color:'var(--muted)'}}>📋 Line: {pp.line}</div>
              {activePP===pp.id && (
                <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${pp.color}33`}}>
                  <div style={{fontSize:11,marginBottom:8,lineHeight:1.5}}>
                    <div style={{fontWeight:600,color:'var(--muted)',fontSize:10,marginBottom:4}}>HIỆN TRẠNG</div>
                    {pp.current}
                  </div>
                  {pp.problems.length>0 && (
                    <div style={{marginBottom:8}}>
                      <div style={{fontWeight:600,color:'#dc2626',fontSize:10,marginBottom:4}}>⚠️ VẤN ĐỀ / RỦI RO</div>
                      {pp.problems.map((pr,j)=><div key={j} style={{fontSize:11,color:'#dc2626',padding:'1px 0'}}>• {pr}</div>)}
                    </div>
                  )}
                  <div style={{background:'#ecfdf5',border:'1px solid #6ee7b7',borderRadius:6,padding:'8px 10px'}}>
                    <div style={{fontWeight:600,color:'#065f46',fontSize:10,marginBottom:4}}>🤖 GIẢI PHÁP AI</div>
                    <div style={{fontSize:11,color:'#065f46',lineHeight:1.6}}>{pp.aiSolution}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title">🏢 Bản Đồ Bộ Phận & Mức Độ Ảnh Hưởng</div>
        <div className="tw"><table>
          <thead><tr>
            <th>Bộ phận</th><th>Số quy trình liên quan</th><th>Ưu tiên Cao</th><th>Bảng dữ liệu liên quan</th>
          </tr></thead>
          <tbody>
            {[
              {dept:'生管部 (Kế Hoạch)',key:'生管部'},
              {dept:'業務部 (Nghiệp vụ)',key:'業務部'},
              {dept:'技術部 (Kỹ thuật)',key:'技術部'},
              {dept:'品保部 (QC)',key:'品保部'},
              {dept:'原料部 (Nguyên liệu)',key:'原料部'},
              {dept:'採購部 (Mua hàng)',key:'採購部'},
              {dept:'儲運部 (Kho/Logistics)',key:'儲運部'},
              {dept:'SX1/SX2/SX4',key:'生產'},
            ].map(({dept,key})=>{
              const pts = aiPainPoints.filter(p=>p.depts.some(d=>d.includes(key)))
              const hi = pts.filter(p=>p.priority==='Cao').length
              if(!pts.length) return null
              return (
                <tr key={dept}>
                  <td style={{fontWeight:600}}>{dept}</td>
                  <td><span className="badge badge-blue">{pts.length} quy trình</span></td>
                  <td>{hi>0?<span className="badge badge-red">{hi} Cao</span>:<span className="badge badge-green">0</span>}</td>
                  <td style={{fontSize:10,color:'var(--muted)'}}>{pts.flatMap(p=>p.tables).slice(0,2).join(', ')}{pts.flatMap(p=>p.tables).length>2?'…':''}</td>
                </tr>
              )
            })}
          </tbody>
        </table></div>
      </div>
    </div>
  )

  /* ── V1.1 CONTAINER ── */
  const renderV11 = () => (
    <div className="sg">
      <div className="ph">
        <div>
          <h1>🏭 Kế Hoạch Sản Xuất – Production Schedule v1.1</h1>
          <p className="cm tsm">Phân tích chi tiết dữ liệu thực tế · 3 dây chuyền AV / GV / ND · Prototype quy trình khách hàng · Phân tích AI hệ thống 生管部</p>
        </div>
      </div>
      <div className="card" style={{padding:'12px 16px'}}>
        <div className="tabs">
          {[
            {icon:'🌿',label:'AV Line'},
            {icon:'🍶',label:'GV Line'},
            {icon:'🥥',label:'ND Line'},
            {icon:'🎯',label:'Quy Trình KH',badge:'PROTOTYPE'},
            {icon:'📊',label:'Phân Tích AI',badge:'AI'},
          ].map((t,i)=>(
            <div key={i} className={'tab'+(lineTab===i?' active':'')} onClick={()=>setLineTab(i)}>
              {t.icon} {t.label}
              {t.badge && <span className={'badge '+(t.badge==='AI'?'badge-green':'badge-blue')} style={{marginLeft:4,fontSize:9}}>{t.badge}</span>}
            </div>
          ))}
        </div>
        {lineTab===0 && renderAVLine()}
        {lineTab===1 && renderGVLine()}
        {lineTab===2 && renderNDLine()}
        {lineTab===3 && renderCustomerFlow()}
        {lineTab===4 && renderAIAnalysis()}
      </div>
    </div>
  )

  return (
    <div>
      <VersionBar/>
      {showDiff && <DiffPanel/>}
      {version==='v1.0' ? renderV1() : renderV11()}
    </div>
  )
}
