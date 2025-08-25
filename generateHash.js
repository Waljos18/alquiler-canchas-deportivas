const bcrypt = require('bcrypt');

const password = 'admin2'; // Contraseña a hashear
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar hash:', err);
    return;
  }
  console.log('Hash generado para admin2:', hash);
});