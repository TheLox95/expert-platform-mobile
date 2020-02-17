import React from 'react';
import { ComponentsMap, Components } from '../ComponentsToFactor';

export const HeaderComponent: React.FunctionComponent = () => {
    return null
}

const PublicFactory: React.FunctionComponent<{ component: Partial<ComponentsMap> }> = ({ component }) => {
    if (component[Components.Header]) return <HeaderComponent />
    return null;
}

export default PublicFactory;