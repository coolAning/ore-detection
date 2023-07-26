<template>
    <div class="video-div">
        <div class="preview" style="height: 60vh;width: 80vh;margin-top: 8vh; display: flex; align-items: center;justify-content: center; ">
            <img :src="imgSrc" class="video" v-show="isImgLoaded" style="object-fit: contain; max-width: 100%; max-height: 100%;" >
            <p v-show="!isImgLoaded" class="artistic-text">正在连接摄像头...</p>
            <!-- <video controls autoplay src="http://127.0.0.1:5000/main/video_feed" style="object-fit: contain; max-width: 100%; max-height: 100%;"></video> -->
        </div>
        <el-button class="ml-3" type="success" @click="submitUpload" :disabled="!isImgLoaded">
            识别
        </el-button>
    </div>
</template>
  
<script setup lang="ts">
import api from '@/api/api';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue'
import '@/css/MainImage.css';

let imgSrc = ref('http://127.0.0.1:5000/main/video_start')
const emit = defineEmits(['base64']);
const isImgLoaded = ref(true);

const submitUpload = async () => {
    await api.getOutput({})
        .then(function (response) {
            console.log(response);
            
            emit('base64', response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

</script>

<style scoped>
.video-div {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    height: 100%;
    width: 100%;
    
}
.ml-3{
    margin-top: 3vh;
}
.artistic-text {
    font-family: 'Your Artistic Font', cursive;
    font-size: 24px;
    font-weight: bold;  /* 字体加粗 */
    color: #894e4e;
    /* 其他样式属性 */
  }
</style>