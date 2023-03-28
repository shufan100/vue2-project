<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">登录系统</div>
      <!-- <div class='titleArea rflex'>
        <img class="logo" :src="logo" alt="小爱admin">
        <span class='title'>小爱<i>Admin</i></span>
      </div> -->
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people">
              <i class="el-icon-user"></i>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
            <el-button slot="prepend" icon="el-icon-lx-lock">
              <i class="el-icon-unlock"></i>
            </el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/images/logo.png'

export default {
  data() {
    return {
      logo: logoImg,
      param: {
        username: 'admin',
        password: '123123'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.login.validate(valid => {
        console.log(valid)
        if (valid) {
          this.$notify.success('登录成功!')
          sessionStorage.setItem('ms_username', this.param.username)
          this.$router.push('/')
        } else {
          this.$message.error('请输入账号和密码')
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.titleArea {
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;

  .logo {
    width: 40px;
    margin-right: 10px;
  }

  .title {
    i {
      color: #ff6c60;
    }
  }
}
</style>
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  /* height: 100%; */
  height: 100vh;
  background-image: url(../assets/images/login-bg.jpg);
  background-size: 100% 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}

.el-button {
  padding: 15px;
}
</style>
