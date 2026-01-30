
import { store } from '../state/store.js';

export function Dashboard() {
  return `
    <h1>FlowDesk</h1>

    <nav>
      <a href="#/dashboard">Dashboard</a>
      <a href="#/projects">Proyectos</a>
    </nav>

    <section class="cards">
      <div class="card">📁 Proyectos: ${store.projects.length}</div>
      <div class="card">👤 Usuario: ${store.user ?? 'Autenticate'}</div>
    </section>
    <input id="input" type="text">
    <button data-action="login">Simular Login</button>
    <button data-action="logout">Logout</button>
  `;
}
