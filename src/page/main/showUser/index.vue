<template>
  <div class="wrap">
    <div class="main">
      <div class="usershow">
        <h2>用户展示</h2>
        <div class="userdatatitle" ref="tab">
          <span :class="[{'active':ind===0}]" @click="tabChange(0);componentId='User'">用户数据</span>
          <span :class="[{'active':ind===1}]" @click="tabChange(1);componentId='Identity'">身份数据</span>
          <span :class="[{'active':ind===2}]" @click="tabChange(2);componentId='Apiport'">api接口权限</span>
          <span
            :class="[{'active':ind===3}]"
            @click="tabChange(3);componentId='Identityapi'"
          >身份和api接口关系</span>
          <span :class="[{'active':ind===4}]" @click="tabChange(4);componentId='Viewport'">视图接口权限</span>
          <span
            :class="[{'active':ind===5}]"
            @click="tabChange(5);componentId='Identityview'"
          >身份和视图权限关系</span>
        </div>
        <h4 ref="title">{{title}}</h4>
        <keep-alive>
          <component :is="componentId?componentId:'User'"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import User from "../../../components/usershowcomponents/user";
import Identity from "../../../components/usershowcomponents/identity";
import Apiport from "../../../components/usershowcomponents/apiport";
import Identityapi from "../../../components/usershowcomponents/identityapi";
import Viewport from "../../../components/usershowcomponents/viewport";
import Identityview from "../../../components/usershowcomponents/identityview";
export default {
  props: {},
  components: {
    User,
    Identity,
    Apiport,
    Identityapi,
    Viewport,
    Identityview
  },
  data() {
    return {
      ind: 0,
      title: "",
      componentId: ""
    };
  },
  computed: {
    ...mapGetters("userShow", ["getshowUser"])
  },
  methods: {
    ...mapActions("userShow", ["axiosUserShow"]),
    tabChange(index) {
      this.ind = index;
      this.title = this.$refs.tab.children[this.ind].innerHTML;
    }
  },
  created() {
    this.axiosUserShow();

    this.$nextTick(() => {
      this.title = this.$refs.tab.children[this.ind].innerHTML;
    });
  },
  mounted() {}
};
</script>
<style scope lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
html,
body,
#app,
.wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.header {
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #eee;
  background: #ccc;
}
.main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  background: #f0f2f5;
  .usershow {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  h1,
  h2,
  h3,
  h4 {
    height: 60px;
    line-height: 60px;
    font-weight: normal;
  }
  h3 {
    display: flex;
    justify-content: space-between;
    background: #fafafa;
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .leftlist {
    height: 800px;
    width: 200px;
    background: #232a41;
  }
  .userdatatitle {
    width: 100%;
    display: flex;
    span {
      color: rgba(0, 0, 0, 0.65);
      padding: 5px 15px;
      background: #fff;
      border: 1px solid #ccc;
      font-size: 14px;
      cursor: pointer;
    }
    .active {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
  }
  .list {
    width: 100%;
    > ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      li {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
  }
}
</style>