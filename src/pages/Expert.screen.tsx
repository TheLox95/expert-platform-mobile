import React, { useState, useEffect } from 'react';

import { H2 } from "native-base";
import { Image, TouchableOpacity } from "react-native"
import { useNavigation, useNavigationParam  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import Markdown from 'react-native-markdown-renderer';
import { User } from 'src/models';

const ExpertProfile: WrappedComponent = ({ useGlobalState, requests: { user } }) => {
    const { navigate } = useNavigation();
    const [ userToShow, setUserToShow ] = useState<User | null>();
    const id = useNavigationParam('id');

    useEffect(() => {
      user.getUser(id)
      .then(u => setUserToShow(u))
    }, []);

    if (!userToShow) return null;

    return (
      <>
        <H2>{userToShow.username}</H2>
        <Markdown>
          {userToShow.aboutme}
        </Markdown>

        {userToShow.videos.map(v => {
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
        })}

        {userToShow.photos.map(p => {
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
        })}
      </>
    );
}

export default Wrapper(ExpertProfile);