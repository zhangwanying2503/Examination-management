//分组命名
const groups = {
    questionManager:{
        groupName: '试题管理',
        groupIcon: 'el-icon-s-operation'
    },
    userManager:{
        groupName:'用户管理',
        groupIcon:'el-icon-user-solid'
    },
    testManager:{
        groupName:'考试管理',
        groupIcon:'el-icon-s-order'
    },
    classManager:{
        groupName:'班级管理',
        groupIcon:'el-icon-document'
    },
    markingManager:{
        groupName:'阅卷管理',
        groupIcon:'el-icon-document-checked'
    }
}
//路由守卫
function beforeEnter(to,from,next){
    const authoList=JSON.parse(localStorage.getItem('authoList'));
    const flag=authoList.findIndex(item=>item.view_id==to.meta.view_id);
    if(flag!=-1){
        next();
    }else{
        next('/error')
    }
}

//路由配置
const routerConfig = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path: '/login',
        component: () => import('../page/login')
    },
    {
        path: '/main',
        component: ()=> import('../page/main'),
        children: [
            {
                path: 'addQuestion',
                component: () => import('../page/main/addQuestion'),
                meta: {
                    title: '添加试题',
                    group: 'questionManager',
                    view_id:'main-addQuestions',
                }
            },
            {
                path: 'classifyQuestion',
                component: () => import('../page/main/classifyQuestion'),
                meta: {
                    title: '试题分类',
                    group: 'questionManager',
                    view_id:'main-questionsType',
                },
                beforeEnter
            },
            {
                path: 'watchQuestion',
                component: () => import('../page/main/watchQuestion'),
                meta: {
                    title: '查看试题',
                    group: 'questionManager',
                    view_id:'main-watchQuestions'
                }
            },
            {
                path: 'addUser',
                component: () => import('../page/main/addUser'),
                meta: {
                    title: '添加用户',
                    group: 'userManager',
                    view_id:'main-addUser'
                },
                beforeEnter
            },
            {
                path: 'showUser',
                component: () => import('../page/main/showUser'),
                meta: {
                    title: '用户展示',
                    group: 'userManager',
                    'view_id':'main-showUser',
                    beforeEnter                    
                },
                beforeEnter      
            },
            {
                path: 'addTest',
                component: () => import('../page/main/addTest'),
                meta: {
                    title: '添加考试',
                    group: 'testManager',
                    view_id:'main-addExam'
                },
                beforeEnter
            },
            {
                path: 'questionList',
                component: () => import('../page/main/questionList'),
                meta: {
                    title: '试卷列表',
                    group: 'testManager',
                    view_id:'main-examList'
                },
                beforeEnter
            },
            {
                path: 'classManagerList',
                component: () => import('../page/main/classManagerList'),
                meta: {
                    title: '班级管理',
                    group: 'classManager',
                    view_id:'main-grade'
                }
            },
            {
                path:'classroomManager',
                component: () => import('../page/main/classroomManager'),
                meta: {
                    title: '教室管理',
                    group: 'classManager',
                    view_id:'main-room'
                }
            },
            {
                path:'studentManager',
                component: () => import('../page/main/studentManager'),
                meta: {
                    title: '学生管理',
                    group: 'classManager',
                    view_id:'main-student'
                }
            },
            {
                path:'classUncorrected',
                component: () => import('../page/main/classUncorrected'),
                meta: {
                    title: '待批班级',
                    group: 'markingManager',
                    view_id:'main-examPaperClassmate',
                },
                beforeEnter
            },
            {
                path:'markingstudent',
                name:'markingstudent',
                component:()=>import('../page/main/markingStudent'),
            },
            {
                path:'markingevery',
                name:'markindetail',
                component:()=>import('../page/main/markingEvery')
            },
            {
                path:'editQuestion',
                name:'editQuestion',
                component: () => import('../page/main/editQuestion')
            },
            {
                path:'detailOfQuestion',
                name:'detailOfQuestion',
                component: () => import('../page/main/detailOfQuestion')
            }
        ],
        beforeEnter(to,from,next){
            if(localStorage.getItem('token')){
                next();
            }else{
                next('/error')
            }
        }
    },
    {
        path:'/error',
        component: () => import('../page/error')
    }
    
]
/**
 * 数据格式明细：
 * [
 *   {
 *      groupName: '试题管理',
 *      groupIcon: '',
 *      isShow:true
 *      routes: [
 *          {
 *              path: '',
 *              title: '',
 *              view_id:'',
 *              isShow:true
 *          }
 *      ]
 *   }
 * ]
 */

export function getMenuData(){
    const menus = []
    routerConfig[2].children.slice(0,11).forEach(val => {
        let group = menus.find(item => item.groupName == groups[val.meta.group].groupName);
        if(group){
            group.routes.push({
                path:routerConfig[2].path+'/'+val.path,
                title:val.meta.title,
                view_id:val.meta.view_id
            });
        }else{
            menus.push({
                groupName:groups[val.meta.group].groupName,
                groupIcon:groups[val.meta.group].groupIcon,
                isShow:false,
                routes:[
                    {
                        path:routerConfig[2].path + '/' + val.path,
                        title:val.meta.title,
                        view_id:val.meta.view_id,
                        isShow:false
                    }
                ]
            })
        }
    })
    return menus;
}


export default routerConfig;
