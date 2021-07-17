
import SvgColor from "react-svg-color";

const arrayMenu = [
    {
        icon: <SvgColor svg={'/assets/svg/icon_home.svg'} width={20} colors={['#989898']} />,
        title: 'Inicio',
        uri: '/',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_profile.svg'} width={20} colors={['#989898']} />,
        title: 'Perfil',
        uri: '/profile',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_activity.svg'} width={20} colors={['#989898']} />,
        title: 'Empresa',
        uri: '/company',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_send.svg'} width={20} colors={['#989898']} />,
        title: 'Operaciones',
        uri: '/operation',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_folder.svg'} width={20} colors={['#989898']} />,
        title: 'Cliente',
        uri: '/clients',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_folder.svg'} width={20} colors={['#989898']} />,
        title: 'Administración',
        uri: '/',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_setting.svg'} width={20} colors={['#989898']} />,
        title: 'Configuración',
        uri: '/',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_profile.svg'} width={20} colors={['#989898']} />,
        title: 'Accesos',
        uri: '/',
        children : [],
    },
    {
        icon: <SvgColor svg={'/assets/svg/icon_graph.svg'} width={20} colors={['#989898']} />,
        title: 'Reportes',
        uri: '/',
        children : [],
    },
];

export default arrayMenu;

