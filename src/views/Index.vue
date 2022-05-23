<template>
  <div class="begins">
    <div class="btn" ref="refbtn" @click="btnClick">
      <van-button round color="#688" class="btn1">{{ value }}</van-button>
    </div>
    <div class="middle">
      <div class="text">开饭了！</div>
      <img src="../assets/img/kid-foods.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      value: 5,
    };
  },
  created() {
    let timer = setInterval(() => {
      this.value--;
      if (this.value === 0) {
        clearInterval(timer);
        this.value = "跳过";
      }
    }, 1000);

    let a={
      token:null,
    }
    localStorage.setItem("UserState",JSON.stringify(a))
  },
  methods: {
    btnClick() {
      if (this.value === "跳过") {
        this.$router.replace("/home");
      }
    },
  },
};
</script>

<style>
.begins {
  width: 100vw;
  height: 100vh;
  background-color: rgb(225, 236, 247);
}
.btn {
  position: fixed;
  right: 0px;
}
.btn1 {
  width: 60px;
}
.middle {
  position: fixed;
  width: 100vw;
  top: 40%;
  transform: translateY(-50%);
}
.text {
  font-size: 30px;
  color: rgb(196, 83, 83);
  text-align: center;
}
.middle img {
  width: 100vw;
  height: 110px;
}
</style>