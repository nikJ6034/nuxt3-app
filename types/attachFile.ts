export default interface AttachFile {
    id?: number,
    order: number,
    orginName: string,
    size: number,
    ext?: string,
    regDt?: Date
    delYn: boolean,
    file?: File,
    uuid?: string
}