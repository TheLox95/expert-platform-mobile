import React, { useState, useEffect, useCallback } from 'react';

import { H2, List, ListItem, Content, View, Button, Text } from "native-base";
import { Image, StyleSheet, SafeAreaView, BackHandler } from "react-native"
import { useNavigation, useNavigationParam, useFocusEffect } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import Markdown from 'react-native-markdown-renderer';
import { User } from 'src/models';
import { MemoizedOfferingCard } from '../tools/OfferingCard';
import { DefaultTheme, Colors } from '../theme';
import { FlatList } from 'react-native-gesture-handler';

const MarkdownStyles = StyleSheet.create({ text: { color: Colors.PRIMARY_TEXT_COLOR } })

const ExpertProfile: WrappedComponent = ({ requests: { user }, useGlobalState }) => {
  const [currentUser] = useGlobalState('user');
  const { navigate } = useNavigation();
  const [userToShow, setUserToShow] = useState<User | null>();
  let id = useNavigationParam('id');

  useFocusEffect(useCallback(() => {
    if (!id) return;

    user.getUser(id)
      .then(u => setUserToShow(u))

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setUserToShow(null)
      // useFocusEffect is called when component takes focus
      // offeringId is part of the state react-navigation-hooks
      // when we pass a new offeringId the useFocusEffect calls the function with the old offeringId value
      // reads the new value and call it again
      // we set offeringId to null to trigger update of the function with the new value
      id = null
    });
    return () => subscription.remove();
  }, [id]));

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

      {userToShow.id === currentUser?.id ? (
        <View style={{ marginTop: 5 }}>
          <Button style={DefaultTheme.backgroundColorPrimaryColor} rounded onPress={() => navigate('EditExpert', { id: currentUser.id })}>
            <Text>Edit</Text>
          </Button>
        </View>
      ) : null}
    </>
  );
}

export default Wrapper(ExpertProfile, { noStyle: true });