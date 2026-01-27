export const store = {
    user: JSON.parse(localStorage.getItem('user')) || null,

    setLogin(userData) {
        this.user = userData
        localStorage.setItem('user', JSON.stringify(userData));
    }
}