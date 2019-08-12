<template>
  <div class="list">
    <h3>
      <span>用户名</span>
      <span>密码</span>
      <span>身份</span>
    </h3>
    <ul>
      <li
        v-for="(item) in showUserData.length===0?getshowUser.slice(pagesizes*(pageNum-1),pagesizes*1-1):showUserData"
        :key="item.user_id"
      >
        <span>{{item.user_name}}</span>
        <span>{{item.user_pwd}}</span>
        <span>{{item.identity_text}}</span>
      </li>
    </ul>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total,prev, pager, next,jumper"
        :total="getshowUser.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      showUserData: [],
      pageSize: 10,
      currentPage1: 1,
      pageNum: 1,
      pagesizes: 10
    };
  },
  computed: {
    ...mapGetters("userShow", ["getshowUser"])
  },
  methods: {
    handleSizeChange(val) {
      this.pagesizes = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.showUserData = this.getshowUser.slice(
        this.pagesizes * (this.pageNum - 1),
        this.pagesizes * this.pageNum - 1
      );
    }
  },
  created() {
    this.showUserData = this.getshowUser.slice(
      this.pagesizes * (this.pageNum - 1),
      this.pagesizes * 1 - 1
    );
  },
  mounted() {}
};
</script>
<style scoped lang="">
</style>