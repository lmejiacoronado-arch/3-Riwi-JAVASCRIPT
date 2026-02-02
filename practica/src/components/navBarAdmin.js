import { store } from "../state/store.js"

export function navBarViewAdmin() {
  return `
    <nav>
        <ul>
            <li><a href="#/eventsReserved">Events Reserved</a></li>
            <li><a href="#/allEvents">All Events</a></li>
            <button id="btnLogOut">LogOut</button>
        </ul>
    </nav>
    `
}

export function navBarLogicAdmin() {
  const btnLogOut = document.querySelector("#btnLogOut")

  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      store.user = null
      localStorage.removeItem('user')
      window.location.hash = "#/login";
    })
  }
}