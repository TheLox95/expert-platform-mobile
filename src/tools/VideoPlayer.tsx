
import React, { useCallback } from 'react';
import ReactNativevideo from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { Photo, Video } from 'src/models';
import { useNavigationParam, useFocusEffect } from 'react-navigation-hooks';
import { Dimensions, StatusBar } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';

const VideoPlayer: React.FunctionComponent = () => {
    const video: Video = useNavigationParam('video');

    useFocusEffect(useCallback(() => {
        // when using react-navigation-drawer the component does not unmount when you navigate to another router
        // so we have to reset the state manually when the scree loose focus
        return () => Orientation.unlockAllOrientations();
    }, []));

    Orientation.lockToLandscape();
    StatusBar.setHidden(true);

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

    return (
        <ReactNativevideo
            source={{uri: `http://localhost:1337${video.url}` }} 
            controls={true}
            resizeMode="cover"
            style={{ width: width > height ? width : height , height: height < width ? height : width }}
        />
    );
}

export default VideoPlayer;
