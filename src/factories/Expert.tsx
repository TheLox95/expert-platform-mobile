import React from 'react';

import { Left, Button, Icon, Right, ListItem, Text } from "native-base";
import { useNavigation } from 'react-navigation-hooks';
import { SafeAreaView, FlatList } from 'react-navigation';
import Wrapper from '../state/Wrapper';

export type HeaderProps = { toggleDrawer: () => void, setIsSearching: (v: boolean ) => void }
export const HeaderComponent: React.FunctionComponent<HeaderProps> = ({ toggleDrawer, setIsSearching }) => {
    return (
        <>
            <Left>
                <Button transparent onPress={() => toggleDrawer()}>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Right>
                <Button transparent onPress={() => setIsSearching(true)}>
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
                { routeName: 'Home', data: {} },
                { routeName: 'Expert', data: { id: user?.id} },
                { routeName: 'CreateOffering', data: { id: user?.id} },
                { routeName: 'EditExpert', data: {} }
            ]}
            renderItem={({ item }) => (
                <ListItem noBorder onPress={() => navigate(item.routeName, item.data)}>
                    <Text>{item.routeName}</Text>
                </ListItem>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}, { skeleton: false })