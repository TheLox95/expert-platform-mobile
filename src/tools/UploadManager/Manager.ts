import File from "./LocalFile";
import FileRequest, { FileRequestInterface } from "../../requests/File.request";

export default class Manager { 
    files: File[] = []

    constructor(private fileRequest: FileRequestInterface) {}

    add(file: File){
        this.files.push(file)
    }

    upload() {
        this.files.map(f => {
            console.log('uploading' , f)
            //this.fileRequest.upload(f).subscribe
        });
    }
}