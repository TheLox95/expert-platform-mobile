import React from 'react';

import { useGlobalState } from '../state/GlobalState';
import { ComponentsMap } from './ComponentsToFactor';
import PublicFactory from './public/Factory';
import AuthFactory from './auth/Factory';


const Factory: React.FunctionComponent<{ component: Partial<ComponentsMap> }> = ({ component }) => {
    const [user] = useGlobalState('user');

    if (user) {
        return <AuthFactory component={component} user={user} />
    } else {
        return <PublicFactory component={component} />
    }
}

export default Factory;