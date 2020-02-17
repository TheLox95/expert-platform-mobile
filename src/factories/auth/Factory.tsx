import React from 'react';
import { ComponentsMap, Components } from "../ComponentsToFactor";
import * as ExpertComponents from "./Expert";
import * as ClientComponents from "./Client";
import { User } from "src/models";


const AuthFactory: React.FunctionComponent<{ component: Partial<ComponentsMap>, user: User }> = ({ component, user }) => {

    if (component['Header']) {
        return <ExpertComponents.HeaderComponent {...component['Header']} />
    }

    if (user.role.type === 'expert') {
        if (component['FAB']) {
            return <ExpertComponents.FabComponent {...component['FAB']} />
        }

        if (component[Components.SideMenu]) {
            return <ExpertComponents.SideMenu />
        }
    }

    if (user.role.type === 'client') {
        if (component[Components.SideMenu]) {
            return <ClientComponents.SideMenu />
        }
    }


    return null;
}

export default AuthFactory;
