export const store = {
    user: (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  })(),

    setLogin(userData) {
        this.user = userData
        localStorage.setItem('user', JSON.stringify(userData));
    }
}