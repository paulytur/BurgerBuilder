import React from 'react';
import Logo from '../../../hoc/Layout/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/ReactAuxilary/ReactAuxilary'


const sideDrawer = ( props ) => {
    //..
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return(
        <Aux>
            <Backdrop
                show = {props.open}
                click={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
            </div>
        </Aux>
    );
}

export default sideDrawer;