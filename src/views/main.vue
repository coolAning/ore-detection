<script lang="ts" setup>
import { ref ,computed } from 'vue'
import TopBar from '../components/TopBar.vue';
import UploadPicture from '../components/UploadPicture.vue';

const outputImg = ref<string | null>(null)
function handleChildEvent(message: string) {
    outputImg.value = message
}

const imageData = computed(() => {
  return `data:image/png;base64,${outputImg.value}`;
});
</script>  

<template>
    <div>
        <TopBar></TopBar>

        <div class="content">
            <div class="imageRegion">
                <div class="upload-div">
                    <UploadPicture @my-event="handleChildEvent"></UploadPicture>
                </div>
                <div class="output">
                    <img :src="imageData" class="output-img" alt="my-image">
                </div>
            </div>
        </div>
    </div>
</template>
  

<style scoped>
.content {
    padding: 20px;
}

/* 图片区域 */
.imageRegion {
    display: flex;
    justify-content: space-between;
    background-color: #f0f0f0;
    padding: 10px;
}

.upload-div {
    flex: 1;
    padding-left: 10vh;
    padding-right: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.output {
    flex: 1;
    padding-left: 10vh;
    padding-right: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.output-img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    /* height: 50vh; */
    padding-top: 10vh;
    /* background-color: rgb(164, 170, 170); */
    padding-left: 10vh;
    padding-right: 10vh
}
</style>
  