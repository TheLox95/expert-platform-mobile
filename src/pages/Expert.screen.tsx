import React, { useState, useEffect } from 'react';

import { H2, List, ListItem } from "native-base";
import { Image } from "react-native"
import { useNavigation, useNavigationParam  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import Markdown from 'react-native-markdown-renderer';
import { User } from 'src/models';
import { MemoizedOfferingCard } from '../tools/OfferingCard';

const ExpertProfile: WrappedComponent = ({ requests: { user } }) => {
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

        <List horizontal={true} dataArray={userToShow.videos} keyExtractor={(item, index) => index.toString()} renderRow={v => (
             <ListItem onPress={() => navigate('VideoPlayer', { video: v })}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: `http://localhost:1337${v.thumbnail}` }}
                />
             </ListItem>
         )}>
        </List>

        <List horizontal={true} dataArray={userToShow.photos} keyExtractor={(item, index) => index.toString()} renderRow={p => (
             <ListItem onPress={() => navigate('ImageGallery', { photos: userToShow.photos })}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: `http://localhost:1337/${p.url}` }}
                />
             </ListItem>
         )}>
        </List>

        <List horizontal={true} dataArray={userToShow.offerings} keyExtractor={(item, index) => index.toString()} renderRow={offering => (
             <ListItem onPress={() => navigate('Offering', { id: offering.id })}>
                <MemoizedOfferingCard offering={offering} />
             </ListItem>
         )}>
        </List>
      </>
    );
}

export default Wrapper(ExpertProfile);