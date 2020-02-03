import React, { useState } from 'react';

import Modal from './Modal';
import { Button, Text, Item } from 'native-base';
import { TouchableOpacity, Image } from 'react-native';

type Props = { files: { src: string, id: number }[], deleteFunc: (file: { src: string, id: number }) => Promise<unknown> }

const FileEditableList: React.FunctionComponent<Props> = ({ files, deleteFunc }) => {
    const [ selectedFile, setSelectedFile ] = useState<{ src: string, id: number } | null>(null);

    return(
        <>
            <Item>
                {files.map(f => {
                    return (
                        <TouchableOpacity
                            key={f.id}
                            onPress={() => setSelectedFile(f)}
                        >
                            <Image
                                style={{width: 50, height: 50}}
                                source={{ uri: `http://localhost:1337${f.src}` }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </Item>
            {!selectedFile ? null: (
                <Modal open={true} title={'Do you want to delete this file?'} onCancel={() => setSelectedFile(null)}>
                    <Button danger={true} style={{ marginTop: 5}} onPress={() => {
                        deleteFunc(selectedFile)
                        .then(() => setSelectedFile(null));
                    }}>
                        <Text>Delete</Text>
                    </Button>
                </Modal>
            )}
        </>
    );
}

export default FileEditableList;