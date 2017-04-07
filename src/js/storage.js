/**
 * Created by minhluong on 4/7/17.
 */
const STORAGE_KEY = "--addresses--"
export default class Storage {
    static load() {
        let savedValue = localStorage.getItem(STORAGE_KEY);
        let data;
        if (savedValue && savedValue.length > 0) {
            data = JSON.parse(savedValue);
        }
        return data;
    }
    static save(data = {}) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
}
