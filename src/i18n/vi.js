export default {
  // ── Topbar ──────────────────────────────────────────────
  topbar: {
    platform: 'GIAVICO AI Platform',
    orderFlow: '📦 Quy Trình Đơn Hàng',
    month: 'Tháng',
    year: '2026',
  },

  // ── Sidebar nav labels ───────────────────────────────────
  nav: {
    overview: 'Tổng quan',
    architecture: 'Kiến Trúc Hệ Thống',

    sectionOrder: '📦 Quy Trình Đơn Hàng',
    pipeline: 'Pipeline Tổng Quan',
    inbox: '① Nhận Email Đơn Hàng',
    summary: '② Tổng Hợp & Phân Tích',
    sampleReport: '③ R&D Sample Report',
    newProductNotice: '④ Thông Báo Chế Biến',
    acceptanceSpecs: '⑤ Quy Cách Nghiệm Thu',
    productConfirm: '⑥ Xác Nhận Sản Phẩm',
    productionOrder: '⑦ Xuất Lệnh Sản Xuất',
    engineeringChange: '🔄 Thay Đổi Kỹ Thuật',

    sectionRD: 'R&D – Nghiên Cứu Phát Triển',
    formulaGen: 'Tạo Formula AI',
    batchCalc: 'Tính Toán Batch',
    formulaCompare: 'So Sánh Formula',
    bom: 'Quản Lý BOM',

    sectionPlanning: 'Kế Hoạch Sản Xuất',
    schedule: 'Lịch Sản Xuất',

    sectionFacilities: 'Công Vụ & Sản Xuất',
    equipment: 'Bảo Trì Thiết Bị',
    energy: 'Quản Lý Năng Lượng',
    production: 'Hỗ Trợ Sản Xuất',
    safety: 'An Toàn & Rủi Ro',
    repair: 'Báo Sửa Chữa',
    knowledge: 'Tài Liệu & Kiến Thức',

    sectionWarehouse: 'Quản Kho',
    translation: 'Dịch Thuật AI',
    reconciliation: 'Đối Chiếu Excel',
    inventory: 'Quản Lý Tồn Kho',
    workhour: 'Tính Giờ Công',
    packaging: 'Theo Dõi Bao Bì',
    statistics: 'Thống Kê Tổng Hợp',

    sectionManagement: 'Quản Lý',
    delivery: 'Tính Ngày Giao Hàng',
  },

  // ── Page titles (topbar breadcrumb) ─────────────────────
  pageTitles: {
    '/dashboard': 'Tổng Quan',
    '/architecture': 'Kiến Trúc Hệ Thống',
    '/orders/pipeline': 'Pipeline Đơn Hàng',
    '/orders/inbox': 'Bước 1 – Nhận Email Đơn Hàng',
    '/orders/summary': 'Bước 2 – Tổng Hợp & Phân Tích',
    '/orders/sample-report': 'Bước 3 – R&D Sample Report',
    '/orders/new-product-notice': 'Bước 4 – Thông Báo Chế Biến',
    '/orders/acceptance-specs': 'Bước 5 – Quy Cách Nghiệm Thu',
    '/orders/product-confirm': 'Bước 6 – Xác Nhận Sản Phẩm',
    '/orders/production-order': 'Bước 7 – Xuất Lệnh Sản Xuất',
    '/rd/formula-gen': 'Tạo Formula AI',
    '/rd/batch-calc': 'Tính Toán Batch',
    '/rd/formula-compare': 'So Sánh Formula',
    '/rd/bom': 'Quản Lý BOM',
    '/planning/schedule': 'Lịch Sản Xuất',
    '/facilities/equipment': 'Bảo Trì Thiết Bị',
    '/facilities/energy': 'Quản Lý Năng Lượng',
    '/facilities/production': 'Hỗ Trợ Sản Xuất',
    '/facilities/safety': 'An Toàn & Rủi Ro',
    '/facilities/repair': 'Báo Sửa Chữa Thông Minh',
    '/facilities/knowledge': 'Tài Liệu & Kiến Thức',
    '/warehouse/translation': 'Dịch Thuật AI',
    '/warehouse/reconciliation': 'Đối Chiếu Excel',
    '/warehouse/inventory': 'Quản Lý Tồn Kho',
    '/warehouse/workhour': 'Tính Giờ Công',
    '/warehouse/packaging': 'Theo Dõi Bao Bì',
    '/warehouse/statistics': 'Thống Kê Dữ Liệu Tổng Hợp',
    '/management/delivery': 'Tính Ngày Giao Hàng',
  },

  // ── Dashboard ────────────────────────────────────────────
  dashboard: {
    title: 'Tổng Quan Hệ Thống AI',
    subtitle: 'Giavico AI Platform · Cập nhật:',
    systemStable: 'Hệ thống ổn định',

    kpi: {
      activeUsers: 'Người dùng hoạt động',
      activeUsersSub: '▲ +12 so tháng trước',
      aiRequests: 'Yêu cầu AI hôm nay',
      aiRequestsSub: 'Đỉnh 14:00–15:00 (210 req)',
      activeModules: 'Modules hoạt động',
      responseTime: 'Thời gian phản hồi TB',
      responseTimeSub: '▼ Giảm 33% so T1/2026',
      testing: 'đang thử nghiệm',
    },

    charts: {
      deptEfficiency: '📈 Hiệu quả sử dụng theo bộ phận (%)',
      hourlyRequests: '📊 Yêu cầu theo giờ hôm nay',
      requestByDept: '🍩 Phân bổ yêu cầu theo bộ phận',
      responseTimeTrend: '⏱️ Xu hướng thời gian phản hồi (giây)',
      hourlyNote: 'Đường cam = ngưỡng cao (150 req/h)',
      responseTrendNote: '▼ Giảm từ 1.8s → 1.2s (–33%) trong 6 tháng',
      target: 'Mục tiêu',
    },

    modules: {
      title: '📋 Trạng thái modules',
      dept: 'Bộ phận',
      module: 'Module',
      status: 'Trạng thái',
      users: 'Người dùng',
      reqMonth: 'Req/tháng',
      vsPrev: 'So tháng trước',
      uptime: 'Uptime',
      goto: 'Đi đến',
      all: 'Tất cả',
      active: 'Đang dùng',
      testing: 'Thử nghiệm',
    },

    alerts: {
      title: '🚨 Cảnh báo & Thông báo',
    },
    activity: {
      title: '🕒 Hoạt động gần đây',
    },
  },

  // ── Common / shared ──────────────────────────────────────
  common: {
    forms: 'Biểu mẫu:',
    viewPDF: '⬇ Tải PDF',
    closePDF: '✕',
    allForms: '📋 Biểu Mẫu',
    formHint: 'Click để xem · Kéo/In PDF trong cửa sổ xem',
    statusActive: 'Đang dùng',
    statusTesting: 'Thử nghiệm',
    approve: 'Phê duyệt',
    reject: 'Từ chối',
    save: 'Lưu',
    export: 'Xuất',
    print: 'In',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    all: 'Tất cả',
    back: 'Quay lại',
    next: 'Tiếp theo',
    confirm: 'Xác nhận',
    cancel: 'Hủy',
  },
}
