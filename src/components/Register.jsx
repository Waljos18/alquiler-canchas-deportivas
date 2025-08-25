import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/register', {
        nombre,
        email,
        contraseña
      });
      if (response.data.success) {
        alert('Usuario registrado con éxito');
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box shadow-lg">
        <img src="/logo.png" alt="Logo" className="register-logo" />
        <h3 className="text-center mb-4">Registrarse</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Registrarse'
            )}
          </button>
          <button
            type="button"
            className="btn btn-link w-100 mt-2"
            onClick={() => navigate('/login')}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;