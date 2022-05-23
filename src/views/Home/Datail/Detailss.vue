<template>
  <div>
    <van-nav-bar
      title="开饭啦"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 详情介绍 -->
    <div class="deBox">
      <div class="boxText">详情</div>
      <div class="imgBox">
        <p class="p1">{{ countDatas.name }}</p>
        <img
          :src="require(`../../../assets/img/${countDatas.img_lg}`)"
          alt=""
        />
      </div>
      <div class="deText">
        <h4>主要原料：</h4>
        <span>{{ countDatas.material }}</span>
        <p class="p2">{{ countDatas.detail }}</p>
      </div>
      <div class="muchText">￥{{ countDatas.price }}</div>
      <div class="deBtn">
        <van-button type="primary" @click="toShopCart">添加到购物车</van-button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <van-button color="#9112dd" @click="toHome">我再看看</van-button>
      </div>
    </div>
    <tails></tails>
  </div>
</template>

<script>
import Tails from "../../../components/Tails.vue";
import { reqList1 } from "../../../api/index.js";
import { mapState } from "vuex"; 

export default {
  components: { Tails },
  name: "detailss",
  data() {
    return {
      a: null,
      deuserState: null,
      countDatas: {
        did: 1,
        name: "{商品标题}",
        material: "描述信息",
        price: "20.00",
        img_lg: "p0281-l.jpg",
        detail: "xxxxxxxxxxxxxxxx",
      },
    };
  },
  mounted() {
    let userState = localStorage.getItem("UserState");
      // 转换成字符串
      userState = JSON.parse(userState);
      this.deuserState = userState;
      console.log(this.deuserState);

    this.a = this.$route.query.id;
    this.reqListDatails();
  },
  computed:{
    ...mapState(['countData'])
  },
  methods: {
    async reqListDatails() {
      let did = this.a;
      let res = await reqList1(did);
      // console.log(res);
      console.log(res.data.subjects[0]);
      this.countDatas = res.data.subjects[0];
    },
    onClickLeft() {
      this.$router.push("/home");
    },
    toHome() {
      this.$router.push("/home");
    },
    toShopCart() {
      if (this.deuserState.token == null || this.deuserState.token == undefined) {
        this.$dialog
          .confirm({
            title: "未登录",
            message: "请先登录账号，点击确认跳转至登录界面",
          })
          .then(() => {
            // on confirm
            this.$router.push("/Login");
          })
          .catch(() => {
            // on cancel
          });
      } else {
        // 添加商品到购物车
        let arr={
            price: this.countDatas.price,
            name: this.countDatas.name,
            img_lg: this.countDatas.img_lg,
            did:this.countDatas.did,
            mounts:1,
            checked: false,
          }
        this.$store.commit("addList",arr);
        // console.log(this.countData);
        localStorage.setItem("AddCommodity",JSON.stringify(this.countData))
        this.$toast.success("成功加入购物车");
      }
    },
  },
};
</script>

<style >
.deBox {
  color: rgb(52, 73, 94);
  padding: 5px;
  margin: 10px;
  margin-bottom: 120px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(233, 230, 230);
  position: relative;
}
.boxText {
  color: rgb(52, 73, 94);
  margin: 6px 0;
}
.imgBox {
  width: 345px;
  margin: 0 auto;
  border-top: 2px solid rgb(233, 230, 230);
}
img {
  border-top: 2px solid rgb(233, 230, 230);
  width: 345px;
  height: 220px;
}
.deText {
  color: rgb(52, 73, 94);
  width: 320px;
  margin: 0 auto;
  padding-top: 15px;
  border-bottom: 2px solid rgb(233, 230, 230);
}
.muchText {
  padding-left: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 20px;
}
h4 {
  display: inline;
}
.deBtn {
  margin-top: 20px;
  position: absolute;
  right: 5px;
}
.deText span {
  font-size: 14px;
}
.p1 {
  font-size: 20px;
}
.p2 {
  font-size: 12px;
}
.van-nav-bar__title {
  font-size: 20px !important;
}
</style>