import React from 'react';

import { List, ListItem, Text, Container, Grid, Col, Row, Content, H1, Icon } from "native-base";
import { useNavigation, useNavigationState } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';
import { DefaultTheme } from '../theme';

const NoOfferings = Wrapper(() => {
  return (
    <Grid testID="no-offering-found" style={{ alignItems: 'center' }}>
      <Col>
        <Icon name='alert' style={[{  textAlign: 'center', fontSize: 60 }, DefaultTheme.secondaryColor]} />
        <H1 style={{ textAlign: 'center' }}>No offerings found!</H1>
      </Col>
    </Grid>
  );
}, { skeleton: false })

const OfferingList: WrappedComponent = ({ requests }) => {
  const [offerings, setOfferings] = useState<Offering[] | null>(null);
  const { offering } = requests;
  const { navigate } = useNavigation();

  useEffect(() => {
    offering.getOfferings()
      .then(o => setOfferings(o));
  }, []);

  if (offerings === null) return null

  if (offerings.length === 0) {
    return <NoOfferings />
  }

  return (
    <List testID="offering-list">
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