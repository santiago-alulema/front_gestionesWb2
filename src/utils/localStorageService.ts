class LocalStorageService {
    static setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error al guardar en localStorage con clave "${key}":`, error);
        }
    }

    static getItem<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : null;
        } catch (error) {
            console.error(`Error al obtener del localStorage con clave "${key}":`, error);
            return null;
        }
    }

    static updateItem<T>(key: string, value: T): void {
        this.setItem(key, value);
    }

    static removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al eliminar del localStorage con clave "${key}":`, error);
        }
    }

    static clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error al limpiar el localStorage:", error);
        }
    }
}
