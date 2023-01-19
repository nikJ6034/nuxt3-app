
export default interface UserInfo {
    id : number,
    userName : string,
    roles : string[],
    privileges : string[],
    iat : number,
    exp : number,
}