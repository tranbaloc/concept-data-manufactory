// All P-RS1 form document HTML renderers
// Each function returns HTML string that EXACTLY matches the customer's biểu mẫu PDF files

/* ─── shared helpers ──────────────────────────────────────────────────── */
function sigRow(sigs) {
  return `<table style="width:100%;border-collapse:collapse;margin-top:20px">
  <tr>${sigs.map(s => `<td style="border:1px solid #000;text-align:center;height:52px;padding:4px 6px 2px;vertical-align:top;font-size:9.5pt">
    <div style="font-weight:bold">${s.zh}</div>
    <div style="font-size:8.5pt;color:#444">${s.vi}</div>
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

/* ─── 1. P-RS1 003-01.03 SAMPLE REPORT ──────────────────────────────── */
export function formSampleReport(data = {}) {
  const d = {
    sampleCode: data.sampleCode || '',
    experimentCode: data.experimentCode || '',
    productCode: data.productCode || 'GV-OL-V3-JP-001',
    productName: data.productName || 'Nước Cam Cô Đặc NFC 65°Brix',
    manDate: data.manDate || '15/06/2026',
    storage: data.storage || '-18°C',
    qty: data.qty || '5 kg',
    packing: data.packing || 'Túi PE vô trùng 5 kg',
    ...data
  }
  const items = [
    ['°Brix','≥65.0','11.2','11.2','12.0','13.1','15.8','—','65.2','—'],
    ['Acid (%)','3.2–4.0','0.92','0.92','0.94','0.96','1.10','—','3.45','—'],
    ['pH','3.5–4.2','3.85','3.85','3.82','3.80','3.74','—','3.72','—'],
    ['AN','&lt;10','—','—','—','—','—','—','8.2','—'],
    ['Solid (%)','≥65.5','—','—','—','—','—','—','66.1','—'],
    ['Ratio','—','—','—','—','—','—','—','18.9','—'],
    ['Ash (%)','&lt;0.5','—','—','—','—','—','—','0.31','—'],
    ['CPS','—','—','—','—','—','—','—','—','—'],
    ['ABS','—','—','—','—','—','—','—','—','—'],
    ['T%','—','—','—','—','—','—','—','—','—'],
    ['Color card','—','—','—','—','—','—','—','—','—'],
    ['TPC(cfu/ml)','&lt;100','—','—','—','—','—','—','&lt;10','—'],
    ['Y&amp;M(cfu/ml)','&lt;50','—','—','—','—','—','—','&lt;10','—'],
    ['Weigh(㎏)','—','—','—','—','—','—','—','50','—'],
    ['Yield (%)','—','—','—','—','—','—','—','42.3%','—'],
  ]
  return `
${hdr('(表P-RS1 003-01.03)')}
<div style="text-align:center;font-size:15pt;font-weight:bold;margin:6px 0 2px">SAMPLE REPORT</div>
<div style="text-align:center;font-size:9pt;margin-bottom:6px">Sample code / Expriment Code</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:4px">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;font-size:9.5pt"><b>Product Code:</b> ${d.productCode}</td>
    <td style="border:1px solid #000;padding:3px 6px;font-size:9.5pt"><b>Man.Date :</b> ${d.manDate}</td>
    <td style="border:1px solid #000;padding:3px 6px;font-size:9.5pt"><b>Storage condition :</b> ${d.storage}</td>
  </tr>
  <tr>
    <td colspan="2" style="border:1px solid #000;padding:3px 6px;font-size:9.5pt"><b>Product name:</b> ${d.productName}</td>
    <td style="border:1px solid #000;padding:3px 6px;font-size:9.5pt"><b>Quantities :</b> ${d.qty} &nbsp; <b>Packing :</b> ${d.packing}</td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;font-size:8.5pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:70px">Item</th>
      <th style="border:1px solid #000;padding:3px 4px;width:70px">Standard</th>
      <th style="border:1px solid #000;padding:3px 4px">Sample</th>
      <th style="border:1px solid #000;padding:3px 4px">Raw<br>Material</th>
      <th style="border:1px solid #000;padding:3px 4px">Peeling</th>
      <th style="border:1px solid #000;padding:3px 4px">Crushing</th>
      <th style="border:1px solid #000;padding:3px 4px">Milling</th>
      <th style="border:1px solid #000;padding:3px 4px">Pulper</th>
      <th style="border:1px solid #000;padding:3px 4px">Pulper<br>finisher</th>
      <th style="border:1px solid #000;padding:3px 4px">DK / DS</th>
      <th style="border:1px solid #000;padding:3px 4px">Clearning</th>
      <th style="border:1px solid #000;padding:3px 4px">Concentration</th>
    </tr>
  </thead>
  <tbody>
    ${items.map(r => `<tr>
      <td style="border:1px solid #000;padding:2px 4px">${r[0]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[1]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[2]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[3]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[4]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[5]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[6]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[7]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center;font-weight:bold">${r[8]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r[9]}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">&nbsp;</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">&nbsp;</td>
    </tr>`).join('')}
  </tbody>
</table>

<table style="width:100%;border-collapse:collapse;margin-top:6px">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;font-size:9pt" colspan="4"><b>Formula :</b></td>
  </tr>
  <tr style="background:#e8e8e8">
    <th style="border:1px solid #000;padding:3px 6px;font-size:9pt">Material / Additive</th>
    <th style="border:1px solid #000;padding:3px 6px;font-size:9pt">°Brix</th>
    <th style="border:1px solid #000;padding:3px 6px;font-size:9pt">°Brix %</th>
    <th style="border:1px solid #000;padding:3px 6px;font-size:9pt">W (%)</th>
  </tr>
  <tr><td style="border:1px solid #000;height:22px;padding:2px 6px">Cam Valencia tươi (nguyên quả)</td><td style="border:1px solid #000;text-align:center">11.5</td><td style="border:1px solid #000"></td><td style="border:1px solid #000;text-align:center">96.30</td></tr>
  <tr><td style="border:1px solid #000;height:22px;padding:2px 6px">Acid citric (điều chỉnh pH)</td><td style="border:1px solid #000;text-align:center">—</td><td style="border:1px solid #000"></td><td style="border:1px solid #000;text-align:center">0.05</td></tr>
  <tr><td style="border:1px solid #000;height:22px;padding:2px 6px"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td></tr>
</table>

<div style="margin-top:6px;font-size:9.5pt;font-weight:bold;border:1px solid #000;border-bottom:none;padding:3px 6px;background:#e8e8e8">Flow chart:</div>
<div style="border:1px solid #000;padding:6px;font-size:9.5pt;min-height:36px">
  Tiếp nhận NQ → Bóc vỏ (Peeling) → Nghiền (Crushing) → Chà (Milling 0.5mm) → Lọc tinh (Pulper finisher 0.2mm) → DK/DS → Cô đặc chân không (Clearning) → Concentration → Rót vô trùng → Bảo quản -18°C
</div>

<table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:8.5pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:28px">No</th>
      <th style="border:1px solid #000;padding:3px 4px">Order No</th>
      <th style="border:1px solid #000;padding:3px 4px">Location/custumer</th>
      <th style="border:1px solid #000;padding:3px 4px">Sending Date</th>
      <th style="border:1px solid #000;padding:3px 4px">Quantities</th>
      <th style="border:1px solid #000;padding:3px 4px">Condition</th>
      <th style="border:1px solid #000;padding:3px 4px">Producer</th>
      <th style="border:1px solid #000;padding:3px 4px">Authorized</th>
    </tr>
  </thead>
  <tbody>
    ${[1,2,3,4,5].map(n => `<tr style="height:22px">
      <td style="border:1px solid #000;text-align:center">${n}</td>
      ${n===1?'<td style="border:1px solid #000;padding:2px 4px">EM-2026-0614</td><td style="border:1px solid #000;padding:2px 4px">Sunny Foods Japan</td><td style="border:1px solid #000;padding:2px 4px">15/06/2026</td><td style="border:1px solid #000;padding:2px 4px">5 kg</td><td style="border:1px solid #000;padding:2px 4px">DHL –18°C</td><td style="border:1px solid #000;padding:2px 4px">R&D</td><td style="border:1px solid #000;padding:2px 4px">N.V.An</td>':'<td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>'}
    </tr>`).join('')}
  </tbody>
</table>
<table style="width:100%;border-collapse:collapse">
  <tr><td style="border:1px solid #000;padding:3px 6px;height:30px;font-size:9pt"><b>Note:</b></td></tr>
</table>
${sigRow([
  {zh:'Research & Develop Department Manager :',vi:'Trưởng Bộ Phận R&D'},
  {zh:'Research Supervisor :',vi:'Giám Sát Nghiên Cứu'},
  {zh:'Reporter:',vi:'Người Lập Biểu'},
])}`
}

/* ─── 2. P-RS1 001-01.02 新產品製造通知單 ────────────────────────────── */
export function formNewProductNotice(data = {}) {
  const d = {
    vnCode: data.vnCode || 'GV-OL-V3-JP-001',
    twCode: data.twCode || 'C-OL-V3-JP-001',
    productName: data.productName || 'Nước Cam Cô Đặc NFC 65°Brix',
    packing: data.packing || 'Túi vô trùng 230 kg/thùng',
    storage: data.storage || '-18°C, tránh ánh sáng',
    hsd: data.hsd || '18 tháng từ ngày SX',
    weight: data.weight || '230 kg ± 2 kg',
    version: data.version || '1',
    date: data.date || '15/06/2026',
    ...data
  }
  // Spec table: 3-column groups each with (Qui cách | K-hàng | Nội bộ)
  // Group1: Brix/Acid/pH/AN  Group2: Solid/CPS/Ash/Bx-Acid  Group3: TPC/Y/M/Coliform/E.coli
  const specs = [
    {g1:{lbl:'Brix',qc:'≥65.0',kh:'≥65.0',nb:'65.0–66.5'},g2:{lbl:'Solid',qc:'≥65.5%',kh:'≥65.5',nb:'≥65.0'},g3:{lbl:'TPC',qc:'&lt;100',kh:'&lt;100',nb:'&lt;50'}},
    {g1:{lbl:'Acid',qc:'3.2–4.0',kh:'3.2–4.0',nb:'3.2–4.2'},g2:{lbl:'CPS',qc:'—',kh:'—',nb:'—'},g3:{lbl:'Y/M',qc:'&lt;50',kh:'&lt;50',nb:'&lt;30'}},
    {g1:{lbl:'pH',qc:'3.5–4.2',kh:'3.5–4.2',nb:'3.4–4.3'},g2:{lbl:'Ash',qc:'&lt;0.5',kh:'&lt;0.5',nb:'&lt;0.5'},g3:{lbl:'Coliform',qc:'Không',kh:'Không',nb:'ND'}},
    {g1:{lbl:'AN',qc:'&lt;10',kh:'&lt;10',nb:'&lt;10'},g2:{lbl:'Bx/Acid',qc:'16–22',kh:'16–22',nb:'16–22'},g3:{lbl:'E.coli',qc:'Không',kh:'Không',nb:'ND'}},
  ]
  return `
${hdr('(表P-RS1 001-01.02)', '儲存期限：永久<br>T/H löu tröõ: vónh vieãn', '<div style="font-size:9pt;font-weight:bold">(內 控)</div>')}
<div style="text-align:center;font-size:14pt;font-weight:bold;margin:6px 0 1px">新產品製造通知單</div>
<div style="text-align:center;font-size:11pt;font-weight:bold;margin-bottom:4px">BAÛNG THOÂNG BAÙO CHEÁ BIEÁN SAÛN PHAÅM</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">版次 : ${d.version} &nbsp; 日期 Ngaøy thaùng : ${d.date}</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:0">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;width:33%"><div style="font-size:8pt">越南代號<br>Maõ soá VNam</div><b>${d.vnCode}</b></td>
    <td style="border:1px solid #000;padding:3px 6px;width:34%"><div style="font-size:8pt">產品名稱<br>Teân sphaåm</div><b>${d.productName}</b></td>
    <td style="border:1px solid #000;padding:3px 6px;width:33%"><div style="font-size:8pt">包 裝<br>Bao bì</div><b>${d.packing}</b></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 6px"><div style="font-size:8pt">台灣代號<br>Maõ soá ÑLoan</div><b>${d.twCode}</b></td>
    <td style="border:1px solid #000;padding:3px 6px"><div style="font-size:8pt">保管條件/有效期限<br>Điều kiện bảo quản/ HSD</div>${d.storage} / ${d.hsd}</td>
    <td style="border:1px solid #000;padding:3px 6px"><div style="font-size:8pt">重 量<br>T löôïng</div>${d.weight}</td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px">規格<br>Qui caùch</th>
      <th style="border:1px solid #000;padding:3px 4px">客戶<br>K-haøng</th>
      <th style="border:1px solid #000;padding:3px 4px">內控<br>Noäi boä</th>
      <th style="border:1px solid #000;padding:3px 4px">規格<br>Qui caùch</th>
      <th style="border:1px solid #000;padding:3px 4px">客戶<br>K-haøng</th>
      <th style="border:1px solid #000;padding:3px 4px">內控<br>Noäi boä</th>
      <th style="border:1px solid #000;padding:3px 4px">規格<br>Qui caùch</th>
      <th style="border:1px solid #000;padding:3px 4px">客戶<br>K-haøng</th>
      <th style="border:1px solid #000;padding:3px 4px">內控<br>Noäi boä</th>
    </tr>
  </thead>
  <tbody>
    ${specs.map(r => `<tr>
      <td style="border:1px solid #000;padding:2px 4px"><b>${r.g1.lbl}</b><br><span style="font-size:8pt">${r.g1.qc}</span></td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g1.kh}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g1.nb}</td>
      <td style="border:1px solid #000;padding:2px 4px"><b>${r.g2.lbl}</b><br><span style="font-size:8pt">${r.g2.qc}</span></td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g2.kh}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g2.nb}</td>
      <td style="border:1px solid #000;padding:2px 4px"><b>${r.g3.lbl}</b><br><span style="font-size:8pt">${r.g3.qc}</span></td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g3.kh}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g3.nb}</td>
    </tr>`).join('')}
  </tbody>
</table>

${[
  ['注意事項<br>H muïc chuù yù','Ưu tiên cam vụ chính (tháng 11–3). Kiểm tra Brix/Acid/pH tại từng công đoạn.'],
  ['原料<br>Nguyeân lieäu','Cam Valencia tươi (Tây Ninh/Bình Thuận), Enzyme pectinase 0.1%, Acid citric (nếu cần)'],
  ['添加物<br>Phuï gia','Không sử dụng phụ gia bảo quản. Acid citric chỉ dùng khi acid &lt; 3.2% sau cô đặc.'],
  ['配方<br>Phöông thöùc','Cam Valencia tươi 96.30% + Enzyme pectinase 0.20% + Acid citric (tuỳ chỉnh 0–0.05%)'],
  ['製程<br>Qui trình','Tiếp nhận → Bóc vỏ → Nghiền (4mm) → Chà (0.5mm) → Lọc tinh (0.2mm) → Cô đặc chân không 4 tầng (&lt;55°C, mục tiêu 65°Brix) → Thanh trùng UHT 95°C/15s → Làm lạnh &lt;5°C → Rót vô trùng → Bảo quản -18°C'],
  ['備註<br>Ghi chuù','Lô đầu tiên lấy mẫu sau 24h, kiểm tra đầy đủ. Cấp COA sau khi có kết quả vi sinh.'],
].map(([lbl,val]) => `<table style="width:100%;border-collapse:collapse;margin-top:-1px">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:8.5pt;width:110px;background:#f5f5f5;vertical-align:top">${lbl}</td>
    <td style="border:1px solid #000;padding:3px 6px;min-height:28px;font-size:9.5pt">${val}</td>
  </tr>
</table>`).join('')}

${sigRow([
  {zh:'技術部主管:',vi:'Chuû quaûn Kyõ thuaät'},
  {zh:'單位主管 :',vi:'Chuû quaûn ñôn vò'},
  {zh:'製表人:',vi:'Ngöôøi laäp bieåu'},
])}`
}

/* ─── 3. P-RS1 001-03.02 新產品規格說明書 ────────────────────────────── */
export function formProductSpecSheet(data = {}) {
  const d = {
    vnCode: data.vnCode || 'GV-OL-V3-JP-001',
    twCode: data.twCode || 'C-OL-V3-JP-001',
    productName: data.productName || 'Nước Cam Cô Đặc NFC 65°Brix',
    packing: data.packing || 'Túi vô trùng 230 kg/thùng',
    storage: data.storage || '-18°C',
    hsd: data.hsd || '18 tháng từ ngày SX',
    weight: data.weight || '230 kg ± 2 kg',
    version: data.version || '1',
    date: data.date || '15/06/2026',
  }
  // 3 groups × (Qui cách | K-hàng | Nội bộ)
  const specs = [
    {g1:{lbl:'Brix',qc:'≥65.0',kh:'≥65.0',nb:'65.0–66.5'},g2:{lbl:'Solid',qc:'≥65.5%',kh:'≥65.5',nb:'≥65.0'},g3:{lbl:'TPC',qc:'&lt;100',kh:'&lt;100',nb:'&lt;50'}},
    {g1:{lbl:'Acid',qc:'3.2–4.0',kh:'3.2–4.0',nb:'3.2–4.2'},g2:{lbl:'pH',qc:'3.5–4.2',kh:'3.5–4.2',nb:'3.4–4.3'},g3:{lbl:'Y/M',qc:'&lt;50',kh:'&lt;50',nb:'&lt;30'}},
    {g1:{lbl:'AN',qc:'&lt;10',kh:'&lt;10',nb:'&lt;10'},g2:{lbl:'Ash',qc:'&lt;0.5',kh:'&lt;0.5',nb:'&lt;0.5'},g3:{lbl:'Coliform',qc:'Không',kh:'Không',nb:'ND'}},
  ]
  return `
${hdr('(表P-RS1 001-03.02)')}
<div style="text-align:center;font-size:13pt;font-weight:bold;margin:6px 0 1px">新產品規格說明單</div>
<div style="text-align:center;font-size:10pt;font-weight:bold;margin-bottom:1px">Baûng dieãn giaûi qui caùch saûn phaåm môùi_Saûn xuaát</div>
<div style="text-align:center;font-size:8.5pt;font-style:italic;margin-bottom:4px">(此版本提供生產作為參考規格及製程)</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">版次: ${d.version} &nbsp; 日期Ngày tháng : ${d.date}</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:0">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;width:33%"><div style="font-size:8pt">越南代號<br>Mã số VN</div><b>${d.vnCode}</b></td>
    <td style="border:1px solid #000;padding:3px 6px;width:34%"><div style="font-size:8pt">產品名稱<br>Tên sản phẩm</div><b>${d.productName}</b></td>
    <td style="border:1px solid #000;padding:3px 6px;width:33%"><div style="font-size:8pt">包 裝<br>Bao bì</div><b>${d.packing}</b></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 6px"><div style="font-size:8pt">台灣代號<br>Mã sốTW</div><b>${d.twCode}</b></td>
    <td style="border:1px solid #000;padding:3px 6px"><div style="font-size:8pt">保管條件/有效期限<br>Điều kiện bảo quản/ HSD</div>${d.storage} / ${d.hsd}</td>
    <td style="border:1px solid #000;padding:3px 6px"><div style="font-size:8pt">重 量<br>T lượng</div>${d.weight}</td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px">規格<br>Qui cách</th>
      <th style="border:1px solid #000;padding:3px 4px">客戶<br>K-hàng</th>
      <th style="border:1px solid #000;padding:3px 4px">內控<br>Nội bộ</th>
      <th style="border:1px solid #000;padding:3px 4px">規格<br>Qui cách</th>
      <th style="border:1px solid #000;padding:3px 4px">客戶<br>K-hàng</th>
      <th style="border:1px solid #000;padding:3px 4px">內控<br>Nội bộ</th>
      <th style="border:1px solid #000;padding:3px 4px">規格<br>Qui cách</th>
      <th style="border:1px solid #000;padding:3px 4px">客戶<br>K-hàng</th>
      <th style="border:1px solid #000;padding:3px 4px">內控<br>Nội bộ</th>
    </tr>
  </thead>
  <tbody>
    ${specs.map(r => `<tr>
      <td style="border:1px solid #000;padding:2px 4px"><b>${r.g1.lbl}</b> ${r.g1.qc}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g1.kh}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g1.nb}</td>
      <td style="border:1px solid #000;padding:2px 4px"><b>${r.g2.lbl}</b> ${r.g2.qc}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g2.kh}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g2.nb}</td>
      <td style="border:1px solid #000;padding:2px 4px"><b>${r.g3.lbl}</b> ${r.g3.qc}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g3.kh}</td>
      <td style="border:1px solid #000;padding:2px 4px;text-align:center">${r.g3.nb}</td>
    </tr>`).join('')}
  </tbody>
</table>

${[
  ['原料<br>Nguyên liệu','Cam Valencia tươi (Tây Ninh/Bình Thuận), Enzyme pectinase 0.1%'],
  ['製程<br>Qui trình','Tiếp nhận → Bóc vỏ → Nghiền (4mm) → Chà (0.5mm) → Lọc tinh (0.2mm) → Cô đặc chân không (&lt;55°C, 65°Brix) → Thanh trùng UHT 95°C/15s → Làm lạnh &lt;5°C → Rót vô trùng → Bảo quản -18°C'],
  ['備註<br>Ghi chú','Lô đầu tiên lấy mẫu sau 24h kiểm tra đầy đủ 11 chỉ tiêu.'],
].map(([lbl,val]) => `<table style="width:100%;border-collapse:collapse;margin-top:-1px">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:8.5pt;width:110px;background:#f5f5f5;vertical-align:top">${lbl}</td>
    <td style="border:1px solid #000;padding:3px 6px;min-height:30px;font-size:9.5pt">${val}</td>
  </tr>
</table>`).join('')}

${sigRow([
  {zh:'技術部主管:',vi:'Chủ quản Kỹ thuật:'},
  {zh:'單位主管 :',vi:'Chủ quản đơn vị:'},
  {zh:'製表人:',vi:'Người lập biểu:'},
])}`
}

/* ─── 4. P-RS1 001-02.02 成品允收規格表 ─────────────────────────────── */
export function formFinishedProductSpec(data = {}) {
  const d = {
    masp: data.masp || 'GV-OL-V3-JP-001',
    tensp: data.tensp || 'Nước Cam Cô Đặc NFC 65°Brix',
    version: data.version || '1',
    date: data.date || '15/06/2026',
  }
  const techRows = [
    ['糖度Brix','≥65.0°Brix'],
    ['酸度Acid','3.2 – 4.0%'],
    ['pH','3.5 – 4.2'],
    ['甲醛態氮AN','&lt; 10'],
    ['固形物Solid','≥65.5%'],
    ['糖/酸比 Bx/Acid','16 – 22'],
    ['灰份Ash','&lt; 0.5%'],
    ['CPS','—'],
    ['雜質Tạp chất','Không có'],
  ]
  const microRows = [
    ['總生菌數TPC','&lt; 100 cfu/ml'],
    ['黴菌/酵母菌Y/M','&lt; 50 cfu/ml'],
    ['大腸桿菌群 Coliform','Không được có'],
  ]
  return `
<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid #000;padding-bottom:5px;margin-bottom:4px">
  <div>
    <div style="font-size:11pt;font-weight:bold">GIAVICO 國際食品責任有限公司</div>
    <div style="font-size:9pt">Công Ty TNHH Thực Phẩm Quoác teá Giavico</div>
    <div style="font-size:9pt">Giavico International Food Company Ltd</div>
    <div style="font-size:7.5pt">Cong Binh Hamlet, Tan Tay Commune, Tay Ninh Province, Viet Nam</div>
    <div style="font-size:7.5pt">TEL: (0272)599889/995 &nbsp; FAX: (0272)599995</div>
  </div>
  <div style="text-align:right">
    <div style="border:1.5px solid #000;padding:3px 10px;font-size:9pt;font-weight:bold">(表P-RS1 001-02.02)</div>
    <div style="font-size:7.5pt;text-align:center;margin-top:2px">儲存期限：永久<br>T/H löu tröõ: vónh vieãn</div>
  </div>
</div>
<div style="text-align:center;font-size:14pt;font-weight:bold;margin:6px 0 1px">成品允收規格表</div>
<div style="text-align:center;font-size:11pt;font-weight:bold;margin-bottom:4px">BAÛNG QUI CAÙCH NGHIỆM THU THÀNH PHẨM</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">版次: ${d.version} &nbsp; 年năm 月tháng 日ngày: ${d.date}</div>

<table style="width:100%;border-collapse:collapse">
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;width:50%" colspan="2">
      <div style="font-size:8pt">産品 Sản phẩm</div>
      <table style="width:100%;border-collapse:collapse;margin-top:2px">
        <tr><td style="border:1px solid #ccc;padding:2px 6px;font-size:8.5pt;width:35%">代號Mã số</td><td style="border:1px solid #ccc;padding:2px 6px;font-size:9pt"><b>${d.masp}</b></td></tr>
        <tr><td style="border:1px solid #ccc;padding:2px 6px;font-size:8.5pt">品名Tên gọi</td><td style="border:1px solid #ccc;padding:2px 6px;font-size:9pt"><b>${d.tensp}</b></td></tr>
      </table>
    </td>
    <td style="border:1px solid #000;padding:4px 8px;width:50%;vertical-align:top"></td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-top:4px">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:9pt;background:#f0f0f0;writing-mode:vertical-rl;text-orientation:mixed;width:60px;text-align:center" rowspan="${techRows.length}">技術指標<br>Chỉ tiêu kỹ thuật</td>
    ${techRows[0].map((c,i) => `<td style="border:1px solid #000;padding:3px 8px;${i===0?'width:50%;font-weight:bold':''}">${c}</td>`).join('')}
  </tr>
  ${techRows.slice(1).map(r => `<tr>${r.map((c,i) => `<td style="border:1px solid #000;padding:3px 8px;${i===0?'font-weight:bold':''}">${c}</td>`).join('')}</tr>`).join('')}
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:9pt;background:#f0f0f0;writing-mode:vertical-rl;text-orientation:mixed;text-align:center" rowspan="${microRows.length}">微生物指標<br>Chỉ tiêu vi sinh</td>
    ${microRows[0].map((c,i) => `<td style="border:1px solid #000;padding:3px 8px;${i===0?'font-weight:bold':''}">${c}</td>`).join('')}
  </tr>
  ${microRows.slice(1).map(r => `<tr>${r.map((c,i) => `<td style="border:1px solid #000;padding:3px 8px;${i===0?'font-weight:bold':''}">${c}</td>`).join('')}</tr>`).join('')}
  <tr><td colspan="2" style="border:1px solid #000;padding:3px 8px;font-weight:bold">存放條件Điều kiện bảo quản</td><td style="border:1px solid #000;padding:3px 8px">-18°C, kín khí, tránh ánh sáng trực tiếp</td></tr>
  <tr><td colspan="2" style="border:1px solid #000;padding:3px 8px;font-weight:bold">有效日期Hạn sử dụng</td><td style="border:1px solid #000;padding:3px 8px">18 tháng từ ngày sản xuất</td></tr>
  <tr><td colspan="2" style="border:1px solid #000;padding:3px 8px;font-weight:bold">重量/包裝Trọng lượng/bao bì</td><td style="border:1px solid #000;padding:3px 8px">230 kg ± 2% / Túi PE vô trùng 230L</td></tr>
</table>

${sigRow([
  {zh:'技術部主管',vi:'Chuû quaûn boä phaän'},
  {zh:'單位主管',vi:'Chuû quaûn ñôn vò'},
  {zh:'製表人',vi:'Ngöôøi laäp bieåu'},
])}`
}

/* ─── 5. P-RS1 003-09.03 半成品允收規格表 ────────────────────────────── */
export function formSemiProductSpec(data = {}) {
  const d = {
    materialName: data.materialName || 'Dịch quả cam sau chà lọc (BTP trước cô đặc)',
    chungLoai: data.chungLoai || 'BTP trong nước – Cam Valencia',
    masoNL: data.masoNL || 'BTP-OL-V3-2026',
    version: data.version || '1',
    date: data.date || '15/06/2026',
  }
  const nhapXuong = [
    ['Brix nguyên quả','≥11.0°Brix',''],
    ['Acid (%)','0.8 – 1.3%',''],
    ['pH','3.5 – 4.2',''],
    ['Màu sắc / Ngoại quan','Vàng tươi, không phân lớp',''],
    ['Mùi','Đặc trưng cam tươi, không lên men',''],
    ['Tạp chất','Không có hạt, xơ thô','Lọc 0.5mm'],
  ]
  const heavy = [
    ['Pb','≤ 2.00 mg/kg'],['Cu','≤ 30.00 mg/kg'],['Mn','0 mg/kg'],['Zn','≤ 40.00 mg/kg'],['As','≤ 1.00 mg/kg'],
  ]
  return `
${hdr('表 P-RS1 003-09.03')}
<div style="text-align:center;font-size:14pt;font-weight:bold;margin:6px 0 1px">半 成 品 允 收 規 格 表</div>
<div style="text-align:center;font-size:10pt;font-weight:bold;margin-bottom:4px">BẢNG QUI CÁCH NGHIỆM THU BÁN THÀNH PHẨM</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">版次 Phiên bản: ${d.version} &nbsp; 年Năm 月tháng 日ngày: ${d.date}</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:4px">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;width:40%"><div style="font-size:8pt">原料名稱:<br>Tên nguyên liệu:</div><b>${d.materialName}</b></td>
    <td style="border:1px solid #000;padding:3px 6px;width:30%"><div style="font-size:8pt">品 種<br>Chủng Loại :</div>${d.chungLoai}</td>
    <td style="border:1px solid #000;padding:3px 6px;width:30%"><div style="font-size:8pt">原料代號:<br>Mã Số Nguyên Liệu</div><b>${d.masoNL}</b></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:2px 6px"></td>
    <td style="border:1px solid #000;padding:2px 6px;text-align:center;font-weight:bold;font-size:8.5pt">國內半成品<br>Bán thành phẩm trong nước</td>
    <td style="border:1px solid #000;padding:2px 6px;text-align:center;font-weight:bold;font-size:8.5pt">國外半成品<br>Bán thành phẩm ngoài nước</td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:80px" colspan="2">項目<br>Hạng mục</th>
      <th style="border:1px solid #000;padding:3px 4px">要 求<br>Yêu cầu</th>
      <th style="border:1px solid #000;padding:3px 4px;width:80px">備 註<br>Ghi chú</th>
      <th style="border:1px solid #000;padding:3px 4px;width:44px">PP<br>Nội</th>
      <th style="border:1px solid #000;padding:3px 4px;width:44px">PP<br>Ngoại</th>
      <th style="border:1px solid #000;padding:3px 4px">檢驗方式<br>PP Kiểm Nghiệm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #000;padding:2px 4px;font-weight:bold;font-size:8.5pt;text-align:center;background:#f5f5f5;writing-mode:vertical-rl;text-orientation:mixed" rowspan="${nhapXuong.length + heavy.length + 1}">入廠<br>規格<br>Qui<br>Cách<br>Nhập<br>Xưởng</td>
      ${nhapXuong[0].map((c,i)=>`<td style="border:1px solid #000;padding:2px 5px${i===0?';font-weight:bold':''}">${c}</td>`).join('')}
      <td style="border:1px solid #000;padding:2px 5px;text-align:center">✓</td>
      <td style="border:1px solid #000;padding:2px 5px;text-align:center">✓</td>
      <td style="border:1px solid #000;padding:2px 5px">Khúc xạ kế Abbe</td>
    </tr>
    ${nhapXuong.slice(1).map((r,i) => `<tr>
      ${r.map((c,j)=>`<td style="border:1px solid #000;padding:2px 5px${j===0?';font-weight:bold':''}">${c}</td>`).join('')}
      <td style="border:1px solid #000;padding:2px 5px;text-align:center">✓</td>
      <td style="border:1px solid #000;padding:2px 5px;text-align:center">✓</td>
      <td style="border:1px solid #000;padding:2px 5px">${['Chuẩn độ NaOH','pH kế điện tử','Quan sát','Cảm quan','Lọc thử 0.5mm'][i]}</td>
    </tr>`).join('')}
    <tr>
      <td style="border:1px solid #000;padding:2px 5px;font-weight:bold;font-size:8.5pt;text-align:center;background:#f5f5f5" rowspan="${heavy.length}">重金屬標準<br>Kim loại nặng</td>
      ${heavy[0].map(c=>`<td style="border:1px solid #000;padding:2px 5px">${c}</td>`).join('')}
      <td style="border:1px solid #000;padding:2px 5px;text-align:center"></td>
      <td style="border:1px solid #000;padding:2px 5px;text-align:center"></td>
      <td style="border:1px solid #000;padding:2px 5px">ICP-MS</td>
    </tr>
    ${heavy.slice(1).map(r=>`<tr>${r.map(c=>`<td style="border:1px solid #000;padding:2px 5px">${c}</td>`).join('')}<td style="border:1px solid #000;padding:2px 5px;text-align:center"></td><td style="border:1px solid #000;padding:2px 5px;text-align:center"></td><td style="border:1px solid #000;padding:2px 5px">ICP-MS</td></tr>`).join('')}
    <tr>
      <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:8.5pt;text-align:center;background:#f5f5f5;writing-mode:vertical-rl;text-orientation:mixed" rowspan="3">使用<br>規格<br>Qui<br>Cách<br>Sử<br>Dụng</td>
      <td style="border:1px solid #000;padding:2px 5px;height:22px"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
    </tr>
    <tr>
      <td style="border:1px solid #000;height:22px"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
    </tr>
    <tr>
      <td style="border:1px solid #000;font-weight:bold;padding:2px 5px;font-size:8.5pt;background:#f5f5f5">農藥標準<br>Dư lượng thuốc trừ sâu</td>
      <td style="border:1px solid #000;padding:2px 5px;color:red;font-weight:bold">不得殘留<br>Không được có</td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000;padding:2px 5px">GC-MS</td>
    </tr>
  </tbody>
</table>

${sigRow([
  {zh:'執行副總',vi:'Phó tổng điều hành'},
  {zh:'品保主管',vi:'Chủ Quản QA'},
  {zh:'技術部主管',vi:'Chủ Quản Kỹ Thuật'},
  {zh:'製表人',vi:'Người Lập Biểu'},
])}`
}

/* ─── 6. P-RS1 003-03.02 原料允收規格表 ─────────────────────────────── */
export function formRawMaterialSpec(data = {}) {
  const d = {
    materialName: data.materialName || 'Cam Valencia tươi (Nguyên quả)',
    chungLoai: data.chungLoai || 'Nguyên Quả – Cam ngọt',
    masoNL: data.masoNL || 'NL-OL-TVNX-2026',
    version: data.version || '2',
    date: data.date || '15/06/2026',
  }
  const heavy = [
    ['Pb :','≤ 2.00 mg/kg'],['Cu:','≤ 30.00 mg/kg'],['Mn:','0 mg/kg'],['Zn :','≤ 40.00 mg/kg'],['As ：','≤ 1.00 mg/kg'],
  ]
  return `
${hdr('表P-RS1 003-03.02')}
<div style="text-align:center;font-size:14pt;font-weight:bold;margin:6px 0 1px">原 料 允 收 規 格 表</div>
<div style="text-align:center;font-size:10pt;font-weight:bold;margin-bottom:4px">BẢNG QUI CÁCH NGHIỆM THU NGUYÊN LIỆU</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">版次 Phiên bản: ${d.version} &nbsp; 年Năm 月tháng 日ngày: ${d.date}</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:4px">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;width:40%"><div style="font-size:8pt">原料名稱:<br>Tên nguyên liệu:</div><b>${d.materialName}</b></td>
    <td style="border:1px solid #000;padding:3px 6px;width:30%"><div style="font-size:8pt">品 種<br>Chủng Loại :</div>${d.chungLoai}</td>
    <td style="border:1px solid #000;padding:3px 6px;width:30%">
      <div style="font-size:8pt">原果<br>Nguyên Quả</div>
      <div style="font-size:8pt;margin-top:2px">原料代號:<br>Mã Số Nguyên Liệu</div><b>${d.masoNL}</b>
    </td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:70px" colspan="2">項目<br>Hạng mục</th>
      <th style="border:1px solid #000;padding:3px 4px">要 求<br>Yêu cầu</th>
      <th style="border:1px solid #000;padding:3px 4px;width:90px">備 註<br>Ghi chú</th>
      <th style="border:1px solid #000;padding:3px 4px;width:50px">PP Kiểm Nghiệm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #000;font-weight:bold;font-size:8.5pt;text-align:center;background:#f5f5f5;writing-mode:vertical-rl;text-orientation:mixed;width:30px" rowspan="7">入廠<br>規格<br>Qui<br>Cách<br>Nhập<br>Xưởng</td>
      <td style="border:1px solid #000;padding:2px 5px;height:22px">Brix nguyên quả</td>
      <td style="border:1px solid #000;padding:2px 5px">≥10.0°Brix</td>
      <td style="border:1px solid #000;padding:2px 5px">Đo tại nhập</td>
      <td style="border:1px solid #000;padding:2px 5px">Khúc xạ kế</td>
    </tr>
    <tr><td style="border:1px solid #000;padding:2px 5px">Acid (%)</td><td style="border:1px solid #000;padding:2px 5px">0.8 – 1.3%</td><td style="border:1px solid #000"></td><td style="border:1px solid #000;padding:2px 5px">Chuẩn độ NaOH</td></tr>
    <tr><td style="border:1px solid #000;padding:2px 5px">pH</td><td style="border:1px solid #000;padding:2px 5px">3.5 – 4.5</td><td style="border:1px solid #000"></td><td style="border:1px solid #000;padding:2px 5px">pH kế điện tử</td></tr>
    <tr><td style="border:1px solid #000;padding:2px 5px">Ngoại quan</td><td style="border:1px solid #000;padding:2px 5px">Tươi, không bệnh, không dập &gt;5%</td><td style="border:1px solid #000;padding:2px 5px">Loại bỏ quả thối</td><td style="border:1px solid #000;padding:2px 5px">Quan sát</td></tr>
    <tr><td style="border:1px solid #000;padding:2px 5px;height:22px"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td></tr>
    <tr>
      <td style="border:1px solid #000;padding:2px 5px;font-weight:bold;background:#f5f5f5;text-align:center;font-size:8.5pt" rowspan="${heavy.length}">重金屬標準<br>Kim loại nặng</td>
      <td style="border:1px solid #000;padding:2px 5px">${heavy[0][0]} ${heavy[0][1]}</td><td style="border:1px solid #000"></td><td style="border:1px solid #000;padding:2px 5px">ICP-MS / AAS</td>
    </tr>
    ${heavy.slice(1).map(r=>`<tr><td style="border:1px solid #000;padding:2px 5px">${r[0]} ${r[1]}</td><td style="border:1px solid #000"></td><td style="border:1px solid #000;padding:2px 5px">ICP-MS / AAS</td></tr>`).join('')}
    <tr>
      <td style="border:1px solid #000;font-weight:bold;font-size:8.5pt;text-align:center;background:#f5f5f5;writing-mode:vertical-rl;text-orientation:mixed" rowspan="4">使用<br>規格<br>Qui<br>Cách<br>Sử<br>Dụng</td>
      <td style="border:1px solid #000;height:22px"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
    </tr>
    <tr><td style="border:1px solid #000;height:22px"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td></tr>
    <tr>
      <td style="border:1px solid #000;padding:2px 5px;font-weight:bold;font-size:8.5pt;background:#f5f5f5;text-align:center">農藥標準<br>Dư lượng<br>thuốc trừ sâu</td>
      <td style="border:1px solid #000;padding:2px 5px;color:red;font-weight:bold">不得殘留<br>Không được có</td>
      <td style="border:1px solid #000"></td>
      <td style="border:1px solid #000;padding:2px 5px">GC-MS</td>
    </tr>
  </tbody>
</table>

${sigRow([
  {zh:'總經理',vi:'Tổng Giám Đốc'},
  {zh:'原料部主管',vi:'Chủ Quản Nguyên Liệu'},
  {zh:'技術部主管',vi:'Chủ Quản Kỹ Thuật'},
  {zh:'製表人',vi:'Người Lập Biểu'},
])}`
}

/* ─── 7. P-RS1 002-06.01 工程變更申請單 ─────────────────────────────── */
export function formOrderAnalysis(data = {}) {
  const d = {
    docCode: data.docCode || '',
    notifyDate: data.notifyDate || '14/06/2026',
    receiveDate: data.receiveDate || '14/06/2026',
    productCode: data.productCode || 'GV-OL-V3-JP-001',
    packing: data.packing || 'Túi vô trùng 230 kg/thùng',
    qty: data.qty || '20,000 kg',
    costRef: data.costRef || 'USD 1.80/kg (FOB)',
    yearQty: data.yearQty || '80,000 kg/năm',
    finishDate: data.finishDate || '29/07/2026',
    brix: data.brix || '≥ 65.0',
    acid: data.acid || '3.2 – 4.0%',
    ph: data.ph || '3.5 – 4.2',
    ...data
  }
  return `
${hdr('(表P-RS1 002-06.01)')}
<div style="text-align:center;font-size:14pt;font-weight:bold;margin:6px 0 1px">工程變更申請單</div>
<div style="text-align:center;font-size:11pt;font-weight:bold;margin-bottom:6px">BẢNG ĐỀ XUẤT THAY ĐỔI CÔNG TRÌNH</div>

<table style="width:100%;border-collapse:collapse;font-size:9.5pt">
  <tr>
    <td style="border:1px solid #000;padding:3px 8px" colspan="3">文件編號 mã số văn kiện ： <b>${d.docCode}</b></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px;width:38%">通知日期 ngày tháng thông báo： <b>${d.notifyDate}</b></td>
    <td style="border:1px solid #000;padding:3px 8px;width:32%">收件日期 ngày nhận： <b>${d.receiveDate}</b></td>
    <td style="border:1px solid #000;padding:3px 8px;width:30%">完成急迫度 Mức khẩn cấp<br>□急件 Văn kiện gấp &nbsp; ☑一般件 Văn kiện thường</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px">產品代號 Mã số sản phẩm: <b>${d.productCode}</b></td>
    <td style="border:1px solid #000;padding:3px 8px">包 裝 Bao bì: ${d.packing}</td>
    <td style="border:1px solid #000;padding:3px 8px">完成重要度 Mức quan trọng<br>☑ A &nbsp; □ B</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px">數 量 Số lượng: <b>${d.qty}</b></td>
    <td style="border:1px solid #000;padding:3px 8px">參考成本 Giá thành tkhảo: ${d.costRef}</td>
    <td style="border:1px solid #000;padding:3px 8px"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px">年預估量 SL dự tính năm: ${d.yearQty}</td>
    <td style="border:1px solid #000;padding:3px 8px">完成日期 Ngày tháng hthành: <b>${d.finishDate}</b></td>
    <td style="border:1px solid #000;padding:3px 8px"></td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-top:4px;font-size:9pt">
  <tr>
    <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;background:#f0f0f0;width:80px;text-align:center;writing-mode:vertical-rl;text-orientation:mixed" rowspan="4">銜接<br>規格<br>qui cách</td>
    <td style="border:1px solid #000;padding:3px 8px;width:50px">Brix</td>
    <td style="border:1px solid #000;padding:3px 8px">${d.brix}</td>
    <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;background:#f0f0f0;width:80px;text-align:center" rowspan="4">原因<br>分析<br>Phân tích<br>nguyên nhân</td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt;font-weight:bold;width:60px">原果<br>Nguyên trái</td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt">□ 短缺 Thiếu hụt<br>□ 收購價上揚 Giá mua tăng</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px">Acid</td>
    <td style="border:1px solid #000;padding:3px 8px">${d.acid}</td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt;font-weight:bold">業務<br>Kinh doanh</td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt">☑ 新訂單 Đơn đặt hàng mới<br>□ 客戶預估量不足 K-hàng ước tính slượng k đủ</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px">pH</td>
    <td style="border:1px solid #000;padding:3px 8px">${d.ph}</td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt;font-weight:bold">生管<br>Kế hoạch</td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt">□ 產季生產量不足 Lượng sxuất mùa vụ k đủ<br>□ 半成品銜接不足 Liên kết bthành phẩm k đủ</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px">其他 khác</td>
    <td style="border:1px solid #000;padding:3px 8px"></td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt;font-weight:bold">其他 khác</td>
    <td style="border:1px solid #000;padding:3px 8px;font-size:8.5pt">□ 去化庫存 Tiêu hóa tồn kho<br>□ 原料成分超出規格 Tphần nliệu vượt qui cách</td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-top:4px;font-size:9pt">
  <tr>
    <td style="border:1px solid #000;padding:3px 8px;width:50%;vertical-align:top">
      <b>現有成品與原料分析</b><br>Thành phẩm hiện có và phân tích nguyên liệu<br><br>
      Tồn kho BTP cam đông lạnh -18°C: 12,000 kg – đạt Brix 65.1
    </td>
    <td style="border:1px solid #000;padding:3px 8px;width:50%;vertical-align:top">
      <b>建議使用原料與半成品</b><br>Kiến nghị sử dụng nguyên liệu và bán thành phẩm<br>
      □ 附半成品 kèm Bán thành phẩm<br><br>
      Thu mua thêm ~18 tấn cam Valencia Tây Ninh (trái vụ)
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px" colspan="2"><b>結果 kết quả</b><br>&nbsp;</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:3px 8px;vertical-align:top" colspan="2">
      <b>備註 ghi chú</b><br>
      <span style="font-size:8.5pt">
        □ 審核 Xét duyệt &nbsp; □ 試作、成分分析表 Làm thử, biểu phân tích &nbsp; □ BOM表製作 Biểu BOM<br>
        □ 限度樣品製作 Giới hạn làm mẫu &nbsp; □ QC 工程圖 Sơ đồ công trình QC &nbsp; □ 生產作業標準 Tiêu chuẩn thao tác SX<br>
        □ 實驗製程通知單 Đơn thông báo quy trình thí nghiệm &nbsp; □ 實驗品轉現場品通知單 Đơn tbáo phẩm TN chuyển phẩm HT
      </span>
    </td>
  </tr>
</table>

${sigRow([
  {zh:'負責單位主管',vi:'Chủ quản đơn vị phụ trách'},
  {zh:'申請單位主管',vi:'Chủ quản đơn vị đề xuất'},
  {zh:'申請人',vi:'Người lập biểu'},
])}`
}

/* ─── 8. P-RS1 002-07.03 更改通知單 ─────────────────────────────────── */
export function formChangeNotice(data = {}) {
  const d = {
    productCode: data.productCode || 'GV-OL-V3-JP-001',
    version: data.version || '1',
    date: data.date || '17/06/2026',
  }
  return `
${hdr('(表P-RS1 002-07.03)')}
<div style="text-align:center;font-size:13pt;font-weight:bold;margin:6px 0 1px">產品製程、配方、規格更改通知單</div>
<div style="text-align:center;font-size:10pt;font-weight:bold;margin-bottom:4px">BAÛNG THOÂNG BAÙO SÖÛA ÑOÅI QUY TRÌNH、PHÖÔNG THÖÙC VÀ QUI CAÙCH</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">版次 : ${d.version} &nbsp; 年Naêm 月thaùng 日ngaøy: ${d.date}</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:4px">
  <tr>
    <td style="border:1px solid #000;padding:3px 8px;font-size:9.5pt">品名代號 Maõ soá saûn phaåm: <b>${d.productCode}</b></td>
  </tr>
</table>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:80px" colspan="2">修改項目<br>Haïng muïc söûa ñoåi</th>
      <th style="border:1px solid #000;padding:3px 4px">規 格<br>Qui caùch</th>
      <th style="border:1px solid #000;padding:3px 4px">配 方<br>Phöông thöùc</th>
      <th style="border:1px solid #000;padding:3px 4px">製 程<br>Quy trình</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #000;padding:3px 5px;font-weight:bold;background:#f5f5f5;writing-mode:vertical-rl;text-orientation:mixed;text-align:center" rowspan="2">修改<br>內容<br>Noäi<br>dung<br>söûa ñoåi</td>
      <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;white-space:nowrap;font-size:8.5pt">修改前<br>Tröôùc khi söûa ñoåi</td>
      <td style="border:1px solid #000;padding:3px 6px;height:48px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
    </tr>
    <tr>
      <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:8.5pt">修改後<br>Sau khi söûa ñoåi</td>
      <td style="border:1px solid #000;padding:3px 6px;height:48px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
    </tr>
    <tr>
      <td style="border:1px solid #000;padding:3px 6px;font-weight:bold" colspan="2">備 註 / Ghi chuù</td>
      <td style="border:1px solid #000;padding:3px 6px;height:36px" colspan="3"></td>
    </tr>
  </tbody>
</table>

${sigRow([
  {zh:'總經理',vi:'Toång Giaùm ñoác'},
  {zh:'執行副總',vi:'Phó tổng điều hành'},
  {zh:'技術部主管',vi:'Chuû quaûn Boä phaän Kyõ thuaät'},
  {zh:'單位主管',vi:'Chuû quaûn ñôn vò'},
  {zh:'製表人',vi:'Ngöôøi laäp bieåu'},
])}`
}

/* ─── 9. P-RS1 002-01.07 製程配方規格提議更改單 ─────────────────────── */
export function formChangeProposal(data = {}) {
  const d = {
    productCode: data.productCode || 'GV-OL-V3-JP-001',
    date: data.date || '17/06/2026',
  }
  return `
${hdr('(表P-RS1 002-01.07)')}
<div style="text-align:center;font-size:13pt;font-weight:bold;margin:6px 0 1px">製程、配方、規格提議更改單</div>
<div style="text-align:center;font-size:10pt;font-weight:bold;margin-bottom:4px">BẢNG ĐỀ XUẤT THAY ĐỔI QUY TRÌNH、PHƯƠNG THỨC VÀ QUI CÁCH</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">年Năm 月 tháng 日ngày: ${d.date}</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:4px">
  <tr><td style="border:1px solid #000;padding:3px 8px">產品代號 Mã số sản phẩm: <b>${d.productCode}</b></td></tr>
</table>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:100px" colspan="2">修改項目<br>Hạng mục sửa đổi</th>
      <th style="border:1px solid #000;padding:3px 4px">規 格<br>Qui cách</th>
      <th style="border:1px solid #000;padding:3px 4px">配 方<br>Phương thức</th>
      <th style="border:1px solid #000;padding:3px 4px">製 程<br>Quy trình</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #000;padding:3px 5px;font-weight:bold;background:#f5f5f5;writing-mode:vertical-rl;text-orientation:mixed;text-align:center" rowspan="2">修<br>改<br>內<br>容<br>Nội<br>dung<br>sửa<br>đổi</td>
      <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:8.5pt">標準書<br>Trong Văn Bản Tiêu Chuẩn</td>
      <td style="border:1px solid #000;padding:3px 6px;height:48px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
    </tr>
    <tr>
      <td style="border:1px solid #000;padding:3px 6px;font-weight:bold;font-size:8.5pt">提議更改<br>đề xuất sửa đổi</td>
      <td style="border:1px solid #000;padding:3px 6px;height:48px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
      <td style="border:1px solid #000;padding:3px 6px;vertical-align:top"></td>
    </tr>
    <tr><td style="border:1px solid #000;padding:3px 6px;font-weight:bold" colspan="2">時間開始 Thời điểm bắt đầu</td><td style="border:1px solid #000;padding:3px 6px;height:28px" colspan="3"></td></tr>
    <tr><td style="border:1px solid #000;padding:3px 6px;font-weight:bold" colspan="2">更改原因 Lý do sửa đổi</td><td style="border:1px solid #000;padding:3px 6px;height:36px;vertical-align:top" colspan="3"></td></tr>
    <tr><td style="border:1px solid #000;padding:3px 6px;font-weight:bold" colspan="2">備註 Ghi chú</td><td style="border:1px solid #000;padding:3px 6px;height:28px" colspan="3"></td></tr>
  </tbody>
</table>

${sigRow([
  {zh:'總經理',vi:'Tổng Giám đốc'},
  {zh:'執行副總',vi:'Phó Tổng điều hành'},
  {zh:'技術部主管:',vi:'Chủ quản Bộ phận Kỹ thuật'},
  {zh:'品保&生產 部主管',vi:'Chủ quản Bộ phận QA & SX'},
  {zh:'單位主管',vi:'Chủ quản đơn vị'},
  {zh:'製表人：',vi:'Ngườilập biểu'},
])}`
}

/* ─── 10. P-RS1 002-05.04 工程變更通知單 ────────────────────────────── */
export function formEngineeringChangeNotice(data = {}) {
  const d = {
    productName: data.productName || 'Nước Cam Cô Đặc NFC 65°Brix',
    date: data.date || '17/06/2026',
    implDate: data.implDate || '29/07/2026',
  }
  return `
${hdr('表P-RS1 002-05.04')}
<div style="text-align:center;font-size:13pt;font-weight:bold;margin:6px 0 1px">工程變更通知單</div>
<div style="text-align:center;font-size:10pt;font-weight:bold;margin-bottom:4px">BẢNG THAY ĐỔI QUI TRÌNH VÀ PHƯƠNG THỨC</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">日期： ${d.date}</div>

<table style="width:100%;border-collapse:collapse;font-size:9.5pt">
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;width:130px;background:#f5f5f5">品名<br>Tên sản phẩm</td>
    <td style="border:1px solid #000;padding:4px 8px">${d.productName}</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">修改項目<br>Hạng mục sửa đổi</td>
    <td style="border:1px solid #000;padding:4px 8px;height:30px"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">修改前 Trước sửa đổi</td>
    <td style="border:1px solid #000;padding:4px 8px;height:50px;vertical-align:top"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5"></td>
    <td style="border:1px solid #000;padding:4px 8px;height:20px"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">修改後 Sau sửa đổi</td>
    <td style="border:1px solid #000;padding:4px 8px;height:50px;vertical-align:top"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5"></td>
    <td style="border:1px solid #000;padding:4px 8px;height:20px"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">製 程 Qui trình：</td>
    <td style="border:1px solid #000;padding:4px 8px;height:40px;vertical-align:top"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">備註 ghi chú :</td>
    <td style="border:1px solid #000;padding:4px 8px;height:30px"></td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">預計實施日期<br>Dự tính ngày thực hiện</td>
    <td style="border:1px solid #000;padding:4px 8px">${d.implDate}</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">變更方式<br>cách thay đổi</td>
    <td style="border:1px solid #000;padding:4px 8px">□正常 Bình thường &nbsp; □階段 giai đoạn &nbsp; □臨時 tạm thời</td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">更改因素<br>Thay đổi các yếu tố</td>
    <td style="border:1px solid #000;padding:4px 8px;font-size:9pt">
      □A：安全性 tính an toàn &nbsp; □B：原料 nguyên liệu<br>
      □C：輔料 phụ liệu &nbsp; □D：客戶需求 khách hàng yêu cầu<br>
      □E：消化庫存 xử lý hàng tồn<br>
      □F：規格、製程更改 sửa đổi qui cách、qui trình<br>
      □G：其他 các khác
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #000;padding:4px 8px;font-weight:bold;background:#f5f5f5">限度樣品<br>Giới hạn mẫu</td>
    <td style="border:1px solid #000;padding:4px 8px">□半成品 bán thành phẩm &nbsp; □殺菌前 trước sát khuẩn &nbsp; □成品 thành phẩm</td>
  </tr>
</table>

${sigRow([
  {zh:'總經理',vi:'Toång Giaùm ñoác'},
  {zh:'執行副總',vi:'Phó Tổng điều hành'},
  {zh:'技術部主管',vi:'Chuû quaûn Boä phaän Kyõ thuaät'},
  {zh:'單位主管',vi:'Chuû quaûn ñôn vò'},
  {zh:'製表人',vi:'Ngöôøi laäp bieåu'},
])}`
}

/* ─── 11. P-RS1 002-02.02 新產品製作通知單 回收簽收單 ───────────────── */
export function formReceiptNotice(data = {}) {
  return `
${hdr('(表P-RS1 002-02.02)')}
<div style="text-align:center;font-size:12pt;font-weight:bold;margin:6px 0 1px">〝新產品製作通知單〞回收簽收單</div>
<div style="text-align:center;font-size:9.5pt;font-weight:bold;margin-bottom:6px">BAÛNG KYÙ NHAÄN VAØ THU HOÀI "BAÛNG THOÂNG BAÙO CHEÁ BIEÁN SAÛN PHAÅM"</div>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:28px">Stt</th>
      <th style="border:1px solid #000;padding:3px 4px">產品代號<br>Maõ soá saûn phaåm</th>
      <th style="border:1px solid #000;padding:3px 4px">產品名稱<br>Teân saûn phaåm</th>
      <th style="border:1px solid #000;padding:3px 4px">製定日期<br>Ngaøy laäp</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞日期<br>Ngaøy giao</th>
      <th style="border:1px solid #000;padding:3px 4px">收件者<br>Ngöôøi nhaän</th>
      <th style="border:1px solid #000;padding:3px 4px">回收日期<br>Ngaøy thu hoài</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞者<br>Ngöôøi giao</th>
      <th style="border:1px solid #000;padding:3px 4px">備註<br>Ghi chuù</th>
    </tr>
  </thead>
  <tbody>
    ${Array.from({length:19},(_,i)=>`<tr style="height:22px">
      <td style="border:1px solid #000;text-align:center">${i+1===1?'1':''}</td>
      ${i===0?'<td style="border:1px solid #000;padding:2px 4px">GV-OL-V3-JP-001</td><td style="border:1px solid #000;padding:2px 4px">Cam NFC 65°Brix</td><td style="border:1px solid #000;padding:2px 4px">15/06/2026</td><td style="border:1px solid #000;padding:2px 4px">15/06/2026</td><td style="border:1px solid #000;padding:2px 4px">Sản Xuất</td><td style="border:1px solid #000"></td><td style="border:1px solid #000;padding:2px 4px">R&D</td><td style="border:1px solid #000;padding:2px 4px">Phát hành v1</td>':'<td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>'}
    </tr>`).join('')}
  </tbody>
</table>`
}

/* ─── 12. P-RS1 002-04.01 新產品規格說明單 回收簽收單 ───────────────── */
export function formReceiptSpec(data = {}) {
  return `
${hdr('(表P-RS1 002-04.01)')}
<div style="text-align:center;font-size:12pt;font-weight:bold;margin:6px 0 1px">〝新產品規格說明單〞回收簽收單</div>
<div style="text-align:center;font-size:9.5pt;margin-bottom:6px">儲存期限：永久 &nbsp; T/H löu tröõ: vónh vieãn</div>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:28px">Stt</th>
      <th style="border:1px solid #000;padding:3px 4px">產品代號<br>Maõ soá saûn phaåm</th>
      <th style="border:1px solid #000;padding:3px 4px">製定日期<br>Ngaøy laäp</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞日期<br>Ngaøy giao</th>
      <th style="border:1px solid #000;padding:3px 4px">收件者<br>Ngöôøi nhaän</th>
      <th style="border:1px solid #000;padding:3px 4px">回收日期<br>Ngaøy thu hoài</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞者<br>Ngöôøi giao</th>
      <th style="border:1px solid #000;padding:3px 4px">備註<br>Ghi chuù</th>
    </tr>
  </thead>
  <tbody>
    ${Array.from({length:19},(_,i)=>`<tr style="height:22px">
      <td style="border:1px solid #000;text-align:center">${i+1}</td>
      <td style="border:1px solid #000;padding:2px 4px">${i===0?'GV-OL-V3-JP-001':''}</td>
      <td style="border:1px solid #000;padding:2px 4px">${i===0?'15/06/2026':''}</td>
      <td style="border:1px solid #000;padding:2px 4px">${i===0?'15/06/2026':''}</td>
      <td style="border:1px solid #000;padding:2px 4px">${i===0?'QA Manager':''}</td>
      <td style="border:1px solid #000"></td>
      <td style="border:1px solid #000;padding:2px 4px">${i===0?'R&D':''}</td>
      <td style="border:1px solid #000;padding:2px 4px">${i===0?'Nội bộ QC':''}</td>
    </tr>`).join('')}
  </tbody>
</table>`
}

/* ─── 13. P-RS1 002-03.02 更改通知單 回收簽收單 ─────────────────────── */
export function formReceiptChangeNotice(data = {}) {
  return `
${hdr('(表P-RS1 002-03.02)')}
<div style="text-align:center;font-size:12pt;font-weight:bold;margin:6px 0 1px">〝產品製程，配方，規格更改通知單〞回收簽收單</div>
<div style="text-align:center;font-size:9pt;margin-bottom:6px">Baûng kyù nhaän vaø thu hoài " Baûng thoâng baùo söûa ñoåi quy trình , phöông thöùc , qui caùch"</div>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:28px">Stt</th>
      <th style="border:1px solid #000;padding:3px 4px">產品代號<br>Maõ soá saûn phaåm</th>
      <th style="border:1px solid #000;padding:3px 4px">產品名稱<br>Teân saûn phaåm</th>
      <th style="border:1px solid #000;padding:3px 4px">製定日期<br>Ngaøy laäp</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞日期<br>Ngaøy giao</th>
      <th style="border:1px solid #000;padding:3px 4px">收件者<br>Ngöôøi nhaän</th>
      <th style="border:1px solid #000;padding:3px 4px">回收日期<br>Ngaøy thu hoài</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞者<br>Ngöôøi giao</th>
      <th style="border:1px solid #000;padding:3px 4px">備註<br>Ghi chuù</th>
    </tr>
  </thead>
  <tbody>
    ${Array.from({length:16},(_,i)=>`<tr style="height:22px">
      <td style="border:1px solid #000;text-align:center">${i+1}</td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
    </tr>`).join('')}
  </tbody>
</table>`
}

/* ─── 14. P-RS1 003-10.01 半成品允收規格表 回收簽收單 ───────────────── */
export function formReceiptSemiSpec(data = {}) {
  return `
${hdr('(表P-RS1 003-10.01)')}
<div style="text-align:center;font-size:12pt;font-weight:bold;margin:6px 0 1px">〝半成品允收規格表〞回收簽收單</div>
<div style="text-align:center;font-size:9.5pt;font-weight:bold;margin-bottom:6px">BẢNG KÝ NHẬN VÀ THU HỒI "BẢNG QUI CÁCH NGHIỆM THU BÁN THÀNH PHẨM"</div>

<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead>
    <tr style="background:#e8e8e8">
      <th style="border:1px solid #000;padding:3px 4px;width:28px">Stt</th>
      <th style="border:1px solid #000;padding:3px 4px">產品代號<br>Mã số sản phẩm</th>
      <th style="border:1px solid #000;padding:3px 4px">原料名稱<br>Tên nguyên liệu</th>
      <th style="border:1px solid #000;padding:3px 4px">製定日期<br>Ngày lập</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞日期<br>Ngày giao</th>
      <th style="border:1px solid #000;padding:3px 4px">收件者<br>Người nhận</th>
      <th style="border:1px solid #000;padding:3px 4px">回收日期<br>Ngày thu hồi</th>
      <th style="border:1px solid #000;padding:3px 4px">傳遞者<br>Người giao</th>
      <th style="border:1px solid #000;padding:3px 4px">備註<br>Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    ${Array.from({length:19},(_,i)=>`<tr style="height:22px">
      <td style="border:1px solid #000;text-align:center">${i+1}</td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
      <td style="border:1px solid #000"></td><td style="border:1px solid #000"></td>
    </tr>`).join('')}
  </tbody>
</table>`
}

/* ─── 15. P-RS1 001-06.03 協調會 產品確認單 (encrypted – recreated) ─── */
export function formProductConfirm(data = {}) {
  return `
${hdr('(表P-RS1 001-06.03)')}
<div style="text-align:center;font-size:13pt;font-weight:bold;margin:6px 0 1px">協調會 – 產品確認單</div>
<div style="text-align:center;font-size:10pt;font-weight:bold;margin-bottom:4px">BIÊN BẢN HỌP PHỐI HỢP – BẢNG XÁC ĐỊNH SẢN PHẨM</div>
<div style="text-align:right;font-size:8.5pt;margin-bottom:4px">Số BB: BB-2026-0615-001 &nbsp;|&nbsp; Ngày: 15/06/2026 &nbsp;|&nbsp; 14:00 – 15:30</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:4px;font-size:9.5pt">
  <tr><td style="border:1px solid #000;padding:3px 8px;font-weight:bold;width:160px;background:#f5f5f5">Địa điểm</td><td style="border:1px solid #000;padding:3px 8px">Phòng họp R&D – Nhà máy Giavico Tây Ninh</td></tr>
  <tr><td style="border:1px solid #000;padding:3px 8px;font-weight:bold;background:#f5f5f5">Mã sản phẩm</td><td style="border:1px solid #000;padding:3px 8px"><b>GV-OL-V3-JP-001</b></td></tr>
  <tr><td style="border:1px solid #000;padding:3px 8px;font-weight:bold;background:#f5f5f5">Tên sản phẩm</td><td style="border:1px solid #000;padding:3px 8px"><b>Nước Cam Cô Đặc NFC 65°Brix – Concentrated Orange Juice</b></td></tr>
  <tr><td style="border:1px solid #000;padding:3px 8px;font-weight:bold;background:#f5f5f5">Khách hàng</td><td style="border:1px solid #000;padding:3px 8px">Sunny Foods Japan Co., Ltd – Tanaka Hiroshi (Procurement Mgr.)</td></tr>
  <tr><td style="border:1px solid #000;padding:3px 8px;font-weight:bold;background:#f5f5f5">Đơn hàng</td><td style="border:1px solid #000;padding:3px 8px">EM-2026-0614 | 20,000 kg | FOB Tây Ninh | USD 1.82/kg</td></tr>
</table>

<div style="font-weight:bold;font-size:9.5pt;background:#e8e8e8;border:1px solid #000;border-bottom:none;padding:4px 8px">Thành phần tham dự / 與會人員</div>
<table style="width:100%;border-collapse:collapse;font-size:9.5pt">
  <thead><tr style="background:#f5f5f5"><th style="border:1px solid #000;padding:3px 6px">Bộ phận</th><th style="border:1px solid #000;padding:3px 6px">Đại diện</th><th style="border:1px solid #000;padding:3px 6px">Chức vụ</th><th style="border:1px solid #000;padding:3px 6px;width:90px">Xác nhận</th></tr></thead>
  <tbody>
    ${[
      ['R&D / Kỹ Thuật','Nguyễn Văn An','Chủ Quản Kỹ Thuật','✓'],
      ['QA / Chất Lượng','Trần Thị Bảo','Chủ Quản QA','✓'],
      ['Sản Xuất','Phạm Minh Đức','Trưởng Sản Xuất','✓'],
      ['Kế Hoạch','Lê Thu Hương','Kế Hoạch SX','✓'],
      ['Kho / Nguyên Liệu','Vũ Anh Khoa','Thủ Kho','✓'],
      ['Kinh Doanh','Ngô Bảo Linh','Sale Manager','✓'],
      ['Ban Điều Hành','Lý Minh Phúc','Phó Tổng Điều Hành','✓'],
    ].map(([d,r,p,s])=>`<tr><td style="border:1px solid #000;padding:3px 6px">${d}</td><td style="border:1px solid #000;padding:3px 6px"><b>${r}</b></td><td style="border:1px solid #000;padding:3px 6px">${p}</td><td style="border:1px solid #000;padding:3px 6px;text-align:center">${s}</td></tr>`).join('')}
  </tbody>
</table>

<div style="font-weight:bold;font-size:9.5pt;background:#e8e8e8;border:1px solid #000;border-bottom:none;border-top:none;padding:4px 8px;margin-top:4px">Nội dung thảo luận</div>
<table style="width:100%;border-collapse:collapse;font-size:9pt">
  <thead><tr style="background:#f5f5f5"><th style="border:1px solid #000;padding:3px 4px;width:24px">#</th><th style="border:1px solid #000;padding:3px 6px;width:100px">Vấn đề</th><th style="border:1px solid #000;padding:3px 6px">Kết quả / Quyết định</th><th style="border:1px solid #000;padding:3px 6px;width:80px">Phụ trách</th></tr></thead>
  <tbody>
    <tr><td style="border:1px solid #000;text-align:center">1</td><td style="border:1px solid #000;padding:3px 6px">Quy cách kỹ thuật</td><td style="border:1px solid #000;padding:3px 6px">Brix 65.2°, Acid 3.45%, pH 3.72 – ĐẠT tiêu chuẩn JAS và nội bộ. COA đã gửi KH.</td><td style="border:1px solid #000;padding:3px 6px">R&D / QA</td></tr>
    <tr><td style="border:1px solid #000;text-align:center">2</td><td style="border:1px solid #000;padding:3px 6px">Nguyên liệu</td><td style="border:1px solid #000;padding:3px 6px">BTP 12,000 kg đạt chuẩn. Thu mua thêm ~18 tấn cam Tây Ninh (01–05/07).</td><td style="border:1px solid #000;padding:3px 6px">Kho / NL</td></tr>
    <tr><td style="border:1px solid #000;text-align:center">3</td><td style="border:1px solid #000;padding:3px 6px">Kế hoạch SX</td><td style="border:1px solid #000;padding:3px 6px">Dây chuyền #1 sẵn sàng tuần 28 (08/07). Hoàn thành 26/07/2026.</td><td style="border:1px solid #000;padding:3px 6px">Kế Hoạch</td></tr>
    <tr><td style="border:1px solid #000;text-align:center">4</td><td style="border:1px solid #000;padding:3px 6px">Giá & Giao hàng</td><td style="border:1px solid #000;padding:3px 6px">FOB USD 1.82/kg. Container 20ft lạnh. Giao dự kiến 29/07/2026.</td><td style="border:1px solid #000;padding:3px 6px">Kinh Doanh</td></tr>
  </tbody>
</table>

<div style="font-weight:bold;font-size:9.5pt;background:#e8e8e8;border:1px solid #000;border-bottom:none;border-top:none;padding:4px 8px;margin-top:4px">Kết luận / 結論</div>
<div style="border:1px solid #000;padding:6px 10px;font-size:9.5pt">
  ✅ CHẤP THUẬN SẢN XUẤT – 7/7 bộ phận đồng thuận.<br>
  <b>Mã lệnh SX:</b> LS-GV-2026-0614-001 &nbsp;|&nbsp; <b>Ngày xuất lệnh:</b> 17/06/2026
</div>

${sigRow([
  {zh:'總經理',vi:'Tổng Giám Đốc'},
  {zh:'執行副總',vi:'Phó Tổng ĐH'},
  {zh:'技術部主管',vi:'Chủ Quản KT'},
  {zh:'品保主管',vi:'Chủ Quản QA'},
  {zh:'製表人',vi:'Người Lập Biểu'},
])}`
}

/* ─── alias kept for backward compat ─── */
export const formDocumentReceipt = formReceiptNotice
