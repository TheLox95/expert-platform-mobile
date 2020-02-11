import React, { useState, useCallback } from 'react';
import DocumentPicker from 'react-native-document-picker';
import { useForm, Controller, OnSubmit, EventFunction } from 'react-hook-form'
import { WrappedComponent } from '../state/WrappedComponent';
import Wrapper from '../state/Wrapper';
import { Form, Item, Input, Button, Text } from 'native-base';
import { useNavigation, useFocusEffect, useNavigationParam } from 'react-navigation-hooks';
import useFileUpload from '../tools/UploadManager/useFileUpload';
import { Video, Photo, Offering } from 'src/models';
import { Image, TouchableOpacity, BackHandler } from "react-native"
import Modal from '../tools/Modal';
import { useEffect } from 'react';
import { DefaultTheme } from '../theme';

const EditExpertScreen: WrappedComponent = ({ requests: { file: fileRequest, offering: offeringRequets } }) => {
    const { navigate } = useNavigation()
    const [wasSend, setWasSend] = useState(false)
    const offeringId = useNavigationParam('id')
    const [offeringToEdit, setOfferingToEdit] = useState<Offering | null>(null)

    const [deleteVideo, uploadedVideos, setVideo, msgVideo, resetVideo] = useFileUpload<Video>('pick video', fileRequest)
    const [deleteImage, uploadedImages, setImage, msgImage, resetImage] = useFileUpload<Photo>('pick image', fileRequest)

    useEffect(() => {
        offeringRequets.getOffering(offeringId)
            .then(o => setOfferingToEdit(o))
    }, []);

    useFocusEffect(useCallback(() => {
        // when using react-navigation-drawer the component does not unmount when you navigate to another router
        // so we have to reset the state manually when the scree loose focus
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            resetVideo({ deleteUploaded: !wasSend })
            resetImage({ deleteUploaded: !wasSend })
        });
        return () => subscription.remove();
    }, [uploadedVideos.length, uploadedImages.length]));

    const [imageToDelete, setImageToDelete] = useState<null | number>(null);
    const [videoToDelete, setVideoToDelete] = useState<null | number>(null);

    const { control, handleSubmit, errors } = useForm<Offering>();

    const send = handleSubmit((data) => {
        if (!offeringToEdit) return

        offeringRequets.edit({
            ...offeringToEdit,
            name: data.name,
            description: data.description,
            videos: offeringToEdit.videos.concat(...uploadedVideos),
            photos: offeringToEdit.photos.concat(...uploadedImages)
        })
            .then((r) => { setWasSend(true); return r })
            .then((offering) => navigate('Offering', { offering }))
    })
    const onChange: EventFunction = (t) => {
        return {
            value: t[0].nativeEvent.text,
        };
    };

    if (!offeringToEdit) return null;

    return (
        <Form>
            <Item>
                <Controller
                    as={<Input placeholder="Name" />}
                    control={control}
                    name="name"
                    onChange={onChange}
                    rules={{ required: true }}
                    defaultValue={offeringToEdit.name}
                />
                {errors.name && <Text>This is required.</Text>}
            </Item>
            <Item>
                <Controller
                    as={<Input placeholder="Description" />}
                    control={control}
                    name="description"
                    onChange={onChange}
                    rules={{ required: true }}
                    defaultValue={offeringToEdit.description}
                />
                {errors.description && <Text>This is required.</Text>}
            </Item>


            <Item>
                <Button rounded style={DefaultTheme.backgroundColorPrimaryColor} onPress={() => {
                    DocumentPicker.pick({
                        type: [DocumentPicker.types.images],
                    })
                        .then(file => {
                            setImage(file)
                        })
                }}>
                    <Text>{msgImage}</Text>
                </Button>
            </Item>

            <Item>
                {offeringToEdit.photos.concat(...uploadedImages).map(f => {
                    return (
                        <TouchableOpacity
                            key={f.id}
                            onPress={() => setImageToDelete(f.id)}
                        >
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={{ uri: `http://localhost:1337${f.url}` }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </Item>


            {imageToDelete ? (
                <Modal open={true} title={'Select one'} onCancel={() => setImageToDelete(null)}>
                    <Button style={{ marginBottom: 5 }} onPress={() => navigate('ImageGallery', { photos: offeringToEdit.photos })}>
                        <Text>See photos</Text>
                    </Button>
                    <Button danger={true} style={{ marginTop: 5 }} onPress={() => {
                        const selectedImg = uploadedImages.concat(offeringToEdit.photos).find(i => i.id === imageToDelete)
                        deleteImage(selectedImg || null)
                            .then(() => setImageToDelete(null))
                    }}>
                        <Text>Delete</Text>
                    </Button>
                </Modal>
            ) : null}


            <Item>
                <Button rounded style={DefaultTheme.backgroundColorPrimaryColor} onPress={() => {
                    DocumentPicker.pick({
                        type: [DocumentPicker.types.video],
                    })
                        .then(file => {
                            setVideo(file)
                        })
                }}>
                    <Text>{msgVideo}</Text>
                </Button>
            </Item>

            {videoToDelete ? (
                <Modal open={true} title={'Select one'} onCancel={() => setVideoToDelete(null)}>
                    <Button style={{ marginBottom: 5 }} onPress={() => navigate('VideoPlayer', { video: offeringToEdit.videos.find(v => v.id === videoToDelete) })}>
                        <Text>Watch Video</Text>
                    </Button>
                    <Button danger={true} style={{ marginTop: 5 }} onPress={() => {
                        const selectedVideo = uploadedVideos.concat(offeringToEdit.videos).find(i => i.id === videoToDelete)
                        deleteVideo(selectedVideo || null)
                            .then(() => setVideoToDelete(null))
                    }}>
                        <Text>Delete</Text>
                    </Button>
                </Modal>
            ) : null}

            <Item>
                {offeringToEdit.videos.concat(...uploadedVideos).map(f => {
                    return (
                        <TouchableOpacity
                            key={f.id}
                            onPress={() => setVideoToDelete(f.id)}
                        >
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={{ uri: `http://localhost:1337${f.thumbnail}` }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </Item>


            <Button rounded style={DefaultTheme.backgroundColorPrimaryColor} onPress={send}>
                <Text>Edit</Text>
            </Button>
        </Form>
    );

}

export default Wrapper(EditExpertScreen)