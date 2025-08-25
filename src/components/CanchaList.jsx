import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CanchaList.css';

function CanchaList() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('/api/canchas').then((response) => {
      console.log('Canchas recibidas:', response.data);
      const formattedCanchas = response.data.map(cancha => ({
        ...cancha,
        precio: parseFloat(cancha.precio) || 0
      }));
      setCanchas(formattedCanchas);
      setLoading(false);
    }).catch((error) => {
      console.error('Error al cargar canchas:', error.response?.data || error);
      alert('Error al cargar las canchas');
      setLoading(false);
    });
  }, []);

  return (
    <div className="cancha-list-container">
      <h3 className="text-center mb-4">Canchas Disponibles</h3>
      {loading ? (
        <div className="text-center">
          <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
        </div>
      ) : canchas.length === 0 ? (
        <div className="alert alert-info">No hay canchas disponibles</div>
      ) : (
        <div className="row">
          {canchas.map((cancha) => (
            <div key={cancha.id} className="col-md-4 mb-4">
              <div className="card cancha-card shadow-sm">
                <img
                  src={cancha.imagen || '/cancha-placeholder.jpg'}
                  alt={cancha.nombre}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{cancha.nombre}</h5>
                  <p className="card-text">Ubicación: {cancha.ubicacion}</p>
                  <p className="card-text">Precio: S/{Number(cancha.precio).toFixed(2)}</p>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => navigate(`/reserva/${cancha.id}`)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-link" onClick={() => navigate('/login')}>
        Iniciar Sesión
      </button>
    </div>
  );
}

export default CanchaList;