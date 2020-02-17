import React, { useState, useCallback } from 'react';

import { H2, Button, List, ListItem, Text, View } from "native-base";
import { Image, TouchableOpacity, BackHandler } from "react-native"
import { useNavigationParam, useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { Offering } from '../models';
import Markdown from 'react-native-markdown-renderer';
import { DefaultTheme } from '../theme';

const OfferingPage: WrappedComponent = ({ requests, useGlobalState }) => {
  const [user] = useGlobalState('user');
  const [offeringToShow, updateOfferingToShow] = useState<Offering | null>(null);
  let offeringId = useNavigationParam('id');
  const { navigate } = useNavigation();
  const { offering: offeringRequests } = requests;


  useFocusEffect(useCallback(() => {
    if (!offeringId) return;

    offeringRequests.getOffering(offeringId)
      .then(o => updateOfferingToShow(o));

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      updateOfferingToShow(null)
      // useFocusEffect is called when component takes focus
      // offeringId is part of the state react-navigation-hooks
      // when we pass a new offeringId the useFocusEffect calls the function with the old offeringId value
      // reads the new value and call it again
      // we set offeringId to null to trigger update of the function with the new value
      offeringId = null
    });
    return () => { subscription.remove(); navigate('Home') }
  }, [offeringId]));


  if (!offeringToShow) return null;

  return (
    <>
      <H2 testID="offering-name">{offeringToShow.name}</H2>
      <Markdown>
        {offeringToShow.description}
      </Markdown>

      <List horizontal={true} dataArray={offeringToShow.photos} keyExtractor={(item, index) => index.toString()} renderRow={v => (
        <ListItem onPress={() => navigate('ImageGallery', { photos: offeringToShow.photos })}>
          <TouchableOpacity
            key={offeringToShow.id}
            onPress={() => navigate('ImageGallery', { photos: offeringToShow.photos })}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: `http://localhost:1337/${v.url}` }}
            />
          </TouchableOpacity>
        </ListItem>
      )}>
      </List>

      <List horizontal={true} dataArray={offeringToShow.videos} keyExtractor={(item, index) => index.toString()} renderRow={v => (
        <ListItem onPress={() => navigate('ImageGallery', { photos: offeringToShow.photos })}>
          <TouchableOpacity
            key={offeringToShow.id}
            onPress={() => navigate('ImageGallery', { photos: offeringToShow.photos })}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: `http://localhost:1337/${v.thumbnail}` }}
            />
          </TouchableOpacity>
        </ListItem>
      )}>
      </List>

      <View style={{ marginBottom: 5 }}>
        <Button style={DefaultTheme.backgroundColorPrimaryColor} rounded onPress={() => navigate('Expert', { id: offeringToShow.user.id })}>
          <Text>See Expert</Text>
        </Button>
      </View>
      {offeringToShow.user.id === user?.id ? (
        <View style={{ marginTop: 5 }}>
          <Button style={DefaultTheme.backgroundColorPrimaryColor} rounded onPress={() => navigate('EditOffering', { id: offeringToShow.id })}>
            <Text>Edit</Text>
          </Button>
        </View>
      ) : null}
    </>
  );
}

export default Wrapper(OfferingPage);