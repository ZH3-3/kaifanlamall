 <template>
  <div>
    <headers></headers>
    <div v-if="isLogin">
      <p class="titName" style="color: rgb(157, 100, 100)">我的订单</p>
      <div class="mainList">
        <table>
          <tr>
            <th class="th1">编号</th>
            <th>菜品</th>
            <th>下单时间</th>
            <th class="th2">联系人</th>
          </tr>
          <tr
            v-for="(item, index) in hisList"
            :key="index"
            :class="{
              singleRecord: index % 2 == 0,
              singleRecord2: index % 2 != 0,
            }"
          >
            <td>{{ item.did }}</td>
            <td>
              <img :src="require(`.././assets/img/${item.img_sm}`)" alt="" />
            </td>
            <td>{{ Date(item.order_time) | formatDate }}</td>
            <td>{{ item.user_name}}</td>
          </tr>
        </table>

        <van-pagination
          v-model="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
          @change="listBtn"
        />
      </div>
    </div>
    <onlogin v-else :mess="mess"></onlogin>
    <tails></tails>
  </div>
</template>

<script>
import Headers from "../components/Headers.vue";
import Tails from "../components/Tails.vue";
import { formatDate } from "../common/date.js";

import { reqList2 } from "../api/index.js";
import Onlogin from "../components/Onlogin.vue";
export default {
  components: { Headers, Tails, Onlogin },
  name: "Myforms",
  data() {
    return {
      mess: "订单中心",
      currentPage: 1,
      isLogin: true,
      deuserState: null,
      length: 5,
      start: 0,
      hisList: [],
    };
  },
  filters: {
    // 时间格式自定义 只需把字符串里面的改成自己所需的格式
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日 hh:mm:ss");
    },
  },
  mounted() {
    this.reqListForm();
    let userState = localStorage.getItem("UserState");
    if (userState != null && userState != undefined) {
      // 转换成字符串
      userState = JSON.parse(userState);
      this.deuserState = userState;
      console.log(this.deuserState);
    }
    if (this.deuserState.token == null || this.deuserState.token == undefined) {
      this.isLogin = false;
    }
    // 获取订单数据
    // let paylist = localStorage.getItem("PayCommodity");
    // if (paylist != null && paylist != undefined) {
    //   // 转换成字符串
    //   paylist = JSON.parse(paylist);
    //   this.hisList = paylist;
    //   console.log(paylist);
    // }
  },
  methods: {
    async reqListForm() {
      let start = this.start;
      let length = this.length;
      let res = await reqList2(length, start);
      console.log(res);
      this.hisList = res.data.subjects;
    },
    listBtn(){
      this.start=(this.currentPage-1)*5
      this.reqListForm();
    }
  },
};
</script>

<style scoped>
div {
  color: rgb(52, 73, 94);
}
.titName {
  text-align: center;
  font-size: 21px;
}
.mainList {
  margin: 10px;
  margin-bottom: 50px;
  border: 2px solid rgb(232, 231, 231);
}
.mainList table {
  border-collapse: collapse;
  width: 100%;
}
.mainList table tr {
  border-bottom: 1px solid rgb(222, 222, 222);
}
.mainList table th {
  font-size: 14px;
  text-align: left;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: rgb(255, 255, 255);
}
.mainList table td {
  font-size: 14px;
  padding: 3px;
}
.mainList table td img {
  /* display: block;
  margin: 0 auto; */
  width: 100px;
  height: 70px;
}
.singleRecord2 {
  background-color: rgb(240, 243, 243);
}
.th1 {
  width: 35px;
}
.th2 {
  width: 50px;
}
</style>
