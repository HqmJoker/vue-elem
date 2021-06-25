<template>
  <header class="header">
    <i class="icon el-icon-arrow-left" @click="goBack"></i>
    <span>{{ isLogin ? '密码登录' : '账号注册' }}</span>
    <span></span>
  </header>
  <main class="main">
    <div class="form">
      <el-input v-model="form.username" placeholder="账号"></el-input>
      <el-input v-model="form.password" placeholder="密码" show-password></el-input>
      <div class="form-captchas">
        <el-input v-model="form.captcha_code" placeholder="验证码"></el-input>
        <div class="form-captchas-right">
          <img :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tips-box">
      <p>温馨提示：未注册过的账号，登录时将自动注册</p>
      <p>注册过的用户可凭账号密码登录</p>
    </div>
    <el-button class="login" type="primary" @click="login">{{ isLogin ? '登录' : '注册' }}</el-button>
    <p class="forget" v-if="isLogin">
      <el-link type="primary">重置密码</el-link>
    </p>
  </main>
</template>

<script>
import { getcaptchas, accountLogin } from '@/api/user'
import { ElMessage } from 'element-plus'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLogin: false,
      form: {
        username: '',
        password: '',
        captcha_code: '',
      },
      captchaCodeImg: ''
    }
  },
  mounted() {
    this.isLogin = this.$route.params.isLogin;
    this.getCaptchaCode();
  },
  methods: {
    ...mapActions('user', ['setUserInfo']),
    // 登录/注册
    login() {
      if(!this.form.username) {
        ElMessage({
          message: '账号不能为空！',
          type: 'error'
        })
        return;
      }
      if(!this.form.password) {
        ElMessage({
          message: '密码不能为空！',
          type: 'error'
        })
        return;
      }
      if(!this.form.captcha_code) {
        ElMessage({
          message: '验证码不能为空！',
          type: 'error'
        })
        return;
      }
      const params = {
        username: this.form.username,
        password: this.form.password,
        captcha_code: this.form.captcha_code
      }
      accountLogin(params).then(res => {
        this.form.captcha_code = '';
        this.getCaptchaCode();
        if(res.status === 0) {
          ElMessage({
            message: res.message,
            type: 'error'
          })
          return;
        }
        this.setUserInfo(res);
        this.goBack();
      })
    },
    //获取验证码
    async getCaptchaCode(){
        let res = await getcaptchas();
        this.captchaCodeImg = res.code;
    },
    // 返回上一级
    goBack() {
      history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: $blue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  color: white;
  font-weight: 600;
  .icon {
    font-weight: 600;
    font-size: 20px;
  }
}
.main {
  padding-top: 10px;
  .form {
    background-color: #fff;
    .el-input:deep {
      .el-input__inner {
        border-radius: 0;
        border-width: 0;
        border-bottom-width: 1px;
      }
    }
    &-captchas {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-right {
        width: 40%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .change_img {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          font-size: 14px;
          p {
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .tips-box {
    font-size: 12px;
    color: red;
    p {
      padding: 10px 15px;
    }
  }
  .login {
    width: 95%;
    margin-left: 2.5%;
  }
  .forget {
    text-align: right;
    padding: 10px 10px 0 0;
  }
}
</style>
