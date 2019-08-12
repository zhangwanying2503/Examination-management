<template>
  <div class="wrap">
    <section>
      <h2>添加考试</h2>
    </section>
    <div class="content">
      <div>
        <p>
          <span>*</span> 试卷名称
        </p>
        <el-input v-model="testName" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>
          <span>*</span> 选择考试类型
        </p>
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
        <p>
          <span>*</span> 选择课程
        </p>
        <el-select v-model="testClass" placeholder="请选择">
          <el-option
            v-for="item in getsubjectData"
            :key="item.subject_id"
            :label="item.subject_text"
            :value="item.subject_text"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p>
          <span>*</span> 设置题量
        </p>
        <el-input-number
          v-model="num"
          controls-position="right"
          @change="handleChange"
          :min="3"
          :max="10"
        ></el-input-number>
      </div>
      <div>
        <p>
          <span>*</span> 考试时间
        </p>
        <div class="timer">
          <div class="block">
            <el-date-picker v-model="timeStart" type="date" placeholder="开始时间"></el-date-picker>
          </div>
          <span>-</span>
          <div class="block">
            <el-date-picker v-model="timeEnd" type="date" placeholder="结束时间"></el-date-picker>
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary" id="btn" @click="addExamChange">创建试卷</el-button>
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
      testName: "",
      testType: "",
      testClass: "",
      num: "",
      timeStart: "",
      timeEnd: ""
    };
  },
  computed: {
    ...mapGetters("addExam", [
      "getexamTypeData",
      "getsubjectData",
      "getaddexam"
    ])
  },
  methods: {
    ...mapActions("addExam", [
      "axiosexamTypeData",
      "axiossubjectData",
      "axiosaddexam"
    ]),
    handleChange(value) {
      // console.log(value);
    },
    addExamChange() {
      const examid = this.getexamTypeData.find(
        item => item.exam_name == this.testType
      );
      const subjectid = this.getsubjectData.find(
        item => item.subject_text == this.testClass
      );
      const obj = {
        subject_id: subjectid.subject_id,
        exam_id: examid.exam_id,
        title: this.testName,
        number: this.num,
        start_time: new Date(this.timeStart) * 1,
        end_time: new Date(this.timeEnd) * 1
      };
      this.axiosaddexam(obj).then(() => {
        var a=""
        if (this.getaddexam === 1) {
          alert("试卷创建成功");
          this.testName = "";
          this.testType = "";
          this.testClass = "";
          this.num = "";
          this.timeStart = "";
          this.timeEnd = "";
        }
      });
    }
  },
  created() {
    this.axiosexamTypeData();
    this.axiossubjectData();
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
  .content {
    width: 97%;
    background: #fff;
    border-radius: 10px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    > div {
      height: 85px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      p {
        display: flex;
        align-items: center;
        font-size: 12px;
        span {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: red;
          margin: 0 5px;
        }
      }
      .el-input {
        width: 420px;
        .el-input__inner {
          width: 420px;
        }
      }
      .el-select {
        width: 140px;
      }
      .el-input-number {
        width: 140px;
      }
      .timer {
        display: flex;
        > span {
          display: flex;
          margin: 0 5px;
          align-items: center;
        }
        .el-date-editor {
          width: 200px;
        }
      }
    }
    #btn {
      width: 140px;
    }
  }
}
</style>