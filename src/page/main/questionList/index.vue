<template>
  <div class="wrap">
    <section>
      <h2>试卷列表</h2>
    </section>
    <div class="searchList">
      <div>
        <p>考试类型:</p>
        <el-select v-model="testType" placeholder="请选择">
          <el-option
            v-for="item in getexamTypeData"
            :key="item.exam_id"
            :label="item.exam_name"
            :value="item.exam_name"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p>课程:</p>
        <el-select v-model="testName" placeholder="请选择">
          <el-option
            v-for="item in getsubjectData"
            :key="item.subject_id"
            :label="item.subject_text"
            :value="item.subject_text"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search" @click="searchChange">查询</el-button>
      </div>
    </div>
    <div class="list">
      <div>
        <div class="listhead">
          <h6>试卷列表</h6>
          <div class="tab">
            <el-button plain>全部</el-button>
            <el-button plain>进行中</el-button>
            <el-button plain>已结束</el-button>
          </div>
        </div>
        <div class="listcon">
          <div>
            <span>试卷信息</span>
            <span>班级</span>
            <span>创建人</span>
            <span>开始时间</span>
            <span>结束时间</span>
            <span>操作</span>
          </div>
          <ul>
            <li
              v-for="(item,index) in searchList.length!==0?searchList:getquestionList"
              :key="index"
            >
              <span>{{item.title}}</span>
              <span>
                <span>考试班级</span>
                <div>
                  <span v-for="(i,ind) in item.grade_name" :key="ind">{{i}}</span>
                </div>
              </span>
              <span>{{item.user_name}}</span>
              <span>{{new Date(item.start_time*1).toLocaleString()}}</span>
              <span>{{new Date(item.end_time*1).toLocaleString()}}</span>
              <span>详情</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      testType: [],
      testName: [],
      searchList: []
    };
  },
  computed: {
    ...mapGetters("addExam", [
      "getexamTypeData",
      "getsubjectData",
      "getquestionList"
    ])
  },
  methods: {
    ...mapActions("addExam", [
      "axiosexamTypeData",
      "axiossubjectData",
      "axiosquestionList"
    ]),
    searchChange() {
      if (this.getquestionList) {
        if (this.testType && this.testName.length === 0) {
          this.searchList = this.getquestionList.filter(item => {
            return item.exam_name === this.testType;
          });
        } else if (this.testType.length === 0 && this.testName) {
          this.searchList = this.getquestionList.filter(item => {
            return item.subject_text === this.testName;
          });
        } else if (this.testType.length === 0 && this.testName.length === 0) {
          return;
        } else {
          this.searchList = this.getquestionList.filter(item => {
            return item.subject_text === this.testName && item.exam_name === this.testType
          });
        }
      }
      console.log(this.searchList)
      if(this.searchList.length===0){
        alert('查询不到，已显示全部')
      }
    }
  },
  created() {
    this.axiosexamTypeData();
    this.axiossubjectData();
    this.axiosquestionList();
    this.searchList = this.getquestionList;
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  section {
    width: 100%;
    h2 {
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      font-weight: normal;
    }
  }
  .searchList {
    width: 95%;
    padding: 20px 0;
    background: #fff;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: space-around;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-around;
      p {
        margin-right: 10px;
        font-size: 12px;
      }
      .el-select {
        width: 180px;

        .el-input {
          font-size: 12px;
        }
        ::placeholder {
          font-size: 12px;
        }
      }
      .el-button {
        font-size: 12px;
      }
    }
  }
  .list {
    width: 95%;
    height: auto;
    background: #fff;
    margin-top: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .listhead {
      width: 100%;
      display: flex;
      justify-content: space-between;
      h6 {
        padding: 20px 0 20px 10px;
        font-weight: normal;
      }
      .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        .el-button {
          width: 60px;
          height: 32px;
          margin: 0;
          padding: 0;
          font-size: 12px;
        }
      }
    }
    .listcon {
      > div {
        display: flex;
        background: #eee;
        height: 50px;
        align-items: center;
        padding-left: 15px;
        span {
          width: 18%;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
        }
        span:nth-child(1) {
          width: 20%;
        }
        span:nth-child(2) {
          width: 25%;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        li {
          width: 100%;
          display: flex;
          justify-content: space-around;
          padding-left: 15px;
          height: 80px;
          align-items: center;
          border-bottom: 1px solid #eee;
          span {
            width: 18%;
            font-size: 12px;
          }
          span:nth-child(1) {
            width: 20%;
          }
          > span:nth-child(2) {
            display: flex;
            flex-direction: column;
            width: 25%;

            > span {
              width: 100%;
            }
            > div {
              margin-top: 5px;
              span {
                color: rgba(0, 0, 0, 0.65);
              }
            }
          }
        }
      }
    }
  }
}
</style>