/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Root } from 'native-base'
import Navigator from './src/navigation/index';
import { useGlobalState } from './src/state/GlobalState';

const App = () => {
  const [token] = useGlobalState('token');

  const Navigation = Navigator(token);
  return (
    <Root>
      <Navigation />
    </Root>
  );
};


export default App;
