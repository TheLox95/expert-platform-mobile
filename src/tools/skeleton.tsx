import React from 'react';
import { Container, Header, Content } from "native-base";
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import Factory from '../factories/Factory';
import { DefaultTheme, Colors } from '../theme';

const Skeleton: React.FunctionComponent = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false)
  const { toggleDrawer } = useNavigation();
  return (
    <Container>
      {isSearching ? <SearchBar onEndEditing={() => setIsSearching(false)} /> : (
        <Header androidStatusBarColor={Colors.PRIMARY_DARK_COLOR}  style={[DefaultTheme.backgroundColorPrimaryColor]}>
          <Factory component={{ Header: { toggleDrawer, setIsSearching } }} />
        </Header>
      )}

        {children}
    </Container>
  );
}

export default Skeleton;