<template>
  <div class="cartBox">
    <p>{{mess}}</p>
    <van-empty image-size="240" description="未登录">
      <van-button round type="danger" class="bottom-button" @click="onLogin"
        >登录</van-button
      >
    </van-empty>
  </div>
</template>

<script>
export default {
  name: "Onlogin",
  props:{
    mess:String
  },
  methods: {
    onLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
p{
  text-align: center;
  font-size: 20px;
  color:#999
}
.cartBox {
  margin: 10px;
  border: 1px solid rgb(229, 223, 223);
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>