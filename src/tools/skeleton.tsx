import React from 'react';
import { Text, Container, Header, Left, Button, Title, Content, Icon, Footer, FooterTab, Right, Body } from "native-base";
import { WrappedComponent } from "../state/WrappedComponent";
import Wrapper from "../state/Wrapper";
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';

const Skeleton: React.FunctionComponent = ({ children }) => {
  const [ isSearching, updateIsSearching ] = useState(false)
  const { toggleDrawer } = useNavigation();
    return (
      <Container>
        { isSearching ? <SearchBar onEndEditing={() => updateIsSearching(false)} /> : (
          <Header>
          <Left>
            <Button transparent onPress={() => toggleDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={() => updateIsSearching(true)}>
              <Icon name='search' />
            </Button>
          </Right>
        </Header>
        )}

        <Content>
            {children}
        </Content>
      </Container>
    );
}

export default Skeleton;