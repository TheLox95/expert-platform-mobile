import { Subject, Observable } from 'rxjs'; 
import { HttpInstance } from "./http";
import { Platform } from 'react-native';
import LocalFile from '../tools/UploadManager/LocalFile';
import { Photo, Video } from 'src/models';

const FileRequest: (http: HttpInstance) => FileRequestInterface = (http) => {
    const upload = <T>(file: LocalFile) => {
        const data = new FormData()
        data.append('files', {
            name: file.name,
            type: file.type,
            uri: Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
        })

        const subject = new Subject<number | T>();

        http<T[]>({
            url: `http://localhost:1337/offerings/upload`,
            method: 'post',
            data,
            onUploadProgress: function(progressEvent: {loaded: number, total: number} ) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                subject.next(percentCompleted)
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            subject.next(response[0])
            subject.complete()
        })
        .catch(() => {
            subject.error(file)
        })

        return subject.asObservable();
    }

    const remove = <T extends { id: number }>(file: T) => {
        return http<T>({
            url: `http://localhost:1337/offerings/files/${file.id}`,
            method: 'delete'
        })

    }

    return {
        upload,
        remove,
    }
}

export interface FileRequestInterface {
    remove: <T extends { id: number }>(id: T) => Promise<T>
    upload: <T>(file: LocalFile) => Observable<number | T>
}

export default FileRequest;