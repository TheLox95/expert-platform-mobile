import * as ExpertComponents from "./auth/Expert";

export enum Components {
    Header='Header',
    SideMenu='SideMenu',
    FAB='FAB'
}

export interface ComponentsMap {
    [Components.Header]: ExpertComponents.HeaderProps
    [Components.SideMenu]: { }
    [Components.FAB]: ExpertComponents.FabProps
}