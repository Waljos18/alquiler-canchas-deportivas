import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './ReservaForm.css';

function ReservaForm() {
  const { canchaId } = useParams();
  const [cancha, setCancha] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cancha ID recibido:", canchaId);
    axios.get(`/api/canchas/${canchaId}`)
      .then((response) => {
        setCancha(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar cancha:', error);
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          alert('Error al cargar la cancha');
        }
      });
  }, [canchaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/reservas',
        { cancha_id: canchaId, fecha, hora },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Reserva creada con éxito');
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Error al crear la reserva');
    } finally {
      setLoading(false);
    }
  };

  if (notFound) {
    return (
      <div className="reserva-container text-center">
        <h3 className="text-danger mb-3">Cancha no encontrada ⚠️</h3>
        <p>La cancha solicitada no existe o ha sido eliminada.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="reserva-container">
      <h3 className="text-center mb-4">Reservar {cancha?.nombre}</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            events={[]} // Cargar eventos desde /api/reservas?canchaId
            eventClick={(info) => {
              setFecha(info.event.start.toISOString().split('T')[0]);
              setHora(info.event.start.toTimeString().split(' ')[0]);
            }}
          />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hora</label>
              <input
                type="time"
                className="form-control"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Confirmar Reserva'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReservaForm;
