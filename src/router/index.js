import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import User from "../components/User";
Vue.use(VueRouter);

const routes = [
  {
     path:'/login',
     component:Login
  },
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/home',
        component: Home,
        redirect: '/welcome',
       //在Home组件中嵌套显示了welcome子组件
        //先把home渲染，在重定向到welcome，此时就可以在home组件中占位符位置展示welcome子组件
        //路由重定向+路由嵌套？
        //这里我不懂
        // 你就想welcome这一层级是在哪里显示，然后往上找，发现是在home里有定义，它就会在这里显示。
        children:[{
            path:'/welcome',component:Welcome
        },
            {path:'/users',component: User}
        ]
    }
];

const router = new VueRouter({
    routes
});

//一定要注意加载顺序，你在没有定义router的情况下，调用了router.before，肯定找不到啊。
// 挂载路由导航守卫,作用是，当你没有页面没有token的时候去登录页面
router.beforeEach((to, from, next) => {
    if(to.path==='/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return  next()
    next()
})

export default router;




