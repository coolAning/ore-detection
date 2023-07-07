<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { House, Setting, SwitchButton } from '@element-plus/icons-vue';

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
        <!-- <el-text id="top-text">矿石检测系统</el-text> -->
        <span class="top-text">矿 石 检 测 系 统</span>

        <div class="top-bar">

            <button @click="gotoMain" :class="{ active: currentRoute === '/main' }">
                <el-icon size="25px">
                    <House />
                </el-icon>
                <span>主界面</span>
            </button>
            <button @click="gotoSettings" :class="{ active: currentRoute === '/setting' }">
                <el-icon size="25px">
                    <Setting />
                </el-icon>
                <span>系统设置</span>
            </button>

        </div>

        <div class="exit-bar">
            <button @click="logout">
                <el-icon size="25px">
                    <SwitchButton />
                </el-icon>
                <span>退出</span>
            </button>
        </div>


    </div>
</template>

<style scoped>
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    height: 15vh;
}

.top-text {
    letter-spacing: 1em;
    padding-left: 100px;
    color: rgb(162, 115, 54);
    font-size: 20px;
    font-weight: bold;
}

.top-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-right: 80vh;
}

.top button {
    border: 1px solid rgb(152, 152, 152);
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.top-bar button {
    margin-left: 30px;
    margin-right: 30px;

}

.top button span {
    font-weight: bold;
}

.top button.active,
.top button:active {
    background-color: rgb(142, 142, 176);
    color: white;
    transform: scale(1.2);
}

#top-text {
    font-size: 20px;
    font-weight: bold;
    padding-left: 50px;
}

.top button.active {
    font-weight: bold;
}

.exit-bar {
    float: right;
    margin-right: 5vh;
}
</style>