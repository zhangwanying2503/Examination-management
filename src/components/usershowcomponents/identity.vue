<template>
  <div class="list">
    <h3>
      <span>身份名称</span>
    </h3>
    <ul>
      <li
        v-for="(item) in IdentityData.length===0?getIdentity.slice(pagesizes*(pageNum-1),pagesizes*1-1):IdentityData"
        :key="item.user_id"
      >
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
        layout="total, prev, pager, next,jumper"
        :total="getIdentity.length"
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
      IdentityData: [],
      pageSize: 10,
      currentPage1: 1,
      pageNum: 1,
      pagesizes: 10
    };
  },
  computed: {
    ...mapGetters("userShow", ["getIdentity"])
  },
  methods: {
    ...mapActions("userShow", ["axiosIdentity"]),
    handleSizeChange(val) {
      this.pagesizes = val;
      console.log("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      console.log("handleCurrentChange", val);
      this.pageNum = val;
      this.IdentityData = this.getIdentity.slice(
        this.pagesizes * (this.pageNum - 1),
        this.pagesizes * this.pageNum - 1
      );
    }
  },
  created() {
    this.axiosIdentity();
    this.getApiportSizeData = this.getIdentity.slice(
      this.pagesizes * (this.pageNum - 1),
      this.pagesizes * 1 - 1
    );
  },
  mounted() {}
};
</script>
<style scoped lang="">
</style>