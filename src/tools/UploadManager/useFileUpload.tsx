import { useState, useEffect } from "react"
import LocalFile from "./LocalFile"
import Manager from "./Manager"
import { FileRequestInterface } from "../../requests/File.request"
import { dispatch } from "../../state/GlobalState";

type ReturnType<T> = [
    (file: T | null) => Promise<T>,
    T[],
    React.Dispatch<React.SetStateAction<LocalFile | null>>,
    string,
    (opt?: { deleteUploaded?: boolean }) => void 
]

export default function useFileUpload<T extends { id: number }>(tag: string,fileRequest: FileRequestInterface): ReturnType<T>{
    const [ progress, setProgress ] = useState(0)
    const [ file, setFile ] = useState<LocalFile | null>(null)
    const [ fileUploaded, setFilesUploaded ] = useState<T[]>([])

    const progressText = (progress > 0 && progress < 100) ? `${progress}%`: tag
    const manager = new Manager<T>(fileRequest)

    const resetFunction = async (opt?: { deleteUploaded?: boolean } ) => {
        if (opt?.deleteUploaded === true) {
            await Promise.all(fileUploaded.map(r => manager.remove(r)))
        }
        setProgress(0)
        setFile(null)
        setFilesUploaded([])
    }

    useEffect(() => {
        if (!file) return;

        manager.set(file)
            manager.upload()
            ?.subscribe(
                (soFar) => {
                    if (typeof soFar === 'number') {
                        setProgress(soFar)
                    } else {
                        setFilesUploaded((prev) => {
                            return [...prev, soFar]
                        })
                    }
                },
                (file) => dispatch({ type: 'error', payload: `Error uploading ${file.name}` }),
                () => dispatch({ type: 'success', payload: `${file.name} uploaded!` }),
            )
    }, [file]);

    const remove = async (file: T | null) => {
        if (!file) throw new Error('No file pass');
        const deletedFile = await manager.remove(file)
        setFilesUploaded(fileUploaded.filter(r => r.id !== file.id))
        return deletedFile;
    }

    return [ remove, fileUploaded, setFile, progressText, resetFunction ]
}