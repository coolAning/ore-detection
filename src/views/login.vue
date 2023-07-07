<template>
  <div class="login-wrap">
    <div class="logo-box flex items-center" style="flex: 1;">

      <div class="block text-center" style="height: 100vh">
        <el-carousel height="auto" autoplay>
          <el-carousel-item style="height: 100vh">
            <!-- <h3 class="small justify-center" text="2xl">height 100px</h3> -->
            <img class="w-60px" src="@/assets/jpg/1.jpg" alt="" />
          </el-carousel-item>
          <el-carousel-item style="height: 100vh">
            <img class="w-60px" src="@/assets/jpg/2.jpg" alt="" />
          </el-carousel-item>
          <el-carousel-item style="height: 100vh">
            <img class="w-60px" src="@/assets/jpg/3.jpg" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- <img class="w-60px" src="@/assets/svg/logo.svg" alt="" /> -->
      <!-- <div class="ml-5 font-bold text-5">offbeat-ui</div> -->
    </div>
    <div class="login">



      <div class="main-left_img">
        <img :src="loginLeft" alt="" />
      </div>
      <div class="login-model flex-center">

        <el-text class="mx-2" size="large">矿石检测系统</el-text>

        <div class="content">
          <el-form ref="formRef" :model="loginForm" :rules="formRules">
            <el-text class="mx-1" size="large">账号登录</el-text>
            <el-tabs id="login-tab" v-model="activeTab">
              <div class="tip" />

              <!-- <el-tab-pane label="账号登录" name="password" > -->
              <el-form-item label="" prop="account">
                <el-input v-model="loginForm.account" type="number" class="m-2" placeholder="请输入账号">

                  <template #prefix>
                    <el-icon :size="22">
                      <User />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item v-if="activeTab === 'password'" prop="password">
                <el-input v-model="loginForm.password" type="password" show-password class="m-2" placeholder="请输入密码">
                  <template #prefix>
                    <el-icon :size="22">
                      <lock />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <!-- </el-tab-pane> -->

            </el-tabs>
            <el-form-item class="footer-btn">
              <el-button type="primary" :loading="loginLoading" class="w-50 m-2" @click="loginFun">
                登 录
              </el-button>
            </el-form-item>
          </el-form>
          <footer>
          </footer>
        </div>
        <!-- 底部 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Iphone, Lock, User } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import router from '@/router'
import loginLeft from '@/assets/svg/login_left.svg'
import type { FormInstance, FormRules } from 'element-plus'
import api from '../api/api'

const loginLoading = ref(false)
const activeTab = ref('password')
const formRef = ref<FormInstance>()
const form = reactive({
  loginForm: {
    account: '',
    password: ''
  }
})
const { loginForm } = toRefs(form)
const formRules = reactive<FormRules>({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})



// 触发登录
const loginFun = () => {
  // 表单校验
  formRef.value?.validate((valid) => {
    if (valid) {
      // 验证通过
      loginLoading.value = true
      api.login({
        account: form.loginForm.account,
        password: form.loginForm.password
      })
        .then(function (response) {
          ElMessage("登录成功")
          router.push('/main')
        })
        .catch(function (error) {
          console.log(error);
        })
        

      // if (form.loginForm.account=="1"&&form.loginForm.password=="1") {
      //   // 登录成功
      //   loginLoading.value = false
      //   router.push('/main')
      // } else {
      //   // 登录失败
      //   loginLoading.value = false
      //   ElMessage.error('账号或密码错误')
      // }

    }
  })
}

// 回车事件
onMounted(() => {
  onKeyStroke('Enter', () => {
    if (loginLoading.value) return
    loginFun()
  })
})
</script>


<style lang="scss" scoped>
//走马灯
.carousel-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
  width: 60px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  display: flex;
  align-items: center;
  margin: 0;
  text-align: center;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

//走马灯结束

.el-form {

  width: 500px;
  padding: 50px 21px;
  background: #ffffff;

  :deep(.el-input__inner) {
    height: 60px;
    line-height: 60px;
  }

  :deep(.el-tabs__item) {
    width: 200px;
    text-align: center;
    font-size: 24px;
    color: #666666;
  }

  ::placeholder {
    font-size: 16px;
    color: #c0c4cc;
  }

  :deep(.el-tabs__item.is-active) {
    color: #181818;
  }

  .code-item .el-button {
    position: absolute;
    height: 22px;
    line-height: 22px;
    top: 30px;
    right: 20px;
    border-left: 1px solid #d8d9e1;
    padding-left: 15px;
    font-weight: 500;
    font-size: 16px;
    border-radius: 0;
  }

  .footer-btn .el-button {
    width: 100%;
    height: 60px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    border: none;
  }
}

.mx-1 {
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
  padding-left: 25vh
}

.mx-2 {
  margin-bottom: 150px;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.login-wrap {
  width: 100%;
  height: 100vh;
  background: #f5f6fa;
  display: flex;
  flex-direction: row;
}

.login {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 15vh 0 0;
  background-image: url(@/assets/svg/login_bg.svg);
  background-size: 100% 100%;

  .main-left_img {
    float: left;
    margin-top: -60px;
    padding-left: 0px;

    img {
      width: 90%;
    }
  }

  .login-model {
    width: 700px;
    margin-top: -40px;

  }

  #login-tab {
    text-align: center;
  }

  .content {
    height: 520px;
    box-shadow: #0000001a 0 2px 10px 2px;
    background: #fff;
    overflow: hidden;
  }
}

footer p {
  width: 100%;
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
  color: #999;
}
</style>