<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

let sewas = ref([])
let url = 'http://localhost:8000/api/sewa/1/history'

const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

onMounted(() => {
    axios.get(url).then(response => {
        sewas.value = response.data.data
    }).catch(error => {
        console.log(error.response.data)
    })
})

function hapus(id){
    let urlHapus = `http://localhost:8000/api/sewa/${id}`
    let message = 'Apakah Anda yakin?'

    if(confirm(message)){
        axios.delete(urlHapus).then(() => {
            sewas.value.splice(sewas.value.indexOf(id), 1)
        }).catch(error => {
            console.log(error.response.data)
        })
    }
}
</script>

<template>
    <div class="flex flex-col">
        <div v-for="(sewa, index) in sewas" :key="index" class="flex w-full border-b-2 last:border-none py-6">
            <div class="w-3/12">
                <img :src="'/src/assets/img/camera-' +sewa.camera_id+ '.jpg'" :alt="sewa.camera.name" class="m-auto">
            </div>
            <div class="w-9/12 p-6">
                <div>
                    <h1 class="text-3xl font-medium py-2 text-slate-800 cursor-pointer">{{ sewa.camera.name }}</h1>
                    <p class="text-slate-800">Waktu peminjaman: {{ sewa.tgl_pinjam }} s/d {{ sewa.tgl_kembali }}</p>
                    <p class="text-slate-800">Total tarif: Rp. {{ new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(sewa.total_sewa) }},00</p>
                </div>
                <div class="w-1/2 flex gap-4">
                    <router-link :to="{name:'sewa.show', params:{id: sewa.id}}" class="cursor-pointer border border-slate-800 bg-white text-slate-800 text-lg font-medium text-center py-2 px-8 inline-block rounded-xl my-4 hover:bg-slate-200">Detail</router-link>
                    <button @click.prevent="hapus(sewa.id)" class="cursor-pointer bg-slate-800 text-white text-lg font-medium text-center py-2 px-8 inline-block rounded-xl my-4 hover:bg-slate-700">Kembalikan</button>
                </div>
            </div>
        </div>
    </div>
</template>