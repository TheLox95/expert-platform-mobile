import React from 'react';
import { Header, Content, Spinner } from "native-base";
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import Factory from '../factories/Factory';
import { DefaultTheme, Colors } from '../theme';
import { useGlobalState } from '../state/GlobalState';

const Skeleton: React.FunctionComponent<{ noStyle?: boolean }>  = ({ children, noStyle }) => {
  const [isSearching, setIsSearching] = useState(false)
  const [ loading ] = useGlobalState('loading');

  const { toggleDrawer, navigate } = useNavigation();
  const styles = noStyle === true ? {} : { marginHorizontal:10 }

  return (
    <>
      {isSearching ? <SearchBar onEndEditing={() => setIsSearching(false)} /> : (
        <Header androidStatusBarColor={Colors.PRIMARY_DARK_COLOR} style={[DefaultTheme.backgroundColorPrimaryColor]}>
          <Factory component={{ Header: { toggleDrawer, setIsSearching } }} />
        </Header>
      )}

      {loading === true ? <Spinner /> : null}
      {/* TODO: we need to find a way to remove the component form the view layout without removing the component
                from the react tree to not trigger the mount function */}
      <Content contentContainerStyle={{ flex: 1 }} style={{ opacity: loading === true ? 0 : 1, ...styles }}>
        {children}
      </Content>
      <Factory component={{ FAB: { navigate } }} />
    </>
  );
}

export default Skeleton;