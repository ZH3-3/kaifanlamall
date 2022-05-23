<template>
  <div>
    <headers />

    <div class="login">
      <h3>登录账户</h3>
      <van-form>
        <van-cell-group>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <van-field name="checkbox" label="记住密码">
          <template #input>
            <van-checkbox v-model="checked" shape="square" />
          </template>
        </van-field>

        <div style="margin: 18px">
          <van-button round block type="primary" @click="submitBtn">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <tails />
  </div>
</template>

<script>
import Headers from "../components/Headers.vue";
import Tails from "../components/Tails.vue";

import requests from "../api/require";
export default {
  components: { Headers, Tails },
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      checked: false,
    };
  },
  mounted() {
    //   记住密码
    let userState = localStorage.getItem("UserState");
    if (userState != null && userState != undefined) {
      // 转换成字符串
      userState = JSON.parse(userState);
      console.log(userState);
      // hasOwnProperty 在一个对象里找是否有某个属性或对象
      if (userState.hasOwnProperty("userName")) {
        this.username = userState.username;
        this.password = userState.password;
        this.checked = true;
      }
    }
  },
  methods: {
    submitBtn: function () {
      let user = this.username;
      let pwd = this.password;
      let checked = this.checked;
      let param = "userName=" + user + "&password=" + pwd;
      requests.post("/loginToken.php", param).then((res) => {
        console.log(res);
        if (res.data.code == "1000") {
          this.$toast.success("成功登录");
          let token = res.data.subjects.token;
          if (!checked) {
            localStorage.setItem("UserState", JSON.stringify({ token: token }));
          } else {
            localStorage.setItem(
              "UserState",
              JSON.stringify({ token: token, userName: user, password: pwd })
            );
          }
          if (token) {
            this.$router.go(-1);
          }
        } else {
          this.$toast.fail("登录失败");
        }
      });
    },
  },
};
</script>

<style scoped>
h3 {
  display: block;
  text-align: center;
  margin: 20px;
}
.login {
  margin: 50px 20px 0 20px;
  border: 1px solid rgb(238, 236, 236);
}
</style>