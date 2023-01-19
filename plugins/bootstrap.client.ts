import { defineNuxtPlugin } from '#app'
import * as bs from 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.css'

export default defineNuxtPlugin(() => {

    return {
        provide: {
            bs
        }
    }
});