import React from 'react';

import { List, ListItem, Text, Container } from "native-base";
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';

const OfferingList: WrappedComponent = ({ requests }) => {
    const [ offerings, updateOfferings ] = useState<Offering[]>([]);
    const [ selectedId, updateSelectedId ] = useState(-1);
    const { offering } = requests;

    useEffect(() => {
        offering.getOfferings()
        .then(o => updateOfferings(o));
    }, []);

    return (
        <List>
          {offerings.map(o => {
            return (
              <ListItem>
                <Text>{o.name}</Text>
              </ListItem>
            );
          })}
        </List>
    );
}

export default Wrapper(OfferingList);