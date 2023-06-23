<script lang="ts" setup>
import TopBar from '../components/TopBar.vue';
import { UploadFilled } from '@element-plus/icons-vue'
</script>  

<template>
    <div>
        <TopBar></TopBar>

        <div class="content">
            <div class="imageRegion">

                <div class="upload">
                    <el-upload class="upload-demo" drag
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template>
                    </el-upload>
                    
                </div>

                <div class="output">
                    <p class="test">这是输出区域</p>
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

.upload {
    flex: 1;
    padding-left: 10vh;
    padding-right: 10vh
}

.el-icon--upload {
    height: 50vh;
}

.output {
    flex: 1;
    padding-left: 10vh;
    padding-right: 10vh
}

.test {
    height: 50vh;
    padding-top: 10vh;
    background-color: rgb(164, 170, 170);
    padding-left: 10vh;
    padding-right: 10vh
}</style>
  