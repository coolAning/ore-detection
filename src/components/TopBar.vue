<script lang="ts" setup>
import {ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const currentRoute = ref(useRoute().path);
const router = useRouter();

function gotoMain() {
    router.push('/main');
    currentRoute.value = '/main';
}

function gotoSettings() {
    router.push('/setting');
    currentRoute.value = '/setting';
}

function logout() {
    router.push('/');
}

</script>

<template>
    <div class="top">
        <button @click="gotoMain" :class="{ active: currentRoute === '/main' }">主界面</button>
        <button @click="gotoSettings" :class="{ active: currentRoute === '/setting' }">系统设置</button>
        <button @click="logout">退出</button>
    </div>
</template>

<style scoped>
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
}

.top button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
}

.top button.active {
    font-weight: bold;
}

.content {
    padding: 20px;
}
</style>