<template>
  <div class="list">
    <h3>
      <span>身份名称</span>
      <span>api权限名称</span>
      <span>api权限url</span>
      <span>api权限方法</span>
    </h3>
    <ul>
      <li
        v-for="(item) in IdentityApiData.length===0?getIdentityApi.slice(pagesizes*(pageNum-1),pagesizes*1-1):IdentityApiData"
        :key="item.user_id"
      >
        <span>{{item.identity_text}}</span>
        <span>{{item.api_authority_text}}</span>
        <span>{{item.api_authority_url}}</span>
        <span>{{item.api_authority_method}}</span>
      </li>
    </ul>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="pageSize"
      layout="total,prev, pager, next,jumper"
      :total="getIdentityApi.length"
    ></el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      IdentityApiData: [],
      pageSize: 10,
      currentPage1: 1,
      pageNum: 1,
      pagesizes: 10
    };
  },
  computed: {
    ...mapGetters("userShow", ["getIdentityApi"])
  },
  methods: {
    ...mapActions("userShow", ["axiosIdentityApi"]),
    handleSizeChange(val) {
      this.pagesizes = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.IdentityApiData = this.getIdentityApi.slice(
        this.pagesizes * (this.pageNum - 1),
        this.pagesizes * this.pageNum - 1
      );
    }
  },
  created() {
    this.axiosIdentityApi();
    this.IdentityApiData = this.getIdentityApi.slice(
      this.pagesizes * (this.pageNum - 1),
      this.pagesizes * 1 - 1
    );
  },
  mounted() {}
};
</script>
<style scoped lang="">
</style>