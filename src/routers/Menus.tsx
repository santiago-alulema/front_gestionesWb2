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
import CambiarGestorDeudaIndex from "@/Pages/ActualizarGestorPorDeuda/CambiarGestorDeudaIndex";
import ConfiguracionMensajeriaIndex from "@/Pages/ConfigurarMensajeria/ConfiguracionMensajeriaIndex";
import MensajeriaMasivaIndex from "@/Pages/MensajeriaMasiva/MensajeriaMasivaIndex";
import SubirPorPartesCrecosIndex from "@/Pages/SubirPorPartesCrecos/SubirPorPartesCrecosIndex";
import SubirDeudasSinInactivar from "@/Pages/UploadPages/SubirDeudasSinInactivar";

const WhiteIcon = (Icon: React.ComponentType<SvgIconProps>) => {
  return <Icon sx={{ color: 'white' }} />;
};

const Menus: MenuItem[] = [
  {
    name: "Home",
    roles: ["admin", "superadmin"],
    route: "/dashboard",
    component: <DashboardGestiones />,
    icon: WhiteIcon(HomeIcon),
  },
  {
    name: "Migraciones",
    roles: ["admin", "superadmin"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Compromisos y Gestiones",
        roles: ["admin", "superadmin"],
        route: "/gestion/subir-migaciones-compromisos-gestiones",
        component: <IndexMigraciones />
      },
      {
        name: "Pagos",
        roles: ["admin", "superadmin"],
        route: "/gestion/subir-migaciones-Pagos",
        component: <MigrarPagosPage />
      }
    ]
  },
  {
    name: "Mensajeria",
    roles: ["admin"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Enviar Mensajeria",
        roles: ["admin"],
        route: "/configuracion/Enviar Mensajeria",
        component: <MensajeriaMasivaIndex />
      }
    ]
  },
  {
    name: "Configuracion",
    roles: ["admin", "user", "superadmin"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Configuracion Whatsapp",
        roles: ["admin", "user", "superadmin"],
        route: "/configuracion/configurar-whatsapp",
        component: <WhatsappConfiguraionIndex />
      },
      {
        name: "Configuracion Mensajes de Whatsapp",
        roles: ["admin", "superadmin"],
        route: "/configuracion/mensajes-whatsapp",
        component: <ConfiguracionMensajeriaIndex />
      }

    ]
  },
  {
    name: "Home",
    roles: ["admin", "user", "superadmin"],
    route: "/gestionar-deuda-nuevo",
    component: <NuevaVentanaGestionarDeuda />,
    icon: WhiteIcon(HomeIcon),
    hidden: true
  },
  {
    name: "Administracion",
    roles: ["admin", "user", "superadmin"],
    icon: WhiteIcon(SupervisorAccountIcon),
    children: [
      {
        name: "Editar Gestiones",
        roles: ["admin", "user", "superadmin"],
        route: "/mantenimiento/editar-gestiones",
        component: <EditarGestionesIndex />
      },
      {
        name: "Cambiar el gestor por deuda",
        roles: ["admin", "superadmin"],
        route: "/mantenimiento/cambiar-gestor-deuda",
        component: <CambiarGestorDeudaIndex />
      }
    ],
  },
  {
    name: "Subir Archivos",
    roles: ["admin", "superadmin"],
    icon: WhiteIcon(CloudUploadIcon),
    children: [
      {
        name: "Deudas",
        roles: ["admin", "superadmin"],
        route: "/gestion/subir-Deudas",
        component: <UploadDeudasPage />
      },
      {
        name: "Subir Deudas sin Desactivar",
        roles: ["admin", "superadmin"],
        route: "/gestion/subir-Deudas-sin-desactivar",
        component: <SubirDeudasSinInactivar />
      },
      {
        name: "Deudores",
        roles: ["admin", "superadmin"],
        route: "/gestion/subir-deudores",
        component: <UploadDeudores />
      },
      {
        name: "Telefonos",
        roles: ["admin", "superadmin"],
        route: "/gestion/subir-telefonos",
        component: <UploadPhonesPage />
      },
      {
        name: "Campañia Crecos",
        roles: ["admin", "superadmin"],
        route: "/campania-crecos",
        component: <SubirPorPartesCrecosIndex />
      },
    ],
  },
  {
    name: "Gestiones",
    roles: ["admin", "user", "superadmin"],
    icon: WhiteIcon(ChecklistRtlIcon),
    children: [
      {
        name: "Ver Deudores",
        roles: ["admin", "user", "superadmin"],
        route: "/gestion/ver-deudores",
        component: <Deudores />
      },
      {
        name: "Ver Deudas por clientes",
        roles: ["admin", "user", "superadmin"],
        route: "/gestion/dudas-por-clientes",
        component: <Deudas />,
        hidden: true
      },
      {
        name: "Gestionar Tareas",
        roles: ["admin", "user", "superadmin"],
        route: "/gestion/compromisos-pagos",
        component: <PrincipalCompromisosPagos />
      }
    ]
  },
  {
    name: "Reportes",
    roles: ["admin", "user", "superadmin"],
    icon: WhiteIcon(SummarizeIcon),
    children: [
      {
        name: "Reporte General",
        roles: ["admin", "user", "superadmin"],
        route: "/reporte/reporte-general",
        component: <InformacionGeneralGestionesIndex />
      },
      {
        name: "Ver Reportes",
        roles: ["admin", "superadmin"],
        route: "/reporte/reporteria-deudas",
        component: <PrincipalReportes />
      },
      {
        name: "Ver Reportes Deudas",
        roles: ["admin", "superadmin"],
        route: "/reporte/reporteria-deudas-subidas",
        component: <ReporteDeudasSubidas />
      }
    ]
  }
];

export default Menus;