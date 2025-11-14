type BulkItem = {
    to: string;
    message?: string;
    template?: string;
    variables?: Record<string, any>;
    preferSession?: string; // opcional por item
};