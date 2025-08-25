import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import CanchaList from './components/CanchaList.jsx';
import ReservaForm from './components/ReservaForm.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1>Alquiler de Canchas de Fútbol</h1>
        <Routes>
          <Route path="/" element={<CanchaList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reserva/:canchaId" element={<ReservaForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;