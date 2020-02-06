import React from 'react';

import { List, ListItem, Text, Container } from "native-base";
import { useNavigation, useNavigationState } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';

const OfferingList: WrappedComponent = ({ requests, useGlobalState }) => {
  const [offerings, updateOfferings] = useState<Offering[]>([]);
  const { offering } = requests;
  const { navigate } = useNavigation();

  useEffect(() => {
    offering.getOfferings()
      .then(o => updateOfferings(o));
  }, []);

  return (
    <List>
      {offerings.map(o => {
        return (
          <ListItem key={o.id} onPress={() => {
            navigate('Offering', { id: o.id })
          }}>
            <Text>{o.name}</Text>
          </ListItem>
        );
      })}
    </List>
  );
}

export default Wrapper(OfferingList);