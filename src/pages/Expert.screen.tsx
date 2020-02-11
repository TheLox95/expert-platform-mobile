import React, { useState, useEffect } from 'react';

import { H2, List, ListItem, Content, View } from "native-base";
import { Image, StyleSheet, SafeAreaView } from "react-native"
import { useNavigation, useNavigationParam  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import Markdown from 'react-native-markdown-renderer';
import { User } from 'src/models';
import { MemoizedOfferingCard } from '../tools/OfferingCard';
import { DefaultTheme, Colors } from '../theme';
import { FlatList } from 'react-native-gesture-handler';

const MarkdownStyles = StyleSheet.create({ text: { color: Colors.PRIMARY_TEXT_COLOR} })

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
        <View style={DefaultTheme.backgroundColorPrimaryDarkColor}>
          <H2 style={DefaultTheme.onPrimaryColorText}>{userToShow.username}</H2>
          <Markdown style={MarkdownStyles}>
            {userToShow.aboutme}
          </Markdown>
        </View>

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

        <SafeAreaView>
          <FlatList
            horizontal={true}
            data={userToShow.offerings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={offering => (
              <ListItem onPress={() => navigate('Offering', { id: offering.item.id })}>
                  <MemoizedOfferingCard offering={offering.item} />
              </ListItem>
          )}>
          </FlatList>
        </SafeAreaView>
      </>
    );
}

export default Wrapper(ExpertProfile, { noStyle: true });