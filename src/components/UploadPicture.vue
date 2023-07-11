<template>
    <div class="video-div">
        <div class="preview" style="height: 80vh;width: 80vh;">
            <img :src="imgSrc" style="object-fit: contain; max-width: 100%; max-height: 100%;">
        </div>
        <el-button class="ml-3" type="success" @click="submitUpload">
            识别
        </el-button>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'

let imgSrc = ref('http://127.0.0.1:5000/main/video_start')
const emit = defineEmits(['my-event'])

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