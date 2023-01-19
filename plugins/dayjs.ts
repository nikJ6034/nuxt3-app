import { defineNuxtPlugin } from '#app'
import dayjs  from 'dayjs'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            dayjs
        }
    }
});