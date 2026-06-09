export const Get = (key: string) => {
    return localStorage.getItem(key) || null;
}