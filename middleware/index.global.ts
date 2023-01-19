export default defineNuxtRouteMiddleware(/*async*/ (to) => {
    // const {isLogin} = useMyAuth();
    // const currentMenu = useCurrentMenu();
    // const adminMenu = useAdminMenu();
    // const {setCurrentMenu, findAdminMenu, menuRoleAccess} = useMyMenu();

    // //토큰 기간이 만료되면 refresh 토큰을 이용하여 accessToken을 재발급한다.
    // const {refetchToken} = useMyAuth();
    // await refetchToken();
    // //토큰 기간이 만료되면 refresh 토큰을 이용하여 accessToken을 재발급한다.

    // //admin 페이지 처리---------------
    // if(to.fullPath.indexOf('/admin') == 0){
    //     //관리자페이지는 로그인이 필요한 서비스입니다.
    //     if(!isLogin()){
    //         return navigateTo('/login')
    //     }
    //     //관리자페이지는 로그인이 필요한 서비스입니다.

    //     //메뉴별 접근 권한에 따른 검증 체크-----------------------
    //     //admin menu를 스토어에 저장합니다.
    //     await findAdminMenu();
    //     setCurrentMenu(adminMenu.value, to.matched[0].path)


    //     if(!menuRoleAccess(currentMenu.value, false)){
    //         return abortNavigation();
    //     }
    //     //메뉴별 접근 권한에 따른 검증 체크-----------------------
    // }
    // //admin 페이지 처리---------------

})