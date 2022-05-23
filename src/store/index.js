import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      // length: 5,
      isLogin: false,//判断是否登录
      countData: [],//购物车数组
      payLists:[],//订单数组
    }
  },
  mutations: {
    //添加数组到购物车
    addList(state, commodity) {
      let flag = false
      state.countData.map(ele => {
        if (ele.did == commodity.did) {
          flag = true
          ele.mounts++
        }
      })
      if (!flag) {
        state.countData.unshift(commodity)
      }
    },
    //删除
    delList(state, index) {
      state.countData.splice(index, 1)
    },
    //加
    addmount(state, index) {
      if (state.countData[index].mounts < 20) {
        state.countData[index].mounts++;
        localStorage.setItem("AddCommodity", JSON.stringify(state.countData))
      }
    },
    //减
    submount(state, index) {
      if (state.countData[index].mounts > 1) {
        state.countData[index].mounts--
        localStorage.setItem("AddCommodity", JSON.stringify(state.countData))
      }
    },
    //单选按钮
    changeChecked(state, index) {
      state.countData[index].checked = !state.countData[index].checked
      localStorage.setItem("AddCommodity", JSON.stringify(state.countData))
    },
    //全选按钮
    allChecked(state, item) {
      state.countData.forEach(element => {
        element.checked = item
      });
      localStorage.setItem("AddCommodity", JSON.stringify(state.countData))
    },
    //修改购物车
    cartCommodity(state) {
      let orderData = state.countData.filter((item) => item.checked == false);
      state.countData = orderData
      localStorage.setItem("AddCommodity", JSON.stringify(state.countData))
    },
    // 结算商品到订单
    payList(state,[orderData,userName]) {
      let timer = Date.parse(new Date())
      for (let i = 0; i < orderData.length; i++) {
        let a = {
          img_sm: orderData[i].img_lg,
          did: orderData[i].did,
          name:userName,
          order_time: timer
        }
        state.payLists.unshift(a)
      }
      localStorage.setItem("PayCommodity", JSON.stringify(state.payLists))
      console.log( state.payLists);
    }
  },
  actions: {
  },
  getters: {

  },
  modules: {
  }
})
