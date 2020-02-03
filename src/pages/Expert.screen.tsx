import React, { useState, useEffect } from 'react';

import { H2 } from "native-base";
import { Image, TouchableOpacity } from "react-native"
import { useNavigationParam, useNavigation  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { Offering, User } from '../models';
import Markdown from 'react-native-markdown-renderer';

const ExpertProfile: WrappedComponent = ({ useGlobalState, requests: { user } }) => {
    const { navigate } = useNavigation();
    const [ userToShow ] = useGlobalState('user');

    useEffect(() => {
      user.refresh()
    }, []);

    return (
      <>
        <H2>{userToShow?.username}</H2>
        {userToShow ? (
          <Markdown>
            {userToShow.aboutme}
          </Markdown>        
        ): null}

        {userToShow ? userToShow.videos.map(v => {
          return (
            <TouchableOpacity
              key={v.id}
              onPress={() => navigate('VideoPlayer', { video: v })}
            >
              <Image
                style={{width: 50, height: 50}}
                source={{ uri: `http://localhost:1337${v.thumbnail}` }}
              />
            </TouchableOpacity>
          );
        }): null}

        {userToShow ? userToShow.photos.map(p => {
          return (
            <TouchableOpacity
              key={p.id}
              onPress={() => navigate('ImageGallery', { photos: userToShow.photos })}
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

export default Wrapper(ExpertProfile);