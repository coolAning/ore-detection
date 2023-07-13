<template>
    <div class="video-div">
        <div class="preview" style="height: 80vh;width: 80vh;">
            <img :src="'data:image/jpeg;base64,' + imageData" style="object-fit: contain; max-width: 100%; max-height: 100%;">
        </div>
        <el-button class="ml-3" type="success" @click="submitUpload">
            识别
        </el-button>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = io('ws://127.0.0.1:5000/test');

const imageData = ref('')
socket.on('response', () => {
    console.log('Socket连接已建立');
});

socket.on('frame', (frame) => {
    console.log(frame);
    imageData.value = frame.image;
})

const submitUpload = async () => {
    
}
</script>

<style scoped>
.video-div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
</style>