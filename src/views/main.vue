<template>
    <div>
        <TopBar></TopBar>

        <div class="m-content">
            <div class="imageRegion">
                <div class="upload-div">
                    <!-- <UploadPicture @my-event="handleChildEvent"></UploadPicture> -->
                    <UploadPicture @base64="handleData"></UploadPicture>
                </div>
                <div class="output">

                    <img :src=imageSrc class="output-img" alt="output" v-show="!isEmptyImage" >
                    <p v-show="isEmptyImage" class="artistic-text">点击识别后出现结果</p>
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
const isEmptyImage = computed(() => imageData.value === '');
const handleData = (data:string) => {
    console.log("收到图片");
    imageData.value = data;
}
</script>  
<style scoped>
.m-content {
    height: 80vh;
}

/* 图片区域 */
.imageRegion {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
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
    margin-left: 10vh;
    margin-right: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    width: 80vh;
    margin-top: 8vh;
}

.output-img {
    height: 100%;
    width: 100%;
    /* object-fit: contain; */
    border: 1px solid rgba(195, 193, 193, 0.3);
    /* height: 50vh; */
    /* padding-top: 10vh; */
    /* background-color: rgb(164, 170, 170); */
    /* padding-left: 10vh;
    padding-right: 10vh */
    
    max-width: 100%; 
    max-height: 100%;
}

.artistic-text {
    font-family: 'Your Artistic Font', cursive;
    font-size: 24px;
    font-weight: bold;  /* 字体加粗 */
    color: #894e4e;
    /* 其他样式属性 */
  }
</style>
  