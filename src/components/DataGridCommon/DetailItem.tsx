import DOMPurify from "dompurify";
import { Box, Typography } from "@mui/material";

type DetailItemProps = {
    title: string;
    value?: string;
    fontsize?: string;
    /**
     * Si es true, interpreta value como HTML (sanitizado).
     * Si es false, lo muestra como texto plano.
     */
    allowHtml?: boolean;
    /**
     * Opcional: si `value` no tiene etiquetas HTML, forzar render como texto plano
     * aunque allowHtml sea true. Útil para evitar innerHTML innecesario.
     */
    onlyWhenHtmlDetected?: boolean;
};

const hasHtml = (s?: string) => !!s && /<\/?[a-z][\s\S]*>/i.test(s);

export const DetailItem = ({
    title,
    value,
    fontsize = "13px",
    allowHtml = true,
    onlyWhenHtmlDetected = true,
}: DetailItemProps) => {
    const showHtml =
        allowHtml && value && (!onlyWhenHtmlDetected || hasHtml(value));

    const safeHtml = showHtml ? DOMPurify.sanitize(value!) : undefined;

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="textSecondary">
                {title}
            </Typography>

            {showHtml ? (
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, fontSize: fontsize, textAlign: "justify", mr: 2 }}
                    // Render HTML ya sanitizado
                    dangerouslySetInnerHTML={{ __html: safeHtml! }}
                />
            ) : (
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, fontSize: fontsize, textAlign: "justify", mr: 2 }}
                >
                    {value ?? "N/A"}
                </Typography>
            )}
        </Box>
    );
};
