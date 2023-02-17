<template>
    <img src="/src/assets/img/background.jpg" alt="background" class="fixed -z-10 opacity-70 w-full h-full">
    <main class="flex justify-center items-center h-screen">
        <div class="bg-white rounded-xl shadow-lg p-24">
            <slot />
        </div>
    </main>
</template>