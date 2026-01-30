import { store } from '../state/store.js';
import { render } from './render.js';
import { Dashboard } from '../views/dashboard.js';

document.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;
    const input = document.getElementById("input"); 
  if (action === 'login') {
    if (input.value) {
        store.user = input.value;
    }
     else {
        store.user = 'Ingresa algo'
    }
    render(Dashboard());
  }

  if (action === 'logout') {
    store.user = null;
    render(Dashboard());
  }
});