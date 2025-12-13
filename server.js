// server.js en la raíz
const app = require('./backend/src/app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto: ${PORT}`);
});