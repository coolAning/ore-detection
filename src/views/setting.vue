<template>
    <div>
        <!-- 顶部区域 -->
        <TopBar></TopBar>

        <!-- 内容区域 -->
        <div class="content">
            <div style="flex: 1;">
                <el-row class="tac">
                    <el-col :span="12">
                        <h5 class="mb-2">设置</h5>
                        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handelSelect">
                            <el-menu-item index="1">
                                <el-icon><icon-menu /></el-icon>
                                <span>个人信息</span>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <el-icon>
                                    <document />
                                </el-icon>
                                <span>摄像头设置</span>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <el-icon>
                                    <document />
                                </el-icon>
                                <span>模型设置</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div style="flex: 6;display: flex;align-items: center; flex-direction: column;">

                <div v-if="selectedMenu === '1'">

                    <el-card class="box-card">
                        <el-form label-width="100px">
                            <el-form-item label="原密码">
                                <el-input v-model="oldPassword" type="password" show-password></el-input>
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input v-model="newPassword" type="password" show-password></el-input>
                            </el-form-item>
                            <el-form-item label="再次输入">
                                <el-input v-model="newPassword_second" type="password" show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :disabled="!isFormValid" type="primary" @click="changePassword">修改密码</el-button>
                            </el-form-item>
                            <el-form-item>
                                <div v-show="isPasswordMismatch" style="color: red;">密码不匹配</div>
                            </el-form-item>
                        </el-form>
                    </el-card>


                </div>

                <div v-else-if="selectedMenu === '2'">

                    <el-card class="box-card">
                        <el-form label-width="100px">
                            <el-form-item label="rtsp地址">
                                <el-input v-model="rtsp"  style="width:400px;"></el-input>
                            </el-form-item>
                            <el-form-item label="抽帧间隔">
                                <el-input-number v-model="interval" :min="0"></el-input-number>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleChangeCamera">确认修改</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>

                </div>

                <div v-else-if="selectedMenu === '3'">
                    <h3>模型设置</h3>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import TopBar from '../components/TopBar.vue';
import {
    Document,
    Menu as IconMenu,
} from '@element-plus/icons-vue'
import api from '../api/api'
import { ElMessage } from 'element-plus';

const oldPassword = ref('')
const newPassword = ref('')
const newPassword_second = ref('')
const interval = ref(1)
const rtsp = ref('')
const isPasswordMismatch = computed(() => {
    return oldPassword.value.trim() !== '' && newPassword.value.trim() !== '' && newPassword_second.value.trim() !== '' && newPassword.value !== newPassword_second.value;
});
const isFormValid = computed(() => {
    return oldPassword.value.trim() !== '' && newPassword.value.trim() !== '' && newPassword_second.value.trim() !== '' && !isPasswordMismatch.value;
});
const selectedMenu = ref<string>('1');

const handelSelect = (index: string) => {
    selectedMenu.value = index;
}
const changePassword = async () => {
    if (isFormValid.value) {
        await api.changePassword({
            account: "1",
            old_password: oldPassword.value,
            new_password: newPassword.value
        }).then(function (response) {
            ElMessage("修改成功")
        })
            .catch(function (error) {
                console.log(error);
            })
    }
};
const handleChangeCamera = async () => {
    await api.setCamera({
        rtsp: rtsp.value,
        interval: interval.value
    }).then(function (response) {
        ElMessage("修改成功")
    })
        .catch(function (error) {
            console.log(error);
        })
};
const init =async () => {
    await api.getCamera({}).then(function (response) {
        rtsp.value = response.data.rtsp
        interval.value = response.data.interval
    })
        .catch(function (error) {
            console.log(error);
        })
}
init()
</script>  

<style scoped>
/* 内容区域 */

.content {
    padding: 20px;
    display: flex;
    flex-direction: row;
}

.tac {
    width: 165%;
}

.box-card {
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #ebeef5;
    /* margin: 20px; */
    padding: 20px;
    width: 80vh;
    height: 40vh;
}
</style>
  