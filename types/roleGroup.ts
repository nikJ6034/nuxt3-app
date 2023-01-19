import Role from "./role";
export default interface RoleGroup{
    id:number,
    groupName:string,
    groupDesc:string,
    roleList:Role[],
}