// Production-control (生管部) printable form renderers — V1.1
// Same print style & helpers as the order-workflow forms (formDocuments.js)

/* ─── shared helpers (mirror of formDocuments.js) ─────────────────────── */
function sigRow(sigs) {
  return `<table style="width:100%;border-collapse:collapse;margin-top:20px">
  <tr>${sigs.map(s => `<td style="border:1px solid #000;text-align:center;height:52px;padding:4px 6px 2px;vertical-align:top;font-size:9.5pt">
    <div style="font-weight:bold">${s.zh}</div>
    <div style="font-size:8.5pt;color:#444">${s.vi}</div>
    ${s.name ? `<div style="font-size:10pt;margin-top:6px">${s.name}</div>` : ''}
  </td>`).join('')}</tr>
</table>`
}

function hdr(code, storageNote = '儲存期限：永久<br>T/H lưu trữ: vĩnh viễn', extra = '') {
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid #000;padding-bottom:5px;margin-bottom:4px">
  <div>
    <div style="font-size:11pt;font-weight:bold;line-height:1.4">GIAVICO INTERNATIONAL FOOD COMPANY Ltd</div>
    <div style="font-size:8.5pt">Công Ty TNHH Thực Phẩm Quốc Tế Giavico</div>
    <div style="font-size:7.5pt">Cong Binh Hamlet, Tan Tay Commune, Tay Ninh Province, Viet Nam</div>
  </div>
  <div style="text-align:right">
    <div style="border:1.5px solid #000;padding:3px 10px;font-size:9pt;font-weight:bold">${code}</div>
    <div style="font-size:7.5pt;text-align:center;margin-top:2px">${storageNote}</div>
    ${extra}
  </div>
</div>`
}

const titleBlock = (zh, vi, code) => `
<div style="text-align:center;margin:8px 0 10px">
  <div style="font-size:15pt;font-weight:bold;letter-spacing:1px">${zh}</div>
  <div style="font-size:11.5pt;font-weight:bold;text-transform:uppercase;color:#333;margin-top:2px">${vi}</div>
  ${code ? `<div style="font-size:8.5pt;color:#555;margin-top:3px">${code}</div>` : ''}
</div>`

const fmt = (n) => typeof n === 'number' ? n.toLocaleString('vi-VN') : (n ?? '')

/* ─── 1. BẢNG THỐNG KÊ ĐƠN HÀNG (2026年訂單管制表) ──────────────────── */
export function formOrderControl(data = {}) {
  const d = { period: data.period || 'Tháng 11-12 / 2025', region: data.region || 'Tất cả khu vực', rows: data.rows || [], ...data }
  const body = d.rows.map((o, i) => {
    const remain = Math.max(0, o.qty - o.produced)
    const over = Math.max(0, o.produced - o.qty)
    return `<tr>
      <td class="center">${i + 1}</td>
      <td><b>${o.id}</b></td>
      <td class="center">${o.region}</td>
      <td>${o.code}</td>
      <td class="center">${o.spec || ''}</td>
      <td class="center">${fmt(o.qty)}</td>
      <td class="center">${fmt(o.produced)}</td>
      <td class="center">${remain ? fmt(remain) : '—'}</td>
      <td class="center">${over ? '+' + fmt(over) : '—'}</td>
      <td class="center">${fmt(o.shipped)}</td>
      <td class="center">${o.status || ''}</td>
    </tr>`
  }).join('')
  return `${hdr('(表 P-PM 001-01)')}
${titleBlock('2026 年訂單管制表', 'Bảng Thống Kê & Quản Chế Đơn Hàng', '生管部 BP Kế Hoạch')}
<div class="info-row">
  <div class="info-cell"><span class="info-label">期間 Kỳ</span><span class="info-val">${d.period}</span></div>
  <div class="info-cell"><span class="info-label">區域 Khu vực</span><span class="info-val">${d.region}</span></div>
  <div class="info-cell"><span class="info-label">填表日 Ngày lập</span><span class="info-val">${d.date || ''}</span></div>
</div>
<table>
  <thead><tr>
    <th>STT</th><th>訂單編號<br>Mã đơn</th><th>區域<br>Khu vực</th><th>產品代號<br>Mã SP</th><th>規格<br>Q.cách</th>
    <th>訂單量<br>SL đặt</th><th>已生產<br>Đã SX</th><th>未生產<br>Chưa SX</th><th>多生產<br>SX dư</th><th>已出貨<br>Đã xuất</th><th>狀態<br>Trạng thái</th>
  </tr></thead>
  <tbody>${body || '<tr class="empty-row"><td colspan="11"></td></tr>'}</tbody>
</table>
<div class="note">Tự động khấu trừ kế hoạch bán hàng năm · cập nhật trạng thái real-time (Đã xuống đơn / Đang SX / Chưa SX / SX dư / Đã xuất).</div>
${sigRow([
    { zh: '執行副總經理', vi: 'Phó Tổng Điều Hành' },
    { zh: '生管部主管', vi: 'CQBP Kế Hoạch' },
    { zh: '製表人', vi: 'Người lập biểu' },
  ])}`
}

/* ─── 2. 原料需求通知單 (P-OO 001-01.05) ─────────────────────────────── */
export function formMaterialRequest(data = {}) {
  const d = { docNo: data.docNo || 'GV01', date: data.date || '2025/11/31', block: data.block || 'AV', rows: data.rows || [], ...data }
  const rows = d.rows.map((r, i) => `<tr>
      <td class="center">${i + 1}</td>
      <td class="center">${r.block || d.block}</td>
      <td class="center">${r.needDate || ''}</td>
      <td class="center"><b>${r.need || ''}</b></td>
      <td class="center">${r.supplyDate || ''}</td>
      <td class="center">${r.supplyQty || ''}</td>
    </tr>`).join('')
  return `${hdr('(表 P-OO 001-01.05)', '儲存期限：25個月<br>T/H lưu trữ: 25 tháng')}
${titleBlock('原 料 需 求 通 知 單', 'Bảng Nhu Cầu Nguyên Liệu', '')}
<div class="info-row">
  <div class="info-cell"><span class="info-label">通知單編號 Mã số đơn</span><span class="info-val">${d.docNo}</span></div>
  <div class="info-cell"><span class="info-label">填表日 Ngày lập biểu</span><span class="info-val">${d.date}</span></div>
  <div class="info-cell"><span class="info-label">制造處 Khối SX</span><span class="info-val">${d.block}</span></div>
</div>
<table>
  <thead>
    <tr>
      <th rowspan="2">順序<br>STT</th><th rowspan="2">品名<br>Tên hàng</th>
      <th colspan="2">生管部 BP Kế Hoạch</th><th colspan="2">原料采購課 P.TM Ng.Liệu</th>
    </tr>
    <tr>
      <th>需求日<br>Ngày nhu cầu</th><th>需求量<br>Lượng nhu cầu</th><th>供應日<br>Ngày cung cấp</th><th>供應量<br>Lượng cung cấp</th>
    </tr>
  </thead>
  <tbody>${rows || '<tr class="empty-row"><td colspan="6"></td></tr>'}</tbody>
</table>
<div class="note">Ø Nếu phiếu bị hủy vui lòng điền lý do hủy. Tần suất gửi: mỗi cuối tuần (Thứ Sáu).</div>
${sigRow([
    { zh: '執行副總經理', vi: 'Phó Tổng Điều Hành', name: '李群立' },
    { zh: '原料部主管', vi: 'Chủ Quản BP Ng.Liệu' },
    { zh: '生管部主管', vi: 'CQBP Kế Hoạch', name: '洪寶玲' },
  ])}`
}

/* ─── 3. BẢNG TÍNH NGUYÊN LIỆU AV (計算原料) ────────────────────────── */
export function formMaterialAnalysis(data = {}) {
  const d = { period: data.period || 'Tháng 10-11 / 2025', rows: data.rows || [], total: data.total || 0, ...data }
  const rows = d.rows.map((o, i) => `<tr>
      <td class="center">${i + 1}</td>
      <td class="center">${o.region || ''}</td>
      <td><b>${o.id}</b></td>
      <td>${o.code}</td>
      <td class="center">${o.spec || ''}</td>
      <td class="center">${fmt(o.qty)} ${o.unit || ''}</td>
      <td class="center">${typeof o.nvlRule === 'number' ? o.nvlRule + '%' : (o.nvlRule || '')}</td>
      <td class="center"><b>${fmt(o.materialReq)}</b></td>
      <td class="center">${o.deadline || ''}</td>
    </tr>`).join('')
  return `${hdr('(表 P-PM 002-01)')}
${titleBlock('計 算 原 料 表', 'Bảng Tính Nguyên Liệu (AV)', '生管部 BP Kế Hoạch')}
<div class="info-row">
  <div class="info-cell"><span class="info-label">期間 Kỳ</span><span class="info-val">${d.period}</span></div>
  <div class="info-cell"><span class="info-label">NVL chuẩn/ngày</span><span class="info-val">20.000 kg/ngày</span></div>
  <div class="info-cell"><span class="info-label">填表日 Ngày lập</span><span class="info-val">${d.date || ''}</span></div>
</div>
<table>
  <thead><tr>
    <th>STT</th><th>區域<br>Khu vực</th><th>訂單編號<br>Mã đơn</th><th>產品代號<br>Mã SP</th><th>規格<br>Q.cách</th>
    <th>數量<br>SL</th><th>原料定額<br>Đ.mức NVL</th><th>原料需求量(kg)<br>Nhu cầu NVL</th><th>交期<br>Deadline</th>
  </tr></thead>
  <tbody>${rows || '<tr class="empty-row"><td colspan="9"></td></tr>'}</tbody>
  <tfoot><tr><td colspan="7" style="text-align:right;font-weight:bold;background:#f5f5f5">總共 Tổng cộng</td><td class="center" style="font-weight:bold">${fmt(d.total)}</td><td>kg</td></tr></tfoot>
</table>
<div class="note">Tiêu chuẩn tỉ lệ NVL theo quy cách: 0505 → 100%/60%, 0808 → 30%, 1010 → 30%; đặc biệt VAV-AP020 (×4.7%÷10), VAV-BP046 (×2.3%÷20).</div>
${sigRow([
    { zh: '生管部主管', vi: 'CQBP Kế Hoạch', name: '洪寶玲' },
    { zh: '原料部主管', vi: 'CQBP Nguyên Liệu' },
    { zh: '製表人', vi: 'Người lập biểu' },
  ])}`
}

/* ─── 4. PHIẾU XÁC NHẬN GIAO KỲ LIÊN PHÒNG BAN ─────────────────────── */
export function formDeliveryConfirm(data = {}) {
  const d = { order: data.order || '', product: data.product || '', deliveryDate: data.deliveryDate || '', rows: data.rows || [], ...data }
  const rows = d.rows.map((c) => `<tr>
      <td class="label">${c.dept}</td>
      <td style="font-size:9pt">${c.items}</td>
      <td>${c.value || ''}</td>
      <td class="center">${c.status === 'done' ? '☑ Đã XN' : c.status === 'risk' ? '△ Theo dõi' : '□ Chờ'}</td>
    </tr>`).join('')
  return `${hdr('(表 P-PM 003-01)')}
${titleBlock('交 期 確 認 單', 'Phiếu Xác Nhận Giao Kỳ Liên Phòng Ban', '生管部 BP Kế Hoạch')}
<div class="info-row">
  <div class="info-cell"><span class="info-label">訂單 Đơn hàng</span><span class="info-val">${d.order}</span></div>
  <div class="info-cell"><span class="info-label">產品 Sản phẩm</span><span class="info-val">${d.product}</span></div>
</div>
<table>
  <thead><tr><th style="width:130px">部門 Phòng ban</th><th>確認內容 Nội dung xác nhận</th><th>結果 Kết quả</th><th style="width:90px">狀態 Trạng thái</th></tr></thead>
  <tbody>${rows || '<tr class="empty-row"><td colspan="4"></td></tr>'}</tbody>
</table>
<div class="info-row" style="margin-top:10px">
  <div class="info-cell" style="background:#f5f5f5"><span class="info-label">建議交貨日 Ngày giao đề xuất</span><span class="info-val" style="font-size:13pt">${d.deliveryDate}</span></div>
</div>
<div class="note">Kết quả xác nhận lưu hệ thống làm căn cứ排程 (lập kế hoạch) & theo dõi tiến độ.</div>
${sigRow([
    { zh: '技術 / 生產', vi: 'KT / Sản Xuất' },
    { zh: '採購 / 品保 / 儲運', vi: 'Thu Mua / QA / Kho' },
    { zh: '生管部主管', vi: 'CQBP Kế Hoạch' },
  ])}`
}

/* ─── 5. LỆNH SẢN XUẤT (生產指令單) ─────────────────────────────────── */
export function formProductionOrder(data = {}) {
  const d = {
    orderNo: data.orderNo || 'LSX-AV-260301', line: data.line || 'BP Sản Xuất 2 (AV)',
    start: data.start || '', finish: data.finish || '', shift: data.shift || '2 ca',
    approver: data.approver || '洪寶玲 (CQBP Kế Hoạch)', rows: data.rows || [], note: data.note || '', ...data,
  }
  const rows = d.rows.map((r, i) => `<tr>
      <td class="center">${i + 1}</td>
      <td><b>${r.order}</b></td>
      <td>${r.code}</td>
      <td class="center">${r.spec || ''}</td>
      <td class="center">${fmt(r.qty)} ${r.unit || ''}</td>
      <td class="center">${r.deadline || ''}</td>
      <td>${r.note || ''}</td>
    </tr>`).join('')
  return `${hdr('(表 P-PM 004-01)')}
${titleBlock('生 產 指 令 單', 'Lệnh Sản Xuất', '生管部 → 生產部 BP Kế Hoạch → BP Sản Xuất')}
<div class="info-row">
  <div class="info-cell"><span class="info-label">生產指令號 Số lệnh SX</span><span class="info-val">${d.orderNo}</span></div>
  <div class="info-cell"><span class="info-label">線別/部門 Line/Bộ phận</span><span class="info-val">${d.line}</span></div>
  <div class="info-cell"><span class="info-label">生產班 Ca SX</span><span class="info-val">${d.shift}</span></div>
</div>
<div class="info-row">
  <div class="info-cell"><span class="info-label">開始日 Ngày bắt đầu</span><span class="info-val">${d.start}</span></div>
  <div class="info-cell"><span class="info-label">完成日 Ngày hoàn thành</span><span class="info-val">${d.finish}</span></div>
</div>
<table>
  <thead><tr><th>STT</th><th>訂單<br>Mã đơn</th><th>產品代號<br>Mã SP</th><th>規格<br>Q.cách</th><th>數量<br>SL</th><th>交期<br>Deadline</th><th>備註<br>Ghi chú</th></tr></thead>
  <tbody>${rows || '<tr class="empty-row"><td colspan="7"></td></tr>'}</tbody>
</table>
${d.note ? `<div class="section-title">備註 Ghi chú</div><div style="border:1px solid #000;border-top:none;padding:6px 10px;font-size:9.5pt">${d.note}</div>` : ''}
<div class="note">Lệnh phát hành xuống xưởng → trạng thái đơn chuyển "Đang SX", theo dõi tiến độ real-time (計劃 vs 實際).</div>
${sigRow([
    { zh: '生管部主管', vi: 'CQBP Kế Hoạch', name: d.approver.split(' ')[0] },
    { zh: '生產部主管', vi: 'CQBP Sản Xuất' },
    { zh: '製表人', vi: 'Người lập biểu' },
  ])}`
}
