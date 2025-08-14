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

const WhiteIcon = (Icon: React.ComponentType<SvgIconProps>) => {
  return <Icon sx={{ color: 'white' }} />;
};

const Menus: MenuItem[] = [
  {
    name: "Home",
    roles: ["admin", "user"],
    route: "/dashboard",
    component: <DashboardGestiones />,
    icon: WhiteIcon(HomeIcon),
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
        name: "Ver Clientes",
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
        name: "Gestionar Compromisos",
        roles: ["admin", "user"],
        route: "/gestion/compromisos-pagos",
        component: <PrincipalCompromisosPagos />
      }
    ]
  },
  {
    name: "Reportes",
    roles: ["admin"],
    icon: WhiteIcon(SummarizeIcon),
    children: [
      {
        name: "Reporte General",
        roles: ["admin"],
        route: "/gestion/reporte-general",
        component: <InformacionGeneralGestionesIndex />
      },
      {
        name: "Ver Reportes",
        roles: ["admin"],
        route: "/gestion/reporteria-deudas",
        component: <PrincipalReportes />
      }
    ]
  }
];

export default Menus;