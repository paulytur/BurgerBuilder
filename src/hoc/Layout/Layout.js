import React,  {Component}from 'react';

import Aux from '../ReactAuxilary/ReactAuxilary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.statesShowSideDrawer }
        })
    }

    render()
    {
        return (
            <Aux>
                <Toolbar drawerToggleClick = {this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open = {this.state.showSideDrawer}
                    close = {this.sideDrawerClosedHandler}/>
                <main className = {classes.Content  }>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
  
};

export default Layout;