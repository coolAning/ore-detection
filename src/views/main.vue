<template>
    <div>
        <TopBar></TopBar>

        <div class="content">
            <div class="imageRegion">
                <div class="upload-div">
                    <!-- <UploadPicture @my-event="handleChildEvent"></UploadPicture> -->
                    <UploadPicture @base64="handleData"></UploadPicture>
                </div>
                <div class="output">
                    <img :src=imageSrc class="output-img" alt="output" >

                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { computed, ref } from 'vue';
import TopBar from '../components/TopBar.vue';
import UploadPicture from '../components/UploadPicture.vue';

const imageData = ref('');
const imageSrc = computed(() => 'data:image/png;base64,' + imageData.value);
const handleData = (data:string) => {
    console.log("收到图片");
    
    imageData.value = data;
}
</script>  
<style scoped>
.content {
    padding: 20px;
    height: 70vh;
}

/* 图片区域 */
.imageRegion {
    display: flex;
    justify-content: space-between;
    background-color: #f0f0f0;
    padding: 10px;
    width: 100%;
    height: 100%;
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
    /* width: 100%; */
    object-fit: contain;
    /* height: 50vh; */
    /* padding-top: 10vh; */
    /* background-color: rgb(164, 170, 170); */
    /* padding-left: 10vh;
    padding-right: 10vh */
}
</style>
  