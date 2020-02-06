
import React, { useCallback } from 'react';
import ReactNativevideo from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { Video } from 'src/models';
import { useNavigationParam, useFocusEffect } from 'react-navigation-hooks';
import { Dimensions, StatusBar, BackHandler } from 'react-native';
import { useEffect } from 'react';

const VideoPlayer: React.FunctionComponent = () => {
    const video: Video = useNavigationParam('video');

    useFocusEffect(useCallback(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            Orientation.unlockAllOrientations();
            StatusBar.setHidden(false);
        });
        return () => subscription.remove();
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
