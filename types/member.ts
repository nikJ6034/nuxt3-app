import Role from "./role";

export default interface Member {
    id: number,
    memberId: string,
    name: string,
    email: string,
    mobile: string,
    delYn: boolean,
    oAuth2Id: string,
    clientName: string,
    roleList: Role[],
}