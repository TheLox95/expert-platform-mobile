import React from 'react';
import Wrapper from '../state/Wrapper';
import { WrappedComponent } from '../state/WrappedComponent';
import Factory from '../factories/Factory';

const SideMenu: WrappedComponent = () => {
    return <Factory component={{ SideMenu: {} }}/>
}

export default Wrapper(SideMenu, { skeleton: false });