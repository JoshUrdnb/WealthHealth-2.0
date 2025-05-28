import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "./layout/Layout"
import Home from './pages/home/Home'
import List from './pages/employees/Employees'
import { EmployeeProvider } from './context/EmployeeProvider.jsx'


function App() {
  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<List />} />
          </Route>
        </Routes>
      </Router>
    </EmployeeProvider>
  )
}

export default App
