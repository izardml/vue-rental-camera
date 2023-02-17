<script setup>
import GuestLayout from '../layouts/GuestLayout.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

let loggedIn = ref(localStorage.getItem('loggedIn'))
let token = ref(localStorage.getItem('token'))
let loginFailed = ref(null)
let user = reactive({
    email: '',
    password: '',
})
let validation = ref('')
let router = useRouter()

function login(){
    if (user.email && user.password) {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            console.log(response)

            axios.post('http://localhost:8000/api/login', {
                email: user.email,
                password: user.password,
            }).then(res => {
                console.log(res)

                if(res.data.success) {
                    localStorage.setItem("loggedIn", "true")
                    localStorage.setItem("token", res.data.token)
                    loggedIn.value = true
                    router.push({ name: 'sewa.index' })
                } else {
                    loginFailed.value = true
                }
            }).catch(error => {
                console.log(error)
                validation.value = error.response.data.message
            })
        })
    }

    // this.validation = []

    // if(!this.user.email) {
    //     this.validation.email = true
    // }

    // if(!this.user.password) {
    //     this.validation.password = true
    // }
}

function clear(){
    validation.value = ''
}

onMounted(() => {
    if(loggedIn.value) {
        router.push({ name: 'sewa.index' })
    }
})
</script>

<template>
    <GuestLayout>
        <div class="flex flex-col">
            <h1 class="m-auto text-4xl text-slate-800 mb-12">Rental Camera</h1>

            <form @submit.prevent="login" class="m-auto min-w-[480px] flex flex-col gap-4">
                <div class="flex">
                    <label class="w-1/3 text-slate-800 self-center">Email</label>
                    <input @input="clear" type="email" name="email" v-model="user.email" class="border w-2/3 text-xs p-2">
                </div>
                <div class="flex">
                    <label class="w-1/3 text-slate-800 self-center">Password</label>
                    <input @input="clear" type="password" name="password" v-model="user.password" class="border w-2/3 text-xs p-2">
                </div>

                <button type="submit" class="w-full bg-slate-800 text-white font-medium text-center p-2 block rounded-xl mt-12 hover:bg-slate-700">LOGIN</button>
                <p class="text-center text-xs text-red-500 italic ">{{ validation }}</p>
            </form>
        </div>
    </GuestLayout>
</template>