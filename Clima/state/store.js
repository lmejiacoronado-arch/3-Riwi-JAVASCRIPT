export const store = {
    user: JSON.parse(localStorage.getItem('userFound')) || null,

    setLogin(userData) {
        this.user = userData
        localStorage.setItem('userFound', JSON.stringify(userData));
    }
}