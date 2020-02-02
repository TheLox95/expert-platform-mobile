import File from "./LocalFile";
import { FileRequestInterface } from "../../requests/File.request";

export default class Manager<T extends { id: number }> { 
    file: File | null = null

    constructor(private fileRequest: FileRequestInterface) {}

    set(file: File){
        this.file = file
    }

    upload() {
        if (!this.file) return

        return this.fileRequest.upload<T>(this.file)
    }

    remove(file: T) {
        return this.fileRequest.remove<T>(file)
    }
}