<template>
    <div class='classUncorrected'>
		<h2>{{title}}</h2>
		<div class='content'>
			<el-table :data='getgradeList.slice((currentPage-1)*pagesize,currentPage*pagesize)' style='100%' :header-cell-style="{background:'#fafafa'}">
				<el-table-column prop='grade_name' label='班级名'></el-table-column>
				<el-table-column prop="subject_text" label='课程名称'></el-table-column>
				<el-table-column prop="" label='阅卷状态'></el-table-column>
		   		<el-table-column prop="subject_text" label='课程名称'></el-table-column>
				<el-table-column prop='room_text' label='成材率'></el-table-column>
				<el-table-column label="操作">
					<template slot-scope='scope'>
						<el-button @click="toStudent(scope.row)">批卷</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes='pagesizes' :page-size='pagesize' layout='prev,pager,next,sizes,jumper' :total='getgradeList.length'>
			</el-pagination>
		</div>	
    </div>
</template>

<script>

import {
	mapGetters,
	mapMutations,
	mapActions
} from 'vuex';

export default {
  props: {
    
	},
  components: {},
  data() {
    return {
		    title:"待批班级",
			currentPage:1, //初始页
			pagesize:10,    //每页的数据
			pagesizes:[5,10,20,50,100]
		}
  },
  computed: {
		...mapGetters('manger',['getgradeList']),
		...mapGetters('marks',['get_marks_exam_paper'])
  },
  methods: {
		...mapActions('manger',['getgradeActions']),
		...mapActions('marks',['axios_marks_exam_paper','getStudentActions']),
		// 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(val) {
			console.log(`每页${val}条`);
			this.pagesize=val;
        },
        handleCurrentChange(val){
			console.log(`跳转到${val}`);
			this.currentPage=val;
        },
		toStudent(row){
			this.getStudentActions({row:row,$router:this.$router})
			// console.log(row)
			// const list=this.get_marks_exam_paper.filter(item=>item.grade_id==row.grade_id);
			// console.log(list)
			// this.$router.push({
			// 	name:'markingstudent',
			// 	grade_name:row.grade_name
			// })
		}
	},
  created() {
		this.getgradeActions();
		//this.axios_marks_exam_paper();
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