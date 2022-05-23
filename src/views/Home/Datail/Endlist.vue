<template>
  <div>
    <headers />
    <div class="endBox">
      <p>订餐成功!<br> 您的订单编号为: {{a}}<br> 您可以在订单中心查看订单状态!</p>
    </div>
    <tails />
  </div>
</template>

<script>
import Headers from "../../../components/Headers.vue";
import Tails from "../../../components/Tails.vue";
export default {
  components: { Headers, Tails },
  data(){
      return{
          a:null,
      }
  },
  mounted(){
      this.a = this.$route.query.id;
  }
};
</script>

<style>
.endBox {
  margin: 13px;
  height: 130px;
  border: 1px solid rgb(232, 231, 231);
}
.endBox p {
  padding: 20px;
  margin: 10px;
  border: 1px solid rgb(222, 240, 216);
  border-radius: 3px;
  background-color: rgb(222,240,216);
}
</style>