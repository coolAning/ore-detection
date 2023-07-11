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
                                <span>模型设置</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div style="flex: 3;">
                <div v-if="selectedMenu === '1'">
                    <h3>菜单项1的界面</h3>
                </div>

                <div v-else-if="selectedMenu === '2'">
                    <h3>菜单项2的界面</h3>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TopBar from '../components/TopBar.vue';
import {
    Document,
    Menu as IconMenu,
} from '@element-plus/icons-vue'

const selectedMenu = ref<string>('1');

const handelSelect = (index: string) => {
    selectedMenu.value = index;
}
</script>  

<style scoped>
/* 内容区域 */

.content {
    padding: 20px;
    display: flex;
    flex-direction: row;
}

.tac {
    width: 100%;
}
</style>
  