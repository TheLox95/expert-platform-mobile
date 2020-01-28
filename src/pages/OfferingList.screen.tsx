import React from 'react';

import { List, ListItem, Text, Container } from "native-base";
import { useNavigation  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';
import Skeleton from '../tools/skeleton';

const OfferingList: WrappedComponent = ({ requests }) => {
    const [ offerings, updateOfferings ] = useState<Offering[]>([]);
    const [ selectedId, updateSelectedId ] = useState(-1);
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
              <ListItem key={o.id} onPress={() => navigate('Offering', { offering: o })}>
                <Text>{o.name}</Text>
              </ListItem>
            );
          })}
        </List>
    );
}

export default Wrapper(OfferingList);