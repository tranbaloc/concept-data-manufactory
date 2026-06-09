import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FormulaGenerator from './pages/rd/FormulaGenerator'
import BatchCalculation from './pages/rd/BatchCalculation'
import FormulaComparison from './pages/rd/FormulaComparison'
import BOMAnalysis from './pages/rd/BOMAnalysis'
import ProductionSchedule from './pages/planning/ProductionSchedule'
import EquipmentMaintenance from './pages/facilities/EquipmentMaintenance'
import EnergyManagement from './pages/facilities/EnergyManagement'
import ProductionSupport from './pages/facilities/ProductionSupport'
import SafetyManagement from './pages/facilities/SafetyManagement'
import Translation from './pages/warehouse/Translation'
import DataReconciliation from './pages/warehouse/DataReconciliation'
import InventoryManagement from './pages/warehouse/InventoryManagement'
import WorkHourCalc from './pages/warehouse/WorkHourCalc'
import PackagingTracking from './pages/warehouse/PackagingTracking'
import DeliveryCalc from './pages/management/DeliveryCalc'
import SystemArchitecture from './pages/SystemArchitecture'
import RepairTicket from './pages/facilities/RepairTicket'
import KnowledgeBase from './pages/facilities/KnowledgeBase'
import DataStatistics from './pages/warehouse/DataStatistics'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="architecture" element={<SystemArchitecture />} />
          <Route path="rd/formula-gen" element={<FormulaGenerator />} />
          <Route path="rd/batch-calc" element={<BatchCalculation />} />
          <Route path="rd/formula-compare" element={<FormulaComparison />} />
          <Route path="rd/bom" element={<BOMAnalysis />} />
          <Route path="planning/schedule" element={<ProductionSchedule />} />
          <Route path="facilities/equipment" element={<EquipmentMaintenance />} />
          <Route path="facilities/energy" element={<EnergyManagement />} />
          <Route path="facilities/production" element={<ProductionSupport />} />
          <Route path="facilities/safety" element={<SafetyManagement />} />
          <Route path="warehouse/translation" element={<Translation />} />
          <Route path="warehouse/reconciliation" element={<DataReconciliation />} />
          <Route path="warehouse/inventory" element={<InventoryManagement />} />
          <Route path="warehouse/workhour" element={<WorkHourCalc />} />
          <Route path="warehouse/packaging" element={<PackagingTracking />} />
          <Route path="management/delivery" element={<DeliveryCalc />} />
          <Route path="facilities/repair" element={<RepairTicket />} />
          <Route path="facilities/knowledge" element={<KnowledgeBase />} />
          <Route path="warehouse/statistics" element={<DataStatistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
