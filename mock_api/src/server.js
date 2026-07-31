const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const rutinas = require('../data/rutinas.json');
let actividad = require('../data/actividad.json');

app.get('/api/rutinas', (req, res) => {
  res.json(rutinas);
});

app.get('/api/rutinas/:id', (req, res) => {
  const rutina = rutinas.find(r => r.id === parseInt(req.params.id));
  if (!rutina) return res.status(404).json({ error: 'Rutina no encontrada' });
  res.json(rutina);
});

app.get('/api/actividad', (req, res) => {
  res.json(actividad);
});

app.post('/api/actividad', (req, res) => {
  actividad = { ...actividad, ...req.body, ultimaActualizacion: new Date().toISOString() };
  res.json(actividad);
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mock API corriendo en puerto ${PORT}`));
