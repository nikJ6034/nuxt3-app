
export default defineNuxtRouteMiddleware(() => {
    const {isLogin} = useMyAuth();
    if(!isLogin()){
        return navigateTo('/login')
    }
})