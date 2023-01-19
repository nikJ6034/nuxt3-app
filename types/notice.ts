import AttachFile from "./attachFile"

export default interface Notice {
    id?: number,
    beginDt: Date,
    endDt: Date,
    title: string,
    content: string,
    useYn: boolean,
    regDt: Date,
    regNm: string,
    attachFileList: AttachFile[]
    uploadFile: FileReader[]
}