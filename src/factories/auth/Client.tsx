import React from 'react';

import { useNavigation } from "react-navigation-hooks";
import { SafeAreaView, FlatList } from "react-navigation";
import { ListItem, Text } from "native-base";

export const SideMenu: React.FunctionComponent = () => {
    const { navigate } = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
            data={[
                { routeName: 'Home', data: {} },
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