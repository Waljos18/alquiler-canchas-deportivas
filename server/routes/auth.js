const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// Ruta para login de administrador
router.post('/login-admin', (req, res) => {
  const { usuario, contraseña } = req.body;
  console.log('Intento de login admin:', { usuario });
  db.query('SELECT * FROM administradores WHERE usuario = ?', [usuario], async (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en el servidor', details: err.message });
    }
    console.log('Resultados de la consulta:', results);
    if (results.length === 0) {
      console.log('Usuario no encontrado:', usuario);
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const admin = results[0];
    try {
      const match = await bcrypt.compare(contraseña, admin.contraseña_hash);
      if (!match) {
        console.log('Contraseña incorrecta para:', usuario);
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, id: admin.id });
    } catch (error) {
      console.error('Error al comparar contraseñas:', error);
      res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
  });
});

// Ruta para login de usuarios regulares
router.post('/login', (req, res) => {
  const { email, contraseña } = req.body;
  console.log('Intento de login usuario:', { email });
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en el servidor', details: err.message });
    }
    console.log('Resultados de la consulta:', results);
    if (results.length === 0) {
      console.log('Usuario no encontrado:', email);
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const usuario = results[0];
    try {
      const match = await bcrypt.compare(contraseña, usuario.contraseña_hash);
      if (!match) {
        console.log('Contraseña incorrecta para:', email);
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: usuario.id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, id: usuario.id });
    } catch (error) {
      console.error('Error al comparar contraseñas:', error);
      res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
  });
});

router.post('/register', async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  console.log('Intento de registro:', { nombre, email });
  try {
    const contraseña_hash = await bcrypt.hash(contraseña, 10);
    db.query(
      'INSERT INTO usuarios (nombre, email, contraseña_hash) VALUES (?, ?, ?)',
      [nombre, email, contraseña_hash],
      (err, result) => {
        if (err) {
          console.error('Error al registrar usuario:', err);
          return res.status(500).json({ error: 'Error al registrar usuario', details: err.message });
        }
        console.log('Usuario registrado, ID:', result.insertId);
        res.json({ success: true, id: result.insertId });
      }
    );
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error en el servidor', details: error.message });
  }
});

module.exports = router;