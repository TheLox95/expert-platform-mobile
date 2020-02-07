import React, { useState, useEffect, useCallback } from 'react';

import { H2, Button } from "native-base";
import { Image, TouchableOpacity, Text } from "react-native"
import { useNavigationParam, useNavigation, useFocusEffect, useNavigationState } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { Offering } from '../models';
import Markdown from 'react-native-markdown-renderer';

const OfferingPage: WrappedComponent = ({ requests }) => {
  const [offeringToShow, updateOfferingToShow] = useState<Offering | null>(null);
  let offeringId = useNavigationParam('id');
  const { navigate } = useNavigation();
  const { offering: offeringRequests } = requests;

  useFocusEffect(useCallback(() => {
    if (!offeringId) return;

    offeringRequests.getOffering(offeringId)
      .then(o => updateOfferingToShow(o));
    return () => {
      updateOfferingToShow(null)
      // useFocusEffect is called when component takes focus
      // offeringId is part of the state react-navigation-hooks
      // when we pass a new offeringId the useFocusEffect calls the function with the old offeringId value
      // reads the new value and call it again
      // we set offeringId to null to trigger update of the function with the new value
      offeringId = null
    }
  }, [offeringId]));


  if (!offeringToShow) return null;

  return (
    <>
      <H2>{offeringToShow.name}</H2>
      <Markdown>
        {offeringToShow.description}
      </Markdown>

      {offeringToShow.videos.map(v => {
        return (
          <TouchableOpacity
            key={offeringToShow.id}
            onPress={() => navigate('VideoPlayer', { video: v })}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: `http://localhost:1337${v.thumbnail}` }}
            />
          </TouchableOpacity>
        );
      })}

      {offeringToShow.photos.map(p => {
        return (
          <TouchableOpacity
            key={offeringToShow.id}
            onPress={() => navigate('ImageGallery', { photos: offeringToShow.photos })}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: `http://localhost:1337/${p.url}` }}
            />
          </TouchableOpacity>
        );
      })}

      <Button onPress={() => navigate('Expert', { id: offeringToShow.user.id })}>
        <Text>See Expert</Text>
      </Button>
      <Button onPress={() => navigate('EditOffering', { id: offeringToShow.id })}>
        <Text>Edit</Text>
      </Button>
    </>
  );
}

export default Wrapper(OfferingPage);