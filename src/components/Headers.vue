<template>
  <van-sticky class="topTab" >
    <van-nav-bar title="开饭啦" >
      <template #right>
        <van-icon name="setting-o" size="18" />
      </template>
    </van-nav-bar>
  </van-sticky>
</template>

<script>
export default {
  name: "Headers",
};
</script>

<style scoped>
.van-nav-bar__title {
  /* color: rgb(52, 73, 94); */
  color: red;
  font-size: 20px;
}
.van-ellipsis {
  color: rgb(52, 73, 94);
  font-size: 20px;
}
.topTab >>> .van-nav-bar__title {
  font-size: 20px;
}
</style>