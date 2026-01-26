export function navBarView() {

    if (!store.user) {
    window.location.hash = '#login'; 
    return '';
    }

    return `
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#newProject">New Project</a></li>
            <li><a href="#about">About</a></li>
            <button id="btnLogOut">LogOut</button>
        </ul>
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