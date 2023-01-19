import {joinURL} from 'ufo'

export default function () {
    const config = useRuntimeConfig();
    const baseUrl = config.BASE_URL;
    const accessToken = useAccessToken();

    function apiOptions(opt?: any){
        //프레임워크에서 기본 설정이 initialCache = true인데 이러면 이미 조회한 데이터는 다시 조회가 되지 않는다. 아마 ref안에 캐싱하는것 같다.
        //하지만 이러면 페이지 전환때 데이터가 다시 초기화되지 않는 문제가 발생하여 근본적인 해결방법이 없으면 일단 기본설정을 false로한다.
        let options = {
            baseURL:baseUrl
            , headers: {accessToken:accessToken.value}
            // , initialCache:false
        };
        let mergeOptons = {...options, ...opt}
        return mergeOptons;
    }

    return {
        apiUrl: (url:string)=>{
            return joinURL(baseUrl, url)
        },
        //myApiFetch,
        apiOptions
    }

}