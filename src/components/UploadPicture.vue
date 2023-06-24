<template>
    <div class="Upload-Cp">
        <el-upload ref="upload" class="upload-el" list-type="picture" :limit="1" :on-change="handleChange"
            :on-exceed="handleExceed" :auto-upload="false" :http-request="uploadFile">
            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                </div>
            </template>
            <template #tip>
                <div class="el-upload__tip text-red">
                    limit 1 file, new file will cover the old file
                </div>
            </template>
            <template #trigger>
                <el-button type="primary">选择图片</el-button>
            </template>
        </el-upload>
        <el-button class="ml-3" type="success" @click="submitUpload">
            识别
        </el-button>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { getBaseUrl } from '@/api/request';
import api from '../api/api'


const upload = ref<UploadInstance>()
const uploadedFile = ref<File | null>(null)
const outputFile = ref<string | null>(null)
const emit = defineEmits(['my-event'])

function handleOutput() {
  emit('my-event', outputFile.value)
}
const uploadFile = async (options: UploadRequestOptions) => {
    const formData = new FormData()
    formData.append('file', options.file)
    return await api.upload(formData)
        .then(function (response) {
            console.log(response)
            ElMessage("识别成功")
            outputFile.value = response.data.file
            handleOutput()
        })
        .catch(function (error) {
            ElMessage.error("识别失败")
            console.log(error)
        })
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadedFile.value = file
    upload.value!.handleStart(file)
}
const handleChange = (response: any, file: UploadRawFile) => {
    uploadedFile.value = file
}
const submitUpload = async () => {
    upload.value!.submit()
}
</script>

<style scoped>
.Upload-Cp {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.upload-el {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.el-upload-list__item-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>