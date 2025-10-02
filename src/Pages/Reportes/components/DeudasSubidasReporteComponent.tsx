import CustomDatePicker from "@/components/DataGridCommon/CustomDatePicker"
import { Button, Grid } from "@mui/material"
import dayjs from "dayjs";
import { useState } from "react";

const DeudasSubidasReporteComponent = () => {
    const [startDate, setStartDate] = useState<string>(dayjs().subtract(5, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid size={{ xs: 12, md: 3, lg: 6 }}>
                    <CustomDatePicker
                        label="Fecha Inicio"
                        defaultValue={startDate}
                        onChangeValue={setStartDate}
                        maxDate={endDate}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3, lg: 6 }}>
                    <CustomDatePicker
                        label="Fecha Fin"
                        defaultValue={endDate}
                        onChangeValue={setEndDate}
                        minDate={startDate}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <Button fullWidth variant="contained">Descargar Reporte</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default DeudasSubidasReporteComponent