import { store } from "../state/store.js"

export function navBarViewClient() {
  return `
    <nav>
        <ul>
            <li><a href="#/events">Events</a></li>
            <li><a href="#/chooseEvents">Choose Events</a></li>
            <li><a href="#/reserved">Reserved</a></li>
            <button id="btnLogOut">LogOut</button>
        </ul>
    </nav>
    `
}

export function navBarLogicClient() {
  const btnLogOut = document.querySelector("#btnLogOut")

  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      store.user = null
      localStorage.removeItem('user')
      window.location.hash = "#/login";
    })
  }
}



