<script setup lang="ts">
import Token from '~~/types/token';

definePageMeta({
    layout: "login"
});

let {login : signIn} = useMyAuth();
let loginInfo = reactive({username:"", password:""})
const {apiOptions} = useMyApi();
let {apiUrl} = useMyApi();
const config = useRuntimeConfig();
const router = useRouter();

let login = async function(){

    let {data, error} = await useFetch<Token>(
                                    ()=>`/api/login/basic?memberId=${loginInfo.username}&password=${loginInfo.password}`
                                    ,apiOptions({
                                        method:"POST"
                                    })
                                )

    if(error.value){
        alert(error.value.data.msg)
        return 
    }

    signIn(data.value);
    router.push("/admin/main")
}

let loginGoogle = ()=> {
    location.href= `${apiUrl('/oauth2/authorization/google')}?redirect_uri=${config.HOST_URL}/api/oauth2/callback`;
}

let loginKakao = ()=> {
    location.href= `${apiUrl('/oauth2/authorization/kakao')}?redirect_uri=${config.HOST_URL}/api/oauth2/callback`;
}

</script>

<template>
    <div class="container">
        <div class="row my-5">
            <div class="text-center">
                <h1>로그인</h1>
            </div>
        </div>
        <div class="row">
            <section class="container">
                <div class="row justify-content-center">
                    <div class="col-6">
                        <div class="">
                            <input type="text" v-model="loginInfo.username" maxlength="20" placeholder="" class="form-control form-control" />
                        </div>
                        <div class="">
                            <input type="password" v-model="loginInfo.password" maxlength="20" placeholder="" class="form-control form-control" />
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" id="loginIdCookie" class="custom-control-input">
                            <label class="custom-control-label" style="cursor:pointer;" for="loginIdCookie">아이디 저장</label>
                        </div>
                        <button class="btn btn-block btn-xl btn-primary" @click="login">로그인</button>
                    </div>
                </div>
                <div class="row justify-content-center text-center mt-2">
                    <div class="col-6">
                        <button class="btn btn-primary ms-1" @click="loginGoogle">구글 로그인</button>
                        <button class="btn btn-warning ms-1" @click="loginKakao">카카오 로그인</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style>

</style>