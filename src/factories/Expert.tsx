import React from 'react';

import { Left, Button, Icon, Right, ListItem, Text } from "native-base";
import { useNavigation } from 'react-navigation-hooks';
import { SafeAreaView, FlatList } from 'react-navigation';
import Wrapper from '../state/Wrapper';
import { DefaultTheme } from '../theme';

export type HeaderProps = { toggleDrawer: () => void, setIsSearching: (v: boolean ) => void }
export const HeaderComponent: React.FunctionComponent<HeaderProps> = ({ toggleDrawer, setIsSearching }) => {
    return (
        <>
            <Left>
                <Button style={DefaultTheme.backgroundColorPrimaryColor} transparent onPress={() => toggleDrawer()}>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Right>
                <Button testID="search-button" style={DefaultTheme.backgroundColorPrimaryColor} transparent onPress={() => setIsSearching(true)}>
                    <Icon name='search' />
                </Button>
            </Right>
        </>
    );
}



export const SideMenu = Wrapper(({ useGlobalState, ...props }) => {
    const [ user ] = useGlobalState('user')

    const { navigate } = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
            data={[
                { routeName: 'Home', name: 'Home', data: {} },
                { routeName: 'Expert', name: 'Profile', data: { id: user?.id} },
            ]}
            renderItem={({ item }) => (
                <ListItem noBorder onPress={() => navigate(item.routeName, item.data)}>
                    <Text>{item.name}</Text>
                </ListItem>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}, { skeleton: false })