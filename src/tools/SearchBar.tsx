import React, { useState } from 'react';
import { Photo } from 'src/models';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';
import { Header, Item, Input, Icon, Button, Text, Toast } from 'native-base';
import { WrappedComponent } from 'src/state/WrappedComponent';
import Wrapper from '../state/Wrapper';

const SearchBar: WrappedComponent<{ onEndEditing: () => void }> = ({ onEndEditing, requests: { offering } }) => {
    const { navigate } = useNavigation()
    const [ searchTerm, updateSearchTerm ] = useState<string | null>(null);

    return (
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" autoFocus={true} onEndEditing={onEndEditing} onChangeText={(t) => updateSearchTerm(t)} onSubmitEditing={() => {
              offering.searchOfferings(searchTerm || '')
              .then((results) => {
                if (results.length !== 0) {
                  navigate('Search', { results: results })
                } else {
                  Toast.show({
                    text: 'No result found :(',
                  })
                }
              })
          }} />
          </Item>
        </Header>
    );
}

export default Wrapper(SearchBar, { skeleton: false });