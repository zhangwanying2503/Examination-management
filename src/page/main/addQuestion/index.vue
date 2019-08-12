<template>
  <div class="layout">
    <h2
      style="padding: 10px 0; margin: 10px 0; box-sizing: border-box; font-weight:normal; font-size:18px; margin:10px 0;"
    >添加试题</h2>
    <div class="layout-content">
      <div>
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
            <div class="questionTheme">
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
          <el-button type="primary" v-on:click="submit" @click="dialogVisible=true">提交</el-button>
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
  props: {},
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
      input: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
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
      "axios_addQuestions",
      "axios_examType",
      "axios_subjectType"
    ]),
    ...mapActions("questionsType", ["axios_getQuestionsType"]),

    submit() {
      // 点击提交按钮式

      // 获取user_id
      let user_id = JSON.parse(localStorage.getItem("userInfo")).user_id;
      this.user_id = user_id;

      // 判断 if value为空 就不能提交
      // if (
      //     this.title_val === '' ||
      //     this.topicTheme_val === '' ||
      //     this.answerInformation_val === '' ||
      //     this.selectValue_examType === '' ||
      //     this.selectValue_subkectType === '' ||
      //     this.selectValue_questionsType === ''
      // ) {
      //     console.log(0)
      // }else {
      //     console.log(1)
      //     console.log(
      //         this.title_val,
      //         this.topicTheme_val,
      //         this.answerInformation_val,
      //         this.selectValue_examType,
      //         this.selectValue_subkectType,
      //         this.selectValue_questionsType)
      //     }
    },

    comfirm() {
      // 点击确认，存入后台
      // this.axios_addQuestions();
      // console.log(0)
      this.axios_addQuestions({
        title: this.title_val, // 标题
        questions_stem: this.topicTheme_val, // 题干
        questions_answer: this.answerInformation_val, // 题目答案
        exam_id: this.exam_id, // 考试类型
        user_id: this.user_id, // 用户id
        subject_id: this.subject_id, // 课程类型
        questions_type_id: this.questions_type_id // 题目类型
      });
      // this.$store.dispatch('addQuestions',{
      //     title_val: this.title_val,
      //     topicTheme_val: this.topicTheme_val,
      //     answerInformation_val: this.answerInformation_val,
      //     selectValue_examType: this.selectValue_examType,
      //     selectValue_subkectType: this.selectValue_subkectType,
      //     selectValue_questionsType: this.selectValue_questionsType
      // })
    },

    handleClose(done) {
      // close
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }

    // 绑定@imgAdd event
    // $imgAdd(pos, $file) {
    //     // 第一步.将图片上传到服务器.
    //     var formdata = new FormData();
    //     formdata.append('image', $file);
    //     this.img_file[pos] = $file;
    //     this.$http({
    //         url: '/api/edit/uploadimg',
    //         method: 'post',
    //         data: formdata,
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //     }).then((res) => {
    //         let _res = res.data;
    //         // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //         this.$refs.md.$img2Url(pos, _res.url);
    //     })
    // },
    // $imgDel(pos) {
    //     delete this.img_file[pos];
    // }
  },
  created() {
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
  padding: 0px 24px 24px;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: auto;
  background: #f0f2f5;
  min-height: 0;
}
.layout-content {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
  box-sizing: border-box;
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