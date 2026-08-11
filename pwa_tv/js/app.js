const API_BASE = 'http://localhost:3000/api';

let rutinas = [];
let focusedIndex = 0;
let cards = [];

async function cargarRutinas() {
  try {
    const res = await fetch(`${API_BASE}/rutinas`);
    rutinas = await res.json();
    renderRutinas();
    document.getElementById('offline-banner').classList.remove('show');
  } catch (err) {
    document.getElementById('offline-banner').classList.add('show');
  }
}

function renderRutinas() {
  const grid = document.getElementById('rutinas-grid');
  grid.innerHTML = '';
  rutinas.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'rutina-card';
    card.tabIndex = 0;
    card.dataset.index = i;
    card.innerHTML = `
      <h2>${r.nombre}</h2>
      <p>${r.duracionMin} min &middot; ${r.caloriasEstimadas} kcal</p>
      <span class="nivel">${r.nivel}</span>
    `;
    grid.appendChild(card);
  });
  cards = Array.from(document.querySelectorAll('.rutina-card'));
  if (cards.length) cards[focusedIndex]?.focus();
}

async function cargarActividad() {
  try {
    const res = await fetch(`${API_BASE}/actividad`);
    const a = await res.json();
    document.getElementById('bpm-value').textContent = a.bpm ?? '--';
    document.getElementById('pasos-value').textContent = `${a.pasos ?? 0} pasos`;
    document.getElementById('calorias-value').textContent = `${a.caloriasQuemadas ?? 0} kcal quemadas`;
  } catch (err) {
    // silenciosamente ignora si el wearable/API no está disponible
  }
}

function moverFoco(delta) {
  if (!cards.length) return;
  const cols = 2;
  let next = focusedIndex;

  if (delta === 'right') next = Math.min(focusedIndex + 1, cards.length - 1);
  if (delta === 'left') next = Math.max(focusedIndex - 1, 0);
  if (delta === 'down') next = Math.min(focusedIndex + cols, cards.length - 1);
  if (delta === 'up') next = Math.max(focusedIndex - cols, 0);

  focusedIndex = next;
  cards[focusedIndex]?.focus();
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight': moverFoco('right'); break;
    case 'ArrowLeft': moverFoco('left'); break;
    case 'ArrowDown': moverFoco('down'); break;
    case 'ArrowUp': moverFoco('up'); break;
    case 'Enter':
      const r = rutinas[focusedIndex];
      if (r) alert(`Iniciando: ${r.nombre}`);
      break;
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

cargarRutinas();
cargarActividad();
setInterval(cargarActividad, 2000);
setInterval(cargarRutinas, 15000);
