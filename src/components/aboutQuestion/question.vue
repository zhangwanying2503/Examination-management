<template>
  <div class="layout">
    <div class="layout-content">
      <div>
        <!-- <ul>
                    <li v-for='(item, index) in 100' :key='index' :index='index'>
                        <span>你好</span>
                    </li>
        </ul>-->
        <form class="form">
          <div class="title_infomation">
            <h3 class="h3">题目信息</h3>
            <div class="tigan">
              <div class="tigan_title">
                <label class title="题干">题干</label>
              </div>
              <div>
                <el-input style="width:500px;" v-model="title_val" placeholder="请输入题目标题不超过20个字"></el-input>
              </div>
            </div>
          </div>

          <div class="title_theme">
            <div class="tigan_title">
              <label class title="题目主题">题目主题</label>
            </div>
            <div class="questionTheme">j
              <div class="item-theme-ipt">
                <mavon-editor v-model="topicTheme_val"/>
              </div>
            </div>
          </div>

          <div class="selectionType">
            <div class="selection-type-item">
              <div class="type-item">
                <label class="type-item-label" title="请选择考试类型">请选择考试类型</label>
              </div>
              <div>
                <template>
                  <el-select v-model="exam_id" placeholder="请选择">
                    <el-option
                      v-for="item in get_examType"
                      :key="item.exam_id"
                      :label="item.exam_name"
                      :value="item.exam_id"
                    ></el-option>
                  </el-select>
                </template>
              </div>
            </div>

            <div class="selection-type-item">
              <div class="type-item">
                <label class="type-item-label" title="请选择课程类型">请选择课程类型</label>
              </div>
              <div>
                <template>
                  <el-select v-model="subject_id" placeholder="请选择">
                    <el-option
                      v-for="item in get_subjectType"
                      :key="item.subject_id"
                      :label="item.subject_text"
                      :value="item.subject_id"
                    ></el-option>
                  </el-select>
                </template>
              </div>
            </div>

            <div class="selection-type-item">
              <div class="type-item">
                <label class="type-item-label" title="请选择题目类型">请选择题目类型</label>
              </div>
              <div>
                <template>
                  <el-select v-model="questions_type_id" placeholder="请选择">
                    <el-option
                      v-for="item in get_getQuestionsType"
                      :key="item.questions_type_id"
                      :label="item.questions_type_text"
                      :value="item.questions_type_id"
                    ></el-option>
                  </el-select>
                </template>
              </div>
            </div>
          </div>

          <div class="answerInformation">
            <div class="tigan_title">
              <label class title="答案信息">答案信息</label>
            </div>
            <div class="questionTheme">
              <div class="item-theme-ipt">
                <mavon-editor v-model="answerInformation_val"/>
              </div>
            </div>
          </div>
        </form>
        <div class="btn">
          <el-button type="primary" @click="dialogVisible=true">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="dialogMsg">
        <span class="ant-modal-confirm-title">你确定要添加这道试题吗?</span>
        <span class="ant-modal-confirm-title">真的要添加吗?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-on:click="comfirm" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  comoponents: {},
  data() {
    return {
      dialogVisible: false, // 弹框
      title_val: "", // 题干标题
      topicTheme_val: "", // 题目主题
      answerInformation_val: "", // 答案信息
      exam_id: "", // 考试类型
      user_id: "", // 用户id
      subject_id: "", // 课程类型
      questions_type_id: "", // 题目类型
      value: "",
      input: ""
    };
  },
  computed: {
    ...mapGetters("addQuestions", [
      "get_addQuestions",
      "get_examType",
      "get_subjectType"
    ]),
    ...mapGetters("questionsType", ["get_getQuestionsType"])
  },
  methods: {
    ...mapActions("addQuestions", [
      "updateQuestion",
      "axios_addQuestions",
      "axios_examType",
      "axios_subjectType"
    ]),
    ...mapActions("questionsType", ["axios_getQuestionsType"]),

    comfirm() {
      // 点击确认，存入后台
      this.updateQuestion({
        question_id: this.info.question_id,
        title: this.title_val, // 标题
        questions_stem: this.topicTheme_val, // 题干
        questions_answer: this.answerInformation_val, // 题目答案
        exam_id: this.exam_id, // 考试类型
        subject_id: this.subject_id, // 课程类型
        questions_type_id: this.questions_type_id // 题目类型
      });
    },

    handleClose(done) {
      // close
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    console.log(this.info);
    this.title_val = this.info.title;
    this.topicTheme_val = this.info.questions_stem;
    this.answerInformation_val = this.info.questions_answer;
    this.exam_id = this.info.exam_id;
    this.subject_id = this.info.subject_id;
    this.questions_type_id = this.info.questions_type_id;
    this.axios_examType();
    this.axios_subjectType();
    this.axios_getQuestionsType();
  },
  mounted() {}
};
</script>
<style scoped lang='scss'>
    .layout {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex: auto;
        min-height: 0;
    }
    .layout-content {
        width:100%;
        background: rgb(255, 255, 255);
        padding: 24px;
        margin: 0px 0px 20px;
        border-radius: 10px;
        box-sizing: border-box;
        .v-note-wrapper{
            width:850px;
            overflow:hidden;
        }
    }

    .h3 {
        margin-top: 0;
        margin-bottom: 0.5em;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
    }

    .tigan_title {
        padding: 0 0 8px;
        margin: 0;
        display: block;
        text-align: left;
        line-height: 1.5;
        white-space: initial;
    }

    .title_theme,
    .title_infomation {
        position: relative;
        margin-left: 0;
        margin-right: 0;
        height: auto;
        zoom: 1;
        display: block;
        box-sizing: border-box;
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.65);
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
        margin-bottom: 24px;
        vertical-align: top;
        padding-bottom: 8px;
    }

.h3 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

.tigan_title {
  padding: 0 0 8px;
  margin: 0;
  display: block;
  text-align: left;
  line-height: 1.5;
  white-space: initial;
}

.title_theme,
.title_infomation {
  position: relative;
  margin-left: 0;
  margin-right: 0;
  height: auto;
  zoom: 1;
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 24px;
  vertical-align: top;
  padding-bottom: 8px;
}

.selection-type-item {
  padding-bottom: 8px;
  position: relative;
  margin-left: 0;
  margin-right: 0;
  height: auto;
  zoom: 1;
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 24px;
  vertical-align: top;
}

.type-item {
  padding: 0 0 8px;
  margin: 0;
  display: block;
  text-align: left;
  line-height: 1.5;
  white-space: initial;
  vertical-align: middle;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
}

.type-item-label {
  position: relative;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
}

.btn {
  margin-top: 24px;
}

.dialogMsg {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialogMsg span:first-child {
  font-size: 18px;
  font-weight: bold;
}
</style>