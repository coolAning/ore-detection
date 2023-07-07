<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <div>
      <video ref="video" style="object-fit: contain;" autoplay></video>
    </div>
    <div style="display: flex; flex-direction: row;">
      <el-button type="primary" @click="callCamera" style="margin-right: 10px;">开启摄像头</el-button>
      <el-button type="primary" @click="closeCamera">关闭摄像头</el-button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';
const emit = defineEmits(['blob-updated']);

const videoRef = ref<HTMLVideoElement | null>(null);

let videoStream: MediaStream;

let socket: Socket | null = io('ws://127.0.0.1:5000/video');

// 创建一个MediaRecorder实例
let mediaRecorder: MediaRecorder;

// 创建一个Blob数组，用于存储录制的视频数据
let chunks: Blob[] = [];

socket.on('connect', () => {
  console.log('Socket连接已建立');
});
socket!.on('stream', (frame: ArrayBuffer) => {
  const blob = new Blob([frame], { type: 'video/webm' });
  
  emit('blob-updated', blob); // 触发自定义事件，将Blob数据传递给父组件
})
// 监听连接关闭事件
socket.on('disconnect', () => {
  console.log('Socket连接已关闭');
});

const callCamera = () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoRef.value!.srcObject = stream;
      videoStream = stream;
      videoRef.value!.play();
      if (socket?.connected) {
        // 使用stream创建一个MediaRecorder实例
        mediaRecorder = new MediaRecorder(stream);
        // 监听MediaRecorder的dataavailable事件，将录制的数据存入chunks数组
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
          const blob = new Blob(chunks, { type: 'video/webm' });
          socket!.emit("stream", blob);
          // 清空chunks数组
          chunks = [];
        };
        mediaRecorder.start(0);
      }

    })
    .catch(err => {
      console.log(err);
    });
}

const closeCamera = () => {
  if (videoStream) {
    const tracks = videoStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }
  videoRef.value!.srcObject = null;
  videoRef.value!.pause();
  socket?.close();
}

onMounted(() => {
  videoRef.value = document.querySelector('video');
});

onUnmounted(() => {
  videoRef.value = null;
});
</script>
  