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
