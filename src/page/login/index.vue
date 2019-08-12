<template>
  <div class="wrapper">
    <div class="loginBox">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-user-solid" v-model="username"></el-input>
      <p :style="{color:'red',fontSize:'12px'}" v-show="username.length==0">请输入你的用户名</p>
      <el-input
        placeholder="请输入内容"
        ref="pwds"
        prefix-icon="el-icon-lock"
        show-password
        v-model="password"
        @input="showTip"
      ></el-input>
      <p :style="{color:'red',fontSize:'12px'}" v-show="password.length==0">请输入您的密码</p>
      <p
        :style="{color:'red',fontSize:'12px'}"
        v-show="password.length!==0 && checkPwdFlag"
      >密码校验失败!密码包含大小写字母、数字、特殊符号</p>

      <div class="others">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <span>忘记密码</span>
      </div>
      <el-button type="primary" @click="loginFn">登录</el-button>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapGetters} from 'vuex';

import { login } from "../../services";
export default {
  props: {},
  components: {},
  data() {
    return {
      checked: false,
      username: "",
      password: "",
      checkPwdFlag: false
    };
  },
  computed: {},
  methods: {
    ...mapActions("main", ["getAuthority", "getInfo"]),
    loginFn() {
      login(this.username, this.password)
        .then(res => {
          if (res.data.code === 1) {
            localStorage.setItem("token", res.data.token);
            this.getAuthority();

            this.$router.push("/main");
          } else {
            alert("您输入的密码有误^_^");
          }
        })
        .catch(res => {
          alert("您输入的账号未识别^_^");
        });
    },
    showTip() {
      const reg = /^(?!(?:[^a-zA-Z]+|\D+|[a-zA-Z0-9]+)$).{4,}$/;
      if (reg.test(this.password)) {
        this.checkPwdFlag = false;
      } else {
        this.checkPwdFlag = true;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  background-size:cover;
}
.loginBox {
  width: 400px;
  height: 350px;
  background: white;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 13%;
  top: 20%;
  .el-input {
    outline: none;
    margin: 15px 0;
  }
  .others {
    margin: 15px 0;
    display: flex;
    span {
      padding: 0 10px;
      font-size: 14px;
      color: blue;
    }
    label {
      flex: 1;
    }
  }
  button {
    margin: 15px 0;
  }
}
</style>