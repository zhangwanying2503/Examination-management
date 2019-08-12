<template>
  <div>
    <div class="list">
      <h3>
        <span>视图权限名称</span>
        <span>视图id</span>
      </h3>
      <ul>
        <li
          v-for="(item) in ViewportData.length===0?getViewport.slice(pagesizes*(pageNum-1),pagesizes*1-1):ViewportData"
          :key="item.user_id"
        >
          <span>{{item.view_authority_text}}</span>
          <span>{{item.view_id}}</span>
        </li>
      </ul>
    </div>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total, prev, pager, next,jumper"
        :total="getViewport.length"
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
      ViewportData: [],
      pageSize: 10,
      currentPage1: 1,
      pageNum: 1,
      pagesizes: 10
    };
  },
  computed: {
    ...mapGetters("userShow", ["getViewport"])
  },
  methods: {
    ...mapActions("userShow", ["axiosViewport"]),
    handleSizeChange(val) {
      this.pagesizes = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.ViewportData = this.getViewport.slice(
        this.pagesizes * (this.pageNum - 1),
        this.pagesizes * this.pageNum - 1
      );
    }
  },
  created() {
    this.axiosViewport();
    this.ViewportData = this.getViewport.slice(
      this.pagesizes * (this.pageNum - 1),
      this.pagesizes * 1 - 1
    );
  },
  mounted() {}
};
</script>
<style scoped lang="">
</style>