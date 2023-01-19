import Role from './role'

export interface Menu {
    id: number,
    menuType: string,
    menuSe: string,
    menuOrder: number,
    menuNm: string,
    upperMenu: Menu,
    lowerMenu: Menu[],
    menuPath: string,
    menuDesc: string,
    useYn: boolean,
    visibleYn: boolean,
    delYn: boolean,
    roleList: Role[],
    inheritRoleList: Role[]
    depth: string
}