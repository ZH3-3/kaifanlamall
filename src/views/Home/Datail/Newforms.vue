<template>
  <div>
    <van-nav-bar
      title="开饭啦"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="newformbox">
      <div class="formBox">
        <label>联系人：</label><br />
        <input
          type="text"
          placeholder="请输入联系人姓名"
          class="newinput"
          v-model.trim="userName"
        /><br />
        <label>性别：</label><br />
        <input type="radio" name="sex" checked="checked" />男士
        <input type="radio" name="sex" />女士<br />
        <label>联系电话:</label><br />
        <input
          type="text"
          placeholder="请输入手机号"
          class="newinput"
          v-model.trim="userNumber"
        /><br />
        <label>送餐地址:</label><br />
        <input
          type="text"
          placeholder="请输入地址"
          class="newinput1"
          v-model.trim="userAddress"
        />
        <van-button type="primary" block @click="sucList">确定下单</van-button>
      </div>
    </div>
    <tails />
  </div>
</template>

<script>
import Tails from "../../../components/Tails.vue";

export default {
  components: { Tails },
  name: "newforms",
  data() {
    return {
      userName: null,
      userNumber: null,
      userAddress: null,
      a: null,
      id:null,
      orderData: [],
    };
  },
  mounted() {
    this.a = this.$route.query.id;
    let commodity = localStorage.getItem("AddCommodity");
    if (commodity != null && commodity != undefined) {
      commodity = JSON.parse(commodity);
      this.orderData = commodity;
      // console.log(this.orderData);
    }
    this.dataFilter();
  },
  methods: {
    // 过滤为true的商品
    dataFilter() {
      let orderDatas = this.orderData.filter((item) => item.checked == true);
      this.orderData=orderDatas
      console.log(this.orderData);
    },
    onClickLeft() {
      this.$router.push({
        path: "/shoppingCart",
        query: { id: this.a },
      });
    },
    sucList() {
      let name = this.userName;
      let address = this.userAddress;
      let number = this.userNumber;
      let id=[]
      if (
        name == null ||
        name == undefined ||
        name == "" ||
        number == null ||
        number == undefined ||
        number == "" ||
        address == null ||
        address == undefined ||
        address == ""
      ) {
        this.$toast.fail("内容不能为空");
      } else {
        this.orderData.forEach(element => {
          id.push(element.did)
          this.id=id
        });
        console.log(this.id);
        this.$store.commit("cartCommodity")
        this.$store.commit("payList",[this.orderData,this.userName])
        this.$toast.fail("下单成功");
        this.$router.push({
          path:'/endlist',
          query:{id:this.id}
        })
      }
    },
  },
};
</script>

<style>
.newformbox {
  margin: 12px;
  border: 1px solid rgb(222, 222, 222);
}

.formBox {
  margin: 10px;
}
.newformbox input {
  margin: 15px 0;
}
.newinput {
  border: 1px solid rgb(222, 222, 222);
  margin: 0;
  width: 100%;
  height: 30px;
}
.newinput1 {
  border: 1px solid rgb(222, 222, 222);
  margin: 0;
  width: 100%;
  height: 100px;
}
.van-nav-bar__title {
  font-size: 20px !important;
}
</style>