import {navBar} from '../components/navBar.js'
const app = document.getElementById('app')
export function render(view){
    app.innerHTML = `
    ${navBar()}
    <section>${view}
    </section>
    `
}