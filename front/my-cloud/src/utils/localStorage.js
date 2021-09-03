export const LS = {
    set: (title, payload) => {
        localStorage.setItem(title, JSON.stringify(payload));
    },

    get: (title) => {
        return JSON.parse(localStorage.getItem(title));
    },

    remove: (title) => {
        localStorage.removeItem(title);
    }
}