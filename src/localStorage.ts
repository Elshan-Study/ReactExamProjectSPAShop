export function loadFromLocal<T>(key: string): T | undefined {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return undefined;
        return JSON.parse(raw) as T;
    } catch {
        return undefined;
    }
}

export function saveToLocal(key: string, data: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch { /* empty */ }
}
