import jwt_decode from "jwt-decode";
import UserInfo from "../types/user";
import Token from "../types/token";
import { CookieOptions } from "#app";

export default function () {

    const {apiOptions} = useMyApi();
    const cookieOptions : CookieOptions = {maxAge:60*60*24*365*2,path:"/"}

    const accessToken = useAccessToken();
    const refreshToken = useCookie<string>('refreshToken', cookieOptions);
    const accessTokenCookie = useCookie<string>('accessToken', cookieOptions);

    function login(token : Token) : void{
        accessToken.value = token.accessToken
        refreshToken.value = token.refreshToken;
    }

    function removeToken() : void {
        accessToken.value = null;
        refreshToken.value = null;
        accessTokenCookie.value = null;
    }

    async function refetchToken() {
        const userInfo = getUserInfo();
        const now : number = new Date().getTime();
        if(userInfo.id==null || userInfo?.exp  < now/1000){
            await refresh();
        }
    }

    async function refresh() {
        if(refreshToken.value){
            //리플레시 토근을 가지고 로그인을 시도합니다.
            const {data : token , error} = await useFetch<Token>(
                                                ()=>`/token/refresh`
                                                ,apiOptions({
                                                    method:"get"
                                                    , headers:{refreshToken:refreshToken.value}
                                                })
                                            )
            if(error.value){
                removeToken()
                return
            }
            refreshToken.value = null;
            login(token.value);
        }
    }

    function isLogin() : boolean {
        if(accessToken.value){
        return true;
        }else{
        return false;
        }
    }

    function getUserInfo() : UserInfo {
        if(isLogin()){
        const userInfo : UserInfo = jwt_decode(accessToken.value);
        return userInfo;
        }else{
        return {roles:[], id:null, userName:''} as UserInfo;
        }
    }

    return {
        login,
        removeToken,
        refresh,
        isLogin,
        getUserInfo,
        refetchToken,
    }
}