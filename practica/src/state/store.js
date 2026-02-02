export const store = {
    user: (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    })(),
    
    // Nueva propiedad para guardar el evento que el cliente quiere reservar
    selectedEvent: null, 

    setLogin(userData) {
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
    },

    getUserId() {
        return this.user ? this.user.id : null;
    }
};