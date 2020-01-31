import { useState, useEffect } from "react"
import { Text } from 'native-base';
import LocalFile from "./LocalFile"
import Manager from "./Manager"
import { FileRequestInterface } from "../../requests/File.request"
import { dispatch } from "../../state/GlobalState";
import { Photo, Video } from "src/models";

type Response = (Photo | Video )[];
type ReturnType = [ Response, React.Dispatch<React.SetStateAction<LocalFile | null>>, string]

export default function useFileUpload(tag: string,fileRequest: FileRequestInterface): ReturnType{
    const [ progress, setProgress ] = useState(0)
    const [ file, setFile ] = useState<LocalFile | null>(null)
    const [ response, setResponse ] = useState<Response>([])

    const progressText = (progress > 0 && progress < 100) ? `${progress}%`: tag

    useEffect(() => {
        if (file) { 
            const manager = new Manager(fileRequest)
            manager.set(file)
            manager.upload()
            ?.subscribe(
                (soFar) => {
                    if (typeof soFar === 'number') {
                        setProgress(soFar)
                    } else {
                        setResponse((prev) => {
                            return [...prev, soFar]
                        })
                    }
                },
                (file) => dispatch({ type: 'error', payload: `Error uploading ${file.name}` }),
                () => dispatch({ type: 'success', payload: `${file.name} uploaded!` }),
            )
        }
    }, [file]);

    return [ response, setFile, progressText ]
}