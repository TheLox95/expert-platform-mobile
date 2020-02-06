import React, { useState, useCallback } from 'react';
import DocumentPicker from 'react-native-document-picker';
import { useForm, Controller, OnSubmit, EventFunction } from 'react-hook-form'
import { WrappedComponent } from '../state/WrappedComponent';
import Wrapper from '../state/Wrapper';
import { Form, Item, Input, Button, Text } from 'native-base';
import { useNavigation, useFocusEffect } from 'react-navigation-hooks';
import useFileUpload from '../tools/UploadManager/useFileUpload';
import { Video, Photo } from 'src/models';
import { BackHandler } from "react-native"
import { useEffect } from 'react';
import FileEditableList from '../tools/FileEditableList';
import { DefaultTheme } from '../theme';

type UserFromData = { username: string, aboutme: string, photos: Photo[], videos: Video[] };

const EditExpertScreen: WrappedComponent = ({ useGlobalState ,requests: { file: fileRequest, user: userRequest } }) => {
    const { navigate } = useNavigation()
    const [ user ] = useGlobalState( 'user')
    const [ wasSend, setWasSend ] = useState(false)
    const { control, handleSubmit, errors } = useForm<UserFromData>({
        defaultValues: {
            username: user?.username,
            aboutme: user?.aboutme,
        }
    });

    const [ deleteVideo, uploadedVideos ,setVideo, msgVideo, resetVideo ] = useFileUpload<Video>('pick video', fileRequest)
    const [ deleteImage, uploadedImages, setImage, msgImage, resetImage ] = useFileUpload<Photo>('pick image', fileRequest)

    useEffect(() => {
        userRequest.refresh()
    }, []);

    useFocusEffect(useCallback(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            resetVideo({ deleteUploaded: !wasSend })
            resetImage({ deleteUploaded: !wasSend }) 
        });
        return () => subscription.remove();
    }, [uploadedVideos.length, uploadedImages.length]));

    const send  = handleSubmit((data) => {
      if (!user) return 

      userRequest.update({
        ...user,
        username: data.username,
        aboutme: data.aboutme,
        videos: user.videos.concat(...uploadedVideos),
        photos: user.photos.concat(...uploadedImages)
      })
      .then((r) => userRequest.refresh().then(() => r))
      .then((r) => {setWasSend(true); return r})
      .then((r) => navigate('Expert', { id: r.id }))
    })
    const onChange: EventFunction = (t) => {
      return {
        value: t[0].nativeEvent.text,
      };
    };

    if (!user) return null;

    return (
        <Form>
            <Item>
              <Controller
                as={<Input placeholder="Username" />}
                control={control}
                name="username"
                onChange={onChange}
                rules={{ required: true }}
              />
              {errors.username && <Text>This is required.</Text>}
            </Item>
            <Item>
            <Controller
                as={<Input placeholder="About me" />}
                control={control}
                name="aboutme"
                onChange={onChange}
                rules={{ required: true }}
              />
              {errors.aboutme && <Text>This is required.</Text>}
            </Item>


            <Item>
                <Button style={DefaultTheme.backgroundColorPrimaryColor} onPress={() => {
                    DocumentPicker.pick({type: [DocumentPicker.types.images]})
                    .then(file => {
                        setImage(file)
                    })
                }}>
                  <Text>{msgImage}</Text>
                </Button>
            </Item>

            <FileEditableList files={user.photos.concat(...uploadedImages).map(f => ({ ...f, src: f.url}))} deleteFunc={(image) => {
                const selectedImage = uploadedImages.concat(user.photos).find(i => i.id === image.id)
                return deleteImage(selectedImage || null)
                .then(() => userRequest.refresh())
            }}/>

            <Item>
                <Button style={DefaultTheme.backgroundColorPrimaryColor} onPress={() => {
                    DocumentPicker.pick({type: [DocumentPicker.types.video]})
                    .then(file => {
                        setVideo(file)
                    })
                }}>
                  <Text>{msgVideo}</Text>
                </Button>
            </Item>   

            <FileEditableList files={user.videos.concat(...uploadedVideos).map(f => ({ ...f, src: f.thumbnail}))} deleteFunc={(video) => {
                const selectedVideo = uploadedVideos.concat(user.videos).find(i => i.id === video.id)
                return deleteVideo(selectedVideo || null)
                .then(() => userRequest.refresh())
            }}/>

            <Button style={DefaultTheme.backgroundColorPrimaryColor} onPress={send}>
                <Text>Create</Text>
            </Button>
          </Form>
    );

}

export default Wrapper(EditExpertScreen)