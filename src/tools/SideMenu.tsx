import React from 'react';
import { Content, ListItem, Text } from 'native-base';
import { FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import Wrapper from '../state/Wrapper';
import { WrappedComponent } from '../state/WrappedComponent';

const SideMenu: WrappedComponent = ({ useGlobalState }) => {

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
}

export default Wrapper(SideMenu, { skeleton: false });