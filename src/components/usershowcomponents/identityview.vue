<template>
  <div class="list">
    <h3>
      <span>身份</span>
      <span>视图名称</span>
      <span>视图id</span>
    </h3>
    <ul>
      <li
        v-for="(item) in IdentityviewData.length===0?getIdentityview.slice(pagesizes*(pageNum-1),pagesizes*1-1):IdentityviewData"
        :key="item.user_id"
      >
        <span>{{item.identity_text}}</span>
        <span>{{item.view_authority_text}}</span>
        <span>{{item.view_id}}</span>
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
        :total="getIdentityview.length"
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
      IdentityviewData: [],
      pageSize: 10,
      currentPage1: 1,
      pageNum: 1,
      pagesizes: 10
    };
  },
  computed: {
    ...mapGetters("userShow", ["getIdentityview"])
  },
  methods: {
    ...mapActions("userShow", ["axiosIdentityview"]),
    handleSizeChange(val) {
      this.pagesizes = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.IdentityviewData = this.getIdentityview.slice(
        this.pagesizes * (this.pageNum - 1),
        this.pagesizes * this.pageNum - 1
      );
    }
  },
  created() {
    this.axiosIdentityview();
    this.IdentityviewData = this.getIdentityview.slice(
      this.pagesizes * (this.pageNum - 1),
      this.pagesizes * 1 - 1
    );
  },
  mounted() {}
};
</script>
<style scoped lang="">
</style>