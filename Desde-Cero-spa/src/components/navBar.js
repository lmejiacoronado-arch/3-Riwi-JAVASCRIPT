export function navBar() {
      const route = location.hash;

    if (route == '#/login' || route == '') {
        return `
      <h1>Logueate mi loco</h1>
        `
    }
    return `
    
    <nav>
        <a href="#/dashboard">Home</a>
        <a href="#/projects">Projects</a>
        <a href="#/login">Login</a>
    </nav>
    `
}