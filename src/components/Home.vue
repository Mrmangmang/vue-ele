<template>
        <el-container class="home-container">
<!--            头部-->
            <el-header>
                <div>
                    <img src="../assets/touxiang.png" height="88" width="87"/>
                     <span>后台管理系统</span>
                </div>
                <el-button type="info" @click="logout">退出</el-button>
            </el-header>
<!--            页面主体-->
            <el-container>
<!--               左侧侧边栏-->
                <el-aside :width="iscollapse ? '64px' :'200px' ">
<!--                    侧边栏菜单区-->
<!--                    需加冒号代表属性绑定，表示布尔值，如果不加冒号，则表示字符串-->
                    <div class="toggle-button" @click="toggleCollapse">|||</div>
<!--                    router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	boolean	—	false-->
                 <el-menu active-text-color="#F79F1F"  :unique-opened="true"  :collapse="iscollapse" :collapse-transition="false"
                 router
                 >
<!--                     一级菜单-->
<!--                     每一个一级菜单必须要有一个独属与自己的index值-->
<!--                     index	唯一标志	string/null	—	null-->
<!--                     数值+字符串拼接就成了一个字符串-->
                     <el-submenu :index=" '/' +  item.path" v-for="item in menulist" :key="item.id">
                         <template slot="title">
                             <i :class="iconObj[item.id]"></i>
                             <span>{{item.authName}}</span>
                         </template>
<!--                         二级菜单-->
                         <el-menu-item :index=" '/' +subItem.path" v-for="subItem in item.children" :key="subItem.id"

                         >
                             <i class="el-icon-menu"></i>
                             <span slot="title">{{subItem.authName}}</span>
                         </el-menu-item>
                     </el-submenu>
                 </el-menu>
                </el-aside>
<!--                右侧内容主体-->
                <el-main>
<!--                    路由占位符-->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>

<script>
    export default {
        data(){
            return {
                // 左侧菜单数据
                //因为请求的是个数组所以[]
                menulist:[],
                iconObj:{
                   '125':'iconfont icon-yonghu ',
                    '103':'iconfont  icon-shangpin ',
                    '101':' iconfont icon-shangpin ',
                    '102':' iconfont  icon-RectangleCopy',
                    '145':' iconfont icon-baobiao '
                },
                //是否折叠
                iscollapse:false
            }
        },
        created() {
            this.getMenuList()
        },
        methods:{
             logout(){
                 //https://www.runoob.com/jsref/prop-win-sessionstorage.html
                 window.sessionStorage.clear()
                 this.$router.push('/login')
             },
            //获取所有的菜单
            async getMenuList(){
                 const {data:res } = await this.$http.get('menus')
                // 如果状态时错地，这直接报请求的错
                if(res.meta.status!==200) return this.$message.error('res.meta.msg')
                // 然后把请求的数据给本地data
                this.menulist = res.data
                console.log(res)
            },
            toggleCollapse(){
                 this.iscollapse = !this.iscollapse
            },
            //保存链接的激活状态
            // saveNavState(activePath){
            //      window.sessionStorage.setItem('activePath',activePath)
            // }
         }
    }
</script>

<style  lang="scss" scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #fbc531;
        background-color: red;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #ffffff;
        font-size: 20px;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }
    }
    .el-container{
        background-color: #7f8fa6;
    }
   .el-aside{
       background-color: #55a532;
       .el-menu{
           border-right: none;
       }
   }
   .iconfont{
       margin-right: 10px;
   }
    .toggle-button{
        background-color: #55a532;
        font-size: 10px;
        line-height: 24px;
        color: #dddddd;
        text-align: center;
        letter-spacing: 0.2em;
    }
</style>