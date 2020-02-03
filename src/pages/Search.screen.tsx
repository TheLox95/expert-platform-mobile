import React from 'react';

import { List, ListItem, Text, Container } from "native-base";
import { useNavigation, useNavigationParam  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';
import Skeleton from '../tools/skeleton';

const SearchScreen: WrappedComponent = ({ requests }) => {
    const { navigate } = useNavigation();
    const results = useNavigationParam('results');

    return (
      <List>
          {(results as Offering[]).map(o => {
            return (
              <ListItem key={o.id} onPress={() => navigate('Offering', { offeringIdToDisplay: o.id })}>
                <Text>{o.name}</Text>
              </ListItem>
            );
          })}
        </List>
    );
}

export default Wrapper(SearchScreen);
