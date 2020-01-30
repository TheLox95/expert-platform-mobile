import { Subject, Observable } from 'rxjs'; 
import { HttpInstance } from "./http";
import { Platform } from 'react-native';
import LocalFile from '../tools/UploadManager/LocalFile';

const FileRequest: (http: HttpInstance) => FileRequestInterface = (http) => {
    const upload = (file: LocalFile) => {
        const data = new FormData()
        data.append('files', {
            name: file.name,
            type: file.type,
            uri: Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
        })

        const subject = new Subject<number>();

        http({
            url: `http://localhost:1337/offerings/upload`,
            method: 'post',
            data,
            onUploadProgress: function(progressEvent: {loaded: number, total: number} ) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                subject.next(percentCompleted)
                if (percentCompleted === 100) {
                    subject.complete()
                }
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch(() => {
            subject.error(file)
        })

        return subject.asObservable();
    }

    return {
        upload,
    }
}

export interface FileRequestInterface {
    upload: (file: LocalFile) => Observable<number>
}

export default FileRequest;