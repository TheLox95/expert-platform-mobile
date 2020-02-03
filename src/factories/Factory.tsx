import React from 'react';

import * as ExpertComponents from "./Expert";
import * as ClientComponents from "./Client";
import { useGlobalState } from '../state/GlobalState';

enum Components {
    Header = 'Header',
    SideMenu = 'SideMenu'
}

interface ComponentsMap {
    [Components.Header]: ExpertComponents.HeaderProps
    [Components.SideMenu]: { }
}

const Factory: React.FunctionComponent<{ component: Partial<ComponentsMap> }> = ({ component }) => {
    const [user] = useGlobalState('user');

    if (user) {
        if (component['Header']) {
            return <ExpertComponents.HeaderComponent {...component['Header']}/>
        }
        if (component[Components.SideMenu]) {
            if (user.role.type === 'expert') {
                return <ExpertComponents.SideMenu />
            }
            if (user.role.type === 'client') {
                return <ClientComponents.SideMenu />
            }
        }        
    } else {
        if (component[Components.Header]) return <ClientComponents.HeaderComponent />
    }

    return null;
}

export default Factory;