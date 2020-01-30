import File from "./LocalFile";
import FileRequest, { FileRequestInterface } from "../../requests/File.request";

export default class Manager { 
    file: File | null = null

    constructor(private fileRequest: FileRequestInterface) {}

    set(file: File){
        this.file = file
    }

    upload() {
        if (!this.file) return

        return this.fileRequest.upload(this.file)
    }
}