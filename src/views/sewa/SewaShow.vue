<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

let today = new Date()
let y = today.getFullYear()
let m = today.getMonth() + 1
let d = today.getDate()

const validation = ref([])
const router = useRouter()
const route = useRoute()

let sewa = reactive({
    camera_id: '',
    customer_id: '',
    tgl_pinjam: '',
    tgl_kembali: '',
})
let camera = ref([])
let customer = ref([])

let total_sewa = ref('-')

const urlSewa = `http://localhost:8000/api/sewa/${route.params.id}`

onMounted(() => {
    axios.get(urlSewa).then(response => {
        console.log(response)
        sewa.camera_id = response.data.data.camera_id
        sewa.customer_id = response.data.data.customer_id
        sewa.tgl_pinjam = response.data.data.tgl_pinjam
        sewa.tgl_kembali = response.data.data.tgl_kembali
        total_sewa.value = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(response.data.data.total_sewa)
        camera.value = response.data.data.camera
        customer.value = response.data.data.customer
    }).catch(error => {
        console.log(error.response.data)
    })
})

function hitung(){
    let d1 = new Date(sewa.tgl_pinjam)
    let d2 = new Date(sewa.tgl_kembali)

    let diff = d2.getTime() - d1.getTime()
    let dayDiff = diff / (1000 * 60 * 60 * 24) + 1

    if(dayDiff > 0){
        total_sewa.value = dayDiff * camera.value.tarif
        total_sewa.value = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(total_sewa.value)
    }
}

function update(){
    let urlUpdate = `http://localhost:8000/api/sewa/${route.params.id}`
    let data = {
        camera_id: sewa.camera_id,
        customer_id: sewa.customer_id,
        tgl_pinjam: sewa.tgl_pinjam,
        tgl_kembali: sewa.tgl_kembali,
    }

    axios.put(urlUpdate, data).then(() => {
        let message = 'Ubah Detail Transaksi Berhasil! Mau redirect ke halaman Riwayat Transaksi?'

        if(confirm(message)){
            router.push({
                name: 'sewa.history'
            })
        }
    }).catch(error => {
        validation.value = error.response.data
    })
}
</script>

<template>
    <div class="flex w-full gap-6 min-h-[400px]">
        <div class="w-1/3 h-1/3">
            <img :src="'/src/assets/img/camera-' +sewa.camera_id+ '.jpg'" :alt="camera.name" class="m-auto">
        </div>
        <div class="w-1/3 p-4">
            <h1 class="text-xl text-slate-800 mb-2">{{ camera.name }}</h1>
            <h1 class="inline-block text-4xl text-slate-800 font-medium mb-2">{{ 'Rp. ' + 
                new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(camera.tarif) + ',00/' }}</h1><span class="text-slate-800 text-2xl font-medium">hari</span>
            <p class="text-slate-800">Stok tersedia: {{ camera.stock }}</p>

            <hr>

            <form @submit.prevent="update">
                <h1 class="text-xl text-slate-800 font-medium mb-4">Formulir Rental</h1>
                <label class="text-slate-800 block border rounded-lg p-4 cursor-text">Nama Pelanggan: {{ customer.name }}</label><br>
                <label class="text-slate-800 block border rounded-lg p-4 cursor-text">Alamat: {{ customer.alamat }}</label><br>
                <label class="text-slate-800 block border rounded-lg p-4 cursor-text">
                    Tanggal Pinjam: 
                    <input v-if="m < 10" required type="date" :min="y+ '-0' +m+ '-' +d" v-model="sewa.tgl_pinjam" name="tgl_pinjam" id="tgl_pinjam" class="cursor-pointer">
                    <input v-else required type="date" :min="y+ '-' +m+ '-' +d" v-model="sewa.tgl_pinjam" name="tgl_pinjam" id="tgl_pinjam" class="cursor-pointer">
                </label><br>
                <label class="text-slate-800 block border rounded-lg p-4 cursor-text">
                    Tanggal Kembali: <input required type="date" :min="sewa.tgl_pinjam" v-model="sewa.tgl_kembali" name="tgl_kembali" id="tgl_kembali" class="cursor-pointer">
                </label><br>
                <h2 class="text-4xl text-slate-800 font-semibold">Rp. {{ total_sewa }},00</h2>
                <div class="w-full flex gap-2">
                    <button type="submit" class="w-2/3 bg-slate-800 text-white text-lg font-medium text-center p-3 block rounded-xl my-4 hover:bg-slate-700">Ubah</button>
                    <button @click.prevent="hitung" class="w-1/3 border border-slate-800 bg-white text-slate-800 text-lg font-medium text-center p-3 block rounded-xl my-4 hover:bg-slate-200">Hitung</button>
                </div>
            </form>
        </div>
    </div>
</template>