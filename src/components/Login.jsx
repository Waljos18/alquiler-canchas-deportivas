import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isAdmin ? '/api/auth/login-admin' : '/api/auth/login';
      const payload = isAdmin ? { usuario: email, contraseña } : { email, contraseña };
      console.log('Enviando login:', payload, 'a', endpoint);
      const response = await axios.post(endpoint, payload);
      console.log('Respuesta de login:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.id);
      alert('Inicio de sesión exitoso');
      navigate(isAdmin ? '/admin' : '/');
    } catch (error) {
      console.error('Error en login:', error.response?.data || error);
      setError(error.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box shadow-lg">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{isAdmin ? 'Usuario' : 'Email'}</label>
            <input
              type={isAdmin ? 'text' : 'email'}
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={isAdmin ? 'Ingresa tu usuario' : 'Ingresa tu email'}
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
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <label className="form-check-label">Iniciar como administrador</label>
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
          <button
            type="button"
            className="btn btn-link w-100 mt-2"
            onClick={() => navigate('/register')}
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;