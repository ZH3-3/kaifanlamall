<template>
  <div>
    <!-- 头部 -->
    <headers></headers>
    <!-- 搜索栏 -->
    <div>
      <van-search
        placeholder="请输入菜品名称或原料名称.."
        v-model="value"
        show-action
        @search="onSearch"
      >
        <template #action>
          <div @click="selectBtn">搜索</div>
        </template>
      </van-search>
    </div>
    <!--主页 -->
    <div class="box1">
      <div>
        <van-card
          class="homePage"
          v-for="(item, index) in countData"
          :key="index"
          :price="item.price"
          :thumb="require('../../assets/img/' + item.img_sm)"
          origin-price="47.00"
          @click="btn1(item.did)"
        >
          <template #title>
            <div v-html="item.name" class="title"></div>
          </template>
          <template #desc>
            <div v-html="'主要食料：' + item.material" class="desc"></div>
          </template>
        </van-card>
      </div>

      <!-- 底部加载按钮 -->
      <div v-if="listRst">
        <div class="bigBtn" v-if="dataList">
          <van-button type="primary" size="large" @click="updataList"
            >加载更多</van-button
          >
        </div>
        <div class="noBtn" v-else>
          <van-notice-bar
            color="#1989fa"
            background="#ecf9ff"
            left-icon="info-o"
          >
            已经到底了，没有更多菜品了！
          </van-notice-bar>
        </div>
      </div>

      <!-- 搜索界面加载按钮 -->
      <div v-else>
        <div class="bigBtn" v-if="dataList">
          <van-button type="primary" size="large" @click="updataListRts"
            >加载更多</van-button
          >
        </div>
        <div class="noBtn" v-else>
          <van-notice-bar
            color="#1989fa"
            background="#ecf9ff"
            left-icon="info-o"
          >
            已经到底了，没有更多菜品了！
          </van-notice-bar>
        </div>
      </div>
      <!-- 底部按钮 -->
    </div>
    <tails></tails>
  </div>
</template>

<script>
import Headers from "../../components/Headers.vue";
import Tails from "../../components/Tails.vue";

import { reqList, reqListx } from "../../api/index.js";

export default {
  name: "home",
  components: { Headers, Tails },
  data() {
    return {
      // length: 5,
      value: "",
      listRst: true,
      dataList: true,
      onSearch: "",
      countData: [],
    };
  },
  computed: {
    length() {
      return this.$store.state.length;
    },
  },
  mounted() {
    this.reqListHome();
    if (this.length >= 21) {
      this.dataList = false;
    }
  },
  methods: {
    async reqListHome() {
      let a1 = this.length;
      console.log(a1);
      let res = await reqList(a1);
      // console.log(res);
      this.countData = res.data.subjects;
    },
    btn1($event) {
      this.$router.push({
        path: "/detailss",
        query: { id: $event },
      });
    },
    // 加载
    updataList() {
      this.$store.commit("addLength");
      this.reqListHome();
      // this.length += 5;
      if (this.length >= 21) {
        this.dataList = false;
      }
      console.log(this.length);
    },
    // 加载搜索
    updataListRts: async function () {
      let value = this.value;
      let a1 = 21;
      let a = 5;
      a += 5;
      let res = await reqListx(value, a1);
      this.countData = res.data.subjects.slice(0, a);
      this.textBright();
      if (res.data.subjects.length <= a) {
        this.dataList = false;
      }
      // console.log(this.countData);
    },
    selectBtn: async function () {
      this.dataList = true;
      let value = this.value;
      let a1 = 21;
      if (value.split(" ").join("").length == 0 || value == undefined) {
        this.$toast.fail("请输入内容");
        return;
      } else {
        this.listRst = false;
        let res = await reqListx(value, a1);
        if (res.data.subjects == undefined) {
          this.$toast.fail("没有符合的商品");
        } else {
          this.countData = res.data.subjects.slice(0, 5);
          this.textBright();
          if (res.data.subjects.length < 6) {
            this.dataList = false;
          }
        }
      }
    },
    // 文字高亮
    textBright() {
      let value = this.value;
      this.countData.forEach((element) => {
        let patt = new RegExp(value, "g");
        element.name = element.name.replace(
          patt,
          `<span style="color: red">${value}</span>`
        );
        element.material = element.material.replace(
          patt,
          `<span style="color: red">${value}</span>`
        );
      });
    },
  },
};
</script>

<style scoped>
.box1 {
  margin: 10px;
}
.box1 {
  margin-top: 0;
  margin-bottom: 55px;
}
.homePage {
  width: 100%;
  border: 1px solid rgb(229, 223, 223);
  margin-bottom: 5px;
  word-break: break-all;
}
.title {
  font-size: 15px;
  color: rgb(52, 73, 94);
}
.desc {
  margin-top: 10px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>