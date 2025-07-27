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
import { Dashboard } from "@/components/Graficos/Dashboard";
import HomeIcon from '@mui/icons-material/Home';
import GestionCompromisoPagosDeudores from "@/Pages/GestionarCompromisosPagos/PrincipalCompromisosPagos";
import PrincipalCompromisosPagos from "@/Pages/GestionarCompromisosPagos/PrincipalCompromisosPagos";
import PrincipalReportes from "@/Pages/Reportes/PrincipalReportes";
const WhiteIcon = (Icon: React.ComponentType<SvgIconProps>) => {
  return <Icon sx={{ color: 'white' }} />;
};

const Menus: MenuItem[] = [
  {
    name: "Home",
    roles: ["admin", "user"],
    route: "/dashboard",
    component: <Dashboard />,
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
        route: "/gestion/usuarios",
        component: <UploadDeudasPage />
      },
      {
        name: "Deudores",
        roles: ["admin"],
        route: "/gestion/roles",
        component: <UploadDeudores />
      },
      {
        name: "Telefonos",
        roles: ["admin"],
        route: "/gestion/roles",
        component: <UploadPhonesPage />
      },
    ],
  },
  {
    name: "Gestiones",
    roles: ["admin"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Ver Clientes",
        roles: ["admin"],
        route: "/gestion/usuarios",
        component: <ClientDebtPage />
      },
      {
        name: "Ver Reportes",
        roles: ["admin"],
        route: "/gestion/usuarios",
        component: <PrincipalReportes />
      },
      // {
      //   name: "Dashboard",
      //   roles: ["admin"],
      //   route: "/gestion/usuarios",
      //   component: <Dashboard />
      // },
      {
        name: "Gestionar Compromisos",
        roles: ["admin"],
        route: "/gestion/Gestionar Compromisos",
        component: <PrincipalCompromisosPagos />
      }
    ]
  }
];

export default Menus;