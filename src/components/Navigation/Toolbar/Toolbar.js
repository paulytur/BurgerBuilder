import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../../hoc/Layout/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.drawerToggleClick}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <div className={classes.DesktopOnly}>
             <NavigationItems />
        </div>
        
    </header>
);

export default toolbar;