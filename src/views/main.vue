<script lang="ts" setup>
import TopBar from '../components/TopBar.vue';

</script>  

<template>
    <div>
        <!-- 顶部区域 -->
        <TopBar></TopBar>

        <!-- 内容区域 -->
        <div class="content">
            <router-view></router-view>
            <p>这是主界面</p>
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
  