import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './nav-group';
import useMenuItems from '../menu';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const menu=useMenuItems()
    const navItems = menu.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);
