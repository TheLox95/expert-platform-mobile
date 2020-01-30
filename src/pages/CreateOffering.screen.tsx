import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import { useForm, Controller, OnSubmit, EventFunction } from 'react-hook-form'
import { WrappedComponent } from '../state/WrappedComponent';
import Wrapper from '../state/Wrapper';
import { Form, Item, Input, Button, Text } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import Manager from '../tools/UploadManager/Manager';

type OfferingFromData = { name: string, description: string, photos: [], videos: [] };

const CreateOffering: WrappedComponent = ({ dispatch,requests: { file: fileRequest } }) => {
    const { navigate } = useNavigation()
    const { control, handleSubmit, errors } = useForm<OfferingFromData>();

    const send  = handleSubmit((data) => {
      //user.login(data.username, data.password).then(() => navigate('Home'))
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
                as={<Input placeholder="Description" />}
                control={control}
                name="description"
                onChange={onChange}
                rules={{ required: true }}
              />
              {errors.description && <Text>This is required.</Text>}
            </Item>
            <Item>
                <Button onPress={() => {
                    DocumentPicker.pick({
                        type: [DocumentPicker.types.images],
                    })
                    .then(file => {
                        const manager = new Manager(fileRequest)
                        manager.set(file)
                        manager.upload()
                        ?.subscribe(
                          (progress) => dispatch({ type: 'info', payload: `Uploading ${progress}%` }),
                          (file) => dispatch({ type: 'error', payload: `Error uploading ${file.name}` }),
                          () => dispatch({ type: 'success', payload: `${file.name} uploaded!` }),
                        )
                    })
                }}>
                    <Text>Pick</Text>
                </Button>
            </Item>
            <Button onPress={send}>
                <Text>Create</Text>
            </Button>
          </Form>
    );

}

export default Wrapper(CreateOffering)