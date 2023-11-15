export const SessionStorageManager = {
    getState(key: string) {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    setState(key: string, value: string) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    clearState(key: string) {
        sessionStorage.removeItem(key);
    },
    clearAll() {
        sessionStorage.clear();
    }
};