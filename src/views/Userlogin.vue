<template>
  <div>
    <headers></headers>
    <div>
      <p class="titName">个人中心</p>
      <div class="usercenter">
        <img src="../assets/img/user.jpg" alt="" />
        <p class="name">未命名</p>
        <van-button type="danger" @click="offLogin" v-if="offbtn"
          >退出登录</van-button
        >
        <van-button type="primary" @click="onLogin" v-else>登录</van-button>
      </div>
    </div>
    <tails></tails>
  </div>
</template>

<script>
import Headers from "../components/Headers.vue";
import Tails from "../components/Tails.vue";

export default {
  components: { Headers, Tails },
  name: "UserLogin",
  data() {
    return {
      offbtn: true,
      deuserState: null,
    };
  },
  mounted() {
    let userState = localStorage.getItem("UserState");
    if (userState != null && userState != undefined) {
      // 转换成字符串
      userState = JSON.parse(userState);
      this.deuserState = userState;
      console.log(this.deuserState.token);
    }
    //  else {
    //   this.offbtn = false;
    // }
     if (this.deuserState.token == null || this.deuserState.token == undefined) {
      this.offbtn = false;
    }
  },
  methods: {
    offLogin() {
      if (this.deuserState != null && this.deuserState != undefined) {
        this.deuserState.token = null;
        // localStorage.removeItem("UserState");
        localStorage.setItem("UserState", JSON.stringify(this.deuserState));
        this.offbtn = false;
        this.$toast.success("退出登录成功");
      } 
    },
    onLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.titName {
  text-align: center;
  font-size: 21px;
  color: rgb(157, 100, 100);
}
.name {
  text-align: center;
  font-size: 18px;
  color: rgb(182, 177, 177);
  padding-top: 100px;
}
.usercenter {
  width: 100%;
  height: 400px;
  position: relative;
}
.van-button {
  text-align: center;
  width: 140px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

