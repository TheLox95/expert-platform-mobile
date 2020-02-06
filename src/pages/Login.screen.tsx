import React from 'react';
import { useForm, Controller, OnSubmit, EventFunction } from 'react-hook-form'
import { WrappedComponent } from '../state/WrappedComponent';
import Wrapper from '../state/Wrapper';
import { Form, Item, Input, Button, Text } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';

const LoginScreen: WrappedComponent = ({ requests: { user } }) => {
    const { navigate } = useNavigation()
    const { control, handleSubmit, errors } = useForm<{username: string, password: string}>();

    const send  = handleSubmit((data) => {
      user.login({ identifier: data.username, password: data.password}).then(() => navigate('Home'))
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
                as={<Input placeholder="Password" />}
                control={control}
                name="password"
                onChange={onChange}
                rules={{ required: true }}
              />
              {errors.password && <Text>This is required.</Text>}
            </Item>
            <Button onPress={send}>
                <Text>Login</Text>
            </Button>
          </Form>
    );

}

export default Wrapper(LoginScreen)