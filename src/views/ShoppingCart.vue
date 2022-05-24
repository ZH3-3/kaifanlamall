<template>
  <div>
    <headers />
    <div class="cartBox" v-if="isLogin">
      <p>购物车</p>
      <van-card
        v-for="(item, index) in countData"
        :key="index"
        :num="item.mounts"
        :price="item.price"
        :title="item.name"
        :thumb="require('.././assets/img/' + item.img_lg)"
      >
        <template #footer class="bottomTab">
          <!-- 选择按钮 -->
          <van-field name="checkbox">
            <template #input>
              <van-checkbox
                v-model="item.checked"
                @click="changeCheck(index)"
              />
            </template>
          </van-field>
          <!-- 删除按钮 -->
          <template
            ><van-tag plain @click="removeBtn(index)">删除</van-tag></template
          >
          <van-button size="mini" class="btn1" @click="addMount(index)"
            >+</van-button
          >
          <van-button size="mini" class="btn1" @click="subMount(index)"
            >-</van-button
          >
        </template>
      </van-card>
      <div class="commodityList"></div>
      <van-submit-bar
        :price="totalsPrice * 100"
        button-text="提交订单"
        @submit="onPayBtn"
      >
        <van-checkbox v-model="allChecked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <onlogin v-else :mess="mess"></onlogin>
    <tails />
  </div>
</template>

<script>
import Headers from "../components/Headers.vue";
import Tails from "../components/Tails.vue";
import Onlogin from "../components/Onlogin.vue";
export default {
  components: { Headers, Tails, Onlogin },
  name: "ShoppingCart",
  data() {
    return {
      mess: "购物车",
      totalsPrice: 0, //总价
      isLogin: true,
      allChecked: false, //全选
      deuserState: null,
      countData: [],
    };
  },
  mounted() {
    this.addCommodity();
    this.computToallPrice();
    let userState = localStorage.getItem("UserState");
    if (userState != null && userState != undefined) {
      // 转换成字符串
      userState = JSON.parse(userState);
      this.deuserState = userState;
      console.log(this.deuserState);
    }
    // else{
    //   this.isLogin=false
    // }
    if (this.deuserState.token == null || this.deuserState.token == undefined) {
      this.isLogin = false;
    }

    this.checkedAll();
  },
  // computed: {
  // },
  methods: {
    // 获取购物车数据
    addCommodity() {
      let addCommodity = localStorage.getItem("AddCommodity");
      if (addCommodity != null && addCommodity != undefined) {
        addCommodity = JSON.parse(addCommodity);
        this.countData = addCommodity;
        console.log(addCommodity);
      }
    },
    //提交订单
    onPayBtn() {
      // console.log(this.countData);
      this.countData.forEach((item) => {
        if (item.checked == true) {
          localStorage.setItem("AddCommodity", JSON.stringify(this.countData));
          this.$router.push({
            path: "/newforms",
          });
        }
        // if (item.checked == false) {
        //   this.$toast.fail("请先选择要结算的商品");
        // }
      });
    },
    // 加减计数
    addMount(index) {
      this.$store.commit("addmount", index);
      this.computToallPrice();
      if (this.countData[index].mounts < 20) {
        this.countData[index].mounts++;
      }
    },
    subMount(index) {
      this.$store.commit("submount", index);
      this.computToallPrice();
      if (this.countData[index].mounts > 1) {
        this.countData[index].mounts--;
      } else if (this.countData[index].mounts == 1) {
        this.$toast({
          message: "不能再减少了~",
          duration: 500,
        });
      }
    },
    // 删除商品
    removeBtn(index) {
      this.$store.commit("delList", index);
      this.countData.splice(index, 1);
      localStorage.setItem("AddCommodity", JSON.stringify(this.countData));
      console.log(this.countData);
      this.$toast({
        type: "success",
        message: "删除成功",
        duration: 500,
      });
      this.checkedAll();
    },
    // 单选
    changeCheck(index) {
      this.$store.commit("changeChecked", index);
      this.computToallPrice();
      this.checkedAll();
    },
    checkAll() {
      if (this.allChecked === true) {
        this.countData.forEach((item) => {
          item.checked = true;
          this.$store.commit("allChecked", item.checked);
          this.computToallPrice();
        });
      } else {
        this.countData.forEach((item) => {
          item.checked = false;
          this.$store.commit("allChecked", item.checked);
          this.totalsPrice = 0;
        });
      }
    },
    // 计算总价
    computToallPrice() {
      this.totalsPrice = 0;
      this.countData.forEach((item) => {
        if (item.checked) {
          this.totalsPrice += item.mounts * item.price;
        }
      });
    },
    // 按钮控制全选按钮
    checkedAll() {
      let flag = true;
      for (let i = 0; i < this.countData.length; i++) {
        if (!this.countData[i].checked) {
          this.allChecked = false;
          flag = false;
          return false;
        }
      }
      if (flag) {
        this.allChecked = true;
      }
      if (this.countData.length < 1) {
        this.allChecked = false;
      }
    },
  },
};
</script>

<style scoped>
.cartBox {
  margin: 10px;
}
.commodityList {
  margin-bottom: 90px;
}
p {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  background-color: rgb(244, 242, 242);
  font-size: 20px;
  color: rgb(157, 100, 100);
}

.btn1 {
  width: 40px;
  font-size: 18px;
}
.van-card__num {
  font-size: 15px;
}
.van-card {
  position: relative;
}
.van-tag {
  display: block;
  height: 20px;
  width: 35px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  top: 5px;
  right: 10px;
}
.van-tag--plain {
  background-color: rgb(220, 222, 233);
}
.van-cell {
  padding: 0px;
  width: 22px;
  position: absolute;
  bottom: 4px;
}
.van-submit-bar__bar {
  background-color: rgb(250, 249, 230);
  position: absolute;
  bottom: 50px;
  width: 93%;
}
.van-card__title {
  font-size: 16px;
}
.van-card__footer {
  width: 100%;
  height: 25px;
  margin-top: 3px;
}
</style>