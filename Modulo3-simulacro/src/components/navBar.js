import { store } from "../state/store.js"

export function navBarView() {
  return `
    <nav>
        <ul>
            <li><a href="#/menu">Menu</a></li>
            <li><a href="#/placeOrders">Place orders</a></li>
            <li><a href="#/yourOrders">Your orders</a></li>
            <li><a href="#/profile">Profile</a></li>
            <button id="btnLogOut">LogOut</button>
        </ul>
    </nav>
    `
}

export function navBarLogic() {
  const btnLogOut = document.querySelector("#btnLogOut")

  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      store.user = null
      localStorage.removeItem('user')
      window.location.hash = "#/login";
    })
  }
}