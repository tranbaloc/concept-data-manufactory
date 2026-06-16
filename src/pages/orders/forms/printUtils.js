// Utility: open a new window with form HTML and trigger print → Save as PDF
export function printFormWindow(htmlContent, title) {
  const win = window.open('', '_blank', 'width=900,height=1100')
  win.document.write(`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; background: #fff; padding: 0; }
    
    .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 15mm 20mm 20mm 20mm; }
    
    /* Header */
    .form-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 4px; border-bottom: 2px solid #000; padding-bottom: 6px; }
    .company-name { font-size: 11pt; font-weight: bold; line-height: 1.4; }
    .company-sub { font-size: 9pt; color: #333; }
    .form-code-box { border: 1px solid #000; padding: 4px 10px; text-align: center; font-size: 9pt; font-weight: bold; }
    .storage-info { font-size: 8pt; text-align: center; margin-top: 4px; }
    
    /* Title */
    .form-title { text-align: center; margin: 10px 0 14px; }
    .form-title .zh { font-size: 15pt; font-weight: bold; letter-spacing: 1px; display: block; }
    .form-title .vi { font-size: 12pt; font-weight: bold; text-transform: uppercase; display: block; margin-top: 3px; color: #333; }
    .form-title .code { font-size: 9pt; color: #555; margin-top: 4px; display: block; }
    
    /* Info row */
    .info-row { display: flex; gap: 0; margin-bottom: 0; }
    .info-cell { flex: 1; border: 1px solid #000; padding: 4px 8px; font-size: 10pt; }
    .info-cell + .info-cell { border-left: none; }
    .info-label { font-size: 8.5pt; color: #555; display: block; }
    .info-val { font-weight: bold; font-size: 10pt; display: block; min-height: 16px; }
    
    /* Table */
    table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 10pt; }
    th { background: #e8e8e8; border: 1px solid #000; padding: 5px 8px; font-size: 9.5pt; text-align: center; font-weight: bold; }
    td { border: 1px solid #000; padding: 5px 8px; vertical-align: middle; }
    td.center { text-align: center; }
    td.label { background: #f5f5f5; font-weight: bold; font-size: 9.5pt; }
    .empty-row td { height: 28px; }
    
    /* Section */
    .section-title { font-weight: bold; font-size: 10pt; background: #e8e8e8; border: 1px solid #000; border-bottom: none; padding: 5px 10px; margin-top: 10px; }
    
    /* Signature */
    .sig-row { display: flex; margin-top: 20px; gap: 0; }
    .sig-cell { flex: 1; border: 1px solid #000; padding: 6px 10px 30px; text-align: center; }
    .sig-cell + .sig-cell { border-left: none; }
    .sig-label-zh { font-size: 9.5pt; font-weight: bold; display: block; }
    .sig-label-vi { font-size: 8.5pt; color: #444; display: block; margin-top: 2px; }
    
    /* Checkbox */
    .cb-row { margin: 6px 0; display: flex; gap: 20px; flex-wrap: wrap; font-size: 10pt; }
    .cb-item { display: flex; align-items: center; gap: 5px; }
    .cb-box { width: 13px; height: 13px; border: 1px solid #000; display: inline-block; }
    .cb-box.checked { background: #333; }
    
    .note { font-size: 9pt; color: #444; margin: 6px 0; font-style: italic; }
    .bold { font-weight: bold; }
    .center { text-align: center; }
    .mt8 { margin-top: 8px; }
    .small { font-size: 8.5pt; }
    
    /* Print controls */
    .print-bar { position: fixed; top: 0; left: 0; right: 0; background: #1a56db; color: #fff; padding: 10px 20px; display: flex; align-items: center; gap: 12px; z-index: 999; font-family: Arial, sans-serif; font-size: 13px; }
    .print-btn { background: #fff; color: #1a56db; border: none; padding: 6px 18px; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 13px; }
    .print-btn:hover { background: #e0edff; }
    .close-btn { background: transparent; color: rgba(255,255,255,.8); border: 1px solid rgba(255,255,255,.4); padding: 5px 14px; border-radius: 5px; cursor: pointer; font-size: 12px; margin-left: auto; }
    
    @media print {
      .print-bar { display: none !important; }
      .page { padding: 10mm 15mm 15mm 15mm; }
      body { font-size: 10pt; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <span>📄 Biểu mẫu: <b>${title}</b></span>
    <button class="print-btn" onclick="window.print()">🖨️ In / Tải PDF</button>
    <button class="close-btn" onclick="window.close()">✕ Đóng</button>
  </div>
  <div style="height:50px"></div>
  <div class="page">
    ${htmlContent}
  </div>
</body>
</html>`)
  win.document.close()
}
