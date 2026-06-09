import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const nav = [
  { label: 'Tổng quan', section: null, path: '/dashboard', icon: '⊞' },
  { label: 'Kiến Trúc Hệ Thống', path: '/architecture', icon: '🗺️' },
  { section: 'R&D – Nghiên Cứu Phát Triển' },
  { label: 'Tạo Formula AI', path: '/rd/formula-gen', icon: '🧪' },
  { label: 'Tính Toán Batch', path: '/rd/batch-calc', icon: '📐' },
  { label: 'So Sánh Formula', path: '/rd/formula-compare', icon: '📊' },
  { label: 'Quản Lý BOM', path: '/rd/bom', icon: '📑' },
  { section: 'Kế Hoạch Sản Xuất' },
  { label: 'Lịch Sản Xuất', path: '/planning/schedule', icon: '📅' },
  { section: 'Công Vụ & Sản Xuất' },
  { label: 'Bảo Trì Thiết Bị', path: '/facilities/equipment', icon: '🔧' },
  { label: 'Quản Lý Năng Lượng', path: '/facilities/energy', icon: '⚡' },
  { label: 'Hỗ Trợ Sản Xuất', path: '/facilities/production', icon: '⚙️' },
  { label: 'An Toàn & Rủi Ro', path: '/facilities/safety', icon: '🦺' },
  { label: 'Báo Sửa Chữa', path: '/facilities/repair', icon: '🛠️' },
  { label: 'Tài Liệu & Kiến Thức', path: '/facilities/knowledge', icon: '📚' },
  { section: 'Quản Kho' },
  { label: 'Dịch Thuật AI', path: '/warehouse/translation', icon: '🌐' },
  { label: 'Đối Chiếu Excel', path: '/warehouse/reconciliation', icon: '🔍' },
  { label: 'Quản Lý Tồn Kho', path: '/warehouse/inventory', icon: '📦' },
  { label: 'Tính Giờ Công', path: '/warehouse/workhour', icon: '⏱️' },
  { label: 'Theo Dõi Bao Bì', path: '/warehouse/packaging', icon: '🏷️' },
  { label: 'Thống Kê Tổng Hợp', path: '/warehouse/statistics', icon: '📈' },
  { section: 'Quản Lý' },
  { label: 'Tính Ngày Giao Hàng', path: '/management/delivery', icon: '🚚' },
]

const pageTitles = {
  '/dashboard': 'Tổng Quan',
  '/architecture': 'Kiến Trúc Hệ Thống',
  '/rd/formula-gen': 'Tạo Formula AI',
  '/rd/batch-calc': 'Tính Toán Batch',
  '/rd/formula-compare': 'So Sánh Formula',
  '/rd/bom': 'Quản Lý BOM',
  '/planning/schedule': 'Lịch Sản Xuất',
  '/facilities/equipment': 'Bảo Trì Thiết Bị',
  '/facilities/energy': 'Quản Lý Năng Lượng',
  '/facilities/production': 'Hỗ Trợ Sản Xuất',
  '/facilities/safety': 'An Toàn & Rủi Ro',
  '/warehouse/translation': 'Dịch Thuật AI',
  '/warehouse/reconciliation': 'Đối Chiếu Excel',
  '/warehouse/inventory': 'Quản Lý Tồn Kho',
  '/warehouse/workhour': 'Tính Giờ Công',
  '/warehouse/packaging': 'Theo Dõi Bao Bì',
  '/management/delivery': 'Tính Ngày Giao Hàng',
  '/facilities/repair': 'Báo Sửa Chữa Thông Minh',
  '/facilities/knowledge': 'Tài Liệu & Kiến Thức',
  '/warehouse/statistics': 'Thống Kê Dữ Liệu Tổng Hợp',
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'GIAVICO AI'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">GV</div>
          <div>
            <div className="sidebar-logo-text">GIAVICO</div>
            <div className="sidebar-logo-sub">AI Platform 2026</div>
          </div>
        </div>
        {nav.map((item, i) =>
          item.section ? (
            <div key={i} className="sidebar-section-label">{item.section}</div>
          ) : (
            <div
              key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span style={{fontSize:14}}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          )
        )}
        <div style={{height:16}} />
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span className="topbar-title">GIAVICO AI Platform</span>
          <span style={{color:'rgba(255,255,255,.5)',fontSize:13}}>›</span>
          <span className="topbar-date">{title}</span>
          <div className="topbar-right">
            <span className="topbar-chip">Tháng 6 / 2026</span>
            <div className="topbar-avatar">LT</div>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
