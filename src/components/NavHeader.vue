<template>
    <nav class="shadow-lg bg-white">
        <div class="container flex justify-between p-8">
            <div class="flex">
                <h1 class="text-4xl text-slate-800 cursor-default">Rental Camera</h1>
                <div class="px-6 self-center">
                    <router-link :to="{ name: 'sewa.index' }"><span class="text-xl p-6 mx-4 hover:border-b-4 text-slate-800 cursor-pointer">Home</span></router-link>
                    <router-link :to="{ name: 'sewa.history' }"><span class="text-xl p-6 mx-4 hover:border-b-4 text-slate-800 cursor-pointer">Riwayat</span></router-link>
                </div>
            </div>
            <div class="self-center">
                <h1 class="text-slate-800 cursor-pointer">User</h1>
            </div>
        </div>
    </nav>
</template>