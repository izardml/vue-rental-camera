<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

let token = ref(localStorage.getItem('token'))
let router = useRouter()

function logout() {
    axios.get('http://localhost:8000/api/logout', { headers: {'Authorization': 'Bearer ' + token.value} }).then(() => {
        localStorage.removeItem("loggedIn")
        router.push({ name: 'login' })
    }).catch(error => {
        console.log(error.response.data)
    })
}
</script>

<template>
    <nav class="shadow-lg bg-white">
        <div class="container flex justify-between p-8">
            <div class="flex">
                <h1 class="text-4xl text-slate-800 cursor-default">Rental Camera</h1>
                <div class="px-6 self-center">
                    <router-link :to="{ name: 'sewa.index' }"><span class="text-xl p-6 mx-4 hover:border-b-4 text-slate-800 cursor-pointer">Home</span></router-link>
                    <router-link :to="{ name: 'sewa.history' }"><span class="text-xl p-6 mx-4 hover:border-b-4 text-slate-800 cursor-pointer">List Rental</span></router-link>
                </div>
            </div>
            <div class="self-center">
                <h1 @click.prevent="logout" class="text-slate-800 cursor-pointer">Logout</h1>
            </div>
        </div>
    </nav>
</template>