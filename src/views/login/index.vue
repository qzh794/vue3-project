<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="login_container">
    <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
            <el-form class="login_form" :model="loginForm" :rules="rules" ref="formCheck">
                <h1>Hello</h1>
                <h2>欢迎来到qzh的甄选</h2>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>   
                 </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>   
</template>
    
<script setup>
    import{User,Lock} from '@element-plus/icons-vue'
    import { reactive,ref } from 'vue';
    //引入钩子
    import useUserStore from '/src/store/modules/user.js'
    import { useRouter,useRoute } from 'vue-router';
    import { ElNotification} from 'element-plus';
    import {getTime} from '/src/utils/time.js'


    let loading=ref(false)
    const useStore=useUserStore()
    let $router=useRouter()
    let $route=useRoute()
    const loginForm=reactive({username:'admin',password:'atguigu123'})
    let formCheck=ref()
    //登录按钮回调
    //因为登录之后的promise具有两个状态，错误的需要catch，因此加上async
    const login=async ()=>{
        //表单校验全部通过，才发请求
        //await是用来等待异步的完成
       await formCheck.value.validate()
    //点击登陆以后，通知仓库发起登录请求
    try{
        await useStore.userLogin(loginForm) 
        //登陆成功
        loading.value=true
        //跳转页面
   
        let redirect=$route.query.redirect
    if(redirect){
        $router.push({path:redirect});
    }else{
         $router.push('/');
    }
    
       
        ElNotification({
            message:'登陆成功',
            title:`HI,${getTime()}好`
        })

        //请求失败，弹出失败的信息  
    }catch(error){
        loading.value=false
        console.log(error);
        ElNotification({
            message:'登陆失败',
            title:'账号或密码错误'
        })
    } 

    }
    //自定义校验规则函数
    //rule:校验的规则对象
    //value:表单元素文本内容
    //callback:函数，如果符合条件callback放行通过，不符合也是调用callback，但是要注入错误信息
    const validatorUserName = (rule, value, callback) => {
  if (/^[a-zA-Z]{5,10}$/.test(value)) {
    callback();
  } else {
    callback(new Error('账号至少为6位,最大为10位'));
  }
};

const validatorPassWord = (rule, value, callback) => {
  if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,15}$/.test(value)) {
    callback();
  } else {
    callback(new Error('密码至少为10位,最大为15位'));
  }
};

    //定义表单校验的配置对象
    const rules=reactive({
        //required，务必要校验的
        //trigger：触发校验时机，blur是失去焦点触发，change是文本变化触发
        username:[{validator:validatorUserName,trigger:'change'}],
        password:[{validator:validatorPassWord,trigger:'change'}]
    })
   
</script>
    
<style scoped lang="scss">
.login_container{
width: 100%;
height: 100vh;
background: url('/src/assets/images/background.jpg') no-repeat;
background-size: cover;
.login_form{
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('/src/assets/images/login_form-1fefe6d2.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1{
        color:white;
        font-size: 40px;
    }
    h2{
        color: white;
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .login_btn{
        width: 100%;
    }
}
}    
</style>