import Privilege from "./privilege";

export default interface PrivilegeGroup {
    priGpName: string,
    priGpValue: string,
    privilegeList: Privilege[]
}