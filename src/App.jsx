import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { LangProvider } from './i18n/context'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FormulaGenerator from './pages/rd/FormulaGenerator'
import BatchCalculation from './pages/rd/BatchCalculation'
import FormulaComparison from './pages/rd/FormulaComparison'
import BOMAnalysis from './pages/rd/BOMAnalysis'
import ProductionSchedule from './pages/planning/ProductionSchedule'
import OrderControl from './pages/planning/OrderControl'
import MaterialAnalysis from './pages/planning/MaterialAnalysis'
import DeliveryConfirm from './pages/planning/DeliveryConfirm'
import ProductionOrderIssue from './pages/planning/ProductionOrderIssue'
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

// Order workflow pages
import OrderPipeline from './pages/orders/OrderPipeline'
import EmailInbox from './pages/orders/EmailInbox'
import OrderSummary from './pages/orders/OrderSummary'
import SampleReport from './pages/orders/SampleReport'
import NewProductNotice from './pages/orders/NewProductNotice'
import AcceptanceSpecs from './pages/orders/AcceptanceSpecs'
import ProductConfirm from './pages/orders/ProductConfirm'
import ProductionOrder from './pages/orders/ProductionOrder'
import EngineeringChange from './pages/orders/EngineeringChange'

function Keyed({ Comp }) {
  const { line } = useParams()
  return <Comp key={line} />
}

export default function App() {
  return (
    <LangProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="architecture" element={<SystemArchitecture />} />

          {/* Order Workflow */}
          <Route path="orders/pipeline" element={<OrderPipeline />} />
          <Route path="orders/inbox" element={<EmailInbox />} />
          <Route path="orders/summary" element={<OrderSummary />} />
          <Route path="orders/sample-report" element={<SampleReport />} />
          <Route path="orders/new-product-notice" element={<NewProductNotice />} />
          <Route path="orders/acceptance-specs" element={<AcceptanceSpecs />} />
          <Route path="orders/product-confirm" element={<ProductConfirm />} />
          <Route path="orders/production-order" element={<ProductionOrder />} />
          <Route path="orders/engineering-change" element={<EngineeringChange />} />

          {/* R&D */}
          <Route path="rd/formula-gen" element={<FormulaGenerator />} />
          <Route path="rd/batch-calc" element={<BatchCalculation />} />
          <Route path="rd/formula-compare" element={<FormulaComparison />} />
          <Route path="rd/bom" element={<BOMAnalysis />} />

          {/* Planning – 生管部 V1.1 · 3 Line AV/ND/GV */}
          <Route path="planning/:line/order-control" element={<Keyed Comp={OrderControl} />} />
          <Route path="planning/:line/material-analysis" element={<Keyed Comp={MaterialAnalysis} />} />
          <Route path="planning/:line/delivery-confirm" element={<Keyed Comp={DeliveryConfirm} />} />
          <Route path="planning/:line/production-order" element={<Keyed Comp={ProductionOrderIssue} />} />
          <Route path="planning/schedule" element={<ProductionSchedule />} />
          {/* Redirect đường dẫn cũ → line AV */}
          <Route path="planning/order-control" element={<Navigate to="/planning/av/order-control" replace />} />
          <Route path="planning/material-analysis" element={<Navigate to="/planning/av/material-analysis" replace />} />
          <Route path="planning/delivery-confirm" element={<Navigate to="/planning/av/delivery-confirm" replace />} />
          <Route path="planning/production-order" element={<Navigate to="/planning/av/production-order" replace />} />

          {/* Facilities */}
          <Route path="facilities/equipment" element={<EquipmentMaintenance />} />
          <Route path="facilities/energy" element={<EnergyManagement />} />
          <Route path="facilities/production" element={<ProductionSupport />} />
          <Route path="facilities/safety" element={<SafetyManagement />} />
          <Route path="facilities/repair" element={<RepairTicket />} />
          <Route path="facilities/knowledge" element={<KnowledgeBase />} />

          {/* Warehouse */}
          <Route path="warehouse/translation" element={<Translation />} />
          <Route path="warehouse/reconciliation" element={<DataReconciliation />} />
          <Route path="warehouse/inventory" element={<InventoryManagement />} />
          <Route path="warehouse/workhour" element={<WorkHourCalc />} />
          <Route path="warehouse/packaging" element={<PackagingTracking />} />
          <Route path="warehouse/statistics" element={<DataStatistics />} />

          {/* Management */}
              <Route path="management/delivery" element={<DeliveryCalc />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </LangProvider>
  )
}
