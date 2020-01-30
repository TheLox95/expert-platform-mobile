import React, { useState } from 'react';
import { WrappedComponent } from '../state/WrappedComponent';
import Wrapper from '../state/Wrapper';
import { Form, Item, Input, Button, Text } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';

const LoginScreen: WrappedComponent = ({ requests: { user }, useGlobalState }) => {
    const { navigate } = useNavigation()
    const [ username, updateUsername] = useState('');
    const [ password, updatePassword] = useState('');

    const send = () => user.login(username, password).then(() => navigate('Home'))

    return (
        <Form>
            <Item>
              <Input placeholder="Username" onChangeText={(t) => updateUsername(t)}/>
            </Item>
            <Item>
              <Input placeholder="Password" onChangeText={(t) => updatePassword(t)}/>
            </Item>
            <Button onPress={send}>
                <Text>Login</Text>
            </Button>
          </Form>
    );

}

export default Wrapper(LoginScreen)