import React, { useState, useEffect } from 'react';

import { H2, Button } from "native-base";
import { Image, TouchableOpacity, Text } from "react-native"
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { Offering } from '../models';
import Markdown from 'react-native-markdown-renderer';

const OfferingPage: WrappedComponent = ({ useGlobalState ,requests }) => {
  const [offeringToShow, updateOfferingToShow] = useState<Offering | null>(null);
  const [ offeringId ] = useGlobalState('offeringIdToDisplay');
  const { navigate } = useNavigation();
  const { offering: offeringRequests } = requests;

  useEffect(() => {
    if (!offeringId) return;
    
    offeringRequests.getOffering(offeringId)
      .then(o => updateOfferingToShow(o));
  }, []);

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