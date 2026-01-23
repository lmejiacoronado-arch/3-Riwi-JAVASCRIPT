import { store } from "../state/store.js"

export function navBarView() {
  if (!store.user) {
    window.location.hash = '#login'; 
    return '';
  }

  return `
    <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#projects">Projects</a>
        <button id="btnLogOut">LogOut</button>
    </nav>
    `
}

export function navBarLogic() {
  const btnLogOut = document.querySelector("#btnLogOut")

  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
    localStorage.removeItem('user')
    window.location.hash = "#login";
    window.location.reload();
    })
  }
}