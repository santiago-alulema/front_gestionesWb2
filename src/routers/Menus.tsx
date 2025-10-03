import MenuItem from "./MenuItem";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Login from "@/components/Login";
import UploadDeudores from "@/Pages/UploadPages/UploadDeudores";
import { SvgIconProps } from '@mui/material';
import UploadDeudasPage from "@/Pages/UploadPages/UploadDeudasPage";
import ClientDebtPage from "@/Pages/ClientDebtPage";
import UploadPhonesPage from "@/Pages/UploadPages/UploadPhonesPage";
import ConsultaReportes from "@/Pages/Reportes/components/ConsultaReportes";
import HomeIcon from '@mui/icons-material/Home';
import GestionCompromisoPagosDeudores from "@/Pages/GestionarCompromisosPagos/PrincipalCompromisosPagos";
import PrincipalCompromisosPagos from "@/Pages/GestionarCompromisosPagos/PrincipalCompromisosPagos";
import PrincipalReportes from "@/Pages/Reportes/PrincipalReportes";
import Deudores from "@/Pages/DeudoresGestionPage/Index";
import Deudas from "@/Pages/DeudoresGestionPage/components/Deudas";
import InformacionGeneralGestionesIndex from "@/Pages/InformacionGeneralGestiones/InformacionGeneralGestionesIndex";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { DashboardGestiones } from "@/components/Graficos/DashboardGestiones";
import EditarGestionesIndex from "@/Pages/EditarGestiones/EditarGestionesIndex";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NuevaVentanaGestionarDeuda from "@/Pages/EditarGestiones/Pages/NuevaVentanaGestionarDeuda";
import IndexMigraciones from "@/Pages/MigracionesPages/IndexMigraciones";
import MigrarPagosPage from "@/Pages/MigracionesPages/pages/MigrarPagosPage";
import WhatsappConfiguraionIndex from "@/Pages/WhatsappConfiguracion/WhatsappConfiguraionIndex";
import ReporteDeudasSubidas from "@/Pages/Reportes/pages/ReporteDeudasSubidas";

const WhiteIcon = (Icon: React.ComponentType<SvgIconProps>) => {
  return <Icon sx={{ color: 'white' }} />;
};

const Menus: MenuItem[] = [
  {
    name: "Home",
    roles: ["admin"],
    route: "/dashboard",
    component: <DashboardGestiones />,
    icon: WhiteIcon(HomeIcon),
  },
  {
    name: "Migraciones",
    roles: ["admin"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Compromisos y Gestiones",
        roles: ["admin"],
        route: "/gestion/subir-migaciones-compromisos-gestiones",
        component: <IndexMigraciones />
      },
      {
        name: "Pagos",
        roles: ["admin"],
        route: "/gestion/subir-migaciones-Pagos",
        component: <MigrarPagosPage />
      }
    ]
  },
  {
    name: "Configuracion",
    roles: ["admin", "user"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Configuracion Whatsapp",
        roles: ["admin", "user"],
        route: "/configuracion/configurar-whatsapp",
        component: <WhatsappConfiguraionIndex />
      }
    ]
  },
  {
    name: "Home",
    roles: ["admin", "user"],
    route: "/gestionar-deuda-nuevo",
    component: <NuevaVentanaGestionarDeuda />,
    icon: WhiteIcon(HomeIcon),
    hidden: true
  },
  {
    name: "Administracion",
    roles: ["admin", "user"],
    icon: WhiteIcon(SupervisorAccountIcon),
    children: [
      {
        name: "Editar Gestiones",
        roles: ["admin", "user"],
        route: "/mantenimiento/editar-gestiones",
        component: <EditarGestionesIndex />
      }
    ],
  },
  {
    name: "Subir Archivos",
    roles: ["admin"],
    icon: WhiteIcon(CloudUploadIcon),
    children: [
      {
        name: "Deudas",
        roles: ["admin"],
        route: "/gestion/subir-Deudas",
        component: <UploadDeudasPage />
      },
      {
        name: "Deudores",
        roles: ["admin"],
        route: "/gestion/subir-deudores",
        component: <UploadDeudores />
      },
      {
        name: "Telefonos",
        roles: ["admin"],
        route: "/gestion/subir-telefonos",
        component: <UploadPhonesPage />
      },
    ],
  },
  {
    name: "Gestiones",
    roles: ["admin", "user"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Ver Deudores",
        roles: ["admin", "user"],
        route: "/gestion/ver-deudores",
        component: <Deudores />
      },
      {
        name: "Ver Deudas por clientes",
        roles: ["admin", "user"],
        route: "/gestion/dudas-por-clientes",
        component: <Deudas />,
        hidden: true
      },
      {
        name: "Gestionar Tareas",
        roles: ["admin", "user"],
        route: "/gestion/compromisos-pagos",
        component: <PrincipalCompromisosPagos />
      }
    ]
  },
  {
    name: "Reportes",
    roles: ["admin", "user"],
    icon: WhiteIcon(SummarizeIcon),
    children: [
      {
        name: "Reporte General",
        roles: ["admin", "user"],
        route: "/reporte/reporte-general",
        component: <InformacionGeneralGestionesIndex />
      },
      {
        name: "Ver Reportes",
        roles: ["admin"],
        route: "/reporte/reporteria-deudas",
        component: <PrincipalReportes />
      },
      {
        name: "Ver Reportes Deudas",
        roles: ["admin"],
        route: "/reporte/reporteria-deudas-subidas",
        component: <ReporteDeudasSubidas />
      }
    ]
  }
];

export default Menus;