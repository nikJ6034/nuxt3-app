import Role from './Role';
import Privilege from './privilege'

export default interface RolePrivilege {
    role: Role,
    privilegeList: Privilege[]
}