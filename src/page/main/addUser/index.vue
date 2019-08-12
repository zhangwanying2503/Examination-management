<template>
  <div class="addUser">
    <h2>添加用户</h2>
    <div class="content">
      <div class="contentBox addUser">
        <div class="titleBox">
          <span></span>
        </div>
        <el-form :model="addUserForm" ref="addUserForm">
          <el-form-item prop="user_name">
            <el-input v-model="addUserForm.user_name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="user_id">
            <el-input v-model="addUserForm.user_id" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="identity_text">
            <el-select v-model="addUserForm.identity_text" placeholder="请选择身份id">
              <el-option
                v-for="item in getIdentity"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_text"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button @click="resetForm('addUserForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="contentBox addIdentity">
        <div class="titleBox">
          <span class="titleAcztive">添加身份</span>
        </div>
        <el-form :model="addIdentityForm" ref="addIdentityForm">
          <el-form-item prop="identity_text">
            <el-input v-model="addIdentityForm.identity_text" placeholder="请输入身份名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button @click="resetForm('addIdentityForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="contentBox addApi">
        <div class="titleBox">
          <span class="titleAcztive">添加api接口权限</span>
        </div>
        <el-form :model="addApiForm" ref="addApiForm">
          <el-form-item prop="api_authority_text">
            <el-input v-model="addApiForm.api_authority_text" placeholder="请输入api接口权限名称"></el-input>
          </el-form-item>
          <el-form-item prop="api_authority_url">
            <el-input v-model="addApiForm.api_authority_url" placeholder="请输入api接口权限url"></el-input>
          </el-form-item>
          <el-form-item prop="api_authority_method">
            <el-input v-model="addApiForm.api_authority_method" placeholder="请输入api接口权限方法"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button @click="resetForm('addApiForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="contentBox addView">
        <div class="titleBox">
          <span class="titleAcztive">添加视图接口权限</span>
        </div>
        <el-form :model="addViewForm" ref="addViewForm">
          <el-form-item prop="view_authority_text">
            <el-select v-model="addViewForm.view_authority_text" placeholder="请选择已有视图">
              <el-option
                v-for="item in getViewport"
                :key="item.view_authority_id"
                :label="item.view_authority_text"
                :value="item.view_authority_text"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button @click="resetForm('addViewForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="contentBox setIdentityApi">
        <div class="titleBox">
          <span class="titleAcztive">给身份设置api接口权限</span>
        </div>
        <el-form :model="setApiForm" ref="setApiForm">
          <el-form-item prop="identity_text">
            <el-select v-model="setApiForm.identity_text" placeholder="请选择身份id">
              <el-option
                v-for="item in getIdentity"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_text"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="api_authority_text">
            <el-select v-model="setApiForm.api_authority_text" placeholder="请选择api接口权限id">
              <el-option
                v-for="item in getApiport"
                :key="item.api_authority_id"
                :label="item.api_authority_text"
                :value="item.api_authority_text"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button @click="resetForm('setApiForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="contentBox setIdentityView">
        <div class="titleBox">
          <span class="titleAcztive">给身份设置视图权限</span>
        </div>
        <el-form :model="setViewForm" ref="setViewForm">
          <el-form-item prop="identity_text">
            <el-select v-model="setViewForm.identity_text" placeholder="请选择身份id">
              <el-option
                v-for="item in getIdentity"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_text"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="view_authority_text">
            <el-select v-model="setViewForm.view_authority_text" placeholder="请选择视图接口权限id">
              <el-option
                v-for="item in getViewport"
                :key="item.view_authority_id"
                :label="item.view_authority_text"
                :value="item.view_authority_text"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button @click="resetForm('setViewForm')">重置</el-button>
          </el-form-item>
        </el-form>
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
      addUserTitle: [
        {
          id: 0,
          title: "添加用户"
        },
        {
          id: 1,
          title: "更新用户"
        }
      ],
      addUserForm: {
        user_name: "",
        user_pwd: "",
        identity_id: "",
        identity_text: ""
      },
      addIdentityForm: {
        identity_text: ""
      },
      addApiForm: {
        api_authority_text: "",
        api_authority_url: "",
        api_authority_method: ""
      },
      addViewForm: {
        view_authority_text: "",
        view_id: ""
      },
      setApiForm: {
        identity_id: "",
        identity_text: "",
        api_authority_id: "",
        api_authority_text: ""
      },
      setViewForm: {
        identity_id: "",
        identity_text: "",
        view_authority_id: "",
        view_authority_text: ""
      }
    };
  },
  computed: {
    ...mapGetters("userShow", ["getIdentity", "getApiport", "getViewport"])
  },
  methods: {
    ...mapActions("userShow", [
      "axiosIdentity",
      "axiosApiport",
      "axiosViewport"
    ]),
    resetForm(form) {
      this.$refs[form].resetFields();
    }
  },
  created() {
    this.axiosIdentity();
    this.axiosApiport();
    this.axiosViewport();
  },
  mounted() {}
};
</script>
<style >
.addUser {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.addUser > h2 {
  height: 60px;
  line-height: 60px;
  font-weight: normal;
}

.content {
  width: 100%;
  height: auto;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
}

.content > .contentBox {
  width: 33.3%;
  padding: 10px;
  border-radius: 5px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  cursor: pointer;
  box-sizing: border-box;
}

.contentBox > .titleBox {
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin-bottom: 10px;
}

.contentBox > .titleBox > span {
  padding: 3px 8px;
  color: #ccc;
  border: 1px solid #ccc;
  background: #fff;
}
.contentBox > .titleBox > .titleAcztive {
  color: #2e1dd0;
  border: 1px solid #2e1dd0;
}
</style>