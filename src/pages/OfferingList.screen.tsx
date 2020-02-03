import React, { useCallback } from 'react';

import { List, ListItem, Text, Container } from "native-base";
// @ts-ignore
import RNMinimizeApp from 'react-native-minimize';
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';
import Skeleton from '../tools/skeleton';
import { BackHandler } from 'react-native';

const OfferingList: WrappedComponent = ({ requests, useGlobalState }) => {
  const [offerings, updateOfferings] = useState<Offering[]>([]);
  const [, serOfferingToShow] = useGlobalState('offeringIdToDisplay');
  const { offering } = requests;
  const { navigate } = useNavigation();

  useEffect(() => {
    offering.getOfferings()
      .then(o => updateOfferings(o));
  }, []);

  useFocusEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => RNMinimizeApp.minimizeApp());
    return () => subscription.remove();
  });

  return (
    <List>
      {offerings.map(o => {
        return (
          <ListItem key={o.id} onPress={() => {
            serOfferingToShow(o.id)
            navigate('Offering')
          }}>
            <Text>{o.name}</Text>
          </ListItem>
        );
      })}
    </List>
  );
}

export default Wrapper(OfferingList);