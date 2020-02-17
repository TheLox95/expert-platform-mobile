import React, { useCallback } from 'react';

import { ListItem, Text, Container, Grid, Col, Row, Content, H1, Icon } from "native-base";
import { useNavigation, useNavigationState, useFocusEffect } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';
import { DefaultTheme } from '../theme';
import { FlatList } from 'react-native';

const NoOfferings = Wrapper(() => {
  return (
    <Grid testID="no-offering-found" style={{ alignItems: 'center' }}>
      <Col>
        <Icon name='alert' style={[{ textAlign: 'center', fontSize: 60 }, DefaultTheme.secondaryColor]} />
        <H1 style={{ textAlign: 'center' }}>No offerings found!</H1>
      </Col>
    </Grid>
  );
}, { skeleton: false })

const OfferingList: WrappedComponent = ({ requests, useGlobalState }) => {
  const [offerings, setOfferings] = useState<Offering[] | null>(null);
  const [, setInfo] = useGlobalState('info')
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(true);
  const { offering } = requests;
  const { navigate } = useNavigation();

  const fetchOffergins = async () => {
    const pulledOfferings = await offering.getOfferings()
    setOfferings(pulledOfferings)
    if (Array.isArray(offerings) && pulledOfferings.length !== 0) {
      setInfo('No new offerings found!')
    }
  }

  useFocusEffect(useCallback(() => {
    fetchOffergins()
  }, []));

  if (offerings === null) return null

  if (offerings.length === 0) {
    return <NoOfferings />
  }

  return (
    <FlatList
      testID="offering-list"
      refreshing={offerings === null}
      onRefresh={() => fetchOffergins()}
      onEndReached={() => {
        if (!onEndReachedCalledDuringMomentum) {
          fetchOffergins();
          setOnEndReachedCalledDuringMomentum(true);
        }
      }}
      onEndReachedThreshold={0.5}
      onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
      data={offerings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(o) => {
        return (
          <ListItem key={o.item.id} onPress={() => {
            navigate('Offering', { id: o.item.id })
          }}>
            <Text>{o.item.name}</Text>
          </ListItem>
        );
      }}>
    </FlatList>
  );
}

export default Wrapper(OfferingList, {noStyle: true});