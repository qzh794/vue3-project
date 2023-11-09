//路由鉴权：鉴权，项目中的路由访问权限的设置（即某个路由什么条件下可以访问，什么条件下不可访问）
import router from './router/index'
import nProgress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
//获取用户相关的小仓库内部的token，去判断是否登陆成功
import useUserStore from './store/modules/user'
import setting from './setting'
//全局守卫：项目中任意路由的切换都会触发的钩子
//全局前置守卫：//访问某个路由之前会触发的钩子
 router.beforeEach(async (to,from,next)=>{
//to:你将要访问哪个路由
//from:你从哪个路由而来
//next:路由的放行函数
// 进度条开始
    nProgress.start()
    //在前置路由守卫钩子里挂载pinia，可以获取全局状态
    const useStore=useUserStore()
    let token=useStore.state.token
    let username=useStore.state.username
    //用户登陆判断
    if(token){
        console.log(token);
        //登陆成功，不能访问login，其余放行
        if(to.path=='/login'){
            next({path:'/'})
        }else{
            //有用户信息，可以访问路由
            if(username){
                next() 
            }else{
                try{
                    //没有用户信息，发请求获取
                    await useStore.userInfo()
                    next() 
                }catch(e){
                    //获取用户信息失败，token过期导致或者手动修改了token
                    console.log(e);
                    await useStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
           
        }   
    }else{
    //用户未登录的判断
    //允许访问login
    if(to.path=='/login'){
        next();
    }else{
        //未登录访问其余页面，跳转回login，并且以参数redirect记录to的路径
        next({path:'/login',query:{redirect:to.path}})
    }
    
    }
    

})
    
//全局后置守卫：//访问路由之后触发的钩子
router.afterEach((to,from)=>{
    // 网页的名字+跳转路由后的路由名字
    document.title=`${setting.title}-${to.meta.title}`
    // 进度条结束
    nProgress.done()
})
//第一个问题：任意的路由切换要实现进度条业务 ---NProgress
//第二个问题:路由鉴权（路由组件访问权限的设置）
            //全部路由组件：登陆、404路由、任意路由、首页、数据大屏、权限管理（以及子路由）、商品管理（以及子路由）
            //逻辑：两种条件
            //用户未登录（token判断）：可以访问login，其余不能访问（指向login）
            //用户登陆成功：不能访问login（指向首页），其余的路由都可以访问
            