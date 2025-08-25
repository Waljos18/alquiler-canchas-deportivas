const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const canchasRoutes = require('./routes/canchas');
const reservasRoutes = require('./routes/reservas');

// Otras rutas como reservas, pagos, si las tienes

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/canchas', canchasRoutes);
app.use('/api/reservas', reservasRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

