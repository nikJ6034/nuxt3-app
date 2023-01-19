import { Menu } from "~~/types/menu";

export default function(){
    const {getUserInfo} = useMyAuth();
    const {apiOptions} = useMyApi();
    const currentMenu = useCurrentMenu();
    const adminMenu = useAdminMenu();
    const superRole = 'ROLE_SUPER'

    async function findAdminMenu(){
        const {data: menuList} = await useFetch<Menu[]>(
                                    ()=>`/api/menus`
                                    , apiOptions({
                                        method: "GET",
                                        params: {menuType:'ADMIN'}
                                    })
                                )

        adminMenu.value = menuList.value
    }

    function setCurrentMenu(menuList: Menu[], path: string){
        currentMenu.value = null;
        findCurrentMenu(menuList, path);
    }

    function findCurrentMenu(menuList: Menu[], path: string){
        
        for(const menu of menuList){
            if(menu.menuPath == path){
                currentMenu.value = menu
            }
            if(menu.lowerMenu.length > 0){
                findCurrentMenu(menu.lowerMenu, path );
            }
        }
    }

    function menuRoleAccess(menu: Menu, allow: boolean = true){
        const userInfo = getUserInfo();
        const userRoles: string[] = userInfo.roles
        // userInfo.roles.forEach(function(item){
        //     userRoles.push(item.roleValue)
        // })

        //슈퍼 계정일경우 아래 검증을 모두 건너뛴다.
        if(useIndexOf(userRoles,superRole) > -1){
            return true;
        }

        //메뉴에 등록이 안된 페이지는 allow값에 따라 영향을 받습니다.
        if(menu == null){
            return allow;
        }
        const inheritRole: string [] = [];
        const menuRole: string [] = [];
    
        menu.inheritRoleList.forEach(function(item){
            inheritRole.push(item.roleValue)
        })
        menu.roleList.forEach(function(item){
            menuRole.push(item.roleValue)
        })
    
        const menuRoles = useXor(inheritRole, menuRole)
        //메뉴에 설정된 권한이 없는 경우는 무조건 참.
        if(menuRoles.length == 0){
            return true;
        }else{
            //배열에 교집합에서 값이 존재할 경우에는 권한이 있는것으로 본다.
            const intersectionRole = useIntersection(menuRoles, userRoles)
            return intersectionRole.length > 0;
        }
    }

    return {
        setCurrentMenu,
        findAdminMenu,
        menuRoleAccess
    }

}