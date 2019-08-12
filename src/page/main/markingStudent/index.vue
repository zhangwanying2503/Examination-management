<template>
    <div class='classUncorrected'>
		<el-form :inline='true' :model='searchForm' class='demo-form-inline'>
			<el-form-item label='状态'>
				<el-select v-model="searchForm.grade_name" placeholder='无数据'>
					<el-option label='' value=''></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='班级名'>
				<el-select v-model="searchForm.grade_name">
					<el-option v-for="(item) in getgradeList" 
					:key='item.grade_id'
					:label="item.grade_name"  
					:value='item.grade_name'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button class='searchBtn'><i class="el-icon-search"></i> 查询</el-button>
			</el-form-item>
		</el-form>
		<div class='content'>
			<h3>试卷列表</h3>
			<el-table :data='get_marks_exam_paper.slice((currentPage-1)*pagesize,currentPage*pagesize)' style='100%'>
				<el-table-column prop='grade_name' label='班级名'></el-table-column>
				<el-table-column prop='student_name' label='姓名'></el-table-column>
				<el-table-column prop="" label='阅卷状态'></el-table-column>
				<el-table-column prop="end_time" label='开始时间'></el-table-column>
				<el-table-column prop="end_time" label='结束时间'></el-table-column>
				<el-table-column prop='' label='成材率'></el-table-column>
				<el-table-column label="操作">
					<template slot-scope='scope'>
						<el-button @click='markstudentId(scope.row)'>批卷</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes='pagesizes' :page-size='pagesize' layout='prev,pager,next,sizes,jumper' :total='get_marks_exam_paper.length'>
			</el-pagination>
		</div>	
    </div>
</template>

<script>

import {
	mapGetters,
	mapActions
} from 'vuex';

export default {
  props: {
    
	},
  components: {},
  data() {
    return {
			currentPage:1, //初始页
			pagesize:10,    //每页的数据
			pagesizes:[5,10,20,50,100],
			studentList:[],
			searchForm:{
				status:'',
				grade_name:''
			}
		}
  },
  computed: {
	  	...mapGetters('manger',['getgradeList']),
		...mapGetters('marks',['get_marks_exam_paper']),
  },
  methods: {
	  	...mapActions('manger',['getgradeActions']),
		...mapActions('marks',['axios_marks_exam_detail']),
		// 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(val) {
			console.log(`每页${val}条`);
			this.pagesize=val;
        },
        handleCurrentChange(val){
			console.log(`跳转到${val}`);
			this.currentPage=val;
        },
		markstudentId(row){
			console.log(row);
			this.axios_marks_exam_detail({id:row.exam_student_id,$router:this.$router})
		}
	},
  created() {
		this.getgradeActions();
	},
  mounted() {}
};
</script>

<style lang="">
.classUncorrected {	
	width:100%;
	height:100%;
	display: flex;
	flex-direction: column;
	flex: auto;
	background: #f0f2f5;
	min-height: 0;
	padding: 0px 24px 24px;
	overflow-x: hidden;
	overflow-y:auto;
	box-sizing: border-box;
}

.classUncorrected>h2{
   padding: 20px 0px; 
   margin: 10px 0; 
   box-sizing: border-box;
}

.demo-form-inline .searchBtn{
	padding:10px 15px;
	color:#fff;
	background:#0139FD;
}

.content {
	width: 100%;
	flex:1;
	background: #fff;
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
}

.content button{
	border:0;
	color:#00f;
	padding:0;
}

</style>
