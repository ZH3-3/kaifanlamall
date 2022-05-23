<template>
  <van-sticky>
    <van-tabbar v-model="active" class="footerTab">
      <van-tabbar-item icon="wap-home-o" @click="index1"></van-tabbar-item>
      <van-tabbar-item icon="cart-o" @click="index3"></van-tabbar-item>
      <van-tabbar-item icon="apps-o" @click="index2"></van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="index4"></van-tabbar-item>
    </van-tabbar>
  </van-sticky>
</template>

<script>
export default {
  name: "Tails",
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    index1() {
      this.$router.push("/home");
    },
    index2() {
      this.$router.push("/myforms");
    },
    index3() {
      this.$router.push("/shoppingCart");
    },
    index4() {
      this.$router.push("/userlogin");
    },
  },
};
</script>

<style>
.footerTab {
  border-top: 1px solid rgb(239, 233, 233);
}
</style>