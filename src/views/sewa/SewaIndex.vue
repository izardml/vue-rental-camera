<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

let cameras = ref([])
let url = 'http://localhost:8000/api/sewa/create'

onMounted(() => {
    axios.get(url).then(response => {
        cameras.value = response.data.data.camera
    }).catch(error => {
        console.log(error.response.data)
    })
})
</script>

<template>
    <div class="flex w-full gap-6">
        <router-link v-for="(camera, index) in cameras" :key="index" :to="{name: 'camera.detail', params:{id: camera.id}}" class="border-2 flex flex-col w-1/6 overflow-hidden rounded-xl p-4 cursor-pointer hover:shadow-lg">
            <img :src="'/src/assets/img/camera-' +camera.id+ '.jpg'" :alt="camera.name" class="w-full">
            <h1 class="text-xl font-medium text-slate-700 border-t pt-2 mt-2">{{ camera.name }}</h1>
            <span class="font-medium text-slate-700 block float-right">{{ 'Rp.' + camera.tarif + '/hari' }}</span>
        </router-link>
    </div>
</template>