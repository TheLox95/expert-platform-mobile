import React, { useCallback, useState } from 'react';

import { ListItem, Text, Grid, Col, H1, Icon } from "native-base";
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { Offering } from '../models';
import { DefaultTheme } from '../theme';
import { SafeAreaView, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

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
    setOfferings((prev) => {
      if (Array.isArray(prev)) return [...prev, ...pulledOfferings.filter(po => prev.find(o => o.id === po.id) === undefined)]
      if (Array.isArray(pulledOfferings)) return pulledOfferings
      return prev;
    })
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
    <SafeAreaView style={{ flex: 1 }}>
      <RecyclerListView
        layoutProvider={new LayoutProvider(
          index => {
              return 0
          },
          (type, dim) => {
            dim.width = Dimensions.get("window").width;
            dim.height = (Dimensions.get("window").height / 100) * 8;
          }
      )}
        dataProvider={new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows(offerings)}
        rowRenderer={(type, o) => {
          return (
            <ListItem key={o.id} onPress={() => {
              navigate('Offering', { id: o.id })
            }}>
              <Text>{o.name}</Text>
            </ListItem>
          );
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            fetchOffergins();
            setOnEndReachedCalledDuringMomentum(true);
          }
        }}
        onScroll={() => setOnEndReachedCalledDuringMomentum(false)}>
      </RecyclerListView>
    </SafeAreaView>
  );
}

export default Wrapper(OfferingList, { noStyle: true });