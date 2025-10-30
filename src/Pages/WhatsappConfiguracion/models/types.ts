// src/Pages/WhatsappConfiguracion/models/types.ts
export interface SessionRow {
    id: string;
    user: string;
    ready: boolean;
    existsOnNode: boolean;
    readyString: string;
    existsOnNodeString: string;
    lastQrDataUrl?: string | null;
    lastReason?: string | null;
    qrDataUrl?: string | null;
    hasQr?: string | null;
    updatedAtUtc: string; // ISO
}
export interface SendMessageBody {
    user: string;
    to: string;
    template?: string;
    variables?: Record<string, string | number | boolean>;
    message?: string;
}
