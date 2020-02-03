
import React from 'react';
import NativeModal from "react-native-modal";
import { Content, Text } from 'native-base';
import { useState } from 'react';

type Props = { title: string, open: boolean, onCancel: () => void }

const Modal: React.FunctionComponent<Props> = ({ children, title, open, onCancel }) => {

    const [ isVisible, setIsVisible ] = useState(open);

    return (
        <NativeModal
            hasBackdrop={true}
            isVisible={isVisible}
            style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}
            onBackdropPress={() => {
                setIsVisible(false)
                onCancel()
            }}
        >
            <Content style={{ backgroundColor: '#FFFFFF', padding: 20 }}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>{title}</Text>
                {children}
            </Content>
        </NativeModal>
      )
}

export default Modal;