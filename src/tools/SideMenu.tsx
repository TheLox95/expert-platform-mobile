import React from 'react';
import { Content, ListItem, Text } from 'native-base';
import { FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import Wrapper from '../state/Wrapper';
import { WrappedComponent } from '../state/WrappedComponent';
import Factory from '../factories/Factory';

const SideMenu: WrappedComponent = ({ useGlobalState }) => {
    return <Factory component={{ SideMenu: {} }}/>
}

export default Wrapper(SideMenu, { skeleton: false });