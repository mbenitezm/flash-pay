import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentForm from './components/PaymentForm'
import TransactionComplete from './components/TransactionComplete'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/transaction-complete" element={<TransactionComplete />} />
      </Routes>
    </Router>
  )
}

export default App
