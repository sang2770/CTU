import { IconAdjustments, IconBrandDatabricks, IconCamera, IconDeviceMobile, IconDeviceMobileCog, IconInfoCircle, IconInfoSquare, IconShape, IconSmartHome, IconUsers } from '@tabler/icons-react';
import { NavItemType } from './type';
import useAuth from '../../hooks/useAuth';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboardGuest = [
    {
        id: 'components',
        title: ``,
        type: 'group',
        children: [
            {
                id: 'home',
                title: "Trang chủ",
                type: 'item',
                url: '/dashboard',
                icon: <IconSmartHome stroke={1.5} />,
                breadcrumbs: true,
            },
            {
                id: 'info',
                title: "Giới thiệu",
                type: 'item',
                url: '/about-us',
                icon: <IconInfoSquare stroke={1.5} />,
                breadcrumbs: true,
            },
        ]
    },
]
const dashboardAdmin = [
    {
        id: 'components',
        title: ``,
        type: 'group',
        children: [
            {
                id: 'home',
                title: "Trang chủ",
                type: 'item',
                url: '/dashboard',
                icon: <IconSmartHome stroke={1.5} />,
                breadcrumbs: true,
            },
            {
                id: 'info',
                title: "Giới thiệu",
                type: 'item',
                url: '/about-us',
                icon: <IconInfoCircle stroke={1.5} />,
                breadcrumbs: true,
            },
            {
                id: 'device-control',
                title: "Điều khiển thiết bị",
                type: 'item',
                url: '/device-control',
                icon: <IconDeviceMobileCog stroke={1.5} />,
                breadcrumbs: true,
            },
            {
                id: 'farm',
                title: "Trang trại",
                type: 'item',
                url: '/farm-information',
                icon: <IconShape stroke={1.5} />,
                breadcrumbs: true,
            },
            {
                id: 'admin',
                title: "Quản lý",
                type: 'collapse',
                url: '/admin',
                icon: <IconUsers stroke={1.5} />,
                breadcrumbs: true,
                children: [
                    {
                        id: 'admin-farm',
                        title: "Trang trại",
                        type: 'item',
                        url: '/farm-management',
                        icon: <IconCamera stroke={1.5} />,
                        breadcrumbs: true,
                    },
                    {
                        id: 'admin-field-pond',
                        title: "Ruộng/ao",
                        type: 'item',
                        url: '/field-pond-management',
                        icon: <IconAdjustments stroke={1.5} />,
                        breadcrumbs: true,
                    },
                    {
                        id: 'admin-station',
                        title: "Trạm quan trắc",
                        type: 'item',
                        url: '/station-management',
                        icon: <IconAdjustments stroke={1.5} />,
                        breadcrumbs: true,
                    },
                    {
                        id: 'admin-sensor',
                        title: "Cảm biến",
                        type: 'item',
                        url: '/sensor-management',
                        icon: <IconAdjustments stroke={1.5} />,
                        breadcrumbs: true,
                    },
                    {
                        id: 'admin-device',
                        title: "Thiết bị",
                        type: 'item',
                        url: '/device-management',
                        icon: <IconAdjustments stroke={1.5} />,
                        breadcrumbs: true,
                    },
                    {
                        id: 'admin-microcontroller',
                        title: "Vi điều khiển",
                        type: 'item',
                        url: '/microcontroller-management',
                        icon: <IconAdjustments stroke={1.5} />,
                        breadcrumbs: true,
                    },
                    
                ]
            }


        ]
    },
]

const useMenuItems = () => {
    const { isAuthenticated } = useAuth();

    const menu: { items: NavItemType[] } = {
        items: isAuthenticated() ? dashboardAdmin : dashboardGuest
    };
    return menu
}

export default useMenuItems;
