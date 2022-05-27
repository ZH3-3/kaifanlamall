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
        <input
          v-model.trim="sex"
          type="radio"
          name="sex"
          value="男"
          checked="checked"
        />男士
        <input
          v-model.trim="sex"
          type="radio"
          name="sex"
          value="女"
        />女士<br />
        <label>联系电话:</label><br />
        <input
          type="text"
          placeholder="请输入手机号"
          class="newinput"
          v-model.trim="userNumber"
          ref="phone"
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
import requests from "../../../api/require";

export default {
  components: { Tails },
  name: "newforms",
  data() {
    return {
      userName: null,
      sex: "男",
      userNumber: null,
      userAddress: null,
      a: null,
      id: null,
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
      this.orderData = orderDatas;
      console.log(this.orderData);
    },
    onClickLeft() {
      this.$router.push({
        path: "/shoppingCart",
        query: { id: this.a },
      });
    },
    sucList: function () {
      let userName = this.userName;
      let address = this.userAddress;
      let tel = this.userNumber;
      let sex = this.sex;
      let id = [];
      if (
        userName == null ||
        userName == undefined ||
        userName == "" ||
        tel == null ||
        tel == undefined ||
        tel == "" ||
        address == null ||
        address == undefined ||
        address == ""
      ) {
        this.$toast.fail("内容不能为空");
      } else {
        let phoneReg = /^[1][3,4,5,7,8,8][0-9]{9}$/;
        if (phoneReg.test(tel)) {
            this.orderData.forEach((element) => {
            id.push(element.did);
            this.id = id;
          });
          // console.log(this.id);
          this.$store.commit("cartCommodity");
          for (let i = 0; i < this.orderData.length; i++) {
            let did = this.orderData[i].did;
            let param =
              "did=" +
              did +
              "&tel=" +
              tel +
              "&userName=" +
              userName +
              "&sex=" +
              sex +
              "&address=" +
              address;
            requests.post("/addOrder.php", param).then((res) => {
              console.log(res);
            });
          }
          this.$toast.fail("下单成功");
          this.$router.push({
            path: "/endlist",
            query: { id: this.id },
          });
        }else{
          this.$toast.fail("请输入正确的手机号");
          this.$refs.phone.focus()
        }
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
  height: 150px;
}
.van-nav-bar__title {
  font-size: 20px !important;
}
</style>