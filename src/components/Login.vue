<template>
    <div class="login_container">
        <div class="login_box" >
<!--            头像区域-->
            <div class="avatar_box">
                <img src="../assets/logo.png"/>
            </div>
<!--            登录表单区域-->
<!--            :model :rules 就相当于v-bind:rules,    -->
<!--           如何拿到表单的实例对象-》引用：ref=引用的名称》只要获取到这个引用名称=》便可以直接调用函数=》也即引用之后变成了实例对象-->
            <el-form  label-width="0px" class="login_form " :rules="loginFormRules"  :model="loginForm" ref="loginFormRef">
<!--                用户名-->
                <el-form-item prop="username" >
                    <el-input
                            v-model="loginForm.username"
                            prefix-icon=" iconfont  icon-yonghu"
                    >
                    </el-input>
                </el-form-item>
<!--                密码-->
                <el-form-item prop="password">
                    <el-input
                            v-model="loginForm.password"
                            prefix-icon=" iconfont  icon-mima"
                            type="password"
                    ></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
<!--                    重置按钮绑定了resetLoginForm这个事件=》事件打印出组件=》组件实例的.$refs.ref绑定的实例对象 = ref绑定的实例对象，-->
<!--                    this.$refs.（ref值） 获取到的是组件实例，也就是引用实例-->
<!--                    https://blog.csdn.net/wh710107079/article/details/88243638?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase-->
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // 这是登录表单的数据绑定对象
                loginForm:{
                    username:'admin',
                    password:'123456'
                },
                //这是登录表单的验证规则对象
                loginFormRules:{
                   username:[
                       { required: true, message: '请输入用户名', trigger: 'blur' },
                       { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                   ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        // 方法
        methods:{
            //点击重置按钮，重置登录表单
            resetLoginForm(){
                // console.log(this)
                // this.$refs.loginFormRef = loginFormRef
                this.$refs.loginFormRef.resetFields();
            },
            //validate接受一个回调函数，
            login(){
                // this.$refs.logingFormRef.validate((valid) => {
                //     if (valid) {
                //         alert('submit!');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
                // Function(callback: Function(boolean, object))
                this.$refs.loginFormRef.validate(valid=>{
                    // console.log(valid)
                    //!valid 判断valid是否为true，可以取反，如果valid是false者取反为true，直接return
                    //如果不发起请求，这直接return结束，也即valid为false
                    //如果valid是错的，这！valid是正确的，则会执行return ，
                    //如果valid是对的，则！valid是错的，则不会结束
                    if(!valid) return;
                    //axios. post增 delete删 put改 get查
                  const  result =  this.$http.post('login',this.loginForm);
                    console.log(result)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
 .login_container{
     background-color: darkgreen;
     height: 100%;
 }
    .login_box{
        width:450px;
        height: 300px;
        background-color: #ffffff;
        border-right: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            height: 130px;
            width: 130px;
            border-radius: 50%;
            border: 1px solid #eeeeee;
            padding: 10px;
            box-shadow: 0  0 10px #dddddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #ffffff;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eeeeee;
            }
        }
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        //我没搞懂为什么能这样
        box-sizing: border-box;
    }
    .btns{
    display: flex;
    justify-content: flex-end;
}

</style>