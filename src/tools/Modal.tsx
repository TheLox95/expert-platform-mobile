
import React from 'react';
import NativeModal from "react-native-modal";
import { Content, H3 } from 'native-base';
import { useState } from 'react';

type Props = { title: string, open: boolean, onCancel: () => void }

const Modal: React.FunctionComponent<Props> = ({ children, title, open, onCancel }) => {

    const [ isVisible, setIsVisible ] = useState(open);

    return (
        <NativeModal

            isVisible={isVisible}
            style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}
            onBackdropPress={() => {
                setIsVisible(false)
                onCancel()
            }}
        >
            <Content style={{ backgroundColor: '#FFFFFF', padding: 20 }}>
                <H3 style={{ textAlign: 'center', marginBottom: 10 }}>{title}</H3>
                {children}
            </Content>
        </NativeModal>
      )
}

export default Modal;