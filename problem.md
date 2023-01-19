고려할게 왜이리 많은거야 ㅡㅡ

문제점 1.
    useAsyncData 옵션중 initialCache 기본값이 왜 true인가? 깔끔하게 해결방법은?
    initialCache 속성을 false로 변경하지 않으면 중복요청이 되지 않는다. (첫번째 요청은 정상적으로 완료되지만 그 다음 요청부터는 동작을 하지 않음.)
    문제는 싱글페이지 웹에서 페이지 전환된 경우에도 적용이 된다는 것. 다른 페이지 접근 후에 다시 이전 페이지로 되돌아 갈경우 initialCache가 true로 설정된 경우엔는 데이터를 요청하지 않는다.
    수정 시에도 수정을 한번 요청하고 다시 요청하면 동작을 안함.
    useAsyncData에 key 값은 아예 데이터 자체가 되어 캐싱됨.
    개발 방향이 틀린건지 모르겠지만 일일이 initialCache를 false로 설정하고 있음.
    해결 방법이 만족스럽지 않아 다른 방법을 찾아봐야함.
문제점 2.
    현재 타입을 interface로 정의했는데 이게 맞는 선택인지 아직 잘 모르겠다.
    좀 더 확인해보고 type으로 변경할지 추후에 알아보자.
문제점 3.
    페이지에 querystring을 추가해서 링크를 직접 접속하면 301 리다이렉트가 뜨면서 querystring이 전부 없어짐. (아마도 버전 업하면서 생긴 문제인듯.)
문제점 4.
    routeMiddleware에서 asnyc await를 사용하면 아래와 같은 경고문이 뜸. 찝찝함.. 방법이 틀린건가? routeMiddleware에서 asnyc await 사용안하는법을 도무지 생각이 안난다 ㅡㅡ
    onServerPrefetch is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.

메모 1
    query와 params는 정확히 구분되는 기능으로 분리됨
    쿼리는 일반적으로 파라미터라 부르는 ?뒤에 오는 것들 예) /test?id=1
    params는 동적 url에 매칭되는 값을 param이라하는것 같음. 예) /test/1
메모 2
    같은 url을 push하면 페이지 이동이 안됨
    이럴경우 route.push({path:'/test', params: {}}) 이렇게 넣어 변경해야하는데 주의할 점은 route에 있는 params와 query안의 값을 변경해서 바로 날려주면 페이지 변화가 없다.
    이유는 정확하게 모르지만 아마도 변경된 자체의 값과 push된 값을 비교하는데 이미 변경된 값과 변경된 값으로 날린 push는 동일한 화면으로 취급하기 때문에 url이 변경되지 않는다.
    따라서 push에 보낼 값은 아예 새로운 곳에 담아서 보내야함.
    페이지 url이 동일한데 단순 새로고침을 하려고하면 fetch에서 지원해주는 refresh를 사용
메모 3.
    파일 업로드 시에는 useFetch를 사용 못한다.... 왜냐면 요청 데이터를 FormData로 날릴 시 에러가 난다 ㅡㅡ
    아마 useFetch 자체 오류인것으로 판단하고 향후 버전업이 되가면서 수정이 될지 유심히 살펴보자. 일단은 useAsnycData를 이용하여 $fetch를 통해서 파일 업로드를 하고 있음.
    사실 이방법이 되어서 문제까진 아닌데.. 그냥 일단 써놨다 ㅋㅋ
메모 4.
    특별한 경우가 아닌경우 수정, 삭제, 등록은 $fetch() 함수를 써서 요청을 날릴 것. useFetch, useAsyncData를 쓰면 캐싱이 디폴트로 되어 있어서 적절한 함수가 아닌것 같음.
    아직 nuxt에 대한 이해가 부족해서 이런 판단을 할 수도 있으니 추후에 다른 판단을 할 가능성이 있음.

주의 1
    route.query, route.param의 값은 필히 ref에 등록 후 사용하도록!!!
    ref에 등록안하고 바로 `/test/${route.query.id}`이런식으로 요청하면 다른 페이지 전환시에 param이나 query값이 변하기 때문에 의도치않게 `/test/${route.query.id}`의 요청이 한번 더 이루어짐.
    때문에 필히!!!! ref에 등록할것!