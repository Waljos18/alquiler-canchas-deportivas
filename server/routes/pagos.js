const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/', (req, res) => {
    const { reserva_id, monto, metodo_pago } = req.body;
    console.log('Procesando pago:', { reserva_id, monto, metodo_pago });
    db.query(
        'INSERT INTO pagos (reserva_id, monto, metodo_pago, estado) VALUES (?, ?, ?, ?)',
        [reserva_id, monto, metodo_pago, 'completado'],
        (err) => {
            if (err) {
                console.error('Error al procesar pago:', err);
                return res.status(500).json({ error: 'Error en el servidor', details: err.message });
            }
            db.query(
                'UPDATE reservas SET estado = "confirmada" WHERE id = ?',
                [reserva_id],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar reserva:', err);
                        return res.status(500).json({ error: 'Error en el servidor', details: err.message });
                    }
                    res.json({ success: true });
                }
            );
        }
    );
});

module.exports = router;