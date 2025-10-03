export const STORAGE_NAMESPACE = 'custom-dx-grid';

export function normalizarTelefono(input: string): string {
    if (!input) return "";

    let numero = input.replace(/\D/g, "");
    if (numero.startsWith("593")) {
        return `+${numero}`;
    }
    if (numero.startsWith("0")) {
        return `+593${numero.substring(1)}`;
    }
    if (numero.startsWith("59") && !numero.startsWith("593")) {
        return `+593${numero.substring(2)}`;
    }
    return `+593${numero}`;
}

export function readStateFromStorage<T>(key: string): T | null {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) as T : null;
    } catch {
        return null;
    }
}
export function writeStateToStorage<T>(key: string, value: T) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { /* noop */ }
}
export function removeStateFromStorage(key: string) {
    try { localStorage.removeItem(key); } catch { /* noop */ }
}