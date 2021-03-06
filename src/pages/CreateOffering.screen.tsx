import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import { useForm, Controller, EventFunction } from 'react-hook-form'
import { WrappedComponent } from '../state/WrappedComponent';
import Wrapper from '../state/Wrapper';
import { Form, Item, Input, Button, Text, Thumbnail } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import useFileUpload from '../tools/UploadManager/useFileUpload';
import { Photo, Video } from 'src/models';
import { DefaultTheme } from '../theme';

type OfferingFromData = { name: string, description: string, photos: [], videos: [] };

const CreateOffering: WrappedComponent = ({ useGlobalState, requests: { file: fileRequest, offering } }) => {
  const { navigate } = useNavigation()
  const [user] = useGlobalState('user')
  const { control, handleSubmit, errors } = useForm<OfferingFromData>();

  const [, uploadedVideos, setVideo, msgVideo] = useFileUpload<Video>('pick video', fileRequest)
  const [, uploadedImages, setImage, msgImage] = useFileUpload<Photo>('pick image', fileRequest)

  const send = handleSubmit((data) => {
    if (!user) return

    offering.create({
      user: user,
      name: data.name,
      description: data.description,
      photos: uploadedImages.map(p => p.id),
      videos: uploadedImages.map(p => p.id)
    })
      .then((r) => navigate('Offering', { id: r.id }))
  })
  const onChange: EventFunction = (t) => {
    return {
      value: t[0].nativeEvent.text,
    };
  };

  return (
    <Form>
      <Item>
        <Controller
          testID="create-offering-input-name"
          as={<Input placeholder="Name" />}
          control={control}
          name="name"
          onChange={onChange}
          rules={{ required: true }}
        />
        {errors.name && <Text>This is required.</Text>}
      </Item>
      <Item>
        <Controller
          testID="create-offering-input-description"
          as={<Input placeholder="Description" />}
          control={control}
          name="description"
          onChange={onChange}
          rules={{ required: true }}
        />
        {errors.description && <Text>This is required.</Text>}
      </Item>


      <Item>
        <Button style={DefaultTheme.backgroundColorPrimaryColor} onPress={() => {
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
        {uploadedImages.map(f => <Thumbnail key={f.id} square small source={{ uri: `http://localhost:1337${f?.url}` }} />)}
      </Item>

      <Item>
        <Button style={DefaultTheme.backgroundColorPrimaryColor} onPress={() => {
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

      <Item>
        {uploadedVideos.map(f => <Thumbnail key={f.id} square small source={{ uri: `http://localhost:1337${f?.thumbnail}` }} />)}
      </Item>


      <Button testID="create-offering-create-button" style={DefaultTheme.backgroundColorPrimaryColor} onPress={send}>
        <Text>Create</Text>
      </Button>
    </Form>
  );

}

export default Wrapper(CreateOffering)