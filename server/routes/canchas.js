const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Solicitud a /api/canchas');
  db.query('SELECT * FROM canchas', (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en el servidor', details: err.message });
    }
    const formattedResults = results.map(cancha => ({
      ...cancha,
      precio: parseFloat(cancha.precio)
    }));
    console.log('Canchas obtenidas:', formattedResults);
    res.json(formattedResults);
  });
});

// Obtener una cancha específica por ID
router.get('/:id', (req, res) => {
  const canchaId = parseInt(req.params.id);
  console.log('Solicitud a /api/canchas/:id con ID =', canchaId);

  if (isNaN(canchaId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.query('SELECT * FROM canchas WHERE id = ?', [canchaId], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en el servidor', details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Cancha no encontrada' });
    }

    const cancha = {
      ...results[0],
      precio: parseFloat(results[0].precio)
    };
    console.log('Cancha encontrada:', cancha);
    res.json(cancha);
  });
});

module.exports = router;