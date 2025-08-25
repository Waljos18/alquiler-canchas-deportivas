const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
    const { fecha, semana, usuario_id } = req.query;
    let query = 'SELECT r.*, c.nombre AS cancha_nombre FROM reservas r JOIN canchas c ON r.cancha_id = c.id';
    let params = [];

    if (fecha) {
        query += ' WHERE r.fecha = ?';
        params.push(fecha);
    } else if (semana) {
        query += ' WHERE WEEK(r.fecha) = ?';
        params.push(semana);
    } else if (usuario_id) {
        query += ' WHERE r.usuario_id = ?';
        params.push(usuario_id);
    }

    console.log('Consulta reservas:', query, params);
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).json({ error: 'Error en el servidor', details: err.message });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { cancha_id, usuario_id, fecha, hora } = req.body;
    console.log('Creando reserva:', { cancha_id, usuario_id, fecha, hora });
    db.query(
        'SELECT * FROM reservas WHERE cancha_id = ? AND fecha = ? AND hora = ?',
        [cancha_id, fecha, hora],
        (err, results) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                return res.status(500).json({ error: 'Error en el servidor', details: err.message });
            }
            if (results.length > 0) {
                console.log('Horario ocupado:', { cancha_id, fecha, hora });
                return res.status(400).json({ error: 'Horario ocupado' });
            }

            db.query(
                'INSERT INTO reservas (cancha_id, usuario_id, fecha, hora, estado) VALUES (?, ?, ?, ?, ?)',
                [cancha_id, usuario_id, fecha, hora, 'pendiente'],
                (err, result) => {
                    if (err) {
                        console.error('Error al crear reserva:', err);
                        return res.status(500).json({ error: 'Error en el servidor', details: err.message });
                    }
                    res.json({ success: true, id: result.insertId });
                }
            );
        }
    );
});

router.put('/cancelar/:id', (req, res) => {
    const { id } = req.params;
    console.log('Cancelando reserva ID:', id);
    db.query(
        'UPDATE reservas SET estado = "cancelada" WHERE id = ?',
        [id],
        (err) => {
            if (err) {
                console.error('Error al cancelar reserva:', err);
                return res.status(500).json({ error: 'Error en el servidor', details: err.message });
            }
            res.json({ success: true });
        }
    );
});

module.exports = router;