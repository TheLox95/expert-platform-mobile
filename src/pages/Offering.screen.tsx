import React, { useState, useEffect } from 'react';

import { H2 } from "native-base";
import { Image, TouchableOpacity } from "react-native"
import { useNavigationParam, useNavigation  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
// @ts-ignore
import VideoThumbnail from 'react-native-video-thumbnail';
import { Offering } from '../models';
import Markdown from 'react-native-markdown-renderer';

const OfferingPage: WrappedComponent = ({ requests }) => {
    const [ offeringToShow, updateOfferingToShow ] = useState<Offering | null>(null);
    const offering = useNavigationParam('offering');
    const { navigate } = useNavigation();
    const { offering: offeringRequests } = requests;

    useEffect(() => {
      offeringRequests.getOffering(offering.id)
      .then(o => updateOfferingToShow(o));
    }, []);
    
    return (
      <>
        <H2>{offeringToShow?.name}</H2>
        {offeringToShow ? (
          <Markdown>
            {offeringToShow.description}
          </Markdown>        
        ): null}

        {offeringToShow ? offeringToShow.videos.map(v => {
          return (
            <TouchableOpacity
              key={offeringToShow.id}
              onPress={() => navigate('VideoPlayer', { video: v })}
            >
              <Image
                style={{width: 50, height: 50}}
                source={{ uri: `http://localhost:1337${v.thumbnail}` }}
              />
            </TouchableOpacity>
          );
        }): null}

        {offeringToShow ? offeringToShow.photos.map(p => {
          return (
            <TouchableOpacity
              key={offeringToShow.id}
              onPress={() => navigate('ImageGallery', { photos: offeringToShow.photos })}
            >
              <Image
                style={{width: 50, height: 50}}
                source={{ uri: `http://localhost:1337/${p.url}` }}
              />
            </TouchableOpacity>
          );
        }): null}
      </>
    );
}

export default Wrapper(OfferingPage);