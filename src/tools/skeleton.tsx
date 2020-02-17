import React from 'react';
import { Container, Header, Content, Fab, Icon, Button } from "native-base";
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import Factory from '../factories/Factory';
import { DefaultTheme, Colors } from '../theme';

const Skeleton: React.FunctionComponent = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false)
  const { toggleDrawer, navigate } = useNavigation();
  return (
    <Container>
      {isSearching ? <SearchBar onEndEditing={() => setIsSearching(false)} /> : (
        <Header androidStatusBarColor={Colors.PRIMARY_DARK_COLOR} style={[DefaultTheme.backgroundColorPrimaryColor]}>
          <Factory component={{ Header: { toggleDrawer, setIsSearching } }} />
        </Header>
      )}

      {children}
      <Factory component={{ FAB: { navigate } }} />
    </Container>
  );
}

export default Skeleton;