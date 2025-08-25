import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
  const [canchas, setCanchas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [newCancha, setNewCancha] = useState({ nombre: '', ubicacion: '', precio: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/canchas', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setCanchas(response.data))
      .catch((error) => console.error('Error al cargar canchas:', error));
    axios.get('/api/reservas', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setReservas(response.data))
      .catch((error) => console.error('Error al cargar reservas:', error));
  }, []);

  const handleAddCancha = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/canchas', newCancha, { headers: { Authorization: `Bearer ${token}` } });
      setCanchas([...canchas, { ...newCancha, id: Date.now() }]);
      setNewCancha({ nombre: '', ubicacion: '', precio: '' });
    } catch (error) {
      console.error('Error al agregar cancha:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h3 className="text-center mb-4">Panel de Administración</h3>
      <div className="row">
        <div className="col-md-6">
          <h4>Agregar Cancha</h4>
          <form onSubmit={handleAddCancha}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={newCancha.nombre}
                onChange={(e) => setNewCancha({ ...newCancha, nombre: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ubicación"
                value={newCancha.ubicacion}
                onChange={(e) => setNewCancha({ ...newCancha, ubicacion: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Precio"
                value={newCancha.precio}
                onChange={(e) => setNewCancha({ ...newCancha, precio: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Agregar</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Reservas</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cancha</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.cancha_id}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;